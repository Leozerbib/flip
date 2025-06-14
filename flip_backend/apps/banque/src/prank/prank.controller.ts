import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PrankService } from './prank.service';
import { LoggerService } from 'libs/logger/src';
import {
  UpdatePrankDto,
  CreateExecutedPrankDto,
  UpdateExecutedPrankDto,
} from '@app/contracts/Prank/dtos/prank.dto';
import {
  IPrank,
  IExecutedPrank,
  IExecutedPrankWithDetails,
  IPrankStats,
  IPrankFilters,
  IExecutedPrankFilters,
} from '@app/contracts/Prank/interfaces/prank.interface';

/**
 * Contrôleur Prank (TCP uniquement)
 * Toutes les requêtes HTTP passent par l'API Gateway
 * Note: Les pranks ne peuvent plus être créés, seulement consultés, modifiés ou supprimés
 */
@Controller()
export class PrankController {
  constructor(
    private readonly prankService: PrankService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext('Prank.controller');
  }

  // ==================== PRANK READ/UPDATE/DELETE PATTERNS TCP ====================

  @MessagePattern({ cmd: 'update_prank' })
  public async updatePrank(
    @Payload() payload: { prankId: number; updatePrankDto: UpdatePrankDto }
  ): Promise<IPrank> {
    this.logger.info('Mise à jour prank (microservice)', {
      prankId: payload.prankId,
      updateFields: Object.keys(payload.updatePrankDto),
    });

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
    this.logger.info('Suppression prank (microservice)', { prankId });

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
    this.logger.info('Recherche prank par ID (microservice)', { prankId });

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
    this.logger.info('Recherche pranks avec filtres (microservice)', {
      filters: {
        type: filters.type,
        isActive: filters.is_active,
        requiresProof: filters.requires_proof,
        rarity: filters.rarity,
      },
    });

    try {
      const result = await this.prankService.findPranksWithFilters(filters);

      this.logger.info('Pranks récupérés avec filtres (microservice)', {
        resultCount: result.length,
        filters: {
          type: filters.type,
          isActive: filters.is_active,
          rarity: filters.rarity,
        },
      });

      return result;
    } catch (error) {
      this.logger.error('Erreur recherche pranks avec filtres (microservice)', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_prank_stats' })
  public async getPrankStats(): Promise<IPrankStats> {
    this.logger.info('Récupération statistiques pranks (microservice)');

    try {
      const result = await this.prankService.getPrankStats();

      this.logger.info('Statistiques pranks récupérées (microservice)', {
        totalPranks: result.total_pranks,
        activePranks: result.active_pranks,
        totalExecutions: result.total_executions,
      });

      return result;
    } catch (error) {
      this.logger.error('Erreur récupération statistiques pranks (microservice)', error);
      throw error;
    }
  }

  // ==================== EXECUTED PRANK PATTERNS ====================

  @MessagePattern({ cmd: 'create_executed_prank' })
  public async createExecutedPrank(
    @Payload() payload: { executorId: number; createExecutedPrankDto: CreateExecutedPrankDto }
  ): Promise<IExecutedPrank> {
    this.logger.info('Création exécution prank (microservice)', {
      executorId: payload.executorId,
      prankId: payload.createExecutedPrankDto.chosen_prank_id,
      targetId: payload.createExecutedPrankDto.target_id,
    });

    try {
      const result = await this.prankService.createExecutedPrank(
        payload.executorId,
        payload.createExecutedPrankDto
      );

      this.logger.info('Exécution prank créée avec succès (microservice)', {
        executedPrankId: result.executed_prank_id,
        executorId: payload.executorId,
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
    this.logger.info('Mise à jour exécution prank (microservice)', {
      executedPrankId: payload.executedPrankId,
      updateFields: Object.keys(payload.updateExecutedPrankDto),
    });

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
    this.logger.info('Recherche exécution prank par ID (microservice)', { executedPrankId });

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
    this.logger.info('Récupération détails exécution prank (microservice)', { executedPrankId });

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
    this.logger.info('Recherche exécutions pranks avec filtres (microservice)', {
      filters: {
        status: filters.status,
        executorId: filters.executor_id,
        targetId: filters.target_id,
        prankId: filters.chosen_prank_id,
      },
    });

    try {
      const result = await this.prankService.findExecutedPranksWithFilters(filters);

      this.logger.info('Exécutions pranks récupérées avec filtres (microservice)', {
        resultCount: result.length,
        filters: {
          status: filters.status,
          executorId: filters.executor_id,
        },
      });

      return result;
    } catch (error) {
      this.logger.error('Erreur recherche exécutions pranks avec filtres (microservice)', error);
      throw error;
    }
  }
}
