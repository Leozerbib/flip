import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../../data/models/models.dart';
import '../elements/pack_image.dart';
import '../elements/pack_info_panel.dart';
import '../elements/pack_chip.dart';

/// Dialog de confirmation pour l'ouverture d'un pack
class PackConfirmationDialog extends StatelessWidget {
  final PrankPackModel pack;
  final int? multipleCount;

  const PackConfirmationDialog({
    super.key,
    required this.pack,
    this.multipleCount,
  });

  /// Affiche le dialog de confirmation et retourne true si l'utilisateur confirme
  static Future<bool?> show(
    BuildContext context,
    PrankPackModel pack, {
    int? multipleCount,
  }) {
    return showAdaptiveDialog<bool>(
      context: context,
      barrierDismissible: true,
      builder: (context) =>
          PackConfirmationDialog(pack: pack, multipleCount: multipleCount),
    );
  }

  bool get _isMultipleOpening => multipleCount != null && multipleCount! > 1;

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return FDialog(
      direction: Axis.vertical,
      title: _buildTitle(theme),
      body: _buildBody(theme),
      actions: _buildActions(context, theme),
    );
  }

  Widget _buildTitle(FThemeData theme) {
    return Column(
      children: [
        // Image du pack
        PackImage(
          pack: pack,
          size: PackImageSize.medium,
          showEffects: true,
          showRarityGlow: true,
        ),

        const SizedBox(height: 16),

        // Titre principal
        Text(
          _isMultipleOpening
              ? 'Ouvrir $multipleCount packs ?'
              : 'Ouvrir ce pack ?',
          style: theme.typography.xl.copyWith(
            fontWeight: FontWeight.bold,
            color: theme.colors.foreground,
          ),
          textAlign: TextAlign.center,
        ),

        const SizedBox(height: 8),

        // Nom du pack
        Text(
          pack.name,
          style: theme.typography.lg.copyWith(
            color: _getDominantRarityColor(),
            fontWeight: FontWeight.bold,
          ),
          textAlign: TextAlign.center,
        ),

        const SizedBox(height: 8),

        // Informations rapides
        Wrap(
          spacing: 8,
          runSpacing: 4,
          alignment: WrapAlignment.center,
          children: [
            PackCardsCountChip(
              cardsCount: pack.numberOfPranksAwarded,
              size: PackChipSize.small,
            ),
            PackRarityChip(
              rarity: _getDominantRarity(),
              size: PackChipSize.small,
              showGlow: true,
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildBody(FThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Coût total
        _buildCostSection(theme),

        const SizedBox(height: 16),

        // Contenu du pack
        _buildPackContents(theme),

        const SizedBox(height: 16),

        // Probabilités de rareté (version compacte)
        _buildRarityPreview(theme),

        if (_isMultipleOpening) ...[
          const SizedBox(height: 16),
          _buildMultipleWarning(theme),
        ],
      ],
    );
  }

  Widget _buildCostSection(FThemeData theme) {
    final totalCost = _isMultipleOpening
        ? pack.costAmount * multipleCount!
        : pack.costAmount;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            _getCurrencyColor().withOpacity(0.1),
            _getCurrencyColor().withOpacity(0.05),
          ],
        ),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: _getCurrencyColor().withOpacity(0.3),
          width: 2,
        ),
      ),
      child: Row(
        children: [
          // Icône de la monnaie
          Container(
            width: 50,
            height: 50,
            decoration: BoxDecoration(
              color: _getCurrencyColor().withOpacity(0.2),
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                _getCurrencySymbol(),
                style: TextStyle(fontSize: 24, color: _getCurrencyColor()),
              ),
            ),
          ),

          const SizedBox(width: 16),

          // Informations de coût
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Coût total',
                  style: theme.typography.sm.copyWith(
                    color: theme.colors.mutedForeground,
                  ),
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Text(
                      totalCost.toString(),
                      style: theme.typography.xl.copyWith(
                        fontWeight: FontWeight.bold,
                        color: _getCurrencyColor(),
                      ),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      _getCurrencySymbol(),
                      style: theme.typography.lg.copyWith(
                        color: _getCurrencyColor(),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      pack.costCurrencyType.displayName,
                      style: theme.typography.sm.copyWith(
                        color: theme.colors.mutedForeground,
                      ),
                    ),
                  ],
                ),
                if (_isMultipleOpening) ...[
                  const SizedBox(height: 4),
                  Text(
                    '${pack.costAmount} × $multipleCount packs',
                    style: theme.typography.xs.copyWith(
                      color: theme.colors.mutedForeground,
                    ),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPackContents(FThemeData theme) {
    final totalCards = _isMultipleOpening
        ? pack.numberOfPranksAwarded * multipleCount!
        : pack.numberOfPranksAwarded;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: theme.colors.secondary.withOpacity(0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: theme.colors.secondary.withOpacity(0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.card_giftcard,
                size: 20,
                color: theme.colors.secondary,
              ),
              const SizedBox(width: 8),
              Text(
                'Contenu du pack',
                style: theme.typography.base.copyWith(
                  fontWeight: FontWeight.bold,
                  color: theme.colors.foreground,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                _isMultipleOpening ? 'Total de cartes' : 'Cartes garanties',
                style: theme.typography.sm.copyWith(
                  color: theme.colors.mutedForeground,
                ),
              ),
              Text(
                '$totalCards cartes',
                style: theme.typography.sm.copyWith(
                  fontWeight: FontWeight.bold,
                  color: theme.colors.foreground,
                ),
              ),
            ],
          ),

          if (_isMultipleOpening) ...[
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Packs à ouvrir',
                  style: theme.typography.sm.copyWith(
                    color: theme.colors.mutedForeground,
                  ),
                ),
                Text(
                  '$multipleCount packs',
                  style: theme.typography.sm.copyWith(
                    fontWeight: FontWeight.bold,
                    color: theme.colors.foreground,
                  ),
                ),
              ],
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildRarityPreview(FThemeData theme) {
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

        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: pack.rarityProbabilities.legacyFormat.entries
              .map((entry) => _buildRarityChip(theme, entry.key, entry.value))
              .toList(),
        ),
      ],
    );
  }

  Widget _buildRarityChip(
    FThemeData theme,
    PrankRarity rarity,
    double probability,
  ) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: _getRarityColor(rarity).withOpacity(0.1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: _getRarityColor(rarity).withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            _getRarityIcon(rarity),
            size: 14,
            color: _getRarityColor(rarity),
          ),
          const SizedBox(width: 4),
          Text(
            _getRarityLabel(rarity),
            style: theme.typography.xs.copyWith(
              fontWeight: FontWeight.bold,
              color: _getRarityColor(rarity),
            ),
          ),
          const SizedBox(width: 4),
          Text(
            '${(probability * 100).toStringAsFixed(0)}%',
            style: theme.typography.xs.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.colors.mutedForeground,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMultipleWarning(FThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.amber.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.amber.withOpacity(0.3), width: 1),
      ),
      child: Row(
        children: [
          Icon(Icons.info_outline, color: Colors.amber.shade700, size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              'L\'ouverture multiple affichera tous les résultats en une seule fois.',
              style: theme.typography.xs.copyWith(color: Colors.amber.shade700),
            ),
          ),
        ],
      ),
    );
  }

  List<Widget> _buildActions(BuildContext context, FThemeData theme) {
    return [
      Row(
        children: [
          // Bouton Annuler
          Expanded(
            child: FButton(
              style: FButtonStyle.outline,
              onPress: () => Navigator.of(context).pop(false),
              child: const Text('Annuler'),
            ),
          ),

          const SizedBox(width: 12),

          // Bouton Confirmer
          Expanded(
            flex: 2,
            child: FButton(
              style: FButtonStyle.primary,
              onPress: () => Navigator.of(context).pop(true),
              child: Text(
                _isMultipleOpening
                    ? '✨ Ouvrir $multipleCount packs ✨'
                    : '✨ Ouvrir le pack ✨',
              ),
            ),
          ),
        ],
      ),
    ];
  }

  // Méthodes utilitaires
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

  IconData _getRarityIcon(PrankRarity rarity) {
    switch (rarity) {
      case PrankRarity.extreme:
        return Icons.auto_awesome;
      case PrankRarity.rare:
        return Icons.star;
      case PrankRarity.common:
        return Icons.circle;
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
