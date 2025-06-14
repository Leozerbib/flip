import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../../data/models/models.dart';
import 'pack_chip.dart';

/// Types d'actions disponibles pour les boutons de pack
enum PackActionType {
  open, // Ouvrir x1
  openMultiple, // Ouvrir x10
  preview, // Aperçu
  favorite, // Favoris
  details, // Détails
}

/// Configuration pour les boutons d'action
class PackActionConfig {
  final bool showSingleOpen;
  final bool showMultipleOpen;
  final bool showPreview;
  final bool showFavorite;
  final bool showDetails;
  final int multipleOpenCount;

  const PackActionConfig({
    this.showSingleOpen = true,
    this.showMultipleOpen = false,
    this.showPreview = false,
    this.showFavorite = false,
    this.showDetails = false,
    this.multipleOpenCount = 10,
  });

  static const compact = PackActionConfig(
    showSingleOpen: true,
    showMultipleOpen: false,
    showPreview: false,
    showFavorite: false,
    showDetails: false,
  );

  static const standard = PackActionConfig(
    showSingleOpen: true,
    showMultipleOpen: true,
    showPreview: false,
    showFavorite: false,
    showDetails: false,
  );

  static const full = PackActionConfig(
    showSingleOpen: true,
    showMultipleOpen: true,
    showPreview: true,
    showFavorite: true,
    showDetails: true,
  );
}

/// Boutons d'action pour les packs
class PackActionButtons extends StatelessWidget {
  final PrankPackModel pack;
  final PackActionConfig config;
  final Function(PackActionType)? onAction;
  final bool canOpen;
  final String? notOpenableReason;

