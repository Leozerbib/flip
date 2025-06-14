import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import '../../../../data/models/models.dart';
import '../../../../core/theme/theme_manager.dart';
import 'rarity_chip.dart';

class PackOpeningConfirmationDialog extends ConsumerWidget {
  final PrankPackModel pack;

  const PackOpeningConfirmationDialog({super.key, required this.pack});

  static Future<bool?> show(BuildContext context, PrankPackModel pack) {
    return showAdaptiveDialog<bool>(
      context: context,
      barrierDismissible: true,
      builder: (context) => PackOpeningConfirmationDialog(pack: pack),
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = FTheme.of(context);
    final dominantRarity = _getDominantRarity();

    return FDialog(
      direction: Axis.vertical,
      title: _buildDialogTitle(theme, dominantRarity),
      body: _buildDialogBody(theme, dominantRarity),
      actions: _buildDialogActions(context, theme, dominantRarity),
    );
  }

  Widget _buildDialogTitle(FThemeData theme, PrankRarity dominantRarity) {
    return Column(
      children: [
        // Icône du pack avec animation
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                _getRarityColor(dominantRarity),
                _getRarityColor(dominantRarity).withOpacity(0.7),
              ],
            ),
            boxShadow: [
              BoxShadow(
                color: _getRarityColor(dominantRarity).withOpacity(0.3),
                blurRadius: 20,
                spreadRadius: 5,
              ),
            ],
          ),
          child: Icon(
            _getRarityIcon(dominantRarity),
            size: 40,
            color: Colors.white,
          ),
        ),
        const SizedBox(height: 16),

        // Titre principal
        ShaderMask(
          shaderCallback: (bounds) => LinearGradient(
            colors: [
              _getRarityColor(dominantRarity),
              _getRarityColor(dominantRarity).withOpacity(0.7),
            ],
          ).createShader(bounds),
          child: Text(
            pack.name,
            style: theme.typography.xl.copyWith(
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
            textAlign: TextAlign.center,
          ),
        ),

        const SizedBox(height: 8),

        // Sous-titre
        Text(
          '${pack.numberOfPranksAwarded} CARTES GARANTIES',
          style: theme.typography.sm.copyWith(
            color: theme.colors.mutedForeground,
            fontWeight: FontWeight.w600,
            letterSpacing: 1.2,
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildDialogBody(FThemeData theme, PrankRarity dominantRarity) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Image du pack style booster
        _buildPackImage(theme, dominantRarity),

        const SizedBox(height: 20),

        // Description si disponible
        if (pack.description != null && pack.description!.isNotEmpty) ...[
          Text(
            pack.description!,
            style: theme.typography.base.copyWith(
              color: theme.colors.mutedForeground,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 20),
        ],

        // Probabilités de rareté
        _buildRaritySection(theme),

        const SizedBox(height: 20),

        // Informations sur le coût
        _buildCostSection(theme, dominantRarity),
      ],
    );
  }

  Widget _buildPackImage(FThemeData theme, PrankRarity rarity) {
    return Container(
      height: 140,
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            _getRarityColor(rarity),
            _getRarityColor(rarity).withOpacity(0.8),
            _getRarityColor(rarity).withOpacity(0.6),
          ],
        ),
      ),
      child: Stack(
        children: [
          // Motif de fond
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    Colors.white.withOpacity(0.1),
                    Colors.transparent,
                    Colors.black.withOpacity(0.1),
                  ],
                ),
              ),
            ),
          ),

          // Contenu central
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.card_giftcard, size: 50, color: Colors.white),
                const SizedBox(height: 8),
                Text(
                  'BOOSTER PACK',
                  style: theme.typography.sm.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 2,
                  ),
                ),
              ],
            ),
          ),

          // Étincelles de décoration
          if (rarity != PrankRarity.common) ..._buildSparkles(),

          // Badge de rareté
          Positioned(
            top: 12,
            right: 12,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.9),
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.1),
                    blurRadius: 4,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Text(
                _getRarityLabel(rarity),
                style: theme.typography.xs.copyWith(
                  fontWeight: FontWeight.bold,
                  color: _getRarityColor(rarity),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRaritySection(FThemeData theme) {
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
              Icon(Icons.casino, size: 20, color: theme.colors.secondary),
              const SizedBox(width: 8),
              Text(
                'Probabilités de rareté',
                style: theme.typography.base.copyWith(
                  fontWeight: FontWeight.bold,
                  color: theme.colors.foreground,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: pack.rarityProbabilities.legacyFormat.entries
                .map(
                  (entry) => RarityChip(
                    rarity: entry.key,
                    probability: entry.value,
                    size: RarityChipSize.medium,
                  ),
                )
                .toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildCostSection(FThemeData theme, PrankRarity rarity) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            _getRarityColor(rarity).withOpacity(0.1),
            _getRarityColor(rarity).withOpacity(0.05),
          ],
        ),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: _getRarityColor(rarity).withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Column(
        children: [
          Row(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: _getRarityColor(rarity).withOpacity(0.2),
                ),
                child: Icon(
                  Icons.monetization_on,
                  color: _getRarityColor(rarity),
                  size: 24,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Coût du pack',
                      style: theme.typography.sm.copyWith(
                        color: theme.colors.mutedForeground,
                      ),
                    ),
                    Row(
                      children: [
                        Text(
                          '${pack.costAmount}',
                          style: theme.typography.xl.copyWith(
                            fontWeight: FontWeight.bold,
                            color: _getRarityColor(rarity),
                          ),
                        ),
                        const SizedBox(width: 4),
                        Text(_getCurrencySymbol(), style: theme.typography.lg),
                        const SizedBox(width: 8),
                        Text(
                          pack.costCurrencyType.displayName,
                          style: theme.typography.sm.copyWith(
                            color: theme.colors.mutedForeground,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  List<Widget> _buildDialogActions(
    BuildContext context,
    FThemeData theme,
    PrankRarity rarity,
  ) {
    return [
      FButton(
        style: FButtonStyle.primary,
        onPress: () => Navigator.of(context).pop(true),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [const Text('✨ Ouvrir le pack ✨')],
        ),
      ),
    ];
  }

  List<Widget> _buildSparkles() {
    return [
      Positioned(
        top: 20,
        left: 20,
        child: Icon(
          Icons.auto_awesome,
          size: 12,
          color: Colors.white.withOpacity(0.8),
        ),
      ),
      Positioned(
        top: 30,
        right: 30,
        child: Icon(Icons.star, size: 10, color: Colors.white.withOpacity(0.6)),
      ),
      Positioned(
        bottom: 25,
        left: 25,
        child: Icon(
          Icons.auto_awesome,
          size: 8,
          color: Colors.white.withOpacity(0.7),
        ),
      ),
    ];
  }

  PrankRarity _getDominantRarity() {
    final legacyProbabilities = pack.rarityProbabilities.legacyFormat;
    if (legacyProbabilities.isEmpty) return PrankRarity.common;

    return legacyProbabilities.entries
        .reduce((a, b) => a.value > b.value ? a : b)
        .key;
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

  IconData _getRarityIcon(PrankRarity rarity) {
    switch (rarity) {
      case PrankRarity.extreme:
        return Icons.auto_awesome;
      case PrankRarity.rare:
        return Icons.star;
      case PrankRarity.common:
        return Icons.card_giftcard;
    }
  }

  String _getRarityLabel(PrankRarity rarity) {
    switch (rarity) {
      case PrankRarity.extreme:
        return 'EXTRÊME';
      case PrankRarity.rare:
        return 'RARE';
      case PrankRarity.common:
        return 'COMMUN';
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
