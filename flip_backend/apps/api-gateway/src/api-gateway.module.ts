import { Module } from '@nestjs/common';
import { GlobalConfigModule } from '@app/config';
import { AuthModule } from './auth/auth.module';
import { FriendshipsModule } from './friendships/friendships.module';
import { PrankPacksModule } from './prank-packs/prank-packs.module';
import { MicroservicesModule } from './microservices/microservices.module';
import { LoggerModule } from 'libs/logger/src';
import { ExceptionsModule } from '@app/exceptions';

@Module({
  imports: [
    GlobalConfigModule,
    LoggerModule,
    MicroservicesModule,
    AuthModule,
    FriendshipsModule,
    PrankPacksModule,
    ExceptionsModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
