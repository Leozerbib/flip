import {
  IsNumber,
  IsEnum,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FriendshipStatusEnum } from '../../types/common.types';

export class CreateFriendshipDto {
  @ApiProperty({ example: 2, description: "ID de l'utilisateur à ajouter en ami" })
  @IsNumber()
  user_two_id: number;
}

export class UpdateFriendshipDto {
  @ApiProperty({ enum: FriendshipStatusEnum, description: "Nouveau statut de l'amitié" })
  @IsEnum(FriendshipStatusEnum)
  status: FriendshipStatusEnum;
}

export class FriendshipResponseDto {
  @ApiProperty({ example: 1 })
  friendship_id: number;

  @ApiProperty({ example: 1 })
  user_one_id: number;

  @ApiProperty({ example: 2 })
  user_two_id: number;

  @ApiProperty({ enum: FriendshipStatusEnum })
  status: FriendshipStatusEnum;

  @ApiProperty({ example: 1 })
  action_user_id: number;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  requested_at?: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', nullable: true })
  accepted_at?: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updated_at?: Date;
}

export class FriendshipWithDetailsDto extends FriendshipResponseDto {
  @ApiProperty({
    type: 'object',
    properties: {
      user_id: { type: 'number', example: 1 },
      username: { type: 'string', example: 'john_doe' },
      profile_picture_url: {
        type: 'string',
        example: 'https://example.com/avatar.jpg',
        nullable: true,
      },
      level: { type: 'number', example: 5 },
    },
  })
  user_one: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
    level: number;
  };

  @ApiProperty({
    type: 'object',
    properties: {
      user_id: { type: 'number', example: 2 },
      username: { type: 'string', example: 'jane_doe' },
      profile_picture_url: {
        type: 'string',
        example: 'https://example.com/avatar2.jpg',
        nullable: true,
      },
      level: { type: 'number', example: 3 },
    },
  })
  user_two: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
    level: number;
  };

  @ApiProperty({
    type: 'object',
    properties: {
      user_id: { type: 'number', example: 1 },
      username: { type: 'string', example: 'john_doe' },
      profile_picture_url: {
        type: 'string',
        example: 'https://example.com/avatar.jpg',
        nullable: true,
      },
    },
  })
  action_user: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
  };
}

export class FriendDto {
  @ApiProperty({ example: 2 })
  user_id: number;

  @ApiProperty({ example: 'jane_doe' })
  username: string;

  @ApiProperty({ example: 'https://example.com/avatar2.jpg', nullable: true })
  profile_picture_url?: string;

  @ApiProperty({ example: 7 })
  level: number;

  @ApiProperty({ example: 2150 })
  xp_points: number;

  @ApiProperty({ example: 750 })
  game_coins: number;

  @ApiProperty({ enum: FriendshipStatusEnum })
  friendship_status: FriendshipStatusEnum;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', nullable: true })
  friendship_since?: Date;

  @ApiProperty({ example: 5, nullable: true })
  mutual_friends_count?: number;
}

export class FriendshipRequestDto {
  @ApiProperty({ example: 1 })
  friendship_id: number;

  @ApiProperty({
    type: 'object',
    properties: {
      user_id: { type: 'number', example: 3 },
      username: { type: 'string', example: 'alice_smith' },
      profile_picture_url: {
        type: 'string',
        example: 'https://example.com/avatar3.jpg',
        nullable: true,
      },
      level: { type: 'number', example: 4 },
    },
  })
  requester: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
    level: number;
  };

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  requested_at: Date;

  @ApiProperty({ example: 2, nullable: true })
  mutual_friends_count?: number;
}

export class FriendshipStatsDto {
  @ApiProperty({ example: 25 })
  total_friends: number;

  @ApiProperty({ example: 3 })
  pending_requests_sent: number;

  @ApiProperty({ example: 5 })
  pending_requests_received: number;

  @ApiProperty({ example: 1 })
  blocked_users: number;

  @ApiProperty({ example: 3.2 })
  mutual_friends_avg: number;

  @ApiProperty({ example: 2 })
  friendship_requests_today: number;
}

export class FriendshipFiltersDto {
  @ApiProperty({ enum: FriendshipStatusEnum, required: false })
  @IsEnum(FriendshipStatusEnum)
  @IsOptional()
  status?: FriendshipStatusEnum;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  user_id?: number;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  action_user_id?: number;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  requested_after?: Date;

  @ApiProperty({ example: '2023-12-31T23:59:59.999Z', required: false })
  @IsDateString()
  @IsOptional()
  requested_before?: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  accepted_after?: Date;

  @ApiProperty({ example: '2023-12-31T23:59:59.999Z', required: false })
  @IsDateString()
  @IsOptional()
  accepted_before?: Date;
}

export class FriendSearchFiltersDto {
  @ApiProperty({ example: 'john', description: "Recherche par nom d'utilisateur", required: false })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ example: 1, description: 'Niveau minimum', required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  level_min?: number;

  @ApiProperty({ example: 10, description: 'Niveau maximum', required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  level_max?: number;

  @ApiProperty({ example: true, description: 'Exclure les amis existants', required: false })
  @IsBoolean()
  @IsOptional()
  exclude_friends?: boolean;

  @ApiProperty({ example: true, description: 'Exclure les utilisateurs bloqués', required: false })
  @IsBoolean()
  @IsOptional()
  exclude_blocked?: boolean;

  @ApiProperty({ example: 2, description: "Nombre minimum d'amis en commun", required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  mutual_friends_min?: number;
}

export class BlockUserDto {
  @ApiProperty({ example: 2, description: "ID de l'utilisateur à bloquer" })
  @IsNumber()
  user_id: number;
}

export class UnblockUserDto {
  @ApiProperty({ example: 2, description: "ID de l'utilisateur à débloquer" })
  @IsNumber()
  user_id: number;
}

export class AcceptFriendshipDto {
  @ApiProperty({ example: 1, description: "ID de la demande d'amitié à accepter" })
  @IsNumber()
  friendship_id: number;
}

export class DeclineFriendshipDto {
  @ApiProperty({ example: 1, description: "ID de la demande d'amitié à refuser" })
  @IsNumber()
  friendship_id: number;
}
