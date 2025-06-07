import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';
import { HealthController } from './health/health.controller';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from 'libs/logger/src';
import { GlobalConfigModule } from '@app/config';
import { ExceptionsModule } from '@app/exceptions';

@Module({
  imports: [GlobalConfigModule, LoggerModule, PrismaModule, ExceptionsModule],
  controllers: [UserController, FriendshipController, HealthController],
  providers: [UserService, FriendshipService],
  exports: [UserService, FriendshipService],
})
export class UserModule {}
