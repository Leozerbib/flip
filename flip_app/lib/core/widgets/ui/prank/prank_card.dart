import 'package:flutter/material.dart';
import '../../../../data/models/models.dart';
import 'elements/prank_card_body.dart';
import 'elements/prank_description_panel.dart';
import 'animation/prank_card_animations.dart';
import 'dialog/prank_detail_dialog.dart';

/// Types de vue disponibles pour la carte prank
enum PrankCardViewType {
  /// Vue compacte pour les listes
  compact,

  /// Vue normale pour les grilles
  normal,

  /// Vue étendue pour les détails
  expanded,

  /// Vue de type Pokémon avec style gaming
  pokemon,

  /// Vue minimaliste
  minimal,
}

/// Configuration pour personnaliser l'apparence de la carte
class PrankCardConfig {
  final bool showImage;
  final bool showChips;
  final bool showDescription;
  final bool enableAnimations;
  final bool enableHover;
  final bool enableRarityGlow;
  final bool showActions;
  final double? customHeight;
  final double? customWidth;

  const PrankCardConfig({
    this.showImage = true,
    this.showChips = true,
    this.showDescription = true,
    this.enableAnimations = true,
    this.enableHover = true,
    this.enableRarityGlow = false,
    this.showActions = true,
    this.customHeight,
    this.customWidth,
  });

  /// Configuration pour vue compacte
  static const compact = PrankCardConfig(
    showImage: false,
    showDescription: false,
    enableRarityGlow: false,
    customHeight: null,
  );

  /// Configuration pour vue normale
  static const normal = PrankCardConfig(
    showImage: true,
    showDescription: false,
    enableRarityGlow: false,
    customHeight: null,
  );

  /// Configuration pour vue étendue
  static const expanded = PrankCardConfig(
    showImage: true,
    showDescription: true,
    enableRarityGlow: true,
    customHeight: 320,
  );

  /// Configuration pour vue Pokémon
  static const pokemon = PrankCardConfig(
    showImage: true,
    showDescription: true,
    enableRarityGlow: true,
    enableAnimations: true,
    customHeight: 300,
  );

  /// Configuration minimaliste
  static const minimal = PrankCardConfig(
    showImage: false,
    showChips: false,
    showDescription: false,
    showActions: false,
    enableRarityGlow: false,
    customHeight: 60,
  );
}

/// Widget principal de carte Prank réutilisable
class PrankCard extends StatelessWidget {
  final PrankModel prank;
  final PrankCardViewType viewType;
  final PrankCardConfig? config;
  final Function(String action)? onAction;
  final VoidCallback? onTap;
  final int index;
  final bool showDetailOnTap;

  const PrankCard({
    super.key,
    required this.prank,
    this.viewType = PrankCardViewType.normal,
    this.config,
    this.onAction,
    this.onTap,
    this.index = 0,
    this.showDetailOnTap = true,
  });

  /// Factory pour créer une carte compacte
  factory PrankCard.compact({
    Key? key,
    required PrankModel prank,
    Function(String action)? onAction,
    VoidCallback? onTap,
    int index = 0,
  }) {
    return PrankCard(
      key: key,
      prank: prank,
      viewType: PrankCardViewType.compact,
      config: PrankCardConfig.compact,
      onAction: onAction,
      onTap: onTap,
      index: index,
    );
  }

  /// Factory pour créer une carte normale
  factory PrankCard.normal({
    Key? key,
    required PrankModel prank,
    Function(String action)? onAction,
    VoidCallback? onTap,
    int index = 0,
  }) {
    return PrankCard(
      key: key,
      prank: prank,
      viewType: PrankCardViewType.normal,
      config: PrankCardConfig.normal,
      onAction: onAction,
      onTap: onTap,
      index: index,
    );
  }

  /// Factory pour créer une carte étendue
  factory PrankCard.expanded({
    Key? key,
    required PrankModel prank,
    Function(String action)? onAction,
    VoidCallback? onTap,
    int index = 0,
  }) {
    return PrankCard(
      key: key,
      prank: prank,
      viewType: PrankCardViewType.expanded,
      config: PrankCardConfig.expanded,
      onAction: onAction,
      onTap: onTap,
      index: index,
    );
  }

  /// Factory pour créer une carte style Pokémon
  factory PrankCard.pokemon({
    Key? key,
    required PrankModel prank,
    Function(String action)? onAction,
    VoidCallback? onTap,
    int index = 0,
  }) {
    return PrankCard(
      key: key,
      prank: prank,
      viewType: PrankCardViewType.pokemon,
      config: PrankCardConfig.pokemon,
      onAction: onAction,
      onTap: onTap,
      index: index,
    );
  }

