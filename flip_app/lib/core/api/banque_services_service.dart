import 'dart:convert';
import 'package:dio/dio.dart';
import '../../data/models/models.dart';
import '../utils/logger.dart';
import 'api_client.dart';

class BanqueServicesService {
  static final Dio _dio = ApiClient.dio;

  // Créer un nouveau service
  static Future<ServiceModel?> createService({
    required int beneficiaryId,
    required String description,
    required int jetonValue,
    int? categoryId,
  }) async {
    try {
      AppLogger.info('Création d\'un nouveau service banque: $description');

      final data = <String, dynamic>{
        'beneficiary_id': beneficiaryId,
        'description': description,
        'jeton_value': jetonValue,
      };

      if (categoryId != null) {
        data['category_id'] = categoryId;
      }

      final response = await _dio.post('/api/banque/services', data: data);

      if (response.statusCode == 201) {
        AppLogger.info('Service banque créé avec succès');
        return ServiceModel.fromJson(response.data);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur création service banque: $e');
      rethrow;
    }
  }

  // Récupérer tous les services avec filtres
  static Future<List<ServiceModel>?> getServices({
    String? status,
    int? providerId,
    int? beneficiaryId,
    int? categoryId,
    int? jetonValueMin,
    int? jetonValueMax,
    String? searchTerm,
    String? sortBy,
    String? sortOrder,
    int page = 1,
    int limit = 20,
  }) async {
    try {
      AppLogger.info('Récupération des services banque');

      final queryParams = <String, dynamic>{};

      if (status != null) queryParams['status'] = status;
      if (providerId != null) queryParams['provider_id'] = providerId;
      if (beneficiaryId != null) queryParams['beneficiary_id'] = beneficiaryId;
      if (categoryId != null) queryParams['category_id'] = categoryId;
      if (jetonValueMin != null) queryParams['jeton_value_min'] = jetonValueMin;
      if (jetonValueMax != null) queryParams['jeton_value_max'] = jetonValueMax;
      if (searchTerm != null) queryParams['search'] = searchTerm;
      if (sortBy != null) queryParams['sort_by'] = sortBy;
      if (sortOrder != null) queryParams['sort_order'] = sortOrder;

      final response = await _dio.get(
        '/api/banque/services',
        queryParameters: queryParams.isNotEmpty ? queryParams : null,
      );

      if (response.statusCode == 200) {
        final List<dynamic> servicesJson = response.data ?? [];
        final services = servicesJson
            .map((json) => ServiceModel.fromJson(json))
            .toList();

        AppLogger.info('Services banque récupérés: ${services.length}');
        return services;
      }
      return [];
    } catch (e) {
      AppLogger.error('Erreur récupération services banque: $e');
      rethrow;
    }
  }

  // Récupérer un service par ID
  static Future<ServiceModel?> getServiceById(int serviceId) async {
    try {
      AppLogger.info('Récupération service banque par ID: $serviceId');

      final response = await _dio.get('/api/banque/services/$serviceId');

      if (response.statusCode == 200) {
        AppLogger.info('Service banque récupéré avec succès');
        return ServiceModel.fromJson(response.data);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur récupération service banque: $e');
      rethrow;
    }
  }

  // Mettre à jour un service
  static Future<ServiceModel?> updateService(
    int serviceId, {
    String? description,
    int? jetonValue,
    int? categoryId,
  }) async {
    try {
      AppLogger.info('Mise à jour service banque: $serviceId');

      final data = <String, dynamic>{};
      if (description != null) data['description'] = description;
      if (jetonValue != null) data['jeton_value'] = jetonValue;
      if (categoryId != null) data['category_id'] = categoryId;

      final response = await _dio.put(
        '/api/banque/services/$serviceId',
        data: data,
      );

      if (response.statusCode == 200) {
        AppLogger.info('Service banque mis à jour avec succès');
        return ServiceModel.fromJson(response.data);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur mise à jour service banque: $e');
      rethrow;
    }
  }

  // Supprimer un service
  static Future<bool> deleteService(int serviceId) async {
    try {
      AppLogger.info('Suppression service banque: $serviceId');

      final response = await _dio.delete('/api/banque/services/$serviceId');

      if (response.statusCode == 200) {
        AppLogger.info('Service banque supprimé avec succès');
        return true;
      }
      return false;
    } catch (e) {
      AppLogger.error('Erreur suppression service banque: $e');
      rethrow;
    }
  }

  // Confirmer un service
  static Future<ServiceModel?> confirmService(int serviceId) async {
    try {
      AppLogger.info('Confirmation du service banque: $serviceId');

      final response = await _dio.post(
        '/api/banque/services/$serviceId/confirm',
      );

      if (response.statusCode == 200) {
        AppLogger.info('Service banque confirmé avec succès');
        return ServiceModel.fromJson(response.data);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur confirmation service banque: $e');
      rethrow;
    }
  }

  // Rembourser un service
  static Future<ServiceModel?> repayService({
    required int serviceId,
    required int repaymentServiceId,
  }) async {
    try {
      AppLogger.info('Remboursement du service banque: $serviceId');

      final response = await _dio.post(
        '/api/banque/services/$serviceId/repay',
        data: {'repayment_service_id': repaymentServiceId},
      );

      if (response.statusCode == 200) {
        AppLogger.info('Service banque remboursé avec succès');
        return ServiceModel.fromJson(response.data);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur remboursement service banque: $e');
      rethrow;
    }
  }

  // Récupérer les catégories de services
  static Future<List<ServiceCategory>?> getServiceCategories() async {
    try {
      AppLogger.info('Récupération des catégories de services');

      final response = await _dio.get('/api/banque/services/categories');

      if (response.statusCode == 200) {
        final List<dynamic> categoriesJson = response.data ?? [];
        final categories = categoriesJson
            .map((json) => ServiceCategory.fromJson(json))
            .toList();

        AppLogger.info('Catégories récupérées: ${categories.length}');
        return categories;
      }
      return [];
    } catch (e) {
      AppLogger.error('Erreur récupération catégories: $e');
      rethrow;
    }
  }
}

class ServiceCategory {
  final int categoryId;
  final String name;
  final String? description;
  final String? iconUrl;

  ServiceCategory({
    required this.categoryId,
    required this.name,
    this.description,
    this.iconUrl,
  });

  factory ServiceCategory.fromJson(Map<String, dynamic> json) {
    return ServiceCategory(
      categoryId: json['category_id'] ?? 0,
      name: json['name'] ?? '',
      description: json['description'],
      iconUrl: json['icon_url'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'category_id': categoryId,
      'name': name,
      'description': description,
      'icon_url': iconUrl,
    };
  }
}
