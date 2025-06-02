import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoggerService } from 'libs/logger/src';

/**
 * Contrôleur de santé pour le microservice Banque
 */
@Controller()
export class HealthController {
  constructor(private readonly logger: LoggerService) {
    this.logger.setContext('Health.controller - Banque Service');
  }

  @MessagePattern({ cmd: 'health' })
  public healthCheck(): { status: string; service: string; timestamp: string } {
    this.logger.info('Health check requested');
    return {
      status: 'ok',
      service: 'banque-service',
      timestamp: new Date().toISOString(),
    };
  }
}
