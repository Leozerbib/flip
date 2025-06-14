import 'package:flip_app/core/api/banque_service.dart';
import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../../data/models/models.dart';

class StatsTab extends StatelessWidget {
  final BanqueStatsModel? stats;
  final UserBalanceModel? balance;
  final bool isLoading;
  final VoidCallback onRefresh;

  const StatsTab({
    super.key,
    required this.stats,
    required this.balance,
    required this.isLoading,
    required this.onRefresh,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return RefreshIndicator(
      onRefresh: () async => onRefresh(),
      child: isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Solde actuel
                  if (balance != null) ...[
                    _buildBalanceCard(context),
                    const SizedBox(height: 16),
                  ],

                  // Statistiques des services
                  if (stats?.serviceStats != null) ...[
                    Text(
                      'Services',
                      style: theme.typography.lg.copyWith(
                        fontWeight: FontWeight.w600,
                        color: theme.colors.foreground,
                      ),
                    ),
                    const SizedBox(height: 12),
                    _buildServiceStatsCard(context),
                    const SizedBox(height: 24),
                  ],

                  // Statistiques des pranks
                  if (stats?.prankStats != null) ...[
                    Text(
                      'Pranks',
                      style: theme.typography.lg.copyWith(
                        fontWeight: FontWeight.w600,
                        color: theme.colors.foreground,
                      ),
                    ),
                    const SizedBox(height: 12),
                    _buildPrankStatsCard(context),
                  ],

                  // Message si pas de stats
                  if (stats == null) _buildEmptyState(context),
                ],
              ),
            ),
    );
  }

  Widget _buildBalanceCard(BuildContext context) {
    final theme = FTheme.of(context);

    return FCard(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(FIcons.wallet, size: 24, color: theme.colors.primary),
                const SizedBox(width: 12),
                Text(
                  'Mon solde',
                  style: theme.typography.lg.copyWith(
                    fontWeight: FontWeight.w600,
                    color: theme.colors.foreground,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Jetons
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: theme.colors.primary,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    FIcons.zap,
                    size: 24,
                    color: theme.colors.primaryForeground,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${balance!.jetonBalance}',
                        style: theme.typography.xl2.copyWith(
                          fontWeight: FontWeight.bold,
                          color: theme.colors.foreground,
                        ),
                      ),
                      Text(
                        'Jetons disponibles',
                        style: theme.typography.sm.copyWith(
                          color: theme.colors.mutedForeground,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),

            const SizedBox(height: 16),

            // Coins
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.amber,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(FIcons.circle, size: 24, color: Colors.white),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${balance!.coinsBalance}',
                        style: theme.typography.xl2.copyWith(
                          fontWeight: FontWeight.bold,
                          color: theme.colors.foreground,
                        ),
                      ),
                      Text(
                        'Coins',
                        style: theme.typography.sm.copyWith(
                          color: theme.colors.mutedForeground,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),

            const SizedBox(height: 16),

            // XP et Level
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.purple,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(FIcons.star, size: 24, color: Colors.white),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Level ${balance!.level} • ${balance!.xpPoints} XP',
                        style: theme.typography.lg.copyWith(
                          fontWeight: FontWeight.w600,
                          color: theme.colors.foreground,
                        ),
                      ),
                      Text(
                        'Expérience',
                        style: theme.typography.sm.copyWith(
                          color: theme.colors.mutedForeground,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildServiceStatsCard(BuildContext context) {
    final theme = FTheme.of(context);
    final serviceStats = stats!.serviceStats;

    return FCard(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Services fournis vs reçus
            Row(
              children: [
                Expanded(
                  child: _buildStatItem(
                    context,
                    'Services fournis',
                    '${serviceStats.totalServicesProvided}',
                    FIcons.briefcase,
                    Colors.blue,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: _buildStatItem(
                    context,
                    'Services reçus',
                    '${serviceStats.totalServicesReceived}',
                    FIcons.inbox,
                    Colors.green,
                  ),
                ),
              ],
            ),

            const SizedBox(height: 16),

            // Services en attente
            Row(
              children: [
                Expanded(
                  child: _buildStatItem(
                    context,
                    'En attente (prestataire)',
                    '${serviceStats.pendingServicesAsProvider}',
                    FIcons.clock,
                    Colors.orange,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: _buildStatItem(
                    context,
                    'En attente (client)',
                    '${serviceStats.pendingServicesAsClient}',
                    FIcons.clock,
                    Colors.purple,
                  ),
                ),
              ],
            ),

            const SizedBox(height: 16),

            // Jetons
            Row(
              children: [
                Expanded(
                  child: _buildStatItem(
                    context,
                    'Jetons gagnés',
                    '${serviceStats.totalJetonsEarned}',
                    FIcons.plus,
                    Colors.green,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: _buildStatItem(
                    context,
                    'Jetons dépensés',
                    '${serviceStats.totalJetonsSpent}',
                    FIcons.minus,
                    Colors.red,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPrankStatsCard(BuildContext context) {
    final theme = FTheme.of(context);
    final prankStats = stats!.prankStats;

    return FCard(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Pranks exécutés vs reçus
            Row(
              children: [
                Expanded(
                  child: _buildStatItem(
                    context,
                    'Pranks exécutés',
                    '${prankStats.totalPranksExecuted}',
                    FIcons.zap,
                    Colors.orange,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: _buildStatItem(
                    context,
                    'Pranks reçus',
                    '${prankStats.totalPranksReceived}',
                    FIcons.target,
                    Colors.purple,
                  ),
                ),
              ],
            ),

            const SizedBox(height: 16),

            // Pranks en attente
            Row(
              children: [
                Expanded(
                  child: _buildStatItem(
                    context,
                    'En attente (exécuteur)',
                    '${prankStats.pendingPranksAsExecutor}',
                    FIcons.clock,
                    Colors.blue,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: _buildStatItem(
                    context,
                    'En attente (cible)',
                    '${prankStats.pendingPranksAsTarget}',
                    FIcons.clock,
                    Colors.red,
                  ),
                ),
              ],
            ),

            const SizedBox(height: 16),

            // Jetons from pranks
            Row(
              children: [
                Expanded(
                  child: _buildStatItem(
                    context,
                    'Jetons de pranks',
                    '${prankStats.totalJetonsFromPranks}',
                    FIcons.plus,
                    Colors.green,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: _buildStatItem(
                    context,
                    'Jetons pour pranks',
                    '${prankStats.totalJetonsPaidForPranks}',
                    FIcons.minus,
                    Colors.red,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatItem(
    BuildContext context,
    String label,
    String value,
    IconData icon,
    Color color,
  ) {
    final theme = FTheme.of(context);

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color.withOpacity(0.2)),
      ),
      child: Column(
        children: [
          Icon(icon, size: 20, color: color),
          const SizedBox(height: 8),
          Text(
            value,
            style: theme.typography.lg.copyWith(
              fontWeight: FontWeight.bold,
              color: theme.colors.foreground,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: theme.typography.xs.copyWith(
              color: theme.colors.mutedForeground,
            ),
            textAlign: TextAlign.center,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    final theme = FTheme.of(context);

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(FIcons.activity, size: 64, color: theme.colors.mutedForeground),
          const SizedBox(height: 16),
          Text(
            'Aucune statistique disponible',
            style: theme.typography.lg.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.colors.foreground,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Commencez à utiliser les services\net pranks pour voir vos statistiques',
            textAlign: TextAlign.center,
            style: theme.typography.sm.copyWith(
              color: theme.colors.mutedForeground,
            ),
          ),
        ],
      ),
    );
  }
}
