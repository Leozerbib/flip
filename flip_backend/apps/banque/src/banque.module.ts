import { Module } from '@nestjs/common';
import { BanqueController } from './banque.controller';
import { BanqueService } from './banque.service';
import { HealthController } from './health/health.controller';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from 'libs/logger/src';
import { GlobalConfigModule } from '@app/config';

@Module({
  imports: [GlobalConfigModule, LoggerModule, PrismaModule],
  controllers: [BanqueController, HealthController],
  providers: [BanqueService],
  exports: [BanqueService],
})
export class BanqueModule {}
