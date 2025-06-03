import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HealthController } from './health/health.controller';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from 'libs/logger/src';
import { GlobalConfigModule } from '@app/config';

@Module({
  imports: [GlobalConfigModule, LoggerModule, PrismaModule],
  controllers: [UserController, HealthController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
