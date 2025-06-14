import 'service_model.dart';

class PrankModel {
  final int prankId;
  final String name;
  final String description;
  final int defaultJetonCostEquivalent;
  final int? xpRewardExecutor;
  final int? xpRewardTarget;
  final int? coinsRewardExecutor;
  final int? coinsRewardTarget;
  final PrankType type;
  final Map<String, dynamic>? configDetailsJson;
  final bool requiresProof;
  final bool isActive;
  final DateTime createdAt;
  final String? imageUrl;
  final PrankRarity rarity;

  PrankModel({
    required this.prankId,
    required this.name,
    required this.description,
    required this.defaultJetonCostEquivalent,
    this.xpRewardExecutor,
    this.xpRewardTarget,
    this.coinsRewardExecutor,
    this.coinsRewardTarget,
    required this.type,
    this.configDetailsJson,
    required this.requiresProof,
    required this.isActive,
    required this.createdAt,
    this.imageUrl,
    required this.rarity,
  });

  factory PrankModel.fromJson(Map<String, dynamic> json) {
    return PrankModel(
      prankId: json['prank_id'] ?? 0,
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      defaultJetonCostEquivalent: json['default_jeton_cost_equivalent'] ?? 0,
      xpRewardExecutor: json['xp_reward_executor'],
      xpRewardTarget: json['xp_reward_target'],
      coinsRewardExecutor: json['coins_reward_executor'],
      coinsRewardTarget: json['coins_reward_target'],
      type: _parsePrankType(json['type']),
      configDetailsJson: json['config_details_json'],
      requiresProof: json['requires_proof'] ?? false,
      isActive: json['is_active'] ?? true,
      createdAt: DateTime.tryParse(json['created_at'] ?? '') ?? DateTime.now(),
      imageUrl: json['image_url'],
      rarity: _parsePrankRarity(json['rarity']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'prank_id': prankId,
      'name': name,
      'description': description,
      'default_jeton_cost_equivalent': defaultJetonCostEquivalent,
      'xp_reward_executor': xpRewardExecutor,
      'xp_reward_target': xpRewardTarget,
      'coins_reward_executor': coinsRewardExecutor,
      'coins_reward_target': coinsRewardTarget,
      'type': type.value,
      'config_details_json': configDetailsJson,
      'requires_proof': requiresProof,
      'is_active': isActive,
      'created_at': createdAt.toIso8601String(),
      'image_url': imageUrl,
      'rarity': rarity.value,
    };
  }

  static PrankType _parsePrankType(String? type) {
    switch (type) {
      case 'declarative':
        return PrankType.declarative;
      case 'in_app_cosmetic':
        return PrankType.inAppCosmetic;
      case 'in_app_lock':
        return PrankType.inAppLock;
      case 'notification_spam':
        return PrankType.notificationSpam;
      case 'external_action':
        return PrankType.externalAction;
      default:
        return PrankType.declarative;
    }
  }

  static PrankRarity _parsePrankRarity(String? rarity) {
    switch (rarity) {
      case 'common':
        return PrankRarity.common;
      case 'rare':
        return PrankRarity.rare;
      case 'extreme':
        return PrankRarity.extreme;
      default:
        return PrankRarity.common;
    }
  }

  PrankModel copyWith({
    int? prankId,
    String? name,
    String? description,
    int? defaultJetonCostEquivalent,
    int? xpRewardExecutor,
    int? xpRewardTarget,
    int? coinsRewardExecutor,
    int? coinsRewardTarget,
    PrankType? type,
    Map<String, dynamic>? configDetailsJson,
    bool? requiresProof,
    bool? isActive,
    DateTime? createdAt,
    String? imageUrl,
    PrankRarity? rarity,
  }) {
    return PrankModel(
      prankId: prankId ?? this.prankId,
      name: name ?? this.name,
      description: description ?? this.description,
      defaultJetonCostEquivalent:
          defaultJetonCostEquivalent ?? this.defaultJetonCostEquivalent,
      xpRewardExecutor: xpRewardExecutor ?? this.xpRewardExecutor,
      xpRewardTarget: xpRewardTarget ?? this.xpRewardTarget,
      coinsRewardExecutor: coinsRewardExecutor ?? this.coinsRewardExecutor,
      coinsRewardTarget: coinsRewardTarget ?? this.coinsRewardTarget,
      type: type ?? this.type,
      configDetailsJson: configDetailsJson ?? this.configDetailsJson,
      requiresProof: requiresProof ?? this.requiresProof,
      isActive: isActive ?? this.isActive,
      createdAt: createdAt ?? this.createdAt,
      imageUrl: imageUrl ?? this.imageUrl,
      rarity: rarity ?? this.rarity,
    );
  }
}

class ExecutedPrankModel {
  final int executedPrankId;
  final int serviceCellBeingRepaidId;
  final int chosenPrankId;
  final int executorId;
  final int targetId;
  final int jetonValuePaid;
  final ExecutedPrankStatus status;
  final String? proofUrl;
  final Map<String, dynamic>? executionDetailsJson;
  final DateTime? executedAt;
  final DateTime? validatedAt;
  final DateTime updatedAt;

