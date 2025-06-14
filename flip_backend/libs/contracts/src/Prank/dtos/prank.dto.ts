import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsUrl,
  IsJSON,
  Min,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PrankTypeEnum, PrankRarityEnum, ExecutedPrankStatusEnum } from '../../types/common.types';

export class UpdatePrankDto {
  @ApiProperty({ example: 'Nom mis à jour', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Description mise à jour', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 30, required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  default_jeton_cost_equivalent?: number;

  @ApiProperty({ example: 15, required: false })
  @IsNumber()
  @IsOptional()
  xp_reward_executor?: number;

  @ApiProperty({ example: 10, required: false })
  @IsNumber()
  @IsOptional()
  xp_reward_target?: number;

  @ApiProperty({ example: 15, required: false })
  @IsNumber()
  @IsOptional()
  coins_reward_executor?: number;

  @ApiProperty({ example: 10, required: false })
  @IsNumber()
  @IsOptional()
  coins_reward_target?: number;

  @ApiProperty({ enum: PrankTypeEnum, required: false })
  @IsEnum(PrankTypeEnum)
  @IsOptional()
  type?: PrankTypeEnum;

  @ApiProperty({ example: { duration: '2 minutes' }, required: false })
  @IsJSON()
  @IsOptional()
  config_details_json?: any;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  requires_proof?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({ example: 'https://example.com/prank-image.jpg', required: false })
  @IsUrl()
  @IsOptional()
  image_url?: string;

  @ApiProperty({ enum: PrankRarityEnum, required: false })
  @IsEnum(PrankRarityEnum)
  @IsOptional()
  rarity?: PrankRarityEnum;
}

export class PrankResponseDto {
  @ApiProperty({ example: 1 })
  prank_id: number;

  @ApiProperty({ example: 'Chanter en public' })
  name: string;

  @ApiProperty({ example: 'Chanter une chanson en public pendant 1 minute' })
  description: string;

  @ApiProperty({ example: 25 })
  default_jeton_cost_equivalent: number;

  @ApiProperty({ example: 10, nullable: true })
  xp_reward_executor?: number;

  @ApiProperty({ example: 5, nullable: true })
  xp_reward_target?: number;

  @ApiProperty({ example: 10, nullable: true })
  coins_reward_executor?: number;

  @ApiProperty({ example: 5, nullable: true })
  coins_reward_target?: number;

  @ApiProperty({ enum: PrankTypeEnum })
  type: PrankTypeEnum;

  @ApiProperty({ example: { duration: '1 minute', location: 'public' }, nullable: true })
  config_details_json?: any;

  @ApiProperty({ example: true })
  requires_proof: boolean;

  @ApiProperty({ example: true })
  is_active: boolean;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  created_at?: Date;

  @ApiProperty({ example: 'https://example.com/prank-image.jpg', nullable: true })
  image_url?: string;

  @ApiProperty({ enum: PrankRarityEnum })
  rarity: PrankRarityEnum;
}

export class CreateExecutedPrankDto {
  @ApiProperty({ example: 1, description: 'ID du service à rembourser' })
  @IsNumber()
  service_being_repaid_id: number;

  @ApiProperty({ example: 1, description: 'ID du prank choisi' })
  @IsNumber()
  chosen_prank_id: number;

  @ApiProperty({ example: 2, description: 'ID de la cible' })
  @IsNumber()
  target_id: number;

  @ApiProperty({ example: 25, description: 'Valeur en jetons payée' })
  @IsNumber()
  @Min(1)
  jeton_value_paid: number;

  @ApiProperty({ enum: ExecutedPrankStatusEnum, description: 'Statut initial', required: false })
  @IsEnum(ExecutedPrankStatusEnum)
  @IsOptional()
  status?: ExecutedPrankStatusEnum;
}

export class UpdateExecutedPrankDto {
  @ApiProperty({ enum: ExecutedPrankStatusEnum, required: false })
  @IsEnum(ExecutedPrankStatusEnum)
  @IsOptional()
  status?: ExecutedPrankStatusEnum;

  @ApiProperty({ example: 'https://example.com/proof.jpg', required: false })
  @IsUrl()
  @IsOptional()
  proof_url?: string;

  @ApiProperty({ example: { location: 'Paris', duration: '2 minutes' }, required: false })
  @IsJSON()
  @IsOptional()
  execution_details_json?: any;
}

export class ExecutedPrankResponseDto {
  @ApiProperty({ example: 1 })
  executed_prank_id: number;

  @ApiProperty({ example: 1 })
  service_being_repaid_id: number;

  @ApiProperty({ example: 1 })
  chosen_prank_id: number;

  @ApiProperty({ example: 1 })
  executor_id: number;

  @ApiProperty({ example: 2 })
  target_id: number;

  @ApiProperty({ example: 25 })
  jeton_value_paid: number;

  @ApiProperty({ enum: ExecutedPrankStatusEnum })
  status: ExecutedPrankStatusEnum;

  @ApiProperty({ example: 'https://example.com/proof.jpg', nullable: true })
  proof_url?: string;

  @ApiProperty({ example: { location: 'Paris', duration: '2 minutes' }, nullable: true })
  execution_details_json?: any;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', nullable: true })
  executed_at?: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', nullable: true })
  validated_at?: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updated_at?: Date;
}

export class ExecutedPrankWithDetailsDto extends ExecutedPrankResponseDto {
  @ApiProperty({ type: PrankResponseDto })
  prank: PrankResponseDto;

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
  executor: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
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
    },
  })
  target: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
  };

  @ApiProperty({
    type: 'object',
    properties: {
      service_id: { type: 'number', example: 1 },
      description: { type: 'string', example: 'Aider à déménager' },
      jeton_value: { type: 'number', example: 50 },
    },
  })
  service_being_repaid: {
    service_id: number;
    description: string;
    jeton_value: number;
  };
}

