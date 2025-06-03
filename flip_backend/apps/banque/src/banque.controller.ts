import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BanqueService } from './banque.service';
import { LoggerService } from 'libs/logger/src';
import {
  CreateServiceDto,
  UpdateServiceDto,
  ServiceFiltersDto,
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
    });
    return this.banqueService.createService(payload.providerId, payload.createServiceDto);
  }

  @MessagePattern({ cmd: 'update_service' })
  public async updateService(
    @Payload() payload: { serviceId: number; updateServiceDto: UpdateServiceDto }
  ): Promise<IService> {
    this.logger.info('Mise à jour service (microservice)', { serviceId: payload.serviceId });
    return this.banqueService.updateService(payload.serviceId, payload.updateServiceDto);
  }

  @MessagePattern({ cmd: 'delete_service' })
  public async deleteService(@Payload() serviceId: number): Promise<{ message: string }> {
    this.logger.info('Suppression service (microservice)', { serviceId });
    return this.banqueService.deleteService(serviceId);
  }

  @MessagePattern({ cmd: 'confirm_service' })
  public async confirmService(
    @Payload() payload: { serviceId: number; beneficiaryId: number }
  ): Promise<IService> {
    this.logger.info('Confirmation service (microservice)', {
      serviceId: payload.serviceId,
      beneficiaryId: payload.beneficiaryId,
    });
    return this.banqueService.confirmService(payload.serviceId, payload.beneficiaryId);
  }

  @MessagePattern({ cmd: 'repay_service_with_service' })
  public async repayServiceWithService(
    @Payload() payload: { serviceId: number; repaymentServiceId: number }
  ): Promise<IService> {
    this.logger.info('Remboursement service par service (microservice)', {
      serviceId: payload.serviceId,
      repaymentServiceId: payload.repaymentServiceId,
    });
    return this.banqueService.repayServiceWithService(
      payload.serviceId,
      payload.repaymentServiceId
    );
  }

  @MessagePattern({ cmd: 'find_service_by_id' })
  public async findServiceById(@Payload() serviceId: number): Promise<IService | null> {
    this.logger.info('Recherche service par ID (microservice)', { serviceId });
    return this.banqueService.findServiceById(serviceId);
  }

  @MessagePattern({ cmd: 'get_service_with_details' })
  public async getServiceWithDetails(
    @Payload() serviceId: number
  ): Promise<IServiceWithDetails | null> {
    this.logger.info('Récupération détails service (microservice)', { serviceId });
    return this.banqueService.getServiceWithDetails(serviceId);
  }

  @MessagePattern({ cmd: 'find_services_with_filters' })
  public async findServicesWithFilters(
    @Payload() filters: IServiceFilters
  ): Promise<IServiceWithDetails[]> {
    this.logger.info('Recherche services avec filtres (microservice)', { filters });
    return this.banqueService.findServicesWithFilters(filters);
  }

  @MessagePattern({ cmd: 'get_service_stats' })
  public async getServiceStats(): Promise<IServiceStats> {
    this.logger.info('Récupération statistiques services (microservice)');
    return this.banqueService.getServiceStats();
  }

  // ==================== SERVICE CATEGORIES PATTERNS ====================

  @MessagePattern({ cmd: 'create_service_category' })
  public async createServiceCategory(
    @Payload() createCategoryDto: CreateServiceCategoryDto
  ): Promise<IServiceCategory> {
    this.logger.info('Création catégorie service (microservice)', { name: createCategoryDto.name });
    return this.banqueService.createServiceCategory(createCategoryDto);
  }

  @MessagePattern({ cmd: 'get_all_service_categories' })
  public async getAllServiceCategories(): Promise<IServiceCategory[]> {
    this.logger.info('Récupération toutes catégories (microservice)');
    return this.banqueService.getAllServiceCategories();
  }

  @MessagePattern({ cmd: 'get_service_category_by_id' })
  public async getServiceCategoryById(
    @Payload() categoryId: number
  ): Promise<IServiceCategory | null> {
    this.logger.info('Récupération catégorie par ID (microservice)', { categoryId });
    return this.banqueService.getServiceCategoryById(categoryId);
  }

  // ==================== HEALTH CHECK ====================

  @MessagePattern({ cmd: 'banque_service_health' })
  public async health(): Promise<{ status: string; timestamp: string }> {
    this.logger.info('Health check (microservice)');
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
