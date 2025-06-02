import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from '../auth/auth.controller';
import { HealthController } from '../health/health.controller';
import { UsersController } from '../users/users.controller';
import { ServicesController } from '../services/services.controller';
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
    ]),
  ],
  controllers: [AuthController, HealthController, UsersController, ServicesController],
  providers: [UserEnrichmentInterceptor],
  exports: [ClientsModule, UserEnrichmentInterceptor],
})
export class MicroservicesModule {}
