import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ShopModule } from './shop.module';
import { LoggerService } from 'libs/logger/src';

async function bootstrap() {
  // Création du microservice avec transport TCP
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ShopModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.SHOP_SERVICE_HOST ?? 'localhost',
      port: parseInt(process.env.SHOP_SERVICE_PORT ?? '4005'),
    },
  });

  // Initialisation du logger
  const logger = app.get(LoggerService);
  logger.setContext('Shop.main');

  // Démarrage du microservice
  await app.listen();

  logger.info(`🛒 Shop Service is running on port ${process.env.SHOP_SERVICE_PORT ?? '4005'}`);
}

bootstrap().catch(error => {
  console.error('❌ Erreur lors du démarrage du Shop Service:', error);
  process.exit(1);
});
