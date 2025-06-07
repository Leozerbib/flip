import { Module } from '@nestjs/common';
import { FriendshipsController } from './friendships.controller';
import { MicroservicesModule } from '../microservices/microservices.module';
import { ExceptionsModule } from '@app/exceptions';

@Module({
  imports: [MicroservicesModule, ExceptionsModule],
  controllers: [FriendshipsController],
})
export class FriendshipsModule {}
