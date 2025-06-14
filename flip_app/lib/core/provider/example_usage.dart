import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'app_provider.dart';
import 'user_provider.dart';

/// Exemple d'écran montrant l'utilisation des providers
class ExampleScreen extends ConsumerWidget {
  const ExampleScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Observer l'état de l'application
    final appState = ref.watch(appProvider);
    final userState = ref.watch(userProvider);

    // Observer des valeurs spécifiques
    final userCoins = ref.watch(userCoinsProvider);
    final userLevel = ref.watch(userLevelProvider);
    final isDebugMode = ref.watch(isDebugModeProvider);

    return Scaffold(
      appBar: AppBar(
        title: Text('Exemple Providers - ${appState.environment.name}'),
        backgroundColor: isDebugMode ? Colors.red : null,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Section App Provider
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'App Provider',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 8),
                    Text('Statut: ${appState.status}'),
                    Text('Environnement: ${appState.environment.name}'),
                    Text('Version: ${appState.version ?? 'N/A'}'),
                    Text('Initialisé: ${appState.isInitialized}'),
                    if (appState.error != null)
                      Text(
                        'Erreur: ${appState.error}',
                        style: const TextStyle(color: Colors.red),
                      ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 16),

            // Section User Provider
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'User Provider',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 8),
                    if (userState.isAuthenticated) ...[
                      Text('Utilisateur: ${userState.username}'),
                      Text('Email: ${userState.email}'),
                      Text('Coins: $userCoins'),
                      Text('Niveau: $userLevel'),
                      Text('Chargement: ${userState.isLoading}'),
                    ] else ...[
                      const Text('Utilisateur non connecté'),
                    ],
                  ],
                ),
              ),
            ),

            const SizedBox(height: 16),

            // Boutons d'actions
            Wrap(
              spacing: 8,
              children: [
                ElevatedButton(
                  onPressed: () {
                    // Exemple d'utilisation des méthodes
                    ref.read(appProvider.notifier).toggleFeature('test', true);
                  },
                  child: const Text('Toggle Feature'),
                ),

                if (userState.isAuthenticated) ...[
                  ElevatedButton(
                    onPressed: () {
                      ref.read(userProvider.notifier).addCoins(100);
                    },
                    child: const Text('Ajouter Coins'),
                  ),

                  ElevatedButton(
                    onPressed: () {
                      ref.read(userProvider.notifier).addXP(50);
                    },
                    child: const Text('Ajouter XP'),
                  ),
                ],

                ElevatedButton(
                  onPressed: () {
                    ref
                        .read(appProvider.notifier)
                        .updateConfigValue('theme', 'dark');
                  },
                  child: const Text('Theme Dark'),
                ),
              ],
            ),

            const SizedBox(height: 16),

            // Configuration
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Configuration',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 8),
                    ...appState.config.entries.map(
                      (entry) => Text('${entry.key}: ${entry.value}'),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Exemple de provider personnalisé basé sur les providers existants
final userStatsProvider = Provider<Map<String, dynamic>>((ref) {
  final userState = ref.watch(userProvider);

  if (!userState.isAuthenticated) {
    return {'status': 'non_connecte'};
  }

  final coins = userState.userData['coins'] as int? ?? 0;
  final level = userState.userData['level'] as int? ?? 1;
  final xp = userState.userData['xp'] as int? ?? 0;

  return {
    'coins': coins,
    'level': level,
    'xp': xp,
    'next_level_xp': level * 100,
    'progress': (xp % 100) / 100,
    'total_pranks': userState.userData['totalPranks'] ?? 0,
    'total_packs': userState.userData['totalPacks'] ?? 0,
  };
});

/// Exemple de provider avec logique métier
final canBuyPackProvider = Provider.family<bool, int>((ref, price) {
  final coins = ref.watch(userCoinsProvider);
  return coins >= price;
});

/// Widget exemple utilisant les providers dérivés
class UserStatsWidget extends ConsumerWidget {
  const UserStatsWidget({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final stats = ref.watch(userStatsProvider);
    final canBuyPack = ref.watch(canBuyPackProvider(500));

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text('Statistiques: ${stats['coins']} coins'),
            Text('Niveau: ${stats['level']}'),
            Text('Progression: ${(stats['progress'] * 100).toInt()}%'),
            if (canBuyPack)
              const Text(
                'Peut acheter un pack !',
                style: TextStyle(color: Colors.green),
              )
            else
              const Text(
                'Pas assez de coins',
                style: TextStyle(color: Colors.red),
              ),
          ],
        ),
      ),
    );
  }
}
