import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from 'libs/logger/src';
import { ExceptionThrower } from '@app/exceptions';
import {
  UpdatePrankDto,
  CreateExecutedPrankDto,
  UpdateExecutedPrankDto,
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
import {
  PrankTypeEnum,
  PrankRarityEnum,
  ExecutedPrankStatusEnum,
  ServiceStatusEnum,
} from '@app/contracts/types/common.types';

@Injectable()
export class PrankService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService,
    private readonly exceptionThrower: ExceptionThrower,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy
  ) {
    this.logger.setContext('Prank.service');
  }

  // ==================== PRANK READ/UPDATE/DELETE OPERATIONS ====================

  /**
   * Mettre à jour un prank
   */
  public async updatePrank(prankId: number, updatePrankDto: UpdatePrankDto): Promise<IPrank> {
    this.logger.info('Mise à jour du prank', { prankId });

    const prank = await this.findPrankById(prankId);
    if (!prank) {
      this.exceptionThrower.throwRecordNotFound('Prank non trouvé');
    }

    try {
      const updatedPrank = await this.prisma.pranks.update({
        where: { prank_id: prankId },
        data: updatePrankDto,
      });

      this.logger.info('Prank mis à jour avec succès', { prankId });
      return updatedPrank as IPrank;
    } catch (error) {
      if (error.code === 'P2002') {
        this.exceptionThrower.throwDuplicateEntry('Un prank avec ce nom existe déjà');
      }
      this.logger.error('Erreur lors de la mise à jour du prank', error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'update_prank',
        originalError: error.message,
      });
    }
  }

  /**
   * Supprimer un prank
   */
  public async deletePrank(prankId: number): Promise<{ message: string }> {
    this.logger.info('Suppression du prank', { prankId });

    const prank = await this.findPrankById(prankId);
    if (!prank) {
      this.exceptionThrower.throwRecordNotFound('Prank non trouvé');
    }

    // Vérifier s'il y a des pranks exécutés en cours
    const activePranks = await this.prisma.executed_pranks.count({
      where: {
        chosen_prank_id: prankId,
        status: {
          in: [
            ExecutedPrankStatusEnum.PROPOSED_BY_DEBTOR,
            ExecutedPrankStatusEnum.PROPOSED_BY_CREDITOR,
            ExecutedPrankStatusEnum.ACCEPTED_BY_TARGET,
            ExecutedPrankStatusEnum.EXECUTED_PENDING_VALIDATION,
          ],
        },
      },
    });

    if (activePranks > 0) {
      this.exceptionThrower.throwValidation(
        'Ce prank ne peut pas être supprimé car il y a des exécutions en cours',
        [
          {
            field: 'prankId',
            value: prankId,
            constraints: [`${activePranks} exécutions actives`],
          },
        ]
      );
    }

    try {
      await this.prisma.pranks.delete({
        where: { prank_id: prankId },
      });

      this.logger.info('Prank supprimé avec succès', { prankId });
      return { message: 'Prank supprimé avec succès' };
    } catch (error) {
      this.logger.error('Erreur lors de la suppression du prank', error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'delete_prank',
        originalError: error.message,
      });
    }
  }

  // ==================== EXECUTED PRANK OPERATIONS ====================

  /**
   * Créer une nouvelle exécution de prank
   */
  public async createExecutedPrank(
    executorId: number,
    createExecutedPrankDto: CreateExecutedPrankDto
  ): Promise<IExecutedPrank> {
    this.logger.info("Création d'une nouvelle exécution de prank", {
      executorId,
      prankId: createExecutedPrankDto.chosen_prank_id,
      targetId: createExecutedPrankDto.target_id,
    });

    // Vérifier que le service à rembourser existe
    const service = await this.prisma.services.findUnique({
      where: { service_id: createExecutedPrankDto.service_being_repaid_id },
    });

    if (!service) {
      this.exceptionThrower.throwRecordNotFound('Service à rembourser non trouvé');
    }

    if (service.status !== ServiceStatusEnum.CONFIRMED_UNPAID) {
      this.exceptionThrower.throwValidation(
        'Le service doit être confirmé et non payé pour être remboursé par un prank',
        [
          {
            field: 'serviceId',
            value: createExecutedPrankDto.service_being_repaid_id,
            constraints: [service.status],
          },
        ]
      );
    }

    // Vérifier que le prank existe et est actif
    const prank = await this.findPrankById(createExecutedPrankDto.chosen_prank_id);
    if (!prank) {
      this.exceptionThrower.throwRecordNotFound('Prank non trouvé');
    }

    if (!prank.is_active) {
      this.exceptionThrower.throwValidation("Ce prank n'est plus actif", [
        {
          field: 'prankId',
          value: createExecutedPrankDto.chosen_prank_id,
          constraints: ['inactive'],
        },
      ]);
    }

    // Vérifier que l'exécuteur et la cible existent
    const [executor, target] = await Promise.all([
      this.findUserById(executorId),
      this.findUserById(createExecutedPrankDto.target_id),
    ]);

    if (!executor) {
      this.exceptionThrower.throwRecordNotFound('Exécuteur non trouvé');
    }

    if (!target) {
      this.exceptionThrower.throwRecordNotFound('Cible du prank non trouvée');
    }

    if (executorId === createExecutedPrankDto.target_id) {
      this.exceptionThrower.throwValidation(
        "Un utilisateur ne peut pas s'exécuter un prank à lui-même",
        [
          {
            field: 'executorId',
            value: executorId,
            constraints: [createExecutedPrankDto.target_id.toString()],
          },
        ]
      );
    }

    // Vérifier la logique de remboursement
    const isValidRepayment =
      (service.beneficiary_id === executorId &&
        service.provider_id === createExecutedPrankDto.target_id) ||
      (service.provider_id === executorId &&
        service.beneficiary_id === createExecutedPrankDto.target_id);

    if (!isValidRepayment) {
      this.exceptionThrower.throwValidation(
        'Le prank doit être exécuté entre les parties impliquées dans le service',
        [
          {
            field: 'serviceParties',
            value: `${service.provider_id}-${service.beneficiary_id}`,
            constraints: [`${executorId}-${createExecutedPrankDto.target_id}`],
          },
        ]
      );
    }

    try {
      const executedPrank = await this.prisma.executed_pranks.create({
        data: {
          service_being_repaid_id: createExecutedPrankDto.service_being_repaid_id,
          chosen_prank_id: createExecutedPrankDto.chosen_prank_id,
          executor_id: executorId,
          target_id: createExecutedPrankDto.target_id,
          jeton_value_paid: createExecutedPrankDto.jeton_value_paid,
          status: createExecutedPrankDto.status ?? ExecutedPrankStatusEnum.PROPOSED_BY_DEBTOR,
        },
      });

      this.logger.info('Exécution de prank créée avec succès', {
        executedPrankId: executedPrank.executed_prank_id,
      });
      return executedPrank as IExecutedPrank;
    } catch (error) {
      this.logger.error("Erreur lors de la création de l'exécution de prank", error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'create_executed_prank',
        originalError: error.message,
      });
    }
  }

  /**
   * Mettre à jour une exécution de prank
   */
  public async updateExecutedPrank(
    executedPrankId: number,
    updateExecutedPrankDto: UpdateExecutedPrankDto
  ): Promise<IExecutedPrank> {
    this.logger.info("Mise à jour de l'exécution de prank", { executedPrankId });

    const executedPrank = await this.findExecutedPrankById(executedPrankId);
    if (!executedPrank) {
      this.exceptionThrower.throwRecordNotFound('Exécution de prank non trouvée');
    }

    try {
      const updatedExecutedPrank = await this.prisma.executed_pranks.update({
        where: { executed_prank_id: executedPrankId },
        data: {
          ...updateExecutedPrankDto,
          updated_at: new Date(),
          ...(updateExecutedPrankDto.status ===
          ExecutedPrankStatusEnum.VALIDATED_BY_TARGET_COMPLETED
            ? { validated_at: new Date() }
            : {}),
        },
      });

      this.logger.info('Exécution de prank mise à jour avec succès', { executedPrankId });
      return updatedExecutedPrank as IExecutedPrank;
    } catch (error) {
      this.logger.error("Erreur lors de la mise à jour de l'exécution de prank", error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'update_executed_prank',
        originalError: error.message,
      });
    }
  }

  // ==================== QUERY OPERATIONS ====================

  /**
   * Trouver un prank par ID
   */
  public async findPrankById(prankId: number): Promise<IPrank | null> {
    try {
      const prank = await this.prisma.pranks.findUnique({
        where: { prank_id: prankId },
      });
      return prank as IPrank | null;
    } catch (error) {
      this.logger.error('Erreur lors de la recherche de prank par ID', error);
      return null;
    }
  }

  /**
   * Trouver une exécution de prank par ID
   */
  public async findExecutedPrankById(executedPrankId: number): Promise<IExecutedPrank | null> {
    try {
      const executedPrank = await this.prisma.executed_pranks.findUnique({
        where: { executed_prank_id: executedPrankId },
      });
      return executedPrank as IExecutedPrank | null;
    } catch (error) {
      this.logger.error("Erreur lors de la recherche d'exécution de prank par ID", error);
      return null;
    }
  }

  /**
   * Obtenir tous les pranks avec filtres
   */
  public async findPranksWithFilters(filters: IPrankFilters): Promise<IPrank[]> {
    this.logger.info('Recherche de pranks avec filtres', { filters });

    const whereClause: any = {};

    if (filters.type) {
      whereClause.type = filters.type;
    }

    if (typeof filters.is_active === 'boolean') {
      whereClause.is_active = filters.is_active;
    }

    if (typeof filters.requires_proof === 'boolean') {
      whereClause.requires_proof = filters.requires_proof;
    }

    if (filters.rarity) {
      whereClause.rarity = filters.rarity;
    }

    if (filters.jeton_cost_min || filters.jeton_cost_max) {
      whereClause.default_jeton_cost_equivalent = {};
      if (filters.jeton_cost_min) {
        whereClause.default_jeton_cost_equivalent.gte = filters.jeton_cost_min;
      }
      if (filters.jeton_cost_max) {
        whereClause.default_jeton_cost_equivalent.lte = filters.jeton_cost_max;
      }
    }

    try {
      const pranks = await this.prisma.pranks.findMany({
        where: whereClause,
        orderBy: {
          created_at: 'desc',
        },
      });

      return pranks as IPrank[];
    } catch (error) {
      this.logger.error('Erreur lors de la recherche filtrée de pranks', error);
      return [];
    }
  }

  /**
   * Obtenir les exécutions de pranks avec détails
   */
  public async getExecutedPrankWithDetails(
    executedPrankId: number
  ): Promise<IExecutedPrankWithDetails | null> {
    this.logger.info("Récupération des détails de l'exécution de prank", { executedPrankId });

    try {
      const executedPrank = await this.prisma.executed_pranks.findUnique({
        where: { executed_prank_id: executedPrankId },
        include: {
          pranks: true,
          users_executed_pranks_executor_idTousers: {
            select: {
              user_id: true,
              username: true,
              profile_picture_url: true,
            },
          },
          users_executed_pranks_target_idTousers: {
            select: {
              user_id: true,
              username: true,
              profile_picture_url: true,
            },
          },
          services_executed_pranks_service_being_repaid_idToservices: {
            select: {
              service_id: true,
              description: true,
              jeton_value: true,
            },
          },
        },
      });

      if (!executedPrank) {
        return null;
      }

      const result: IExecutedPrankWithDetails = {
        executed_prank_id: executedPrank.executed_prank_id,
        chosen_prank_id: executedPrank.chosen_prank_id,
        executor_id: executedPrank.executor_id,
        target_id: executedPrank.target_id,
        service_being_repaid_id: executedPrank.service_being_repaid_id,
        status: executedPrank.status as ExecutedPrankStatusEnum,
        proof_url: executedPrank.proof_url ?? undefined,
        executed_at: executedPrank.executed_at ?? undefined,
        validated_at: executedPrank.validated_at ?? undefined,
        jeton_value_paid: executedPrank.jeton_value_paid,
        prank: executedPrank.pranks as IPrank,
        executor: {
          user_id: executedPrank.users_executed_pranks_executor_idTousers.user_id,
          username: executedPrank.users_executed_pranks_executor_idTousers.username,
          profile_picture_url:
            executedPrank.users_executed_pranks_executor_idTousers.profile_picture_url ?? '',
        },
        target: {
          user_id: executedPrank.users_executed_pranks_target_idTousers.user_id,
          username: executedPrank.users_executed_pranks_target_idTousers.username,
          profile_picture_url:
            executedPrank.users_executed_pranks_target_idTousers.profile_picture_url ?? '',
        },
        service_being_repaid: {
          service_id:
            executedPrank.services_executed_pranks_service_being_repaid_idToservices.service_id,
          description:
            executedPrank.services_executed_pranks_service_being_repaid_idToservices.description,
          jeton_value:
            executedPrank.services_executed_pranks_service_being_repaid_idToservices.jeton_value,
        },
      };

      return result;
    } catch (error) {
      this.logger.error(
        "Erreur lors de la récupération des détails de l'exécution de prank",
        error
      );
      return null;
    }
  }

  /**
   * Rechercher des exécutions de pranks avec filtres
   */
  public async findExecutedPranksWithFilters(
    filters: IExecutedPrankFilters
  ): Promise<IExecutedPrankWithDetails[]> {
    this.logger.info("Recherche d'exécutions de pranks avec filtres", { filters });

    const whereClause: any = {};

    if (filters.status) {
      whereClause.status = filters.status;
    }

    if (filters.executor_id) {
      whereClause.executor_id = filters.executor_id;
    }

    if (filters.target_id) {
      whereClause.target_id = filters.target_id;
    }

    if (filters.chosen_prank_id) {
      whereClause.chosen_prank_id = filters.chosen_prank_id;
    }

    if (filters.service_being_repaid_id) {
      whereClause.service_being_repaid_id = filters.service_being_repaid_id;
    }

    if (filters.executed_after || filters.executed_before) {
      whereClause.executed_at = {};
      if (filters.executed_after) {
        whereClause.executed_at.gte = filters.executed_after;
      }
      if (filters.executed_before) {
        whereClause.executed_at.lte = filters.executed_before;
      }
    }

    try {
      const executedPranks = await this.prisma.executed_pranks.findMany({
        where: whereClause,
        include: {
          pranks: true,
          users_executed_pranks_executor_idTousers: {
            select: {
              user_id: true,
              username: true,
              profile_picture_url: true,
            },
          },
          users_executed_pranks_target_idTousers: {
            select: {
              user_id: true,
              username: true,
              profile_picture_url: true,
            },
          },
          services_executed_pranks_service_being_repaid_idToservices: {
            select: {
              service_id: true,
              description: true,
              jeton_value: true,
            },
          },
        },
        orderBy: {
          executed_at: 'desc',
        },
      });

      return executedPranks.map(executedPrank => ({
        executed_prank_id: executedPrank.executed_prank_id,
        chosen_prank_id: executedPrank.chosen_prank_id,
        executor_id: executedPrank.executor_id,
        target_id: executedPrank.target_id,
        service_being_repaid_id: executedPrank.service_being_repaid_id,
        status: executedPrank.status as ExecutedPrankStatusEnum,
        proof_url: executedPrank.proof_url ?? undefined,
        executed_at: executedPrank.executed_at ?? undefined,
        validated_at: executedPrank.validated_at ?? undefined,
        jeton_value_paid: executedPrank.jeton_value_paid,
        prank: executedPrank.pranks as IPrank,
        executor: {
          user_id: executedPrank.users_executed_pranks_executor_idTousers.user_id,
          username: executedPrank.users_executed_pranks_executor_idTousers.username,
          profile_picture_url:
            executedPrank.users_executed_pranks_executor_idTousers.profile_picture_url ?? '',
        },
        target: {
          user_id: executedPrank.users_executed_pranks_target_idTousers.user_id,
          username: executedPrank.users_executed_pranks_target_idTousers.username,
          profile_picture_url:
            executedPrank.users_executed_pranks_target_idTousers.profile_picture_url ?? '',
        },
        service_being_repaid: {
          service_id:
            executedPrank.services_executed_pranks_service_being_repaid_idToservices.service_id,
          description:
            executedPrank.services_executed_pranks_service_being_repaid_idToservices.description,
          jeton_value:
            executedPrank.services_executed_pranks_service_being_repaid_idToservices.jeton_value,
        },
      })) as IExecutedPrankWithDetails[];
    } catch (error) {
      this.logger.error("Erreur lors de la recherche filtrée d'exécutions de pranks", error);
      return [];
    }
  }

  /**
   * Obtenir les statistiques des pranks
   */
  public async getPrankStats(): Promise<IPrankStats> {
    this.logger.info('Récupération des statistiques des pranks');

    try {
      const [totalPranks, activePranks, executionStats, valueStats] = await Promise.all([
        this.prisma.pranks.count(),
        this.prisma.pranks.count({ where: { is_active: true } }),
        this.prisma.executed_pranks.groupBy({
          by: ['status'],
          _count: {
            executed_prank_id: true,
          },
        }),
        this.prisma.executed_pranks.aggregate({
          _sum: {
            jeton_value_paid: true,
          },
          _avg: {
            jeton_value_paid: true,
          },
          _count: {
            executed_prank_id: true,
          },
        }),
      ]);

      const pendingExecutions = executionStats
        .filter(
          s =>
            s.status === ExecutedPrankStatusEnum.PROPOSED_BY_DEBTOR ||
            s.status === ExecutedPrankStatusEnum.PROPOSED_BY_CREDITOR ||
            s.status === ExecutedPrankStatusEnum.ACCEPTED_BY_TARGET ||
            s.status === ExecutedPrankStatusEnum.EXECUTED_PENDING_VALIDATION
        )
        .reduce((sum, s) => sum + s._count.executed_prank_id, 0);

      const completedExecutions = executionStats
        .filter(s => s.status === ExecutedPrankStatusEnum.VALIDATED_BY_TARGET_COMPLETED)
        .reduce((sum, s) => sum + s._count.executed_prank_id, 0);

      return {
        total_pranks: totalPranks,
        active_pranks: activePranks,
        total_executions: valueStats._count.executed_prank_id,
        pending_executions: pendingExecutions,
        completed_executions: completedExecutions,
        total_jeton_value_executed: valueStats._sum.jeton_value_paid ?? 0,
        average_jeton_cost: Math.round(valueStats._avg.jeton_value_paid ?? 0),
      };
    } catch (error) {
      this.logger.error('Erreur lors de la récupération des statistiques des pranks', error);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'get_prank_stats',
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
