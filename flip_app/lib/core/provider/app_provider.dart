import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../utils/logger.dart';

/// Énumération des environnements possibles
enum AppEnvironment { development, staging, production }

extension AppEnvironmentExtension on AppEnvironment {
  String get name {
    switch (this) {
      case AppEnvironment.development:
        return 'Development';
      case AppEnvironment.staging:
        return 'Staging';
      case AppEnvironment.production:
        return 'Production';
    }
  }

  String get apiBaseUrl {
    switch (this) {
      case AppEnvironment.development:
        return 'http://localhost:4001';
      case AppEnvironment.staging:
        return 'https://staging-api.flip.com';
      case AppEnvironment.production:
        return 'https://api.flip.com';
    }
  }

  bool get isDebugMode {
    return this == AppEnvironment.development;
  }
}

/// Énumération des états de l'application
enum AppStatus { initializing, ready, error, maintenance }

/// État global de l'application
class AppState {
  final AppStatus status;
  final AppEnvironment environment;
  final String? version;
  final String? buildNumber;
  final bool isInitialized;
  final String? error;
  final Map<String, dynamic> config;
  final DateTime? lastUpdated;

  const AppState({
    this.status = AppStatus.initializing,
    this.environment = AppEnvironment.development,
    this.version,
    this.buildNumber,
    this.isInitialized = false,
    this.error,
    this.config = const {},
    this.lastUpdated,
  });

  AppState copyWith({
    AppStatus? status,
    AppEnvironment? environment,
    String? version,
    String? buildNumber,
    bool? isInitialized,
    String? error,
    Map<String, dynamic>? config,
    DateTime? lastUpdated,
    bool clearError = false,
  }) {
    return AppState(
      status: status ?? this.status,
      environment: environment ?? this.environment,
      version: version ?? this.version,
      buildNumber: buildNumber ?? this.buildNumber,
      isInitialized: isInitialized ?? this.isInitialized,
      error: clearError ? null : (error ?? this.error),
      config: config ?? this.config,
      lastUpdated: lastUpdated ?? this.lastUpdated,
    );
  }

  @override
  String toString() {
    return 'AppState(status: $status, environment: ${environment.name}, isInitialized: $isInitialized)';
  }
}

/// Notifier pour gérer l'état global de l'application
class AppStateNotifier extends StateNotifier<AppState> {
  AppStateNotifier() : super(const AppState()) {
    AppLogger.info('AppStateNotifier initialisé');
  }

  /// Initialise l'application avec l'environnement spécifié
  Future<void> initialize({
    required AppEnvironment environment,
    String? version,
    String? buildNumber,
    Map<String, dynamic>? config,
  }) async {
    try {
      AppLogger.info(
        'Initialisation de l\'application - Environnement: ${environment.name}',
      );

      state = state.copyWith(
        status: AppStatus.initializing,
        environment: environment,
        version: version,
        buildNumber: buildNumber,
        config: config ?? {},
        lastUpdated: DateTime.now(),
        clearError: true,
      );

      // Simulation d'initialisation (chargement config, vérifications, etc.)
      await Future.delayed(const Duration(milliseconds: 500));

      state = state.copyWith(
        status: AppStatus.ready,
        isInitialized: true,
        lastUpdated: DateTime.now(),
      );

      AppLogger.info('Application initialisée avec succès');
    } catch (e, stackTrace) {
      AppLogger.error('Erreur lors de l\'initialisation de l\'application: $e');

      state = state.copyWith(
        status: AppStatus.error,
        error: e.toString(),
        lastUpdated: DateTime.now(),
      );
    }
  }

  /// Met à jour la configuration de l'application
  void updateConfig(Map<String, dynamic> newConfig) {
    AppLogger.info('Mise à jour de la configuration de l\'application');

    final updatedConfig = Map<String, dynamic>.from(state.config);
    updatedConfig.addAll(newConfig);

    state = state.copyWith(config: updatedConfig, lastUpdated: DateTime.now());
  }

  /// Met à jour un élément spécifique de la configuration
  void updateConfigValue(String key, dynamic value) {
    AppLogger.info('Mise à jour de la valeur de configuration: $key');

    final updatedConfig = Map<String, dynamic>.from(state.config);
    updatedConfig[key] = value;

    state = state.copyWith(config: updatedConfig, lastUpdated: DateTime.now());
  }

  /// Active le mode maintenance
  void enableMaintenanceMode(String reason) {
    AppLogger.warning('Mode maintenance activé: $reason');

    state = state.copyWith(
      status: AppStatus.maintenance,
      error: reason,
      lastUpdated: DateTime.now(),
    );
  }

  /// Désactive le mode maintenance
  void disableMaintenanceMode() {
    AppLogger.info('Mode maintenance désactivé');

    state = state.copyWith(
      status: AppStatus.ready,
      lastUpdated: DateTime.now(),
      clearError: true,
    );
  }

  /// Efface les erreurs
  void clearError() {
    state = state.copyWith(clearError: true);
  }

  /// Récupère une valeur de configuration
  T? getConfigValue<T>(String key) {
    return state.config[key] as T?;
  }

  /// Vérifie si une fonctionnalité est activée
  bool isFeatureEnabled(String featureName) {
    return getConfigValue<bool>('feature_$featureName') ?? false;
  }

  /// Active/désactive une fonctionnalité
  void toggleFeature(String featureName, bool enabled) {
    updateConfigValue('feature_$featureName', enabled);
    AppLogger.info(
      'Fonctionnalité $featureName ${enabled ? 'activée' : 'désactivée'}',
    );
  }
}

/// Provider global pour l'état de l'application
final appProvider = StateNotifierProvider<AppStateNotifier, AppState>((ref) {
  return AppStateNotifier();
});

/// Provider pour l'environnement actuel
final environmentProvider = Provider<AppEnvironment>((ref) {
  return ref.watch(appProvider).environment;
});

/// Provider pour l'URL de base de l'API
final apiBaseUrlProvider = Provider<String>((ref) {
  return ref.watch(environmentProvider).apiBaseUrl;
});

/// Provider pour vérifier si l'app est en mode debug
final isDebugModeProvider = Provider<bool>((ref) {
  return ref.watch(environmentProvider).isDebugMode;
});

/// Provider pour vérifier si l'app est initialisée
final isAppInitializedProvider = Provider<bool>((ref) {
  return ref.watch(appProvider).isInitialized;
});

/// Provider pour récupérer la configuration de l'app
final appConfigProvider = Provider<Map<String, dynamic>>((ref) {
  return ref.watch(appProvider).config;
});
