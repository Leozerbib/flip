import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BanqueController } from './banque.controller';
import { BanqueService } from './banque.service';
import { HealthController } from './health/health.controller';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from 'libs/logger/src';
import { GlobalConfigModule } from '@app/config';
import { ExceptionsModule } from '@app/exceptions';

@Module({
  imports: [
    GlobalConfigModule,
    LoggerModule,
    PrismaModule,
    ExceptionsModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4003,
        },
      },
    ]),
  ],
  controllers: [BanqueController, HealthController],
  providers: [BanqueService],
  exports: [BanqueService],
})
export class BanqueModule {}
