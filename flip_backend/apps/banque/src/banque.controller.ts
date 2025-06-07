import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BanqueService } from './banque.service';
import { LoggerService } from 'libs/logger/src';
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

/**
 * Contrôleur Banque/Service (TCP uniquement)
 * Toutes les requêtes HTTP passent par l'API Gateway
 */
@Controller()
export class BanqueController {
  constructor(
    private readonly banqueService: BanqueService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext('Banque.controller');
  }

  // ==================== SERVICE MICROSERVICE PATTERNS TCP ====================

  @MessagePattern({ cmd: 'create_service' })
  public async createService(
    @Payload() payload: { providerId: number; createServiceDto: CreateServiceDto }
  ): Promise<IService> {
    this.logger.info('Création service (microservice)', {
      providerId: payload.providerId,
      beneficiaryId: payload.createServiceDto.beneficiary_id,
      jetonValue: payload.createServiceDto.jeton_value,
    });

    try {
      const result = await this.banqueService.createService(
        payload.providerId,
        payload.createServiceDto
      );

      this.logger.info('Service créé avec succès (microservice)', {
        serviceId: result.service_id,
        providerId: payload.providerId,
        beneficiaryId: payload.createServiceDto.beneficiary_id,
      });

      return result;
    } catch (error) {
      this.logger.error('Erreur création service (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'update_service' })
  public async updateService(
    @Payload() payload: { serviceId: number; updateServiceDto: UpdateServiceDto }
  ): Promise<IService> {
    this.logger.info('Mise à jour service (microservice)', {
      serviceId: payload.serviceId,
      updateFields: Object.keys(payload.updateServiceDto),
    });

    try {
      const result = await this.banqueService.updateService(
        payload.serviceId,
        payload.updateServiceDto
      );

      this.logger.info('Service mis à jour avec succès (microservice)', {
        serviceId: payload.serviceId,
      });

      return result;
    } catch (error) {
      this.logger.error('Erreur mise à jour service (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'delete_service' })
  public async deleteService(@Payload() serviceId: number): Promise<{ message: string }> {
    this.logger.info('Suppression service (microservice)', { serviceId });

    try {
      const result = await this.banqueService.deleteService(serviceId);

      this.logger.info('Service supprimé avec succès (microservice)', { serviceId });

      return result;
    } catch (error) {
      this.logger.error('Erreur suppression service (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'confirm_service' })
  public async confirmService(
    @Payload() payload: { serviceId: number; beneficiaryId: number }
  ): Promise<IService> {
    this.logger.info('Confirmation service (microservice)', {
      serviceId: payload.serviceId,
      beneficiaryId: payload.beneficiaryId,
    });

    try {
      const result = await this.banqueService.confirmService(
        payload.serviceId,
        payload.beneficiaryId
      );

      this.logger.info('Service confirmé avec succès (microservice)', {
        serviceId: payload.serviceId,
        beneficiaryId: payload.beneficiaryId,
      });

      return result;
    } catch (error) {
      this.logger.error('Erreur confirmation service (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'repay_service_with_service' })
  public async repayServiceWithService(
    @Payload() payload: { serviceId: number; repaymentServiceId: number }
  ): Promise<IService> {
    this.logger.info('Remboursement service par service (microservice)', {
      serviceId: payload.serviceId,
      repaymentServiceId: payload.repaymentServiceId,
    });

    try {
      const result = await this.banqueService.repayServiceWithService(
        payload.serviceId,
        payload.repaymentServiceId
      );

      this.logger.info('Remboursement effectué avec succès (microservice)', {
        serviceId: payload.serviceId,
        repaymentServiceId: payload.repaymentServiceId,
      });

      return result;
    } catch (error) {
      this.logger.error('Erreur remboursement service (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'find_service_by_id' })
  public async findServiceById(@Payload() serviceId: number): Promise<IService | null> {
    this.logger.info('Recherche service par ID (microservice)', { serviceId });

    try {
      const result = await this.banqueService.findServiceById(serviceId);

      if (result) {
        this.logger.info('Service trouvé (microservice)', { serviceId });
      } else {
        this.logger.warn('Service non trouvé (microservice)', { serviceId });
      }

      return result;
    } catch (error) {
      this.logger.error('Erreur recherche service (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_service_with_details' })
  public async getServiceWithDetails(
    @Payload() serviceId: number
  ): Promise<IServiceWithDetails | null> {
    this.logger.info('Récupération détails service (microservice)', { serviceId });

    try {
      const result = await this.banqueService.getServiceWithDetails(serviceId);

      if (result) {
        this.logger.info('Détails service récupérés (microservice)', { serviceId });
      } else {
        this.logger.warn('Service non trouvé pour détails (microservice)', { serviceId });
      }

      return result;
    } catch (error) {
      this.logger.error('Erreur récupération détails service (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'find_services_with_filters' })
  public async findServicesWithFilters(
    @Payload() filters: IServiceFilters
  ): Promise<IServiceWithDetails[]> {
    this.logger.info('Recherche services avec filtres (microservice)', {
      filters: {
        status: filters.status,
        categoryId: filters.category_id,
        providerId: filters.provider_id,
        beneficiaryId: filters.beneficiary_id,
      },
    });

    try {
      const result = await this.banqueService.findServicesWithFilters(filters);

      this.logger.info('Services récupérés avec filtres (microservice)', {
        resultCount: result.length,
        filters: {
          status: filters.status,
          categoryId: filters.category_id,
        },
      });

      return result;
    } catch (error) {
      this.logger.error('Erreur recherche services avec filtres (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_user_services' })
  public async getUserServices(
    @Payload() payload: { userId: number; page: string; limit: string }
  ): Promise<IServiceWithDetails[]> {
    this.logger.info('Récupération services utilisateur (microservice)', {
      userId: payload.userId.toString(),
    });
    return await this.banqueService.getUserServices(payload.userId, payload.page, payload.limit);
  }

  @MessagePattern({ cmd: 'get_user_pranks' })
  public async getUserPranks(
    @Payload() payload: { userId: number; page: string; limit: string }
  ): Promise<IServiceWithDetails[]> {
    this.logger.info('Récupération pranks utilisateur (microservice)', {
      userId: payload.userId.toString(),
    });
    return await this.banqueService.getUserPranks(payload.userId, payload.page, payload.limit);
  }

  @MessagePattern({ cmd: 'get_service_stats' })
  public async getServiceStats(): Promise<IServiceStats> {
    this.logger.info('Récupération statistiques services (microservice)');

    try {
      const result = await this.banqueService.getServiceStats();

      this.logger.info('Statistiques services récupérées (microservice)', {
        totalServices: result.total_services,
        pendingServices: result.pending_services,
        confirmedServices: result.confirmed_services,
      });

      return result;
    } catch (error) {
      this.logger.error('Erreur récupération statistiques services (microservice)', error);
      throw error;
    }
  }

  // ==================== SERVICE CATEGORIES PATTERNS ====================

  @MessagePattern({ cmd: 'create_service_category' })
  public async createServiceCategory(
    @Payload() createCategoryDto: CreateServiceCategoryDto
  ): Promise<IServiceCategory> {
    this.logger.info('Création catégorie service (microservice)', { name: createCategoryDto.name });

    try {
      const result = await this.banqueService.createServiceCategory(createCategoryDto);

      this.logger.info('Catégorie service créée avec succès (microservice)', {
        categoryId: result.category_id,
        name: result.name,
      });

      return result;
    } catch (error) {
      this.logger.error('Erreur création catégorie service (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_all_service_categories' })
  public async getAllServiceCategories(): Promise<IServiceCategory[]> {
    this.logger.info('Récupération toutes catégories (microservice)');

    try {
      const result = await this.banqueService.getAllServiceCategories();

      this.logger.info('Catégories récupérées (microservice)', {
        categoriesCount: result.length,
      });

      return result;
    } catch (error) {
      this.logger.error('Erreur récupération catégories (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_service_category_by_id' })
  public async getServiceCategoryById(
    @Payload() categoryId: number
  ): Promise<IServiceCategory | null> {
    this.logger.info('Récupération catégorie par ID (microservice)', { categoryId });

    try {
      const result = await this.banqueService.getServiceCategoryById(categoryId);

      if (result) {
        this.logger.info('Catégorie trouvée (microservice)', {
          categoryId,
          name: result.name,
        });
      } else {
        this.logger.warn('Catégorie non trouvée (microservice)', { categoryId });
      }

      return result;
    } catch (error) {
      this.logger.error('Erreur récupération catégorie (microservice)', error);
      throw error;
    }
  }
}
