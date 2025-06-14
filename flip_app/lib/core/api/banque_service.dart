import 'dart:convert';
import 'package:dio/dio.dart';
import '../../data/models/models.dart';
import '../utils/logger.dart';
import 'api_client.dart';

class BanqueService {
  static final Dio _dio = ApiClient.dio;

  // Récupérer les services d'un utilisateur
  static Future<List<ServiceModel>?> getUserServices({
    int page = 1,
    int limit = 20,
  }) async {
    try {
      AppLogger.info('Récupération des services utilisateur banque');

      final response = await _dio.get(
        '/api/banque/user-services',
        queryParameters: {'page': page, 'limit': limit},
      );

      if (response.statusCode == 200) {
        final List<dynamic> servicesJson = response.data ?? [];
        final services = servicesJson
            .map((json) => ServiceModel.fromJson(json))
            .toList();

        AppLogger.info(
          'Services utilisateur banque récupérés: ${services.length}',
        );
        return services;
      }
      return [];
    } catch (e) {
      AppLogger.error('Erreur récupération services utilisateur banque: $e');
      rethrow;
    }
  }

  // Récupérer les pranks d'un utilisateur
  static Future<List<ExecutedPrankWithDetailsModel>?> getUserPranks({
    int page = 1,
    int limit = 20,
  }) async {
    try {
      AppLogger.info('Récupération des pranks utilisateur banque');

      final response = await _dio.get(
        '/api/banque/user-pranks',
        queryParameters: {'page': page, 'limit': limit},
      );

      if (response.statusCode == 200) {
        final List<dynamic> pranksJson = response.data ?? [];
        final pranks = pranksJson
            .map((json) => ExecutedPrankWithDetailsModel.fromJson(json))
            .toList();

        AppLogger.info('Pranks utilisateur banque récupérés: ${pranks.length}');
        return pranks;
      }
      return [];
    } catch (e) {
      AppLogger.error('Erreur récupération pranks utilisateur banque: $e');
      rethrow;
    }
  }

