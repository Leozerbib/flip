import { Controller, Get, Post, Param, Query, Inject, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { IServiceWithDetails } from '@app/contracts/Service/interfaces/service.interface';
import { ServiceWithDetailsDto } from '@app/contracts/Service/dtos/service.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Log } from 'libs/logger/src';
import { ICurrentUser } from '@app/contracts/Auth/interfaces/auth.interface';

/**
 * Contrôleur API Gateway principal pour les fonctionnalités Banque
 * Gère les opérations croisées entre services et pranks
 * Communique avec le microservice Banque via TCP
 */
@ApiTags('banque')
@Controller('banque')
export class BanqueController {
  constructor(@Inject('BANQUE_SERVICE') private readonly banqueClient: ClientProxy) {}

  // ==================== CROSS-FUNCTIONALITY OPERATIONS ====================

  @Get('users/services')
  @Log('Récupération services utilisateur (Banque)', 'info')
  @Auth()
  @ApiOperation({
    summary: "Récupérer les services de l'utilisateur actuel via microservice Banque",
  })
  @ApiQuery({ name: 'page', required: false, description: 'Numéro de page' })
  @ApiQuery({ name: 'limit', required: false, description: "Nombre d'éléments par page" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Services de l'utilisateur récupérés avec succès",
    type: [ServiceWithDetailsDto],
  })
  public async getUserServices(
    @CurrentUser() user: ICurrentUser,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<IServiceWithDetails[]> {
    return firstValueFrom(
      this.banqueClient.send<IServiceWithDetails[]>(
        { cmd: 'get_user_services' },
        { userId: user.id, page, limit }
      )
    );
  }

  @Get('users/pranks')
  @Log('Récupération pranks utilisateur (Banque)', 'info')
  @Auth()
  @ApiOperation({ summary: "Récupérer les pranks de l'utilisateur actuel via microservice Banque" })
  @ApiQuery({ name: 'page', required: false, description: 'Numéro de page' })
  @ApiQuery({ name: 'limit', required: false, description: "Nombre d'éléments par page" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Pranks de l'utilisateur récupérés avec succès",
    type: [ServiceWithDetailsDto],
  })
  public async getUserPranks(
    @CurrentUser() user: ICurrentUser,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<IServiceWithDetails[]> {
    return firstValueFrom(
      this.banqueClient.send<IServiceWithDetails[]>(
        { cmd: 'get_user_pranks' },
        { userId: user.id, page, limit }
      )
    );
  }

  @Post('services/:serviceId/repay/prank/:executedPrankId')
  @Log('Remboursement service par prank (Banque)', 'info')
  @Auth()
  @ApiOperation({ summary: 'Rembourser un service avec un prank exécuté via microservice Banque' })
  @ApiParam({ name: 'serviceId', description: 'ID du service à rembourser' })
  @ApiParam({
    name: 'executedPrankId',
    description: "ID de l'exécution de prank utilisée pour le remboursement",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service remboursé avec succès par le prank',
    type: ServiceWithDetailsDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Service ou prank exécuté non trouvé' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Remboursement invalide' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Non autorisé à effectuer ce remboursement',
  })
  public async repayServiceWithPrank(
    @Param('serviceId') serviceId: string,
    @Param('executedPrankId') executedPrankId: string
  ): Promise<IServiceWithDetails | null> {
    return firstValueFrom(
      this.banqueClient.send<IServiceWithDetails | null>(
        { cmd: 'repay_service_with_prank' },
        { serviceId: parseInt(serviceId), executedPrankId: parseInt(executedPrankId) }
      )
    );
  }

  @Get('dashboard/stats')
  @Log('Récupération statistiques dashboard (Banque)', 'info')
  @Auth()
  @ApiOperation({ summary: 'Récupérer les statistiques du dashboard via microservice Banque' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Statistiques du dashboard récupérées avec succès',
    schema: {
      type: 'object',
      properties: {
        services: {
          type: 'object',
          description: 'Statistiques des services',
        },
        pranks: {
          type: 'object',
          description: 'Statistiques des pranks',
        },
        combined: {
          type: 'object',
          properties: {
            total_repayments: {
              type: 'number',
              description: 'Nombre total de remboursements',
            },
            services_repayments: {
              type: 'number',
              description: 'Nombre de remboursements par services',
            },
            pranks_repayments: {
              type: 'number',
              description: 'Nombre de remboursements par pranks',
            },
            pending_actions: {
              type: 'number',
              description: "Nombre d'actions en attente",
            },
          },
        },
      },
    },
  })
  public async getDashboardStats(): Promise<{
    services: any;
    pranks: any;
    combined: {
      total_repayments: number;
      services_repayments: number;
      pranks_repayments: number;
      pending_actions: number;
    };
  }> {
    return firstValueFrom(
      this.banqueClient.send<{
        services: any;
        pranks: any;
        combined: {
          total_repayments: number;
          services_repayments: number;
          pranks_repayments: number;
          pending_actions: number;
        };
      }>({ cmd: 'get_dashboard_stats' }, {})
    );
  }

  // ==================== HEALTH CHECK ====================

  @Get('health')
  @ApiOperation({ summary: 'Vérifier la santé du microservice Banque' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Microservice Banque opérationnel',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'healthy' },
        timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
        service: { type: 'string', example: 'banque-microservice' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.SERVICE_UNAVAILABLE,
    description: 'Microservice Banque indisponible',
  })
  public async healthCheck(): Promise<{ status: string; timestamp: string; service: string }> {
    try {
      const result = await firstValueFrom(
        this.banqueClient.send<{ status: string; timestamp: string }>({ cmd: 'health_check' }, {})
      );
      return {
        ...result,
        service: 'banque-microservice',
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        service: 'banque-microservice',
      };
    }
  }
}
