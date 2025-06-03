import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import '../../../auth/presentation/view_models/auth_provider.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);

    return FScaffold(
      child: Column(
        children: [
          // Header simple
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Theme.of(context).primaryColor,
            ),
            child: SafeArea(
              bottom: false,
              child: Row(
                children: [
                  const Text(
                    'Accueil',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  const Spacer(),
                  FButton(
                    onPress: () => _showProfileDialog(context, ref),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(FIcons.user, size: 16),
                        const SizedBox(width: 8),
                        Text(authState.user?.displayName ?? 'Utilisateur'),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          
          // Contenu principal
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Carte de bienvenue
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          Theme.of(context).primaryColor,
                          Theme.of(context).primaryColor.withValues(alpha: 0.8),
                        ],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Bienvenue !',
                          style: TextStyle(
                            fontSize: 28,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Salut ${authState.user?.username ?? authState.user?.email ?? 'utilisateur'} 👋',
                          style: const TextStyle(
                            fontSize: 16,
                            color: Colors.white70,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 32),

                  // Informations du profil
                  const Text(
                    'Profil utilisateur',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 16),

                  if (authState.user != null) ...[
                    _buildProfileInfo('Email', authState.user!.email ?? ''),
                    if (authState.user!.username != null)
                      _buildProfileInfo('Nom d\'utilisateur', authState.user!.username!),
                    _buildProfileInfo(
                      'Membre depuis',
                      _formatDate(authState.user!.createdAt ?? DateTime.now()),
                    ),
                  ],

                  const Spacer(),

                  // Section actions
                  const Text(
                    'Actions',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Boutons d'action
                  FButton(
                    onPress: () => _handleLogout(ref),
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(FIcons.logOut, size: 18),
                        SizedBox(width: 8),
                        Text('Se déconnecter'),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProfileInfo(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        children: [
          SizedBox(
            width: 120,
            child: Text(
              '$label:',
              style: const TextStyle(
                fontWeight: FontWeight.w500,
                color: Colors.grey,
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: const TextStyle(
                fontSize: 16,
              ),
            ),
          ),
        ],
      ),
    );
  }

  String _formatDate(DateTime date) {
    return '${date.day}/${date.month}/${date.year}';
  }

  void _showProfileDialog(BuildContext context, WidgetRef ref) {
    final authState = ref.read(authProvider);
    
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Profil utilisateur'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (authState.user != null) ...[
              Text('Email: ${authState.user!.email}'),
              if (authState.user!.username != null)
                Text('Nom d\'utilisateur: ${authState.user!.username}'),
              Text('Membre depuis: ${_formatDate(authState.user!.createdAt ?? DateTime.now())}'),
            ],
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Fermer'),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              _handleLogout(ref);
            },
            child: const Text('Se déconnecter'),
          ),
        ],
      ),
    );
  }

  void _handleLogout(WidgetRef ref) {
    ref.read(authProvider.notifier).logout();
  }
} 