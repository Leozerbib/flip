import '../utils/logger.dart';
import 'api_client.dart';
import '../../data/models/user_model.dart';

class UserService {
  static const String _basePath = '/api/users';

  // ==================== USER SEARCH ====================

  /// Rechercher des utilisateurs par nom d'utilisateur
  static Future<List<UserModel>> searchUsers(String query) async {
    try {
      AppLogger.info('Recherche d\'utilisateurs: $query');

      final response = await ApiClient.get(
        '$_basePath/search',
        queryParameters: {'query': query},
      );

      if (response.data['total'] == 0) {
        return [];
      }

      AppLogger.info('Utilisateurs trouvés: ${response.data['total']}');
      var data = response.data as Map<String, dynamic>;
      return (data['users'] as List)
          .map((json) => UserModel.fromJson(json))
          .toList();
    } catch (e) {
      AppLogger.error('Erreur lors de la recherche d\'utilisateurs: $e');
      rethrow;
    }
  }

  /// Obtenir un utilisateur par ID
  static Future<UserModel> getUserById(int userId) async {
    try {
      AppLogger.info('Récupération utilisateur par ID: $userId');

      final response = await ApiClient.get('$_basePath/id/$userId');

      AppLogger.info('Utilisateur récupéré: ${response.data['username']}');
      return UserModel.fromJson(response.data);
    } catch (e) {
      AppLogger.error('Erreur lors de la récupération de l\'utilisateur: $e');
      rethrow;
    }
  }

  /// Obtenir un utilisateur par nom d'utilisateur
  static Future<UserModel> getUserByUsername(String username) async {
    try {
      AppLogger.info('Récupération utilisateur par username: $username');

      final response = await ApiClient.get('$_basePath/username/$username');

      AppLogger.info('Utilisateur récupéré: ${response.data['username']}');
      return UserModel.fromJson(response.data);
    } catch (e) {
      AppLogger.error('Erreur lors de la récupération de l\'utilisateur: $e');
      rethrow;
    }
  }

  /// Obtenir le profil public d'un utilisateur
  static Future<Map<String, dynamic>> getUserProfile(int userId) async {
    try {
      AppLogger.info('Récupération du profil utilisateur: $userId');

      final response = await ApiClient.get('$_basePath/profile/$userId');

      AppLogger.info('Profil utilisateur récupéré');
      return response.data;
    } catch (e) {
      AppLogger.error('Erreur lors de la récupération du profil: $e');
      rethrow;
    }
  }

  /// Obtenir les statistiques d'un utilisateur
  static Future<Map<String, dynamic>> getUserStats(int userId) async {
    try {
      AppLogger.info('Récupération des statistiques utilisateur: $userId');

      final response = await ApiClient.get('$_basePath/stats/$userId');

      AppLogger.info('Statistiques utilisateur récupérées');
      return response.data;
    } catch (e) {
      AppLogger.error('Erreur lors de la récupération des statistiques: $e');
      rethrow;
    }
  }

  /// Obtenir l'utilisateur connecté
  static Future<UserModel> getCurrentUser() async {
    try {
      AppLogger.info('Récupération de l\'utilisateur connecté');

      final response = await ApiClient.get('$_basePath/me');

      AppLogger.info(
        'Utilisateur connecté récupéré: ${response.data['username']}',
      );
      return UserModel.fromJson(response.data);
    } catch (e) {
      AppLogger.error(
        'Erreur lors de la récupération de l\'utilisateur connecté: $e',
      );
      rethrow;
    }
  }
}
