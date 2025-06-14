import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsDateString,
  IsString,
  IsBoolean,
  IsOptional,
  IsEnum,
  ValidateNested,
  IsArray,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { prank_rarity_enum, prank_type_enum } from '@prisma/client';

export class PrankDetailsDto {
  @ApiProperty({ description: 'ID du prank' })
  @IsNumber()
  prankId: number;

  @ApiProperty({ description: 'Nom du prank' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description du prank' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ description: "URL de l'image du prank" })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ description: 'Type du prank', enum: prank_type_enum })
  @IsEnum(prank_type_enum)
  type: prank_type_enum;

  @ApiProperty({ description: 'Rareté du prank', enum: prank_rarity_enum })
  @IsEnum(prank_rarity_enum)
  rarity: prank_rarity_enum;

  @ApiProperty({ description: 'Coût équivalent en jetons' })
  @IsNumber()
  defaultJetonCostEquivalent: number;

  @ApiPropertyOptional({ description: "XP pour l'exécuteur" })
  @IsOptional()
  @IsNumber()
  xpRewardExecutor?: number;

  @ApiPropertyOptional({ description: 'XP pour la cible' })
  @IsOptional()
  @IsNumber()
  xpRewardTarget?: number;

  @ApiPropertyOptional({ description: "Coins pour l'exécuteur" })
  @IsOptional()
  @IsNumber()
  coinsRewardExecutor?: number;

  @ApiPropertyOptional({ description: 'Coins pour la cible' })
  @IsOptional()
  @IsNumber()
  coinsRewardTarget?: number;

  @ApiProperty({ description: 'Nécessite une preuve' })
  @IsBoolean()
  requiresProof: boolean;

  @ApiProperty({ description: 'Actif ou non' })
  @IsBoolean()
  isActive: boolean;
}

export class UserPrankItemDto {
  @ApiProperty({ description: "ID de l'élément prank utilisateur" })
  @IsNumber()
  userPrankId: number;

  @ApiProperty({ description: "ID de l'utilisateur" })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'ID du prank' })
  @IsNumber()
  prankId: number;

  @ApiProperty({ description: 'Quantité possédée' })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({ description: "Date d'obtention" })
  @IsDateString()
  obtainedAt: Date;

  @ApiProperty({ description: 'Détails du prank', type: PrankDetailsDto })
  @ValidateNested()
  @Type(() => PrankDetailsDto)
  prank: PrankDetailsDto;
}

export class PrankRarityStatsDto {
  @ApiProperty({ description: 'Nombre de pranks différents de cette rareté' })
  @IsNumber()
  count: number;

  @ApiProperty({ description: 'Quantité totale de pranks de cette rareté' })
  @IsNumber()
  totalQuantity: number;
}

export class PrankTypeStatsDto {
  @ApiProperty({ description: 'Nombre de pranks différents de ce type' })
  @IsNumber()
  count: number;

  @ApiProperty({ description: 'Quantité totale de pranks de ce type' })
  @IsNumber()
  totalQuantity: number;
}

export class UserPranksCollectionDto {
  @ApiProperty({ description: 'Nombre total de pranks différents' })
  @IsNumber()
  totalPranks: number;

  @ApiProperty({
    description: 'Pranks groupés par rareté',
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: { $ref: '#/components/schemas/UserPrankItemDto' },
    },
  })
  pranksByRarity: { [key in prank_rarity_enum]: UserPrankItemDto[] };

  @ApiProperty({
    description: 'Pranks groupés par type',
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: { $ref: '#/components/schemas/UserPrankItemDto' },
    },
  })
  pranksByType: { [key in prank_type_enum]: UserPrankItemDto[] };

  @ApiProperty({ description: 'Tous les pranks', type: [UserPrankItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserPrankItemDto)
  allPranks: UserPrankItemDto[];
}

export class UserPranksStatsDto {
  @ApiProperty({ description: 'Nombre total de pranks différents' })
  @IsNumber()
  totalPranks: number;

  @ApiProperty({ description: 'Quantité totale de pranks' })
  @IsNumber()
  totalQuantity: number;

  @ApiProperty({ description: 'Valeur totale en jetons' })
  @IsNumber()
  totalValue: number;

  @ApiProperty({
    description: 'Statistiques par rareté',
    type: 'object',
    additionalProperties: { $ref: '#/components/schemas/PrankRarityStatsDto' },
  })
  pranksByRarity: { [key in prank_rarity_enum]: PrankRarityStatsDto };

  @ApiProperty({
    description: 'Statistiques par type',
    type: 'object',
    additionalProperties: { $ref: '#/components/schemas/PrankTypeStatsDto' },
  })
  pranksByType: { [key in prank_type_enum]: PrankTypeStatsDto };

  @ApiProperty({ description: 'Pourcentage de collection complète' })
  @IsNumber()
  @Min(0)
  @Max(100)
  completionPercentage: number;
}

export class UserPrankFiltersDto {
  @ApiPropertyOptional({
    description: 'Filtrer par rareté',
    enum: prank_rarity_enum,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(prank_rarity_enum, { each: true })
  rarity?: prank_rarity_enum[];

  @ApiPropertyOptional({ description: 'Filtrer par type', enum: prank_type_enum, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(prank_type_enum, { each: true })
  type?: prank_type_enum[];

  @ApiPropertyOptional({
    description: 'Trier par',
    enum: ['rarity', 'type', 'quantity', 'obtainedAt', 'name'],
    default: 'obtainedAt',
  })
  @IsOptional()
  @IsEnum(['rarity', 'type', 'quantity', 'obtainedAt', 'name'])
  sortBy?: 'rarity' | 'type' | 'quantity' | 'obtainedAt' | 'name';

  @ApiPropertyOptional({ description: 'Ordre de tri', enum: ['asc', 'desc'], default: 'desc' })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @ApiPropertyOptional({ description: 'Limite de résultats', default: 50 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({ description: 'Décalage pour pagination', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;
}

export class AddPrankToCollectionDto {
  @ApiProperty({ description: 'ID du prank à ajouter' })
  @IsNumber()
  prankId: number;

  @ApiProperty({ description: 'Quantité à ajouter', default: 1 })
  @IsNumber()
  @Min(1)
  quantity: number = 1;
}

export class AddPrankToCollectionResultDto {
  @ApiProperty({ description: 'Succès de la opération' })
  @IsBoolean()
  success: boolean;

  @ApiPropertyOptional({ description: 'Élément ajouté', type: UserPrankItemDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserPrankItemDto)
  item?: UserPrankItemDto;

  @ApiProperty({ description: "Premier prank de ce type pour l'utilisateur" })
  @IsBoolean()
  isNew: boolean;

  @ApiPropertyOptional({ description: "Message d'erreur" })
  @IsOptional()
  @IsString()
  error?: string;
}

export class RemovePrankFromCollectionDto {
  @ApiProperty({ description: 'ID du prank à retirer' })
  @IsNumber()
  prankId: number;

  @ApiProperty({ description: 'Quantité à retirer', default: 1 })
  @IsNumber()
  @Min(1)
  quantity: number = 1;
}

export class RemovePrankFromCollectionResultDto {
  @ApiProperty({ description: 'Succès de la opération' })
  @IsBoolean()
  success: boolean;

  @ApiProperty({ description: 'Quantité restante' })
  @IsNumber()
  remainingQuantity: number;

  @ApiPropertyOptional({ description: "Message d'erreur" })
  @IsOptional()
  @IsString()
  error?: string;
}
