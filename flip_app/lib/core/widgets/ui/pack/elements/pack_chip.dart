import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../../data/models/models.dart';

/// Tailles disponibles pour les chips de pack
enum PackChipSize { small, medium, large }

/// Chip pour afficher la rareté d'un pack avec couleurs et styles appropriés
class PackRarityChip extends StatelessWidget {
  final PrankRarity rarity;
  final PackChipSize size;
  final bool showGlow;

  const PackRarityChip({
    super.key,
    required this.rarity,
    this.size = PackChipSize.medium,
    this.showGlow = false,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);
    final dimensions = _getDimensions();
    final colors = _getRarityColors();

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: dimensions.padding,
        vertical: dimensions.padding * 0.5,
      ),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [colors.primary, colors.primary.withOpacity(0.8)],
        ),
        borderRadius: BorderRadius.circular(dimensions.borderRadius),
        border: Border.all(color: colors.border, width: 1),
        boxShadow: showGlow
            ? [
                BoxShadow(
                  color: colors.primary.withOpacity(0.3),
                  blurRadius: 8,
                  spreadRadius: 2,
                ),
              ]
            : null,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            _getRarityIcon(),
            size: dimensions.iconSize,
            color: Colors.white,
          ),
          SizedBox(width: dimensions.spacing),
          Text(
            _getRarityLabel(),
            style: theme.typography.xs.copyWith(
              fontSize: dimensions.fontSize,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ],
      ),
    );
  }

  _ChipDimensions _getDimensions() {
    switch (size) {
      case PackChipSize.small:
        return _ChipDimensions(
          padding: 4,
          borderRadius: 8,
          iconSize: 12,
          fontSize: 10,
          spacing: 2,
        );
      case PackChipSize.medium:
        return _ChipDimensions(
          padding: 6,
          borderRadius: 10,
          iconSize: 14,
          fontSize: 11,
          spacing: 3,
        );
      case PackChipSize.large:
        return _ChipDimensions(
          padding: 8,
          borderRadius: 12,
          iconSize: 16,
          fontSize: 12,
          spacing: 4,
        );
    }
  }

  _RarityColors _getRarityColors() {
    switch (rarity) {
      case PrankRarity.extreme:
        return _RarityColors(
          primary: const Color(0xFFFFD700),
          border: const Color(0xFFFF8C00),
        );
      case PrankRarity.rare:
        return _RarityColors(
          primary: const Color(0xFF2196F3),
          border: const Color(0xFF1976D2),
        );
      case PrankRarity.common:
        return _RarityColors(
          primary: const Color(0xFF9E9E9E),
          border: const Color(0xFF757575),
        );
    }
  }

  IconData _getRarityIcon() {
    switch (rarity) {
      case PrankRarity.extreme:
        return Icons.auto_awesome;
      case PrankRarity.rare:
        return Icons.star;
      case PrankRarity.common:
        return Icons.circle;
    }
  }

  String _getRarityLabel() {
    switch (rarity) {
      case PrankRarity.extreme:
        return 'EXTRÊME';
      case PrankRarity.rare:
        return 'RARE';
      case PrankRarity.common:
        return 'COMMUN';
    }
  }
}

/// Chip pour afficher le coût d'un pack
class PackCostChip extends StatelessWidget {
  final int amount;
  final CurrencyType currencyType;
  final PackChipSize size;
  final bool highlight;

  const PackCostChip({
    super.key,
    required this.amount,
    required this.currencyType,
    this.size = PackChipSize.medium,
    this.highlight = false,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);
    final dimensions = _getDimensions();
    final colors = _getCurrencyColors();

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: dimensions.padding,
        vertical: dimensions.padding * 0.5,
      ),
      decoration: BoxDecoration(
        gradient: highlight
            ? LinearGradient(
                colors: [colors.primary, colors.primary.withOpacity(0.8)],
              )
            : null,
        color: highlight ? null : colors.primary.withOpacity(0.1),
        borderRadius: BorderRadius.circular(dimensions.borderRadius),
        border: Border.all(
          color: colors.primary.withOpacity(highlight ? 1.0 : 0.3),
          width: highlight ? 2 : 1,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            _getCurrencySymbol(),
            style: TextStyle(
              fontSize: dimensions.iconSize,
              color: highlight ? Colors.white : colors.primary,
            ),
          ),
          SizedBox(width: dimensions.spacing),
          Text(
            amount.toString(),
            style: theme.typography.xs.copyWith(
              fontSize: dimensions.fontSize,
              fontWeight: FontWeight.bold,
              color: highlight ? Colors.white : colors.primary,
            ),
          ),
        ],
      ),
    );
  }

  _ChipDimensions _getDimensions() {
    switch (size) {
      case PackChipSize.small:
        return _ChipDimensions(
          padding: 4,
          borderRadius: 8,
          iconSize: 12,
          fontSize: 10,
          spacing: 2,
        );
      case PackChipSize.medium:
        return _ChipDimensions(
          padding: 6,
          borderRadius: 10,
          iconSize: 14,
          fontSize: 11,
          spacing: 3,
        );
      case PackChipSize.large:
        return _ChipDimensions(
          padding: 8,
          borderRadius: 12,
          iconSize: 16,
          fontSize: 12,
          spacing: 4,
        );
    }
  }

  _RarityColors _getCurrencyColors() {
    switch (currencyType) {
      case CurrencyType.gameCoins:
        return _RarityColors(
          primary: const Color(0xFFFF9800),
          border: const Color(0xFFE65100),
        );
      case CurrencyType.premiumGems:
        return _RarityColors(
          primary: const Color(0xFF9C27B0),
          border: const Color(0xFF7B1FA2),
        );
      case CurrencyType.jetons:
        return _RarityColors(
          primary: const Color(0xFF4CAF50),
          border: const Color(0xFF2E7D32),
        );
    }
  }

  String _getCurrencySymbol() {
    switch (currencyType) {
      case CurrencyType.gameCoins:
        return '💰';
      case CurrencyType.premiumGems:
        return '💎';
      case CurrencyType.jetons:
        return '🪙';
    }
  }
}

