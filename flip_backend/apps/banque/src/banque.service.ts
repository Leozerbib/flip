import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from './prisma/prisma.service';
import { LoggerService } from 'libs/logger/src';
import { ExceptionThrower } from '@app/exceptions';
import {
  CreateServiceDto,
  UpdateServiceDto,
  CreateServiceCategoryDto,
} from '@app/contracts/Service/dtos/service.dto';
import {
  IService,
  IServiceWithDetails,
  IServiceStats,
  IServiceCategory,
  IServiceFilters,
} from '@app/contracts/Service/interfaces/service.interface';
import { ServiceStatusEnum } from '@app/contracts/types/common.types';

@Injectable()
export class BanqueService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService,
    private readonly exceptionThrower: ExceptionThrower,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy
  ) {
    this.logger.setContext('Banque.service');
  }

  // ==================== SERVICE CRUD OPERATIONS ====================

  /**
   * Créer un nouveau service
   */
  public async createService(
    providerId: number,
    createServiceDto: CreateServiceDto
  ): Promise<IService> {
    this.logger.info("Création d'un nouveau service", {
      providerId,
      beneficiaryId: createServiceDto.beneficiary_id,
      jetonValue: createServiceDto.jeton_value,
    });

    // Vérifier que le provider et beneficiary existent
    const [provider, beneficiary] = await Promise.all([
      this.findUserById(providerId),
      this.findUserById(createServiceDto.beneficiary_id),
    ]);

    if (!provider) {
      this.exceptionThrower.throwRecordNotFound('Fournisseur de service non trouvé');
    }

    if (!beneficiary) {
      this.exceptionThrower.throwRecordNotFound('Bénéficiaire du service non trouvé');
    }

    if (providerId === createServiceDto.beneficiary_id) {
      this.exceptionThrower.throwValidation(
        'Un utilisateur ne peut pas se rendre service à lui-même',
        [
          {
            field: 'providerId',
            value: providerId,
            constraints: [createServiceDto.beneficiary_id.toString()],
          },
        ]
      );
    }

    // Vérifier que les utilisateurs sont amis
    const friendshipStatus = await this.checkFriendshipStatus(
      providerId,
      createServiceDto.beneficiary_id
    );
    if (friendshipStatus !== 'accepted') {
      this.exceptionThrower.throwForbidden("Un service ne peut être créé qu'entre amis");
    }

    // Vérifier la catégorie si fournie
    if (createServiceDto.category_id) {
      const category = await this.prisma.service_categories.findUnique({
        where: { category_id: createServiceDto.category_id },
      });
      if (!category) {
        this.exceptionThrower.throwRecordNotFound('Catégorie de service non trouvée');
      }
    }

    try {
      const service = await this.prisma.services.create({
        data: {
          provider_id: providerId,
          beneficiary_id: createServiceDto.beneficiary_id,
          category_id: createServiceDto.category_id,
          description: createServiceDto.description,
          jeton_value: createServiceDto.jeton_value,
          status: ServiceStatusEnum.PENDING_CONFIRMATION,
        },
      });

      this.logger.info('Service créé avec succès', { serviceId: service.service_id });
      return service as IService;
    } catch (error) {
      this.logger.error('Erreur lors de la création du service', error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'create_service',
        originalError: error.message,
      });
    }
  }

  /**
   * Mettre à jour un service
   */
  public async updateService(
    serviceId: number,
    updateServiceDto: UpdateServiceDto
  ): Promise<IService> {
    this.logger.info('Mise à jour du service', { serviceId });

    const service = await this.findServiceById(serviceId);
    if (!service) {
      this.exceptionThrower.throwRecordNotFound('Service non trouvé');
    }

    // Vérifier que le service peut être modifié
    if (service.status !== ServiceStatusEnum.PENDING_CONFIRMATION) {
      this.exceptionThrower.throwForbidden('Ce service ne peut plus être modifié');
    }

    // Vérifier la catégorie si fournie
    if (updateServiceDto.category_id) {
      const category = await this.prisma.service_categories.findUnique({
        where: { category_id: updateServiceDto.category_id },
      });
      if (!category) {
        this.exceptionThrower.throwRecordNotFound('Catégorie de service non trouvée');
      }
    }

    try {
      const updatedService = await this.prisma.services.update({
        where: { service_id: serviceId },
        data: {
          ...updateServiceDto,
          updated_at: new Date(),
        },
      });

      this.logger.info('Service mis à jour avec succès', { serviceId });
      return updatedService as IService;
    } catch (error) {
      this.logger.error('Erreur lors de la mise à jour', error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'update_service',
        originalError: error.message,
      });
    }
  }

  /**
   * Supprimer un service
   */
  public async deleteService(serviceId: number): Promise<{ message: string }> {
    this.logger.info('Suppression du service', { serviceId });

    const service = await this.findServiceById(serviceId);
    if (!service) {
      this.exceptionThrower.throwRecordNotFound('Service non trouvé');
    }

    // Vérifier que le service peut être supprimé
    if (service.status !== ServiceStatusEnum.PENDING_CONFIRMATION) {
      this.exceptionThrower.throwForbidden('Ce service ne peut plus être supprimé');
    }

    try {
      await this.prisma.services.delete({
        where: { service_id: serviceId },
      });

      this.logger.info('Service supprimé avec succès', { serviceId });
      return { message: 'Service supprimé avec succès' };
    } catch (error) {
      this.logger.error('Erreur lors de la suppression', error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'delete_service',
        originalError: error.message,
      });
    }
  }

  /**
   * Confirmer un service
   */
  public async confirmService(serviceId: number, beneficiaryId: number): Promise<IService> {
    this.logger.info('Confirmation du service', { serviceId, beneficiaryId });

    const service = await this.findServiceById(serviceId);
    if (!service) {
      this.exceptionThrower.throwRecordNotFound('Service non trouvé');
    }

    if (service.beneficiary_id !== beneficiaryId) {
      this.exceptionThrower.throwForbidden('Seul le bénéficiaire peut confirmer ce service');
    }

    if (service.status !== ServiceStatusEnum.PENDING_CONFIRMATION) {
      this.exceptionThrower.throwValidation('Ce service ne peut plus être confirmé', [
        {
          field: 'serviceId',
          value: serviceId,
          constraints: [service.status],
        },
      ]);
    }

    try {
      const confirmedService = await this.prisma.services.update({
        where: { service_id: serviceId },
        data: {
          status: ServiceStatusEnum.CONFIRMED_UNPAID,
          confirmed_at: new Date(),
          updated_at: new Date(),
        },
      });

      this.logger.info('Service confirmé avec succès', { serviceId });
      return confirmedService as IService;
    } catch (error) {
      this.logger.error('Erreur lors de la confirmation', error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'confirm_service',
        originalError: error.message,
      });
    }
  }

  /**
   * Marquer un service comme remboursé par un autre service
   */
  public async repayServiceWithService(
    serviceId: number,
    repaymentServiceId: number
  ): Promise<IService> {
    this.logger.info('Remboursement du service par un autre service', {
      serviceId,
      repaymentServiceId,
    });

    const [service, repaymentService] = await Promise.all([
      this.findServiceById(serviceId),
      this.findServiceById(repaymentServiceId),
    ]);

    if (!service) {
      this.exceptionThrower.throwRecordNotFound('Service original non trouvé');
    }

    if (!repaymentService) {
      this.exceptionThrower.throwRecordNotFound('Service de remboursement non trouvé');
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

    if (repaymentService.status !== ServiceStatusEnum.CONFIRMED_UNPAID) {
      this.exceptionThrower.throwValidation('Le service de remboursement doit être confirmé', [
        {
          field: 'repaymentServiceId',
          value: repaymentServiceId,
          constraints: [repaymentService.status],
        },
      ]);
    }

    // Vérifier la logique de remboursement : le débiteur du premier service doit être le créditeur du second
    if (service.beneficiary_id !== repaymentService.provider_id) {
      this.exceptionThrower.throwValidation(
        'Le débiteur du service original doit fournir le service de remboursement',
        [
          {
            field: 'serviceId',
            value: serviceId,
            constraints: [service.beneficiary_id.toString()],
          },
        ]
      );
    }

    try {
      const repaidService = await this.prisma.services.update({
        where: { service_id: serviceId },
        data: {
          status: ServiceStatusEnum.REPAID_BY_SERVICE,
          repayment_service_id: repaymentServiceId,
          repaid_at: new Date(),
          updated_at: new Date(),
        },
      });

      this.logger.info('Service remboursé avec succès', { serviceId, repaymentServiceId });
      return repaidService as IService;
    } catch (error) {
      this.logger.error('Erreur lors du remboursement', error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'repay_service',
        originalError: error.message,
      });
    }
  }

  // ==================== QUERY OPERATIONS ====================

  /**
   * Trouver un service par ID
   */
  public async findServiceById(serviceId: number): Promise<IService | null> {
    try {
      const service = await this.prisma.services.findUnique({
        where: { service_id: serviceId },
      });
      return service as IService | null;
    } catch (error) {
      this.logger.error('Erreur lors de la recherche par ID', error);
      return null;
    }
  }

  /**
   * Obtenir les détails complets d'un service avec jointures
   */
  public async getServiceWithDetails(serviceId: number): Promise<IServiceWithDetails | null> {
    this.logger.info('Récupération des détails du service', { serviceId });

    try {
      const service = await this.prisma.services.findUnique({
        where: { service_id: serviceId },
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
          services: true, // Service de remboursement
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
      });

      if (!service) {
        return null;
      }

      // Formater la réponse selon l'interface
      const result: IServiceWithDetails = {
        ...service,
        provider: {
          user_id: service.users_services_provider_idTousers.user_id,
          username: service.users_services_provider_idTousers.username,
          profile_picture_url: service.users_services_provider_idTousers.profile_picture_url ?? '',
        },
        beneficiary: {
          user_id: service.users_services_beneficiary_idTousers.user_id,
          username: service.users_services_beneficiary_idTousers.username,
          profile_picture_url:
            service.users_services_beneficiary_idTousers.profile_picture_url ?? '',
        },
        category: service.service_categories as IServiceCategory | undefined,
        repayment_service: service.services as IService | undefined,
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
      } as IServiceWithDetails;

      return result as IServiceWithDetails | null;
    } catch (error) {
      this.logger.error('Erreur lors de la récupération des détails', error);
      return null;
    }
  }

  /**
   * Rechercher des services avec filtres
   */
  public async findServicesWithFilters(filters: IServiceFilters): Promise<IServiceWithDetails[]> {
    this.logger.info('Recherche de services avec filtres', { filters });

    const whereClause: any = {};

    if (filters.status) {
      whereClause.status = filters.status;
    }

    if (filters.category_id) {
      whereClause.category_id = filters.category_id;
    }

    if (filters.provider_id) {
      whereClause.provider_id = filters.provider_id;
    }

    if (filters.beneficiary_id) {
      whereClause.beneficiary_id = filters.beneficiary_id;
    }

    if (filters.jeton_value_min || filters.jeton_value_max) {
      whereClause.jeton_value = {};
      if (filters.jeton_value_min) {
        whereClause.jeton_value.gte = filters.jeton_value_min;
      }
      if (filters.jeton_value_max) {
        whereClause.jeton_value.lte = filters.jeton_value_max;
      }
    }

    if (filters.created_after || filters.created_before) {
      whereClause.created_at = {};
      if (filters.created_after) {
        whereClause.created_at.gte = filters.created_after;
      }
      if (filters.created_before) {
        whereClause.created_at.lte = filters.created_before;
      }
    }

    try {
      const services = await this.prisma.services.findMany({
        where: whereClause,
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
        orderBy: {
          created_at: 'desc',
        },
      });

      return services.map(service => ({
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
        category: service.service_categories as IServiceCategory | undefined,
        repayment_service: service.services as IService | undefined,
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
    } catch (e) {
      this.logger.error('Erreur lors de la recherche filtrée', e);
      return [];
    }
  }

  public async getUserServices(
    userId: number,
    page: string,
    limit: string
  ): Promise<IServiceWithDetails[]> {
    this.logger.info('Récupération des services utilisateur', { userId: userId.toString() });

    try {
      const services = await this.prisma.services.findMany({
        where: {
          OR: [
            { beneficiary_id: parseInt(userId.toString()) },
            { provider_id: parseInt(userId.toString()) },
          ],
        },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
      });
      return services as IServiceWithDetails[];
    } catch (error) {
      this.logger.error('Erreur lors de la récupération des services', error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'get_user_services',
        originalError: error.message,
      });
    }
  }

  public async getUserPranks(
    userId: number,
    page: string,
    limit: string
  ): Promise<IServiceWithDetails[]> {
    this.logger.info('Récupération des pranks utilisateur', { userId: userId.toString() });

    try {
      const pranks = await this.prisma.services.findMany({
        where: {
          OR: [
            { beneficiary_id: parseInt(userId.toString()) },
            { provider_id: parseInt(userId.toString()) },
          ],
        },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
      });
      return pranks as IServiceWithDetails[];
    } catch (error) {
      this.logger.error('Erreur lors de la récupération des pranks', error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'get_user_pranks',
        originalError: error.message,
      });
    }
  }

  /**
   * Obtenir les statistiques des services
   */
  public async getServiceStats(): Promise<IServiceStats> {
    this.logger.info('Récupération des statistiques des services');

    try {
      const [totalServices, statusStats, valueStats] = await Promise.all([
        this.prisma.services.count(),
        this.prisma.services.groupBy({
          by: ['status'],
          _count: {
            service_id: true,
          },
        }),
        this.prisma.services.aggregate({
          _sum: {
            jeton_value: true,
          },
          _avg: {
            jeton_value: true,
          },
        }),
      ]);

      const pendingServices =
        statusStats.find(s => s.status === ServiceStatusEnum.PENDING_CONFIRMATION)?._count
          .service_id ?? 0;
      const confirmedServices =
        statusStats.find(s => s.status === ServiceStatusEnum.CONFIRMED_UNPAID)?._count.service_id ??
        0;
      const repaidServices = statusStats
        .filter(
          s =>
            s.status === ServiceStatusEnum.REPAID_BY_SERVICE ||
            s.status === ServiceStatusEnum.REPAID_BY_PRANK
        )
        .reduce((sum, s) => sum + s._count.service_id, 0);

      return {
        total_services: totalServices,
        pending_services: pendingServices,
        confirmed_services: confirmedServices,
        repaid_services: repaidServices,
        total_jeton_value: valueStats._sum.jeton_value ?? 0,
        average_jeton_value: Math.round(valueStats._avg.jeton_value ?? 0),
      };
    } catch (error) {
      this.logger.error('Erreur lors de la récupération des statistiques', error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'get_service_stats',
        originalError: error.message,
      });
    }
  }

  // ==================== SERVICE CATEGORIES ====================

  /**
   * Créer une catégorie de service
   */
  public async createServiceCategory(
    createCategoryDto: CreateServiceCategoryDto
  ): Promise<IServiceCategory> {
    this.logger.info("Création d'une catégorie de service", { name: createCategoryDto.name });

    try {
      const category = await this.prisma.service_categories.create({
        data: createCategoryDto,
      });

      this.logger.info('Catégorie créée avec succès', { categoryId: category.category_id });
      return category as IServiceCategory;
    } catch (error) {
      if (error.code === 'P2002') {
        this.exceptionThrower.throwDuplicateEntry('Une catégorie avec ce nom existe déjà');
      }
      this.logger.error('Erreur lors de la création de la catégorie', error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'create_service_category',
        originalError: error.message,
      });
    }
  }

  /**
   * Obtenir toutes les catégories de service
   */
  public async getAllServiceCategories(): Promise<IServiceCategory[]> {
    try {
      return (await this.prisma.service_categories.findMany({
        orderBy: {
          name: 'asc',
        },
      })) as IServiceCategory[];
    } catch (error) {
      this.logger.error('Erreur lors de la récupération des catégories', error);
      return [];
    }
  }

  /**
   * Obtenir une catégorie par ID
   */
  public async getServiceCategoryById(categoryId: number): Promise<IServiceCategory | null> {
    try {
      return (await this.prisma.service_categories.findUnique({
        where: { category_id: categoryId },
      })) as IServiceCategory | null;
    } catch (e) {
      this.logger.error('Erreur lors de la recherche de catégorie', e);
      return null;
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

  /**
   * Vérifier le statut d'amitié entre deux utilisateurs
   */
  private async checkFriendshipStatus(userId1: number, userId2: number): Promise<string | null> {
    try {
      return await firstValueFrom(
        this.userClient.send(
          { cmd: 'check_friendship_status' },
          { userId: userId1, otherUserId: userId2 }
        )
      );
    } catch (error) {
      this.logger.error('Erreur vérification amitié', error);
      return null;
    }
  }
}
