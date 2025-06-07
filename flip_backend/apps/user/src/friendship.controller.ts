import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FriendshipService } from './friendship.service';
import { LoggerService } from 'libs/logger/src';
import { ExceptionThrower } from '@app/exceptions';
import {
  CreateFriendshipDto,
  BlockUserDto,
  UnblockUserDto,
  AcceptFriendshipDto,
  DeclineFriendshipDto,
} from '@app/contracts/Friendship/dtos/friendship.dto';
import {
  IFriendship,
  IFriend,
  IFriendshipRequest,
  IFriendshipStats,
} from '@app/contracts/Friendship/interfaces/friendship.interface';
import { FriendshipStatusEnum } from '@app/contracts/types/common.types';

/**
 * Contrôleur Friendship (TCP uniquement)
 * Toutes les requêtes HTTP passent par l'API Gateway
 */
@Controller()
export class FriendshipController {
  constructor(
    private readonly friendshipService: FriendshipService,
    private readonly logger: LoggerService,
    private readonly exceptionThrower: ExceptionThrower
  ) {
    this.logger.setContext('Friendship.controller');
  }

  // ==================== FRIENDSHIP MANAGEMENT ====================

  @MessagePattern({ cmd: 'create_friendship_request' })
  public async createFriendshipRequest(
    @Payload() payload: { userId: number; createFriendshipDto: CreateFriendshipDto }
  ): Promise<IFriendship> {
    this.logger.info('Création demande amitié (microservice)', {
      userId: payload.userId.toString(),
      targetId: payload.createFriendshipDto.user_two_id,
    });

    try {
      return await this.friendshipService.createFriendshipRequest(
        payload.userId,
        payload.createFriendshipDto
      );
    } catch (error: any) {
      this.logger.error('Erreur création demande amitié (microservice)', error.message);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'accept_friendship_request' })
  public async acceptFriendshipRequest(
    @Payload() payload: { userId: number; acceptFriendshipDto: AcceptFriendshipDto }
  ): Promise<IFriendship> {
    this.logger.info('Acceptation demande amitié (microservice)', {
      userId: payload.userId.toString(),
      friendshipId: payload.acceptFriendshipDto.friendship_id,
    });

    try {
      return await this.friendshipService.acceptFriendshipRequest(
        payload.userId,
        payload.acceptFriendshipDto
      );
    } catch (error: any) {
      this.logger.error('Erreur acceptation demande amitié (microservice)', error.message);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'decline_friendship_request' })
  public async declineFriendshipRequest(
    @Payload() payload: { userId: number; declineFriendshipDto: DeclineFriendshipDto }
  ): Promise<{ message: string }> {
    this.logger.info('Refus demande amitié (microservice)', {
      userId: payload.userId.toString(),
      friendshipId: payload.declineFriendshipDto.friendship_id,
    });

    try {
      return await this.friendshipService.declineFriendshipRequest(
        payload.userId,
        payload.declineFriendshipDto
      );
    } catch (error: any) {
      this.logger.error('Erreur refus demande amitié (microservice)', error.message);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'remove_friend' })
  public async removeFriend(
    @Payload() payload: { userId: number; friendId: number }
  ): Promise<{ message: string }> {
    this.logger.info('Suppression ami (microservice)', {
      userId: payload.userId.toString(),
      friendId: payload.friendId,
    });

    try {
      return await this.friendshipService.removeFriend(payload.userId, payload.friendId);
    } catch (error: any) {
      this.logger.error('Erreur suppression ami (microservice)', error.message);
      throw error;
    }
  }

  // ==================== BLOCKING OPERATIONS ====================

