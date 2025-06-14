import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserInventoryService } from './user-inventory.service';
import { LoggerService } from '@app/logger';
import {
  UserPackInventoryDto,
  UserPackInventoryStatsDto,
  AddPackToInventoryDto,
  AddPackToInventoryResultDto,
  RemovePackFromInventoryDto,
  RemovePackFromInventoryResultDto,
} from '@app/contracts/User';

@Controller()
export class UserInventoryController {
  constructor(
    private readonly userInventoryService: UserInventoryService,
    private readonly logger: LoggerService
  ) {}

  // ==================== HTTP ENDPOINTS ====================

  @MessagePattern({ cmd: 'get_user_inventory' })
  public async getUserInventory(
    @Payload() payload: { userId: number }
  ): Promise<UserPackInventoryDto> {
    this.logger.info('Récupération inventaire utilisateur', {
      endpoint: 'GET /users/:userId/inventory',
    });

    const inventory = await this.userInventoryService.getUserInventory(
      parseInt(payload.userId.toString())
    );

    // Mapper vers DTO
    const result: UserPackInventoryDto = {
      totalPacks: inventory.totalPacks,
      packsByType: inventory.packsByType,
      allPacks: inventory.allPacks.map(item => ({
        userPackInventoryId: item.userPackInventoryId,
        userId: item.userId,
        packId: item.packId,
        quantity: item.quantity,
        acquiredAt: item.acquiredAt,
        pack: {
          packId: item.pack.packId,
          name: item.pack.name,
          description: item.pack.description,
          imageUrl: item.pack.imageUrl,
          costCurrencyType: item.pack.costCurrencyType,
          costAmount: item.pack.costAmount,
          numberOfPranksAwarded: item.pack.numberOfPranksAwarded,
          packType: item.pack.packType,
          isAvailable: item.pack.isAvailable,
          requiredUserLevel: item.pack.requiredUserLevel,
        },
      })),
    };

    this.logger.info('Inventaire retourné avec succès', {
      userId: payload.userId?.toString(),
      totalPacks: result.totalPacks,
    });

    return result;
  }

  @MessagePattern({ cmd: 'get_user_inventory_stats' })
  public async getUserInventoryStats(
    @Payload() payload: { userId: number }
  ): Promise<UserPackInventoryStatsDto> {
    this.logger.info('Récupération stats inventaire utilisateur', {
      userId: payload.userId?.toString(),
      endpoint: 'GET /users/:userId/inventory/stats',
    });

    const stats = await this.userInventoryService.getUserInventoryStats(
      parseInt(payload.userId.toString())
    );

    const result: UserPackInventoryStatsDto = {
      totalPacks: stats.totalPacks,
      totalValue: stats.totalValue,
      packsByType: stats.packsByType,
    };

    this.logger.info('Stats inventaire retournées avec succès', {
      userId: payload.userId?.toString(),
      totalPacks: result.totalPacks,
      totalValue: result.totalValue,
    });

    return result;
  }

  @MessagePattern({ cmd: 'add_pack_to_inventory' })
  public async addPackToInventory(
    @Payload() payload: { userId: number; addPackDto: AddPackToInventoryDto }
  ): Promise<AddPackToInventoryResultDto> {
    this.logger.info('Ajout pack à inventaire utilisateur', {
      userId: payload.userId?.toString(),
      packId: payload.addPackDto?.packId?.toString(),
      quantity: payload.addPackDto?.quantity?.toString(),
      endpoint: 'POST /users/:userId/inventory/add',
    });

    const result = await this.userInventoryService.addPackToInventory(
      parseInt(payload.userId.toString()),
      parseInt(payload.addPackDto.packId.toString()),
      parseInt(payload.addPackDto.quantity.toString())
    );

    // Mapper vers DTO
    const response: AddPackToInventoryResultDto = {
      success: result.success,
      item: result.item
        ? {
            userPackInventoryId: result.item.userPackInventoryId,
            userId: result.item.userId,
            packId: result.item.packId,
            quantity: result.item.quantity,
            acquiredAt: result.item.acquiredAt,
            pack: {
              packId: result.item.pack.packId,
              name: result.item.pack.name,
              description: result.item.pack.description,
              imageUrl: result.item.pack.imageUrl,
              costCurrencyType: result.item.pack.costCurrencyType,
              costAmount: result.item.pack.costAmount,
              numberOfPranksAwarded: result.item.pack.numberOfPranksAwarded,
              packType: result.item.pack.packType,
              isAvailable: result.item.pack.isAvailable,
              requiredUserLevel: result.item.pack.requiredUserLevel,
            },
          }
        : undefined,
      error: result.error,
    };

    this.logger.info('Résultat ajout pack', {
      userId: payload.userId?.toString(),
      success: result.success,
      error: result.error,
    });

    return response;
  }

  @MessagePattern({ cmd: 'remove_pack_from_inventory' })
  public async removePackFromInventory(
    @Payload() payload: { userId: number; removePackDto: RemovePackFromInventoryDto }
  ): Promise<RemovePackFromInventoryResultDto> {
    this.logger.info('Retrait pack de inventaire utilisateur', {
      userId: payload.userId?.toString(),
      packId: payload.removePackDto?.packId?.toString(),
      quantity: payload.removePackDto?.quantity?.toString(),
      endpoint: 'DELETE /users/:userId/inventory/remove',
    });

    const result = await this.userInventoryService.removePackFromInventory(
      parseInt(payload.userId.toString()),
      parseInt(payload.removePackDto.packId.toString()),
      parseInt(payload.removePackDto.quantity.toString())
    );

    const response: RemovePackFromInventoryResultDto = {
      success: result.success,
      remainingQuantity: result.remainingQuantity,
      error: result.error,
    };

    this.logger.info('Résultat retrait pack', {
      userId: payload.userId?.toString(),
      success: result.success,
      remainingQuantity: result.remainingQuantity,
      error: result.error,
    });

    return response;
  }
}
