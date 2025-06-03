import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../config/app_constants.dart';
import '../../data/models/user_model.dart';

class AuthService {
  static const FlutterSecureStorage _storage = FlutterSecureStorage(
    aOptions: AndroidOptions(
      encryptedSharedPreferences: true,
    ),
  );

  // Sauvegarder le token d'accès
  static Future<void> saveAccessToken(String token) async {
    await _storage.write(key: AppConstants.accessTokenKey, value: token);
  }

  // Récupérer le token d'accès
  static Future<String?> getAccessToken() async {
    return await _storage.read(key: AppConstants.accessTokenKey);
  }

  // Sauvegarder le token de refresh
  static Future<void> saveRefreshToken(String token) async {
    await _storage.write(key: AppConstants.refreshTokenKey, value: token);
  }

  // Récupérer le token de refresh
  static Future<String?> getRefreshToken() async {
    return await _storage.read(key: AppConstants.refreshTokenKey);
  }

  // Sauvegarder les données utilisateur
  static Future<void> saveUserData(UserModel user) async {
    final userJson = jsonEncode(user.toJson());
    await _storage.write(key: AppConstants.userDataKey, value: userJson);
  }

  // Récupérer les données utilisateur
  static Future<UserModel?> getUserData() async {
    final userJson = await _storage.read(key: AppConstants.userDataKey);
    if (userJson != null) {
      try {
        final userMap = jsonDecode(userJson) as Map<String, dynamic>;
        return UserModel.fromJson(userMap);
      } catch (e) {
        // En cas d'erreur de parsing, supprimer les données corrompues
        await clearUserData();
        return null;
      }
    }
    return null;
  }

  // Sauvegarder la session complète
  static Future<void> saveSession({
    required String accessToken,
    required String refreshToken,
    required UserModel user,
  }) async {
    await Future.wait([
      saveAccessToken(accessToken),
      saveRefreshToken(refreshToken),
      saveUserData(user),
    ]);
  }

  // Vérifier si l'utilisateur est connecté
  static Future<bool> isLoggedIn() async {
    final accessToken = await getAccessToken();
    final refreshToken = await getRefreshToken();
    return accessToken != null && refreshToken != null;
  }

  // Supprimer les données utilisateur
  static Future<void> clearUserData() async {
    await _storage.delete(key: AppConstants.userDataKey);
  }

  // Supprimer tous les tokens et données
  static Future<void> clearSession() async {
    await Future.wait([
      _storage.delete(key: AppConstants.accessTokenKey),
      _storage.delete(key: AppConstants.refreshTokenKey),
      _storage.delete(key: AppConstants.userDataKey),
    ]);
  }

  // Vérifier si le token est encore valide (basé sur le timestamp)
  static bool isTokenExpired(String token) {
    try {
      // Décoder le JWT pour récupérer l'expiration
      final parts = token.split('.');
      if (parts.length != 3) return true;

      final payload = parts[1];
      final normalized = base64Url.normalize(payload);
      final decoded = utf8.decode(base64Url.decode(normalized));
      final payloadMap = jsonDecode(decoded) as Map<String, dynamic>;

      final exp = payloadMap['exp'] as int?;
      if (exp == null) return true;

      final expirationDate = DateTime.fromMillisecondsSinceEpoch(exp * 1000);
      final now = DateTime.now();

      // Vérifier si le token expire dans les 5 prochaines minutes
      return expirationDate.isBefore(now.add(AppConstants.tokenRefreshThreshold));
    } catch (e) {
      return true; // En cas d'erreur, considérer le token comme expiré
    }
  }
} 