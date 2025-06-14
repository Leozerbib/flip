import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { LoggerService } from '@app/logger';
import {
  UserNotFoundException,
  PackNotFoundException,
  InsufficientQuantityException,
  DatabaseException,
} from '@app/exceptions';
import {
  IUserPackInventory,
  IUserPackInventoryItem,
  IUserPackInventoryStats,
  IAddPackToInventoryResult,
  IRemovePackFromInventoryResult,
} from '@app/contracts/User';
import { pack_type_enum } from '@prisma/client';

@Injectable()
export class UserInventoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService
  ) {}

  /**
   * Récupère l'inventaire complet d'un utilisateur
   */
  public async getUserInventory(userId: number): Promise<IUserPackInventory> {
    this.logger.info('Récupération inventaire utilisateur', {
      userId: userId.toString(),
    });

    try {
      // Vérifier que l'utilisateur existe
      await this.validateUserExists(userId);

      const inventoryItems = await this.prisma.user_pack_inventory.findMany({
        where: { user_id: userId },
        include: {
          prank_packs: true,
        },
        orderBy: [
          { prank_packs: { pack_type: 'asc' } },
          { prank_packs: { required_user_level: 'asc' } },
          { acquired_at: 'desc' },
        ],
      });

      // Mapper les données
      const mappedItems: IUserPackInventoryItem[] = inventoryItems.map(item => ({
        userPackInventoryId: item.user_pack_inventory_id,
        userId: item.user_id,
        packId: item.pack_id,
        quantity: item.quantity,
        acquiredAt: item.acquired_at!,
        pack: {
          packId: item.prank_packs.pack_id,
          name: item.prank_packs.name,
          description: item.prank_packs.description ?? '',
          imageUrl: item.prank_packs.image_url ?? '',
          costCurrencyType: item.prank_packs.cost_currency_type,
          costAmount: item.prank_packs.cost_amount,
          numberOfPranksAwarded: item.prank_packs.number_of_pranks_awarded,
          packType: item.prank_packs.pack_type,
          isAvailable: item.prank_packs.is_available ?? true,
          requiredUserLevel: item.prank_packs.required_user_level ?? 0,
        },
      }));

      // Grouper par type
      const packsByType: Record<pack_type_enum, IUserPackInventoryItem[]> = {
        basic: [],
        event: [],
        limited: [],
        gift: [],
        promotional: [],
      };

      mappedItems.forEach(item => {
        packsByType[item.pack.packType].push(item);
      });

      const result: IUserPackInventory = {
        totalPacks: mappedItems.length,
        packsByType,
        allPacks: mappedItems,
      };

      this.logger.info('Inventaire récupéré avec succès', {
        userId: userId.toString(),
        totalPacks: result.totalPacks,
      });

      return result;
    } catch (error) {
      this.logger.error("Erreur lors de la récupération de l'inventaire", error, {
        userId: userId.toString(),
      });
      throw new DatabaseException(
        "Impossible de récupérer l'inventaire utilisateur",
        error,
        'getUserInventory'
      );
    }
  }

  /**
   * Récupère les statistiques d'inventaire d'un utilisateur
   */
  public async getUserInventoryStats(userId: number): Promise<IUserPackInventoryStats> {
    this.logger.info('Récupération stats inventaire utilisateur', {
      userId: userId.toString(),
    });

    try {
      await this.validateUserExists(userId);

      const inventoryItems = await this.prisma.user_pack_inventory.findMany({
        where: { user_id: userId },
        include: {
          prank_packs: true,
        },
      });

      // Calculer les statistiques
      let totalValue = 0;
      const packsByType: Record<pack_type_enum, { count: number; totalQuantity: number }> = {
        basic: { count: 0, totalQuantity: 0 },
        event: { count: 0, totalQuantity: 0 },
        limited: { count: 0, totalQuantity: 0 },
        gift: { count: 0, totalQuantity: 0 },
        promotional: { count: 0, totalQuantity: 0 },
      };

      inventoryItems.forEach(item => {
        totalValue += item.prank_packs.cost_amount * item.quantity;
        packsByType[item.prank_packs.pack_type].count += 1;
        packsByType[item.prank_packs.pack_type].totalQuantity += item.quantity;
      });

      const stats: IUserPackInventoryStats = {
        totalPacks: inventoryItems.length,
        totalValue,
        packsByType,
      };

      this.logger.info('Stats inventaire calculées', {
        userId: userId.toString(),
        totalPacks: stats.totalPacks,
        totalValue: stats.totalValue,
      });

      return stats;
    } catch (error) {
      this.logger.error('Erreur lors du calcul des stats inventaire', error, {
        userId: userId.toString(),
      });
      throw new DatabaseException(
        "Impossible de calculer les statistiques d'inventaire",
        error,
        'getUserInventoryStats'
      );
    }
  }

  /**
   * Ajoute des packs à l'inventaire d'un utilisateur
   */
  public async addPackToInventory(
    userId: number,
    packId: number,
    quantity = 1
  ): Promise<IAddPackToInventoryResult> {
    this.logger.info("Ajout pack à l'inventaire", {
      userId: userId.toString(),
      packId: packId.toString(),
      quantity: quantity.toString(),
    });

    try {
      // Valider utilisateur et pack
      await this.validateUserExists(userId);
      await this.validatePackExists(packId);

      const result = await this.prisma.$transaction(async tx => {
        // Vérifier si l'utilisateur a déjà ce pack
        const existingItem = await tx.user_pack_inventory.findUnique({
          where: {
            user_id_pack_id: {
              user_id: userId,
              pack_id: packId,
            },
          },
          include: {
            prank_packs: true,
          },
        });

        let inventoryItem;

        if (existingItem) {
          // Mettre à jour la quantité
          inventoryItem = await tx.user_pack_inventory.update({
            where: {
              user_pack_inventory_id: existingItem.user_pack_inventory_id,
            },
            data: {
              quantity: existingItem.quantity + quantity,
            },
            include: {
              prank_packs: true,
            },
          });
        } else {
          // Créer un nouvel élément
          inventoryItem = await tx.user_pack_inventory.create({
            data: {
              user_id: userId,
              pack_id: packId,
              quantity,
            },
            include: {
              prank_packs: true,
            },
          });
        }

        return inventoryItem;
      });

      const mappedResult: IUserPackInventoryItem = {
        userPackInventoryId: result.user_pack_inventory_id,
        userId: result.user_id,
        packId: result.pack_id,
        quantity: result.quantity,
        acquiredAt: result.acquired_at!,
        pack: {
          packId: result.prank_packs.pack_id,
          name: result.prank_packs.name,
          description: result.prank_packs.description,
          imageUrl: result.prank_packs.image_url,
          costCurrencyType: result.prank_packs.cost_currency_type,
          costAmount: result.prank_packs.cost_amount,
          numberOfPranksAwarded: result.prank_packs.number_of_pranks_awarded,
          packType: result.prank_packs.pack_type,
          isAvailable: result.prank_packs.is_available ?? true,
          requiredUserLevel: result.prank_packs.required_user_level,
        },
      };

      this.logger.info("Pack ajouté avec succès à l'inventaire", {
        userId: userId.toString(),
        packId: packId.toString(),
        newQuantity: result.quantity,
      });

      return {
        success: true,
        item: mappedResult,
      };
    } catch (error) {
      this.logger.error("Erreur lors de l'ajout du pack", error, {
        userId: userId.toString(),
        packId: packId.toString(),
      });

      return {
        success: false,
        error: "Impossible d'ajouter le pack à l'inventaire",
      };
    }
  }

  /**
   * Retire des packs de l'inventaire d'un utilisateur
   */
  public async removePackFromInventory(
    userId: number,
    packId: number,
    quantity = 1
  ): Promise<IRemovePackFromInventoryResult> {
    this.logger.info("Retrait pack de l'inventaire", {
      userId: userId.toString(),
      packId: packId.toString(),
      quantity: quantity.toString(),
    });

    try {
      await this.validateUserExists(userId);

      const result = await this.prisma.$transaction(async tx => {
        const existingItem = await tx.user_pack_inventory.findUnique({
          where: {
            user_id_pack_id: {
              user_id: userId,
              pack_id: packId,
            },
          },
        });

        if (!existingItem) {
          throw new InsufficientQuantityException("Pack non trouvé dans l'inventaire");
        }

        if (existingItem.quantity < quantity) {
          throw new InsufficientQuantityException("Quantité insuffisante dans l'inventaire");
        }

        const newQuantity = existingItem.quantity - quantity;

        if (newQuantity === 0) {
          // Supprimer l'élément
          await tx.user_pack_inventory.delete({
            where: {
              user_pack_inventory_id: existingItem.user_pack_inventory_id,
            },
          });
          return 0;
        } else {
          // Mettre à jour la quantité
          const updated = await tx.user_pack_inventory.update({
            where: {
              user_pack_inventory_id: existingItem.user_pack_inventory_id,
            },
            data: {
              quantity: newQuantity,
            },
          });
          return updated.quantity;
        }
      });

      this.logger.info("Pack retiré avec succès de l'inventaire", {
        userId: userId.toString(),
        packId: packId.toString(),
        remainingQuantity: result,
      });

      return {
        success: true,
        remainingQuantity: result,
      };
    } catch (error) {
      this.logger.error('Erreur lors du retrait du pack', error, {
        userId: userId.toString(),
        packId: packId.toString(),
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
        error: "Impossible de retirer le pack de l'inventaire",
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
   * Valide qu'un pack existe
   */
  private async validatePackExists(packId: number): Promise<void> {
    const pack = await this.prisma.prank_packs.findUnique({
      where: { pack_id: packId },
    });

    if (!pack) {
      throw new PackNotFoundException(`Pack ${packId} non trouvé`);
    }
  }
}
