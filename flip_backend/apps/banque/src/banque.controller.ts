import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BanqueService } from './banque.service';
import { ServiceService } from './service/service.service';
import { PrankService } from './prank/prank.service';
import { LoggerService } from 'libs/logger/src';
import {
  CreateServiceDto,
  UpdateServiceDto,
  CreateServiceCategoryDto,
} from '@app/contracts/Service/dtos/service.dto';
import {
  UpdatePrankDto,
  CreateExecutedPrankDto,
  UpdateExecutedPrankDto,
} from '@app/contracts/Prank/dtos/prank.dto';
import {
  IService,
  IServiceWithDetails,
  IServiceStats,
  IServiceCategory,
  IServiceFilters,
} from '@app/contracts/Service/interfaces/service.interface';
import {
  IPrank,
  IExecutedPrank,
  IExecutedPrankWithDetails,
  IPrankStats,
  IPrankFilters,
  IExecutedPrankFilters,
} from '@app/contracts/Prank/interfaces/prank.interface';

/**
 * Contrôleur Banque/Service (TCP uniquement)
 * Délègue les opérations spécifiques aux services spécialisés
 * Garde uniquement les fonctionnalités croisées entre services et pranks
 */
@Controller()
export class BanqueController {
  constructor(
    private readonly banqueService: BanqueService,
    private readonly serviceService: ServiceService,
    private readonly prankService: PrankService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext('Banque.controller');
  }

  // ==================== DELEGATION TO SPECIALIZED SERVICES ====================

