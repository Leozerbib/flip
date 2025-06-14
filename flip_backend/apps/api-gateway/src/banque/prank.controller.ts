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
  UpdatePrankDto,
  CreateExecutedPrankDto,
  UpdateExecutedPrankDto,
  PrankResponseDto,
  ExecutedPrankResponseDto,
  ExecutedPrankWithDetailsDto,
  PrankStatsDto,
  PrankFiltersDto,
  ExecutedPrankFiltersDto,
} from '@app/contracts/Prank/dtos/prank.dto';
import {
  IPrank,
  IExecutedPrank,
  IExecutedPrankWithDetails,
  IPrankStats,
  IPrankFilters,
  IExecutedPrankFilters,
} from '@app/contracts/Prank/interfaces/prank.interface';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetUserId } from '../auth/decorators/current-user.decorator';
import { Log } from 'libs/logger/src';

/**
 * Contrôleur API Gateway pour la gestion des pranks
 * Communique avec le microservice Banque via TCP
 * Note: Les pranks ne peuvent plus être créés, seulement consultés, modifiés ou supprimés
 */
@ApiTags('banque-pranks')
@Controller('banque/pranks')
export class BanquePrankController {
  constructor(@Inject('BANQUE_SERVICE') private readonly banqueClient: ClientProxy) {}

  // ==================== PRANK READ/UPDATE/DELETE OPERATIONS ====================

  @Put(':id')
  @Log('Mise à jour prank (Banque)', 'info')
  @Auth()
  @ApiOperation({ summary: 'Mettre à jour un prank via microservice Banque' })
  @ApiParam({ name: 'id', description: 'ID du prank' })
  @ApiBody({ type: UpdatePrankDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Prank mis à jour avec succès',
    type: PrankResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Prank non trouvé' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Prank non modifiable' })
  public async updatePrank(
    @Param('id') id: string,
    @Body() updatePrankDto: UpdatePrankDto
  ): Promise<IPrank> {
    const result = await firstValueFrom(
      this.banqueClient.send<IPrank>(
        { cmd: 'update_prank' },
        { prankId: parseInt(id), updatePrankDto }
      )
    );
    return result;
  }

