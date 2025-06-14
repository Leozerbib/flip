/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ShopService } from './shop.service';
import { PrankPackService } from './prank-pack.service';
import { LoggerService } from 'libs/logger/src';
import {
  IPrankPack,
  IPackOpeningResult,
  IPackOpeningError,
  IPacksByType,
  IMultiplePackOpeningResult,
  IPackAvailablePranks,
} from '@app/contracts/PrankPack/interfaces/prank-pack.interface';

/**
 * Contrôleur Shop (TCP uniquement)
 * Toutes les requêtes HTTP passent par l'API Gateway
 */
@Controller()
export class ShopController {
  constructor(
    private readonly shopService: ShopService,
    private readonly prankPackService: PrankPackService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext('Shop.controller');
  }

  // ==================== MICROSERVICE PATTERNS TCP ====================

  @MessagePattern({ cmd: 'get_available_prank_packs' })
  public async getAvailablePrankPacks(): Promise<IPrankPack[]> {
    this.logger.info('Récupération des packs de pranks disponibles (microservice)');
    return this.prankPackService.getAvailablePacks();
  }

  @MessagePattern({ cmd: 'get_available_prank_packs_grouped' })
  public async getAvailablePrankPacksGrouped(): Promise<IPacksByType> {
    this.logger.info('Récupération des packs de pranks groupés par type (microservice)');
    return this.prankPackService.getAvailablePacksGroupedByType();
  }

  @MessagePattern({ cmd: 'get_pack_available_pranks' })
  public async getPackAvailablePranks(
    @Payload() payload: { packId: number }
  ): Promise<IPackAvailablePranks | null> {
    this.logger.info('Récupération des pranks disponibles dans un pack (microservice)', {
      packId: payload.packId.toString(),
    });
    return this.prankPackService.getPackAvailablePranks(payload.packId);
  }

  @MessagePattern({ cmd: 'open_prank_pack' })
  public async openPrankPack(
    @Payload() payload: { userId: number; packId: number }
  ): Promise<IPackOpeningResult | IPackOpeningError> {
    this.logger.info('Ouverture de pack de pranks (microservice)', {
      userId: payload.userId.toString(),
      packId: payload.packId.toString(),
    });
    return this.prankPackService.openPack(payload.userId, payload.packId);
  }

  @MessagePattern({ cmd: 'open_multiple_prank_packs' })
  public async openMultiplePrankPacks(
    @Payload() payload: { userId: number; packId: number; quantity: number }
  ): Promise<IMultiplePackOpeningResult | IPackOpeningError> {
    this.logger.info('Ouverture de packs multiples de pranks (microservice)', {
      userId: payload.userId.toString(),
      packId: payload.packId.toString(),
      quantity: payload.quantity.toString(),
    });
    return this.prankPackService.openMultiplePacks(
      payload.userId,
      payload.packId,
      payload.quantity
    );
  }
}
