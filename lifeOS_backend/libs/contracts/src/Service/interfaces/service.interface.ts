import { ServiceStatusEnum } from '../../types/common.types';

// === INTERFACES SERVICE BASÉES SUR LE SCHÉMA PRISMA ===

export interface IService {
  service_id: number;
  provider_id: number;
  beneficiary_id: number;
  category_id?: number;
  description: string;
  jeton_value: number;
  status: ServiceStatusEnum;
  created_at?: Date;
  confirmed_at?: Date;
  repaid_at?: Date;
  repayment_service_id?: number;
  executed_prank_id_repayment?: number;
  updated_at?: Date;
}

export interface IServiceCategory {
  category_id: number;
  name: string;
  icon_url?: string;
  description?: string;
}

export interface IServiceWithDetails extends IService {
  provider: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
  };
  beneficiary: {
    user_id: number;
    username: string;
    profile_picture_url?: string;
  };
  category?: IServiceCategory;
  repayment_service?: IService;
  executed_prank_repayment?: {
    executed_prank_id: number;
    chosen_prank_id: number;
    prank_name: string;
  };
}

export interface IServiceStats {
  total_services: number;
  pending_services: number;
  confirmed_services: number;
  repaid_services: number;
  total_jeton_value: number;
  average_jeton_value: number;
}

export interface IServiceFilters {
  status?: ServiceStatusEnum;
  category_id?: number;
  provider_id?: number;
  beneficiary_id?: number;
  jeton_value_min?: number;
  jeton_value_max?: number;
  created_after?: Date;
  created_before?: Date;
}
