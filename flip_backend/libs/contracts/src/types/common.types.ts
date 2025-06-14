export type ApiResponse<T> = T;

export interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export interface SuccessResponse<T = any> {
  success: boolean;
  data: T;
}

// === ENUMS du schéma Prisma ===

export enum ExecutedPrankStatusEnum {
  PROPOSED_BY_DEBTOR = 'proposed_by_debtor',
  PROPOSED_BY_CREDITOR = 'proposed_by_creditor',
  ACCEPTED_BY_TARGET = 'accepted_by_target',
  EXECUTED_PENDING_VALIDATION = 'executed_pending_validation',
  VALIDATED_BY_TARGET_COMPLETED = 'validated_by_target_completed',
  REJECTED = 'rejected',
  FAILED_EXECUTION = 'failed_execution',
}

export enum FriendshipStatusEnum {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  BLOCKED = 'blocked',
}

export enum MissionTypeEnum {
  RENDER_SERVICES = 'render_services',
  REPAY_DEBTS_PRANK = 'repay_debts_prank',
  REPAY_DEBTS_SERVICE = 'repay_debts_service',
  INVITE_FRIENDS = 'invite_friends',
  REACH_LEVEL = 'reach_level',
  USE_X_PRANK_TYPE = 'use_x_prank_type',
  PERFORM_X_SERVICES_CATEGORY = 'perform_x_services_category',
}

export enum PrankTypeEnum {
  DECLARATIVE = 'declarative',
  IN_APP_COSMETIC = 'in_app_cosmetic',
  IN_APP_LOCK = 'in_app_lock',
  NOTIFICATION_SPAM = 'notification_spam',
  EXTERNAL_ACTION = 'external_action',
}

export enum PrankRarityEnum {
  COMMON = 'common',
  RARE = 'rare',
  EXTREME = 'extreme',
}

export enum ServiceStatusEnum {
  PENDING_CONFIRMATION = 'pending_confirmation',
  CONFIRMED_UNPAID = 'confirmed_unpaid',
  REPAID_BY_SERVICE = 'repaid_by_service',
  REPAID_BY_PRANK = 'repaid_by_prank',
  CANCELLED = 'cancelled',
  DISPUTED = 'disputed',
}

export enum ServiceTypeEnum {
  SERVICE = 'service',
  PRANK = 'prank',
}

export enum UserMissionStatusEnum {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED_PENDING_CLAIM = 'completed_pending_claim',
  CLAIMED = 'claimed',
  EXPIRED = 'expired',
}

// === INTERFACES UTILITAIRES ===

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DateRange {
  from: Date;
  to: Date;
}
