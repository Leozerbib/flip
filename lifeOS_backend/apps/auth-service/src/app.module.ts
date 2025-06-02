import { Module } from '@nestjs/common';
import { GlobalConfigModule } from '@app/config';
import { LoggerModule } from 'libs/logger/src';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [GlobalConfigModule, LoggerModule, PrismaModule, UserModule, AuthModule],
  controllers: [HealthController],
})
export class AppModule {}
