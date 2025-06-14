import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from './prisma/prisma.service';
import { LoggerService } from 'libs/logger/src';
import { ExceptionThrower } from '@app/exceptions';
import { ServiceService } from './service/service.service';
import { PrankService } from './prank/prank.service';
import { IServiceWithDetails } from '@app/contracts/Service/interfaces/service.interface';
import { ExecutedPrankStatusEnum, ServiceStatusEnum } from '@app/contracts';

@Injectable()
export class BanqueService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService,
    private readonly exceptionThrower: ExceptionThrower,
    private readonly serviceService: ServiceService,
    private readonly prankService: PrankService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy
  ) {
    this.logger.setContext('Banque.service');
  }

  // ==================== CROSS-FUNCTIONALITY OPERATIONS ====================

  /**
   * Obtenir les services utilisateur (délègue au ServiceService)
   */
  public async getUserServices(
    userId: number,
    page: string,
    limit: string
  ): Promise<IServiceWithDetails[]> {
    this.logger.info('Récupération des services utilisateur (via banque)', {
      userId: userId.toString(),
    });
    return await this.serviceService.getUserServices(userId, page, limit);
  }

  /**
   * Obtenir les pranks utilisateur - version simplifiée
   * Cette méthode retourne les services qui ont été remboursés par des pranks
   */
  public async getUserPranks(
    userId: number,
    page: string,
    limit: string
  ): Promise<IServiceWithDetails[]> {
    this.logger.info('Récupération des pranks utilisateur (via banque)', {
      userId: userId.toString(),
    });

    try {
      const pranks = await this.prisma.services.findMany({
        where: {
          OR: [
            { beneficiary_id: parseInt(userId.toString()) },
            { provider_id: parseInt(userId.toString()) },
          ],
          executed_prank_id_repayment: {
            not: null,
          },
        },
        include: {
          users_services_provider_idTousers: {
            select: {
              user_id: true,
              username: true,
              profile_picture_url: true,
            },
          },
          users_services_beneficiary_idTousers: {
            select: {
              user_id: true,
              username: true,
              profile_picture_url: true,
            },
          },
          service_categories: true,
          services: true,
          executed_pranks_services_executed_prank_id_repaymentToexecuted_pranks: {
            include: {
              pranks: {
                select: {
                  prank_id: true,
                  name: true,
                },
              },
            },
          },
        },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        orderBy: {
          repaid_at: 'desc',
        },
      });

      return pranks.map(service => ({
        ...service,
        provider: {
          user_id: service.users_services_provider_idTousers.user_id,
          username: service.users_services_provider_idTousers.username,
          profile_picture_url: service.users_services_provider_idTousers.profile_picture_url,
        },
        beneficiary: {
          user_id: service.users_services_beneficiary_idTousers.user_id,
          username: service.users_services_beneficiary_idTousers.username,
          profile_picture_url: service.users_services_beneficiary_idTousers.profile_picture_url,
        },
        category: service.service_categories,
        repayment_service: service.services,
        executed_prank_repayment:
          service.executed_pranks_services_executed_prank_id_repaymentToexecuted_pranks
            ? {
                executed_prank_id:
                  service.executed_pranks_services_executed_prank_id_repaymentToexecuted_pranks
                    .executed_prank_id,
                chosen_prank_id:
                  service.executed_pranks_services_executed_prank_id_repaymentToexecuted_pranks
                    .chosen_prank_id,
                prank_name:
                  service.executed_pranks_services_executed_prank_id_repaymentToexecuted_pranks
                    .pranks.name,
              }
            : undefined,
      })) as IServiceWithDetails[];
    } catch (error) {
      this.logger.error('Erreur lors de la récupération des pranks utilisateur', error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'get_user_pranks',
        originalError: error.message,
      });
    }
  }

  /**
   * Marquer un service comme remboursé par un prank
   */
  public async repayServiceWithPrank(
    serviceId: number,
    executedPrankId: number
  ): Promise<IServiceWithDetails | null> {
    this.logger.info('Remboursement du service par un prank', {
      serviceId,
      executedPrankId,
    });

    const [service, executedPrank] = await Promise.all([
      this.serviceService.findServiceById(serviceId),
      this.prankService.findExecutedPrankById(executedPrankId),
    ]);

    if (!service) {
      this.exceptionThrower.throwRecordNotFound('Service non trouvé');
    }

    if (!executedPrank) {
      this.exceptionThrower.throwRecordNotFound('Prank exécuté non trouvé');
    }

    if (service.status !== ServiceStatusEnum.CONFIRMED_UNPAID) {
      this.exceptionThrower.throwValidation(
        'Le service doit être confirmé et non payé pour être remboursé',
        [
          {
            field: 'serviceId',
            value: serviceId,
            constraints: [service.status],
          },
        ]
      );
    }

    if (executedPrank.status !== ExecutedPrankStatusEnum.VALIDATED_BY_TARGET_COMPLETED) {
      this.exceptionThrower.throwValidation('Le prank doit être validé et complété', [
        {
          field: 'executedPrankId',
          value: executedPrankId,
          constraints: [executedPrank.status],
        },
      ]);
    }

    // Vérifier que le prank concerne bien le remboursement de ce service
    if (executedPrank.service_being_repaid_id !== serviceId) {
      this.exceptionThrower.throwValidation(
        'Le prank exécuté doit concerner le remboursement de ce service',
        [
          {
            field: 'serviceId',
            value: serviceId,
            constraints: [executedPrank.service_being_repaid_id.toString()],
          },
        ]
      );
    }

    try {
      const repaidService = await this.prisma.services.update({
        where: { service_id: serviceId },
        data: {
          status: 'repaid_by_prank',
          executed_prank_id_repayment: executedPrankId,
          repaid_at: new Date(),
          updated_at: new Date(),
        },
      });

      this.logger.info('Service remboursé par prank avec succès', { serviceId, executedPrankId });

      // Retourner les détails complets du service
      return await this.serviceService.getServiceWithDetails(serviceId);
    } catch (error) {
      this.logger.error('Erreur lors du remboursement par prank', error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'repay_service_with_prank',
        originalError: error.message,
      });
    }
  }

  /**
   * Obtenir le dashboard combiné avec statistiques services et pranks
   */
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
    this.logger.info('Récupération des statistiques dashboard combinées');

    try {
      const [serviceStats, prankStats, repaymentStats] = await Promise.all([
        this.serviceService.getServiceStats(),
        this.prankService.getPrankStats(),
        this.prisma.services.groupBy({
          by: ['status'],
          _count: {
            service_id: true,
          },
          where: {
            status: {
              in: ['repaid_by_service', 'repaid_by_prank'],
            },
          },
        }),
      ]);

      const servicesRepayments =
        repaymentStats.find(s => s.status === 'repaid_by_service')?._count.service_id ?? 0;
      const pranksRepayments =
        repaymentStats.find(s => s.status === 'repaid_by_prank')?._count.service_id ?? 0;

      return {
        services: serviceStats,
        pranks: prankStats,
        combined: {
          total_repayments: servicesRepayments + pranksRepayments,
          services_repayments: servicesRepayments,
          pranks_repayments: pranksRepayments,
          pending_actions: serviceStats.pending_services + prankStats.pending_executions,
        },
      };
    } catch (error) {
      this.logger.error('Erreur lors de la récupération des statistiques dashboard', error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'get_dashboard_stats',
        originalError: error.message,
      });
    }
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Trouver un utilisateur par ID via le microservice User
   */
  private async findUserById(userId: number): Promise<any> {
    try {
      return await firstValueFrom(
        this.userClient.send({ cmd: 'find_user_by_id' }, userId.toString())
      );
    } catch (error) {
      this.logger.error('Erreur récupération utilisateur', error);
      return null;
    }
  }
}
