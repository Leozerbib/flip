/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { LoggerService } from 'libs/logger/src';
import { prank_rarity_enum } from '@prisma/client';
import {
  IPrankPack,
  IAwardedPrank,
  IPackOpeningResult,
  IPackOpeningError,
  IPacksByType,
  IMultiplePackOpeningResult,
  IPackAvailablePranks,
  IBoosterOpeningResult,
  PackType,
  PackRarityProbabilities,
  RarityProbabilities,
} from '@app/contracts/PrankPack/interfaces/prank-pack.interface';

@Injectable()
export class PrankPackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext('PrankPack.service');
  }

  /**
   * Récupère tous les packs disponibles groupés par type et ordonnés par niveau requis
   */
  public async getAvailablePacksGroupedByType(): Promise<IPacksByType> {
    this.logger.info('Récupération des packs disponibles groupés par type');

    const currentDate = new Date();

    const packs = await this.prisma.prank_packs.findMany({
      where: {
        is_available: true,
        OR: [
          { available_from: { lte: currentDate }, available_until: { gte: currentDate } },
          { available_from: null, available_until: null },
          { available_from: { lte: currentDate }, available_until: null },
          { available_from: null, available_until: { gte: currentDate } },
        ],
      },
      orderBy: [{ required_user_level: 'asc' }, { cost_amount: 'asc' }],
    });

    this.logger.info(`${packs.length} packs disponibles trouvés`);

    // Grouper par type
    const groupedPacks: IPacksByType = {
      basic: [],
      event: [],
      limited: [],
      gift: [],
      promotional: [],
    };

    for (const pack of packs) {
      const mappedPack: IPrankPack = this.mapPrankPackToInterface(pack);
      const packType = ((pack as any).pack_type as PackType) ?? 'basic';

      if (groupedPacks[packType]) {
        groupedPacks[packType].push(mappedPack);
      }
    }

    return groupedPacks;
  }

  /**
   * Récupère tous les packs disponibles (méthode legacy pour rétrocompatibilité)
   */
  public async getAvailablePacks(): Promise<IPrankPack[]> {
    this.logger.info('Récupération des packs disponibles');

    const currentDate = new Date();

    const packs = await this.prisma.prank_packs.findMany({
      where: {
        is_available: true,
        OR: [
          { available_from: { lte: currentDate }, available_until: { gte: currentDate } },
          { available_from: null, available_until: null },
          { available_from: { lte: currentDate }, available_until: null },
          { available_from: null, available_until: { gte: currentDate } },
        ],
      },
      orderBy: [{ required_user_level: 'asc' }, { cost_amount: 'asc' }],
    });

    this.logger.info(`${packs.length} packs disponibles trouvés`);

    return packs.map(pack => this.mapPrankPackToInterface(pack));
  }

  /**
   * Récupère les pranks disponibles dans un pack par rareté
   */
  public async getPackAvailablePranks(packId: number): Promise<IPackAvailablePranks | null> {
    this.logger.info('Récupération des pranks disponibles pour le pack', {
      packId: packId.toString(),
    });

    const pack = await this.prisma.prank_packs.findUnique({
      where: { pack_id: packId },
      include: {
        pack_prank_pool: {
          include: {
            pranks: true,
          },
        },
      },
    });

    if (!pack) {
      this.logger.warn('Pack non trouvé', { packId: packId.toString() });
      return null;
    }

    // Grouper les pranks par rareté
    const pranksByRarity: IPackAvailablePranks['available_pranks_by_rarity'] = {
      common: [],
      rare: [],
      extreme: [],
    };

    for (const poolEntry of pack.pack_prank_pool) {
      const prank = poolEntry.pranks;
      if (!prank.is_active) {
        continue;
      }

      const awardedPrank: IAwardedPrank = {
        prank_id: prank.prank_id,
        name: prank.name,
        rarity: prank.rarity,
        description: prank.description,
        image_url: prank.image_url ?? undefined,
        quantity_awarded: 1,
        is_new: false, // Non applicable dans ce contexte
      };

      pranksByRarity[prank.rarity as keyof typeof pranksByRarity].push(awardedPrank);
    }

    return {
      pack_id: pack.pack_id,
      pack_name: pack.name,
      available_pranks_by_rarity: pranksByRarity,
    };
  }

  /**
   * Ouvre plusieurs packs pour un utilisateur
   */
  public async openMultiplePacks(
    userId: number,
    packId: number,
    quantity: number
  ): Promise<IMultiplePackOpeningResult | IPackOpeningError> {
    this.logger.info("Tentative d'ouverture de packs multiples", {
      userId: userId.toString(),
      packId: packId.toString(),
      quantity: quantity.toString(),
    });

    return await this.prisma.$transaction(async prisma => {
      // 1. Vérifier que le pack existe et est disponible
      const pack = await prisma.prank_packs.findUnique({
        where: { pack_id: packId },
      });

      if (!pack) {
        return {
          success: false,
          error_code: 'PACK_NOT_FOUND',
          error_message: `Le pack avec l'ID ${packId} n'existe pas.`,
        };
      }

      // Vérifier la disponibilité du pack
      const currentDate = new Date();
      const isAvailable =
        pack.is_available &&
        (!pack.available_from || pack.available_from <= currentDate) &&
        (!pack.available_until || pack.available_until >= currentDate);

      if (!isAvailable) {
        return {
          success: false,
          error_code: 'PACK_NOT_AVAILABLE',
          error_message: `Le pack "${pack.name}" n'est pas disponible actuellement.`,
        };
      }

      // 2. Récupérer l'utilisateur et vérifier les conditions
      const user = await prisma.users.findUnique({
        where: { user_id: parseInt(userId.toString()) },
        select: {
          user_id: true,
          username: true,
          level: true,
          game_coins: true,
        },
      });

      if (!user) {
        return {
          success: false,
          error_code: 'PACK_NOT_FOUND',
          error_message: 'Utilisateur non trouvé.',
        };
      }

      // Vérifier le niveau requis
      if (pack.required_user_level && user.level < pack.required_user_level) {
        return {
          success: false,
          error_code: 'INSUFFICIENT_LEVEL',
          error_message: `Niveau ${pack.required_user_level} requis pour ouvrir ce pack. Votre niveau actuel: ${user.level}.`,
        };
      }

      const totalCost = pack.cost_amount * quantity;

      // Vérifier la devise pour tous les packs
      if (pack.cost_currency_type === 'game_coins' && user.game_coins < totalCost) {
        return {
          success: false,
          error_code: 'INSUFFICIENT_CURRENCY',
          error_message: `Coins insuffisants. Requis: ${totalCost}, disponible: ${user.game_coins}.`,
        };
      }

      // 3. Déduire la devise pour tous les packs
      if (pack.cost_currency_type === 'game_coins') {
        await prisma.users.update({
          where: { user_id: parseInt(userId.toString()) },
          data: { game_coins: user.game_coins - totalCost },
        });
      }

      // 4. Ouvrir tous les packs
      const allBoosters: IBoosterOpeningResult[] = [];

      for (let packIndex = 0; packIndex < quantity; packIndex++) {
        const boosterResult = await this.openSingleBooster(
          prisma,
          userId,
          packId,
          pack,
          packIndex + 1
        );

        if (!boosterResult.success) {
          // Si une erreur survient, on continue avec les autres packs
          this.logger.warn(`Erreur lors de l'ouverture du pack ${packIndex + 1}`);
          continue;
        }

        allBoosters.push(...boosterResult.boosters);
      }

      // 5. Récupérer les coins restants de l'utilisateur
      const updatedUser = await prisma.users.findUnique({
        where: { user_id: parseInt(userId.toString()) },
        select: { game_coins: true },
      });

      if (!updatedUser) {
        return {
          success: false,
          error_code: 'PACK_NOT_FOUND',
          error_message: 'Erreur lors de la récupération des données utilisateur.',
        };
      }

      this.logger.info('Packs multiples ouverts avec succès', {
        userId: userId.toString(),
        packId: packId.toString(),
        quantity: quantity.toString(),
        totalBoostersOpened: allBoosters.length.toString(),
      });

      return {
        success: true,
        total_packs_opened: quantity,
        all_boosters: allBoosters,
        remaining_currency: {
          game_coins: updatedUser.game_coins,
        },
        pack_info: {
          pack_id: pack.pack_id,
          name: pack.name,
          cost_amount: pack.cost_amount,
          cost_currency_type: pack.cost_currency_type,
        },
      };
    });
  }

  /**
   * Ouvre un pack pour un utilisateur avec transaction atomique
   */
  public async openPack(
    userId: number,
    packId: number
  ): Promise<IPackOpeningResult | IPackOpeningError> {
    this.logger.info("Tentative d'ouverture de pack", {
      userId: userId.toString(),
      packId: packId.toString(),
    });

    return await this.prisma.$transaction(async prisma => {
      // 1. Vérifier que le pack existe et est disponible
      const pack = await prisma.prank_packs.findUnique({
        where: { pack_id: packId },
      });

      if (!pack) {
        return {
          success: false,
          error_code: 'PACK_NOT_FOUND',
          error_message: `Le pack avec l'ID ${packId} n'existe pas.`,
        };
      }

      // Vérifier la disponibilité du pack
      const currentDate = new Date();
      const isAvailable =
        pack.is_available &&
        (!pack.available_from || pack.available_from <= currentDate) &&
        (!pack.available_until || pack.available_until >= currentDate);

      if (!isAvailable) {
        return {
          success: false,
          error_code: 'PACK_NOT_AVAILABLE',
          error_message: `Le pack "${pack.name}" n'est pas disponible actuellement.`,
        };
      }

      // 2. Récupérer l'utilisateur et vérifier les conditions
      const user = await prisma.users.findUnique({
        where: { user_id: parseInt(userId.toString()) },
        select: {
          user_id: true,
          username: true,
          level: true,
          game_coins: true,
        },
      });

      if (!user) {
        return {
          success: false,
          error_code: 'PACK_NOT_FOUND',
          error_message: 'Utilisateur non trouvé.',
        };
      }

      // Vérifier le niveau requis
      if (pack.required_user_level && user.level < pack.required_user_level) {
        return {
          success: false,
          error_code: 'INSUFFICIENT_LEVEL',
          error_message: `Niveau ${pack.required_user_level} requis pour ouvrir ce pack. Votre niveau actuel: ${user.level}.`,
        };
      }

      // Vérifier la devise
      if (pack.cost_currency_type === 'game_coins' && user.game_coins < pack.cost_amount) {
        return {
          success: false,
          error_code: 'INSUFFICIENT_CURRENCY',
          error_message: `Coins insuffisants. Requis: ${pack.cost_amount}, disponible: ${user.game_coins}.`,
        };
      }

      // 3. Déduire la devise
      if (pack.cost_currency_type === 'game_coins') {
        await prisma.users.update({
          where: { user_id: parseInt(userId.toString()) },
          data: { game_coins: user.game_coins - pack.cost_amount },
        });
      }

      // 4. Ouvrir le booster
      const boosterResult = await this.openSingleBooster(prisma, userId, packId, pack, 1);

      if (!boosterResult.success) {
        return boosterResult;
      }

      // 5. Récupérer les coins restants de l'utilisateur
      const updatedUser = await prisma.users.findUnique({
        where: { user_id: parseInt(userId.toString()) },
        select: { game_coins: true },
      });

      if (!updatedUser) {
        return {
          success: false,
          error_code: 'PACK_NOT_FOUND',
          error_message: 'Erreur lors de la récupération des données utilisateur.',
        };
      }

      return {
        success: true,
        boosters: boosterResult.boosters,
        remaining_currency: {
          game_coins: updatedUser.game_coins,
        },
        pack_info: {
          pack_id: pack.pack_id,
          name: pack.name,
          cost_amount: pack.cost_amount,
          cost_currency_type: pack.cost_currency_type,
        },
      };
    });
  }

  /**
   * Ouvre un booster individuel (logique d'ouverture)
   */
  private async openSingleBooster(
    prisma: any,
    userId: number,
    packId: number,
    pack: any,
    boosterNumber: number
  ): Promise<IPackOpeningResult | IPackOpeningError> {
    const awardedPranks: IAwardedPrank[] = [];
    const rarityProbabilities = pack.rarity_probabilities as PackRarityProbabilities;

    for (let i = 0; i < pack.number_of_pranks_awarded; i++) {
      // Déterminer quelle table de probabilités utiliser
      const isLastCard = i === pack.number_of_pranks_awarded - 1;
      const probTable =
        isLastCard && rarityProbabilities.last_card
          ? rarityProbabilities.last_card
          : rarityProbabilities.basic;

      // Déterminer la rareté en fonction des probabilités
      const rarity = this.selectRarityByProbability(probTable);

      // Sélectionner un prank actif de cette rareté depuis le pool du pack
      const availablePranks = await prisma.pranks.findMany({
        where: {
          rarity: rarity.toString() as prank_rarity_enum,
          is_active: true,
          pack_prank_pool: {
            some: {
              pack_id: packId,
            },
          },
        },
      });

      if (availablePranks.length === 0) {
        this.logger.error(
          `Aucun prank actif trouvé pour la rareté ${rarity} dans le pack ${packId}`
        );
        return {
          success: false,
          error_code: 'NO_ACTIVE_PRANKS',
          error_message: `Aucun prank actif disponible pour la rareté ${rarity} dans ce pack.`,
        };
      }

      // Sélectionner un prank aléatoire
      const selectedPrank = availablePranks[Math.floor(Math.random() * availablePranks.length)];

      // Vérifier si l'utilisateur possède déjà ce prank
      const existingUserPrank = await prisma.user_pranks.findUnique({
        where: {
          user_id_prank_id: {
            user_id: parseInt(userId.toString()),
            prank_id: selectedPrank.prank_id,
          },
        },
      });

      let isNew = false;
      if (existingUserPrank) {
        // Augmenter la quantité
        await prisma.user_pranks.update({
          where: {
            user_id_prank_id: {
              user_id: parseInt(userId.toString()),
              prank_id: selectedPrank.prank_id,
            },
          },
          data: { quantity: existingUserPrank.quantity + 1 },
        });
      } else {
        // Créer un nouveau prank pour l'utilisateur
        await prisma.user_pranks.create({
          data: {
            user_id: parseInt(userId.toString()),
            prank_id: selectedPrank.prank_id,
            quantity: 1,
          },
        });
        isNew = true;
      }

      // Enregistrer dans le log d'ouverture
      await prisma.pack_opening_log.create({
        data: {
          user_id: parseInt(userId.toString()),
          pack_id: packId,
          prank_id: selectedPrank.prank_id,
          rarity_awarded: rarity,
        },
      });

      // Ajouter aux pranks attribués
      awardedPranks.push({
        prank_id: selectedPrank.prank_id,
        name: selectedPrank.name,
        rarity: selectedPrank.rarity,
        description: selectedPrank.description,
        image_url: selectedPrank.image_url ?? undefined,
        quantity_awarded: 1,
        is_new: isNew,
      });
    }

    // Créer le résultat du booster
    const boosterResult: IBoosterOpeningResult = {
      booster_id: boosterNumber,
      booster_name: `${pack.name} - Booster ${boosterNumber}`,
      awarded_pranks: awardedPranks,
    };

    return {
      success: true,
      boosters: [boosterResult],
      remaining_currency: { game_coins: 0 }, // Sera mis à jour par la fonction appelante
      pack_info: {
        pack_id: pack.pack_id,
        name: pack.name,
        cost_amount: pack.cost_amount,
        cost_currency_type: pack.cost_currency_type,
      },
    };
  }

  /**
   * Sélectionne une rareté en fonction des probabilités définies
   */
  private selectRarityByProbability(probabilities: RarityProbabilities): prank_rarity_enum {
    const random = Math.random();
    let cumulative = 0;

    // Parcourir dans l'ordre : common, rare, extreme
    const entries: [string, number][] = [
      ['common', probabilities.common],
      ['rare', probabilities.rare],
      ['extreme', probabilities.extreme],
    ];

    for (const [rarity, probability] of entries) {
      cumulative += probability;
      if (random <= cumulative) {
        return rarity as prank_rarity_enum;
      }
    }

    // Fallback sur 'common' si les probabilités ne totalisent pas 1
    return prank_rarity_enum.common;
  }

  /**
   * Mappe un pack Prisma vers l'interface IPrankPack
   */
  private mapPrankPackToInterface(pack: any): IPrankPack {
    return {
      pack_id: pack.pack_id,
      name: pack.name,
      description: pack.description ?? undefined,
      image_url: pack.image_url ?? undefined,
      cost_currency_type: pack.cost_currency_type,
      cost_amount: pack.cost_amount,
      number_of_pranks_awarded: pack.number_of_pranks_awarded,
      rarity_probabilities: pack.rarity_probabilities as PackRarityProbabilities,
      is_available: pack.is_available ?? undefined,
      available_from: pack.available_from ?? undefined,
      available_until: pack.available_until ?? undefined,
      required_user_level: pack.required_user_level ?? undefined,
      created_at: pack.created_at ?? undefined,
      updated_at: pack.updated_at ?? undefined,
      pack_type: pack.pack_type as PackType,
    };
  }
}
