import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { PrankPackService } from './prank-pack.service';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from 'libs/logger/src';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [ShopController],
  providers: [ShopService, PrankPackService],
})
export class ShopModule {}
