export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: {
    id: string;
    username: string;
  };
}

export interface ITokenValidationResponse {
  valid: boolean;
  user?: {
    id: string;
    username: string;
    iat?: number;
    exp?: number;
  };
  error?: string;
}

export interface IRefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface ITokenPayload {
  sub: string;
  username: string;
  iat: number;
  exp: number;
  type: 'access' | 'refresh';
}

export interface ICurrentUser {
  id: string;
  username?: string;
  level?: number;
  xp_points?: number;
  game_coins?: number;
  profile_picture_url?: string;
  iat?: number;
  exp?: number;
}
