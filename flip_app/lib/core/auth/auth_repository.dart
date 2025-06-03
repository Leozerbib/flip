import 'package:dio/dio.dart';
import 'package:google_sign_in/google_sign_in.dart';
import '../api/api_client.dart';
import '../config/app_config.dart';
import '../config/app_constants.dart';
import '../../features/auth/data/models/auth_models.dart';
import '../../data/models/user_model.dart';
import 'auth_service.dart';

class AuthRepository {
  final GoogleSignIn _googleSignIn = GoogleSignIn(
    clientId: AppConfig.googleClientId,
  );

  // Connexion avec email/password
  Future<AuthResponse> login(LoginRequest request) async {
    try {
      final response = await ApiClient.post<Map<String, dynamic>>(
        '/auth/login',
        data: request.toJson(),
      );

      if (response.data == null) {
        throw Exception(AppConstants.errorGeneral);
      }

      return AuthResponse.fromJson(response.data!);
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  // Inscription avec email/password
  Future<AuthResponse> register(RegisterRequest request) async {
    try {
      final response = await ApiClient.post<Map<String, dynamic>>(
        '/auth/register',
        data: request.toJson(),
      );

      if (response.data == null) {
        throw Exception(AppConstants.errorGeneral);
      }

      return AuthResponse.fromJson(response.data!);
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  // Connexion avec Google
  Future<AuthResponse> loginWithGoogle() async {
    try {
      // Étape 1: Authentification Google côté client
      final googleUser = await _googleSignIn.signIn();
      if (googleUser == null) {
        throw Exception('Connexion Google annulée');
      }

      final googleAuth = await googleUser.authentication;
      if (googleAuth.accessToken == null) {
        throw Exception('Impossible de récupérer le token Google');
      }

      // Étape 2: Envoyer le token Google au backend
      final response = await ApiClient.post<Map<String, dynamic>>(
        '/auth/google',
        data: {
          'accessToken': googleAuth.accessToken,
          'idToken': googleAuth.idToken,
        },
      );

      if (response.data == null) {
        throw Exception(AppConstants.errorGeneral);
      }

      return AuthResponse.fromJson(response.data!);
    } on DioException catch (e) {
      throw _handleDioError(e);
    } catch (e) {
      throw Exception('Erreur lors de la connexion Google: $e');
    }
  }

  // Renouveler le token
  Future<RefreshTokenResponse> refreshToken() async {
    try {
      final refreshToken = await AuthService.getRefreshToken();
      if (refreshToken == null) {
        throw Exception('Aucun token de refresh disponible');
      }

      final response = await ApiClient.post<Map<String, dynamic>>(
        '/auth/refresh',
        data: {'refreshToken': refreshToken},
      );

      if (response.data == null) {
        throw Exception(AppConstants.errorGeneral);
      }

      return RefreshTokenResponse.fromJson(response.data!);
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  // Déconnexion
  Future<void> logout() async {
    try {
      // Déconnexion côté serveur
      await ApiClient.post('/auth/logout');
    } catch (e) {
      // Même si la déconnexion côté serveur échoue, on supprime la session locale
    } finally {
      // Nettoyer la session locale
      await AuthService.clearSession();
      
      // Déconnecter Google si nécessaire
      if (await _googleSignIn.isSignedIn()) {
        await _googleSignIn.signOut();
      }
    }
  }

  // Vérifier le statut d'authentification
  Future<bool> checkAuthStatus() async {
    try {
      final isLoggedIn = await AuthService.isLoggedIn();
      if (!isLoggedIn) return false;

      // Vérifier si le token est encore valide côté serveur
      final response = await ApiClient.get('/auth/check');
      return response.statusCode == 200;
    } catch (e) {
      // En cas d'erreur, considérer comme non authentifié
      return false;
    }
  }

  // Récupérer l'utilisateur actuel depuis le stockage local
  Future<UserModel?> getCurrentUser() async {
    return await AuthService.getUserData();
  }

  // Gestion des erreurs Dio
  Exception _handleDioError(DioException e) {
    switch (e.response?.statusCode) {
      case 400:
        return Exception('Données invalides');
      case 401:
        return Exception(AppConstants.errorInvalidCredentials);
      case 409:
        return Exception(AppConstants.errorEmailExists);
      case 500:
        return Exception('Erreur serveur');
      default:
        if (e.type == DioExceptionType.connectionTimeout ||
            e.type == DioExceptionType.receiveTimeout) {
          return Exception(AppConstants.errorNetwork);
        }
        return Exception(e.message ?? AppConstants.errorGeneral);
    }
  }
} 