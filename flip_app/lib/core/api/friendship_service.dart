import '../utils/logger.dart';
import 'api_client.dart';
import '../../data/models/friend_model.dart';
import '../../data/models/friendship_model.dart';
import '../../data/models/friendship_request_model.dart';
import '../../data/models/friendship_stats_model.dart';

class FriendshipService {
  static const String _basePath = '/api/friendships';

  // ==================== FRIENDSHIP REQUESTS ====================

  /// Envoyer une demande d'amitié
  static Future<FriendshipModel> sendFriendshipRequest(int targetUserId) async {
    try {
      AppLogger.info('Envoi demande amitié vers utilisateur $targetUserId');

      final response = await ApiClient.post(
        '$_basePath/request',
        data: {'user_two_id': targetUserId},
      );

      AppLogger.info('Demande amitié envoyée avec succès');
      return FriendshipModel.fromJson(response.data);
    } catch (e) {
      AppLogger.error('Erreur lors de l\'envoi de la demande d\'amitié: $e');
      rethrow;
    }
  }

  /// Accepter une demande d'amitié
  static Future<FriendshipModel> acceptFriendshipRequest(
    int friendshipId,
  ) async {
    try {
      AppLogger.info('Acceptation demande amitié $friendshipId');

      final response = await ApiClient.post(
        '$_basePath/accept',
        data: {'friendship_id': friendshipId},
      );

      AppLogger.info('Demande amitié acceptée avec succès');
      return FriendshipModel.fromJson(response.data);
    } catch (e) {
      AppLogger.error('Erreur lors de l\'acceptation de la demande: $e');
      rethrow;
    }
  }

  /// Refuser une demande d'amitié
  static Future<void> declineFriendshipRequest(int friendshipId) async {
    try {
      AppLogger.info('Refus demande amitié $friendshipId');

      await ApiClient.post(
        '$_basePath/decline',
        data: {'friendship_id': friendshipId},
      );

      AppLogger.info('Demande amitié refusée avec succès');
    } catch (e) {
      AppLogger.error('Erreur lors du refus de la demande: $e');
      rethrow;
    }
  }

  // ==================== FRIEND MANAGEMENT ====================

  /// Obtenir la liste des amis
  static Future<List<FriendModel>> getFriends({
    int page = 1,
    int limit = 20,
  }) async {
    try {
      AppLogger.info('Récupération des amis (page: $page, limit: $limit)');

      final response = await ApiClient.get(
        '$_basePath/friends',
        queryParameters: {'page': page, 'limit': limit},
      );

      AppLogger.info('Amis récupérés: ${response.data.length} trouvés');
      return (response.data as List)
          .map((json) => FriendModel.fromJson(json))
          .toList();
    } catch (e) {
      AppLogger.error('Erreur lors de la récupération des amis: $e');
      rethrow;
    }
  }

  /// Supprimer un ami
  static Future<void> removeFriend(int friendId) async {
    try {
      AppLogger.info('Suppression ami $friendId');

      await ApiClient.delete('$_basePath/friends/$friendId');

      AppLogger.info('Ami supprimé avec succès');
    } catch (e) {
      AppLogger.error('Erreur lors de la suppression de l\'ami: $e');
      rethrow;
    }
  }

  // ==================== FRIENDSHIP REQUESTS LISTS ====================

  /// Obtenir les demandes d'amitié reçues
  static Future<List<FriendshipRequestModel>> getReceivedRequests({
    int page = 1,
    int limit = 20,
  }) async {
    try {
      AppLogger.info(
        'Récupération des demandes reçues (page: $page, limit: $limit)',
      );

      final response = await ApiClient.get(
        '$_basePath/requests/received',
        queryParameters: {'page': page, 'limit': limit},
      );

      AppLogger.info('Demandes reçues: ${response.data.length} trouvées');
      return (response.data as List)
          .map((json) => FriendshipRequestModel.fromJson(json))
          .toList();
    } catch (e) {
      AppLogger.error('Erreur lors de la récupération des demandes reçues: $e');
      rethrow;
    }
  }

