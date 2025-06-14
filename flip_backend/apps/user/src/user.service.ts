import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { LoggerService } from 'libs/logger/src';
import { ExceptionThrower } from '@app/exceptions';
import { CreateUserDto, UpdateUserDto } from '@app/contracts/User/dtos/user.dto';
import {
  IUser,
  IUserResponse,
  IUserProfile,
  IUserStats,
  IValidationResponse,
} from '@app/contracts/User/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { FriendshipService } from './friendship.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService,
    private readonly exceptionThrower: ExceptionThrower,
    private readonly friendshipService: FriendshipService
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
      this.exceptionThrower.throwDuplicateEntry('Un utilisateur avec cet email existe déjà');
    }

    // Vérifier si le username existe déjà
    const existingUserByUsername = await this.findUserByUsername(createUserDto.username);
    if (existingUserByUsername) {
      this.exceptionThrower.throwDuplicateEntry("Ce nom d'utilisateur est déjà pris");
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
      this.logger.error("Erreur lors de la création de l'utilisateur", error.message);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'create_user',
        originalError: error.message,
      });
    }
  }

  /**
   * Mettre à jour un utilisateur
   */
  public async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUserResponse> {
    this.logger.info('Mise à jour utilisateur', { userId });

    const user = await this.findUserById(userId);
    if (!user) {
      this.exceptionThrower.throwRecordNotFound('Utilisateur non trouvé');
    }

    // Vérifier les contraintes d'unicité si nécessaire
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findUserByEmail(updateUserDto.email);
      if (existingUser && existingUser.user_id.toString() !== userId) {
        this.exceptionThrower.throwDuplicateEntry('Cet email est déjà utilisé');
      }
    }

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.findUserByUsername(updateUserDto.username);
      if (existingUser && existingUser.user_id.toString() !== userId) {
        this.exceptionThrower.throwDuplicateEntry("Ce nom d'utilisateur est déjà pris");
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
      this.logger.error('Erreur lors de la mise à jour', error.message);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'update_user',
        originalError: error.message,
      });
    }
  }

  /**
   * Supprimer un utilisateur
   */
  public async deleteUser(userId: string): Promise<{ message: string }> {
    this.logger.info('Suppression utilisateur', { userId });

    const user = await this.findUserById(userId);
    if (!user) {
      this.exceptionThrower.throwRecordNotFound('Utilisateur non trouvé');
    }

    try {
      await this.prisma.users.delete({
        where: { user_id: parseInt(userId) },
      });

      this.logger.info('Utilisateur supprimé avec succès', { userId });
      return { message: 'Utilisateur supprimé avec succès' };
    } catch (error: any) {
      this.logger.error('Erreur lors de la suppression', error.message);
      this.exceptionThrower.throwDatabaseQuery({
        operation: 'delete_user',
        originalError: error.message,
      });
    }
  }

  // ==================== QUERY OPERATIONS ====================

  /**
   * Rechercher des utilisateurs par terme de recherche
   * Algorithme intelligent avec tolérance aux erreurs
   */
  public async searchUsers(
    searchTerm: string,
    page = 1,
    limit = 20,
    excludeUserId?: string
  ): Promise<{ users: IUserResponse[]; total: number; hasMore: boolean }> {
    this.logger.info('Recherche utilisateurs', { searchTerm, page, limit, excludeUserId });

    // Nettoyer et normaliser le terme de recherche
    const cleanTerm = this.normalizeSearchTerm(searchTerm);
    if (!cleanTerm || cleanTerm.length < 1) {
      return { users: [], total: 0, hasMore: false };
    }

    const offset = (page - 1) * limit;

    try {
      // Recherche multi-critères avec pondération
      const searchQueries = this.generateSearchQueries(cleanTerm);
      // Construction de la requête Prisma avec différents niveaux de correspondance
      const whereConditions = {
        AND: [
          // Exclure l'utilisateur actuel si spécifié
          ...(excludeUserId ? [{ user_id: { not: parseInt(excludeUserId) } }] : []),
          // Conditions de recherche flexibles
          {
            OR: [
              // Correspondance exacte (priorité la plus haute)
              { username: { equals: cleanTerm, mode: 'insensitive' as const } },
              // Commence par (priorité haute)
              { username: { startsWith: cleanTerm, mode: 'insensitive' as const } },
              // Contient (priorité moyenne)
              { username: { contains: cleanTerm, mode: 'insensitive' as const } },
              // Recherche sur l'email aussi
              { email: { contains: cleanTerm, mode: 'insensitive' as const } },
              // Recherche floue pour gérer les erreurs de frappe
              ...searchQueries.map(query => ({
                username: { contains: query, mode: 'insensitive' as const },
              })),
            ],
          },
        ],
      };

      // Compter le total
      const total = await this.prisma.users.count({ where: whereConditions });
      if (total === 0) {
        return { users: [], total: 0, hasMore: false };
      }

      // Récupérer les utilisateurs avec tri intelligent
      const users = await this.prisma.users.findMany({
        where: whereConditions,
        select: {
          user_id: true,
          username: true,
          email: true,
          profile_picture_url: true,
          level: true,
          xp_points: true,
          game_coins: true,
          created_at: true,
          updated_at: true,
        },
        orderBy: [
          // Trier par pertinence (ceux qui commencent par le terme en premier)
          {
            username: 'asc',
          },
        ],
        skip: offset,
        take: limit,
      });

      const formattedUsers = users.map(user => this.formatUserResponse(user));

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      await Promise.all(
        formattedUsers.map(async (user: IUserResponse) => {
          const friendship = await this.friendshipService.findExistingFriendship(
            parseInt(user.user_id.toString()),
            parseInt(excludeUserId ?? '0')
          );
          user.friendship_status = friendship?.status ?? null;
        })
      );

      const hasMore = offset + users.length < total;

      this.logger.info('Recherche terminée', {
        resultsCount: users.length,
        total,
        hasMore,
        searchTerm: cleanTerm,
      });

      return {
        users: formattedUsers,
        total,
        hasMore,
      };
    } catch (error: any) {
      this.logger.error('Erreur lors de la recherche', error.message);
      return { users: [], total: 0, hasMore: false };
    }
  }

  /**
   * Normaliser le terme de recherche
   */
  private normalizeSearchTerm(term: string): string {
    return term
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // Supprimer les caractères spéciaux
      .substring(0, 50); // Limiter la longueur
  }

  /**
   * Générer des variantes de recherche pour gérer les erreurs de frappe
   */
  private generateSearchQueries(cleanTerm: string): string[] {
    const queries: string[] = [];
    if (cleanTerm.length < 2) {
      return queries;
    }

    // Variantes avec caractères manquants (typos communes)
    const commonTypos = {
      a: ['e', 'à', 'á'],
      e: ['a', 'é', 'è', 'ê'],
      i: ['y', 'í', 'î'],
      o: ['u', 'ó', 'ô'],
      u: ['o', 'ú', 'ù'],
      c: ['k', 'ç'],
      k: ['c', 'q'],
      s: ['z', 'ç'],
      z: ['s'],
      ph: ['f'],
      f: ['ph'],
    };

    // Générer des variantes avec substitutions communes
    for (const [original, replacements] of Object.entries(commonTypos)) {
      if (cleanTerm.includes(original)) {
        for (const replacement of replacements) {
          const variant = cleanTerm.replace(new RegExp(original, 'g'), replacement);
          if (variant !== cleanTerm && variant.length >= 2) {
            queries.push(variant);
          }
        }
      }
    }

    // Variantes avec caractères inversés (transpositions)
    for (let i = 0; i < cleanTerm.length - 1; i++) {
      if (cleanTerm[i] !== cleanTerm[i + 1]) {
        const chars = cleanTerm.split('');
        [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
        const transposed = chars.join('');
        queries.push(transposed);
      }
    }

    // Limiter le nombre de variantes pour éviter les requêtes trop lourdes
    return queries.slice(0, 5);
  }

  /**
   * Trouver un utilisateur par ID
   */
  public async findUserById(userId: string): Promise<IUser | null> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { user_id: parseInt(userId) },
        omit: {
          password_hash: true,
          email: true,
        },
      });
      return user as IUser | null;
    } catch (error: any) {
      this.logger.error('Erreur lors de la recherche par ID', error.message);
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
      this.logger.error('Erreur lors de la recherche par email', error.message);
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
      this.logger.error('Erreur lors de la recherche par username', error.message);
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
      this.exceptionThrower.throwRecordNotFound('Utilisateur non trouvé');
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
      this.exceptionThrower.throwRecordNotFound('Utilisateur non trouvé');
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
      this.exceptionThrower.throwRecordNotFound('Utilisateur non trouvé');
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
      this.exceptionThrower.throwRecordNotFound('Utilisateur non trouvé');
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
      createdAt: user.created_at ?? user.createdAt,
      updatedAt: user.updated_at ?? user.updatedAt,
      friendship_status: user.friendship_status ?? null,
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
