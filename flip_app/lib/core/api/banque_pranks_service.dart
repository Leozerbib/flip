import 'dart:convert';
import 'package:dio/dio.dart';
import '../../data/models/models.dart';
import '../utils/logger.dart';
import 'api_client.dart';

class BanquePranksService {
  static final Dio _dio = ApiClient.dio;

  // Récupérer tous les pranks avec filtres et tri par rareté par défaut
  static Future<List<PrankModel>?> getPranks({
    PrankType? type,
    bool? requiresProof,
    bool? isActive,
    int? jetonCostMin,
    int? jetonCostMax,
    PrankRarity? rarity,
    String? searchTerm,
    String? sortBy,
    String? sortOrder,
    int page = 1,
    int limit = 20,
  }) async {
    try {
      AppLogger.info('Récupération des pranks banque');

      final queryParams = <String, dynamic>{};

      if (type != null) queryParams['type'] = type.value;
      if (requiresProof != null) queryParams['requires_proof'] = requiresProof;
      if (isActive != null) queryParams['is_active'] = isActive;
      if (jetonCostMin != null) queryParams['jeton_cost_min'] = jetonCostMin;
      if (jetonCostMax != null) queryParams['jeton_cost_max'] = jetonCostMax;
      if (rarity != null) queryParams['rarity'] = rarity.value;
      if (searchTerm != null) queryParams['search'] = searchTerm;

      final response = await _dio.get(
        '/api/banque/pranks',
        queryParameters: queryParams,
      );

      if (response.statusCode == 200) {
        final List<dynamic> pranksJson = response.data ?? [];
        List<PrankModel> pranks = pranksJson
            .map((json) => PrankModel.fromJson(json))
            .toList();

        // Tri côté client pour s'assurer de l'ordre par rareté
        pranks = _sortPranksByRarity(pranks);

        AppLogger.info('Pranks banque récupérés: ${pranks.length}');
        return pranks;
      }
      return [];
    } catch (e) {
      AppLogger.error('Erreur récupération pranks banque: $e');
      rethrow;
    }
  }

  // Trier les pranks par rareté : extreme > rare > common
  static List<PrankModel> _sortPranksByRarity(List<PrankModel> pranks) {
    pranks.sort((a, b) {
      // Ordre de priorité pour le tri par rareté
      const rarityOrder = {
        PrankRarity.extreme: 0,
        PrankRarity.rare: 1,
        PrankRarity.common: 2,
      };

      final aOrder = rarityOrder[a.rarity] ?? 2;
      final bOrder = rarityOrder[b.rarity] ?? 2;

      // Si même rareté, trier par nom
      if (aOrder == bOrder) {
        return a.name.compareTo(b.name);
      }

      return aOrder.compareTo(bOrder);
    });

    return pranks;
  }

