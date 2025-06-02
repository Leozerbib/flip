import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BanqueModule } from './banque.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(BanqueModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.BANQUE_SERVICE_HOST ?? 'localhost',
      port: parseInt(process.env.BANQUE_SERVICE_PORT ?? '4004'),
    },
  });

  await app.listen();
  console.log('🏦 Banque Service is running on port 4004');
}

bootstrap();
