import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Inject,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  UserStatsDto,
  UserProfileDto,
} from '@app/contracts/User/dtos/user.dto';
import {
  IUserResponse,
  IUserProfile,
  IUserStats,
  IValidationResponse,
} from '@app/contracts/User/interfaces/user.interface';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ICurrentUser } from '@app/contracts/Auth/interfaces/auth.interface';
import { UserEnrichmentInterceptor } from '../auth/interceptors/user-enrichment.interceptor';
import { Log } from 'libs/logger/src';

/**
 * Contrôleur API Gateway pour la gestion des utilisateurs
 * Redirige les requêtes HTTP vers le microservice User via TCP
 */
@ApiTags('users')
@Controller('users')
@UseInterceptors(UserEnrichmentInterceptor)
export class UsersController {
  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}

  // ==================== CRUD OPERATIONS ====================

  @Post()
  @Auth()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Utilisateur créé avec succès',
    type: UserResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email ou username déjà utilisé' })
  @Log()
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<IUserResponse> {
    return firstValueFrom(
      this.userClient.send<IUserResponse>({ cmd: 'create_user' }, createUserDto)
    );
  }

  @Put(':id')
  @Auth()
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiParam({ name: 'id', description: "ID de l'utilisateur" })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Utilisateur mis à jour avec succès',
    type: UserResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email ou username déjà utilisé' })
  @Log()
  public async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<IUserResponse> {
    return firstValueFrom(
      this.userClient.send<IUserResponse>({ cmd: 'update_user' }, { userId: id, updateUserDto })
    );
  }

  @Delete(':id')
  @Auth()
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiParam({ name: 'id', description: "ID de l'utilisateur" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Utilisateur supprimé avec succès' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' })
  @Log()
  public async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return firstValueFrom(this.userClient.send<{ message: string }>({ cmd: 'delete_user' }, id));
  }

  // ==================== QUERY OPERATIONS ====================

  @Get('me')
  @Auth()
  @ApiOperation({ summary: "Récupérer les informations complètes de l'utilisateur connecté" })
  @ApiResponse({
    status: 200,
    description: 'Informations utilisateur enrichies récupérées avec succès',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        username: { type: 'string' },
        level: { type: 'number' },
        xp_points: { type: 'number' },
        game_coins: { type: 'number' },
        profile_picture_url: { type: 'string', nullable: true },
      },
    },
  })
  @Log('Récupération des informations utilisateur connecté', 'info')
  public getCurrentUser(@CurrentUser() user: ICurrentUser): ICurrentUser {
    return user;
  }

  @Get('id/:id')
  @Auth()
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  @ApiParam({ name: 'id', description: "ID de l'utilisateur" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Utilisateur trouvé',
    type: UserResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' })
  @Log()
  public async findUserById(@Param('id') id: string): Promise<any> {
    return firstValueFrom(this.userClient.send({ cmd: 'find_user_by_id' }, id));
  }

  @Get('email/:email')
  @Auth()
  @ApiOperation({ summary: 'Récupérer un utilisateur par email' })
  @ApiParam({ name: 'email', description: "Email de l'utilisateur" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Utilisateur trouvé',
    type: UserResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' })
  @Log()
  public async findUserByEmail(@Param('email') email: string): Promise<any> {
    return firstValueFrom(this.userClient.send({ cmd: 'find_user_by_email' }, email));
  }

  @Get('username/:username')
  @Auth()
  @ApiOperation({ summary: "Récupérer un utilisateur par nom d'utilisateur" })
  @ApiParam({ name: 'username', description: "Nom d'utilisateur" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Utilisateur trouvé',
    type: UserResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' })
  @Log()
  public async findUserByUsername(@Param('username') username: string): Promise<any> {
    return firstValueFrom(this.userClient.send({ cmd: 'find_user_by_username' }, username));
  }

  @Get('search')
  @Auth()
  @ApiOperation({ summary: 'Rechercher des utilisateurs' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Résultats de recherche avec pagination',
    schema: {
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: { $ref: '#/components/schemas/UserResponseDto' },
        },
        total: { type: 'number', description: 'Nombre total de résultats' },
        hasMore: { type: 'boolean', description: "Indique s'il y a plus de résultats" },
        page: { type: 'number', description: 'Page actuelle' },
        limit: { type: 'number', description: "Nombre d'éléments par page" },
      },
    },
  })
  @Log()
  public async searchUsers(
    @Query('query') searchTerm: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @CurrentUser() currentUser: ICurrentUser
  ): Promise<{
    users: IUserResponse[];
    total: number;
    hasMore: boolean;
    page: number;
    limit: number;
  }> {
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 20)); // Limiter à 50 max

    const result = await firstValueFrom(
      this.userClient.send(
        { cmd: 'search_users' },
        {
          searchTerm,
          page: pageNum,
          limit: limitNum,
          excludeUserId: currentUser.id.toString(),
        }
      )
    );

    return {
      ...result,
      page: pageNum,
      limit: limitNum,
    };
  }

  // ==================== PROFILE & STATS ====================

  @Get('profile/:userId')
  @Auth()
  @ApiOperation({ summary: "Récupérer le profil public d'un utilisateur" })
  @ApiParam({ name: 'userId', description: "ID de l'utilisateur" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profil utilisateur récupéré',
    type: UserProfileDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' })
  @Log()
  public async getUserProfile(@Param('userId') userId: string): Promise<IUserProfile> {
    return firstValueFrom(this.userClient.send<IUserProfile>({ cmd: 'get_user_profile' }, userId));
  }

  @Get('stats/:userId')
  @Auth()
  @ApiOperation({ summary: "Récupérer les statistiques d'un utilisateur" })
  @ApiParam({ name: 'userId', description: "ID de l'utilisateur" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Statistiques utilisateur récupérées',
    type: UserStatsDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' })
  @Log()
  public async getUserStats(@Param('userId') userId: string): Promise<IUserStats> {
    return firstValueFrom(this.userClient.send<IUserStats>({ cmd: 'get_user_stats' }, userId));
  }

  // ==================== AUTHENTICATION ====================

  @Post('validate')
  @Auth()
  @ApiOperation({ summary: 'Valider les identifiants utilisateur' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
        password: { type: 'string', minLength: 6, example: 'motdepasse123' },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Validation des identifiants',
    schema: {
      type: 'object',
      properties: {
        valid: { type: 'boolean' },
        user: { type: 'object' },
        error: { type: 'string' },
      },
    },
  })
  @Log()
  public async validateUser(
    @Body() payload: { email: string; password: string }
  ): Promise<IValidationResponse> {
    return firstValueFrom(
      this.userClient.send<IValidationResponse>({ cmd: 'validate_user' }, payload)
    );
  }

  // ==================== GAMIFICATION ====================

  @Post(':userId/xp')
  @Auth()
  @ApiOperation({ summary: "Ajouter de l'XP à un utilisateur" })
  @ApiParam({ name: 'userId', description: "ID de l'utilisateur" })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        xpAmount: { type: 'number', minimum: 1, example: 50 },
      },
      required: ['xpAmount'],
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'XP ajouté avec succès',
    type: UserResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' })
  @Log()
  public async addUserXP(
    @Param('userId') userId: string,
    @Body() body: { xpAmount: number }
  ): Promise<IUserResponse> {
    return firstValueFrom(
      this.userClient.send<IUserResponse>(
        { cmd: 'add_user_xp' },
        { userId, xpAmount: body.xpAmount }
      )
    );
  }

  @Post(':userId/coins')
  @Auth()
  @ApiOperation({ summary: 'Ajouter des coins à un utilisateur' })
  @ApiParam({ name: 'userId', description: "ID de l'utilisateur" })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        coinAmount: { type: 'number', minimum: 1, example: 100 },
      },
      required: ['coinAmount'],
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Coins ajoutés avec succès',
    type: UserResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' })
  @Log()
  public async addUserCoins(
    @Param('userId') userId: string,
    @Body() body: { coinAmount: number }
  ): Promise<IUserResponse> {
    return firstValueFrom(
      this.userClient.send<IUserResponse>(
        { cmd: 'add_user_coins' },
        { userId, coinAmount: body.coinAmount }
      )
    );
  }
}
