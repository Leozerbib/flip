import { FriendshipStatusEnum } from '../../types/common.types';

// === INTERFACES FRIENDSHIP BASÉES SUR LE SCHÉMA PRISMA ===

export interface IFriendship {
  friendship_id: number;
  user_one_id: number;
  user_two_id: number;
  status: FriendshipStatusEnum;
  action_user_id: number;
  requested_at?: Date;
  accepted_at?: Date;
  updated_at?: Date;
}

export interface IFriendshipWithDetails extends IFriendship {
  user_one: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
    level: number;
  };
  user_two: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
    level: number;
  };
  action_user: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
  };
}

export interface IFriend {
  user_id: number;
  username: string;
  profile_picture_url?: string;
  level: number;
  xp_points: number;
  game_coins: number;
  friendship_status: FriendshipStatusEnum;
  friendship_since?: Date;
  mutual_friends_count?: number;
}

export interface IFriendshipRequest {
  friendship_id: number;
  requester: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
    level: number;
  };
  requested_at: Date;
  mutual_friends_count?: number;
}

export interface IFriendshipStats {
  total_friends: number;
  pending_requests_sent: number;
  pending_requests_received: number;
  blocked_users: number;
  mutual_friends_avg: number;
  friendship_requests_today: number;
}

export interface IFriendshipFilters {
  status?: FriendshipStatusEnum;
  user_id?: number;
  action_user_id?: number;
  requested_after?: Date;
  requested_before?: Date;
  accepted_after?: Date;
  accepted_before?: Date;
}

export interface IFriendSearchFilters {
  username?: string;
  level_min?: number;
  level_max?: number;
  exclude_friends?: boolean;
  exclude_blocked?: boolean;
  mutual_friends_min?: number;
}
