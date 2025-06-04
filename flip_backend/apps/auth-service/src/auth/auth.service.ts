import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'libs/contracts/src/User/dtos/user.dto';
import { LoggerService } from 'libs/logger/src';
import {
  IAuthResponse,
  ITokenValidationResponse,
  IRefreshTokenResponse,
} from '@app/contracts/Auth/interfaces/auth.interface';

export interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
  refreshToken?: string;
}

export interface GoogleIdTokenPayload {
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  sub: string; // Google user ID
}

export interface ITokenPayload {
  sub: string;
  username: string;
  type: 'access' | 'refresh';
  iat?: number;
  exp?: number;
}

export interface ICurrentUser {
  id: string;
  username: string;
}

@Injectable()
export class AuthService {
  private readonly accessTokenExpiresIn: number;
  private readonly refreshTokenExpiresIn: number;
  private readonly jwtSecret: string;
  private readonly refreshSecret: string;
  private readonly googleOAuth2Client: OAuth2Client;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: LoggerService
  ) {
    this.accessTokenExpiresIn = this.configService.get<number>('JWT_ACCESS_EXPIRES_IN', 3600); // 1 heure
    this.refreshTokenExpiresIn = this.configService.get<number>('JWT_REFRESH_EXPIRES_IN', 604800); // 7 jours
    this.jwtSecret = this.configService.get<string>('JWT_SECRET', 'default-secret');
    this.refreshSecret = this.configService.get<string>(
      'JWT_REFRESH_SECRET',
      'default-refresh-secret'
    );

    // Initialize Google OAuth2 Client for ID token verification
    const googleClientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    this.googleOAuth2Client = new OAuth2Client(googleClientId);

    this.logger.info('Configuration JWT initialisée', {
      accessTokenExpiresIn: this.accessTokenExpiresIn,
      refreshTokenExpiresIn: this.refreshTokenExpiresIn,
    });
  }

  /**
   * Valide les identifiants utilisateur
   */
  public async validateUser(email: string, password: string) {
    this.logger.info('Validation des identifiants utilisateur', { email });
    return this.userService.validateUser(email, password);
  }

  /**
   * Génère les tokens d'accès et de refresh pour un utilisateur
   */
  public generateTokens(user: any): { access_token: string; refresh_token: string } {
    this.logger.info("Génération des tokens pour l'utilisateur", { userId: user.user_id });

    const accessPayload: Omit<ITokenPayload, 'iat' | 'exp'> = {
      sub: user.user_id.toString(),
      username: user.username ?? '',
      type: 'access',
    };

    const refreshPayload: Omit<ITokenPayload, 'iat' | 'exp'> = {
      sub: user.user_id.toString(),
      username: user.username ?? '',
      type: 'refresh',
    };

    const access_token = this.jwtService.sign(accessPayload, {
      secret: this.jwtSecret,
      expiresIn: `${this.accessTokenExpiresIn}s`, // Format string avec 's' pour secondes
    });

    const refresh_token = this.jwtService.sign(refreshPayload, {
      secret: this.refreshSecret,
      expiresIn: `${this.refreshTokenExpiresIn}s`, // Format string avec 's' pour secondes
    });

    this.logger.info('Tokens générés avec succès', {
      userId: user.user_id,
      accessExpiresIn: this.accessTokenExpiresIn,
      refreshExpiresIn: this.refreshTokenExpiresIn,
    });

    return { access_token, refresh_token };
  }

  /**
   * Connexion avec génération de tokens
   */
  public login(user: any): IAuthResponse {
    this.logger.info('Connexion utilisateur', { userId: user.user_id });

    const tokens = this.generateTokens(user);

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in: this.accessTokenExpiresIn,
      user: {
        id: user.user_id.toString(),
        username: user.username ?? '',
      },
    };
  }

  /**
   * Inscription avec génération de tokens
   */
  public async register(createUserDto: CreateUserDto): Promise<IAuthResponse> {
    this.logger.info('Inscription nouvel utilisateur', { email: createUserDto.email });

    const user = await this.userService.createUser(createUserDto);
    return this.login(user);
  }

  /**
   * Connexion avec identifiants
   */
  public async loginWithCredentials(loginDto: LoginDto): Promise<IAuthResponse> {
    this.logger.info('Tentative de connexion avec identifiants', { email: loginDto.email });

    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      this.logger.warn('Échec de validation des identifiants', { email: loginDto.email });
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    return this.login(user);
  }

  /**
   * Validation d'un token JWT (access ou refresh)
   */
  public async validateToken(
    token: string,
    isRefreshToken = false
  ): Promise<ITokenValidationResponse> {
    try {
      this.logger.info('Validation du token', { isRefreshToken, tokenLength: token?.length });

      if (!token) {
        return { valid: false, error: 'Token manquant' };
      }

      const secret = isRefreshToken ? this.refreshSecret : this.jwtSecret;
      const expectedType = isRefreshToken ? 'refresh' : 'access';

      const payload = this.jwtService.verify<ITokenPayload>(token, { secret });

      // Vérifier le type de token
      if (payload.type !== expectedType) {
        this.logger.warn('Type de token incorrect', {
          expected: expectedType,
          received: payload.type,
        });
        return { valid: false, error: `Type de token incorrect. Attendu: ${expectedType}` };
      }

      // Vérifier si l'utilisateur existe toujours
      const user = await this.userService.findUserById(payload.sub);
      if (!user) {
        this.logger.warn('Utilisateur inexistant pour le token', { userId: payload.sub });
        return { valid: false, error: 'Utilisateur introuvable' };
      }

      this.logger.info('Token valide', {
        userId: payload.sub,
        type: payload.type,
        exp: payload.exp,
      });

      return {
        valid: true,
        user: {
          id: payload.sub,
          username: payload.username,
          iat: payload.iat,
          exp: payload.exp,
        },
      };
    } catch (error) {
      this.logger.error('Erreur lors de la validation du token', error);

      if (error.name === 'JsonWebTokenError') {
        return { valid: false, error: 'Token invalide' };
      }
      if (error.name === 'TokenExpiredError') {
        return { valid: false, error: 'Token expiré' };
      }

      return { valid: false, error: 'Erreur de validation du token' };
    }
  }

  /**
   * Renouvellement d'un token d'accès via refresh token
   */
  public async refreshAccessToken(refreshToken: string): Promise<IRefreshTokenResponse> {
    this.logger.info("Renouvellement du token d'accès");

    if (!refreshToken) {
      throw new BadRequestException('Refresh token manquant');
    }

    const validation = await this.validateToken(refreshToken, true);

    if (!validation.valid || !validation.user) {
      this.logger.warn('Refresh token invalide');
      throw new UnauthorizedException('Refresh token invalide');
    }

    // Récupérer l'utilisateur complet
    const user = await this.userService.findUserById(validation.user.id);
    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }

    const tokens = this.generateTokens(user);

    this.logger.info("Token d'accès renouvelé avec succès", { userId: user.user_id.toString() });

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in: this.accessTokenExpiresIn,
    };
  }

  /**
   * Extraction du payload d'un token sans validation complète
   */
  public decodeToken(token: string): ITokenPayload | null {
    try {
      const decoded = this.jwtService.decode(token);
      return decoded as ITokenPayload;
    } catch (error) {
      this.logger.error('Erreur lors du décodage du token', error);
      return null;
    }
  }

  /**
   * Validation et récupération des informations utilisateur depuis un token
   */
  public async getCurrentUserFromToken(token: string): Promise<ICurrentUser | null> {
    const validation = await this.validateToken(token);

    if (!validation.valid || !validation.user) {
      return null;
    }

    return {
      id: validation.user.id,
      username: validation.user.username,
    };
  }

  /**
   * Validation d'un utilisateur Google et création/récupération
   */
  public async validateGoogleUser(googleUser: GoogleUser) {
    this.logger.info('Validation utilisateur Google', { email: googleUser.email });

    // Chercher l'utilisateur par email
    const user = await this.userService.findUserByEmail(googleUser.email);

    if (!user) {
      this.logger.info('Création nouvel utilisateur Google', { email: googleUser.email });

      // Créer un nouvel utilisateur si il n'existe pas
      const createUserDto: CreateUserDto = {
        email: googleUser.email,
        username: `${googleUser.firstName}_${googleUser.lastName}`,
        password: Math.random().toString(36).slice(-8), // Mot de passe temporaire
      };

      const newUser = await this.userService.createUser(createUserDto);
      return newUser;
    }

    // Retourner l'utilisateur existant sans le passwordHash
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Vérification et connexion avec Google ID Token
   */
  public async verifyGoogleIdTokenAndLogin(idToken: string): Promise<IAuthResponse> {
    try {
      this.logger.info('Vérification du Google ID Token');

      // Vérifier le token ID avec Google
      const ticket = await this.googleOAuth2Client.verifyIdToken({
        idToken,
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new UnauthorizedException('Token ID Google invalide');
      }

      this.logger.info('Token ID Google vérifié avec succès', { email: payload.email });

      // Créer ou récupérer l'utilisateur basé sur les données Google
      const googleUserData: GoogleUser = {
        email: payload.email ?? '',
        firstName: payload.given_name ?? '',
        lastName: payload.family_name ?? '',
        picture: payload.picture ?? '',
        accessToken: '', // Non nécessaire pour cette méthode
        refreshToken: '', // Non nécessaire pour cette méthode
      };

      // Valider/créer l'utilisateur
      const user = await this.validateGoogleUser(googleUserData);

      // Générer nos tokens JWT et retourner la réponse d'authentification
      return this.login(user);
    } catch (error) {
      this.logger.error('Erreur lors de la vérification du Google ID Token', error);
      throw new UnauthorizedException('Échec de la vérification du token Google');
    }
  }

  /**
   * Connexion Google avec génération de tokens
   */
  public googleLogin(user: any): Promise<IAuthResponse> {
    if (!user) {
      throw new UnauthorizedException("Échec de l'authentification Google");
    }

    this.logger.info('Connexion Google réussie', { userId: user.user_id });
    return Promise.resolve(this.login(user));
  }

  /**
   * Révocation d'un token (pour la déconnexion)
   * Note: Pour une implémentation complète, il faudrait maintenir une blacklist des tokens
   */
  public revokeToken(_token: string): Promise<boolean> {
    this.logger.info('Révocation du token');

    // TODO: Implémenter une blacklist des tokens si nécessaire
    // Pour l'instant, retourne true car la validation se base sur la signature et l'expiration

    return Promise.resolve(true);
  }
}
