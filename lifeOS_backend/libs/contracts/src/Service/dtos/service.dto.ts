import { IsString, IsNumber, IsEnum, IsOptional, IsUrl, Min, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceStatusEnum } from '../../types/common.types';

export class CreateServiceDto {
  @ApiProperty({ example: 1, description: 'ID du bénéficiaire du service' })
  @IsNumber()
  beneficiary_id: number;

  @ApiProperty({ example: 1, description: 'ID de la catégorie de service', required: false })
  @IsNumber()
  @IsOptional()
  category_id?: number;

  @ApiProperty({ example: 'Aider à déménager', description: 'Description du service' })
  @IsString()
  description: string;

  @ApiProperty({ example: 50, description: 'Valeur en jetons du service' })
  @IsNumber()
  @Min(1)
  jeton_value: number;
}

export class UpdateServiceDto {
  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  category_id?: number;

  @ApiProperty({ example: 'Description mise à jour', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 75, required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  jeton_value?: number;

  @ApiProperty({ enum: ServiceStatusEnum, required: false })
  @IsEnum(ServiceStatusEnum)
  @IsOptional()
  status?: ServiceStatusEnum;
}

export class ServiceCategoryDto {
  @ApiProperty({ example: 1 })
  category_id: number;

  @ApiProperty({ example: 'Déménagement' })
  name: string;

  @ApiProperty({ example: 'https://example.com/icons/moving.svg', nullable: true })
  icon_url?: string;

  @ApiProperty({ example: 'Services liés au déménagement', nullable: true })
  description?: string;
}

export class CreateServiceCategoryDto {
  @ApiProperty({ example: 'Déménagement', description: 'Nom de la catégorie' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://example.com/icons/moving.svg', required: false })
  @IsUrl()
  @IsOptional()
  icon_url?: string;

  @ApiProperty({ example: 'Services liés au déménagement', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class ServiceResponseDto {
  @ApiProperty({ example: 1 })
  service_id: number;

  @ApiProperty({ example: 1 })
  provider_id: number;

  @ApiProperty({ example: 2 })
  beneficiary_id: number;

  @ApiProperty({ example: 1, nullable: true })
  category_id?: number;

  @ApiProperty({ example: 'Aider à déménager' })
  description: string;

  @ApiProperty({ example: 50 })
  jeton_value: number;

  @ApiProperty({ enum: ServiceStatusEnum })
  status: ServiceStatusEnum;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  created_at?: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', nullable: true })
  confirmed_at?: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', nullable: true })
  repaid_at?: Date;

  @ApiProperty({ example: 2, nullable: true })
  repayment_service_id?: number;

  @ApiProperty({ example: 1, nullable: true })
  executed_prank_id_repayment?: number;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updated_at?: Date;
}

export class ServiceWithDetailsDto extends ServiceResponseDto {
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
  provider: {
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
  beneficiary: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
  };

  @ApiProperty({ type: () => ServiceCategoryDto, nullable: true })
  category?: ServiceCategoryDto;
}

export class ServiceStatsDto {
  @ApiProperty({ example: 100 })
  total_services: number;

  @ApiProperty({ example: 15 })
  pending_services: number;

  @ApiProperty({ example: 50 })
  confirmed_services: number;

  @ApiProperty({ example: 35 })
  repaid_services: number;

  @ApiProperty({ example: 2500 })
  total_jeton_value: number;

  @ApiProperty({ example: 50 })
  average_jeton_value: number;
}

export class ServiceFiltersDto {
  @ApiProperty({ enum: ServiceStatusEnum, required: false })
  @IsEnum(ServiceStatusEnum)
  @IsOptional()
  status?: ServiceStatusEnum;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  category_id?: number;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  provider_id?: number;

  @ApiProperty({ example: 2, required: false })
  @IsNumber()
  @IsOptional()
  beneficiary_id?: number;

  @ApiProperty({ example: 10, required: false })
  @IsNumber()
  @IsOptional()
  jeton_value_min?: number;

  @ApiProperty({ example: 100, required: false })
  @IsNumber()
  @IsOptional()
  jeton_value_max?: number;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  created_after?: Date;

  @ApiProperty({ example: '2023-12-31T23:59:59.999Z', required: false })
  @IsDateString()
  @IsOptional()
  created_before?: Date;
}
