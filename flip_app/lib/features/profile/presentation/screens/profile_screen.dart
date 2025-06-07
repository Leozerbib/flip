import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import '../../../auth/presentation/view_models/auth_provider.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
    final theme = FTheme.of(context);

    return SingleChildScrollView(
      child: Column(
        children: [
          // Profile Header Card
          FCard(
            title: Text(
              authState.user?.displayName ?? 'Utilisateur',
              style: theme.typography.lg.copyWith(
                fontWeight: FontWeight.bold,
                color: theme.colors.foreground,
              ),
            ),
            subtitle: Text(
              authState.user?.email ?? '',
              style: theme.typography.sm.copyWith(
                color: theme.colors.mutedForeground,
              ),
            ),
            child: Container(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  // Avatar
                  Container(
                    width: 60,
                    height: 60,
                    decoration: BoxDecoration(
                      color: theme.colors.primary,
                      borderRadius: BorderRadius.circular(30),
                    ),
                    child: Icon(
                      FIcons.user,
                      size: 30,
                      color: theme.colors.primaryForeground,
                    ),
                  ),
                  const SizedBox(width: 16),

                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Membre depuis',
                          style: theme.typography.xs.copyWith(
                            color: theme.colors.mutedForeground,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          _formatDate(
                            authState.user?.createdAt ?? DateTime.now(),
                          ),
                          style: theme.typography.sm.copyWith(
                            fontWeight: FontWeight.w500,
                            color: theme.colors.foreground,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),

          // Stats Card
          FCard(
            title: Text(
              'Statistiques',
              style: theme.typography.lg.copyWith(
                fontWeight: FontWeight.bold,
                color: theme.colors.foreground,
              ),
            ),
            child: Container(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: _buildStatCard(
                          context,
                          icon: FIcons.star,
                          title: 'XP',
                          value: '0',
                          color: theme.colors.primary,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: _buildStatCard(
                          context,
                          icon: FIcons.zap,
                          title: 'Points',
                          value: '0',
                          color: theme.colors.primary,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  Row(
                    children: [
                      Expanded(
                        child: _buildStatCard(
                          context,
                          icon: FIcons.user,
                          title: 'Niveau',
                          value: '1',
                          color: theme.colors.primary,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: _buildStatCard(
                          context,
                          icon: FIcons.calendar,
                          title: 'Jours',
                          value: _calculateDaysSince(
                            authState.user?.createdAt,
                          ).toString(),
                          color: theme.colors.primary,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),

          // Profile Information Card
          FCard(
            title: Text(
              'Informations du profil',
              style: theme.typography.lg.copyWith(
                fontWeight: FontWeight.bold,
                color: theme.colors.foreground,
              ),
            ),
            child: Container(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  if (authState.user != null) ...[
                    _buildProfileInfo(
                      context,
                      'Email',
                      authState.user!.email ?? '',
                    ),
                    _buildProfileInfo(
                      context,
                      'Nom d\'utilisateur',
                      authState.user!.username,
                    ),
                    _buildProfileInfo(
                      context,
                      'Nom d\'affichage',
                      authState.user!.displayName,
                    ),
                  ],
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),

          // Actions Card
          FCard(
            title: Text(
              'Actions',
              style: theme.typography.lg.copyWith(
                fontWeight: FontWeight.bold,
                color: theme.colors.foreground,
              ),
            ),
            child: Container(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  // Edit Profile Button
                  SizedBox(
                    width: double.infinity,
                    child: FButton(
                      onPress: () {
                        // TODO: Implement edit profile
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(FIcons.user, size: 20),
                          const SizedBox(width: 8),
                          const Text('Modifier le profil'),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Settings Button
                  SizedBox(
                    width: double.infinity,
                    child: FButton(
                      onPress: () {
                        // TODO: Implement settings
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(FIcons.settings, size: 20),
                          const SizedBox(width: 8),
                          const Text('Paramètres'),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Logout Button
                  SizedBox(
                    width: double.infinity,
                    child: FButton(
                      onPress: () => _handleLogout(ref),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(FIcons.logOut, size: 20),
                          const SizedBox(width: 8),
                          const Text('Se déconnecter'),
                        ],
                      ),
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

  Widget _buildStatCard(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String value,
    required Color color,
  }) {
    final theme = FTheme.of(context);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: theme.colors.secondary,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: theme.colors.border),
      ),
      child: Column(
        children: [
          Icon(icon, size: 24, color: color),
          const SizedBox(height: 8),
          Text(
            value,
            style: theme.typography.xl.copyWith(
              fontWeight: FontWeight.bold,
              color: theme.colors.foreground,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            title,
            style: theme.typography.xs.copyWith(
              color: theme.colors.mutedForeground,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProfileInfo(BuildContext context, String label, String value) {
    final theme = FTheme.of(context);

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 120,
            child: Text(
              label,
              style: theme.typography.sm.copyWith(
                fontWeight: FontWeight.w500,
                color: theme.colors.mutedForeground,
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: theme.typography.sm.copyWith(
                color: theme.colors.foreground,
              ),
            ),
          ),
        ],
      ),
    );
  }

  String _formatDate(DateTime? date) {
    if (date == null) return 'Inconnue';
    return '${date.day}/${date.month}/${date.year}';
  }

  int _calculateDaysSince(DateTime? date) {
    if (date == null) return 0;
    return DateTime.now().difference(date).inDays;
  }

  void _handleLogout(WidgetRef ref) {
    ref.read(authProvider.notifier).logout();
  }
}
