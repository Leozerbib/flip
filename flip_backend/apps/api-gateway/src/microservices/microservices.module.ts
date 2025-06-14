import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from '../auth/auth.controller';
import { HealthController } from '../health/health.controller';
import { UsersController } from '../users/users.controller';
import { UserInventoryController } from '../users/user-inventory.controller';
import { UserPranksController } from '../users/user-pranks.controller';
import { BanqueController } from '../banque/banque.controller';
import { BanqueServiceController } from '../banque/service.controller';
import { BanquePrankController } from '../banque/prank.controller';
import { UserEnrichmentInterceptor } from '../auth/interceptors/user-enrichment.interceptor';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST ?? 'localhost',
          port: parseInt(process.env.AUTH_SERVICE_PORT ?? '4002'),
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USER_SERVICE_HOST ?? 'localhost',
          port: parseInt(process.env.USER_SERVICE_PORT ?? '4003'),
        },
      },
      {
        name: 'BANQUE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.BANQUE_SERVICE_HOST ?? 'localhost',
          port: parseInt(process.env.BANQUE_SERVICE_PORT ?? '4004'),
        },
      },
      {
        name: 'SHOP_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.SHOP_SERVICE_HOST ?? 'localhost',
          port: parseInt(process.env.SHOP_SERVICE_PORT ?? '4005'),
        },
      },
    ]),
  ],
  controllers: [
    AuthController,
    HealthController,
    UsersController,
    UserInventoryController,
    UserPranksController,
    BanqueController,
    BanqueServiceController,
    BanquePrankController,
  ],
  providers: [UserEnrichmentInterceptor],
  exports: [ClientsModule],
})
export class MicroservicesModule {}
