# Système de Providers Globaux - Flip App

Ce système de providers globaux gère l'état et l'environnement de l'application ainsi que toutes les données utilisateur.

## Architecture

```
/core/provider/
├── app_provider.dart      # Provider global de l'application
├── user_provider.dart     # Provider des données utilisateur  
├── index.dart            # Exports
├── example_usage.dart    # Exemples d'utilisation
└── README.md            # Cette documentation
```

## Flow d'initialisation

```
app launch → init service → app provider init → auth check → user provider init → app ready
```

1. **App Launch** : L'application démarre via `FlipApp`
2. **Init Service** : `InitService` initialise l'app avec environnement et config
3. **App Provider Init** : État global configuré (env, version, features)
4. **Auth Check** : Vérification de l'authentification existante
5. **User Provider Init** : Si utilisateur connecté, chargement de ses données
6. **App Ready** : L'application est prête et utilise le router normal

## AppProvider

Gère l'état global et l'environnement de l'application.

### États disponibles

```dart
enum AppEnvironment { development, staging, production }
enum AppStatus { initializing, ready, error, maintenance }
```

### Utilisation

```dart
// Observer l'état de l'app
final appState = ref.watch(appProvider);

// Observer des valeurs spécifiques
final environment = ref.watch(environmentProvider);
final apiUrl = ref.watch(apiBaseUrlProvider);
final isDebug = ref.watch(isDebugModeProvider);

// Actions
ref.read(appProvider.notifier).initialize(
  environment: AppEnvironment.production,
  version: '1.0.0',
  config: {'feature_analytics': true},
);

ref.read(appProvider.notifier).toggleFeature('notifications', true);
ref.read(appProvider.notifier).updateConfigValue('api_timeout', 30000);
```

### Fonctionnalités

- **Gestion d'environnements** : Development, Staging, Production
- **Configuration dynamique** : Features flags, timeouts, etc.
- **Mode maintenance** : Activation/désactivation globale
- **Versioning** : Suivi version et build number
- **Feature flags** : Activation/désactivation de fonctionnalités

## UserProvider

Gère toutes les données et actions utilisateur.

### Utilisation

```dart
// Observer l'état utilisateur
final userState = ref.watch(userProvider);

// Observer des valeurs spécifiques
final coins = ref.watch(userCoinsProvider);
final level = ref.watch(userLevelProvider);
final isAuth = ref.watch(isUserAuthenticatedProvider);

// Actions
ref.read(userProvider.notifier).addCoins(100);
ref.read(userProvider.notifier).spendGems(50);
ref.read(userProvider.notifier).addXP(200);
ref.read(userProvider.notifier).updatePreference('theme', 'dark');
```

### Fonctionnalités

- **Synchronisation auto** : Écoute les changements d'auth pour init/clear
- **Économie de jeu** : Gestion coins, gems, XP, niveaux
- **Préférences** : Stockage des préférences utilisateur
- **Inventaire simulé** : Pranks, packs, items
- **Statistiques** : Suivi activité utilisateur
- **Achievements** : Système de réalisations

## InitService

Service singleton qui orchestre l'initialisation complète de l'application.

### Utilisation

```dart
// Initialisation automatique via app.dart
await ref.read(initServiceProvider).initializeApp(ref);

// Vérifier si initialisé
final isReady = ref.watch(isAppReadyProvider);

// Reset pour tests
await ref.read(initServiceProvider).resetApp(ref);
```

### Processus d'initialisation

1. **App State** : Configuration environnement, version, features
2. **Auth Check** : Vérification session existante
3. **Services** : Initialisation services additionnels
4. **Providers** : Auto-init des providers basés sur l'auth

## Providers dérivés

Créez des providers personnalisés basés sur les providers existants :

```dart
// Stats calculées
final userStatsProvider = Provider<Map<String, dynamic>>((ref) {
  final userState = ref.watch(userProvider);
  return {
    'coins': userState.userData['coins'] ?? 0,
    'level': userState.userData['level'] ?? 1,
    'progress': (userState.userData['xp'] % 100) / 100,
  };
});

// Logique métier
final canBuyPackProvider = Provider.family<bool, int>((ref, price) {
  final coins = ref.watch(userCoinsProvider);
  return coins >= price;
});

// Dans un widget
final canBuy = ref.watch(canBuyPackProvider(500));
```

## Écrans de chargement

Le système intègre des écrans de chargement automatiques :

- **Initialisation** : Pendant le setup initial
- **Authentification** : Pendant la vérification auth
- **Erreurs** : Écran d'erreur avec retry
- **Maintenance** : Mode maintenance global

## Intégration dans app.dart

```dart
class FlipApp extends ConsumerStatefulWidget {
  // Utilise InitService pour initialiser l'app
  // Affiche LoadingScreen pendant l'init
  // Gère les erreurs et retry
  // Utilise router normal une fois prêt
}
```

## Exemples concrets

Voir `example_usage.dart` pour des exemples complets d'utilisation dans des widgets.

## Logging

Le système utilise `dart:developer` pour le logging avec des messages structurés et emojis pour une meilleure lisibilité.

## Tests

Pour les tests, utilisez :

```dart
// Reset complet
await ref.read(initServiceProvider).resetApp(ref);

// Providers individuels
ref.invalidate(appProvider);
ref.invalidate(userProvider);
```

## Bonnes pratiques

1. **Utilisez les providers spécifiques** : `userCoinsProvider` plutôt que `userProvider`
2. **Créez des providers dérivés** : Pour la logique métier complexe
3. **Gérez les erreurs** : Observez les erreurs et affichez-les à l'utilisateur
4. **Optimisez les watches** : N'observez que ce dont vous avez besoin
5. **Testez les états** : Assurez-vous que tous les états sont gérés

## Dépendances

- `flutter_riverpod` : Gestion d'état
- `dart:developer` : Logging
- Intégration avec le système d'auth existant 