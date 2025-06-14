import 'package:flip_app/core/api/user_service.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/models/user_model.dart';
import '../../features/auth/presentation/view_models/auth_provider.dart';
import '../../features/auth/data/models/auth_models.dart' show AuthStatus;

/// État des données utilisateur
class UserState {
  final UserModel? user;
  final Map<String, dynamic> userData;
  final Map<String, dynamic> preferences;
  final bool isLoading;
  final String? error;
  final DateTime? lastSync;

  const UserState({
    this.user,
    this.userData = const {},
    this.preferences = const {},
    this.isLoading = false,
    this.error,
    this.lastSync,
  });

  UserState copyWith({
    UserModel? user,
    Map<String, dynamic>? userData,
    Map<String, dynamic>? preferences,
    bool? isLoading,
    String? error,
    DateTime? lastSync,
    bool clearError = false,
  }) {
    return UserState(
      user: user ?? this.user,
      userData: userData ?? this.userData,
      preferences: preferences ?? this.preferences,
      isLoading: isLoading ?? this.isLoading,
      error: clearError ? null : (error ?? this.error),
      lastSync: lastSync ?? this.lastSync,
    );
  }

  /// Vérifie si l'utilisateur est connecté
  bool get isAuthenticated => user != null;

  /// Récupère l'ID de l'utilisateur
  String? get userId => user?.id;

  /// Récupère le nom d'utilisateur
  String? get username => user?.username;

  /// Récupère l'email de l'utilisateur
  String? get email => user?.email;

  @override
  String toString() {
    return 'UserState(user: ${user?.username}, isLoading: $isLoading, hasData: ${userData.isNotEmpty})';
  }
}

/// Notifier pour gérer les données utilisateur
class UserStateNotifier extends StateNotifier<UserState> {
  UserStateNotifier() : super(const UserState());

  /// Initialise les données utilisateur à partir de l'auth
  void initializeFromAuth(UserModel user) {
    state = state.copyWith(
      user: user,
      lastSync: DateTime.now(),
      clearError: true,
    );

    // Charger les données utilisateur supplémentaires
    _loadUserData();
  }

