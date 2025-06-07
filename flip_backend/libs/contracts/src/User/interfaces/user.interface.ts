// === INTERFACE USER BASÉE SUR LE SCHÉMA PRISMA ===

export interface IUser {
  user_id: number;
  username: string;
  email: string;
  password_hash: string;
  profile_picture_url?: string;
  level: number;
  xp_points: number;
  game_coins: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserResponse {
  user_id: number;
  username: string;
  email: string;
  profile_picture_url?: string;
  level: number;
  xp_points: number;
  game_coins: number;
  createdAt?: Date;
  updatedAt?: Date;
  friendship_status?: string | null;
}

export interface IUserWithPassword extends IUser {
  password_hash: string;
}

export interface ICreateUserResponse {
  access_token: string;
  refresh_token: string;
  user: IUserResponse;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
  user: IUserResponse;
}

export interface IValidationResponse {
  valid: boolean;
  user?: IUserResponse;
  error?: string;
}

// === INTERFACES POUR LES RELATIONS ===

export interface IUserProfile {
  user_id: number;
  username: string;
  email: string;
  profile_picture_url?: string;
  level: number;
  xp_points: number;
  game_coins: number;
  createdAt?: Date;
}

export interface IUserStats {
  user_id: number;
  level: number;
  xp_points: number;
  game_coins: number;
  services_provided: number;
  services_received: number;
  pranks_executed: number;
  pranks_received: number;
  missions_completed: number;
  friends_count: number;
}