  const PackActionButtons({
    super.key,
    required this.pack,
    this.config = const PackActionConfig(),
    this.onAction,
    this.canOpen = true,
    this.notOpenableReason,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    if (!canOpen && notOpenableReason != null) {
      return _buildNotOpenableButton(theme);
    }

    // Calculer les boutons à afficher
    final buttons = _getButtonsToShow();

    if (buttons.isEmpty) {
      return const SizedBox.shrink();
    }

    // Layout adaptatif selon le nombre de boutons
    if (buttons.length == 1) {
      return _buildSingleButton(theme, buttons.first);
    } else if (buttons.length == 2) {
      return _buildTwoButtons(theme, buttons);
    } else {
      return _buildMultipleButtons(theme, buttons);
    }
  }

  Widget _buildNotOpenableButton(FThemeData theme) {
    return SizedBox(
      width: double.infinity,
      height: 40,
      child: FButton(
        onPress: null,
        style: FButtonStyle.outline,
        child: Text(
          notOpenableReason ?? 'Indisponible',
          style: theme.typography.sm.copyWith(
            fontWeight: FontWeight.w600,
            fontSize: 12,
          ),
        ),
      ),
    );
  }

  Widget _buildSingleButton(FThemeData theme, _ButtonInfo button) {
    return SizedBox(
      width: double.infinity,
      height: 40,
      child: _buildButton(theme, button, isExpanded: true),
    );
  }

  Widget _buildTwoButtons(FThemeData theme, List<_ButtonInfo> buttons) {
    return Row(
      children: [
        Expanded(
          flex: buttons[0].type == PackActionType.open ? 3 : 1,
          child: SizedBox(
            height: 40,
            child: _buildButton(theme, buttons[0], isExpanded: true),
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          flex: buttons[1].type == PackActionType.open ? 3 : 1,
          child: SizedBox(
            height: 40,
            child: _buildButton(theme, buttons[1], isExpanded: true),
          ),
        ),
      ],
    );
  }

  Widget _buildMultipleButtons(FThemeData theme, List<_ButtonInfo> buttons) {
    // Séparer le bouton principal des boutons secondaires
    final primaryButton = buttons.firstWhere(
      (b) => b.type == PackActionType.open,
      orElse: () => buttons.first,
    );
    final secondaryButtons = buttons.where((b) => b != primaryButton).toList();

    return Column(
      children: [
        // Bouton principal
        SizedBox(
          width: double.infinity,
          height: 40,
          child: _buildButton(theme, primaryButton, isExpanded: true),
        ),

        const SizedBox(height: 8),

        // Boutons secondaires
        Row(
          children: [
            for (int i = 0; i < secondaryButtons.length; i++) ...[
              if (i > 0) const SizedBox(width: 8),
              Expanded(
                child: SizedBox(
                  height: 36,
                  child: _buildButton(theme, secondaryButtons[i]),
                ),
              ),
            ],
          ],
        ),
      ],
    );
  }

  Widget _buildButton(
    FThemeData theme,
    _ButtonInfo button, {
    bool isExpanded = false,
  }) {
    final dominantRarity = _getDominantRarity();
    final rarityColor = _getRarityColor(dominantRarity);

    switch (button.type) {
      case PackActionType.open:
        return _buildPrimaryButton(
          theme,
          button,
          rarityColor,
          isExpanded: isExpanded,
        );
      case PackActionType.openMultiple:
        return _buildSecondaryButton(
          theme,
          button,
          rarityColor,
          isExpanded: isExpanded,
        );
      default:
        return _buildIconButton(theme, button);
    }
  }

  Widget _buildPrimaryButton(
    FThemeData theme,
    _ButtonInfo button,
    Color rarityColor, {
    bool isExpanded = false,
  }) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        gradient: LinearGradient(
          colors: [rarityColor, rarityColor.withOpacity(0.8)],
        ),
        boxShadow: [
          BoxShadow(
            color: rarityColor.withOpacity(0.3),
            blurRadius: 6,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () => onAction?.call(button.type),
          borderRadius: BorderRadius.circular(8),
          child: Center(
            child: Row(
              mainAxisSize: isExpanded ? MainAxisSize.max : MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(button.icon, color: Colors.white, size: 18),
                const SizedBox(width: 6),
                Text(
                  button.label,
                  style: theme.typography.sm.copyWith(
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                    fontSize: 11,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSecondaryButton(
    FThemeData theme,
    _ButtonInfo button,
    Color rarityColor, {
    bool isExpanded = false,
  }) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        gradient: LinearGradient(
          colors: [rarityColor.withOpacity(0.8), rarityColor.withOpacity(0.6)],
        ),
        border: Border.all(color: rarityColor, width: 1.5),
        boxShadow: [
          BoxShadow(
            color: rarityColor.withOpacity(0.2),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () => onAction?.call(button.type),
          borderRadius: BorderRadius.circular(8),
          child: Center(
            child: Text(
              button.label,
              style: theme.typography.sm.copyWith(
                fontWeight: FontWeight.bold,
                color: Colors.white,
                fontSize: 11,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildIconButton(FThemeData theme, _ButtonInfo button) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        color: theme.colors.secondary.withOpacity(0.1),
        border: Border.all(
          color: theme.colors.secondary.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () => onAction?.call(button.type),
          borderRadius: BorderRadius.circular(8),
          child: Center(
            child: Icon(button.icon, color: theme.colors.secondary, size: 18),
          ),
        ),
      ),
    );
  }

  List<_ButtonInfo> _getButtonsToShow() {
    final buttons = <_ButtonInfo>[];

    if (config.showSingleOpen) {
      buttons.add(
        _ButtonInfo(
          type: PackActionType.open,
          label: 'OUVRIR',
          icon: Icons.card_giftcard,
        ),
      );
    }

    if (config.showMultipleOpen) {
      buttons.add(
        _ButtonInfo(
          type: PackActionType.openMultiple,
          label: 'x${config.multipleOpenCount}',
          icon: Icons.burst_mode,
        ),
      );
    }

    if (config.showPreview) {
      buttons.add(
        _ButtonInfo(
          type: PackActionType.preview,
          label: 'Aperçu',
          icon: Icons.preview,
        ),
      );
    }

    if (config.showFavorite) {
      buttons.add(
        _ButtonInfo(
          type: PackActionType.favorite,
          label: 'Favoris',
          icon: Icons.favorite_border,
        ),
      );
    }

    if (config.showDetails) {
      buttons.add(
        _ButtonInfo(
          type: PackActionType.details,
          label: 'Détails',
          icon: Icons.info_outline,
        ),
      );
    }

    return buttons;
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
}

// Classe d'aide pour les informations de bouton
class _ButtonInfo {
  final PackActionType type;
  final String label;
  final IconData icon;

  _ButtonInfo({required this.type, required this.label, required this.icon});
}
