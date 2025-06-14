import '../utils/logger.dart';
import '../config/url_constants.dart';
import 'api_client.dart';
import '../../data/models/user_inventory_model.dart';

class UserInventoryService {
  // ==================== INVENTORY OPERATIONS ====================

  /// Récupère l'inventaire complet de l'utilisateur connecté
  static Future<UserPackInventory> getUserInventory() async {
    try {
      AppLogger.info('Récupération de l\'inventaire utilisateur');

      final response = await ApiClient.get(
        UrlConstants.replaceUserId(UrlConstants.userInventory, 'me'),
      );

      AppLogger.info(
        'Inventaire récupéré: ${response.data['totalPacks']} packs',
      );
      return UserPackInventory.fromJson(response.data);
    } catch (e) {
      AppLogger.error('Erreur lors de la récupération de l\'inventaire: $e');
      rethrow;
    }
  }

  /// Récupère les statistiques d'inventaire de l'utilisateur connecté
  static Future<UserPackInventoryStats> getUserInventoryStats() async {
    try {
      AppLogger.info('Récupération des statistiques d\'inventaire');

      final response = await ApiClient.get(
        UrlConstants.replaceUserId(UrlConstants.userInventoryStats, 'me'),
      );

      AppLogger.info(
        'Stats inventaire récupérées: ${response.data['totalPacks']} packs, '
        'valeur totale: ${response.data['totalValue']}',
      );
      return UserPackInventoryStats.fromJson(response.data);
    } catch (e) {
      AppLogger.error(
        'Erreur lors de la récupération des stats d\'inventaire: $e',
      );
      rethrow;
    }
  }

  /// Ajoute un pack à l'inventaire de l'utilisateur connecté
  static Future<AddPackToInventoryResult> addPackToInventory({
    required String packId,
    required int quantity,
  }) async {
    try {
      AppLogger.info(
        'Ajout de pack à l\'inventaire: pack=$packId, quantity=$quantity',
      );

      final dto = AddPackToInventoryDto(packId: packId, quantity: quantity);

      final response = await ApiClient.post(
        UrlConstants.replaceUserId(UrlConstants.userInventoryAdd, 'me'),
        data: dto.toJson(),
      );

      final result = AddPackToInventoryResult.fromJson(response.data);

      if (result.success) {
        AppLogger.info('Pack ajouté avec succès à l\'inventaire');
      } else {
        AppLogger.warning('Échec ajout pack: ${result.error}');
      }

      return result;
    } catch (e) {
      AppLogger.error('Erreur lors de l\'ajout du pack: $e');
      rethrow;
    }
  }

  /// Retire un pack de l'inventaire de l'utilisateur connecté
  static Future<RemovePackFromInventoryResult> removePackFromInventory({
    required String packId,
    required int quantity,
  }) async {
    try {
      AppLogger.info(
        'Retrait de pack de l\'inventaire: pack=$packId, quantity=$quantity',
      );

      final dto = RemovePackFromInventoryDto(
        packId: packId,
        quantity: quantity,
      );

      final response = await ApiClient.delete(
        UrlConstants.replaceUserId(UrlConstants.userInventoryRemove, 'me'),
        data: dto.toJson(),
      );

      final result = RemovePackFromInventoryResult.fromJson(response.data);

      if (result.success) {
        AppLogger.info(
          'Pack retiré avec succès, quantité restante: ${result.remainingQuantity}',
        );
      } else {
        AppLogger.warning('Échec retrait pack: ${result.error}');
      }

      return result;
    } catch (e) {
      AppLogger.error('Erreur lors du retrait du pack: $e');
      rethrow;
    }
  }

  // ==================== UTILITY METHODS ====================

  /// Vérifie si un pack est disponible en quantité suffisante
  static Future<bool> hasPackInQuantity({
    required String packId,
    required int requiredQuantity,
  }) async {
    try {
      final inventory = await getUserInventory();
      final item = inventory.items.firstWhere(
        (item) => item.packId == packId,
        orElse: () => throw Exception('Pack non trouvé dans l\'inventaire'),
      );

      return item.quantity >= requiredQuantity;
    } catch (e) {
      AppLogger.error('Erreur lors de la vérification de quantité: $e');
      return false;
    }
  }

  /// Obtient la quantité disponible d'un pack spécifique
  static Future<int> getPackQuantity(String packId) async {
    try {
      final inventory = await getUserInventory();
      final item = inventory.items.firstWhere(
        (item) => item.packId == packId,
        orElse: () => throw Exception('Pack non trouvé dans l\'inventaire'),
      );

      return item.quantity;
    } catch (e) {
      AppLogger.error('Erreur lors de la récupération de quantité: $e');
      return 0;
    }
  }

  /// Obtient tous les packs d'un type spécifique
  static Future<List<UserPackInventoryItem>> getPacksByType(
    String packType,
  ) async {
    try {
      final inventory = await getUserInventory();
      return inventory.itemsByType[packType] ?? [];
    } catch (e) {
      AppLogger.error('Erreur lors de la récupération des packs par type: $e');
      return [];
    }
  }
}
