import '../utils/logger.dart';
import '../config/url_constants.dart';
import 'api_client.dart';
import '../../data/models/user_pranks_model.dart';

class UserPranksService {
  // ==================== PRANKS COLLECTION OPERATIONS ====================

  /// Récupère la collection de pranks de l'utilisateur connecté avec filtres
  static Future<UserPranksCollection> getUserPranksCollection({
    UserPrankFilters? filters,
  }) async {
    try {
      AppLogger.info('Récupération de la collection de pranks');

      final queryParams = filters?.toQueryParams() ?? {};

      final response = await ApiClient.get(
        UrlConstants.replaceUserId(UrlConstants.userPranks, 'me'),
        queryParameters: queryParams,
      );

      AppLogger.info(
        'Collection récupérée: ${response.data['totalPranks']} pranks',
      );
      return UserPranksCollection.fromJson(response.data, filters: filters);
    } catch (e) {
      AppLogger.error('Erreur lors de la récupération de la collection: $e');
      rethrow;
    }
  }

  /// Récupère les statistiques de collection de l'utilisateur connecté
  static Future<UserPranksStats> getUserPranksStats() async {
    try {
      AppLogger.info('Récupération des statistiques de collection');

      final response = await ApiClient.get(
        UrlConstants.replaceUserId(UrlConstants.userPranksStats, 'me'),
      );

      AppLogger.info(
        'Stats collection récupérées: ${response.data['totalPranks']} pranks, '
        'completion: ${response.data['completionPercentage']}%',
      );
      return UserPranksStats.fromJson(response.data);
    } catch (e) {
      AppLogger.error(
        'Erreur lors de la récupération des stats de collection: $e',
      );
      rethrow;
    }
  }

  /// Ajoute un prank à la collection de l'utilisateur connecté
  static Future<AddPrankToCollectionResult> addPrankToCollection({
    required String prankId,
    required int quantity,
  }) async {
    try {
      AppLogger.info(
        'Ajout de prank à la collection: prank=$prankId, quantity=$quantity',
      );

      final dto = AddPrankToCollectionDto(prankId: prankId, quantity: quantity);

      final response = await ApiClient.post(
        UrlConstants.replaceUserId(UrlConstants.userPranksAdd, 'me'),
        data: dto.toJson(),
      );

      final result = AddPrankToCollectionResult.fromJson(response.data);

      if (result.success) {
        AppLogger.info(
          'Prank ajouté avec succès ${result.isNewPrank ? "(nouveau!)" : ""}',
        );
      } else {
        AppLogger.warning('Échec ajout prank: ${result.error}');
      }

      return result;
    } catch (e) {
      AppLogger.error('Erreur lors de l\'ajout du prank: $e');
      rethrow;
    }
  }

  /// Retire un prank de la collection de l'utilisateur connecté
  static Future<RemovePrankFromCollectionResult> removePrankFromCollection({
    required String prankId,
    required int quantity,
  }) async {
    try {
      AppLogger.info(
        'Retrait de prank de la collection: prank=$prankId, quantity=$quantity',
      );

      final dto = RemovePrankFromCollectionDto(
        prankId: prankId,
        quantity: quantity,
      );

      final response = await ApiClient.delete(
        UrlConstants.replaceUserId(UrlConstants.userPranksRemove, 'me'),
        data: dto.toJson(),
      );

      final result = RemovePrankFromCollectionResult.fromJson(response.data);

      if (result.success) {
        AppLogger.info(
          'Prank retiré avec succès, quantité restante: ${result.remainingQuantity}',
        );
      } else {
        AppLogger.warning('Échec retrait prank: ${result.error}');
      }

      return result;
    } catch (e) {
      AppLogger.error('Erreur lors du retrait du prank: $e');
      rethrow;
    }
  }

  // ==================== FILTERED COLLECTIONS ====================

  /// Récupère les pranks par rareté
  static Future<UserPranksCollection> getPranksByRarity({
    required List<String> rarities,
    int? limit,
    int? offset,
  }) async {
    final filters = UserPrankFilters(
      rarity: rarities,
      limit: limit,
      offset: offset,
      sortBy: 'acquiredAt',
      sortOrder: 'desc',
    );

    return getUserPranksCollection(filters: filters);
  }