  @MessagePattern({ cmd: 'block_user' })
  public async blockUser(
    @Payload() payload: { userId: number; blockUserDto: BlockUserDto }
  ): Promise<IFriendship> {
    this.logger.info('Blocage utilisateur (microservice)', {
      userId: payload.userId.toString(),
      targetId: payload.blockUserDto.user_id,
    });

    try {
      return await this.friendshipService.blockUser(payload.userId, payload.blockUserDto);
    } catch (error: any) {
      this.logger.error('Erreur blocage utilisateur (microservice)', error.message);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'unblock_user' })
  public async unblockUser(
    @Payload() payload: { userId: number; unblockUserDto: UnblockUserDto }
  ): Promise<{ message: string }> {
    this.logger.info('Déblocage utilisateur (microservice)', {
      userId: payload.userId.toString(),
      targetId: payload.unblockUserDto.user_id,
    });

    try {
      return await this.friendshipService.unblockUser(payload.userId, payload.unblockUserDto);
    } catch (error: any) {
      this.logger.error('Erreur déblocage utilisateur (microservice)', error.message);
      throw error;
    }
  }

  // ==================== QUERY OPERATIONS ====================

  @MessagePattern({ cmd: 'get_user_friends' })
  public async getUserFriends(
    @Payload() payload: { userId: number; page?: number; limit?: number }
  ): Promise<IFriend[]> {
    this.logger.info('Récupération amis utilisateur (microservice)', {
      userId: payload.userId.toString(),
      page: payload.page,
      limit: payload.limit,
    });

    try {
      const friends = await this.friendshipService.getUserFriends(
        payload.userId,
        payload.page ?? 1,
        payload.limit ?? 20
      );
      console.log('friends', friends);
      return friends;
    } catch (error: any) {
      this.logger.error('Erreur récupération amis (microservice)', error.message);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_received_friendship_requests' })
  public async getReceivedFriendshipRequests(
    @Payload() payload: { userId: number; page?: number; limit?: number }
  ): Promise<IFriendshipRequest[]> {
    this.logger.info('Récupération demandes reçues (microservice)', {
      userId: payload.userId.toString(),
      page: payload.page,
      limit: payload.limit,
    });

    try {
      return await this.friendshipService.getReceivedFriendshipRequests(
        payload.userId,
        payload.page ?? 1,
        payload.limit ?? 20
      );
    } catch (error: any) {
      this.logger.error('Erreur récupération demandes reçues (microservice)', error.message);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_sent_friendship_requests' })
  public async getSentFriendshipRequests(
    @Payload() payload: { userId: number; page?: number; limit?: number }
  ): Promise<IFriendshipRequest[]> {
    this.logger.info('Récupération demandes envoyées (microservice)', {
      userId: payload.userId.toString(),
      page: payload.page,
      limit: payload.limit,
    });

    try {
      return await this.friendshipService.getSentFriendshipRequests(
        payload.userId,
        payload.page ?? 1,
        payload.limit ?? 20
      );
    } catch (error: any) {
      this.logger.error('Erreur récupération demandes envoyées (microservice)', error.message);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_friendship_stats' })
  public async getFriendshipStats(@Payload() userId: number): Promise<IFriendshipStats> {
    this.logger.info('Récupération stats amitié (microservice)', { userId: userId.toString() });

    try {
      return await this.friendshipService.getFriendshipStats(userId);
    } catch (error: any) {
      this.logger.error('Erreur récupération stats amitié (microservice)', error.message);
      throw error;
    }
  }

  // ==================== FRIENDSHIP STATUS CHECKS ====================

  @MessagePattern({ cmd: 'get_friendship_status' })
  public async getFriendshipStatus(
    @Payload() payload: { userId: number; otherUserId: number }
  ): Promise<{ status: string | null; friendship_id?: number }> {
    this.logger.info('Vérification statut amitié (microservice)', {
      userId: payload.userId.toString(),
      otherUserId: payload.otherUserId.toString(),
    });

    try {
      const friendship = await this.friendshipService['findExistingFriendship'](
        payload.userId,
        payload.otherUserId
      );

      if (!friendship) {
        return { status: null };
      }

      return {
        status: friendship.status,
        friendship_id: friendship.friendship_id,
      };
    } catch (error: any) {
      this.logger.error('Erreur vérification statut amitié (microservice)', error.message);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'are_friends' })
  public async areFriends(
    @Payload() payload: { userId: number; otherUserId: number }
  ): Promise<{ areFriends: boolean; friendship_id?: number }> {
    this.logger.info('Vérification amitié (microservice)', {
      userId: payload.userId.toString(),
      otherUserId: payload.otherUserId.toString(),
    });

    try {
      const friendship = await this.friendshipService['findExistingFriendship'](
        payload.userId,
        payload.otherUserId
      );

      const areFriends = friendship?.status === FriendshipStatusEnum.ACCEPTED;

      return {
        areFriends,
        friendship_id: areFriends ? friendship?.friendship_id : undefined,
      };
    } catch (error: any) {
      this.logger.error('Erreur vérification amitié (microservice)', error.message);
      throw error;
    }
  }

  // ==================== BULK OPERATIONS ====================

  @MessagePattern({ cmd: 'get_mutual_friends' })
  public async getMutualFriends(
    @Payload() payload: { userId: number; otherUserId: number }
  ): Promise<IFriend[]> {
    this.logger.info('Récupération amis en commun (microservice)', {
      userId: payload.userId.toString(),
      otherUserId: payload.otherUserId.toString(),
    });

    try {
      // Obtenir les amis des deux utilisateurs
      const [userFriends, otherUserFriends] = await Promise.all([
        this.friendshipService.getUserFriends(payload.userId, 1, 1000),
        this.friendshipService.getUserFriends(payload.otherUserId, 1, 1000),
      ]);

      // Trouver les amis en commun
      const mutualFriends = userFriends.filter(friend =>
        otherUserFriends.some(otherFriend => otherFriend.user_id === friend.user_id)
      );

      this.logger.info('Amis en commun trouvés', {
        userId: payload.userId.toString(),
        otherUserId: payload.otherUserId.toString(),
        mutualCount: mutualFriends.length,
      });

      return mutualFriends;
    } catch (error: any) {
      this.logger.error('Erreur récupération amis en commun (microservice)', error.message);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_friendship_suggestions' })
  public async getFriendshipSuggestions(
    @Payload() payload: { userId: number; limit?: number }
  ): Promise<IFriend[]> {
    this.logger.info('Récupération suggestions amitié (microservice)', {
      userId: payload.userId.toString(),
      limit: payload.limit,
    });

    try {
      // Pour l'instant, une implémentation simple - amis des amis
      const userFriends = await this.friendshipService.getUserFriends(payload.userId, 1, 100);
      const suggestions: IFriend[] = [];
      const seenUserIds = new Set([payload.userId]);

      // Ajouter les IDs des amis existants
      userFriends.forEach(friend => seenUserIds.add(friend.user_id));

      // Pour chaque ami, récupérer ses amis
      for (const friend of userFriends.slice(0, 10)) {
        // Limiter pour éviter trop de requêtes
        const friendOfFriend = await this.friendshipService.getUserFriends(friend.user_id, 1, 20);

        friendOfFriend.forEach(fof => {
          if (!seenUserIds.has(fof.user_id) && suggestions.length < (payload.limit ?? 10)) {
            suggestions.push({
              ...fof,
              mutual_friends_count: 1, // Au moins 1 ami en commun
            });
            seenUserIds.add(fof.user_id);
          }
        });
      }

      this.logger.info('Suggestions amitié générées', {
        userId: payload.userId.toString(),
        suggestionsCount: suggestions.length,
      });

      return suggestions.slice(0, payload.limit ?? 10);
    } catch (error: any) {
      this.logger.error('Erreur génération suggestions (microservice)', error.message);
      return []; // Retourner un tableau vide en cas d'erreur
    }
  }
}
