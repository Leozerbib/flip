class BanqueStatsModel {
  final ServiceStatsModel serviceStats;
  final PrankStatsModel prankStats;

  BanqueStatsModel({required this.serviceStats, required this.prankStats});

  factory BanqueStatsModel.fromJson(Map<String, dynamic> json) {
    return BanqueStatsModel(
      serviceStats: ServiceStatsModel.fromJson(json['service_stats'] ?? {}),
      prankStats: PrankStatsModel.fromJson(json['prank_stats'] ?? {}),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'service_stats': serviceStats.toJson(),
      'prank_stats': prankStats.toJson(),
    };
  }
}

class ServiceStatsModel {
  final int totalServicesProvided;
  final int totalServicesReceived;
  final int pendingServicesAsProvider;
  final int pendingServicesAsClient;
  final int totalJetonsEarned;
  final int totalJetonsSpent;
  final int currentBalance;

  ServiceStatsModel({
    required this.totalServicesProvided,
    required this.totalServicesReceived,
    required this.pendingServicesAsProvider,
    required this.pendingServicesAsClient,
    required this.totalJetonsEarned,
    required this.totalJetonsSpent,
    required this.currentBalance,
  });

  factory ServiceStatsModel.fromJson(Map<String, dynamic> json) {
    return ServiceStatsModel(
      totalServicesProvided: json['total_services_provided'] ?? 0,
      totalServicesReceived: json['total_services_received'] ?? 0,
      pendingServicesAsProvider: json['pending_services_as_provider'] ?? 0,
      pendingServicesAsClient: json['pending_services_as_client'] ?? 0,
      totalJetonsEarned: json['total_jetons_earned'] ?? 0,
      totalJetonsSpent: json['total_jetons_spent'] ?? 0,
      currentBalance: json['current_balance'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'total_services_provided': totalServicesProvided,
      'total_services_received': totalServicesReceived,
      'pending_services_as_provider': pendingServicesAsProvider,
      'pending_services_as_client': pendingServicesAsClient,
      'total_jetons_earned': totalJetonsEarned,
      'total_jetons_spent': totalJetonsSpent,
      'current_balance': currentBalance,
    };
  }
}

class PrankStatsModel {
  final int totalPranksExecuted;
  final int totalPranksReceived;
  final int pendingPranksAsExecutor;
  final int pendingPranksAsTarget;
  final int totalJetonsFromPranks;
  final int totalJetonsPaidForPranks;

  PrankStatsModel({
    required this.totalPranksExecuted,
    required this.totalPranksReceived,
    required this.pendingPranksAsExecutor,
    required this.pendingPranksAsTarget,
    required this.totalJetonsFromPranks,
    required this.totalJetonsPaidForPranks,
  });

  factory PrankStatsModel.fromJson(Map<String, dynamic> json) {
    return PrankStatsModel(
      totalPranksExecuted: json['total_pranks_executed'] ?? 0,
      totalPranksReceived: json['total_pranks_received'] ?? 0,
      pendingPranksAsExecutor: json['pending_pranks_as_executor'] ?? 0,
      pendingPranksAsTarget: json['pending_pranks_as_target'] ?? 0,
      totalJetonsFromPranks: json['total_jetons_from_pranks'] ?? 0,
      totalJetonsPaidForPranks: json['total_jetons_paid_for_pranks'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'total_pranks_executed': totalPranksExecuted,
      'total_pranks_received': totalPranksReceived,
      'pending_pranks_as_executor': pendingPranksAsExecutor,
      'pending_pranks_as_target': pendingPranksAsTarget,
      'total_jetons_from_pranks': totalJetonsFromPranks,
      'total_jetons_paid_for_pranks': totalJetonsPaidForPranks,
    };
  }
}
