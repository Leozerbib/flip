import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { firstValueFrom, timeout, catchError, of } from 'rxjs';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('BANQUE_SERVICE') private readonly bankClient: ClientProxy
  ) {}

  @Get()
  @ApiOperation({ summary: "Vérifier l'état de santé de l'API Gateway" })
  @ApiResponse({
    status: 200,
    description: 'Service opérationnel',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        timestamp: { type: 'string', format: 'date-time' },
        service: { type: 'string', example: 'api-gateway' },
        services: {
          type: 'object',
          properties: {
            authService: { type: 'string', example: 'ok' },
          },
        },
      },
    },
  })
  public async check() {
    const services: Record<string, string> = {};

    // Vérifier le service auth de manière optionnelle
    try {
      console.log('🔍 Auth Health', this.authClient);
      const authHealth = await firstValueFrom(
        this.authClient.send<any>({ cmd: 'health' }, {}).pipe(
          timeout(2000), // Timeout de 2 secondes
          catchError(() => of({ status: 'unavailable' }))
        )
      );
      services.authService = authHealth.status ?? 'unavailable';
    } catch {
      services.authService = 'unavailable';
    }

    // Vérifier le service user de manière optionnelle
    try {
      console.log('🔍 User Health', this.userClient);
      const userHealth = await firstValueFrom(
        this.userClient.send<any>({ cmd: 'health' }, {}).pipe(
          timeout(2000), // Timeout de 2 secondes
          catchError(() => of({ status: 'unavailable' }))
        )
      );
      services.userService = userHealth.status ?? 'unavailable';
    } catch {
      services.userService = 'unavailable';
    }

    // Vérifier le service bank de manière optionnelle
    try {
      console.log('🔍 Bank Health', this.bankClient);
      const bankHealth = await firstValueFrom(
        this.bankClient.send<any>({ cmd: 'health' }, {}).pipe(
          timeout(2000), // Timeout de 2 secondes
          catchError(() => of({ status: 'unavailable' }))
        )
      );
      services.bankService = bankHealth.status ?? 'unavailable';
    } catch {
      services.bankService = 'unavailable';
    }

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'api-gateway',
      services,
    };
  }
}
