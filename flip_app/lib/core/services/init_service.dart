import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../utils/logger.dart';
import '../provider/app_provider.dart';
import '../provider/user_provider.dart';
import '../../features/auth/presentation/view_models/auth_provider.dart';
import '../../features/auth/data/models/auth_models.dart' show AuthStatus;

/// Service d'initialisation de l'application
class InitService {
  static InitService? _instance;
  static InitService get instance => _instance ??= InitService._();
  InitService._();

  bool _isInitialized = false;

  /// Vérifie si le service a été initialisé
  bool get isInitialized => _isInitialized;

  /// Initialise l'application complète
  Future<void> initializeApp(WidgetRef ref) async {
    if (_isInitialized) {
      AppLogger.warning('Application déjà initialisée');
      return;
    }

    try {
      AppLogger.info('🚀 Début de l\'initialisation de l\'application');

      // 1. Initialisation de base de l'app
      await _initializeAppState(ref);

      // 2. Vérification de l'authentification
      await _checkAuthentication(ref);

      // 3. Initialisation des services
      await _initializeServices();

      _isInitialized = true;
      AppLogger.info('✅ Application initialisée avec succès');
    } catch (e, stackTrace) {
      AppLogger.error(
        '❌ Erreur lors de l\'initialisation de l\'application: $e',
      );
      rethrow;
    }
  }

  /// Initialise l'état de base de l'application
  Future<void> _initializeAppState(WidgetRef ref) async {
    try {
      AppLogger.info('📱 Initialisation de l\'état de l\'application');

      // Détermination de l'environnement
      AppEnvironment environment = AppEnvironment.development;

      // En production, on utiliserait des variables d'environnement
      const String? envString = String.fromEnvironment('APP_ENV');
      switch (envString) {
        case 'production':
          environment = AppEnvironment.production;
          break;
        case 'staging':
          environment = AppEnvironment.staging;
          break;
        default:
          environment = AppEnvironment.development;
      }

      // Configuration de base
      final config = {
        'feature_notifications': true,
        'feature_analytics': environment != AppEnvironment.development,
        'feature_crashlytics': environment == AppEnvironment.production,
        'feature_debug_menu': environment == AppEnvironment.development,
        'api_timeout': 30000,
        'max_retries': 3,
      };

      // Initialisation du provider d'application
      await ref
          .read(appProvider.notifier)
          .initialize(
            environment: environment,
            version: '1.0.0', // Version par défaut
            buildNumber: '1', // Build par défaut
            config: config,
          );

      AppLogger.info('✅ État de l\'application initialisé');
    } catch (e, stackTrace) {
      AppLogger.error('❌ Erreur lors de l\'initialisation de l\'état: $e');
      rethrow;
    }
  }

  /// Vérifie l'état d'authentification
  Future<void> _checkAuthentication(WidgetRef ref) async {
    try {
      AppLogger.info('🔐 Vérification de l\'authentification');

      // Le provider d'auth vérifie automatiquement l'état au démarrage
      // On attend que la vérification soit terminée

      // Attendre que l'état d'auth soit stable (pas en loading)
      var attempts = 0;
      while (attempts < 30) {
        // 3 secondes max
        final authState = ref.read(authProvider);
        if (authState.status != AuthStatus.loading &&
            authState.status != AuthStatus.initial) {
          break;
        }
        await Future.delayed(const Duration(milliseconds: 100));
        attempts++;
      }

      final authState = ref.read(authProvider);

      switch (authState.status) {
        case AuthStatus.authenticated:
          AppLogger.info(
            '✅ Utilisateur authentifié: ${authState.user?.username}',
          );
          break;
        case AuthStatus.unauthenticated:
          AppLogger.info('ℹ️ Utilisateur non authentifié');
          break;
        case AuthStatus.error:
          AppLogger.warning(
            '⚠️ Erreur d\'authentification: ${authState.error}',
          );
          break;
        default:
          AppLogger.warning(
            '⚠️ État d\'authentification inconnu: ${authState.status}',
          );
      }
    } catch (e, stackTrace) {
      AppLogger.error(
        '❌ Erreur lors de la vérification d\'authentification: $e',
      );
      // On ne relance pas l'erreur ici car l'app peut continuer sans auth
    }
  }

  /// Initialise les services additionnels
  Future<void> _initializeServices() async {
    try {
      AppLogger.info('🔧 Initialisation des services');

      // Ici on pourrait initialiser d'autres services :
      // - Service de notifications
      // - Service d'analytics
      // - Service de crashlytics
      // - Cache
      // - etc.

      // Simulation d'initialisation
      await Future.delayed(const Duration(milliseconds: 200));

      AppLogger.info('✅ Services initialisés');
    } catch (e, stackTrace) {
      AppLogger.error('❌ Erreur lors de l\'initialisation des services: $e');
      rethrow;
    }
  }

  /// Réinitialise l'application (utile pour les tests ou changements d'environnement)
  Future<void> resetApp(WidgetRef ref) async {
    try {
      AppLogger.info('🔄 Réinitialisation de l\'application');

      // Déconnexion si nécessaire
      final authState = ref.read(authProvider);
      if (authState.status == AuthStatus.authenticated) {
        await ref.read(authProvider.notifier).logout();
      }

      // Reset des providers
      ref.invalidate(appProvider);
      ref.invalidate(userProvider);

      _isInitialized = false;

      AppLogger.info('✅ Application réinitialisée');
    } catch (e, stackTrace) {
      AppLogger.error('❌ Erreur lors de la réinitialisation: $e');
      rethrow;
    }
  }
}

/// Provider pour le service d'initialisation
final initServiceProvider = Provider<InitService>((ref) {
  return InitService.instance;
});

/// Provider pour l'état d'initialisation
final isAppReadyProvider = Provider<bool>((ref) {
  final appState = ref.watch(appProvider);
  final initService = ref.watch(initServiceProvider);

  return appState.isInitialized &&
      initService.isInitialized &&
      appState.status == AppStatus.ready;
});
