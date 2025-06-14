import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'url_constants.dart';

class AppConfig {
  // Configuration de base
  static String get apiBaseUrl =>
      dotenv.env['API_BASE_URL'] ?? 'http://localhost:4001';
  static String get frontendUrl =>
      dotenv.env['FRONTEND_URL'] ?? 'http://localhost:4001';
  static String get googleClientId => dotenv.env['GOOGLE_CLIENT_ID'] ?? '';
  static String get googleClientSecret =>
      dotenv.env['GOOGLE_CLIENT_SECRET'] ?? '';
  static String get googleRedirectUri =>
      dotenv.env['GOOGLE_REDIRECT_URI'] ??
      'http://localhost:4001/api/auth/google/callback';
  static bool get debugMode => dotenv.env['DEBUG_MODE'] == 'true';

  // Configuration API
  static String get apiPrefix => UrlConstants.apiPrefix;

  // Auth endpoints
  static String get loginUrl => '$apiBaseUrl${UrlConstants.authLogin}';
  static String get registerUrl => '$apiBaseUrl${UrlConstants.authRegister}';
  static String get refreshUrl => '$apiBaseUrl${UrlConstants.authRefresh}';
  static String get logoutUrl => '$apiBaseUrl${UrlConstants.authLogout}';
  static String get profileUrl => '$apiBaseUrl${UrlConstants.authProfile}';
  static String get validateTokenUrl => '$apiBaseUrl${UrlConstants.authValidateToken}';
  static String get googleAuthUrl => '$apiBaseUrl${UrlConstants.authGoogle}';
  static String get googleVerifyIdTokenUrl =>
      '$apiBaseUrl${UrlConstants.authGoogleVerifyIdToken}';
  static String get checkAuthUrl => '$apiBaseUrl${UrlConstants.authCheck}';

  // User endpoints
  static String get userProfileUrl => '$apiBaseUrl${UrlConstants.userProfile}';
  static String get userUpdateUrl => '$apiBaseUrl${UrlConstants.userUpdate}';

  // Shop endpoints
  static String get shopPacksUrl => '$apiBaseUrl${UrlConstants.shopPacks}';
  static String get shopPacksGroupedUrl =>
      '$apiBaseUrl${UrlConstants.shopPacksGrouped}';
  static String get shopBuyPackUrl => '$apiBaseUrl${UrlConstants.shopBuyPack}';
  static String get shopOpenPackUrl =>
      '$apiBaseUrl${UrlConstants.shopOpenPack}';

  // Banque endpoints
  static String get banqueStatsUrl => '$apiBaseUrl${UrlConstants.banqueStats}';
  static String get banqueServicesUrl =>
      '$apiBaseUrl${UrlConstants.banqueServices}';
  static String get banquePranksUrl =>
      '$apiBaseUrl${UrlConstants.banquePranks}';
  static String get banqueTransactionsUrl =>
      '$apiBaseUrl${UrlConstants.banqueTransactions}';

  // Friendship endpoints
  static String get friendshipRequestsUrl =>
      '$apiBaseUrl${UrlConstants.friendshipRequests}';
  static String get friendshipSendUrl =>
      '$apiBaseUrl${UrlConstants.friendshipSend}';
  static String get friendshipAcceptUrl =>
      '$apiBaseUrl${UrlConstants.friendshipAccept}';
  static String get friendshipDeclineUrl =>
      '$apiBaseUrl${UrlConstants.friendshipDecline}';
  static String get friendshipRemoveUrl =>
      '$apiBaseUrl${UrlConstants.friendshipRemove}';
  static String get friendshipStatsUrl =>
      '$apiBaseUrl${UrlConstants.friendshipStats}';

  // Méthodes utilitaires
  static String getUserInventoryUrl(String userId) =>
      '$apiBaseUrl${UrlConstants.replaceUserId(UrlConstants.userInventory, userId)}';
  static String getUserPranksUrl(String userId) =>
      '$apiBaseUrl${UrlConstants.replaceUserId(UrlConstants.userPranks, userId)}';

  // Initialisation
  static Future<void> initialize() async {
    await dotenv.load(fileName: '.env');
  }
}
