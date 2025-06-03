class AppConstants {
  // Clés de stockage sécurisé
  static const String accessTokenKey = 'access_token';
  static const String refreshTokenKey = 'refresh_token';
  static const String userDataKey = 'user_data';

  // Durées
  static const Duration tokenRefreshThreshold = Duration(minutes: 5);
  static const Duration networkTimeout = Duration(seconds: 30);

  // Messages d'erreur
  static const String errorGeneral = 'Une erreur est survenue';
  static const String errorNetwork = 'Erreur de connexion réseau';
  static const String errorUnauthorized = 'Session expirée, veuillez vous reconnecter';
  static const String errorInvalidCredentials = 'Identifiants incorrects';
  static const String errorEmailExists = 'Cette adresse email est déjà utilisée';

  // Messages de succès
  static const String successLogin = 'Connexion réussie';
  static const String successRegister = 'Compte créé avec succès';
  static const String successLogout = 'Déconnexion réussie';
} 