  /// Obtenir les demandes d'amitié envoyées
  static Future<List<FriendshipRequestModel>> getSentRequests({
    int page = 1,
    int limit = 20,
  }) async {
    try {
      AppLogger.info(
        'Récupération des demandes envoyées (page: $page, limit: $limit)',
      );

      final response = await ApiClient.get(
        '$_basePath/requests/sent',
        queryParameters: {'page': page, 'limit': limit},
      );

      AppLogger.info('Demandes envoyées: ${response.data.length} trouvées');
      return (response.data as List)
          .map((json) => FriendshipRequestModel.fromJson(json))
          .toList();
    } catch (e) {
      AppLogger.error(
        'Erreur lors de la récupération des demandes envoyées: $e',
      );
      rethrow;
    }
  }

  // ==================== BLOCKING OPERATIONS ====================

  /// Bloquer un utilisateur
  static Future<FriendshipModel> blockUser(int userId) async {
    try {
      AppLogger.info('Blocage utilisateur $userId');

      final response = await ApiClient.post(
        '$_basePath/block',
        data: {'user_id': userId},
      );

      AppLogger.info('Utilisateur bloqué avec succès');
      return FriendshipModel.fromJson(response.data);
    } catch (e) {
      AppLogger.error('Erreur lors du blocage: $e');
      rethrow;
    }
  }

  /// Débloquer un utilisateur
  static Future<void> unblockUser(int userId) async {
    try {
      AppLogger.info('Déblocage utilisateur $userId');

      await ApiClient.post('$_basePath/unblock', data: {'user_id': userId});

      AppLogger.info('Utilisateur débloqué avec succès');
    } catch (e) {
      AppLogger.error('Erreur lors du déblocage: $e');
      rethrow;
    }
  }

  // ==================== STATISTICS AND UTILITIES ====================

  /// Obtenir les statistiques d'amitié
  static Future<FriendshipStatsModel> getStats() async {
    try {
      AppLogger.info('Récupération des statistiques d\'amitié');

      final response = await ApiClient.get('$_basePath/stats');

      AppLogger.info('Statistiques récupérées avec succès');
      return FriendshipStatsModel.fromJson(response.data);
    } catch (e) {
      AppLogger.error('Erreur lors de la récupération des statistiques: $e');
      rethrow;
    }
  }

  /// Obtenir les amis en commun avec un utilisateur
  static Future<List<FriendModel>> getMutualFriends(int otherUserId) async {
    try {
      AppLogger.info(
        'Récupération des amis en commun avec l\'utilisateur $otherUserId',
      );

      final response = await ApiClient.get('$_basePath/mutual/$otherUserId');

      AppLogger.info('Amis en commun récupérés: ${response.data.length}');
      return (response.data as List)
          .map((json) => FriendModel.fromJson(json))
          .toList();
    } catch (e) {
      AppLogger.error('Erreur lors de la récupération des amis en commun: $e');
      rethrow;
    }
  }

  /// Obtenir des suggestions d'amitié
  static Future<List<FriendModel>> getSuggestions({int limit = 10}) async {
    try {
      AppLogger.info('Récupération des suggestions d\'amitié (limit: $limit)');

      final response = await ApiClient.get(
        '$_basePath/suggestions',
        queryParameters: {'limit': limit},
      );

      AppLogger.info('Suggestions récupérées: ${response.data.length}');
      return (response.data as List)
          .map((json) => FriendModel.fromJson(json))
          .toList();
    } catch (e) {
      AppLogger.error('Erreur lors de la récupération des suggestions: $e');
      rethrow;
    }
  }

  /// Vérifier le statut d'amitié avec un utilisateur
  static Future<Map<String, dynamic>> getFriendshipStatus(
    int otherUserId,
  ) async {
    try {
      AppLogger.info(
        'Vérification du statut d\'amitié avec l\'utilisateur $otherUserId',
      );

      final response = await ApiClient.get('$_basePath/status/$otherUserId');

      AppLogger.info('Statut d\'amitié récupéré: ${response.data['status']}');
      return response.data;
    } catch (e) {
      AppLogger.error('Erreur lors de la vérification du statut: $e');
      rethrow;
    }
  }
}
