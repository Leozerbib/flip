import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleStrategy } from './strategies/google.strategy';
import { MicroservicesModule } from '../microservices/microservices.module';
import { ExceptionsModule } from '@app/exceptions';

@Module({
  imports: [PassportModule, MicroservicesModule, ExceptionsModule],
  controllers: [AuthController],
  providers: [JwtAuthGuard, GoogleStrategy],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