export class PrankFiltersDto {
  @ApiProperty({ enum: PrankTypeEnum, required: false })
  @IsEnum(PrankTypeEnum)
  @IsOptional()
  type?: PrankTypeEnum;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  requires_proof?: boolean;

  @ApiProperty({ example: 10, required: false })
  @IsNumber()
  @IsOptional()
  jeton_cost_min?: number;

  @ApiProperty({ example: 100, required: false })
  @IsNumber()
  @IsOptional()
  jeton_cost_max?: number;

  @ApiProperty({ enum: PrankRarityEnum, required: false })
  @IsEnum(PrankRarityEnum)
  @IsOptional()
  rarity?: PrankRarityEnum;
}

export class PrankStatsDto {
  @ApiProperty({ example: 50 })
  total_pranks: number;

  @ApiProperty({ example: 35 })
  active_pranks: number;

  @ApiProperty({ example: 120 })
  total_executions: number;

  @ApiProperty({ example: 15 })
  pending_executions: number;

  @ApiProperty({ example: 105 })
  completed_executions: number;

  @ApiProperty({ example: 2500 })
  total_jeton_value_executed: number;

  @ApiProperty({ example: 25 })
  average_jeton_cost: number;
}

export class ExecutedPrankFiltersDto {
  @ApiProperty({ enum: ExecutedPrankStatusEnum, required: false })
  @IsEnum(ExecutedPrankStatusEnum)
  @IsOptional()
  status?: ExecutedPrankStatusEnum;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  executor_id?: number;

  @ApiProperty({ example: 2, required: false })
  @IsNumber()
  @IsOptional()
  target_id?: number;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  chosen_prank_id?: number;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  service_being_repaid_id?: number;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  executed_after?: Date;

  @ApiProperty({ example: '2023-12-31T23:59:59.999Z', required: false })
  @IsDateString()
  @IsOptional()
  executed_before?: Date;
}
