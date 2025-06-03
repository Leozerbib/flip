import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IGlobalConfig } from './config.interface';

@Injectable()
export class GlobalConfigService {
  constructor(private readonly configService: ConfigService) {}

  get config(): IGlobalConfig {
    return {
      database: {
        url: this.configService.get<string>('DATABASE_URL', ''),
        user: this.configService.get<string>('POSTGRES_USER', 'lifeos_user'),
        password: this.configService.get<string>('POSTGRES_PASSWORD', 'lifeos_password'),
        host: this.configService.get<string>('POSTGRES_HOST', 'localhost'),
        port: this.configService.get<number>('POSTGRES_PORT', 4444),
        name: this.configService.get<string>('POSTGRES_DB', 'lifeos_db'),
      },

      jwt: {
        secret: this.configService.get<string>('JWT_SECRET', 'default-secret'),
        refreshSecret: this.configService.get<string>(
          'JWT_REFRESH_SECRET',
          'default-refresh-secret'
        ),
        accessExpiresIn: this.configService.get<number>('JWT_ACCESS_EXPIRES_IN', 3600),
        refreshExpiresIn: this.configService.get<number>('JWT_REFRESH_EXPIRES_IN', 604800),
      },

      google: {
        clientId: this.configService.get<string>('GOOGLE_CLIENT_ID', ''),
        clientSecret: this.configService.get<string>('GOOGLE_CLIENT_SECRET', ''),
        callbackUrl: this.configService.get<string>(
          'GOOGLE_CALLBACK_URL',
          'http://localhost:4001/api/auth/google/callback'
        ),
      },

      services: {
        authService: {
          host: this.configService.get<string>('AUTH_SERVICE_HOST', 'localhost'),
          port: this.configService.get<number>('AUTH_SERVICE_PORT', 4002),
        },
        userService: {
          host: this.configService.get<string>('USER_SERVICE_HOST', 'localhost'),
          port: this.configService.get<number>('USER_SERVICE_PORT', 4003),
        },
        bankService: {
          host: this.configService.get<string>('BANK_SERVICE_HOST', 'localhost'),
          port: this.configService.get<number>('BANK_SERVICE_PORT', 4004),
        },
        apiGateway: {
          port: this.configService.get<number>('API_GATEWAY_PORT', 4001),
        },
      },

      app: {
        nodeEnv: this.configService.get<string>('NODE_ENV', 'development'),
        frontendUrl: this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000'),
      },
    };
  }

  // Méthodes d'accès rapide
  get database() {
    return this.config.database;
  }

  get jwt() {
    return this.config.jwt;
  }

  get google() {
    return this.config.google;
  }

  get services() {
    return this.config.services;
  }

  get app() {
    return this.config.app;
  }

  // Méthode pour afficher la configuration (pour debug)
  logConfig() {
    const config = this.config;
    console.log('🔧 Configuration globale chargée:', {
      database: {
        ...config.database,
        password: '***masked***', // Masquer le mot de passe
      },
      jwt: {
        ...config.jwt,
        secret: '***masked***',
        refreshSecret: '***masked***',
      },
      google: {
        ...config.google,
        clientSecret: config.google.clientSecret ? '***masked***' : 'NOT_SET',
      },
      services: config.services,
      app: config.app,
    });
  }
}
