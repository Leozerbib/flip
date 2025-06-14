import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Inject,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import {
  UserPranksCollectionDto,
  UserPranksStatsDto,
  UserPrankFiltersDto,
  AddPrankToCollectionDto,
  AddPrankToCollectionResultDto,
  RemovePrankFromCollectionDto,
  RemovePrankFromCollectionResultDto,
  IAddPrankToCollectionResult,
  IRemovePrankFromCollectionResult,
  IUserPranksCollection,
  IUserPranksStats,
} from '@app/contracts/User';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ICurrentUser } from '@app/contracts/Auth/interfaces/auth.interface';
import { UserEnrichmentInterceptor } from '../auth/interceptors/user-enrichment.interceptor';
import { Log } from '@app/logger';

/**
 * Contrôleur API Gateway pour la gestion de la collection de pranks utilisateur
 * Redirige les requêtes HTTP vers le microservice User via TCP
 */
@ApiTags('User Pranks')
@Controller('users/:userId/pranks')
@UseInterceptors(UserEnrichmentInterceptor)
export class UserPranksController {
  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: "Récupère la collection de pranks d'un utilisateur" })
  @ApiQuery({ name: 'rarity', required: false, description: 'Filtrer par rareté', isArray: true })
  @ApiQuery({ name: 'type', required: false, description: 'Filtrer par type', isArray: true })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Trier par champ' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Ordre de tri (asc/desc)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Limite de résultats', type: 'number' })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Décalage pour pagination',
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Collection récupérée avec succès',
    type: UserPranksCollectionDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Non autorisé' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erreur serveur' })
  @Log('Récupération collection pranks utilisateur', 'info')
  public async getUserPranksCollection(
    @Query() filters: UserPrankFiltersDto,
    @CurrentUser() currentUser: ICurrentUser
  ): Promise<IUserPranksCollection> {
    return firstValueFrom(
      this.userClient.send<IUserPranksCollection>(
        { cmd: 'get_user_pranks_collection' },
        {
          userId: currentUser.id,
          filters,
        }
      )
    );
  }

  @Get('stats')
  @Auth()
  @ApiOperation({
    summary: "Récupère les statistiques de collection de pranks d'un utilisateur",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Statistiques récupérées avec succès',
    type: UserPranksStatsDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Non autorisé' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erreur serveur' })
  @Log('Récupération stats pranks utilisateur', 'info')
  public async getUserPranksStats(
    @CurrentUser() currentUser: ICurrentUser
  ): Promise<IUserPranksStats> {
    return firstValueFrom(
      this.userClient.send<IUserPranksStats>(
        { cmd: 'get_user_pranks_stats' },
        {
          userId: currentUser.id,
        }
      )
    );
  }

  @Post('add')
  @Auth()
  @ApiOperation({ summary: "Ajoute des pranks à la collection d'un utilisateur" })
  @ApiBody({ type: AddPrankToCollectionDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Prank ajouté avec succès',
    type: AddPrankToCollectionResultDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Non autorisé' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur ou prank non trouvé' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erreur serveur' })
  @Log('Ajout prank à collection utilisateur', 'info')
  public async addPrankToCollection(
    @Body() addPrankDto: AddPrankToCollectionDto,
    @CurrentUser() currentUser: ICurrentUser
  ): Promise<IAddPrankToCollectionResult> {
    return firstValueFrom(
      this.userClient.send<IAddPrankToCollectionResult>(
        { cmd: 'add_prank_to_collection' },
        {
          userId: currentUser.id,
          addPrankDto,
        }
      )
    );
  }

  @Delete('remove')
  @Auth()
  @ApiOperation({
    summary: "Retire des pranks de la collection d'un utilisateur",
  })
  @ApiBody({ type: RemovePrankFromCollectionDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Prank retiré avec succès',
    type: RemovePrankFromCollectionResultDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Non autorisé' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erreur serveur' })
  @Log('Retrait prank de collection utilisateur', 'info')
  public async removePrankFromCollection(
    @Body() removePrankDto: RemovePrankFromCollectionDto,
    @CurrentUser() currentUser: ICurrentUser
  ): Promise<IRemovePrankFromCollectionResult> {
    return firstValueFrom(
      this.userClient.send<IRemovePrankFromCollectionResult>(
        { cmd: 'remove_prank_from_collection' },
        {
          userId: currentUser.id,
          removePrankDto,
        }
      )
    );
  }
}
