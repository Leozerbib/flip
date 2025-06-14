import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserPranksService } from './user-pranks.service';
import { LoggerService } from '@app/logger';
import {
  UserPranksCollectionDto,
  UserPranksStatsDto,
  UserPrankFiltersDto,
  AddPrankToCollectionDto,
  AddPrankToCollectionResultDto,
  RemovePrankFromCollectionDto,
  RemovePrankFromCollectionResultDto,
} from '@app/contracts/User';

@Controller()
export class UserPranksController {
  constructor(
    private readonly userPranksService: UserPranksService,
    private readonly logger: LoggerService
  ) {}

  // ==================== HTTP ENDPOINTS ====================

  @MessagePattern({ cmd: 'get_user_pranks_collection' })
  public async getUserPranksCollection(
    @Payload() payload: { userId: number; filters: UserPrankFiltersDto }
  ): Promise<UserPranksCollectionDto> {
    this.logger.info('Récupération collection pranks utilisateur', {
      userId: payload.userId?.toString(),
      filters: JSON.stringify(payload.filters),
    });

    const collection = await this.userPranksService.getUserPranksCollection(
      parseInt(payload.userId.toString()),
      payload.filters
    );
    return collection;
  }

  @MessagePattern({ cmd: 'get_user_pranks_stats' })
  public async getUserPranksStats(
    @Payload() payload: { userId: number }
  ): Promise<UserPranksStatsDto> {
    this.logger.info('Récupération stats pranks utilisateur', {
      userId: payload.userId?.toString(),
    });

    return await this.userPranksService.getUserPranksStats(parseInt(payload.userId.toString()));
  }

  @MessagePattern({ cmd: 'add_prank_to_collection' })
  public async addPrankToCollection(
    @Payload() payload: { userId: number; addPrankDto: AddPrankToCollectionDto }
  ): Promise<AddPrankToCollectionResultDto> {
    this.logger.info('Ajout prank à collection utilisateur', {
      userId: payload.userId?.toString(),
      prankId: payload.addPrankDto?.prankId?.toString(),
      quantity: payload.addPrankDto?.quantity?.toString(),
    });

    return await this.userPranksService.addPrankToCollection(
      parseInt(payload.userId.toString()),
      parseInt(payload.addPrankDto.prankId.toString()),
      parseInt(payload.addPrankDto.quantity.toString())
    );
  }

  @MessagePattern({ cmd: 'remove_prank_from_collection' })
  public async removePrankFromCollection(
    @Payload() payload: { userId: number; removePrankDto: RemovePrankFromCollectionDto }
  ): Promise<RemovePrankFromCollectionResultDto> {
    this.logger.info('Retrait prank de collection utilisateur', {
      userId: payload.userId?.toString(),
      prankId: payload.removePrankDto?.prankId?.toString(),
      quantity: payload.removePrankDto?.quantity?.toString(),
    });

    return await this.userPranksService.removePrankFromCollection(
      parseInt(payload.userId.toString()),
      parseInt(payload.removePrankDto.prankId.toString()),
      parseInt(payload.removePrankDto.quantity.toString())
    );
  }
}
