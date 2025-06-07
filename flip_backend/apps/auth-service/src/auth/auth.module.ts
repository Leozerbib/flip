import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LoggerModule } from 'libs/logger/src';
import { ExceptionsModule } from '@app/exceptions';

/**
 * Module d'authentification (TCP uniquement)
 * Toutes les fonctionnalités HTTP sont gérées par l'API Gateway
 */
@Module({
  imports: [
    ConfigModule,
    UserModule,
    LoggerModule,
    ExceptionsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'default-secret'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRES_IN', '3600s'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
