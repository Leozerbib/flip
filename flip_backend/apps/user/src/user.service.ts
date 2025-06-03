import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { LoggerService } from 'libs/logger/src';
import { CreateUserDto, UpdateUserDto } from '@app/contracts/User/dtos/user.dto';
import {
  IUser,
  IUserResponse,
  IUserProfile,
  IUserStats,
  IValidationResponse,
} from '@app/contracts/User/interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext('User.service');
  }

  // ==================== CRUD OPERATIONS ====================

  /**
   * Créer un nouvel utilisateur
   */
  public async createUser(createUserDto: CreateUserDto): Promise<IUserResponse> {
    this.logger.info("Création d'un nouvel utilisateur", {
      email: createUserDto.email,
      username: createUserDto.username,
    });

    // Vérifier si l'email existe déjà
    const existingUserByEmail = await this.findUserByEmail(createUserDto.email);
    if (existingUserByEmail) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    // Vérifier si le username existe déjà
    const existingUserByUsername = await this.findUserByUsername(createUserDto.username);
    if (existingUserByUsername) {
      throw new ConflictException("Ce nom d'utilisateur est déjà pris");
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    try {
      const user = await this.prisma.users.create({
        data: {
          username: createUserDto.username,
          email: createUserDto.email,
          password_hash: hashedPassword,
          profile_picture_url: createUserDto.profile_picture_url,
          level: 1,
          xp_points: 0,
          game_coins: 100, // Coins de départ
        },
      });

      this.logger.info('Utilisateur créé avec succès', { userId: user.user_id.toString() });

      return this.formatUserResponse(user);
    } catch (error: any) {
      this.logger.error("Erreur lors de la création de l'utilisateur");
      throw new BadRequestException("Erreur lors de la création de l'utilisateur");
    }
  }

  /**
   * Mettre à jour un utilisateur
   */
  public async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUserResponse> {
    this.logger.info('Mise à jour utilisateur', { userId });

    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Vérifier les contraintes d'unicité si nécessaire
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findUserByEmail(updateUserDto.email);
      if (existingUser && existingUser.user_id.toString() !== userId) {
        throw new ConflictException('Cet email est déjà utilisé');
      }
    }

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.findUserByUsername(updateUserDto.username);
      if (existingUser && existingUser.user_id.toString() !== userId) {
        throw new ConflictException("Ce nom d'utilisateur est déjà pris");
      }
    }

    try {
      const updatedUser = await this.prisma.users.update({
        where: { user_id: parseInt(userId) },
        data: {
          ...updateUserDto,
        },
      });

      this.logger.info('Utilisateur mis à jour avec succès', { userId });
      return this.formatUserResponse(updatedUser);
    } catch (error: any) {
      this.logger.error('Erreur lors de la mise à jour');
      throw new BadRequestException('Erreur lors de la mise à jour');
    }
  }

  /**
   * Supprimer un utilisateur
   */
  public async deleteUser(userId: string): Promise<{ message: string }> {
    this.logger.info('Suppression utilisateur', { userId });

    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    try {
      await this.prisma.users.delete({
        where: { user_id: parseInt(userId) },
      });

      this.logger.info('Utilisateur supprimé avec succès', { userId });
      return { message: 'Utilisateur supprimé avec succès' };
    } catch (error: any) {
      this.logger.error('Erreur lors de la suppression');
      throw new BadRequestException('Erreur lors de la suppression');
    }
  }

  // ==================== QUERY OPERATIONS ====================

  /**
   * Trouver un utilisateur par ID
   */
  public async findUserById(userId: string): Promise<IUser | null> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { user_id: parseInt(userId) },
      });
      return user as IUser | null;
    } catch (error: any) {
      this.logger.error('Erreur lors de la recherche par ID');
      return null;
    }
  }

  /**
   * Trouver un utilisateur par email
   */
  public async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { email },
      });
      return user as IUser | null;
    } catch (error: any) {
      this.logger.error('Erreur lors de la recherche par email');
      return null;
    }
  }

  /**
   * Trouver un utilisateur par username
   */
  public async findUserByUsername(username: string): Promise<IUser | null> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { username },
      });
      return user as IUser | null;
    } catch (error: any) {
      this.logger.error('Erreur lors de la recherche par username');
      return null;
    }
  }

  /**
   * Obtenir le profil public d'un utilisateur
   */
  public async getUserProfile(userId: string): Promise<IUserProfile> {
    this.logger.info('Récupération du profil utilisateur', { userId });

    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      profile_picture_url: user.profile_picture_url,
      level: user.level,
      xp_points: user.xp_points,
      game_coins: user.game_coins,
      createdAt: user.createdAt,
    };
  }

  /**
   * Obtenir les statistiques d'un utilisateur
   */
  public async getUserStats(userId: string): Promise<IUserStats> {
    this.logger.info('Récupération des statistiques utilisateur', { userId });

    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Pour l'instant, on retourne des stats basiques
    // Plus tard, on pourra calculer depuis d'autres tables
    return {
      user_id: user.user_id,
      level: user.level,
      xp_points: user.xp_points,
      game_coins: user.game_coins,
      services_provided: 0, // À calculer depuis les services
      services_received: 0, // À calculer depuis les services
      pranks_executed: 0, // À calculer depuis les pranks
      pranks_received: 0, // À calculer depuis les pranks
      missions_completed: 0, // À calculer depuis les missions
      friends_count: 0, // À calculer depuis les relations
    };
  }

  // ==================== AUTHENTICATION OPERATIONS ====================

  /**
   * Valider les credentials d'un utilisateur
   */
  public async validateUser(email: string, password: string): Promise<IValidationResponse> {
    this.logger.info('Validation des credentials utilisateur', { email });

    const user = await this.findUserByEmail(email);
    if (!user) {
      return {
        valid: false,
        error: 'Utilisateur non trouvé',
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return {
        valid: false,
        error: 'Mot de passe incorrect',
      };
    }

    return {
      valid: true,
      user: this.formatUserResponse(user),
    };
  }

  // ==================== GAMIFICATION OPERATIONS ====================

  /**
   * Ajouter de l'XP à un utilisateur
   */
  public async addXP(userId: string, xpAmount: number): Promise<IUserResponse> {
    this.logger.info("Ajout d'XP", { userId, xpAmount });

    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const newXP = user.xp_points + xpAmount;
    const newLevel = this.calculateLevel(newXP);

    const updatedUser = await this.prisma.users.update({
      where: { user_id: parseInt(userId) },
      data: {
        xp_points: newXP,
        level: newLevel,
      },
    });

    this.logger.info('XP ajouté avec succès', { userId, newXP, newLevel });
    return this.formatUserResponse(updatedUser);
  }

  /**
   * Ajouter des coins à un utilisateur
   */
  public async addCoins(userId: string, coinAmount: number): Promise<IUserResponse> {
    this.logger.info('Ajout de coins', { userId, coinAmount });

    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const updatedUser = await this.prisma.users.update({
      where: { user_id: parseInt(userId) },
      data: {
        game_coins: user.game_coins + coinAmount,
      },
    });

    this.logger.info('Coins ajoutés avec succès', { userId, newTotal: updatedUser.game_coins });
    return this.formatUserResponse(updatedUser);
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Formater la réponse utilisateur (sans mot de passe)
   */
  private formatUserResponse(user: any): IUserResponse {
    return {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      profile_picture_url: user.profile_picture_url,
      level: user.level,
      xp_points: user.xp_points,
      game_coins: user.game_coins,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Calculer le niveau basé sur l'XP
   */
  private calculateLevel(xp: number): number {
    // Formule simple : niveau = racine carrée de (XP / 100) + 1
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  }
}