/// Chip pour afficher le type de pack
class PackTypeChip extends StatelessWidget {
  final String packType;
  final PackChipSize size;

  const PackTypeChip({
    super.key,
    required this.packType,
    this.size = PackChipSize.medium,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);
    final dimensions = _getDimensions();

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: dimensions.padding,
        vertical: dimensions.padding * 0.5,
      ),
      decoration: BoxDecoration(
        color: theme.colors.secondary.withOpacity(0.1),
        borderRadius: BorderRadius.circular(dimensions.borderRadius),
        border: Border.all(
          color: theme.colors.secondary.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Text(
        packType.toUpperCase(),
        style: theme.typography.xs.copyWith(
          fontSize: dimensions.fontSize,
          fontWeight: FontWeight.w600,
          color: theme.colors.secondary,
          letterSpacing: 0.5,
        ),
      ),
    );
  }

  _ChipDimensions _getDimensions() {
    switch (size) {
      case PackChipSize.small:
        return _ChipDimensions(
          padding: 4,
          borderRadius: 8,
          iconSize: 12,
          fontSize: 9,
          spacing: 2,
        );
      case PackChipSize.medium:
        return _ChipDimensions(
          padding: 6,
          borderRadius: 10,
          iconSize: 14,
          fontSize: 10,
          spacing: 3,
        );
      case PackChipSize.large:
        return _ChipDimensions(
          padding: 8,
          borderRadius: 12,
          iconSize: 16,
          fontSize: 11,
          spacing: 4,
        );
    }
  }
}

/// Chip pour afficher le nombre de cartes dans un pack
class PackCardsCountChip extends StatelessWidget {
  final int cardsCount;
  final PackChipSize size;

  const PackCardsCountChip({
    super.key,
    required this.cardsCount,
    this.size = PackChipSize.medium,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);
    final dimensions = _getDimensions();

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: dimensions.padding,
        vertical: dimensions.padding * 0.5,
      ),
      decoration: BoxDecoration(
        color: theme.colors.primary.withOpacity(0.1),
        borderRadius: BorderRadius.circular(dimensions.borderRadius),
        border: Border.all(
          color: theme.colors.primary.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.style,
            size: dimensions.iconSize,
            color: theme.colors.primary,
          ),
          SizedBox(width: dimensions.spacing),
          Text(
            '$cardsCount',
            style: theme.typography.xs.copyWith(
              fontSize: dimensions.fontSize,
              fontWeight: FontWeight.bold,
              color: theme.colors.primary,
            ),
          ),
          SizedBox(width: dimensions.spacing * 0.5),
          Text(
            'CARTES',
            style: theme.typography.xs.copyWith(
              fontSize: dimensions.fontSize * 0.9,
              fontWeight: FontWeight.w600,
              color: theme.colors.primary.withOpacity(0.8),
              letterSpacing: 0.5,
            ),
          ),
        ],
      ),
    );
  }

  _ChipDimensions _getDimensions() {
    switch (size) {
      case PackChipSize.small:
        return _ChipDimensions(
          padding: 4,
          borderRadius: 8,
          iconSize: 12,
          fontSize: 9,
          spacing: 2,
        );
      case PackChipSize.medium:
        return _ChipDimensions(
          padding: 6,
          borderRadius: 10,
          iconSize: 14,
          fontSize: 10,
          spacing: 3,
        );
      case PackChipSize.large:
        return _ChipDimensions(
          padding: 8,
          borderRadius: 12,
          iconSize: 16,
          fontSize: 11,
          spacing: 4,
        );
    }
  }
}

// Classes d'aide
class _ChipDimensions {
  final double padding;
  final double borderRadius;
  final double iconSize;
  final double fontSize;
  final double spacing;

  _ChipDimensions({
    required this.padding,
    required this.borderRadius,
    required this.iconSize,
    required this.fontSize,
    required this.spacing,
  });
}

class _RarityColors {
  final Color primary;
  final Color border;

  _RarityColors({required this.primary, required this.border});
}
