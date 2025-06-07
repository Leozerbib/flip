import 'dart:convert';
import 'package:dio/dio.dart';
import '../../data/models/service_model.dart';
import '../../data/models/friend_model.dart';
import '../utils/logger.dart';
import 'api_client.dart';

class ServicesService {
  static final Dio _dio = ApiClient.dio;

  // Créer un nouveau service
  static Future<ServiceModel?> createService({
    required int beneficiaryId,
    required String description,
    required int jetonValue,
    int? categoryId,
  }) async {
    try {
      AppLogger.info('Création d\'un nouveau service: $description');

      final data = <String, dynamic>{
        'beneficiary_id': beneficiaryId,
        'description': description,
        'jeton_value': jetonValue,
      };

      if (categoryId != null) {
        data['category_id'] = categoryId;
      }

      final response = await _dio.post('/api/services', data: data);

      if (response.statusCode == 201) {
        AppLogger.info('Service créé avec succès');
        return ServiceModel.fromJson(response.data);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur création service: $e');
      rethrow;
    }
  }

  // Récupérer tous les services (avec filtres)
  static Future<List<ServiceModel>?> getServices({
    String? type,
    String? status,
    String? role, // 'provider' ou 'client'
    int page = 1,
    int limit = 20,
  }) async {
    try {
      AppLogger.info('Récupération des services');

      final queryParams = <String, dynamic>{'page': page, 'limit': limit};

      if (type != null) queryParams['type'] = type;
      if (status != null) queryParams['status'] = status;
      if (role != null) queryParams['role'] = role;

      final response = await _dio.get(
        '/api/services',
        queryParameters: queryParams,
      );

      if (response.statusCode == 200 && response.data['success'] == true) {
        final List<dynamic> servicesJson = response.data['services'] ?? [];
        final services = servicesJson
            .map((json) => ServiceModel.fromJson(json))
            .toList();

        AppLogger.info('Services récupérés: ${services.length}');
        return services;
      }
      return [];
    } catch (e) {
      AppLogger.error('Erreur récupération services: $e');
      rethrow;
    }
  }

  // Récupérer les services d'un utilisateur
  static Future<List<ServiceModel>?> getUserServices({
    required String page,
    required String limit,
  }) async {
    try {
      AppLogger.info('Récupération des services d\'un utilisateur');

      final response = await _dio.get(
        '/api/services/user/services',
        queryParameters: {'page': page, 'limit': limit},
      );

      if (response.statusCode == 200) {
        if (response.data.length == 0) {
          AppLogger.info('Aucun service trouvé');
          return [];
        }

        final List<dynamic> servicesJson = response.data ?? [];

        final services = servicesJson
            .map((json) => ServiceModel.fromJson(json))
            .toList();

        AppLogger.info('Services récupérés: ${services.length}');
        return services;
      }
      return [];
    } catch (e) {
      AppLogger.error('Erreur récupération services utilisateur: $e');
      rethrow;
    }
  }

  // Récupérer les pranks d'un utilisateur
  static Future<List<ServiceModel>?> getUserPranks({
    required String page,
    required String limit,
  }) async {
    try {
      AppLogger.info('Récupération des pranks d\'un utilisateur');

      final response = await _dio.get(
        '/api/services/user/pranks',
        queryParameters: {'page': page, 'limit': limit},
      );

      if (response.statusCode == 200) {
        if (response.data.length == 0) {
          AppLogger.info('Aucun prank trouvé');
          return [];
        }
        final List<dynamic> pranksJson = response.data ?? [];

        final pranks = pranksJson
            .map((json) => ServiceModel.fromJson(json))
            .toList();

        AppLogger.info('Pranks récupérés: ${pranks.length}');
        return pranks;
      }
      return [];
    } catch (e) {
      AppLogger.error('Erreur récupération pranks utilisateur: $e');
      rethrow;
    }
  }

  // Récupérer un service par ID
  static Future<ServiceModel?> getServiceById(int serviceId) async {
    try {
      AppLogger.info('Récupération service par ID: $serviceId');

      final response = await _dio.get('/api/services/$serviceId');

      if (response.statusCode == 200 && response.data['success'] == true) {
        AppLogger.info('Service récupéré avec succès');
        return ServiceModel.fromJson(response.data['service']);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur récupération service: $e');
      rethrow;
    }
  }

  // Confirmer un service
  static Future<bool> confirmService(int serviceId) async {
    try {
      AppLogger.info('Confirmation du service: $serviceId');

      final response = await _dio.post('/api/services/$serviceId/confirm');

      if (response.statusCode == 200 && response.data['success'] == true) {
        AppLogger.info('Service confirmé avec succès');
        return true;
      }
      return false;
    } catch (e) {
      AppLogger.error('Erreur confirmation service: $e');
      rethrow;
    }
  }

  // Rembourser un service
  static Future<bool> repayService({
    required int serviceId,
    required int repaymentServiceId,
  }) async {
    try {
      AppLogger.info('Remboursement du service: $serviceId');

      final response = await _dio.post(
        '/api/services/$serviceId/repay/$repaymentServiceId',
      );

      if (response.statusCode == 200 && response.data['success'] == true) {
        AppLogger.info('Service remboursé avec succès');
        return true;
      }
      return false;
    } catch (e) {
      AppLogger.error('Erreur remboursement service: $e');
      rethrow;
    }
  }

  // Mettre à jour un service
  static Future<ServiceModel?> updateService({
    required int serviceId,
    String? title,
    String? description,
    int? price,
    String? status,
  }) async {
    try {
      AppLogger.info('Mise à jour du service: $serviceId');

      final data = <String, dynamic>{};
      if (title != null) data['title'] = title;
      if (description != null) data['description'] = description;
      if (price != null) data['price'] = price;
      if (status != null) data['status'] = status;

      final response = await _dio.put('/api/services/$serviceId', data: data);

      if (response.statusCode == 200 && response.data['success'] == true) {
        AppLogger.info('Service mis à jour avec succès');
        return ServiceModel.fromJson(response.data['service']);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur mise à jour service: $e');
      rethrow;
    }
  }

  // Supprimer un service
  static Future<bool> deleteService(int serviceId) async {
    try {
      AppLogger.info('Suppression du service: $serviceId');

      final response = await _dio.delete('/api/services/$serviceId');

      if (response.statusCode == 200 && response.data['success'] == true) {
        AppLogger.info('Service supprimé avec succès');
        return true;
      }
      return false;
    } catch (e) {
      AppLogger.error('Erreur suppression service: $e');
      rethrow;
    }
  }

  // Récupérer les statistiques globales
  static Future<Map<String, dynamic>?> getGlobalStats() async {
    try {
      AppLogger.info('Récupération des statistiques globales');

      final response = await _dio.get('/api/services/stats/global');

      if (response.statusCode == 200 && response.data['success'] == true) {
        AppLogger.info('Statistiques récupérées avec succès');
        return response.data['stats'];
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur récupération statistiques: $e');
      rethrow;
    }
  }

  // Récupérer les amis (pour sélection lors de la création)
  static Future<List<FriendModel>?> getFriendsForSelection() async {
    try {
      AppLogger.info('Récupération des amis pour sélection');

      final response = await _dio.get('/api/friendships/friends?limit=100');

      if (response.statusCode == 200 && response.data['success'] == true) {
        final List<dynamic> friendsJson = response.data['friends'] ?? [];
        final friends = friendsJson
            .map((json) => FriendModel.fromJson(json))
            .toList();

        AppLogger.info('Amis récupérés pour sélection: ${friends.length}');
        return friends;
      }
      return [];
    } catch (e) {
      AppLogger.error('Erreur récupération amis: $e');
      rethrow;
    }
  }

  // Récupérer les détails d'un service avec historique
  static Future<Map<String, dynamic>?> getServiceDetails(int serviceId) async {
    try {
      AppLogger.info('Récupération détails service: $serviceId');

      final response = await _dio.get('/api/services/$serviceId/details');

      if (response.statusCode == 200 && response.data['success'] == true) {
        AppLogger.info('Détails service récupérés avec succès');
        return response.data;
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur récupération détails service: $e');
      rethrow;
    }
  }
}
