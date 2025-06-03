import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';
import { LoggerService } from 'libs/logger/src';

async function bootstrap() {
  // Création du microservice avec transport TCP
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.USER_SERVICE_HOST ?? 'localhost',
      port: parseInt(process.env.USER_SERVICE_PORT ?? '4003'),
    },
  });

  // Initialisation du logger
  const logger = app.get(LoggerService);
  logger.setContext('User.main');

  // Démarrage du microservice
  await app.listen();

  logger.info(`🌐 User Service is running on port ${process.env.USER_SERVICE_PORT ?? '4003'}`);
}

bootstrap().catch(error => {
  console.error('❌ Erreur lors du démarrage du User Service:', error);
  process.exit(1);
});
