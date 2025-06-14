import { Module } from '@nestjs/common';
import { PrankPacksController } from './prank-packs.controller';
import { MicroservicesModule } from '../microservices/microservices.module';

@Module({
  imports: [MicroservicesModule],
  controllers: [PrankPacksController],
})
export class PrankPacksModule {}