  // SERVICE OPERATIONS - Délégation au ServiceService
  @MessagePattern({ cmd: 'create_service' })
  public async createService(
    @Payload() payload: { providerId: number; createServiceDto: CreateServiceDto }
  ): Promise<IService> {
    this.logger.info('Délégation création service au ServiceService');
    try {
      const result = await this.serviceService.createService(
        payload.providerId,
        payload.createServiceDto
      );
      this.logger.info('Service créé avec succès (microservice)', {
        serviceId: result.service_id,
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
    this.logger.info('Délégation mise à jour service au ServiceService');
    try {
      const result = await this.serviceService.updateService(
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
    this.logger.info('Délégation suppression service au ServiceService');
    try {
      const result = await this.serviceService.deleteService(serviceId);
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
    this.logger.info('Délégation confirmation service au ServiceService');
    try {
      const result = await this.serviceService.confirmService(
        payload.serviceId,
        payload.beneficiaryId
      );
      this.logger.info('Service confirmé avec succès (microservice)', {
        serviceId: payload.serviceId,
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
    this.logger.info('Délégation remboursement service au ServiceService');
    try {
      const result = await this.serviceService.repayServiceWithService(
        payload.serviceId,
        payload.repaymentServiceId
      );
      this.logger.info('Remboursement effectué avec succès (microservice)', {
        serviceId: payload.serviceId,
      });
      return result;
    } catch (error) {
      this.logger.error('Erreur remboursement service (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'find_service_by_id' })
  public async findServiceById(@Payload() serviceId: number): Promise<IService | null> {
    this.logger.info('Délégation recherche service au ServiceService');
    try {
      const result = await this.serviceService.findServiceById(serviceId);
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
    this.logger.info('Délégation détails service au ServiceService');
    try {
      const result = await this.serviceService.getServiceWithDetails(serviceId);
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
    this.logger.info('Délégation recherche services filtrés au ServiceService');
    try {
      const result = await this.serviceService.findServicesWithFilters(filters);
      this.logger.info('Services récupérés avec filtres (microservice)', {
        resultCount: result.length,
      });
      return result;
    } catch (error) {
      this.logger.error('Erreur recherche services avec filtres (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_service_stats' })
  public async getServiceStats(): Promise<IServiceStats> {
    this.logger.info('Délégation statistiques services au ServiceService');
    try {
      const result = await this.serviceService.getServiceStats();
      this.logger.info('Statistiques services récupérées (microservice)', {
        totalServices: result.total_services,
      });
      return result;
    } catch (error) {
      this.logger.error('Erreur récupération statistiques services (microservice)', error);
      throw error;
    }
  }

  // SERVICE CATEGORIES - Délégation au ServiceService
  @MessagePattern({ cmd: 'create_service_category' })
  public async createServiceCategory(
    @Payload() createCategoryDto: CreateServiceCategoryDto
  ): Promise<IServiceCategory> {
    this.logger.info('Délégation création catégorie au ServiceService');
    try {
      const result = await this.serviceService.createServiceCategory(createCategoryDto);
      this.logger.info('Catégorie service créée avec succès (microservice)', {
        categoryId: result.category_id,
      });
      return result;
    } catch (error) {
      this.logger.error('Erreur création catégorie service (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_all_service_categories' })
  public async getAllServiceCategories(): Promise<IServiceCategory[]> {
    this.logger.info('Délégation récupération catégories au ServiceService');
    try {
      const result = await this.serviceService.getAllServiceCategories();
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
    this.logger.info('Délégation récupération catégorie par ID au ServiceService');
    try {
      const result = await this.serviceService.getServiceCategoryById(categoryId);
      if (result) {
        this.logger.info('Catégorie trouvée (microservice)', { categoryId });
      } else {
        this.logger.warn('Catégorie non trouvée (microservice)', { categoryId });
      }
      return result;
    } catch (error) {
      this.logger.error('Erreur récupération catégorie (microservice)', error);
      throw error;
    }
  }

  // PRANK OPERATIONS - Délégation au PrankService

  @MessagePattern({ cmd: 'update_prank' })
  public async updatePrank(
    @Payload() payload: { prankId: number; updatePrankDto: UpdatePrankDto }
  ): Promise<IPrank> {
    this.logger.info('Délégation mise à jour prank au PrankService');
    try {
      const result = await this.prankService.updatePrank(payload.prankId, payload.updatePrankDto);
      this.logger.info('Prank mis à jour avec succès (microservice)', {
        prankId: payload.prankId,
      });
      return result;
    } catch (error) {
      this.logger.error('Erreur mise à jour prank (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'delete_prank' })
  public async deletePrank(@Payload() prankId: number): Promise<{ message: string }> {
    this.logger.info('Délégation suppression prank au PrankService');
    try {
      const result = await this.prankService.deletePrank(prankId);
      this.logger.info('Prank supprimé avec succès (microservice)', { prankId });
      return result;
    } catch (error) {
      this.logger.error('Erreur suppression prank (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'find_prank_by_id' })
  public async findPrankById(@Payload() prankId: number): Promise<IPrank | null> {
    this.logger.info('Délégation recherche prank au PrankService');
    try {
      const result = await this.prankService.findPrankById(prankId);
      if (result) {
        this.logger.info('Prank trouvé (microservice)', { prankId });
      } else {
        this.logger.warn('Prank non trouvé (microservice)', { prankId });
      }
      return result;
    } catch (error) {
      this.logger.error('Erreur recherche prank (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'find_pranks_with_filters' })
  public async findPranksWithFilters(@Payload() filters: IPrankFilters): Promise<IPrank[]> {
    this.logger.info('Délégation recherche pranks filtrés au PrankService');
    try {
      const result = await this.prankService.findPranksWithFilters(filters);
      this.logger.info('Pranks récupérés avec filtres (microservice)', {
        resultCount: result.length,
      });
      return result;
    } catch (error) {
      this.logger.error('Erreur recherche pranks avec filtres (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_prank_stats' })
  public async getPrankStats(): Promise<IPrankStats> {
    this.logger.info('Délégation statistiques pranks au PrankService');
    try {
      const result = await this.prankService.getPrankStats();
      this.logger.info('Statistiques pranks récupérées (microservice)', {
        totalPranks: result.total_pranks,
      });
      return result;
    } catch (error) {
      this.logger.error('Erreur récupération statistiques pranks (microservice)', error);
      throw error;
    }
  }

  // EXECUTED PRANK OPERATIONS - Délégation au PrankService
  @MessagePattern({ cmd: 'create_executed_prank' })
  public async createExecutedPrank(
    @Payload() payload: { executorId: number; createExecutedPrankDto: CreateExecutedPrankDto }
  ): Promise<IExecutedPrank> {
    this.logger.info('Délégation création exécution prank au PrankService');
    try {
      const result = await this.prankService.createExecutedPrank(
        payload.executorId,
        payload.createExecutedPrankDto
      );
      this.logger.info('Exécution prank créée avec succès (microservice)', {
        executedPrankId: result.executed_prank_id,
      });
      return result;
    } catch (error) {
      this.logger.error('Erreur création exécution prank (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'update_executed_prank' })
  public async updateExecutedPrank(
    @Payload() payload: { executedPrankId: number; updateExecutedPrankDto: UpdateExecutedPrankDto }
  ): Promise<IExecutedPrank> {
    this.logger.info('Délégation mise à jour exécution prank au PrankService');
    try {
      const result = await this.prankService.updateExecutedPrank(
        payload.executedPrankId,
        payload.updateExecutedPrankDto
      );
      this.logger.info('Exécution prank mise à jour avec succès (microservice)', {
        executedPrankId: payload.executedPrankId,
      });
      return result;
    } catch (error) {
      this.logger.error('Erreur mise à jour exécution prank (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'find_executed_prank_by_id' })
  public async findExecutedPrankById(
    @Payload() executedPrankId: number
  ): Promise<IExecutedPrank | null> {
    this.logger.info('Délégation recherche exécution prank au PrankService');
    try {
      const result = await this.prankService.findExecutedPrankById(executedPrankId);
      if (result) {
        this.logger.info('Exécution prank trouvée (microservice)', { executedPrankId });
      } else {
        this.logger.warn('Exécution prank non trouvée (microservice)', { executedPrankId });
      }
      return result;
    } catch (error) {
      this.logger.error('Erreur recherche exécution prank (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_executed_prank_with_details' })
  public async getExecutedPrankWithDetails(
    @Payload() executedPrankId: number
  ): Promise<IExecutedPrankWithDetails | null> {
    this.logger.info('Délégation détails exécution prank au PrankService');
    try {
      const result = await this.prankService.getExecutedPrankWithDetails(executedPrankId);
      if (result) {
        this.logger.info('Détails exécution prank récupérés (microservice)', { executedPrankId });
      } else {
        this.logger.warn('Exécution prank non trouvée pour détails (microservice)', {
          executedPrankId,
        });
      }
      return result;
    } catch (error) {
      this.logger.error('Erreur récupération détails exécution prank (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'find_executed_pranks_with_filters' })
  public async findExecutedPranksWithFilters(
    @Payload() filters: IExecutedPrankFilters
  ): Promise<IExecutedPrankWithDetails[]> {
    this.logger.info('Délégation recherche exécutions pranks filtrées au PrankService');
    try {
      const result = await this.prankService.findExecutedPranksWithFilters(filters);
      this.logger.info('Exécutions pranks récupérées avec filtres (microservice)', {
        resultCount: result.length,
      });
      return result;
    } catch (error) {
      this.logger.error('Erreur recherche exécutions pranks avec filtres (microservice)', error);
      throw error;
    }
  }

  // ==================== CROSS-FUNCTIONALITY OPERATIONS ====================

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

  @MessagePattern({ cmd: 'repay_service_with_prank' })
  public async repayServiceWithPrank(
    @Payload() payload: { serviceId: number; executedPrankId: number }
  ): Promise<IServiceWithDetails | null> {
    this.logger.info('Remboursement service par prank (microservice)', {
      serviceId: payload.serviceId,
      executedPrankId: payload.executedPrankId,
    });

    try {
      const result = await this.banqueService.repayServiceWithPrank(
        payload.serviceId,
        payload.executedPrankId
      );

      this.logger.info('Service remboursé par prank avec succès (microservice)', {
        serviceId: payload.serviceId,
        executedPrankId: payload.executedPrankId,
      });

      return result;
    } catch (error) {
      this.logger.error('Erreur remboursement service par prank (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_dashboard_stats' })
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
    this.logger.info('Récupération statistiques dashboard (microservice)');

    try {
      const result = await this.banqueService.getDashboardStats();

      this.logger.info('Statistiques dashboard récupérées (microservice)', {
        totalRepayments: result.combined.total_repayments,
        pendingActions: result.combined.pending_actions,
      });

      return result;
    } catch (error) {
      this.logger.error('Erreur récupération statistiques dashboard (microservice)', error);
      throw error;
    }
  }
}
