import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import {
  CreateServiceDto,
  UpdateServiceDto,
  ServiceResponseDto,
  ServiceWithDetailsDto,
  ServiceStatsDto,
  ServiceFiltersDto,
  CreateServiceCategoryDto,
  ServiceCategoryDto,
} from '@app/contracts/Service/dtos/service.dto';
import {
  IService,
  IServiceWithDetails,
  IServiceStats,
  IServiceCategory,
  IServiceFilters,
} from '@app/contracts/Service/interfaces/service.interface';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser, GetUserId } from '../auth/decorators/current-user.decorator';
import { Log } from 'libs/logger/src';
import { ICurrentUser } from '@app/contracts/Auth/interfaces/auth.interface';

/**
 * Contrôleur API Gateway pour la gestion des services
 * Redirige les requêtes HTTP vers le microservice Banque via TCP
 */
@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(@Inject('BANQUE_SERVICE') private readonly banqueClient: ClientProxy) {}

  // ==================== SERVICE CRUD OPERATIONS ====================

  @Post()
  @Log('Création service', 'info')
  @Auth()
  @ApiOperation({ summary: 'Créer un nouveau service' })
  @ApiBody({ type: CreateServiceDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Service créé avec succès',
    type: ServiceResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' })
  public async createService(
    @GetUserId() providerId: string,
    @Body() createServiceDto: CreateServiceDto
  ): Promise<IService> {
    const result = await firstValueFrom(
      this.banqueClient.send<IService>(
        { cmd: 'create_service' },
        { providerId: parseInt(providerId), createServiceDto }
      )
    );
    return result;
  }

  @Put(':id')
  @Log('Mise à jour service', 'info')
  @Auth()
  @ApiOperation({ summary: 'Mettre à jour un service' })
  @ApiParam({ name: 'id', description: 'ID du service' })
  @ApiBody({ type: UpdateServiceDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service mis à jour avec succès',
    type: ServiceResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Service non trouvé' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Service non modifiable' })
  public async updateService(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto
  ): Promise<IService> {
    const result = await firstValueFrom(
      this.banqueClient.send<IService>(
        { cmd: 'update_service' },
        { serviceId: parseInt(id), updateServiceDto }
      )
    );
    return result;
  }

  @Delete(':id')
  @Log('Suppression service', 'info')
  @Auth()
  @ApiOperation({ summary: 'Supprimer un service' })
  @ApiParam({ name: 'id', description: 'ID du service' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Service supprimé avec succès' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Service non trouvé' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Service non supprimable' })
  public async deleteService(@Param('id') id: string): Promise<{ message: string }> {
    const result = await firstValueFrom(
      this.banqueClient.send<{ message: string }>({ cmd: 'delete_service' }, parseInt(id))
    );
    return result;
  }

  @Post(':id/confirm')
  @Log('Confirmation service', 'info')
  @Auth()
  @ApiOperation({ summary: 'Confirmer un service' })
  @ApiParam({ name: 'id', description: 'ID du service' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service confirmé avec succès',
    type: ServiceResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Service non trouvé' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Seul le bénéficiaire peut confirmer' })
  public async confirmService(
    @Param('id') id: string,
    @GetUserId() beneficiaryId: string
  ): Promise<IService> {
    const result = await firstValueFrom(
      this.banqueClient.send<IService>(
        { cmd: 'confirm_service' },
        { serviceId: parseInt(id), beneficiaryId: parseInt(beneficiaryId) }
      )
    );
    return result;
  }

  @Post(':id/repay/:repaymentServiceId')
  @Auth()
  @ApiOperation({ summary: 'Rembourser un service par un autre service' })
  @ApiParam({ name: 'id', description: 'ID du service à rembourser' })
  @ApiParam({ name: 'repaymentServiceId', description: 'ID du service de remboursement' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service remboursé avec succès',
    type: ServiceResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Service non trouvé' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Remboursement invalide' })
  public async repayServiceWithService(
    @Param('id') serviceId: string,
    @Param('repaymentServiceId') repaymentServiceId: string
  ): Promise<IService> {
    return firstValueFrom(
      this.banqueClient.send<IService>(
        { cmd: 'repay_service_with_service' },
        { serviceId: parseInt(serviceId), repaymentServiceId: parseInt(repaymentServiceId) }
      )
    );
  }

  // ==================== QUERY OPERATIONS ====================

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Récupérer un service par ID' })
  @ApiParam({ name: 'id', description: 'ID du service' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service trouvé',
    type: ServiceResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Service non trouvé' })
  public async findServiceById(@Param('id') id: string): Promise<IService | null> {
    return firstValueFrom(
      this.banqueClient.send<IService | null>({ cmd: 'find_service_by_id' }, parseInt(id))
    );
  }

  @Get(':id/details')
  @Auth()
  @ApiOperation({ summary: "Récupérer les détails complets d'un service" })
  @ApiParam({ name: 'id', description: 'ID du service' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Détails du service récupérés',
    type: ServiceWithDetailsDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Service non trouvé' })
  public async getServiceWithDetails(@Param('id') id: string): Promise<IServiceWithDetails | null> {
    return firstValueFrom(
      this.banqueClient.send<IServiceWithDetails | null>(
        { cmd: 'get_service_with_details' },
        parseInt(id)
      )
    );
  }

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Rechercher des services avec filtres' })
  @ApiQuery({ name: 'status', required: false, description: 'Statut du service' })
  @ApiQuery({
    name: 'type',
    enum: ['service', 'prank'],
    required: false,
    description: 'Type de service (service ou prank)',
  })
  @ApiQuery({
    name: 'page',
    type: String,
    required: false,
    description: 'Numéro de page pour la pagination',
  })
  @ApiQuery({
    name: 'limit',
    type: String,
    required: false,
    description: "Nombre d'éléments par page",
  })
  @ApiQuery({ name: 'category_id', required: false, description: 'ID de la catégorie' })
  @ApiQuery({ name: 'provider_id', required: false, description: 'ID du fournisseur' })
  @ApiQuery({ name: 'beneficiary_id', required: false, description: 'ID du bénéficiaire' })
  @ApiQuery({ name: 'jeton_value_min', required: false, description: 'Valeur minimale en jetons' })
  @ApiQuery({ name: 'jeton_value_max', required: false, description: 'Valeur maximale en jetons' })
  @ApiQuery({ name: 'created_after', required: false, description: 'Créé après cette date' })
  @ApiQuery({ name: 'created_before', required: false, description: 'Créé avant cette date' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Services trouvés',
    type: [ServiceWithDetailsDto],
  })
  public async findServicesWithFilters(
    @Query() filters: ServiceFiltersDto
  ): Promise<IServiceWithDetails[]> {
    console.log('filters', filters);
    // Convertir les IDs et paramètres de pagination en nombres si présents
    const cleanedFilters: IServiceFilters = {
      ...filters,
      page: filters.page ? parseInt(filters.page.toString()) : 1,
      limit: filters.limit ? parseInt(filters.limit.toString()) : 20,
      category_id: filters.category_id ? parseInt(filters.category_id.toString()) : undefined,
      provider_id: filters.provider_id ? parseInt(filters.provider_id.toString()) : undefined,
      beneficiary_id: filters.beneficiary_id
        ? parseInt(filters.beneficiary_id.toString())
        : undefined,
      jeton_value_min: filters.jeton_value_min
        ? parseInt(filters.jeton_value_min.toString())
        : undefined,
      jeton_value_max: filters.jeton_value_max
        ? parseInt(filters.jeton_value_max.toString())
        : undefined,
      created_after: filters.created_after ? new Date(filters.created_after) : undefined,
      created_before: filters.created_before ? new Date(filters.created_before) : undefined,
    };

    return firstValueFrom(
      this.banqueClient.send<IServiceWithDetails[]>(
        { cmd: 'find_services_with_filters' },
        cleanedFilters
      )
    );
  }

  @Get('user/services')
  @Auth()
  @ApiOperation({ summary: "Récupérer les services d'un utilisateur" })
  @ApiParam({ name: 'userId', description: "ID de l'utilisateur" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Services récupérés',
    type: [ServiceWithDetailsDto],
  })
  public async getUserServices(
    @CurrentUser() user: ICurrentUser,
    @Query('page') page: string,
    @Query('limit') limit: string
  ): Promise<IServiceWithDetails[]> {
    return firstValueFrom(
      this.banqueClient.send<IServiceWithDetails[]>(
        { cmd: 'get_user_services' },
        { userId: user.id, page, limit }
      )
    );
  }

  @Get('user/pranks')
  @Auth()
  @ApiOperation({ summary: "Récupérer les pranks d'un utilisateur" })
  @ApiParam({ name: 'userId', description: "ID de l'utilisateur" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pranks récupérés',
    type: [ServiceWithDetailsDto],
  })
  public async getUserPranks(
    @CurrentUser() user: ICurrentUser,
    @Query('page') page: string,
    @Query('limit') limit: string
  ): Promise<IServiceWithDetails[]> {
    return firstValueFrom(
      this.banqueClient.send<IServiceWithDetails[]>(
        { cmd: 'get_user_pranks' },
        { userId: user.id, page, limit }
      )
    );
  }

  // ==================== STATISTICS ====================

  @Get('stats/global')
  @Auth()
  @ApiOperation({ summary: 'Récupérer les statistiques globales des services' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Statistiques récupérées',
    type: ServiceStatsDto,
  })
  public async getServiceStats(): Promise<IServiceStats> {
    return firstValueFrom(this.banqueClient.send<IServiceStats>({ cmd: 'get_service_stats' }, {}));
  }

  // ==================== SERVICE CATEGORIES ====================

  @Post('categories')
  @Auth()
  @ApiOperation({ summary: 'Créer une catégorie de service' })
  @ApiBody({ type: CreateServiceCategoryDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Catégorie créée avec succès',
    type: ServiceCategoryDto,
  })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Catégorie déjà existante' })
  public async createServiceCategory(
    @Body() createCategoryDto: CreateServiceCategoryDto
  ): Promise<IServiceCategory> {
    return firstValueFrom(
      this.banqueClient.send<IServiceCategory>(
        { cmd: 'create_service_category' },
        createCategoryDto
      )
    );
  }

  @Get('categories')
  @Auth()
  @ApiOperation({ summary: 'Récupérer toutes les catégories de service' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Catégories récupérées',
    type: [ServiceCategoryDto],
  })
  public async getAllServiceCategories(): Promise<IServiceCategory[]> {
    return firstValueFrom(
      this.banqueClient.send<IServiceCategory[]>({ cmd: 'get_all_service_categories' }, {})
    );
  }

  @Get('categories/:id')
  @Auth()
  @ApiOperation({ summary: 'Récupérer une catégorie par ID' })
  @ApiParam({ name: 'id', description: 'ID de la catégorie' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Catégorie trouvée',
    type: ServiceCategoryDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Catégorie non trouvée' })
  public async getServiceCategoryById(@Param('id') id: string): Promise<IServiceCategory | null> {
    return firstValueFrom(
      this.banqueClient.send<IServiceCategory | null>(
        { cmd: 'get_service_category_by_id' },
        parseInt(id)
      )
    );
  }

  // ==================== HEALTH CHECK ====================

  @Get('health/check')
  @Auth()
  @ApiOperation({ summary: 'Vérifier la santé du service banque' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service en bonne santé',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        timestamp: { type: 'string' },
      },
    },
  })
  public async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return firstValueFrom(
      this.banqueClient.send<{ status: string; timestamp: string }>(
        { cmd: 'banque_service_health' },
        {}
      )
    );
  }
}
