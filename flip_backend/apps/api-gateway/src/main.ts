import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApiGatewayModule } from './api-gateway.module';
import { LoggerService } from 'libs/logger/src';
import { GlobalConfigService } from '@app/config';
async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const globalConfig = app.get(GlobalConfigService);

  // Enable CORS
  app.enableCors();

  // Configuration des pipes de validation globaux
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Préfixe global pour les API
  app.setGlobalPrefix('api');

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('LifeOS API Gateway')
    .setDescription("API Gateway pour l'écosystème LifeOS - Architecture Microservices")
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('http://localhost:4001', 'API Gateway')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'LifeOS API Documentation',
    customfavIcon: '/favicon.ico',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const port = globalConfig.services.apiGateway.port;
  await app.listen(port);
  const logger = app.get(LoggerService);
  logger.setContext('API.main');

  logger.info(`🌐 API Gateway is running on port ${port}`);
  logger.info(`📖 API Documentation: http://localhost:${port}/api`);
  logger.info(`🔍 Swagger UI: http://localhost:${port}/api`);
}

void bootstrap();
