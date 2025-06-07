import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LoggerService } from 'libs/logger/src';
import { ExceptionThrower } from '@app/exceptions';
import { catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {
  CreateFriendshipDto,
  BlockUserDto,
  UnblockUserDto,
  AcceptFriendshipDto,
  DeclineFriendshipDto,
  FriendshipResponseDto,
  FriendDto,
  FriendshipRequestDto,
  FriendshipStatsDto,
} from '@app/contracts/Friendship/dtos/friendship.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ICurrentUser } from '@app/contracts/Auth/interfaces/auth.interface';

@ApiTags('Friendships')
@ApiBearerAuth()
@Controller('friendships')
@UseGuards(JwtAuthGuard)
export class FriendshipsController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly logger: LoggerService,
    private readonly exceptionThrower: ExceptionThrower
  ) {
    this.logger.setContext('FRIENDSHIPS.controller');
  }

  // ==================== FRIENDSHIP REQUESTS ====================

  @Post('request')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Envoyer une demande d'amitié" })
  @ApiResponse({
    status: 201,
    description: "Demande d'amitié envoyée avec succès",
    type: FriendshipResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 409, description: 'Relation existante' })
  public async sendFriendshipRequest(
    @CurrentUser() user: ICurrentUser,
    @Body(ValidationPipe) createFriendshipDto: CreateFriendshipDto
  ) {
    this.logger.info('Envoi demande amitié', {
      userId: user.id,
      targetId: createFriendshipDto.user_two_id,
    });

    try {
      const result = await this.userService
        .send({ cmd: 'create_friendship_request' }, { userId: user.id, createFriendshipDto })
        .pipe(
          timeout(5000),
          catchError(error => {
            this.logger.error('Erreur envoi demande amitié', error.message);
            return this.handleMicroserviceError(error);
          })
        )
        .toPromise();

      this.logger.info('Demande amitié envoyée avec succès', {
        userId: user.id,
        friendshipId: result.friendship_id,
      });

      return result;
    } catch (error: any) {
      this.logger.error("Erreur lors de l'envoi de la demande", error.message);
      throw error;
    }
  }

  @Post('accept')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Accepter une demande d'amitié" })
  @ApiResponse({
    status: 200,
    description: "Demande d'amitié acceptée avec succès",
    type: FriendshipResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Demande non trouvée' })
  @ApiResponse({ status: 403, description: 'Non autorisé' })
  public async acceptFriendshipRequest(
    @CurrentUser() user: ICurrentUser,
    @Body(ValidationPipe) acceptFriendshipDto: AcceptFriendshipDto
  ) {
    this.logger.info('Acceptation demande amitié', {
      userId: user.id,
      friendshipId: acceptFriendshipDto.friendship_id,
    });

    try {
      const result = await this.userService
        .send({ cmd: 'accept_friendship_request' }, { userId: user.id, acceptFriendshipDto })
        .pipe(
          timeout(5000),
          catchError(error => {
            this.logger.error('Erreur acceptation demande', error.message);
            return this.handleMicroserviceError(error);
          })
        )
        .toPromise();

      this.logger.info('Demande acceptée avec succès', {
        userId: user.id,
        friendshipId: acceptFriendshipDto.friendship_id,
      });

      return result;
    } catch (error: any) {
      this.logger.error("Erreur lors de l'acceptation", error.message);
      throw error;
    }
  }

  @Post('decline')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Refuser une demande d'amitié" })
  @ApiResponse({ status: 200, description: 'Demande refusée avec succès' })
  @ApiResponse({ status: 404, description: 'Demande non trouvée' })
  @ApiResponse({ status: 403, description: 'Non autorisé' })
  public async declineFriendshipRequest(
    @CurrentUser() user: ICurrentUser,
    @Body(ValidationPipe) declineFriendshipDto: DeclineFriendshipDto
  ) {
    this.logger.info('Refus demande amitié', {
      userId: user.id,
      friendshipId: declineFriendshipDto.friendship_id,
    });

    try {
      const result = await this.userService
        .send({ cmd: 'decline_friendship_request' }, { userId: user.id, declineFriendshipDto })
        .pipe(
          timeout(5000),
          catchError(error => {
            this.logger.error('Erreur refus demande', error.message);
            return this.handleMicroserviceError(error);
          })
        )
        .toPromise();

      this.logger.info('Demande refusée avec succès', {
        userId: user.id,
        friendshipId: declineFriendshipDto.friendship_id,
      });

      return result;
    } catch (error: any) {
      this.logger.error('Erreur lors du refus', error.message);
      throw error;
    }
  }

  // ==================== FRIEND MANAGEMENT ====================

  @Get('friends')
  @ApiOperation({ summary: 'Obtenir la liste des amis' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiResponse({
    status: 200,
    description: 'Liste des amis récupérée avec succès',
    type: [FriendDto],
  })
  public async getUserFriends(
    @CurrentUser() user: ICurrentUser,
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 20
  ) {
    this.logger.info('Récupération amis utilisateur', {
      userId: user.id,
      page,
      limit,
    });

    try {
      const result = await this.userService
        .send({ cmd: 'get_user_friends' }, { userId: user.id, page, limit })
        .pipe(
          timeout(5000),
          catchError(error => {
            this.logger.error('Erreur récupération amis', error.message);
            return this.handleMicroserviceError(error);
          })
        )
        .toPromise();

      this.logger.info('Amis récupérés avec succès', {
        userId: user.id,
        friendsCount: result.length,
      });

      return result;
    } catch (error: any) {
      this.logger.error('Erreur lors de la récupération des amis', error.message);
      throw error;
    }
  }

  @Delete('friends/:friendId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Supprimer un ami' })
  @ApiParam({ name: 'friendId', type: Number, description: "ID de l'ami à supprimer" })
  @ApiResponse({ status: 200, description: 'Ami supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Amitié non trouvée' })
  public async removeFriend(
    @CurrentUser() user: ICurrentUser,
    @Param('friendId', ParseIntPipe) friendId: number
  ) {
    this.logger.info('Suppression ami', {
      userId: user.id,
      friendId,
    });

    try {
      const result = await this.userService
        .send({ cmd: 'remove_friend' }, { userId: user.id, friendId })
        .pipe(
          timeout(5000),
          catchError(error => {
            this.logger.error('Erreur suppression ami', error.message);
            return this.handleMicroserviceError(error);
          })
        )
        .toPromise();

      this.logger.info('Ami supprimé avec succès', {
        userId: user.id,
        friendId,
      });

      return result;
    } catch (error: any) {
      this.logger.error("Erreur lors de la suppression de l'ami", error.message);
      throw error;
    }
  }

  // ==================== FRIENDSHIP REQUESTS LISTS ====================

  @Get('requests/received')
  @ApiOperation({ summary: "Obtenir les demandes d'amitié reçues" })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiResponse({
    status: 200,
    description: 'Demandes reçues récupérées avec succès',
    type: [FriendshipRequestDto],
  })
  public async getReceivedFriendshipRequests(
    @CurrentUser() user: ICurrentUser,
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 20
  ) {
    this.logger.info('Récupération demandes reçues', {
      userId: user.id,
      page,
      limit,
    });

    try {
      const result = await this.userService
        .send({ cmd: 'get_received_friendship_requests' }, { userId: user.id, page, limit })
        .pipe(
          timeout(5000),
          catchError(error => {
            this.logger.error('Erreur récupération demandes reçues', error.message);
            return this.handleMicroserviceError(error);
          })
        )
        .toPromise();

      this.logger.info('Demandes reçues récupérées avec succès', {
        userId: user.id,
        requestsCount: result.length,
      });

      return result;
    } catch (error: any) {
      this.logger.error('Erreur lors de la récupération des demandes reçues', error.message);
      throw error;
    }
  }

  @Get('requests/sent')
  @ApiOperation({ summary: "Obtenir les demandes d'amitié envoyées" })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiResponse({
    status: 200,
    description: 'Demandes envoyées récupérées avec succès',
    type: [FriendshipRequestDto],
  })
  public async getSentFriendshipRequests(
    @CurrentUser() user: ICurrentUser,
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 20
  ) {
    this.logger.info('Récupération demandes envoyées', {
      userId: user.id,
      page,
      limit,
    });

    try {
      const result = await this.userService
        .send({ cmd: 'get_sent_friendship_requests' }, { userId: user.id, page, limit })
        .pipe(
          timeout(5000),
          catchError(error => {
            this.logger.error('Erreur récupération demandes envoyées', error.message);
            return this.handleMicroserviceError(error);
          })
        )
        .toPromise();

      this.logger.info('Demandes envoyées récupérées avec succès', {
        userId: user.id,
        requestsCount: result.length,
      });

      return result;
    } catch (error: any) {
      this.logger.error('Erreur lors de la récupération des demandes envoyées', error.message);
      throw error;
    }
  }

  // ==================== BLOCKING OPERATIONS ====================

  @Post('block')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Bloquer un utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur bloqué avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  public async blockUser(
    @CurrentUser() user: ICurrentUser,
    @Body(ValidationPipe) blockUserDto: BlockUserDto
  ) {
    this.logger.info('Blocage utilisateur', {
      userId: user.id,
      targetId: blockUserDto.user_id,
    });

    try {
      const result = await this.userService
        .send({ cmd: 'block_user' }, { userId: user.id, blockUserDto })
        .pipe(
          timeout(5000),
          catchError(error => {
            this.logger.error('Erreur blocage utilisateur', error.message);
            return this.handleMicroserviceError(error);
          })
        )
        .toPromise();

      this.logger.info('Utilisateur bloqué avec succès', {
        userId: user.id,
        targetId: blockUserDto.user_id,
      });

      return result;
    } catch (error: any) {
      this.logger.error('Erreur lors du blocage', error.message);
      throw error;
    }
  }

  @Post('unblock')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Débloquer un utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur débloqué avec succès' })
  @ApiResponse({ status: 404, description: 'Relation non trouvée' })
  public async unblockUser(
    @CurrentUser() user: ICurrentUser,
    @Body(ValidationPipe) unblockUserDto: UnblockUserDto
  ) {
    this.logger.info('Déblocage utilisateur', {
      userId: user.id,
      targetId: unblockUserDto.user_id,
    });

    try {
      const result = await this.userService
        .send({ cmd: 'unblock_user' }, { userId: user.id, unblockUserDto })
        .pipe(
          timeout(5000),
          catchError(error => {
            this.logger.error('Erreur déblocage utilisateur', error.message);
            return this.handleMicroserviceError(error);
          })
        )
        .toPromise();

      this.logger.info('Utilisateur débloqué avec succès', {
        userId: user.id,
        targetId: unblockUserDto.user_id,
      });

      return result;
    } catch (error: any) {
      this.logger.error('Erreur lors du déblocage', error.message);
      throw error;
    }
  }

  // ==================== STATISTICS AND UTILITIES ====================

  @Get('stats')
  @ApiOperation({ summary: "Obtenir les statistiques d'amitié" })
  @ApiResponse({
    status: 200,
    description: 'Statistiques récupérées avec succès',
    type: FriendshipStatsDto,
  })
  public async getFriendshipStats(@CurrentUser() user: ICurrentUser) {
    this.logger.info('Récupération stats amitié', {
      userId: user.id,
    });

    try {
      const result = await this.userService
        .send({ cmd: 'get_friendship_stats' }, user.id)
        .pipe(
          timeout(5000),
          catchError(error => {
            this.logger.error('Erreur récupération stats', error.message);
            return this.handleMicroserviceError(error);
          })
        )
        .toPromise();

      this.logger.info('Stats récupérées avec succès', {
        userId: user.id,
        totalFriends: result.total_friends,
      });

      return result;
    } catch (error: any) {
      this.logger.error('Erreur lors de la récupération des stats', error.message);
      throw error;
    }
  }

  @Get('mutual/:otherUserId')
  @ApiOperation({ summary: 'Obtenir les amis en commun avec un utilisateur' })
  @ApiParam({ name: 'otherUserId', type: Number, description: "ID de l'autre utilisateur" })
  @ApiResponse({
    status: 200,
    description: 'Amis en commun récupérés avec succès',
    type: [FriendDto],
  })
  public async getMutualFriends(
    @CurrentUser() user: ICurrentUser,
    @Param('otherUserId', ParseIntPipe) otherUserId: number
  ) {
    this.logger.info('Récupération amis en commun', {
      userId: user.id,
      otherUserId,
    });

    try {
      const result = await this.userService
        .send({ cmd: 'get_mutual_friends' }, { userId: user.id, otherUserId })
        .pipe(
          timeout(5000),
          catchError(error => {
            this.logger.error('Erreur récupération amis en commun', error.message);
            return this.handleMicroserviceError(error);
          })
        )
        .toPromise();

      this.logger.info('Amis en commun récupérés avec succès', {
        userId: user.id,
        otherUserId,
        mutualCount: result.length,
      });

      return result;
    } catch (error: any) {
      this.logger.error('Erreur lors de la récupération des amis en commun', error.message);
      throw error;
    }
  }

  @Get('suggestions')
  @ApiOperation({ summary: "Obtenir des suggestions d'amitié" })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Suggestions récupérées avec succès',
    type: [FriendDto],
  })
  public async getFriendshipSuggestions(
    @CurrentUser() user: ICurrentUser,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10
  ) {
    this.logger.info('Récupération suggestions amitié', {
      userId: user.id,
      limit,
    });

    try {
      const result = await this.userService
        .send({ cmd: 'get_friendship_suggestions' }, { userId: user.id, limit })
        .pipe(
          timeout(5000),
          catchError(error => {
            this.logger.error('Erreur récupération suggestions', error.message);
            return this.handleMicroserviceError(error);
          })
        )
        .toPromise();

      this.logger.info('Suggestions récupérées avec succès', {
        userId: user.id,
        suggestionsCount: result.length,
      });

      return result;
    } catch (error: any) {
      this.logger.error('Erreur lors de la récupération des suggestions', error.message);
      throw error;
    }
  }

  @Get('status/:otherUserId')
  @ApiOperation({ summary: "Vérifier le statut d'amitié avec un utilisateur" })
  @ApiParam({ name: 'otherUserId', type: Number, description: "ID de l'autre utilisateur" })
  @ApiResponse({
    status: 200,
    description: 'Statut récupéré avec succès',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          nullable: true,
          enum: ['pending', 'accepted', 'declined', 'blocked'],
        },
        friendship_id: { type: 'number' },
      },
    },
  })
  public async getFriendshipStatus(
    @CurrentUser() user: ICurrentUser,
    @Param('otherUserId', ParseIntPipe) otherUserId: number
  ) {
    this.logger.info('Vérification statut amitié', {
      userId: user.id,
      otherUserId,
    });

    try {
      const result = await this.userService
        .send({ cmd: 'get_friendship_status' }, { userId: user.id, otherUserId })
        .pipe(
          timeout(5000),
          catchError(error => {
            this.logger.error('Erreur vérification statut', error.message);
            return this.handleMicroserviceError(error);
          })
        )
        .toPromise();

      this.logger.info('Statut vérifié avec succès', {
        userId: user.id,
        otherUserId,
        status: result.status,
      });

      return result;
    } catch (error: any) {
      this.logger.error('Erreur lors de la vérification du statut', error.message);
      throw error;
    }
  }

  // ==================== ERROR HANDLING ====================

  private handleMicroserviceError(error: any) {
    if (error.code === 'ECONNREFUSED') {
      this.exceptionThrower.throwMicroserviceConnection('user-service', {
        originalError: error.message,
      });
    }

    if (error.response) {
      // L'erreur vient du microservice
      const { message, statusCode } = error.response;

      switch (statusCode) {
        case 400:
          this.exceptionThrower.throwValidation(message, [
            {
              field: 'unknown',
              value: null,
              constraints: [message],
            },
          ]);
          break;
        case 404:
          this.exceptionThrower.throwRecordNotFound(message);
          break;
        case 409:
          this.exceptionThrower.throwBusinessRule(message, 'FRIENDSHIP_CONFLICT');
          break;
        case 403:
          this.exceptionThrower.throwForbidden(message);
          break;
        default:
          this.exceptionThrower.throwInternalError(message);
      }
    }

    return throwError(error);
  }
}
