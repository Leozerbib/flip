/* eslint-disable no-return-await */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'libs/contracts/src/User/dtos/user.dto';
import { LoggerService } from 'libs/logger/src';
import {
  IAuthResponse,
  ITokenValidationResponse,
  IRefreshTokenResponse,
} from '@app/contracts/Auth/interfaces/auth.interface';
import { ExceptionThrower } from '@app/exceptions';

/**
 * Contrôleur d'authentification (TCP uniquement)
 * Toutes les requêtes HTTP passent par l'API Gateway
 */
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly logger: LoggerService,
    private readonly thrower: ExceptionThrower
  ) {}

  // ==================== MICROSERVICE PATTERNS TCP ====================

  @MessagePattern({ cmd: 'register_user' })
  public async register(@Payload() createUserDto: CreateUserDto): Promise<IAuthResponse> {
    try {
      this.logger.info('Inscription utilisateur (microservice)', { email: createUserDto.email });
      return await this.authService.register(createUserDto);
    } catch (error) {
      this.logger.error("Erreur lors de l'inscription:", error);
      this.handleServiceError(error, 'register');
    }
  }

  @MessagePattern({ cmd: 'login_user' })
  public async login(@Payload() loginDto: LoginDto): Promise<IAuthResponse> {
    try {
      this.logger.info('Connexion utilisateur (microservice)', { email: loginDto.email });
      return await this.authService.loginWithCredentials(loginDto);
    } catch (error) {
      this.logger.error('Erreur lors de la connexion:', error);
      this.handleServiceError(error, 'login');
    }
  }

  @MessagePattern({ cmd: 'validate_token' })
  public async validateToken(@Payload() token: string): Promise<ITokenValidationResponse> {
    try {
      this.logger.info('Validation du token (microservice)');
      return await this.authService.validateToken(token);
    } catch (error) {
      this.logger.error('Erreur lors de la validation du token:', error);
      this.handleServiceError(error, 'validate_token');
    }
  }

  @MessagePattern({ cmd: 'validate_refresh_token' })
  public async validateRefreshToken(@Payload() token: string): Promise<ITokenValidationResponse> {
    try {
      this.logger.info('Validation du refresh token (microservice)');
      return await this.authService.validateToken(token, true);
    } catch (error) {
      this.logger.error('Erreur lors de la validation du refresh token:', error);
      this.handleServiceError(error, 'validate_refresh_token');
    }
  }

  @MessagePattern({ cmd: 'google_login' })
  public async googleLogin(@Payload() googleUser: any): Promise<IAuthResponse> {
    try {
      this.logger.info('Connexion Google (microservice)', { email: googleUser?.email });
      return await this.authService.googleLogin(googleUser);
    } catch (error) {
      this.logger.error('Erreur lors de la connexion Google:', error);
      this.handleServiceError(error, 'google_login');
    }
  }

  @MessagePattern({ cmd: 'google_verify_id_token' })
  public async googleVerifyIdToken(@Payload() idToken: string): Promise<IAuthResponse> {
    try {
      this.logger.info('Vérification Google ID Token (microservice)');
      return await this.authService.verifyGoogleIdTokenAndLogin(idToken);
    } catch (error) {
      this.logger.error('Erreur lors de la vérification du Google ID Token:', error);
      this.handleServiceError(error, 'google_verify_id_token');
    }
  }

  @MessagePattern({ cmd: 'validate_google_user' })
  public async validateGoogleUser(@Payload() googleUserData: any): Promise<any> {
    try {
      this.logger.info('Validation utilisateur Google (microservice)', {
        email: googleUserData?.email,
      });
      return await this.authService.validateGoogleUser(googleUserData);
    } catch (error) {
      this.logger.error("Erreur lors de la validation de l'utilisateur Google:", error);
      this.handleServiceError(error, 'validate_google_user');
    }
  }

  @MessagePattern({ cmd: 'refresh_token' })
  public async refreshToken(@Payload() refreshToken: string): Promise<IRefreshTokenResponse> {
    try {
      this.logger.info('Renouvellement du token (microservice)');
      return await this.authService.refreshAccessToken(refreshToken);
    } catch (error) {
      this.logger.error('Erreur lors du renouvellement du token:', error);
      this.handleServiceError(error, 'refresh_token');
    }
  }

  @MessagePattern({ cmd: 'get_user_from_token' })
  public async getUserFromToken(@Payload() token: string) {
    try {
      this.logger.info('Récupération utilisateur depuis token (microservice)');
      return await this.authService.getCurrentUserFromToken(token);
    } catch (error) {
      this.logger.error("Erreur lors de la récupération de l'utilisateur:", error);
      this.handleServiceError(error, 'get_user_from_token');
    }
  }

  @MessagePattern({ cmd: 'revoke_token' })
  public async revokeToken(@Payload() token: string): Promise<{ success: boolean }> {
    try {
      this.logger.info('Révocation du token (microservice)');
      const success = await this.authService.revokeToken(token);
      return { success };
    } catch (error) {
      this.logger.error('Erreur lors de la révocation du token:', error);
      this.handleServiceError(error, 'revoke_token');
    }
  }

  private handleServiceError(error: any, operation: string): never {
    this.logger.error(`Erreur dans l'opération ${operation}:`, error);

    // Handle Prisma errors
    if (this.isPrismaError(error)) {
      this.handlePrismaError(error);
    }

    // Handle JWT errors
    if (this.isJwtError(error)) {
      if (error.name === 'TokenExpiredError') {
        this.thrower.throwTokenExpired({ operation, originalError: error.message });
      } else if (error.name === 'JsonWebTokenError') {
        this.thrower.throwInvalidToken({ operation, originalError: error.message });
      }
    }

    // Handle authentication-specific errors
    if (error.message?.includes('Invalid credentials') || error.message?.includes('Identifiants')) {
      this.thrower.throwInvalidCredentials({ operation });
    }

    if (
      error.message?.includes('User not found') ||
      error.message?.includes('Utilisateur introuvable')
    ) {
      this.thrower.throwUserNotFound({ operation });
    }

    if (
      error.message?.includes('Email already exists') ||
      error.message?.includes('Email déjà utilisé')
    ) {
      this.thrower.throwEmailAlreadyExists({ operation });
    }

    if (error.message?.includes('Google token') || error.message?.includes('Token Google')) {
      this.thrower.throwGoogleTokenInvalid({ operation, originalError: error.message });
    }

    // Handle validation errors
    if (error.name === 'ValidationError' || error.message?.includes('validation')) {
      this.thrower.throwValidation('Erreur de validation', [
        {
          field: 'unknown',
          value: error.value,
          constraints: [error.message],
        },
      ]);
    }

    // Generic database connection error
    if (error.code === 'ECONNREFUSED' || error.message?.includes('database server')) {
      this.thrower.throwDatabaseConnection({ operation, originalError: error.message });
    }

    // Generic error
    this.thrower.throwInternalError("Erreur interne du service d'authentification", {
      operation,
      originalError: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }

  private isPrismaError(error: any): boolean {
    return (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      ('clientVersion' in error || 'meta' in error)
    );
  }

  private handlePrismaError(error: any): never {
    const prismaCode = error.code;

    switch (prismaCode) {
      case 'P1001':
        this.thrower.throwDatabaseConnection({
          prismaCode,
          originalError: error.message,
        });
        break;
      case 'P2002':
        this.thrower.throwDuplicateEntry({
          prismaCode,
          target: error.meta?.target,
          originalError: error.message,
        });
        break;
      case 'P2025':
        this.thrower.throwRecordNotFound({
          prismaCode,
          originalError: error.message,
        });
        break;
      default:
        this.thrower.throwDatabaseQuery({
          prismaCode,
          originalError: error.message,
        });
    }
  }

  private isJwtError(error: any): boolean {
    return (
      error &&
      (error.name === 'TokenExpiredError' ||
        error.name === 'JsonWebTokenError' ||
        error.name === 'NotBeforeError')
    );
  }
}