  /// Factory pour créer une carte minimaliste
  factory PrankCard.minimal({
    Key? key,
    required PrankModel prank,
    Function(String action)? onAction,
    VoidCallback? onTap,
    int index = 0,
  }) {
    return PrankCard(
      key: key,
      prank: prank,
      viewType: PrankCardViewType.minimal,
      config: PrankCardConfig.minimal,
      onAction: onAction,
      onTap: onTap,
      index: index,
      showDetailOnTap: false,
    );
  }

  @override
  Widget build(BuildContext context) {
    final effectiveConfig = config ?? _getDefaultConfig();

    Widget card = _buildCard(context, effectiveConfig);

    // Ajouter les animations si activées
    if (effectiveConfig.enableAnimations) {
      card = AnimatedPrankCard(
        index: index,
        onTap: _handleTap(context),
        rarityColor: _getRarityColor(),
        enableHover: effectiveConfig.enableHover,
        enableRarityGlow: effectiveConfig.enableRarityGlow,
        child: card,
      );
    }

    // Ajouter les contraintes de taille
    if (effectiveConfig.customHeight != null ||
        effectiveConfig.customWidth != null) {
      card = SizedBox(
        height: effectiveConfig.customHeight,
        width: effectiveConfig.customWidth,
        child: card,
      );
    }

    return card;
  }

  Widget _buildCard(BuildContext context, PrankCardConfig config) {
    switch (viewType) {
      case PrankCardViewType.compact:
        return _buildCompactCard(config);
      case PrankCardViewType.normal:
        return _buildNormalCard(config);
      case PrankCardViewType.expanded:
        return _buildExpandedCard(config);
      case PrankCardViewType.pokemon:
        return _buildPokemonCard(config);
      case PrankCardViewType.minimal:
        return _buildMinimalCard(config);
    }
  }

  Widget _buildCompactCard(PrankCardConfig config) {
    return PrankCardBody(
      prank: prank,
      type: PrankCardBodyType.compact,
      showImage: config.showImage,
      showChips: config.showChips,
      onTap: _handleTap(null),
    );
  }

  Widget _buildNormalCard(PrankCardConfig config) {
    return PrankCardBody(
      prank: prank,
      type: PrankCardBodyType.normal,
      showImage: config.showImage,
      showChips: config.showChips,
      onTap: _handleTap(null),
    );
  }

  Widget _buildExpandedCard(PrankCardConfig config) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Flexible(
          child: PrankCardBody(
            prank: prank,
            type: PrankCardBodyType.expanded,
            showImage: config.showImage,
            showChips: config.showChips,
            onTap: _handleTap(null),
          ),
        ),
      ],
    );
  }

  Widget _buildPokemonCard(PrankCardConfig config) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: _getRarityColor().withOpacity(0.4),
            blurRadius: 15,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Card(
        elevation: 0,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: BorderSide(color: _getRarityColor(), width: 3),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(17),
          child: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  _getRarityColor().withOpacity(0.1),
                  Colors.white,
                  _getRarityColor().withOpacity(0.05),
                ],
              ),
            ),
            child: Stack(
              children: [
                // Effet holographique pour les cartes rares
                if (prank.rarity != PrankRarity.common)
                  Positioned.fill(
                    child: Container(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                            _getRarityColor().withOpacity(0.1),
                            Colors.transparent,
                            _getRarityColor().withOpacity(0.1),
                          ],
                          stops: const [0.0, 0.5, 1.0],
                        ),
                      ),
                    ),
                  ),

                // Contenu principal
                PrankCardBody(
                  prank: prank,
                  type: PrankCardBodyType.expanded,
                  showImage: config.showImage,
                  showChips: config.showChips,
                  onTap: _handleTap(null),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildMinimalCard(PrankCardConfig config) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Row(
        children: [
          Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(
              color: _getRarityColor(),
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              prank.name,
              style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 14),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          Text(
            '${prank.defaultJetonCostEquivalent}',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: _getRarityColor(),
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }

  PrankCardConfig _getDefaultConfig() {
    switch (viewType) {
      case PrankCardViewType.compact:
        return PrankCardConfig.compact;
      case PrankCardViewType.normal:
        return PrankCardConfig.normal;
      case PrankCardViewType.expanded:
        return PrankCardConfig.expanded;
      case PrankCardViewType.pokemon:
        return PrankCardConfig.pokemon;
      case PrankCardViewType.minimal:
        return PrankCardConfig.minimal;
    }
  }

  VoidCallback? _handleTap(BuildContext? context) {
    return () {
      if (onTap != null) {
        onTap!();
      } else if (showDetailOnTap && context != null) {
        showPrankDetailDialog(
          context: context,
          prank: prank,
          onAction: onAction,
        );
      } else if (onAction != null) {
        onAction!('tap');
      }
    };
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
