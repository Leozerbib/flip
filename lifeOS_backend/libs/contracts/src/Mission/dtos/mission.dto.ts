import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsBoolean,
  Min,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MissionTypeEnum, UserMissionStatusEnum } from '../../types/common.types';

export class CreateMissionDto {
  @ApiProperty({ example: 'Premier Service', description: 'Titre de la mission' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Rendre votre premier service à un ami',
    description: 'Description de la mission',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: MissionTypeEnum, description: 'Type de mission' })
  @IsEnum(MissionTypeEnum)
  type: MissionTypeEnum;

  @ApiProperty({
    example: 1,
    description: 'Valeur cible pour compléter la mission',
    required: false,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  target_value?: number;

  @ApiProperty({ example: 100, description: 'Récompense XP' })
  @IsNumber()
  @Min(0)
  xp_reward: number;

  @ApiProperty({ example: 50, description: 'Récompense en pièces' })
  @IsNumber()
  @Min(0)
  coins_reward: number;

  @ApiProperty({ example: 10, description: 'Récompense en jetons' })
  @IsNumber()
  @Min(0)
  jeton_reward: number;

  @ApiProperty({ example: 1, description: 'ID du prank récompense', required: false })
  @IsNumber()
  @IsOptional()
  prank_reward_id?: number;

  @ApiProperty({ example: true, description: 'Mission active', required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({ example: false, description: 'Mission répétable', required: false })
  @IsBoolean()
  @IsOptional()
  is_repeatable?: boolean;

  @ApiProperty({ example: 24, description: 'Cooldown en heures avant répétition', required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  repeat_cooldown_hours?: number;

  @ApiProperty({ example: 1, description: 'Niveau requis pour débloquer', required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  unlock_level_required?: number;
}

export class UpdateMissionDto {
  @ApiProperty({ example: 'Titre mis à jour', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Description mise à jour', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: MissionTypeEnum, required: false })
  @IsEnum(MissionTypeEnum)
  @IsOptional()
  type?: MissionTypeEnum;

  @ApiProperty({ example: 5, required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  target_value?: number;

  @ApiProperty({ example: 150, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  xp_reward?: number;

  @ApiProperty({ example: 75, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  coins_reward?: number;

  @ApiProperty({ example: 15, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  jeton_reward?: number;

  @ApiProperty({ example: 2, required: false })
  @IsNumber()
  @IsOptional()
  prank_reward_id?: number;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_repeatable?: boolean;

  @ApiProperty({ example: 48, required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  repeat_cooldown_hours?: number;

  @ApiProperty({ example: 5, required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  unlock_level_required?: number;
}

export class MissionResponseDto {
  @ApiProperty({ example: 1 })
  mission_id: number;

  @ApiProperty({ example: 'Premier Service' })
  title: string;

  @ApiProperty({ example: 'Rendre votre premier service à un ami', nullable: true })
  description?: string;

  @ApiProperty({ enum: MissionTypeEnum })
  type: MissionTypeEnum;

  @ApiProperty({ example: 1, nullable: true })
  target_value?: number;

  @ApiProperty({ example: 100 })
  xp_reward: number;

  @ApiProperty({ example: 50 })
  coins_reward: number;

  @ApiProperty({ example: 10 })
  jeton_reward: number;

  @ApiProperty({ example: 1, nullable: true })
  prank_reward_id?: number;

  @ApiProperty({ example: true })
  is_active: boolean;

  @ApiProperty({ example: false })
  is_repeatable: boolean;

  @ApiProperty({ example: 24, nullable: true })
  repeat_cooldown_hours?: number;

  @ApiProperty({ example: 1, nullable: true })
  unlock_level_required?: number;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  created_at?: Date;
}

export class CreateUserMissionDto {
  @ApiProperty({ example: 1, description: "ID de l'utilisateur" })
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 1, description: 'ID de la mission' })
  @IsNumber()
  mission_id: number;

  @ApiProperty({ example: 0, description: 'Progression initiale', required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  progress?: number;

  @ApiProperty({ enum: UserMissionStatusEnum, description: 'Statut initial', required: false })
  @IsEnum(UserMissionStatusEnum)
  @IsOptional()
  status?: UserMissionStatusEnum;
}

export class UpdateUserMissionDto {
  @ApiProperty({ example: 3, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  progress?: number;

  @ApiProperty({ enum: UserMissionStatusEnum, required: false })
  @IsEnum(UserMissionStatusEnum)
  @IsOptional()
  status?: UserMissionStatusEnum;
}

export class UserMissionResponseDto {
  @ApiProperty({ example: 1 })
  user_mission_id: number;

  @ApiProperty({ example: 1 })
  user_id: number;

  @ApiProperty({ example: 1 })
  mission_id: number;

  @ApiProperty({ example: 2 })
  progress: number;

  @ApiProperty({ enum: UserMissionStatusEnum })
  status: UserMissionStatusEnum;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', nullable: true })
  started_at?: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', nullable: true })
  completed_at?: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', nullable: true })
  claimed_at?: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  last_progress_at?: Date;
}

export class MissionWithDetailsDto extends MissionResponseDto {
  @ApiProperty({
    type: 'object',
    properties: {
      prank_id: { type: 'number', example: 1 },
      name: { type: 'string', example: 'Chanter en public' },
      description: { type: 'string', example: 'Chanter une chanson en public' },
    },
    nullable: true,
  })
  prank_reward?: {
    prank_id: number;
    name: string;
    description: string;
  };

  @ApiProperty({
    type: 'object',
    properties: {
      progress: { type: 'number', example: 2 },
      status: { enum: UserMissionStatusEnum },
      started_at: { type: 'string', format: 'date-time', nullable: true },
      completed_at: { type: 'string', format: 'date-time', nullable: true },
      claimed_at: { type: 'string', format: 'date-time', nullable: true },
    },
    nullable: true,
  })
  user_progress?: {
    progress: number;
    status: UserMissionStatusEnum;
    started_at?: Date;
    completed_at?: Date;
    claimed_at?: Date;
  };
}

export class UserMissionWithDetailsDto extends UserMissionResponseDto {
  @ApiProperty({ type: MissionResponseDto })
  mission: MissionResponseDto;

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
  user: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
  };
}

export class MissionStatsDto {
  @ApiProperty({ example: 50 })
  total_missions: number;

  @ApiProperty({ example: 45 })
  active_missions: number;

  @ApiProperty({ example: 12 })
  completed_missions: number;

  @ApiProperty({ example: 8 })
  available_missions: number;

  @ApiProperty({ example: 2500 })
  total_xp_rewards: number;

  @ApiProperty({ example: 1500 })
  total_coins_rewards: number;

  @ApiProperty({ example: 300 })
  total_jeton_rewards: number;

  @ApiProperty({ example: 75.5 })
  completion_rate: number;
}

export class MissionFiltersDto {
  @ApiProperty({ enum: MissionTypeEnum, required: false })
  @IsEnum(MissionTypeEnum)
  @IsOptional()
  type?: MissionTypeEnum;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  is_repeatable?: boolean;

  @ApiProperty({ example: 10, required: false })
  @IsNumber()
  @IsOptional()
  unlock_level_max?: number;

  @ApiProperty({ example: 50, required: false })
  @IsNumber()
  @IsOptional()
  xp_reward_min?: number;

  @ApiProperty({ example: 500, required: false })
  @IsNumber()
  @IsOptional()
  xp_reward_max?: number;

  @ApiProperty({ example: 25, required: false })
  @IsNumber()
  @IsOptional()
  coins_reward_min?: number;

  @ApiProperty({ example: 250, required: false })
  @IsNumber()
  @IsOptional()
  coins_reward_max?: number;

  @ApiProperty({ example: 5, required: false })
  @IsNumber()
  @IsOptional()
  jeton_reward_min?: number;

  @ApiProperty({ example: 50, required: false })
  @IsNumber()
  @IsOptional()
  jeton_reward_max?: number;
}

export class UserMissionFiltersDto {
  @ApiProperty({ enum: UserMissionStatusEnum, required: false })
  @IsEnum(UserMissionStatusEnum)
  @IsOptional()
  status?: UserMissionStatusEnum;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  user_id?: number;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  mission_id?: number;

  @ApiProperty({ enum: MissionTypeEnum, required: false })
  @IsEnum(MissionTypeEnum)
  @IsOptional()
  mission_type?: MissionTypeEnum;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  started_after?: Date;

  @ApiProperty({ example: '2023-12-31T23:59:59.999Z', required: false })
  @IsDateString()
  @IsOptional()
  started_before?: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  completed_after?: Date;

  @ApiProperty({ example: '2023-12-31T23:59:59.999Z', required: false })
  @IsDateString()
  @IsOptional()
  completed_before?: Date;
}
