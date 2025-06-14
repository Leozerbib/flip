import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsString,
  ValidateNested,
  IsObject,
  IsArray,
  Min,
  Max,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { prank_rarity_enum, currency_type_enum } from '@prisma/client';
import { PackType } from '../interfaces/prank-pack.interface';

// DTOs pour les probabilités de rareté
export class RarityProbabilitiesDto {
  @ApiProperty({ description: 'Probabilité pour les pranks communs', example: 0.7 })
  @IsNumber()
  @Min(0)
  @Max(1)
  common: number;

  @ApiProperty({ description: 'Probabilité pour les pranks rares', example: 0.25 })
  @IsNumber()
  @Min(0)
  @Max(1)
  rare: number;

  @ApiProperty({ description: 'Probabilité pour les pranks extrêmes', example: 0.05 })
  @IsNumber()
  @Min(0)
  @Max(1)
  extreme: number;
}

export class PackRarityProbabilitiesDto {
  @ApiProperty({
    description: 'Probabilités de base pour toutes les cartes',
    type: RarityProbabilitiesDto,
  })
  @ValidateNested()
  @Type(() => RarityProbabilitiesDto)
  basic: RarityProbabilitiesDto;

  @ApiPropertyOptional({
    description: 'Probabilités spéciales pour la dernière carte (packs multiples)',
    type: RarityProbabilitiesDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RarityProbabilitiesDto)
  last_card?: RarityProbabilitiesDto;
}

export class PrankPackDto {
  @ApiProperty({ description: 'ID unique du pack' })
  @IsNumber()
  pack_id: number;

