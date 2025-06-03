import { MissionTypeEnum, UserMissionStatusEnum } from '../../types/common.types';

// === INTERFACES MISSION BASÉES SUR LE SCHÉMA PRISMA ===

export interface IMission {
  mission_id: number;
  title: string;
  description?: string;
  type: MissionTypeEnum;
  target_value?: number;
  xp_reward: number;
  coins_reward: number;
  jeton_reward: number;
  prank_reward_id?: number;
  is_active: boolean;
  is_repeatable: boolean;
  repeat_cooldown_hours?: number;
  unlock_level_required?: number;
  created_at?: Date;
}

export interface IUserMission {
  user_mission_id: number;
  user_id: number;
  mission_id: number;
  progress: number;
  status: UserMissionStatusEnum;
  started_at?: Date;
  completed_at?: Date;
  claimed_at?: Date;
  last_progress_at?: Date;
}

export interface IMissionWithDetails extends IMission {
  prank_reward?: {
    prank_id: number;
    name: string;
    description: string;
  };
  user_progress?: {
    progress: number;
    status: UserMissionStatusEnum;
    started_at?: Date;
    completed_at?: Date;
    claimed_at?: Date;
  };
}

export interface IUserMissionWithDetails extends IUserMission {
  mission: IMission;
  user: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
  };
}

export interface IMissionStats {
  total_missions: number;
  active_missions: number;
  completed_missions: number;
  available_missions: number;
  total_xp_rewards: number;
  total_coins_rewards: number;
  total_jeton_rewards: number;
  completion_rate: number;
}

export interface IMissionFilters {
  type?: MissionTypeEnum;
  is_active?: boolean;
  is_repeatable?: boolean;
  unlock_level_max?: number;
  xp_reward_min?: number;
  xp_reward_max?: number;
  coins_reward_min?: number;
  coins_reward_max?: number;
  jeton_reward_min?: number;
  jeton_reward_max?: number;
}

export interface IUserMissionFilters {
  status?: UserMissionStatusEnum;
  user_id?: number;
  mission_id?: number;
  mission_type?: MissionTypeEnum;
  started_after?: Date;
  started_before?: Date;
  completed_after?: Date;
  completed_before?: Date;
}
