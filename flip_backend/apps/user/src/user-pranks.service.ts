import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { LoggerService } from '@app/logger';
import {
  UserNotFoundException,
  PrankNotFoundException,
  InsufficientQuantityException,
  DatabaseException,
} from '@app/exceptions';
import {
  IUserPranksCollection,
  IUserPrankItem,
  IUserPranksStats,
  IUserPrankFilters,
  IAddPrankToCollectionResult,
  IRemovePrankFromCollectionResult,
} from '@app/contracts/User';
import { prank_rarity_enum, prank_type_enum } from '@prisma/client';

@Injectable()
export class UserPranksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService
  ) {}

  /**
   * Récupère la collection complète de pranks d'un utilisateur
   */
  public async getUserPranksCollection(
    userId: number,
    filters?: IUserPrankFilters
  ): Promise<IUserPranksCollection> {
    this.logger.info('Récupération collection pranks utilisateur', {
      userId: userId.toString(),
      filters: JSON.stringify(filters),
    });

    try {
      await this.validateUserExists(userId);

      // Construire les filtres Prisma
      const where: any = {
        user_id: userId,
        ...(filters?.rarity && { pranks: { rarity: { in: filters.rarity } } }),
        ...(filters?.type && { pranks: { type: { in: filters.type } } }),
      };

      // Construire l'ordre de tri
      let orderBy: any = { obtained_at: 'desc' }; // Par défaut
      if (filters?.sortBy) {
        switch (filters.sortBy) {
          case 'rarity':
            orderBy = { pranks: { rarity: filters.sortOrder ?? 'desc' } };
            break;
          case 'type':
            orderBy = { pranks: { type: filters.sortOrder ?? 'asc' } };
            break;
          case 'quantity':
            orderBy = { quantity: filters.sortOrder ?? 'desc' };
            break;
          case 'name':
            orderBy = { pranks: { name: filters.sortOrder ?? 'asc' } };
            break;
          case 'obtainedAt':
            orderBy = { obtained_at: filters.sortOrder ?? 'desc' };
            break;
        }
      }

      const userPranks = await this.prisma.user_pranks.findMany({
        where,
        include: {
          pranks: true,
        },
        orderBy,
        ...(filters?.limit && { take: filters.limit }),
        ...(filters?.offset && { skip: filters.offset }),
      });

      // Mapper les données
      const mappedItems: IUserPrankItem[] = userPranks.map(item => ({
        userPrankId: item.user_prank_id,
        userId: item.user_id,
        prankId: item.prank_id,
        quantity: item.quantity,
        obtainedAt: item.obtained_at!,
        prank: {
          prankId: item.pranks.prank_id,
          name: item.pranks.name,
          description: item.pranks.description,
          imageUrl: item.pranks.image_url ?? '',
          type: item.pranks.type,
          rarity: item.pranks.rarity,
          defaultJetonCostEquivalent: item.pranks.default_jeton_cost_equivalent,
          xpRewardExecutor: item.pranks.xp_reward_executor ?? 0,
          xpRewardTarget: item.pranks.xp_reward_target ?? 0,
          coinsRewardExecutor: item.pranks.coins_reward_executor ?? 0,
          coinsRewardTarget: item.pranks.coins_reward_target ?? 0,
          requiresProof: item.pranks.requires_proof,
          isActive: item.pranks.is_active,
        },
      }));

      // Grouper par rareté
      const pranksByRarity: Record<prank_rarity_enum, IUserPrankItem[]> = {
        common: [],
        rare: [],
        extreme: [],
      };

      // Grouper par type
      const pranksByType: Record<prank_type_enum, IUserPrankItem[]> = {
        declarative: [],
        in_app_cosmetic: [],
        in_app_lock: [],
        notification_spam: [],
        external_action: [],
      };

      mappedItems.forEach(item => {
        pranksByRarity[item.prank.rarity].push(item);
        pranksByType[item.prank.type].push(item);
      });

      const result: IUserPranksCollection = {
        totalPranks: mappedItems.length,
        pranksByRarity,
        pranksByType,
        allPranks: mappedItems,
      };

      this.logger.info('Collection pranks récupérée avec succès', {
        userId: userId.toString(),
        totalPranks: result.totalPranks,
      });

      return result;
    } catch (error) {
      this.logger.error('Erreur lors de la récupération de la collection', error, {
        userId: userId.toString(),
      });
      throw new DatabaseException(
        'Impossible de récupérer la collection de pranks',
        error,
        'getUserPranksCollection'
      );
    }
  }

  /**
   * Récupère les statistiques de la collection d'un utilisateur
   */
  public async getUserPranksStats(userId: number): Promise<IUserPranksStats> {
    this.logger.info('Récupération stats pranks utilisateur', {
      userId: userId.toString(),
    });

    try {
      await this.validateUserExists(userId);

      const [userPranks, totalAvailablePranks] = await Promise.all([
        this.prisma.user_pranks.findMany({
          where: { user_id: userId },
          include: { pranks: true },
        }),
        this.prisma.pranks.count({
          where: { is_active: true },
        }),
      ]);

      // Calculer les statistiques
      let totalQuantity = 0;
      let totalValue = 0;

      const pranksByRarity: Record<prank_rarity_enum, { count: number; totalQuantity: number }> = {
        common: { count: 0, totalQuantity: 0 },
        rare: { count: 0, totalQuantity: 0 },
        extreme: { count: 0, totalQuantity: 0 },
      };

      const pranksByType: Record<prank_type_enum, { count: number; totalQuantity: number }> = {
        declarative: { count: 0, totalQuantity: 0 },
        in_app_cosmetic: { count: 0, totalQuantity: 0 },
        in_app_lock: { count: 0, totalQuantity: 0 },
        notification_spam: { count: 0, totalQuantity: 0 },
        external_action: { count: 0, totalQuantity: 0 },
      };

      userPranks.forEach(item => {
        totalQuantity += item.quantity;
        totalValue += item.pranks.default_jeton_cost_equivalent * item.quantity;

        pranksByRarity[item.pranks.rarity].count += 1;
        pranksByRarity[item.pranks.rarity].totalQuantity += item.quantity;

        pranksByType[item.pranks.type].count += 1;
        pranksByType[item.pranks.type].totalQuantity += item.quantity;
      });

      const completionPercentage =
        totalAvailablePranks > 0 ? Math.round((userPranks.length / totalAvailablePranks) * 100) : 0;

      const stats: IUserPranksStats = {
        totalPranks: userPranks.length,
        totalQuantity,
        totalValue,
        pranksByRarity,
        pranksByType,
        completionPercentage,
      };

      this.logger.info('Stats pranks calculées', {
        userId: userId.toString(),
        totalPranks: stats.totalPranks,
        completionPercentage: stats.completionPercentage,
      });

      return stats;
    } catch (error) {
      this.logger.error('Erreur lors du calcul des stats pranks', error, {
        userId: userId.toString(),
      });
      throw new DatabaseException(
        'Impossible de calculer les statistiques de pranks',
        error,
        'getUserPranksStats'
      );
    }
  }

  /**
   * Ajoute des pranks à la collection d'un utilisateur
   */
  public async addPrankToCollection(
    userId: number,
    prankId: number,
    quantity = 1
  ): Promise<IAddPrankToCollectionResult> {
    this.logger.info('Ajout prank à la collection', {
      userId: userId.toString(),
      prankId: prankId.toString(),
      quantity: quantity.toString(),
    });

    try {
      // Valider utilisateur et prank
      await this.validateUserExists(userId);
      await this.validatePrankExists(prankId);

      const result = await this.prisma.$transaction(async tx => {
        // Vérifier si l'utilisateur a déjà ce prank
        const existingItem = await tx.user_pranks.findUnique({
          where: {
            user_id_prank_id: {
              user_id: userId,
              prank_id: prankId,
            },
          },
          include: {
            pranks: true,
          },
        });

        let prankItem;
        let isNew = false;

        if (existingItem) {
          // Mettre à jour la quantité
          prankItem = await tx.user_pranks.update({
            where: {
              user_prank_id: existingItem.user_prank_id,
            },
            data: {
              quantity: existingItem.quantity + quantity,
            },
            include: {
              pranks: true,
            },
          });
        } else {
          // Créer un nouvel élément
          isNew = true;
          prankItem = await tx.user_pranks.create({
            data: {
              user_id: userId,
              prank_id: prankId,
              quantity,
            },
            include: {
              pranks: true,
            },
          });
        }

        return { prankItem, isNew };
      });

      const mappedResult: IUserPrankItem = {
        userPrankId: result.prankItem.user_prank_id,
        userId: result.prankItem.user_id,
        prankId: result.prankItem.prank_id,
        quantity: result.prankItem.quantity,
        obtainedAt: result.prankItem.obtained_at!,
        prank: {
          prankId: result.prankItem.pranks.prank_id,
          name: result.prankItem.pranks.name,
          description: result.prankItem.pranks.description,
          imageUrl: result.prankItem.pranks.image_url ?? '',
          type: result.prankItem.pranks.type,
          rarity: result.prankItem.pranks.rarity,
          defaultJetonCostEquivalent: result.prankItem.pranks.default_jeton_cost_equivalent,
          xpRewardExecutor: result.prankItem.pranks.xp_reward_executor,
          xpRewardTarget: result.prankItem.pranks.xp_reward_target,
          coinsRewardExecutor: result.prankItem.pranks.coins_reward_executor,
          coinsRewardTarget: result.prankItem.pranks.coins_reward_target,
          requiresProof: result.prankItem.pranks.requires_proof,
          isActive: result.prankItem.pranks.is_active,
        },
      };

      this.logger.info('Prank ajouté avec succès à la collection', {
        userId: userId.toString(),
        prankId: prankId.toString(),
        newQuantity: result.prankItem.quantity,
        isNew: result.isNew,
      });

      return {
        success: true,
        item: mappedResult,
        isNew: result.isNew,
      };
    } catch (error) {
      this.logger.error("Erreur lors de l'ajout du prank", error, {
        userId: userId.toString(),
        prankId: prankId.toString(),
      });

      return {
        success: false,
        isNew: false,
        error: "Impossible d'ajouter le prank à la collection",
      };
    }
  }

  /**
   * Retire des pranks de la collection d'un utilisateur
   */
  public async removePrankFromCollection(
    userId: number,
    prankId: number,
    quantity = 1
  ): Promise<IRemovePrankFromCollectionResult> {
    this.logger.info('Retrait prank de la collection', {
      userId: userId.toString(),
      prankId: prankId.toString(),
      quantity: quantity.toString(),
    });

    try {
      await this.validateUserExists(userId);

      const result = await this.prisma.$transaction(async tx => {
        const existingItem = await tx.user_pranks.findUnique({
          where: {
            user_id_prank_id: {
              user_id: userId,
              prank_id: prankId,
            },
          },
        });

        if (!existingItem) {
          throw new InsufficientQuantityException('Prank non trouvé dans la collection');
        }

        if (existingItem.quantity < quantity) {
          throw new InsufficientQuantityException('Quantité insuffisante dans la collection');
        }

        const newQuantity = existingItem.quantity - quantity;

        if (newQuantity === 0) {
          // Supprimer l'élément
          await tx.user_pranks.delete({
            where: {
              user_prank_id: existingItem.user_prank_id,
            },
          });
          return 0;
        } else {
          // Mettre à jour la quantité
          const updated = await tx.user_pranks.update({
            where: {
              user_prank_id: existingItem.user_prank_id,
            },
            data: {
              quantity: newQuantity,
            },
          });
          return updated.quantity;
        }
      });

      this.logger.info('Prank retiré avec succès de la collection', {
        userId: userId.toString(),
        prankId: prankId.toString(),
        remainingQuantity: result,
      });

      return {
        success: true,
        remainingQuantity: result,
      };
    } catch (error) {
      this.logger.error('Erreur lors du retrait du prank', error, {
        userId: userId.toString(),
        prankId: prankId.toString(),
      });

      if (error instanceof InsufficientQuantityException) {
        return {
          success: false,
          remainingQuantity: 0,
          error: error.message,
        };
      }

      return {
        success: false,
        remainingQuantity: 0,
        error: 'Impossible de retirer le prank de la collection',
      };
    }
  }

  /**
   * Valide qu'un utilisateur existe
   */
  private async validateUserExists(userId: number): Promise<void> {
    const user = await this.prisma.users.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new UserNotFoundException(`Utilisateur ${userId} non trouvé`);
    }
  }

  /**
   * Valide qu'un prank existe
   */
  private async validatePrankExists(prankId: number): Promise<void> {
    const prank = await this.prisma.pranks.findUnique({
      where: { prank_id: prankId },
    });

    if (!prank) {
      throw new PrankNotFoundException(`Prank ${prankId} non trouvé`);
    }
  }
}
