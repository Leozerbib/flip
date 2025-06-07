import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
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

@Injectable()
export class FriendshipService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService,
    private readonly exceptionThrower: ExceptionThrower
  ) {
    this.logger.setContext('Friendship.service');
  }

  // ==================== FRIENDSHIP OPERATIONS ====================

  /**
   * Créer une demande d'amitié
   */
  public async createFriendshipRequest(
    requesterId: number,
    createFriendshipDto: CreateFriendshipDto
  ): Promise<IFriendship> {
    this.logger.info('Création demande amitié', {
      requesterId: requesterId.toString(),
      targetId: createFriendshipDto.user_two_id.toString(),
    });

    // Vérifier que l'utilisateur ne s'ajoute pas lui-même
    if (parseInt(requesterId.toString()) === parseInt(createFriendshipDto.user_two_id.toString())) {
      this.exceptionThrower.throwValidation('Vous ne pouvez pas vous ajouter en ami', [
        {
          field: 'user_two_id',
          value: createFriendshipDto.user_two_id,
          constraints: ['Cannot add yourself as friend'],
        },
      ]);
    }

    // Vérifier que les utilisateurs existent
    await this.validateUsersExist([requesterId, createFriendshipDto.user_two_id]);

    // Vérifier qu'il n'y a pas déjà une relation
    const existingFriendship = await this.findExistingFriendship(
      parseInt(requesterId.toString()),
      parseInt(createFriendshipDto.user_two_id.toString())
    );

    if (existingFriendship) {
      switch (existingFriendship.status) {
        case FriendshipStatusEnum.PENDING:
          this.exceptionThrower.throwBusinessRule(
            'Une demande est déjà en attente',
            'FRIENDSHIP_REQUEST_PENDING'
          );
          break;
        case FriendshipStatusEnum.ACCEPTED:
          this.exceptionThrower.throwBusinessRule('Vous êtes déjà amis', 'ALREADY_FRIENDS');
          break;
        case FriendshipStatusEnum.BLOCKED:
          this.exceptionThrower.throwBusinessRule(
            'Cette relation est bloquée',
            'FRIENDSHIP_BLOCKED'
          );
          break;
        case FriendshipStatusEnum.DECLINED:
          // Permettre une nouvelle demande après refus
          await this.deleteFriendship(existingFriendship.friendship_id);
          break;
      }
    }

    try {
      // Assurer l'ordre des IDs pour la contrainte unique
      const [userOneId, userTwoId] = [requesterId, createFriendshipDto.user_two_id].sort(
        (a, b) => a - b
      );

      const friendship = await this.prisma.friendships.create({
        data: {
          user_one_id: parseInt(userOneId.toString()),
          user_two_id: parseInt(userTwoId.toString()),
          action_user_id: parseInt(requesterId.toString()),
          status: FriendshipStatusEnum.PENDING,
        },
      });

      this.logger.info('Demande amitié créée avec succès', {
        friendshipId: friendship.friendship_id.toString(),
        requesterId: requesterId.toString(),
        targetId: createFriendshipDto.user_two_id.toString(),
      });

      return friendship as IFriendship;
    } catch (error: any) {
      this.logger.error('Erreur création demande amitié', error.message);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'create_friendship_request',
        originalError: error.message,
      });
    }
  }

  /**
   * Accepter une demande d'amitié
   */
  public async acceptFriendshipRequest(
    userId: number,
    acceptFriendshipDto: AcceptFriendshipDto
  ): Promise<IFriendship> {
    this.logger.info('Acceptation demande amitié', {
      userId: userId.toString(),
      friendshipId: acceptFriendshipDto.friendship_id.toString(),
    });

    const friendship = await this.findFriendshipById(acceptFriendshipDto.friendship_id);

    if (!friendship) {
      this.exceptionThrower.throwRecordNotFound("Demande d'amitié non trouvée");
    }

    // Vérifier que l'utilisateur est autorisé à accepter
    if (
      friendship.user_one_id !== parseInt(userId.toString()) &&
      friendship.user_two_id !== parseInt(userId.toString())
    ) {
      this.exceptionThrower.throwForbidden("Vous n'êtes pas autorisé à accepter cette demande");
    }

    // Vérifier que c'est bien l'utilisateur qui reçoit la demande
    if (friendship.action_user_id === parseInt(userId.toString())) {
      this.exceptionThrower.throwBusinessRule(
        'Vous ne pouvez pas accepter votre propre demande',
        'CANNOT_ACCEPT_OWN_REQUEST'
      );
    }

    if (friendship.status !== FriendshipStatusEnum.PENDING) {
      this.exceptionThrower.throwBusinessRule(
        "Cette demande n'est plus en attente",
        'REQUEST_NOT_PENDING'
      );
    }

    try {
      const updatedFriendship = await this.prisma.friendships.update({
        where: { friendship_id: parseInt(acceptFriendshipDto.friendship_id.toString()) },
        data: {
          status: FriendshipStatusEnum.ACCEPTED,
          accepted_at: new Date(),
          updated_at: new Date(),
        },
      });

      this.logger.info('Demande amitié acceptée avec succès', {
        friendshipId: acceptFriendshipDto.friendship_id.toString(),
        userId: userId.toString(),
      });

      return updatedFriendship as IFriendship;
    } catch (error: any) {
      this.logger.error('Erreur acceptation demande amitié', error.message);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'accept_friendship_request',
        originalError: error.message,
      });
    }
  }

  /**
   * Refuser une demande d'amitié
   */
  public async declineFriendshipRequest(
    userId: number,
    declineFriendshipDto: DeclineFriendshipDto
  ): Promise<{ message: string }> {
    this.logger.info('Refus demande amitié', {
      userId: userId.toString(),
      friendshipId: declineFriendshipDto.friendship_id.toString(),
    });

    const friendship = await this.findFriendshipById(declineFriendshipDto.friendship_id);

    if (!friendship) {
      this.exceptionThrower.throwRecordNotFound("Demande d'amitié non trouvée");
    }

    // Vérifier les permissions
    if (
      friendship.user_one_id !== parseInt(userId.toString()) &&
      friendship.user_two_id !== parseInt(userId.toString())
    ) {
      this.exceptionThrower.throwForbidden("Vous n'êtes pas autorisé à refuser cette demande");
    }

    if (friendship.action_user_id === parseInt(userId.toString())) {
      this.exceptionThrower.throwBusinessRule(
        'Vous ne pouvez pas refuser votre propre demande',
        'CANNOT_DECLINE_OWN_REQUEST'
      );
    }

    if (friendship.status !== FriendshipStatusEnum.PENDING) {
      this.exceptionThrower.throwBusinessRule(
        "Cette demande n'est plus en attente",
        'REQUEST_NOT_PENDING'
      );
    }

    try {
      await this.prisma.friendships.update({
        where: { friendship_id: parseInt(declineFriendshipDto.friendship_id.toString()) },
        data: {
          status: FriendshipStatusEnum.DECLINED,
          updated_at: new Date(),
        },
      });

      this.logger.info('Demande amitié refusée avec succès', {
        friendshipId: declineFriendshipDto.friendship_id.toString(),
        userId: userId.toString(),
      });

      return { message: "Demande d'amitié refusée" };
    } catch (error: any) {
      this.logger.error('Erreur refus demande amitié', error.message);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'decline_friendship_request',
        originalError: error.message,
      });
    }
  }

  /**
   * Bloquer un utilisateur
   */
  public async blockUser(userId: number, blockUserDto: BlockUserDto): Promise<IFriendship> {
    this.logger.info('Blocage utilisateur', {
      userId: userId.toString(),
      targetId: blockUserDto.user_id.toString(),
    });

    if (parseInt(userId.toString()) === parseInt(blockUserDto.user_id.toString())) {
      this.exceptionThrower.throwValidation('Vous ne pouvez pas vous bloquer vous-même', [
        {
          field: 'user_id',
          value: blockUserDto.user_id,
          constraints: ['Cannot block yourself'],
        },
      ]);
    }

    await this.validateUsersExist([userId, blockUserDto.user_id]);

    const existingFriendship = await this.findExistingFriendship(userId, blockUserDto.user_id);

    try {
      if (existingFriendship) {
        // Mettre à jour la relation existante
        const updatedFriendship = await this.prisma.friendships.update({
          where: { friendship_id: parseInt(existingFriendship.friendship_id.toString()) },
          data: {
            status: FriendshipStatusEnum.BLOCKED,
            action_user_id: userId,
            updated_at: new Date(),
          },
        });

        return updatedFriendship as IFriendship;
      } else {
        // Créer une nouvelle relation bloquée
        const [userOneId, userTwoId] = [userId, blockUserDto.user_id].sort((a, b) => a - b);

        const newFriendship = await this.prisma.friendships.create({
          data: {
            user_one_id: parseInt(userOneId.toString()),
            user_two_id: parseInt(userTwoId.toString()),
            action_user_id: parseInt(userId.toString()),
            status: FriendshipStatusEnum.BLOCKED,
          },
        });

        return newFriendship as IFriendship;
      }
    } catch (error: any) {
      this.logger.error('Erreur blocage utilisateur', error.message);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'block_user',
        originalError: error.message,
      });
    }
  }

  /**
   * Débloquer un utilisateur
   */
  public async unblockUser(
    userId: number,
    unblockUserDto: UnblockUserDto
  ): Promise<{ message: string }> {
    this.logger.info('Déblocage utilisateur', {
      userId: userId.toString(),
      targetId: unblockUserDto.user_id.toString(),
    });

    const friendship = await this.findExistingFriendship(userId, unblockUserDto.user_id);

    if (!friendship) {
      this.exceptionThrower.throwRecordNotFound('Relation non trouvée');
    }

    if (friendship.status !== FriendshipStatusEnum.BLOCKED) {
      this.exceptionThrower.throwBusinessRule(
        "Cette relation n'est pas bloquée",
        'RELATION_NOT_BLOCKED'
      );
    }

    if (friendship.action_user_id !== parseInt(userId.toString())) {
      this.exceptionThrower.throwForbidden("Vous n'avez pas bloqué cet utilisateur");
    }

    try {
      await this.prisma.friendships.delete({
        where: { friendship_id: parseInt(friendship.friendship_id.toString()) },
      });

      this.logger.info('Utilisateur débloqué avec succès', {
        friendshipId: friendship.friendship_id.toString(),
        userId: userId.toString(),
      });

      return { message: 'Utilisateur débloqué avec succès' };
    } catch (error: any) {
      this.logger.error('Erreur déblocage utilisateur', error.message);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'unblock_user',
        originalError: error.message,
      });
    }
  }

  /**
   * Supprimer un ami
   */
  public async removeFriend(userId: number, friendId: number): Promise<{ message: string }> {
    this.logger.info('Suppression ami', {
      userId: userId.toString(),
      friendId: friendId.toString(),
    });

    const friendship = await this.findExistingFriendship(userId, friendId);

    if (!friendship) {
      this.exceptionThrower.throwRecordNotFound('Amitié non trouvée');
    }

    if (friendship.status !== FriendshipStatusEnum.ACCEPTED) {
      this.exceptionThrower.throwBusinessRule(
        "Vous n'êtes pas amis avec cet utilisateur",
        'NOT_FRIENDS'
      );
    }

    try {
      await this.prisma.friendships.delete({
        where: { friendship_id: parseInt(friendship.friendship_id.toString()) },
      });

      this.logger.info('Ami supprimé avec succès', {
        friendshipId: friendship.friendship_id.toString(),
        userId: userId.toString(),
        friendId: friendId.toString(),
      });

      return { message: 'Ami supprimé avec succès' };
    } catch (error: any) {
      this.logger.error('Erreur suppression ami', error.message);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'remove_friend',
        originalError: error.message,
      });
    }
  }

  // ==================== QUERY OPERATIONS ====================

  /**
   * Obtenir les amis d'un utilisateur
   */
  public async getUserFriends(userId: number, page = 1, limit = 20): Promise<IFriend[]> {
    this.logger.info('Récupération amis utilisateur', {
      userId: userId.toString(),
      page: page.toString(),
      limit: limit.toString(),
    });

    const offset = (page - 1) * limit;

    try {
      const friendships = await this.prisma.friendships.findMany({
        where: {
          OR: [
            { user_one_id: parseInt(userId.toString()) },
            { user_two_id: parseInt(userId.toString()) },
          ],
          status: FriendshipStatusEnum.ACCEPTED,
        },
        include: {
          users_friendships_user_one_idTousers: {
            select: {
              user_id: true,
              username: true,
              profile_picture_url: true,
              level: true,
              xp_points: true,
              game_coins: true,
            },
          },
          users_friendships_user_two_idTousers: {
            select: {
              user_id: true,
              username: true,
              profile_picture_url: true,
              level: true,
              xp_points: true,
              game_coins: true,
            },
          },
        },
        skip: offset,
        take: limit,
      });
      if (friendships.length === 0) {
        return [];
      }

      return friendships.map(friendship => {
        const friend =
          friendship.user_one_id.toString() === userId.toString()
            ? friendship.users_friendships_user_two_idTousers
            : friendship.users_friendships_user_one_idTousers;

        return {
          user_id: friend.user_id,
          username: friend.username,
          profile_picture_url: friend.profile_picture_url,
          level: friend.level,
          xp_points: friend.xp_points,
          game_coins: friend.game_coins,
          friendship_status: FriendshipStatusEnum.ACCEPTED,
          friendship_since: friendship.accepted_at,
        } as IFriend;
      });
    } catch (error: any) {
      this.logger.error('Erreur récupération amis', error.message);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'get_user_friends',
        originalError: error.message,
      });
    }
  }

  /**
   * Obtenir les demandes d'amitié reçues
   */
  public async getReceivedFriendshipRequests(
    userId: number,
    page = 1,
    limit = 20
  ): Promise<IFriendshipRequest[]> {
    this.logger.info('Récupération demandes amitié reçues', {
      userId: userId.toString(),
      page: page.toString(),
      limit: limit.toString(),
    });

    const offset = (page - 1) * limit;

    try {
      const friendships = await this.prisma.friendships.findMany({
        where: {
          OR: [
            {
              user_two_id: parseInt(userId.toString()),
              action_user_id: { not: parseInt(userId.toString()) },
            },
          ],
          status: FriendshipStatusEnum.PENDING,
        },
        include: {
          users_friendships_action_user_idTousers: {
            select: {
              user_id: true,
              username: true,
              profile_picture_url: true,
              level: true,
            },
          },
        },
        orderBy: { requested_at: 'desc' },
        skip: offset,
        take: limit,
      });
      if (friendships.length === 0) {
        return [];
      }

      return friendships.map(friendship => ({
        friendship_id: friendship.friendship_id,
        requester: friendship.users_friendships_action_user_idTousers,
        requested_at: friendship.requested_at,
      })) as IFriendshipRequest[];
    } catch (error: any) {
      this.logger.error('Erreur récupération demandes reçues', error.message);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'get_received_requests',
        originalError: error.message,
      });
    }
  }

  /**
   * Obtenir les demandes d'amitié envoyées
   */
  public async getSentFriendshipRequests(
    userId: number,
    page = 1,
    limit = 20
  ): Promise<IFriendshipRequest[]> {
    this.logger.info('Récupération demandes amitié envoyées', {
      userId: userId.toString(),
      page: page.toString(),
      limit: limit.toString(),
    });

    const offset = (page - 1) * limit;

    try {
      const friendships = await this.prisma.friendships.findMany({
        where: {
          action_user_id: parseInt(userId.toString()),
          status: FriendshipStatusEnum.PENDING,
        },
        include: {
          users_friendships_user_one_idTousers: {
            select: {
              user_id: true,
              username: true,
              profile_picture_url: true,
              level: true,
            },
          },
          users_friendships_user_two_idTousers: {
            select: {
              user_id: true,
              username: true,
              profile_picture_url: true,
              level: true,
            },
          },
        },
        orderBy: { requested_at: 'desc' },
        skip: offset,
        take: limit,
      });
      if (friendships.length === 0) {
        return [];
      }

      return friendships.map(friendship => {
        const target =
          friendship.user_one_id.toString() === userId.toString()
            ? friendship.users_friendships_user_two_idTousers
            : friendship.users_friendships_user_one_idTousers;

        return {
          friendship_id: friendship.friendship_id,
          requester: target,
          requested_at: friendship.requested_at,
        };
      }) as IFriendshipRequest[];
    } catch (error: any) {
      this.logger.error('Erreur récupération demandes envoyées', error.message);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'get_sent_requests',
        originalError: error.message,
      });
    }
  }

  /**
   * Obtenir les statistiques d'amitié d'un utilisateur
   */
  public async getFriendshipStats(userId: number): Promise<IFriendshipStats> {
    this.logger.info('Récupération stats amitié', { userId: userId.toString() });

    try {
      const [totalFriends, pendingSent, pendingReceived, blockedUsers] = await Promise.all([
        this.prisma.friendships.count({
          where: {
            OR: [
              { user_one_id: parseInt(userId.toString()) },
              { user_two_id: parseInt(userId.toString()) },
            ],
            status: FriendshipStatusEnum.ACCEPTED,
          },
        }),
        this.prisma.friendships.count({
          where: {
            action_user_id: parseInt(userId.toString()),
            status: FriendshipStatusEnum.PENDING,
          },
        }),
        this.prisma.friendships.count({
          where: {
            OR: [
              { user_one_id: parseInt(userId.toString()) },
              { user_two_id: parseInt(userId.toString()) },
            ],
            status: FriendshipStatusEnum.PENDING,
          },
        }),
        this.prisma.friendships.count({
          where: {
            action_user_id: parseInt(userId.toString()),
            status: FriendshipStatusEnum.BLOCKED,
          },
        }),
      ]);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const requestsToday = await this.prisma.friendships.count({
        where: {
          action_user_id: parseInt(userId.toString()),
          requested_at: { gte: today },
        },
      });

      return {
        total_friends: totalFriends,
        pending_requests_sent: pendingSent,
        pending_requests_received: pendingReceived,
        blocked_users: blockedUsers,
        mutual_friends_avg: 0, // TODO: Calculer la moyenne des amis en commun
        friendship_requests_today: requestsToday,
      };
    } catch (error: any) {
      this.logger.error('Erreur récupération stats amitié', error.message);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'get_friendship_stats',
        originalError: error.message,
      });
    }
  }

  // ==================== HELPER METHODS ====================

  private async findFriendshipById(friendshipId: number): Promise<IFriendship | null> {
    try {
      const friendship = await this.prisma.friendships.findUnique({
        where: { friendship_id: parseInt(friendshipId.toString()) },
      });
      return friendship as IFriendship | null;
    } catch (error: any) {
      this.logger.error('Erreur recherche amitié par ID', error.message);
      return null;
    }
  }

  public async findExistingFriendship(
    userId1: number,
    userId2: number
  ): Promise<IFriendship | null> {
    try {
      const [userOneId, userTwoId] = [
        parseInt(userId1.toString()),
        parseInt(userId2.toString()),
      ].sort((a, b) => a - b);

      const friendship = await this.prisma.friendships.findFirst({
        where: {
          OR: [
            {
              AND: [
                { user_one_id: parseInt(userOneId.toString()) },
                { user_two_id: parseInt(userTwoId.toString()) },
              ],
            },
            {
              AND: [
                { user_one_id: parseInt(userTwoId.toString()) },
                { user_two_id: parseInt(userOneId.toString()) },
              ],
            },
          ],
        },
      });

      return friendship as IFriendship | null;
    } catch (error: any) {
      this.logger.error('Erreur recherche amitié existante', error.message);
      return null;
    }
  }

  private async validateUsersExist(userIds: number[]): Promise<void> {
    for (const userId of userIds) {
      const user = await this.prisma.users.findUnique({
        where: { user_id: parseInt(userId.toString()) },
      });

      if (!user) {
        this.exceptionThrower.throwRecordNotFound(`Utilisateur avec l'ID ${userId} non trouvé`);
      }
    }
  }

  private async deleteFriendship(friendshipId: number): Promise<void> {
    try {
      await this.prisma.friendships.delete({
        where: { friendship_id: parseInt(friendshipId.toString()) },
      });
    } catch (error: any) {
      this.logger.error('Erreur suppression amitié', error.message);
      throw error;
    }
  }
}