  /// Récupère les pranks par type
  static Future<UserPranksCollection> getPranksByType({
    required List<String> types,
    int? limit,
    int? offset,
  }) async {
    final filters = UserPrankFilters(
      type: types,
      limit: limit,
      offset: offset,
      sortBy: 'acquiredAt',
      sortOrder: 'desc',
    );

    return getUserPranksCollection(filters: filters);
  }

  /// Récupère les nouveaux pranks (récemment acquis)
  static Future<UserPranksCollection> getNewPranks({int? limit}) async {
    final filters = UserPrankFilters(
      limit: limit ?? 10,
      sortBy: 'acquiredAt',
      sortOrder: 'desc',
    );

    final collection = await getUserPranksCollection(filters: filters);

    // Filtrer seulement les pranks marqués comme nouveaux
    final newPranks = collection.pranks.where((prank) => prank.isNew).toList();

    return UserPranksCollection(
      userId: collection.userId,
      pranks: newPranks,
      totalPranks: newPranks.length,
      pranksByRarity: {},
      filters: filters,
      totalCount: newPranks.length,
      hasMore: false,
    );
  }

  // ==================== UTILITY METHODS ====================

  /// Vérifie si un prank est possédé en quantité suffisante
  static Future<bool> hasPrankInQuantity({
    required String prankId,
    required int requiredQuantity,
  }) async {
    try {
      final collection = await getUserPranksCollection();
      final item = collection.pranks.firstWhere(
        (item) => item.prankId == prankId,
        orElse: () => throw Exception('Prank non trouvé dans la collection'),
      );

      return item.quantity >= requiredQuantity;
    } catch (e) {
      AppLogger.error('Erreur lors de la vérification de quantité prank: $e');
      return false;
    }
  }

  /// Obtient la quantité possédée d'un prank spécifique
  static Future<int> getPrankQuantity(String prankId) async {
    try {
      final collection = await getUserPranksCollection();
      final item = collection.pranks.firstWhere(
        (item) => item.prankId == prankId,
        orElse: () => throw Exception('Prank non trouvé dans la collection'),
      );

      return item.quantity;
    } catch (e) {
      AppLogger.error('Erreur lors de la récupération de quantité prank: $e');
      return 0;
    }
  }

  /// Vérifie si un prank est possédé
  static Future<bool> hasPrank(String prankId) async {
    try {
      final collection = await getUserPranksCollection();
      return collection.pranks.any((item) => item.prankId == prankId);
    } catch (e) {
      AppLogger.error('Erreur lors de la vérification de possession prank: $e');
      return false;
    }
  }

  /// Obtient tous les pranks d'une rareté spécifique possédés
  static Future<List<UserPrankItem>> getPranksOfRarity(String rarity) async {
    try {
      final collection = await getUserPranksCollection();
      return collection.pranksByRarity[rarity] ?? [];
    } catch (e) {
      AppLogger.error(
        'Erreur lors de la récupération des pranks par rareté: $e',
      );
      return [];
    }
  }

  /// Obtient le pourcentage de completion global
  static Future<double> getCompletionPercentage() async {
    try {
      final stats = await getUserPranksStats();
      return stats.completionPercentage;
    } catch (e) {
      AppLogger.error('Erreur lors du calcul de completion: $e');
      return 0.0;
    }
  }

  // ==================== PAGINATION HELPERS ====================

  /// Récupère la page suivante de pranks
  static Future<UserPranksCollection> getNextPage({
    required UserPranksCollection currentCollection,
    int pageSize = 20,
  }) async {
    if (!currentCollection.hasMore) {
      return currentCollection;
    }

    final newOffset = (currentCollection.filters.offset ?? 0) + pageSize;
    final newFilters = UserPrankFilters(
      rarity: currentCollection.filters.rarity,
      type: currentCollection.filters.type,
      sortBy: currentCollection.filters.sortBy,
      sortOrder: currentCollection.filters.sortOrder,
      limit: pageSize,
      offset: newOffset,
    );

    return getUserPranksCollection(filters: newFilters);
  }
}
