import 'package:flutter_dotenv/flutter_dotenv.dart';

class AppConfig {
  static String get apiBaseUrl => dotenv.env['API_BASE_URL'] ?? 'unvalid';
  static String get frontendUrl => dotenv.env['FRONTEND_URL'] ?? 'unvalid';
  static String get googleClientId =>
      dotenv.env['GOOGLE_CLIENT_ID'] ?? 'unvalid';
  static bool get debugMode => dotenv.env['DEBUG_MODE'] == 'true';

  // Endpoints API
  static String get authBaseUrl => '$apiBaseUrl/api/auth';
  static String get usersBaseUrl => '$apiBaseUrl/api/users';
  static String get friendshipsBaseUrl => '$apiBaseUrl/api/friendships';

  static String get loginUrl => '$authBaseUrl/login';
  static String get registerUrl => '$authBaseUrl/register';
  static String get refreshUrl => '$authBaseUrl/refresh';
  static String get logoutUrl => '$authBaseUrl/logout';
  static String get validateTokenUrl => '$authBaseUrl/validate-token';
  static String get googleAuthUrl => '$authBaseUrl/google';
  static String get googleVerifyIdTokenUrl =>
      '$authBaseUrl/google/verify-id-token';
  static String get checkAuthUrl => '$authBaseUrl/check';

  // Initialisation
  static Future<void> initialize() async {
    await dotenv.load(fileName: '.env');
  }
}
