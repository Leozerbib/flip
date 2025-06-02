import { Module } from '@nestjs/common';
import { GlobalConfigModule } from '@app/config';
import { AuthModule } from './auth/auth.module';
import { MicroservicesModule } from './microservices/microservices.module';
import { LoggerModule } from 'libs/logger/src';

@Module({
  imports: [GlobalConfigModule, LoggerModule, MicroservicesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