  @ApiProperty({ description: 'Nom du pack' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Description du pack' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: "URL de l'image du pack" })
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiProperty({ description: 'Type de devise nécessaire', enum: currency_type_enum })
  @IsEnum(currency_type_enum)
  cost_currency_type: currency_type_enum;

  @ApiProperty({ description: 'Coût du pack' })
  @IsNumber()
  cost_amount: number;

  @ApiProperty({ description: "Nombre de pranks attribués à l'ouverture" })
  @IsNumber()
  number_of_pranks_awarded: number;

  @ApiProperty({ description: 'Probabilités de rareté', type: PackRarityProbabilitiesDto })
  @ValidateNested()
  @Type(() => PackRarityProbabilitiesDto)
  rarity_probabilities: PackRarityProbabilitiesDto;

  @ApiPropertyOptional({ description: 'Indique si le pack est disponible' })
  @IsOptional()
  @IsBoolean()
  is_available?: boolean;

  @ApiPropertyOptional({ description: 'Date de début de disponibilité' })
  @IsOptional()
  @IsDateString()
  available_from?: Date;

  @ApiPropertyOptional({ description: 'Date de fin de disponibilité' })
  @IsOptional()
  @IsDateString()
  available_until?: Date;

  @ApiPropertyOptional({ description: 'Niveau utilisateur requis' })
  @IsOptional()
  @IsNumber()
  required_user_level?: number;

  @ApiProperty({ description: 'Type du pack', enum: PackType })
  @IsEnum(PackType)
  pack_type: PackType;
}

// DTO pour les packs groupés par type
export class PacksByTypeDto {
  @ApiProperty({ description: 'Packs de base', type: [PrankPackDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrankPackDto)
  basic: PrankPackDto[];

  @ApiProperty({ description: 'Packs événement', type: [PrankPackDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrankPackDto)
  event: PrankPackDto[];

  @ApiProperty({ description: 'Packs limités', type: [PrankPackDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrankPackDto)
  limited: PrankPackDto[];

  @ApiProperty({ description: 'Packs cadeaux', type: [PrankPackDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrankPackDto)
  gift: PrankPackDto[];

  @ApiProperty({ description: 'Packs promotionnels', type: [PrankPackDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrankPackDto)
  promotional: PrankPackDto[];
}

export class AwardedPrankDto {
  @ApiProperty({ description: 'ID du prank' })
  @IsNumber()
  prank_id: number;

  @ApiProperty({ description: 'Nom du prank' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Rareté du prank', enum: prank_rarity_enum })
  @IsEnum(prank_rarity_enum)
  rarity: prank_rarity_enum;

  @ApiProperty({ description: 'Description du prank' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ description: "URL de l'image du prank" })
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiProperty({ description: 'Quantité attribuée' })
  @IsNumber()
  quantity_awarded: number;

  @ApiProperty({ description: "Indique si c'est un nouveau prank pour l'utilisateur" })
  @IsBoolean()
  is_new: boolean;
}

// DTO pour un booster ouvert
export class BoosterOpeningResultDto {
  @ApiProperty({ description: 'ID du booster' })
  @IsNumber()
  booster_id: number;

  @ApiProperty({ description: 'Nom du booster' })
  @IsString()
  booster_name: string;

  @ApiProperty({ description: 'Pranks attribués dans ce booster', type: [AwardedPrankDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AwardedPrankDto)
  awarded_pranks: AwardedPrankDto[];
}

export class PackInfoDto {
  @ApiProperty({ description: 'ID du pack' })
  @IsNumber()
  pack_id: number;

  @ApiProperty({ description: 'Nom du pack' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Coût du pack' })
  @IsNumber()
  cost_amount: number;

  @ApiProperty({ description: 'Type de devise', enum: currency_type_enum })
  @IsEnum(currency_type_enum)
  cost_currency_type: currency_type_enum;
}

export class RemainingCurrencyDto {
  @ApiProperty({ description: 'Coins de jeu restants' })
  @IsNumber()
  game_coins: number;
}

export class PackOpeningResultDto {
  @ApiProperty({ description: "Indique si l'ouverture a réussi" })
  @IsBoolean()
  success: boolean;

  @ApiProperty({
    description: 'Boosters obtenus (groupés par booster)',
    type: [BoosterOpeningResultDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BoosterOpeningResultDto)
  boosters: BoosterOpeningResultDto[];

  @ApiProperty({ description: 'Devise restante après achat', type: RemainingCurrencyDto })
  @ValidateNested()
  @Type(() => RemainingCurrencyDto)
  remaining_currency: RemainingCurrencyDto;

  @ApiProperty({ description: 'Informations sur le pack ouvert', type: PackInfoDto })
  @ValidateNested()
  @Type(() => PackInfoDto)
  pack_info: PackInfoDto;
}

// DTO pour l'ouverture de multiples packs
export class MultiplePackOpeningResultDto {
  @ApiProperty({ description: "Indique si l'ouverture a réussi" })
  @IsBoolean()
  success: boolean;

  @ApiProperty({ description: 'Nombre total de packs ouverts' })
  @IsNumber()
  total_packs_opened: number;

  @ApiProperty({
    description: 'Tous les boosters obtenus de tous les packs',
    type: [BoosterOpeningResultDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BoosterOpeningResultDto)
  all_boosters: BoosterOpeningResultDto[];

  @ApiProperty({ description: 'Devise restante après achat', type: RemainingCurrencyDto })
  @ValidateNested()
  @Type(() => RemainingCurrencyDto)
  remaining_currency: RemainingCurrencyDto;

  @ApiProperty({ description: 'Informations sur le pack ouvert', type: PackInfoDto })
  @ValidateNested()
  @Type(() => PackInfoDto)
  pack_info: PackInfoDto;
}

// DTO pour les pranks disponibles dans un pack
export class PackAvailablePranksDto {
  @ApiProperty({ description: 'ID du pack' })
  @IsNumber()
  pack_id: number;

  @ApiProperty({ description: 'Nom du pack' })
  @IsString()
  pack_name: string;

  @ApiProperty({
    description: 'Pranks disponibles groupés par rareté',
    type: 'object',
    properties: {
      common: { type: 'array', items: { $ref: '#/components/schemas/AwardedPrankDto' } },
      rare: { type: 'array', items: { $ref: '#/components/schemas/AwardedPrankDto' } },
      extreme: { type: 'array', items: { $ref: '#/components/schemas/AwardedPrankDto' } },
    },
  })
  @IsObject()
  available_pranks_by_rarity: {
    common: AwardedPrankDto[];
    rare: AwardedPrankDto[];
    extreme: AwardedPrankDto[];
  };
}

export class PackOpeningErrorDto {
  @ApiProperty({ description: "Indique que l'ouverture a échoué", default: false })
  @IsBoolean()
  success: false;

  @ApiProperty({
    description: "Code d'erreur",
    enum: [
      'PACK_NOT_FOUND',
      'PACK_NOT_AVAILABLE',
      'INSUFFICIENT_LEVEL',
      'INSUFFICIENT_CURRENCY',
      'NO_ACTIVE_PRANKS',
      'INSUFFICIENT_PACKS',
    ],
  })
  @IsString()
  error_code:
    | 'PACK_NOT_FOUND'
    | 'PACK_NOT_AVAILABLE'
    | 'INSUFFICIENT_LEVEL'
    | 'INSUFFICIENT_CURRENCY'
    | 'NO_ACTIVE_PRANKS'
    | 'INSUFFICIENT_PACKS';

  @ApiProperty({ description: "Message d'erreur descriptif" })
  @IsString()
  error_message: string;
}

// DTO pour la demande d'ouverture de multiples packs
export class OpenMultiplePacksDto {
  @ApiProperty({ description: 'Nombre de packs à ouvrir', minimum: 1, maximum: 50 })
  @IsNumber()
  @Min(1)
  @Max(50)
  quantity: number;
}
