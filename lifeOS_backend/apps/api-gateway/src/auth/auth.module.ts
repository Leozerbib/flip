import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleStrategy } from './strategies/google.strategy';
import { MicroservicesModule } from '../microservices/microservices.module';

@Module({
  imports: [PassportModule, MicroservicesModule],
  controllers: [AuthController],
  providers: [JwtAuthGuard, GoogleStrategy],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
