import { PrankTypeEnum, ExecutedPrankStatusEnum } from '../../types/common.types';

// === INTERFACES PRANK BASÉES SUR LE SCHÉMA PRISMA ===

export interface IPrank {
  prank_id: number;
  name: string;
  description: string;
  default_jeton_cost_equivalent: number;
  xp_reward_executor?: number;
  xp_reward_target?: number;
  coins_reward_executor?: number;
  coins_reward_target?: number;
  type: PrankTypeEnum;
  config_details_json?: any;
  requires_proof: boolean;
  is_active: boolean;
  created_at?: Date;
}

export interface IExecutedPrank {
  executed_prank_id: number;
  service_being_repaid_id: number;
  chosen_prank_id: number;
  executor_id: number;
  target_id: number;
  jeton_value_paid: number;
  status: ExecutedPrankStatusEnum;
  proof_url?: string;
  execution_details_json?: any;
  executed_at?: Date;
  validated_at?: Date;
  updated_at?: Date;
}

export interface IExecutedPrankWithDetails extends IExecutedPrank {
  prank: IPrank;
  executor: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
  };
  target: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
  };
  service_being_repaid: {
    service_id: number;
    description: string;
    jeton_value: number;
  };
}

export interface IPrankStats {
  total_pranks: number;
  active_pranks: number;
  total_executions: number;
  pending_executions: number;
  completed_executions: number;
  total_jeton_value_executed: number;
  average_jeton_cost: number;
}

export interface IPrankFilters {
  type?: PrankTypeEnum;
  is_active?: boolean;
  requires_proof?: boolean;
  jeton_cost_min?: number;
  jeton_cost_max?: number;
}

export interface IExecutedPrankFilters {
  status?: ExecutedPrankStatusEnum;
  executor_id?: number;
  target_id?: number;
  chosen_prank_id?: number;
  service_being_repaid_id?: number;
  executed_after?: Date;
  executed_before?: Date;
}
