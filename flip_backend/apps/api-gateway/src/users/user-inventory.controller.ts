import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Inject,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import {
  UserPackInventoryDto,
  UserPackInventoryStatsDto,
  AddPackToInventoryDto,
  AddPackToInventoryResultDto,
  RemovePackFromInventoryDto,
  RemovePackFromInventoryResultDto,
  IAddPackToInventoryResult,
  IRemovePackFromInventoryResult,
  IUserPackInventory,
  IUserPackInventoryStats,
} from '@app/contracts/User';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ICurrentUser } from '@app/contracts/Auth/interfaces/auth.interface';
import { UserEnrichmentInterceptor } from '../auth/interceptors/user-enrichment.interceptor';
import { Log } from '@app/logger';

/**
 * Contrôleur API Gateway pour la gestion de l'inventaire utilisateur
 * Redirige les requêtes HTTP vers le microservice User via TCP
 */
@ApiTags('User Inventory')
@Controller('users/:userId/inventory')
@UseInterceptors(UserEnrichmentInterceptor)
export class UserInventoryController {
  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: "Récupère l'inventaire complet d'un utilisateur" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inventaire récupéré avec succès',
    type: UserPackInventoryDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Non autorisé' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erreur serveur' })
  @Log('Récupération inventaire utilisateur', 'info')
  public async getUserInventory(
    @CurrentUser() currentUser: ICurrentUser
  ): Promise<IUserPackInventory> {
    return firstValueFrom(
      this.userClient.send<IUserPackInventory>(
        { cmd: 'get_user_inventory' },
        { userId: currentUser.id }
      )
    );
  }

  @Get('stats')
  @Auth()
  @ApiOperation({
    summary: "Récupère les statistiques d'inventaire d'un utilisateur",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Statistiques récupérées avec succès',
    type: UserPackInventoryStatsDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Non autorisé' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erreur serveur' })
  @Log('Récupération stats inventaire utilisateur', 'info')
  public async getUserInventoryStats(
    @CurrentUser() currentUser: ICurrentUser
  ): Promise<IUserPackInventoryStats> {
    return firstValueFrom(
      this.userClient.send<IUserPackInventoryStats>(
        { cmd: 'get_user_inventory_stats' },
        { userId: currentUser.id }
      )
    );
  }

  @Post('add')
  @Auth()
  @ApiOperation({ summary: "Ajoute des packs à l'inventaire d'un utilisateur" })
  @ApiBody({ type: AddPackToInventoryDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pack ajouté avec succès',
    type: AddPackToInventoryResultDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Non autorisé' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur ou pack non trouvé' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erreur serveur' })
  @Log('Ajout pack à inventaire utilisateur', 'info')
  public async addPackToInventory(
    @Body() addPackDto: AddPackToInventoryDto,
    @CurrentUser() currentUser: ICurrentUser
  ): Promise<IAddPackToInventoryResult> {
    return firstValueFrom(
      this.userClient.send<IAddPackToInventoryResult>(
        { cmd: 'add_pack_to_inventory' },
        {
          userId: currentUser.id,
          addPackDto,
        }
      )
    );
  }

  @Delete('remove')
  @Auth()
  @ApiOperation({
    summary: "Retire des packs de l'inventaire d'un utilisateur",
  })
  @ApiBody({ type: RemovePackFromInventoryDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pack retiré avec succès',
    type: RemovePackFromInventoryResultDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Non autorisé' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erreur serveur' })
  @Log('Retrait pack de inventaire utilisateur', 'info')
  public async removePackFromInventory(
    @Body() removePackDto: RemovePackFromInventoryDto,
    @CurrentUser() currentUser: ICurrentUser
  ): Promise<IRemovePackFromInventoryResult> {
    return firstValueFrom(
      this.userClient.send<IRemovePackFromInventoryResult>(
        { cmd: 'remove_pack_from_inventory' },
        {
          userId: currentUser.id,
          removePackDto,
        }
      )
    );
  }
}
