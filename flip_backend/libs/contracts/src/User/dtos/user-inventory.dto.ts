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
} from 'class-validator';
import { Type } from 'class-transformer';
import { currency_type_enum, pack_type_enum } from '@prisma/client';

export class PackDetailsDto {
  @ApiProperty({ description: 'ID du pack' })
  @IsNumber()
  packId: number;

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
  imageUrl?: string;

  @ApiProperty({ description: 'Type de devise', enum: currency_type_enum })
  @IsEnum(currency_type_enum)
  costCurrencyType: currency_type_enum;

  @ApiProperty({ description: 'Coût du pack' })
  @IsNumber()
  costAmount: number;

  @ApiProperty({ description: 'Nombre de pranks attribués' })
  @IsNumber()
  numberOfPranksAwarded: number;

  @ApiProperty({ description: 'Type du pack', enum: pack_type_enum })
  @IsEnum(pack_type_enum)
  packType: pack_type_enum;

  @ApiProperty({ description: 'Disponibilité du pack' })
  @IsBoolean()
  isAvailable: boolean;

  @ApiPropertyOptional({ description: 'Niveau utilisateur requis' })
  @IsOptional()
  @IsNumber()
  requiredUserLevel?: number;
}

export class UserPackInventoryItemDto {
  @ApiProperty({ description: "ID de l'élément d'inventaire" })
  @IsNumber()
  userPackInventoryId: number;

  @ApiProperty({ description: "ID de l'utilisateur" })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'ID du pack' })
  @IsNumber()
  packId: number;

  @ApiProperty({ description: 'Quantité possédée' })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({ description: "Date d'acquisition" })
  @IsDateString()
  acquiredAt: Date;

  @ApiProperty({ description: 'Détails du pack', type: PackDetailsDto })
  @ValidateNested()
  @Type(() => PackDetailsDto)
  pack: PackDetailsDto;
}

export class PackTypeStatsDto {
  @ApiProperty({ description: 'Nombre de types de packs différents' })
  @IsNumber()
  count: number;

  @ApiProperty({ description: 'Quantité totale de packs de ce type' })
  @IsNumber()
  totalQuantity: number;
}

export class UserPackInventoryDto {
  @ApiProperty({ description: 'Nombre total de packs' })
  @IsNumber()
  totalPacks: number;

  @ApiProperty({
    description: 'Packs groupés par type',
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: { $ref: '#/components/schemas/UserPackInventoryItemDto' },
    },
  })
  packsByType: { [key in pack_type_enum]: UserPackInventoryItemDto[] };

  @ApiProperty({ description: 'Tous les packs', type: [UserPackInventoryItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserPackInventoryItemDto)
  allPacks: UserPackInventoryItemDto[];
}

export class UserPackInventoryStatsDto {
  @ApiProperty({ description: 'Nombre total de packs' })
  @IsNumber()
  totalPacks: number;

  @ApiProperty({ description: 'Valeur totale des packs' })
  @IsNumber()
  totalValue: number;

  @ApiProperty({
    description: 'Statistiques par type de pack',
    type: 'object',
    additionalProperties: { $ref: '#/components/schemas/PackTypeStatsDto' },
  })
  packsByType: { [key in pack_type_enum]: PackTypeStatsDto };
}

export class AddPackToInventoryDto {
  @ApiProperty({ description: 'ID du pack à ajouter' })
  @IsNumber()
  packId: number;

  @ApiProperty({ description: 'Quantité à ajouter', default: 1 })
  @IsNumber()
  @Min(1)
  quantity: number = 1;
}

export class AddPackToInventoryResultDto {
  @ApiProperty({ description: 'Succès de la opération' })
  @IsBoolean()
  success: boolean;

  @ApiPropertyOptional({ description: 'Élément ajouté', type: UserPackInventoryItemDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserPackInventoryItemDto)
  item?: UserPackInventoryItemDto;

  @ApiPropertyOptional({ description: "Message d'erreur" })
  @IsOptional()
  @IsString()
  error?: string;
}

export class RemovePackFromInventoryDto {
  @ApiProperty({ description: 'ID du pack à retirer' })
  @IsNumber()
  packId: number;

  @ApiProperty({ description: 'Quantité à retirer', default: 1 })
  @IsNumber()
  @Min(1)
  quantity: number = 1;
}

export class RemovePackFromInventoryResultDto {
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
