import 'package:flutter/material.dart';
import '../../../../data/models/models.dart';

enum RarityChipSize { small, medium, large }

class RarityChip extends StatelessWidget {
  final PrankRarity rarity;
  final double probability;
  final RarityChipSize size;

  const RarityChip({
    super.key,
    required this.rarity,
    required this.probability,
    this.size = RarityChipSize.medium,
  });

  @override
  Widget build(BuildContext context) {
    final colors = _getRarityColors(rarity);
    final textSize = _getTextSize(size);
    final padding = _getPadding(size);

    return Container(
      padding: padding,
      decoration: BoxDecoration(
        color: colors.backgroundColor,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: colors.borderColor, width: 1),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            _getRarityIcon(rarity),
            size: textSize + 2,
            color: colors.textColor,
          ),
          SizedBox(width: size == RarityChipSize.small ? 2 : 4),
          Text(
            '${(probability * 100).toInt()}%',
            style: TextStyle(
              fontSize: textSize,
              fontWeight: FontWeight.bold,
              color: colors.textColor,
            ),
          ),
        ],
      ),
    );
  }

  RarityColors _getRarityColors(PrankRarity rarity) {
    switch (rarity) {
      case PrankRarity.common:
        return RarityColors(
          backgroundColor: Colors.grey.withOpacity(0.2),
          borderColor: Colors.grey.shade400,
          textColor: Colors.grey.shade700,
        );
      case PrankRarity.rare:
        return RarityColors(
          backgroundColor: Colors.blue.withOpacity(0.2),
          borderColor: Colors.blue.shade400,
          textColor: Colors.blue.shade700,
        );
      case PrankRarity.extreme:
        return RarityColors(
          backgroundColor: Colors.purple.withOpacity(0.2),
          borderColor: Colors.purple.shade400,
          textColor: Colors.purple.shade700,
        );
    }
  }

  IconData _getRarityIcon(PrankRarity rarity) {
    switch (rarity) {
      case PrankRarity.common:
        return Icons.circle;
      case PrankRarity.rare:
        return Icons.star_outline;
      case PrankRarity.extreme:
        return Icons.diamond_outlined;
    }
  }

  double _getTextSize(RarityChipSize size) {
    switch (size) {
      case RarityChipSize.small:
        return 10;
      case RarityChipSize.medium:
        return 12;
      case RarityChipSize.large:
        return 14;
    }
  }

  EdgeInsets _getPadding(RarityChipSize size) {
    switch (size) {
      case RarityChipSize.small:
        return const EdgeInsets.symmetric(horizontal: 4, vertical: 2);
      case RarityChipSize.medium:
        return const EdgeInsets.symmetric(horizontal: 6, vertical: 3);
      case RarityChipSize.large:
        return const EdgeInsets.symmetric(horizontal: 8, vertical: 4);
    }
  }
}

class RarityColors {
  final Color backgroundColor;
  final Color borderColor;
  final Color textColor;

  RarityColors({
    required this.backgroundColor,
    required this.borderColor,
    required this.textColor,
  });
}
