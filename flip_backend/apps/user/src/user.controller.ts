import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { FriendshipService } from './friendship.service';
import { LoggerService } from 'libs/logger/src';
import { CreateUserDto, UpdateUserDto } from '@app/contracts/User/dtos/user.dto';
import {
  IUserResponse,
  IUserProfile,
  IUserStats,
  IValidationResponse,
} from '@app/contracts/User/interfaces/user.interface';

/**
 * Contrôleur User (TCP uniquement)
 * Toutes les requêtes HTTP passent par l'API Gateway
 */
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly friendshipService: FriendshipService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext('User.controller');
  }

  // ==================== MICROSERVICE PATTERNS TCP ====================

  @MessagePattern({ cmd: 'create_user' })
  public async createUser(@Payload() createUserDto: CreateUserDto): Promise<IUserResponse> {
    this.logger.info('Création utilisateur (microservice)', {
      email: createUserDto.email,
      username: createUserDto.username,
    });
    return this.userService.createUser(createUserDto);
  }

  @MessagePattern({ cmd: 'update_user' })
  public async updateUser(
    @Payload() payload: { userId: string; updateUserDto: UpdateUserDto }
  ): Promise<IUserResponse> {
    this.logger.info('Mise à jour utilisateur (microservice)', { userId: payload.userId });
    return this.userService.updateUser(payload.userId, payload.updateUserDto);
  }

  @MessagePattern({ cmd: 'delete_user' })
  public async deleteUser(@Payload() userId: string): Promise<{ message: string }> {
    this.logger.info('Suppression utilisateur (microservice)', { userId });
    return this.userService.deleteUser(userId);
  }

  @MessagePattern({ cmd: 'find_user_by_id' })
  public async findUserById(@Payload() userId: string): Promise<any> {
    this.logger.info('Recherche utilisateur par ID (microservice)', { userId });
    return this.userService.findUserById(userId);
  }

  @MessagePattern({ cmd: 'find_user_by_email' })
  public async findUserByEmail(@Payload() email: string): Promise<any> {
    this.logger.info('Recherche utilisateur par email (microservice)', { email });
    return this.userService.findUserByEmail(email);
  }

  @MessagePattern({ cmd: 'find_user_by_username' })
  public async findUserByUsername(@Payload() username: string): Promise<any> {
    this.logger.info('Recherche utilisateur par username (microservice)', { username });
    return this.userService.findUserByUsername(username);
  }

  @MessagePattern({ cmd: 'get_user_profile' })
  public async getUserProfile(@Payload() userId: string): Promise<IUserProfile> {
    this.logger.info('Récupération profil utilisateur (microservice)', { userId });
    return this.userService.getUserProfile(userId);
  }

  @MessagePattern({ cmd: 'get_user_stats' })
  public async getUserStats(@Payload() userId: string): Promise<IUserStats> {
    this.logger.info('Récupération stats utilisateur (microservice)', { userId });
    return this.userService.getUserStats(userId);
  }

  @MessagePattern({ cmd: 'validate_user' })
  public async validateUser(
    @Payload() payload: { email: string; password: string }
  ): Promise<IValidationResponse> {
    this.logger.info('Validation credentials utilisateur (microservice)', { email: payload.email });
    return this.userService.validateUser(payload.email, payload.password);
  }

  @MessagePattern({ cmd: 'add_user_xp' })
  public async addUserXP(
    @Payload() payload: { userId: string; xpAmount: number }
  ): Promise<IUserResponse> {
    this.logger.info('Ajout XP utilisateur (microservice)', {
      userId: payload.userId,
      xpAmount: payload.xpAmount,
    });
    return this.userService.addXP(payload.userId, payload.xpAmount);
  }

  @MessagePattern({ cmd: 'add_user_coins' })
  public async addUserCoins(
    @Payload() payload: { userId: string; coinAmount: number }
  ): Promise<IUserResponse> {
    this.logger.info('Ajout coins utilisateur (microservice)', {
      userId: payload.userId,
      coinAmount: payload.coinAmount,
    });
    return this.userService.addCoins(payload.userId, payload.coinAmount);
  }

  @MessagePattern({ cmd: 'search_users' })
  public async searchUsers(
    @Payload()
    payload: {
      searchTerm: string;
      page?: number;
      limit?: number;
      excludeUserId?: string;
    }
  ): Promise<{ users: IUserResponse[]; total: number; hasMore: boolean }> {
    this.logger.info('Recherche utilisateurs (microservice)', {
      searchTerm: payload.searchTerm,
      page: payload.page,
      limit: payload.limit,
      excludeUserId: payload.excludeUserId,
    });
    return this.userService.searchUsers(
      payload.searchTerm,
      payload.page,
      payload.limit,
      payload.excludeUserId
    );
  }

  @MessagePattern({ cmd: 'check_friendship_status' })
  public async checkFriendshipStatus(
    @Payload() payload: { userId: number; otherUserId: number }
  ): Promise<string | null> {
    this.logger.info('Vérification statut amitié (microservice)', {
      userId: payload.userId.toString(),
      otherUserId: payload.otherUserId.toString(),
    });

    const friendship = await this.friendshipService.findExistingFriendship(
      payload.userId,
      payload.otherUserId
    );

    return friendship ? friendship.status : null;
  }
}