  // Rembourser un service avec un prank
  static Future<ServiceModel?> repayServiceWithPrank({
    required int serviceId,
    required int prankId,
    required int targetId,
    Map<String, dynamic>? executionDetails,
  }) async {
    try {
      AppLogger.info(
        'Remboursement service avec prank - Service: $serviceId, Prank: $prankId',
      );

      final data = <String, dynamic>{
        'prank_id': prankId,
        'target_id': targetId,
      };

      if (executionDetails != null) {
        data['execution_details'] = executionDetails;
      }

      final response = await _dio.post(
        '/api/banque/repay-service-with-prank/$serviceId',
        data: data,
      );

      if (response.statusCode == 200) {
        AppLogger.info('Service remboursé avec prank avec succès');
        return ServiceModel.fromJson(response.data);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur remboursement service avec prank: $e');
      rethrow;
    }
  }

  // Récupérer les statistiques du dashboard
  static Future<BanqueStatsModel?> getDashboardStats() async {
    try {
      AppLogger.info('Récupération des statistiques dashboard banque (simulé)');

      // TODO: Vérifier pourquoi l'endpoint /api/banque/dashboard/stats retourne 404
      // En attendant, retourner null pour éviter les erreurs
      return null;
    } catch (e) {
      AppLogger.error('Erreur récupération statistiques dashboard banque: $e');
      rethrow;
    }
  }

  // Health check du service banque
  static Future<BanqueHealthModel?> getHealthCheck() async {
    try {
      AppLogger.info('Vérification santé service banque');

      final response = await _dio.get('/api/banque/health');

      if (response.statusCode == 200) {
        AppLogger.info('Service banque en bonne santé');
        return BanqueHealthModel.fromJson(response.data);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur health check banque: $e');
      rethrow;
    }
  }

  // Récupérer le solde actuel de l'utilisateur
  static Future<UserBalanceModel?> getUserBalance() async {
    try {
      AppLogger.info('Récupération solde utilisateur banque (simulé)');

      // TODO: Implémenter l'endpoint balance côté backend
      // En attendant, retourner des données simulées
      return UserBalanceModel(
        jetonBalance: 150,
        coinsBalance: 500,
        xpPoints: 1250,
        level: 5,
        lastUpdated: DateTime.now(),
      );
    } catch (e) {
      AppLogger.error('Erreur récupération solde banque: $e');
      rethrow;
    }
  }

  // Récupérer l'historique des transactions
  static Future<List<TransactionModel>?> getTransactionHistory({
    String? type,
    DateTime? startDate,
    DateTime? endDate,
    int page = 1,
    int limit = 20,
  }) async {
    try {
      AppLogger.info('Récupération historique transactions banque');

      final queryParams = <String, dynamic>{};

      if (type != null) queryParams['type'] = type;
      if (startDate != null)
        queryParams['start_date'] = startDate.toIso8601String();
      if (endDate != null) queryParams['end_date'] = endDate.toIso8601String();

      final response = await _dio.get(
        '/api/banque/transactions',
        queryParameters: queryParams,
      );

      if (response.statusCode == 200) {
        final List<dynamic> transactionsJson = response.data ?? [];
        final transactions = transactionsJson
            .map((json) => TransactionModel.fromJson(json))
            .toList();

        AppLogger.info(
          'Historique transactions banque récupéré: ${transactions.length}',
        );
        return transactions;
      }
      return [];
    } catch (e) {
      AppLogger.error('Erreur récupération historique transactions banque: $e');
      rethrow;
    }
  }
}

// Modèles supplémentaires pour les fonctionnalités banque
class BanqueHealthModel {
  final bool isHealthy;
  final String status;
  final DateTime timestamp;
  final Map<String, dynamic>? details;

  BanqueHealthModel({
    required this.isHealthy,
    required this.status,
    required this.timestamp,
    this.details,
  });

  factory BanqueHealthModel.fromJson(Map<String, dynamic> json) {
    return BanqueHealthModel(
      isHealthy: json['is_healthy'] ?? false,
      status: json['status'] ?? '',
      timestamp: DateTime.tryParse(json['timestamp'] ?? '') ?? DateTime.now(),
      details: json['details'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'is_healthy': isHealthy,
      'status': status,
      'timestamp': timestamp.toIso8601String(),
      'details': details,
    };
  }
}

class UserBalanceModel {
  final int jetonBalance;
  final int coinsBalance;
  final int xpPoints;
  final int level;
  final DateTime lastUpdated;

  UserBalanceModel({
    required this.jetonBalance,
    required this.coinsBalance,
    required this.xpPoints,
    required this.level,
    required this.lastUpdated,
  });

  factory UserBalanceModel.fromJson(Map<String, dynamic> json) {
    return UserBalanceModel(
      jetonBalance: json['jeton_balance'] ?? 0,
      coinsBalance: json['coins_balance'] ?? 0,
      xpPoints: json['xp_points'] ?? 0,
      level: json['level'] ?? 1,
      lastUpdated:
          DateTime.tryParse(json['last_updated'] ?? '') ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'jeton_balance': jetonBalance,
      'coins_balance': coinsBalance,
      'xp_points': xpPoints,
      'level': level,
      'last_updated': lastUpdated.toIso8601String(),
    };
  }
}

class TransactionModel {
  final int transactionId;
  final TransactionType type;
  final int amount;
  final String currency; // 'jetons' ou 'coins'
  final String description;
  final int? relatedServiceId;
  final int? relatedPrankId;
  final DateTime createdAt;

  TransactionModel({
    required this.transactionId,
    required this.type,
    required this.amount,
    required this.currency,
    required this.description,
    this.relatedServiceId,
    this.relatedPrankId,
    required this.createdAt,
  });

  factory TransactionModel.fromJson(Map<String, dynamic> json) {
    return TransactionModel(
      transactionId: json['transaction_id'] ?? 0,
      type: _parseTransactionType(json['type']),
      amount: json['amount'] ?? 0,
      currency: json['currency'] ?? 'jetons',
      description: json['description'] ?? '',
      relatedServiceId: json['related_service_id'],
      relatedPrankId: json['related_prank_id'],
      createdAt: DateTime.tryParse(json['created_at'] ?? '') ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'transaction_id': transactionId,
      'type': type.value,
      'amount': amount,
      'currency': currency,
      'description': description,
      'related_service_id': relatedServiceId,
      'related_prank_id': relatedPrankId,
      'created_at': createdAt.toIso8601String(),
    };
  }

  static TransactionType _parseTransactionType(String? type) {
    switch (type) {
      case 'service_payment':
        return TransactionType.servicePayment;
      case 'service_earning':
        return TransactionType.serviceEarning;
      case 'prank_payment':
        return TransactionType.prankPayment;
      case 'prank_earning':
        return TransactionType.prankEarning;
      case 'bonus':
        return TransactionType.bonus;
      case 'penalty':
        return TransactionType.penalty;
      default:
        return TransactionType.servicePayment;
    }
  }
}

enum TransactionType {
  servicePayment('service_payment'),
  serviceEarning('service_earning'),
  prankPayment('prank_payment'),
  prankEarning('prank_earning'),
  bonus('bonus'),
  penalty('penalty');

  const TransactionType(this.value);
  final String value;
}