  ExecutedPrankModel({
    required this.executedPrankId,
    required this.serviceCellBeingRepaidId,
    required this.chosenPrankId,
    required this.executorId,
    required this.targetId,
    required this.jetonValuePaid,
    required this.status,
    this.proofUrl,
    this.executionDetailsJson,
    this.executedAt,
    this.validatedAt,
    required this.updatedAt,
  });

  factory ExecutedPrankModel.fromJson(Map<String, dynamic> json) {
    return ExecutedPrankModel(
      executedPrankId: json['executed_prank_id'] ?? 0,
      serviceCellBeingRepaidId: json['service_being_repaid_id'] ?? 0,
      chosenPrankId: json['chosen_prank_id'] ?? 0,
      executorId: json['executor_id'] ?? 0,
      targetId: json['target_id'] ?? 0,
      jetonValuePaid: json['jeton_value_paid'] ?? 0,
      status: _parseExecutedPrankStatus(json['status']),
      proofUrl: json['proof_url'],
      executionDetailsJson: json['execution_details_json'],
      executedAt: json['executed_at'] != null
          ? DateTime.tryParse(json['executed_at'])
          : null,
      validatedAt: json['validated_at'] != null
          ? DateTime.tryParse(json['validated_at'])
          : null,
      updatedAt: DateTime.tryParse(json['updated_at'] ?? '') ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'executed_prank_id': executedPrankId,
      'service_being_repaid_id': serviceCellBeingRepaidId,
      'chosen_prank_id': chosenPrankId,
      'executor_id': executorId,
      'target_id': targetId,
      'jeton_value_paid': jetonValuePaid,
      'status': status.value,
      'proof_url': proofUrl,
      'execution_details_json': executionDetailsJson,
      'executed_at': executedAt?.toIso8601String(),
      'validated_at': validatedAt?.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }

  static ExecutedPrankStatus _parseExecutedPrankStatus(String? status) {
    switch (status) {
      case 'proposed_by_debtor':
        return ExecutedPrankStatus.proposedByDebtor;
      case 'proposed_by_creditor':
        return ExecutedPrankStatus.proposedByCreditor;
      case 'accepted_by_target':
        return ExecutedPrankStatus.acceptedByTarget;
      case 'executed_pending_validation':
        return ExecutedPrankStatus.executedPendingValidation;
      case 'validated_by_target_completed':
        return ExecutedPrankStatus.validatedByTargetCompleted;
      case 'rejected':
        return ExecutedPrankStatus.rejected;
      case 'failed_execution':
        return ExecutedPrankStatus.failedExecution;
      default:
        return ExecutedPrankStatus.proposedByDebtor;
    }
  }

  ExecutedPrankModel copyWith({
    int? executedPrankId,
    int? serviceCellBeingRepaidId,
    int? chosenPrankId,
    int? executorId,
    int? targetId,
    int? jetonValuePaid,
    ExecutedPrankStatus? status,
    String? proofUrl,
    Map<String, dynamic>? executionDetailsJson,
    DateTime? executedAt,
    DateTime? validatedAt,
    DateTime? updatedAt,
  }) {
    return ExecutedPrankModel(
      executedPrankId: executedPrankId ?? this.executedPrankId,
      serviceCellBeingRepaidId:
          serviceCellBeingRepaidId ?? this.serviceCellBeingRepaidId,
      chosenPrankId: chosenPrankId ?? this.chosenPrankId,
      executorId: executorId ?? this.executorId,
      targetId: targetId ?? this.targetId,
      jetonValuePaid: jetonValuePaid ?? this.jetonValuePaid,
      status: status ?? this.status,
      proofUrl: proofUrl ?? this.proofUrl,
      executionDetailsJson: executionDetailsJson ?? this.executionDetailsJson,
      executedAt: executedAt ?? this.executedAt,
      validatedAt: validatedAt ?? this.validatedAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}

class ExecutedPrankWithDetailsModel {
  final ExecutedPrankModel executedPrank;
  final PrankModel prank;
  final UserInfo executor;
  final UserInfo target;
  final ServiceInfo serviceBeingRepaid;

  ExecutedPrankWithDetailsModel({
    required this.executedPrank,
    required this.prank,
    required this.executor,
    required this.target,
    required this.serviceBeingRepaid,
  });

  factory ExecutedPrankWithDetailsModel.fromJson(Map<String, dynamic> json) {
    return ExecutedPrankWithDetailsModel(
      executedPrank: ExecutedPrankModel.fromJson(json),
      prank: PrankModel.fromJson(json['prank'] ?? {}),
      executor: UserInfo.fromJson(json['executor'] ?? {}),
      target: UserInfo.fromJson(json['target'] ?? {}),
      serviceBeingRepaid: ServiceInfo.fromJson(
        json['service_being_repaid'] ?? {},
      ),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      ...executedPrank.toJson(),
      'prank': prank.toJson(),
      'executor': executor.toJson(),
      'target': target.toJson(),
      'service_being_repaid': serviceBeingRepaid.toJson(),
    };
  }
}

class ServiceInfo {
  final int serviceId;
  final String description;
  final int jetonValue;

  ServiceInfo({
    required this.serviceId,
    required this.description,
    required this.jetonValue,
  });

  factory ServiceInfo.fromJson(Map<String, dynamic> json) {
    return ServiceInfo(
      serviceId: json['service_id'] ?? 0,
      description: json['description'] ?? '',
      jetonValue: json['jeton_value'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'service_id': serviceId,
      'description': description,
      'jeton_value': jetonValue,
    };
  }
}

// Enums mis à jour pour correspondre au schéma Prisma
enum PrankType {
  declarative('declarative'),
  inAppCosmetic('in_app_cosmetic'),
  inAppLock('in_app_lock'),
  notificationSpam('notification_spam'),
  externalAction('external_action');

  const PrankType(this.value);
  final String value;
}

enum PrankRarity {
  common('common'),
  rare('rare'),
  extreme('extreme');

  const PrankRarity(this.value);
  final String value;
}

enum ExecutedPrankStatus {
  proposedByDebtor('proposed_by_debtor'),
  proposedByCreditor('proposed_by_creditor'),
  acceptedByTarget('accepted_by_target'),
  executedPendingValidation('executed_pending_validation'),
  validatedByTargetCompleted('validated_by_target_completed'),
  rejected('rejected'),
  failedExecution('failed_execution');

  const ExecutedPrankStatus(this.value);
  final String value;
}

// DTOs pour les requêtes
class CreateExecutedPrankDto {
  final int chosenPrankId;
  final int targetId;
  final int serviceBeingRepaidId;
  final int jetonValuePaid;
  final Map<String, dynamic>? executionDetailsJson;

  CreateExecutedPrankDto({
    required this.chosenPrankId,
    required this.targetId,
    required this.serviceBeingRepaidId,
    required this.jetonValuePaid,
    this.executionDetailsJson,
  });

  Map<String, dynamic> toJson() {
    return {
      'chosen_prank_id': chosenPrankId,
      'target_id': targetId,
      'service_being_repaid_id': serviceBeingRepaidId,
      'jeton_value_paid': jetonValuePaid,
      if (executionDetailsJson != null)
        'execution_details_json': executionDetailsJson,
    };
  }
}

class UpdateExecutedPrankDto {
  final ExecutedPrankStatus? status;
  final String? proofUrl;
  final Map<String, dynamic>? executionDetailsJson;

  UpdateExecutedPrankDto({
    this.status,
    this.proofUrl,
    this.executionDetailsJson,
  });

  Map<String, dynamic> toJson() {
    return {
      if (status != null) 'status': status!.value,
      if (proofUrl != null) 'proof_url': proofUrl,
      if (executionDetailsJson != null)
        'execution_details_json': executionDetailsJson,
    };
  }
}
