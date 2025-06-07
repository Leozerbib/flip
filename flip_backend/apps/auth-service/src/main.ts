import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { LoggerService } from 'libs/logger/src';
import { GlobalExceptionFilter } from '@app/exceptions';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.AUTH_SERVICE_HOST ?? 'localhost',
      port: parseInt(process.env.AUTH_SERVICE_PORT ?? '4002'),
    },
  });

  // Global Exception Filter for microservice
  app.useGlobalFilters(app.get(GlobalExceptionFilter));

  const logger = app.get(LoggerService);
  logger.setContext('Auth.main');

  logger.info(`🌐 Auth Service is running on port ${process.env.AUTH_SERVICE_PORT}`);

  await app.listen();
}
void bootstrap();
