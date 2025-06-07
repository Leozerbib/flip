import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../User/dtos/user.dto';

export class LoginDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email de connexion',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'motdepasse123', description: 'Mot de passe' })
  @IsString()
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  refresh_token: string;

  @ApiProperty({ example: 3600, description: 'Durée de validité en secondes' })
  expires_in: number;

  @ApiProperty({ type: () => UserResponseDto })
  user: UserResponseDto;
}

export class TokenValidationDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  @IsString()
  token: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: "Refresh token pour renouveler le token d'accès",
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class RefreshTokenResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  refresh_token: string;

  @ApiProperty({ example: 3600, description: 'Durée de validité en secondes' })
  expires_in: number;
}

export class VerifyGoogleIdTokenDto {
  @ApiProperty({
    description: 'Google ID Token à vérifier',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjRmNzJkN...',
  })
  @IsString()
  @IsNotEmpty()
  idToken: string;
}
