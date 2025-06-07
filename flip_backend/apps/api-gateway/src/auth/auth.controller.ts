import {
  Controller,
  Post,
  Body,
  Get,
  Inject,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, catchError, throwError } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'libs/contracts/src/User/dtos/user.dto';
import {
  IAuthResponse,
  IRefreshTokenResponse,
  ITokenValidationResponse,
} from '@app/contracts/Auth/interfaces/auth.interface';
import {
  RefreshTokenDto,
  LoginDto,
  TokenValidationDto,
  AuthResponseDto,
  RefreshTokenResponseDto,
  VerifyGoogleIdTokenDto,
} from '@app/contracts/Auth/dto/auth.dto';
import { Auth, OptionalAuth } from './decorators/auth.decorator';
import { GetUserId } from './decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Log } from 'libs/logger/src';
import { GlobalConfigService } from '@app/config';
import { ExceptionThrower } from '@app/exceptions';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    private readonly globalConfig: GlobalConfigService,
    private readonly thrower: ExceptionThrower
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Créer un nouveau compte utilisateur' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Utilisateur créé avec succès',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 409, description: 'Email déjà utilisé' })
  @OptionalAuth()
  @Log("Création d'un nouveau compte utilisateur", 'info')
  public async register(@Body() createUserDto: CreateUserDto): Promise<IAuthResponse> {
    try {
      return await firstValueFrom(
        this.authClient.send<IAuthResponse>({ cmd: 'register_user' }, createUserDto).pipe(
          catchError(error => {
            this.handleMicroserviceError(error, 'auth-service');
            return throwError(() => error);
          })
        )
      );
    } catch (error) {
      this.handleMicroserviceError(error, 'auth-service');
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authentifier un utilisateur' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Connexion réussie avec tokens JWT',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Identifiants incorrects' })
  @OptionalAuth()
  @Log('Authentification utilisateur', 'info')
  public async login(@Body() loginDto: LoginDto): Promise<IAuthResponse> {
    try {
      return await firstValueFrom(
        this.authClient.send<IAuthResponse>({ cmd: 'login_user' }, loginDto).pipe(
          catchError(error => {
            this.handleMicroserviceError(error, 'auth-service');
            return throwError(() => error);
          })
        )
      );
    } catch (error) {
      this.handleMicroserviceError(error, 'auth-service');
    }
  }

  @Get('google')
  @ApiOperation({
    summary: "Initier l'authentification Google OAuth 2.0",
    description: "Redirige automatiquement vers Google pour l'authentification.",
  })
  @ApiResponse({
    status: 302,
    description: 'Redirection vers Google OAuth',
  })
  @UseGuards(AuthGuard('google'))
  @OptionalAuth()
  @Log('Authentification Google OAuth', 'info')
  public async googleAuth(): Promise<void> {
    // Ce endpoint est géré par le guard Google
    // La redirection se fait automatiquement
  }

  @Get('google/callback')
  @ApiOperation({
    summary: 'Callback Google OAuth',
    description: 'Traite le retour de Google OAuth et redirige vers le frontend avec les tokens',
  })
  @ApiResponse({
    status: 302,
    description: 'Redirection vers le frontend avec tokens',
  })
  @UseGuards(AuthGuard('google'))
  @OptionalAuth()
  @Log('Callback Google OAuth', 'info')
  public async googleCallback(@Req() req: any, @Res() res: Response): Promise<void> {
    try {
      // L'utilisateur Google est disponible via req.user grâce au guard
      const googleUser = req.user;

      // Envoyer au service d'authentification via TCP
      const authResult = await firstValueFrom(
        this.authClient.send<IAuthResponse>({ cmd: 'google_login' }, googleUser).pipe(
          catchError(error => {
            this.handleMicroserviceError(error, 'auth-service');
            return throwError(() => error);
          })
        )
      );

      if (
        !authResult?.access_token ||
        !authResult.access_token ||
        !authResult.refresh_token ||
        !authResult.user
      ) {
        this.logger.error('Google OAuth - Incomplete auth result from auth service', authResult);
        return res.redirect(
          `${this.globalConfig.app.frontendUrl}/auth/error?error=internal_auth_error`
        );
      }

      // Rediriger vers le frontend avec les tokens et l'utilisateur
      const userJson = encodeURIComponent(JSON.stringify(authResult.user));

      const queryParams: string[] = [
        `access_token=${authResult.access_token}`,
        `refresh_token=${authResult.refresh_token}`,
      ];

      if (authResult.expires_in) {
        queryParams.push(`expires_in=${authResult.expires_in}`);
      }
      queryParams.push(`user=${userJson}`);

      const redirectUrl = `${this.globalConfig.app.frontendUrl}/auth/success?${queryParams.join('&')}`;

      res.redirect(redirectUrl);
    } catch (error) {
      this.logger.error('Erreur Google OAuth:', error);
      res.redirect(`${this.globalConfig.app.frontendUrl}/auth/error?error=internal_error`);
    }
  }

  @Post('google/verify-id-token')
  @ApiOperation({
    summary: 'Vérifier un Google ID Token',
    description:
      "Vérifie un Google ID Token et retourne les tokens d'authentification de l'application",
  })
  @ApiBody({ type: VerifyGoogleIdTokenDto })
  @ApiResponse({
    status: 200,
    description: 'Token vérifié avec succès',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Token Google invalide' })
  @OptionalAuth()
  @Log('Vérification Google ID Token', 'info')
  public async verifyGoogleIdToken(
    @Body() payload: VerifyGoogleIdTokenDto
  ): Promise<IAuthResponse> {
    try {
      return await firstValueFrom(
        this.authClient
          .send<IAuthResponse>({ cmd: 'google_verify_id_token' }, payload.idToken)
          .pipe(
            catchError(error => {
              this.handleMicroserviceError(error, 'auth-service');
              return throwError(() => error);
            })
          )
      );
    } catch (error) {
      this.handleMicroserviceError(error, 'auth-service');
    }
  }

  @Post('validate-token')
  @ApiOperation({ summary: 'Valider un token JWT' })
  @ApiBody({ type: TokenValidationDto })
  @ApiResponse({
    status: 200,
    description: 'Token valide',
    schema: {
      properties: {
        valid: { type: 'boolean' },
        user: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Token invalide' })
  @Log('Validation du token', 'info')
  public async validateToken(
    @Body() payload: TokenValidationDto
  ): Promise<ITokenValidationResponse> {
    try {
      return await firstValueFrom(
        this.authClient
          .send<ITokenValidationResponse>({ cmd: 'validate_token' }, payload.token)
          .pipe(
            catchError(error => {
              this.handleMicroserviceError(error, 'auth-service');
              return throwError(() => error);
            })
          )
      );
    } catch (error) {
      this.handleMicroserviceError(error, 'auth-service');
    }
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Renouveler un token JWT' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: 'Nouveau token généré',
    type: RefreshTokenResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Token de refresh invalide' })
  @Log('Renouvellement du token', 'info')
  public async refresh(@Body() payload: RefreshTokenDto): Promise<IRefreshTokenResponse> {
    try {
      return await firstValueFrom(
        this.authClient
          .send<IRefreshTokenResponse>({ cmd: 'refresh_token' }, payload.refreshToken)
          .pipe(
            catchError(error => {
              this.handleMicroserviceError(error, 'auth-service');
              return throwError(() => error);
            })
          )
      );
    } catch (error) {
      this.handleMicroserviceError(error, 'auth-service');
    }
  }

  @Post('logout')
  @ApiOperation({ summary: "Déconnecter l'utilisateur" })
  @ApiResponse({
    status: 200,
    description: 'Déconnexion réussie',
    schema: {
      properties: {
        message: { type: 'string' },
        success: { type: 'boolean' },
      },
    },
  })
  @Auth()
  @Log('Déconnexion réussie', 'info')
  public logout(@GetUserId() _userId: string): { message: string; success: boolean } {
    // Pour l'instant, on retourne juste un message de succès
    // Dans une implémentation complète, on pourrait maintenir une blacklist des tokens
    return {
      message: 'Déconnexion réussie',
      success: true,
    };
  }

  @Get('check')
  @ApiOperation({ summary: "Vérifier le statut d'authentification" })
  @ApiResponse({
    status: 200,
    description: "Statut d'authentification",
    schema: {
      properties: {
        authenticated: { type: 'boolean' },
        user: { type: 'object', nullable: true },
      },
    },
  })
  @Auth()
  @Log("Vérification du statut d'authentification", 'info')
  public checkAuth(): { authenticated: boolean } {
    return { authenticated: true };
  }

  private handleMicroserviceError(error: any, serviceName: string): never {
    this.logger.error(`Erreur communication avec ${serviceName}:`, error);

    // Handle connection errors
    if (error?.code === 'ECONNREFUSED' || error?.message?.includes('ECONNREFUSED')) {
      this.thrower.throwMicroserviceConnection(serviceName, { originalError: error.message });
    }

    // Handle microservice response errors
    if (error?.status === 'error') {
      switch (error.code) {
        case 'AUTH_INVALID_CREDENTIALS':
          this.thrower.throwInvalidCredentials({ microservice: serviceName });
          break;
        case 'AUTH_USER_NOT_FOUND':
          this.thrower.throwUserNotFound({ microservice: serviceName });
          break;
        case 'AUTH_EMAIL_ALREADY_EXISTS':
          this.thrower.throwEmailAlreadyExists({ microservice: serviceName });
          break;
        case 'AUTH_GOOGLE_TOKEN_INVALID':
          this.thrower.throwGoogleTokenInvalid({ microservice: serviceName });
          break;
        case 'AUTH_TOKEN_INVALID':
          this.thrower.throwInvalidToken({ microservice: serviceName });
          break;
        case 'AUTH_TOKEN_EXPIRED':
          this.thrower.throwTokenExpired({ microservice: serviceName });
          break;
        default:
          this.thrower.throwInternalError(error.message ?? "Erreur du service d'authentification", {
            microservice: serviceName,
            originalError: error,
          });
      }
    }

    // Generic error
    this.thrower.throwInternalError('Erreur interne du service', {
      microservice: serviceName,
      originalError: error,
    });
  }
}
