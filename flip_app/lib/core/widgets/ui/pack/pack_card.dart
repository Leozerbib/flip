import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../data/models/models.dart';
import 'elements/pack_image.dart';
import 'elements/pack_chip.dart';
import 'elements/pack_info_panel.dart';
import 'elements/pack_action_buttons.dart';
import 'animation/pack_animations.dart';
import 'dialog/pack_confirmation_dialog.dart';
import 'dialog/pack_results_dialog.dart';

/// Types de vues disponibles pour les cartes de pack
enum PackCardViewType {
  compact, // Vue compacte avec bouton principal
  standard, // Vue standard avec image et actions
  detailed, // Vue détaillée avec toutes les informations
  showcase, // Vue vitrine pour mise en avant
  grid, // Vue optimisée pour les grilles
}

/// Configuration pour personnaliser l'apparence et le comportement d'une PackCard
class PackCardConfig {
  final bool showImage;
  final bool showDescription;
  final bool showRarityProbabilities;
  final bool showPackInfo;
  final bool enableAnimations;
  final bool enableInteractions;
  final PackActionConfig actionConfig;
  final PackAnimationConfig animationConfig;
  final EdgeInsets? padding;
  final double? width;
  final double? height;

  const PackCardConfig({
    this.showImage = true,
    this.showDescription = false,
    this.showRarityProbabilities = false,
    this.showPackInfo = true,
    this.enableAnimations = true,
    this.enableInteractions = true,
    this.actionConfig = const PackActionConfig(),
    this.animationConfig = const PackAnimationConfig(),
    this.padding,
    this.width,
    this.height,
  });
}

/// Widget principal pour afficher une carte de pack avec différentes vues et configurations
class PackCard extends StatelessWidget {
  final PrankPackModel pack;
  final PackCardViewType viewType;
  final PackCardConfig config;
  final int index;
  final Function(PackActionType)? onAction;
  final VoidCallback? onTap;
  final bool canOpen;
  final String? notOpenableReason;

  const PackCard({
    super.key,
    required this.pack,
    this.viewType = PackCardViewType.standard,
    this.config = const PackCardConfig(),
    this.index = 0,
    this.onAction,
    this.onTap,
    this.canOpen = true,
    this.notOpenableReason,
  });

  /// Factory pour créer une vue compacte
  factory PackCard.compact({
    required PrankPackModel pack,
    int index = 0,
    Function(PackActionType)? onAction,
    VoidCallback? onTap,
    bool canOpen = true,
    String? notOpenableReason,
  }) {
    return PackCard(
      pack: pack,
      viewType: PackCardViewType.compact,
      index: index,
      onAction: onAction,
      onTap: onTap,
      canOpen: canOpen,
      notOpenableReason: notOpenableReason,
      config: const PackCardConfig(
        showImage: true,
        showDescription: false,
        showRarityProbabilities: false,
        showPackInfo: false,
        actionConfig: PackActionConfig.compact,
        width: 200,
        height: 280,
      ),
    );
  }

  /// Factory pour créer une vue standard
  factory PackCard.standard({
    required PrankPackModel pack,
    int index = 0,
    Function(PackActionType)? onAction,
    VoidCallback? onTap,
    bool canOpen = true,
    String? notOpenableReason,
  }) {
    return PackCard(
      pack: pack,
      viewType: PackCardViewType.standard,
      index: index,
      onAction: onAction,
      onTap: onTap,
      canOpen: canOpen,
      notOpenableReason: notOpenableReason,
      config: const PackCardConfig(
        showImage: true,
        showDescription: false,
        showRarityProbabilities: false,
        showPackInfo: true,
        actionConfig: PackActionConfig.standard,
        width: 250,
        height: 350,
      ),
    );
  }

  /// Factory pour créer une vue détaillée
  factory PackCard.detailed({
    required PrankPackModel pack,
    int index = 0,
    Function(PackActionType)? onAction,
    VoidCallback? onTap,
    bool canOpen = true,
    String? notOpenableReason,
  }) {
    return PackCard(
      pack: pack,
      viewType: PackCardViewType.detailed,
      index: index,
      onAction: onAction,
      onTap: onTap,
      canOpen: canOpen,
      notOpenableReason: notOpenableReason,
      config: const PackCardConfig(
        showImage: true,
        showDescription: true,
        showRarityProbabilities: true,
        showPackInfo: true,
        actionConfig: PackActionConfig.full,
        width: 300,
        height: 500,
      ),
    );
  }

  /// Factory pour créer une vue vitrine
  factory PackCard.showcase({
    required PrankPackModel pack,
    int index = 0,
    Function(PackActionType)? onAction,
    VoidCallback? onTap,
    bool canOpen = true,
    String? notOpenableReason,
  }) {
    return PackCard(
      pack: pack,
      viewType: PackCardViewType.showcase,
      index: index,
      onAction: onAction,
      onTap: onTap,
      canOpen: canOpen,
      notOpenableReason: notOpenableReason,
      config: const PackCardConfig(
        showImage: true,
        showDescription: true,
        showRarityProbabilities: true,
        showPackInfo: true,
        actionConfig: PackActionConfig.full,
        animationConfig: PackAnimationConfig.dramatic,
        width: 350,
        height: 600,
      ),
    );
  }

