import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';
import { UserInventoryController } from './user-inventory.controller';
import { UserInventoryService } from './user-inventory.service';
import { UserPranksController } from './user-pranks.controller';
import { UserPranksService } from './user-pranks.service';
import { HealthController } from './health/health.controller';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from 'libs/logger/src';
import { GlobalConfigModule } from '@app/config';
import { ExceptionsModule } from '@app/exceptions';

@Module({
  imports: [GlobalConfigModule, LoggerModule, PrismaModule, ExceptionsModule],
  controllers: [
    UserController,
    FriendshipController,
    UserInventoryController,
    UserPranksController,
    HealthController,
  ],
  providers: [UserService, FriendshipService, UserInventoryService, UserPranksService],
  exports: [UserService, FriendshipService, UserInventoryService, UserPranksService],
})
export class UserModule {}
