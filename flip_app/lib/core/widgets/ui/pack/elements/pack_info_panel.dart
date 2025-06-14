import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../../data/models/models.dart';
import 'pack_chip.dart';

/// Panel d'informations détaillées pour un pack
class PackInfoPanel extends StatelessWidget {
  final PrankPackModel pack;
  final bool showDetailed;
  final bool showRarityProbabilities;

  const PackInfoPanel({
    super.key,
    required this.pack,
    this.showDetailed = true,
    this.showRarityProbabilities = true,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: theme.colors.background,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: theme.colors.border, width: 1),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // En-tête du pack
          _buildPackHeader(theme),

          const SizedBox(height: 16),

          // Description
          if (pack.description != null && pack.description!.isNotEmpty) ...[
            _buildDescription(theme),
            const SizedBox(height: 16),
          ],

          // Informations rapides
          _buildQuickInfo(theme),

          const SizedBox(height: 16),

          // Probabilités de rareté
          if (showRarityProbabilities) ...[
            _buildRarityProbabilities(theme),
            const SizedBox(height: 16),
          ],

          // Informations détaillées
          if (showDetailed) _buildDetailedInfo(theme),
        ],
      ),
    );
  }

  Widget _buildPackHeader(FThemeData theme) {
    return Row(
      children: [
        // Icône du pack
        Container(
          width: 50,
          height: 50,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                _getDominantRarityColor(),
                _getDominantRarityColor().withOpacity(0.7),
              ],
            ),
            borderRadius: BorderRadius.circular(12),
            boxShadow: [
              BoxShadow(
                color: _getDominantRarityColor().withOpacity(0.3),
                blurRadius: 8,
                spreadRadius: 2,
              ),
            ],
          ),
          child: Icon(Icons.card_giftcard, color: Colors.white, size: 28),
        ),

        const SizedBox(width: 12),

        // Nom et type
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                pack.name,
                style: theme.typography.lg.copyWith(
                  fontWeight: FontWeight.bold,
                  color: theme.colors.foreground,
                ),
              ),
              const SizedBox(height: 4),
              PackTypeChip(packType: 'BOOSTER', size: PackChipSize.small),
            ],
          ),
        ),

        // Badge de rareté dominante
        PackRarityChip(
          rarity: _getDominantRarity(),
          size: PackChipSize.medium,
          showGlow: true,
        ),
      ],
    );
  }

  Widget _buildDescription(FThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Description',
          style: theme.typography.sm.copyWith(
            fontWeight: FontWeight.bold,
            color: theme.colors.foreground,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          pack.description!,
          style: theme.typography.base.copyWith(
            color: theme.colors.mutedForeground,
            height: 1.5,
          ),
        ),
      ],
    );
  }

  Widget _buildQuickInfo(FThemeData theme) {
    return Row(
      children: [
        // Nombre de cartes
        Expanded(
          child: _buildInfoCard(
            theme,
            icon: Icons.style,
            title: 'Cartes',
            value: '${pack.numberOfPranksAwarded}',
            color: theme.colors.primary,
          ),
        ),

        const SizedBox(width: 12),

        // Coût
        Expanded(
          child: _buildInfoCard(
            theme,
            icon: Icons.monetization_on,
            title: 'Coût',
            value: '${pack.costAmount} ${_getCurrencySymbol()}',
            color: _getCurrencyColor(),
          ),
        ),
      ],
    );
  }

  Widget _buildInfoCard(
    FThemeData theme, {
    required IconData icon,
    required String title,
    required String value,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color.withOpacity(0.3), width: 1),
      ),
      child: Column(
        children: [
          Icon(icon, color: color, size: 24),
          const SizedBox(height: 8),
          Text(
            title,
            style: theme.typography.xs.copyWith(
              color: theme.colors.mutedForeground,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            value,
            style: theme.typography.sm.copyWith(
              color: color,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRarityProbabilities(FThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Probabilités de rareté',
          style: theme.typography.sm.copyWith(
            fontWeight: FontWeight.bold,
            color: theme.colors.foreground,
          ),
        ),
        const SizedBox(height: 12),

        // Barres de probabilité
        ...pack.rarityProbabilities.legacyFormat.entries.map(
          (entry) => _buildProbabilityBar(theme, entry.key, entry.value),
        ),
      ],
    );
  }

  Widget _buildProbabilityBar(
    FThemeData theme,
    PrankRarity rarity,
    double probability,
  ) {
    final rarityColor = _getRarityColor(rarity);
    final rarityLabel = _getRarityLabel(rarity);

    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                rarityLabel,
                style: theme.typography.xs.copyWith(
                  color: rarityColor,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                '${(probability * 100).toStringAsFixed(1)}%',
                style: theme.typography.xs.copyWith(
                  color: theme.colors.mutedForeground,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: probability,
              backgroundColor: theme.colors.secondary.withOpacity(0.1),
              valueColor: AlwaysStoppedAnimation<Color>(rarityColor),
              minHeight: 6,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDetailedInfo(FThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Informations détaillées',
          style: theme.typography.sm.copyWith(
            fontWeight: FontWeight.bold,
            color: theme.colors.foreground,
          ),
        ),
        const SizedBox(height: 12),

        _buildDetailRow(
          theme,
          'Type de monnaie',
          pack.costCurrencyType.displayName,
        ),

        _buildDetailRow(
          theme,
          'Cartes garanties',
          '${pack.numberOfPranksAwarded} cartes par pack',
        ),

        _buildDetailRow(
          theme,
          'Statut',
          'Disponible',
          valueColor: Colors.green,
        ),
      ],
    );
  }

  Widget _buildDetailRow(
    FThemeData theme,
    String label,
    String value, {
    Color? valueColor,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: theme.typography.xs.copyWith(
              color: theme.colors.mutedForeground,
            ),
          ),
          Text(
            value,
            style: theme.typography.xs.copyWith(
              color: valueColor ?? theme.colors.foreground,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  PrankRarity _getDominantRarity() {
    final legacyProbabilities = pack.rarityProbabilities.legacyFormat;
    if (legacyProbabilities.isEmpty) return PrankRarity.common;

    return legacyProbabilities.entries
        .reduce((a, b) => a.value > b.value ? a : b)
        .key;
  }

  Color _getDominantRarityColor() {
    return _getRarityColor(_getDominantRarity());
  }

  Color _getRarityColor(PrankRarity rarity) {
    switch (rarity) {
      case PrankRarity.extreme:
        return const Color(0xFFFFD700);
      case PrankRarity.rare:
        return const Color(0xFF2196F3);
      case PrankRarity.common:
        return const Color(0xFF9E9E9E);
    }
  }

  String _getRarityLabel(PrankRarity rarity) {
    switch (rarity) {
      case PrankRarity.extreme:
        return 'Extrême';
      case PrankRarity.rare:
        return 'Rare';
      case PrankRarity.common:
        return 'Commun';
    }
  }

  Color _getCurrencyColor() {
    switch (pack.costCurrencyType) {
      case CurrencyType.gameCoins:
        return const Color(0xFFFF9800);
      case CurrencyType.premiumGems:
        return const Color(0xFF9C27B0);
      case CurrencyType.jetons:
        return const Color(0xFF4CAF50);
    }
  }

  String _getCurrencySymbol() {
    switch (pack.costCurrencyType) {
      case CurrencyType.gameCoins:
        return '💰';
      case CurrencyType.premiumGems:
        return '💎';
      case CurrencyType.jetons:
        return '🪙';
    }
  }
}