  // Récupérer un prank par ID
  static Future<PrankModel?> getPrankById(int prankId) async {
    try {
      AppLogger.info('Récupération prank banque par ID: $prankId');

      final response = await _dio.get('/api/banque/pranks/$prankId');

      if (response.statusCode == 200) {
        AppLogger.info('Prank banque récupéré avec succès');
        return PrankModel.fromJson(response.data);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur récupération prank banque: $e');
      rethrow;
    }
  }

  // Mettre à jour un prank - Note: Utilise un DTO de mise à jour maintenant
  static Future<PrankModel?> updatePrank(
    int prankId,
    Map<String, dynamic> updateData,
  ) async {
    try {
      AppLogger.info('Mise à jour prank banque: $prankId');

      final response = await _dio.put(
        '/api/banque/pranks/$prankId',
        data: updateData,
      );

      if (response.statusCode == 200) {
        AppLogger.info('Prank banque mis à jour avec succès');
        return PrankModel.fromJson(response.data);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur mise à jour prank banque: $e');
      rethrow;
    }
  }

  // Supprimer un prank
  static Future<bool> deletePrank(int prankId) async {
    try {
      AppLogger.info('Suppression prank banque: $prankId');

      final response = await _dio.delete('/api/banque/pranks/$prankId');

      if (response.statusCode == 200) {
        AppLogger.info('Prank banque supprimé avec succès');
        return true;
      }
      return false;
    } catch (e) {
      AppLogger.error('Erreur suppression prank banque: $e');
      rethrow;
    }
  }

  // Créer une exécution de prank
  static Future<ExecutedPrankModel?> createExecutedPrank(
    CreateExecutedPrankDto createExecutedPrankDto,
  ) async {
    try {
      AppLogger.info('Création d\'une exécution de prank banque');

      final response = await _dio.post(
        '/api/banque/pranks/execute',
        data: createExecutedPrankDto.toJson(),
      );

      if (response.statusCode == 201) {
        AppLogger.info('Exécution de prank banque créée avec succès');
        return ExecutedPrankModel.fromJson(response.data);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur création exécution prank banque: $e');
      rethrow;
    }
  }

  // Récupérer toutes les exécutions de pranks avec filtres
  static Future<List<ExecutedPrankWithDetailsModel>?> getExecutedPranks({
    ExecutedPrankStatus? status,
    int? executorId,
    int? targetId,
    int? prankId,
    String? sortBy,
    String? sortOrder,
    int page = 1,
    int limit = 20,
  }) async {
    try {
      AppLogger.info('Récupération des exécutions de pranks banque');

      final queryParams = <String, dynamic>{};

      if (status != null) queryParams['status'] = status.value;
      if (executorId != null) queryParams['executor_id'] = executorId;
      if (targetId != null) queryParams['target_id'] = targetId;
      if (prankId != null) queryParams['chosen_prank_id'] = prankId;
      if (sortBy != null) queryParams['sort_by'] = sortBy;
      if (sortOrder != null) queryParams['sort_order'] = sortOrder;

      final response = await _dio.get(
        '/api/banque/pranks/executions',
        queryParameters: queryParams,
      );

      if (response.statusCode == 200) {
        final List<dynamic> executedPranksJson = response.data ?? [];
        final executedPranks = executedPranksJson
            .map((json) => ExecutedPrankWithDetailsModel.fromJson(json))
            .toList();

        AppLogger.info(
          'Exécutions de pranks banque récupérées: ${executedPranks.length}',
        );
        return executedPranks;
      }
      return [];
    } catch (e) {
      AppLogger.error('Erreur récupération exécutions pranks banque: $e');
      rethrow;
    }
  }

  // Récupérer une exécution de prank par ID
  static Future<ExecutedPrankModel?> getExecutedPrankById(
    int executedPrankId,
  ) async {
    try {
      AppLogger.info(
        'Récupération exécution prank banque par ID: $executedPrankId',
      );

      final response = await _dio.get(
        '/api/banque/pranks/executions/$executedPrankId',
      );

      if (response.statusCode == 200) {
        AppLogger.info('Exécution prank banque récupérée avec succès');
        return ExecutedPrankModel.fromJson(response.data);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur récupération exécution prank banque: $e');
      rethrow;
    }
  }

  // Récupérer les détails complets d'une exécution de prank
  static Future<ExecutedPrankWithDetailsModel?> getExecutedPrankWithDetails(
    int executedPrankId,
  ) async {
    try {
      AppLogger.info(
        'Récupération détails exécution prank banque: $executedPrankId',
      );

      final response = await _dio.get(
        '/api/banque/pranks/executions/$executedPrankId/details',
      );

      if (response.statusCode == 200) {
        AppLogger.info('Détails exécution prank banque récupérés avec succès');
        return ExecutedPrankWithDetailsModel.fromJson(response.data);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur récupération détails exécution prank banque: $e');
      rethrow;
    }
  }

  // Mettre à jour une exécution de prank
  static Future<ExecutedPrankModel?> updateExecutedPrank(
    int executedPrankId,
    UpdateExecutedPrankDto updateExecutedPrankDto,
  ) async {
    try {
      AppLogger.info('Mise à jour exécution prank banque: $executedPrankId');

      final response = await _dio.put(
        '/api/banque/pranks/executions/$executedPrankId',
        data: updateExecutedPrankDto.toJson(),
      );

      if (response.statusCode == 200) {
        AppLogger.info('Exécution prank banque mise à jour avec succès');
        return ExecutedPrankModel.fromJson(response.data);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur mise à jour exécution prank banque: $e');
      rethrow;
    }
  }

  // Uploader une preuve pour une exécution de prank
  static Future<bool> uploadProof(int executedPrankId, String proofUrl) async {
    try {
      AppLogger.info('Upload preuve pour exécution prank: $executedPrankId');

      final updateDto = UpdateExecutedPrankDto(proofUrl: proofUrl);
      final result = await updateExecutedPrank(executedPrankId, updateDto);

      if (result != null) {
        AppLogger.info('Preuve uploadée avec succès');
        return true;
      }
      return false;
    } catch (e) {
      AppLogger.error('Erreur upload preuve: $e');
      rethrow;
    }
  }

  // Valider une exécution de prank
  static Future<bool> validateExecution(int executedPrankId) async {
    try {
      AppLogger.info('Validation exécution prank: $executedPrankId');

      final updateDto = UpdateExecutedPrankDto(
        status: ExecutedPrankStatus.validatedByTargetCompleted,
      );
      final result = await updateExecutedPrank(executedPrankId, updateDto);

      if (result != null) {
        AppLogger.info('Exécution validée avec succès');
        return true;
      }
      return false;
    } catch (e) {
      AppLogger.error('Erreur validation exécution: $e');
      rethrow;
    }
  }

  // Rejeter une exécution de prank
  static Future<bool> rejectExecution(int executedPrankId) async {
    try {
      AppLogger.info('Rejet exécution prank: $executedPrankId');

      final updateDto = UpdateExecutedPrankDto(
        status: ExecutedPrankStatus.rejected,
      );
      final result = await updateExecutedPrank(executedPrankId, updateDto);

      if (result != null) {
        AppLogger.info('Exécution rejetée avec succès');
        return true;
      }
      return false;
    } catch (e) {
      AppLogger.error('Erreur rejet exécution: $e');
      rethrow;
    }
  }

  // Récupérer les statistiques des pranks
  static Future<Map<String, dynamic>?> getPrankStats() async {
    try {
      AppLogger.info('Récupération statistiques pranks banque');

      final response = await _dio.get('/api/banque/pranks/stats/overview');

      if (response.statusCode == 200) {
        AppLogger.info('Statistiques pranks banque récupérées avec succès');
        return response.data;
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur récupération statistiques pranks banque: $e');
      rethrow;
    }
  }
}