  /// Factory pour créer une vue grille
  factory PackCard.grid({
    required PrankPackModel pack,
    int index = 0,
    Function(PackActionType)? onAction,
    VoidCallback? onTap,
    bool canOpen = true,
    String? notOpenableReason,
  }) {
    return PackCard(
      pack: pack,
      viewType: PackCardViewType.grid,
      index: index,
      onAction: onAction,
      onTap: onTap,
      canOpen: canOpen,
      notOpenableReason: notOpenableReason,
      config: const PackCardConfig(
        showImage: true,
        showDescription: false,
        showRarityProbabilities: false,
        showPackInfo: false,
        actionConfig: PackActionConfig.standard,
        width: 180,
        height: 250,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    Widget card = _buildCard(context);

    // Wrapper avec animations et interactions
    if (config.enableAnimations || config.enableInteractions) {
      card = AnimatedPack(
        index: index,
        config: config.animationConfig,
        onTap: () => _handleTap(context),
        enabled: config.enableAnimations,
        enableInteractions: config.enableInteractions,
        child: card,
      );
    }

    return card;
  }

  Widget _buildCard(BuildContext context) {
    final theme = FTheme.of(context);

    return Container(
      width: config.width,
      height: config.height,
      padding:
          config.padding ??
          const EdgeInsets.only(top: 8, bottom: 8, left: 16, right: 16),
      decoration: BoxDecoration(
        color: theme.colors.background,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: _getDominantRarityColor().withOpacity(0.3),
          width: 2,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: _buildCardContent(theme),
    );
  }

  Widget _buildCardContent(FThemeData theme) {
    switch (viewType) {
      case PackCardViewType.compact:
        return _buildCompactView(theme);
      case PackCardViewType.standard:
        return _buildStandardView(theme);
      case PackCardViewType.detailed:
        return _buildDetailedView(theme);
      case PackCardViewType.showcase:
        return _buildShowcaseView(theme);
      case PackCardViewType.grid:
        return _buildGridView(theme);
    }
  }

  Widget _buildCompactView(FThemeData theme) {
    return Column(
      children: [
        // Image du pack
        if (config.showImage) ...[
          Expanded(
            flex: 3,
            child: PackImage(
              pack: pack,
              size: PackImageSize.medium,
              showEffects: true,
              showRarityGlow: true,
            ),
          ),
          const SizedBox(height: 12),
        ],

        // Nom du pack
        Text(
          pack.name,
          style: theme.typography.base.copyWith(
            fontWeight: FontWeight.bold,
            color: theme.colors.foreground,
          ),
          textAlign: TextAlign.center,
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
        ),

        const SizedBox(height: 8),

        // Informations rapides
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            PackCardsCountChip(
              cardsCount: pack.numberOfPranksAwarded,
              size: PackChipSize.small,
            ),
            const SizedBox(width: 8),
            PackRarityChip(
              rarity: _getDominantRarity(),
              size: PackChipSize.small,
            ),
          ],
        ),

        const SizedBox(height: 12),

        // Actions
        Expanded(
          child: Align(
            alignment: Alignment.bottomCenter,
            child: PackActionButtons(
              pack: pack,
              config: config.actionConfig,
              onAction: _handleAction,
              canOpen: canOpen,
              notOpenableReason: notOpenableReason,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildStandardView(FThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Image du pack
        if (config.showImage) ...[
          Expanded(
            flex: 2,
            child: Center(
              child: PackImage(
                pack: pack,
                size: PackImageSize.large,
                showEffects: true,
                showRarityGlow: true,
              ),
            ),
          ),
          const SizedBox(height: 16),
        ],

        // En-tête avec nom et chips
        _buildPackHeader(theme),

        if (config.showPackInfo) ...[
          const SizedBox(height: 12),
          _buildQuickInfo(theme),
        ],

        const Spacer(),

        // Actions
        PackActionButtons(
          pack: pack,
          config: config.actionConfig,
          onAction: _handleAction,
          canOpen: canOpen,
          notOpenableReason: notOpenableReason,
        ),
      ],
    );
  }

  Widget _buildDetailedView(FThemeData theme) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Image du pack
          if (config.showImage) ...[
            Center(
              child: PackImage(
                pack: pack,
                size: PackImageSize.large,
                showEffects: true,
                showRarityGlow: true,
              ),
            ),
            const SizedBox(height: 16),
          ],

          // En-tête
          _buildPackHeader(theme),

          const SizedBox(height: 16),

          // Panel d'informations
          if (config.showPackInfo)
            PackInfoPanel(
              pack: pack,
              showDetailed: true,
              showRarityProbabilities: config.showRarityProbabilities,
            ),

          const SizedBox(height: 16),

          // Actions
          PackActionButtons(
            pack: pack,
            config: config.actionConfig,
            onAction: _handleAction,
            canOpen: canOpen,
            notOpenableReason: notOpenableReason,
          ),
        ],
      ),
    );
  }

  Widget _buildShowcaseView(FThemeData theme) {
    return Column(
      children: [
        // Image héro avec gradient overlay
        Expanded(
          flex: 3,
          child: Stack(
            children: [
              Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      _getDominantRarityColor().withOpacity(0.1),
                      _getDominantRarityColor().withOpacity(0.3),
                    ],
                  ),
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              Center(
                child: PackImage(
                  pack: pack,
                  size: PackImageSize.fullscreen,
                  showEffects: true,
                  showRarityGlow: true,
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 20),

        // Contenu principal
        Expanded(
          flex: 2,
          child: Column(
            children: [
              // En-tête avec style héro
              Text(
                pack.name,
                style: theme.typography.xl.copyWith(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: _getDominantRarityColor(),
                ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                textAlign: TextAlign.center,
              ),

              const SizedBox(height: 12),

              // Chips améliorées
              Wrap(
                spacing: 8,
                runSpacing: 8,
                alignment: WrapAlignment.center,
                children: [
                  PackCardsCountChip(
                    cardsCount: pack.numberOfPranksAwarded,
                    size: PackChipSize.medium,
                  ),
                  PackRarityChip(
                    rarity: _getDominantRarity(),
                    size: PackChipSize.medium,
                    showGlow: true,
                  ),
                  PackTypeChip(packType: 'PREMIUM', size: PackChipSize.medium),
                ],
              ),

              const Spacer(),

              // Actions avec style premium
              PackActionButtons(
                pack: pack,
                config: config.actionConfig,
                onAction: _handleAction,
                canOpen: canOpen,
                notOpenableReason: notOpenableReason,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildGridView(FThemeData theme) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        // Image compacte
        Expanded(
          flex: 5,
          child: PackImage(
            pack: pack,
            size: PackImageSize.medium,
            showEffects: false,
            showRarityGlow: false,
          ),
        ),

        const SizedBox(height: 4),

        // Nom compact
        Flexible(
          child: Text(
            pack.name,
            style: theme.typography.sm.copyWith(
              fontWeight: FontWeight.bold,
              color: theme.colors.foreground,
              fontSize: 12,
            ),
            textAlign: TextAlign.center,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),

        const SizedBox(height: 4),

        // Action compacte
        Expanded(
          flex: 1,
          child: PackActionButtons(
            pack: pack,
            config: config.actionConfig,
            onAction: _handleAction,
            canOpen: canOpen,
            notOpenableReason: notOpenableReason,
          ),
        ),
      ],
    );
  }

  Widget _buildPackHeader(FThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          pack.name,
          style: theme.typography.lg.copyWith(
            fontWeight: FontWeight.bold,
            color: theme.colors.foreground,
          ),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 4,
          children: [
            PackCardsCountChip(
              cardsCount: pack.numberOfPranksAwarded,
              size: PackChipSize.small,
            ),
            PackRarityChip(
              rarity: _getDominantRarity(),
              size: PackChipSize.small,
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildQuickInfo(FThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: theme.colors.secondary.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: theme.colors.secondary.withOpacity(0.2),
          width: 1,
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'Coût:',
            style: theme.typography.sm.copyWith(
              color: theme.colors.mutedForeground,
            ),
          ),
          Row(
            children: [
              Text(
                '${pack.costAmount}',
                style: theme.typography.sm.copyWith(
                  fontWeight: FontWeight.bold,
                  color: _getCurrencyColor(),
                ),
              ),
              const SizedBox(width: 4),
              Text(
                _getCurrencySymbol(),
                style: theme.typography.sm.copyWith(color: _getCurrencyColor()),
              ),
            ],
          ),
        ],
      ),
    );
  }

  void _handleTap(BuildContext context) {
    if (onTap != null) {
      onTap!();
    } else {
      _handleAction(PackActionType.open);
    }
  }

  void _handleAction(PackActionType action) {
    if (onAction != null) {
      onAction!(action);
    } else {
      // Comportement par défaut
      _handleDefaultAction(action);
    }
  }

  void _handleDefaultAction(PackActionType action) async {
    // Actions par défaut simplifiées - dans un vrai projet,
    // ces actions seraient gérées par le parent
    switch (action) {
      case PackActionType.open:
      case PackActionType.openMultiple:
      case PackActionType.preview:
      case PackActionType.favorite:
      case PackActionType.details:
        // Action par défaut - ne fait rien
        // Les actions spécifiques doivent être gérées via onAction
        break;
    }
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
