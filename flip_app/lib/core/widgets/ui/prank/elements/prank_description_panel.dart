import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../../data/models/models.dart';

class PrankDescriptionPanel extends StatelessWidget {
  final PrankModel prank;
  final bool isExpanded;
  final bool showStats;

  const PrankDescriptionPanel({
    super.key,
    required this.prank,
    this.isExpanded = true,
    this.showStats = true,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.9),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: _getRarityColor().withOpacity(0.3), width: 1),
        boxShadow: [
          BoxShadow(
            color: _getRarityColor().withOpacity(0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Titre de la section
          Row(
            children: [
              Icon(FIcons.info, size: 16, color: _getRarityColor()),
              const SizedBox(width: 8),
              Text(
                'Description du Prank',
                style: theme.typography.sm.copyWith(
                  fontWeight: FontWeight.bold,
                  color: _getRarityColor(),
                ),
              ),
            ],
          ),

          const SizedBox(height: 12),

          // Description
          Text(
            prank.description,
            style: theme.typography.sm.copyWith(
              color: Colors.black87,
              height: 1.4,
            ),
            maxLines: isExpanded ? null : 3,
            overflow: isExpanded ? TextOverflow.visible : TextOverflow.ellipsis,
          ),

          if (showStats) ...[
            const SizedBox(height: 16),

            // Séparateur
            Container(height: 1, color: Colors.grey.shade200),

            const SizedBox(height: 12),

            // Stats et récompenses
            _buildStatsSection(theme),
          ],
        ],
      ),
    );
  }

  Widget _buildStatsSection(FThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Récompenses et informations',
          style: theme.typography.xs.copyWith(
            fontWeight: FontWeight.w600,
            color: Colors.black54,
            letterSpacing: 0.5,
          ),
        ),

        const SizedBox(height: 8),

        Wrap(
          spacing: 8,
          runSpacing: 6,
          children: [
            // Coût en jetons
            _buildStatItem(
              icon: FIcons.heart,
              label: '${prank.defaultJetonCostEquivalent} jetons',
              color: Colors.red.shade600,
            ),

            // XP Récompense
            if (prank.xpRewardExecutor != null)
              _buildStatItem(
                icon: FIcons.star,
                label: '+${prank.xpRewardExecutor} XP',
                color: Colors.purple.shade600,
              ),

            // Coins Récompense
            if (prank.coinsRewardExecutor != null)
              _buildStatItem(
                icon: FIcons.circle,
                label: '+${prank.coinsRewardExecutor} coins',
                color: Colors.amber.shade600,
              ),

            // Preuve requise
            if (prank.requiresProof)
              _buildStatItem(
                icon: FIcons.camera,
                label: 'Preuve requise',
                color: Colors.orange.shade600,
              ),
          ],
        ),
      ],
    );
  }

  Widget _buildStatItem({
    required IconData icon,
    required String label,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color.withOpacity(0.3), width: 1),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 12, color: color),
          const SizedBox(width: 4),
          Text(
            label,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
        ],
      ),
    );
  }

  Color _getRarityColor() {
    switch (prank.rarity) {
      case PrankRarity.common:
        return Colors.grey.shade600;
      case PrankRarity.rare:
        return Colors.blue.shade600;
      case PrankRarity.extreme:
        return Colors.amber.shade600;
    }
  }
}
