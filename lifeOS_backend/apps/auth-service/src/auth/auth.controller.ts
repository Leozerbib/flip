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

/**
 * Contrôleur d'authentification (TCP uniquement)
 * Toutes les requêtes HTTP passent par l'API Gateway
 */
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly logger: LoggerService
  ) {}

  // ==================== MICROSERVICE PATTERNS TCP ====================

  @MessagePattern({ cmd: 'register_user' })
  public async register(@Payload() createUserDto: CreateUserDto): Promise<IAuthResponse> {
    this.logger.info('Inscription utilisateur (microservice)', { email: createUserDto.email });
    return this.authService.register(createUserDto);
  }

  @MessagePattern({ cmd: 'login_user' })
  public async login(@Payload() loginDto: LoginDto): Promise<IAuthResponse> {
    this.logger.info('Connexion utilisateur (microservice)', { email: loginDto.email });
    return this.authService.loginWithCredentials(loginDto);
  }

  @MessagePattern({ cmd: 'validate_token' })
  public async validateToken(@Payload() token: string): Promise<ITokenValidationResponse> {
    this.logger.info('Validation du token (microservice)');
    return await this.authService.validateToken(token);
  }

  @MessagePattern({ cmd: 'validate_refresh_token' })
  public async validateRefreshToken(@Payload() token: string): Promise<ITokenValidationResponse> {
    this.logger.info('Validation du refresh token (microservice)');
    return await this.authService.validateToken(token, true);
  }

  @MessagePattern({ cmd: 'google_login' })
  public async googleLogin(@Payload() googleUser: any): Promise<IAuthResponse> {
    this.logger.info('Connexion Google (microservice)', { email: googleUser?.email });
    return this.authService.googleLogin(googleUser);
  }

  @MessagePattern({ cmd: 'validate_google_user' })
  public async validateGoogleUser(@Payload() googleUserData: any): Promise<any> {
    this.logger.info('Validation utilisateur Google (microservice)', {
      email: googleUserData?.email,
    });
    return await this.authService.validateGoogleUser(googleUserData);
  }

  @MessagePattern({ cmd: 'refresh_token' })
  public async refreshToken(@Payload() refreshToken: string): Promise<IRefreshTokenResponse> {
    this.logger.info('Renouvellement du token (microservice)');
    return await this.authService.refreshAccessToken(refreshToken);
  }

  @MessagePattern({ cmd: 'get_user_from_token' })
  public async getUserFromToken(@Payload() token: string) {
    this.logger.info('Récupération utilisateur depuis token (microservice)');
    return await this.authService.getCurrentUserFromToken(token);
  }

  @MessagePattern({ cmd: 'revoke_token' })
  public async revokeToken(@Payload() token: string): Promise<{ success: boolean }> {
    this.logger.info('Révocation du token (microservice)');
    const success = await this.authService.revokeToken(token);
    return { success };
  }
}
