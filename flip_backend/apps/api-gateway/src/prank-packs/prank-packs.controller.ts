/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import {
  Controller,
  Get,
  Post,
  Param,
  Inject,
  HttpStatus,
  UseInterceptors,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import {
  PrankPackDto,
  PackOpeningResultDto,
  PackOpeningErrorDto,
  PacksByTypeDto,
  PackAvailablePranksDto,
  MultiplePackOpeningResultDto,
  OpenMultiplePacksDto,
} from '@app/contracts/PrankPack/dtos/prank-pack.dto';
import {
  IPrankPack,
  IPackOpeningResult,
  IPackOpeningError,
  IPacksByType,
  IPackAvailablePranks,
  IMultiplePackOpeningResult,
} from '@app/contracts/PrankPack/interfaces/prank-pack.interface';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ICurrentUser } from '@app/contracts/Auth/interfaces/auth.interface';
import { UserEnrichmentInterceptor } from '../auth/interceptors/user-enrichment.interceptor';
import { Log } from 'libs/logger/src';

/**
 * Contrôleur API Gateway pour la gestion des packs de pranks
 * Redirige les requêtes HTTP vers le microservice Shop via TCP
 */
@ApiTags('prank-packs')
@Controller('prank-packs')
@UseInterceptors(UserEnrichmentInterceptor)
export class PrankPacksController {
  constructor(@Inject('SHOP_SERVICE') private readonly shopClient: ClientProxy) {}

  // ==================== ENDPOINTS ====================

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Récupérer tous les packs de pranks disponibles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des packs disponibles',
    type: [PrankPackDto],
  })
  @Log('Récupération des packs de pranks disponibles', 'info')
  public async getAvailablePrankPacks(): Promise<IPrankPack[]> {
    return firstValueFrom(
      this.shopClient.send<IPrankPack[]>({ cmd: 'get_available_prank_packs' }, {})
    );
  }

  @Get('grouped')
  @Auth()
  @ApiOperation({ summary: 'Récupérer tous les packs de pranks groupés par type' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Packs groupés par type et ordonnés par niveau requis',
    type: PacksByTypeDto,
  })
  @Log('Récupération des packs de pranks groupés', 'info')
  public async getAvailablePrankPacksGrouped(): Promise<IPacksByType> {
    return firstValueFrom(
      this.shopClient.send<IPacksByType>({ cmd: 'get_available_prank_packs_grouped' }, {})
    );
  }

  @Get(':packId/pranks')
  @Auth()
  @ApiOperation({ summary: 'Récupérer les pranks disponibles dans un pack' })
  @ApiParam({ name: 'packId', description: 'ID du pack', type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pranks disponibles dans le pack groupés par rareté',
    type: PackAvailablePranksDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Pack non trouvé',
  })
  @Log('Récupération des pranks disponibles dans un pack', 'info')
  public async getPackAvailablePranks(
    @Param('packId', ParseIntPipe) packId: number
  ): Promise<IPackAvailablePranks | null> {
    return firstValueFrom(
      this.shopClient.send<IPackAvailablePranks | null>(
        { cmd: 'get_pack_available_pranks' },
        { packId }
      )
    );
  }

  @Post(':packId/open')
  @Auth()
  @ApiOperation({ summary: 'Ouvrir un pack de pranks' })
  @ApiParam({ name: 'packId', description: 'ID du pack à ouvrir', type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pack ouvert avec succès',
    type: PackOpeningResultDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Erreur lors de l'ouverture du pack",
    type: PackOpeningErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Pack non trouvé',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Conditions non remplies (niveau, devise, etc.)',
  })
  @Log('Ouverture de pack de pranks', 'info')
  public async openPrankPack(
    @Param('packId', ParseIntPipe) packId: number,
    @CurrentUser() currentUser: ICurrentUser
  ): Promise<IPackOpeningResult | IPackOpeningError> {
    return firstValueFrom(
      this.shopClient.send<IPackOpeningResult | IPackOpeningError>(
        { cmd: 'open_prank_pack' },
        { userId: currentUser.id, packId }
      )
    );
  }

  @Post(':packId/open-multiple')
  @Auth()
  @ApiOperation({ summary: "Ouvrir plusieurs packs de pranks d'un coup" })
  @ApiParam({ name: 'packId', description: 'ID du pack à ouvrir', type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Packs ouverts avec succès',
    type: MultiplePackOpeningResultDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Erreur lors de l'ouverture des packs",
    type: PackOpeningErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Pack non trouvé',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Conditions non remplies (niveau, devise, etc.)',
  })
  @Log('Ouverture de packs multiples de pranks', 'info')
  public async openMultiplePrankPacks(
    @Param('packId', ParseIntPipe) packId: number,
    @Body() openMultipleDto: OpenMultiplePacksDto,
    @CurrentUser() currentUser: ICurrentUser
  ): Promise<IMultiplePackOpeningResult | IPackOpeningError> {
    return firstValueFrom(
      this.shopClient.send<IMultiplePackOpeningResult | IPackOpeningError>(
        { cmd: 'open_multiple_prank_packs' },
        { userId: currentUser.id, packId, quantity: openMultipleDto.quantity }
      )
    );
  }
}
