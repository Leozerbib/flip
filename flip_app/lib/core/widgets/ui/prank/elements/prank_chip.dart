import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../../data/models/models.dart';

enum PrankChipSize { small, medium, large }

class PrankRarityChip extends StatelessWidget {
  final PrankRarity rarity;
  final PrankChipSize size;

  const PrankRarityChip({
    super.key,
    required this.rarity,
    this.size = PrankChipSize.medium,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);
    final chipData = _getRarityData(rarity);
    final sizeData = _getSizeData(size);

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: sizeData['paddingH'],
        vertical: sizeData['paddingV'],
      ),
      decoration: BoxDecoration(
        color: chipData['color'].withOpacity(0.1),
        borderRadius: BorderRadius.circular(sizeData['borderRadius']),
        border: Border.all(
          color: chipData['color'].withOpacity(0.3),
          width: sizeData['borderWidth'],
        ),
        boxShadow: size == PrankChipSize.large
            ? [
                BoxShadow(
                  color: chipData['color'].withOpacity(0.2),
                  blurRadius: 4,
                  offset: const Offset(0, 2),
                ),
              ]
            : null,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            chipData['icon'],
            size: sizeData['iconSize'],
            color: chipData['color'],
          ),
          SizedBox(width: sizeData['spacing']),
          Text(
            chipData['label'],
            style: theme.typography.xs.copyWith(
              fontWeight: FontWeight.w600,
              color: chipData['color'],
              fontSize: sizeData['fontSize'],
            ),
          ),
        ],
      ),
    );
  }

  Map<String, dynamic> _getRarityData(PrankRarity rarity) {
    switch (rarity) {
      case PrankRarity.common:
        return {
          'color': Colors.grey.shade600,
          'label': 'COMMUN',
          'icon': FIcons.circle,
        };
      case PrankRarity.rare:
        return {
          'color': Colors.blue.shade600,
          'label': 'RARE',
          'icon': FIcons.star,
        };
      case PrankRarity.extreme:
        return {
          'color': Colors.amber.shade600,
          'label': 'EXTRÊME',
          'icon': FIcons.zap,
        };
    }
  }

  Map<String, dynamic> _getSizeData(PrankChipSize size) {
    switch (size) {
      case PrankChipSize.small:
        return {
          'paddingH': 6.0,
          'paddingV': 3.0,
          'borderRadius': 8.0,
          'borderWidth': 1.0,
          'iconSize': 10.0,
          'fontSize': 9.0,
          'spacing': 3.0,
        };
      case PrankChipSize.medium:
        return {
          'paddingH': 8.0,
          'paddingV': 4.0,
          'borderRadius': 12.0,
          'borderWidth': 1.0,
          'iconSize': 12.0,
          'fontSize': 10.0,
          'spacing': 4.0,
        };
      case PrankChipSize.large:
        return {
          'paddingH': 12.0,
          'paddingV': 6.0,
          'borderRadius': 16.0,
          'borderWidth': 1.5,
          'iconSize': 16.0,
          'fontSize': 12.0,
          'spacing': 6.0,
        };
    }
  }
}

class PrankTypeChip extends StatelessWidget {
  final PrankType type;
  final PrankChipSize size;

  const PrankTypeChip({
    super.key,
    required this.type,
    this.size = PrankChipSize.medium,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);
    final typeData = _getTypeData(type);
    final sizeData = _getSizeData(size);

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: sizeData['paddingH'],
        vertical: sizeData['paddingV'],
      ),
      decoration: BoxDecoration(
        color: typeData['color'].withOpacity(0.1),
        borderRadius: BorderRadius.circular(sizeData['borderRadius']),
        border: Border.all(
          color: typeData['color'].withOpacity(0.3),
          width: sizeData['borderWidth'],
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            typeData['icon'],
            size: sizeData['iconSize'],
            color: typeData['color'],
          ),
          SizedBox(width: sizeData['spacing']),
          Text(
            typeData['label'],
            style: theme.typography.xs.copyWith(
              fontWeight: FontWeight.w500,
              color: typeData['color'],
              fontSize: sizeData['fontSize'],
            ),
          ),
        ],
      ),
    );
  }

  Map<String, dynamic> _getTypeData(PrankType type) {
    switch (type) {
      case PrankType.declarative:
        return {
          'color': Colors.blue.shade600,
          'label': 'Déclaratif',
          'icon': FIcons.messageSquare,
        };
      case PrankType.inAppCosmetic:
        return {
          'color': Colors.purple.shade600,
          'label': 'Cosmétique',
          'icon': FIcons.palette,
        };
      case PrankType.inAppLock:
        return {
          'color': Colors.red.shade600,
          'label': 'Verrouillage',
          'icon': FIcons.lock,
        };
      case PrankType.notificationSpam:
        return {
          'color': Colors.orange.shade600,
          'label': 'Notifications',
          'icon': FIcons.bell,
        };
      case PrankType.externalAction:
        return {
          'color': Colors.green.shade600,
          'label': 'Action externe',
          'icon': FIcons.externalLink,
        };
    }
  }

  Map<String, dynamic> _getSizeData(PrankChipSize size) {
    switch (size) {
      case PrankChipSize.small:
        return {
          'paddingH': 6.0,
          'paddingV': 3.0,
          'borderRadius': 8.0,
          'borderWidth': 1.0,
          'iconSize': 10.0,
          'fontSize': 9.0,
          'spacing': 3.0,
        };
      case PrankChipSize.medium:
        return {
          'paddingH': 8.0,
          'paddingV': 4.0,
          'borderRadius': 12.0,
          'borderWidth': 1.0,
          'iconSize': 12.0,
          'fontSize': 10.0,
          'spacing': 4.0,
        };
      case PrankChipSize.large:
        return {
          'paddingH': 12.0,
          'paddingV': 6.0,
          'borderRadius': 16.0,
          'borderWidth': 1.5,
          'iconSize': 16.0,
          'fontSize': 12.0,
          'spacing': 6.0,
        };
    }
  }
}
