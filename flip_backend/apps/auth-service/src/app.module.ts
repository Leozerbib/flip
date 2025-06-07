import { Module } from '@nestjs/common';
import { GlobalConfigModule } from '@app/config';
import { LoggerModule } from 'libs/logger/src';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health/health.controller';
import { ExceptionsModule } from '@app/exceptions';

@Module({
  imports: [
    GlobalConfigModule,
    LoggerModule,
    PrismaModule,
    UserModule,
    AuthModule,
    ExceptionsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