  @Delete(':id')
  @Log('Suppression prank (Banque)', 'info')
  @Auth()
  @ApiOperation({ summary: 'Supprimer un prank via microservice Banque' })
  @ApiParam({ name: 'id', description: 'ID du prank' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Prank supprimé avec succès' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Prank non trouvé' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Prank non supprimable' })
  public async deletePrank(@Param('id') id: string): Promise<{ message: string }> {
    const result = await firstValueFrom(
      this.banqueClient.send<{ message: string }>({ cmd: 'delete_prank' }, parseInt(id))
    );
    return result;
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Récupérer un prank par ID via microservice Banque' })
  @ApiParam({ name: 'id', description: 'ID du prank' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Prank trouvé',
    type: PrankResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Prank non trouvé' })
  public async findPrankById(@Param('id') id: string): Promise<IPrank | null> {
    return firstValueFrom(
      this.banqueClient.send<IPrank | null>({ cmd: 'find_prank_by_id' }, parseInt(id))
    );
  }

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Rechercher des pranks avec filtres via microservice Banque' })
  @ApiQuery({ name: 'type', required: false, description: 'Filtrer par type de prank' })
  @ApiQuery({ name: 'is_active', required: false, description: 'Filtrer par statut actif' })
  @ApiQuery({
    name: 'requires_proof',
    required: false,
    description: 'Filtrer par obligation de preuve',
  })
  @ApiQuery({ name: 'jeton_cost_min', required: false, description: 'Coût minimum en jetons' })
  @ApiQuery({ name: 'jeton_cost_max', required: false, description: 'Coût maximum en jetons' })
  @ApiQuery({ name: 'rarity', required: false, description: 'Filtrer par rareté' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pranks récupérés avec succès',
    type: [PrankResponseDto],
  })
  public async findPranksWithFilters(@Query() filters: PrankFiltersDto): Promise<IPrank[]> {
    const prankFilters: IPrankFilters = {
      type: filters.type,
      is_active: filters.is_active,
      requires_proof: filters.requires_proof,
      jeton_cost_min: filters.jeton_cost_min
        ? parseInt(filters.jeton_cost_min.toString())
        : undefined,
      jeton_cost_max: filters.jeton_cost_max
        ? parseInt(filters.jeton_cost_max.toString())
        : undefined,
      rarity: filters.rarity,
    };

    return firstValueFrom(
      this.banqueClient.send<IPrank[]>({ cmd: 'find_pranks_with_filters' }, prankFilters)
    );
  }

  @Get('stats/overview')
  @Auth()
  @ApiOperation({ summary: 'Récupérer les statistiques des pranks via microservice Banque' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Statistiques récupérées avec succès',
    type: PrankStatsDto,
  })
  public async getPrankStats(): Promise<IPrankStats> {
    return firstValueFrom(this.banqueClient.send<IPrankStats>({ cmd: 'get_prank_stats' }, {}));
  }

  // ==================== EXECUTED PRANK OPERATIONS ====================

  @Post('execute')
  @Log('Création exécution prank (Banque)', 'info')
  @Auth()
  @ApiOperation({ summary: 'Créer une nouvelle exécution de prank via microservice Banque' })
  @ApiBody({ type: CreateExecutedPrankDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Exécution de prank créée avec succès',
    type: ExecutedPrankResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Prank ou service non trouvé' })
  public async createExecutedPrank(
    @GetUserId() executorId: string,
    @Body() createExecutedPrankDto: CreateExecutedPrankDto
  ): Promise<IExecutedPrank> {
    const result = await firstValueFrom(
      this.banqueClient.send<IExecutedPrank>(
        { cmd: 'create_executed_prank' },
        { executorId: parseInt(executorId), createExecutedPrankDto }
      )
    );
    return result;
  }

  @Put('executions/:id')
  @Log('Mise à jour exécution prank (Banque)', 'info')
  @Auth()
  @ApiOperation({ summary: 'Mettre à jour une exécution de prank via microservice Banque' })
  @ApiParam({ name: 'id', description: "ID de l'exécution de prank" })
  @ApiBody({ type: UpdateExecutedPrankDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exécution de prank mise à jour avec succès',
    type: ExecutedPrankResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Exécution de prank non trouvée' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Exécution non modifiable' })
  public async updateExecutedPrank(
    @Param('id') id: string,
    @Body() updateExecutedPrankDto: UpdateExecutedPrankDto
  ): Promise<IExecutedPrank> {
    const result = await firstValueFrom(
      this.banqueClient.send<IExecutedPrank>(
        { cmd: 'update_executed_prank' },
        { executedPrankId: parseInt(id), updateExecutedPrankDto }
      )
    );
    return result;
  }

  @Get('executions/:id')
  @Auth()
  @ApiOperation({ summary: 'Récupérer une exécution de prank par ID via microservice Banque' })
  @ApiParam({ name: 'id', description: "ID de l'exécution de prank" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exécution de prank trouvée',
    type: ExecutedPrankResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Exécution de prank non trouvée' })
  public async findExecutedPrankById(@Param('id') id: string): Promise<IExecutedPrank | null> {
    return firstValueFrom(
      this.banqueClient.send<IExecutedPrank | null>(
        { cmd: 'find_executed_prank_by_id' },
        parseInt(id)
      )
    );
  }

  @Get('executions/:id/details')
  @Auth()
  @ApiOperation({
    summary: "Récupérer les détails complets d'une exécution de prank via microservice Banque",
  })
  @ApiParam({ name: 'id', description: "ID de l'exécution de prank" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Détails de l'exécution récupérés",
    type: ExecutedPrankWithDetailsDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Exécution de prank non trouvée' })
  public async getExecutedPrankWithDetails(
    @Param('id') id: string
  ): Promise<IExecutedPrankWithDetails | null> {
    return firstValueFrom(
      this.banqueClient.send<IExecutedPrankWithDetails | null>(
        { cmd: 'get_executed_prank_with_details' },
        parseInt(id)
      )
    );
  }

  @Get('executions')
  @Auth()
  @ApiOperation({
    summary: 'Rechercher des exécutions de pranks avec filtres via microservice Banque',
  })
  @ApiQuery({ name: 'status', required: false, description: 'Filtrer par statut' })
  @ApiQuery({ name: 'executor_id', required: false, description: 'Filtrer par exécuteur' })
  @ApiQuery({ name: 'target_id', required: false, description: 'Filtrer par cible' })
  @ApiQuery({ name: 'chosen_prank_id', required: false, description: 'Filtrer par prank choisi' })
  @ApiQuery({
    name: 'service_being_repaid_id',
    required: false,
    description: 'Filtrer par service remboursé',
  })
  @ApiQuery({ name: 'executed_after', required: false, description: "Date d'exécution après" })
  @ApiQuery({ name: 'executed_before', required: false, description: "Date d'exécution avant" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exécutions de pranks récupérées avec succès',
    type: [ExecutedPrankWithDetailsDto],
  })
  public async findExecutedPranksWithFilters(
    @Query() filters: ExecutedPrankFiltersDto
  ): Promise<IExecutedPrankWithDetails[]> {
    const executedPrankFilters: IExecutedPrankFilters = {
      status: filters.status,
      executor_id: filters.executor_id ? parseInt(filters.executor_id.toString()) : undefined,
      target_id: filters.target_id ? parseInt(filters.target_id.toString()) : undefined,
      chosen_prank_id: filters.chosen_prank_id
        ? parseInt(filters.chosen_prank_id.toString())
        : undefined,
      service_being_repaid_id: filters.service_being_repaid_id
        ? parseInt(filters.service_being_repaid_id.toString())
        : undefined,
      executed_after: filters.executed_after ? new Date(filters.executed_after) : undefined,
      executed_before: filters.executed_before ? new Date(filters.executed_before) : undefined,
    };

    return firstValueFrom(
      this.banqueClient.send<IExecutedPrankWithDetails[]>(
        { cmd: 'find_executed_pranks_with_filters' },
        executedPrankFilters
      )
    );
  }
}
