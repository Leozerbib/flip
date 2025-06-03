import { IsEmail, IsString, MinLength, IsOptional, IsNumber, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: "Nom d'utilisateur unique" })
  @IsString()
  username: string;

  @ApiProperty({ example: 'john.doe@example.com', description: "Email de l'utilisateur" })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'motdepasse123',
    minLength: 6,
    description: 'Mot de passe (min 6 caractères)',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: "URL de l'image de profil",
    required: false,
  })
  @IsUrl()
  @IsOptional()
  profile_picture_url?: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'john_doe', required: false })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ example: 'john.doe@example.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  profile_picture_url?: string;
}

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  user_id: number;

  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', nullable: true })
  profile_picture_url?: string;

  @ApiProperty({ example: 1 })
  level: number;

  @ApiProperty({ example: 0 })
  xp_points: number;

  @ApiProperty({ example: 0 })
  game_coins: number;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt?: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updatedAt?: Date;
}

export class UserStatsDto {
  @ApiProperty({ example: 1 })
  user_id: number;

  @ApiProperty({ example: 5 })
  level: number;

  @ApiProperty({ example: 1250 })
  xp_points: number;

  @ApiProperty({ example: 500 })
  game_coins: number;

  @ApiProperty({ example: 10 })
  services_provided: number;

  @ApiProperty({ example: 8 })
  services_received: number;

  @ApiProperty({ example: 3 })
  pranks_executed: number;

  @ApiProperty({ example: 2 })
  pranks_received: number;

  @ApiProperty({ example: 15 })
  missions_completed: number;

  @ApiProperty({ example: 25 })
  friends_count: number;
}

export class UserProfileDto {
  @ApiProperty({ example: 1 })
  user_id: number;

  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', nullable: true })
  profile_picture_url?: string;

  @ApiProperty({ example: 5 })
  level: number;

  @ApiProperty({ example: 1250 })
  xp_points: number;

  @ApiProperty({ example: 500 })
  game_coins: number;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt?: Date;
}