  /// Charge les données utilisateur depuis l'API
  Future<void> _loadUserData() async {
    if (state.user == null) return;

    try {
      state = state.copyWith(isLoading: true, clearError: true);

      final userData = await UserService.getCurrentUser();

      final preferences = {
        'theme': 'dark',
        'language': 'fr',
        'notifications': true,
        'soundEffects': true,
        'vibration': true,
        'autoSave': true,
      };

      state = state.copyWith(
        user: userData,
        preferences: preferences,
        isLoading: false,
        lastSync: DateTime.now(),
      );
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  /// Met à jour les données utilisateur
  void updateUserData(Map<String, dynamic> data) {
    final updatedData = Map<String, dynamic>.from(state.userData);
    updatedData.addAll(data);

    state = state.copyWith(userData: updatedData, lastSync: DateTime.now());
  }

  /// Met à jour une valeur spécifique des données utilisateur
  void updateUserValue(String key, dynamic value) {
    final updatedData = Map<String, dynamic>.from(state.userData);
    updatedData[key] = value;

    state = state.copyWith(userData: updatedData, lastSync: DateTime.now());
  }

  /// Met à jour les préférences utilisateur
  void updatePreferences(Map<String, dynamic> preferences) {
    final updatedPreferences = Map<String, dynamic>.from(state.preferences);
    updatedPreferences.addAll(preferences);

    state = state.copyWith(
      preferences: updatedPreferences,
      lastSync: DateTime.now(),
    );
  }

  /// Met à jour une préférence spécifique
  void updatePreference(String key, dynamic value) {
    final updatedPreferences = Map<String, dynamic>.from(state.preferences);
    updatedPreferences[key] = value;

    state = state.copyWith(
      preferences: updatedPreferences,
      lastSync: DateTime.now(),
    );
  }

  /// Ajoute des coins à l'utilisateur
  void addCoins(int amount) {
    final currentCoins = getUserValue<int>('coins') ?? 0;
    updateUserValue('coins', currentCoins + amount);
  }

  /// Retire des coins à l'utilisateur
  bool spendCoins(int amount) {
    final currentCoins = getUserValue<int>('coins') ?? 0;
    if (currentCoins >= amount) {
      updateUserValue('coins', currentCoins - amount);
      return true;
    }
    return false;
  }

  /// Ajoute des gemmes à l'utilisateur
  void addGems(int amount) {
    final currentGems = getUserValue<int>('gems') ?? 0;
    updateUserValue('gems', currentGems + amount);
  }

  /// Retire des gemmes à l'utilisateur
  bool spendGems(int amount) {
    final currentGems = getUserValue<int>('gems') ?? 0;
    if (currentGems >= amount) {
      updateUserValue('gems', currentGems - amount);
      return true;
    }
    return false;
  }

  /// Ajoute de l'XP à l'utilisateur
  void addXP(int amount) {
    final currentXP = getUserValue<int>('xp') ?? 0;
    final currentLevel = getUserValue<int>('level') ?? 1;
    final newXP = currentXP + amount;

    // Calcul simple du niveau (100 XP par niveau)
    final newLevel = (newXP / 100).floor() + 1;

    updateUserData({'xp': newXP, 'level': newLevel});

    // Si niveau up, ajouter des récompenses
    if (newLevel > currentLevel) {
      addCoins(50 * newLevel); // Récompense niveau
      addGems(5);
    }
  }

  /// Récupère une valeur des données utilisateur
  T? getUserValue<T>(String key) {
    return state.userData[key] as T?;
  }

  /// Récupère une préférence utilisateur
  T? getPreference<T>(String key) {
    return state.preferences[key] as T?;
  }

  /// Vérifie si l'utilisateur a suffisamment de coins
  bool hasEnoughCoins(int amount) {
    final currentCoins = getUserValue<int>('coins') ?? 0;
    return currentCoins >= amount;
  }

  /// Vérifie si l'utilisateur a suffisamment de gemmes
  bool hasEnoughGems(int amount) {
    final currentGems = getUserValue<int>('gems') ?? 0;
    return currentGems >= amount;
  }

  /// Synchronise les données avec le serveur
  Future<void> syncWithServer() async {
    if (state.user == null) return;

    try {
      state = state.copyWith(isLoading: true, clearError: true);

      // Simulation de la synchronisation
      await Future.delayed(const Duration(milliseconds: 1000));

      state = state.copyWith(isLoading: false, lastSync: DateTime.now());
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: 'Erreur de synchronisation: ${e.toString()}',
      );
    }
  }

  /// Efface les données utilisateur (déconnexion)
  void clearUserData() {
    state = const UserState();
  }

  /// Efface les erreurs
  void clearError() {
    state = state.copyWith(clearError: true);
  }
}

/// Provider principal pour les données utilisateur
final userProvider = StateNotifierProvider<UserStateNotifier, UserState>((ref) {
  return UserStateNotifier();
});

/// Provider qui gère la synchronisation entre auth et user
final userSyncProvider = Provider<void>((ref) {
  final userNotifier = ref.read(userProvider.notifier);
  final authState = ref.watch(authProvider);

  // Synchroniser les données utilisateur basées sur l'auth
  if (authState.user != null && authState.status == AuthStatus.authenticated) {
    // Utilisateur connecté - initialiser ses données si pas déjà fait
    final userState = ref.read(userProvider);
    if (userState.user?.id != authState.user?.id) {
      Future.microtask(() => userNotifier.initializeFromAuth(authState.user!));
    }
  } else if (authState.status == AuthStatus.unauthenticated) {
    // Utilisateur déconnecté - nettoyer ses données
    final userState = ref.read(userProvider);
    if (userState.user != null) {
      Future.microtask(() => userNotifier.clearUserData());
    }
  }
});

/// Provider pour vérifier si l'utilisateur est connecté
final isUserAuthenticatedProvider = Provider<bool>((ref) {
  return ref.watch(userProvider).isAuthenticated;
});

/// Provider pour récupérer l'utilisateur actuel
final currentUserProvider = Provider<UserModel?>((ref) {
  return ref.watch(userProvider).user;
});

/// Provider pour les coins de l'utilisateur
final userCoinsProvider = Provider<int>((ref) {
  return ref.watch(userProvider).userData['coins'] as int? ?? 0;
});

/// Provider pour les gemmes de l'utilisateur
final userGemsProvider = Provider<int>((ref) {
  return ref.watch(userProvider).userData['gems'] as int? ?? 0;
});

/// Provider pour le niveau de l'utilisateur
final userLevelProvider = Provider<int>((ref) {
  return ref.watch(userProvider).userData['level'] as int? ?? 1;
});

/// Provider pour l'XP de l'utilisateur
final userXPProvider = Provider<int>((ref) {
  return ref.watch(userProvider).userData['xp'] as int? ?? 0;
});

/// Provider pour les préférences utilisateur
final userPreferencesProvider = Provider<Map<String, dynamic>>((ref) {
  return ref.watch(userProvider).preferences;
});
