import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoggerService } from 'libs/logger/src';

@Controller('health')
export class HealthController {
  constructor(private readonly logger: LoggerService) {
    this.logger.setContext('Health.controller - User Service');
  }

  @MessagePattern({ cmd: 'health' })
  public checkHealth(): { status: string; timestamp: string; service: string } {
    this.logger.info('Health check requested');
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'user-service',
    };
  }
}
