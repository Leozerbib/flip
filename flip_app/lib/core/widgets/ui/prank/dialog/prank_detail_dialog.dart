import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../../data/models/models.dart';
import '../../component/button.dart';
import '../elements/prank_chip.dart';
import '../elements/prank_description_panel.dart';
import '../animation/prank_card_animations.dart';

class PrankDetailDialog extends StatefulWidget {
  final PrankModel prank;
  final Function(String action)? onAction;
  final bool showActions;

  const PrankDetailDialog({
    super.key,
    required this.prank,
    this.onAction,
    this.showActions = true,
  });

  @override
  State<PrankDetailDialog> createState() => _PrankDetailDialogState();
}

class _PrankDetailDialogState extends State<PrankDetailDialog> {
  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Container(
        constraints: const BoxConstraints(maxWidth: 500, maxHeight: 700),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Header avec image
            _buildHeader(theme),

            // Contenu principal
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Titre et chips
                    _buildTitle(theme),

                    const SizedBox(height: 20),

                    // Panel de description
                    PrankDescriptionPanel(
                      prank: widget.prank,
                      isExpanded: true,
                      showStats: true,
                    ),

                    const SizedBox(height: 20),

                    // Informations supplémentaires
                    _buildAdditionalInfo(theme),
                  ],
                ),
              ),
            ),

            // Actions
            if (widget.showActions) _buildActions(theme),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(FThemeData theme) {
    return Container(
      height: 200,
      decoration: BoxDecoration(
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(20),
          topRight: Radius.circular(20),
        ),
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            _getRarityColor().withOpacity(0.8),
            _getRarityColor().withOpacity(0.3),
          ],
        ),
      ),
      child: Stack(
        children: [
          // Image de fond
          Positioned.fill(
            child: ClipRRect(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(20),
                topRight: Radius.circular(20),
              ),
              child: _buildPrankImage(),
            ),
          ),

          // Overlay gradient
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(20),
                  topRight: Radius.circular(20),
                ),
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.black.withOpacity(0.3),
                    Colors.transparent,
                    Colors.black.withOpacity(0.5),
                  ],
                ),
              ),
            ),
          ),

          // Bouton fermer
          Positioned(
            top: 16,
            right: 16,
            child: Container(
              decoration: BoxDecoration(
                color: Colors.black.withOpacity(0.5),
                shape: BoxShape.circle,
              ),
              child: IconButton(
                icon: const Icon(Icons.close, color: Colors.white),
                onPressed: () => Navigator.of(context).pop(),
              ),
            ),
          ),

          // Icône du type en bas à gauche
          Positioned(bottom: 16, left: 16, child: _buildTypeIcon()),

          // Coût en bas à droite
          Positioned(bottom: 16, right: 16, child: _buildCostBadge(theme)),
        ],
      ),
    );
  }

  Widget _buildPrankImage() {
    if (widget.prank.imageUrl != null && widget.prank.imageUrl!.isNotEmpty) {
      return Image.asset(
        widget.prank.imageUrl!,
        fit: BoxFit.cover,
        errorBuilder: (context, error, stackTrace) {
          return _buildDefaultImage();
        },
      );
    }
    return _buildDefaultImage();
  }

  Widget _buildDefaultImage() {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            _getRarityColor().withOpacity(0.6),
            _getRarityColor().withOpacity(0.3),
          ],
        ),
      ),
      child: Center(
        child: Icon(
          FIcons.image,
          size: 80,
          color: Colors.white.withOpacity(0.7),
        ),
      ),
    );
  }

  Widget _buildTitle(FThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Titre principal
        Text(
          widget.prank.name,
          style: theme.typography.xl.copyWith(
            fontWeight: FontWeight.bold,
            color: Colors.black87,
          ),
        ),

        const SizedBox(height: 12),

        // Chips de rareté et type
        Wrap(
          spacing: 8,
          runSpacing: 6,
          children: [
            PrankRarityChip(
              rarity: widget.prank.rarity,
              size: PrankChipSize.large,
            ),
            PrankTypeChip(type: widget.prank.type, size: PrankChipSize.large),
          ],
        ),
      ],
    );
  }

  Widget _buildAdditionalInfo(FThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.grey.shade50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Informations supplémentaires',
            style: theme.typography.sm.copyWith(
              fontWeight: FontWeight.bold,
              color: Colors.black87,
            ),
          ),

          const SizedBox(height: 12),

          // Informations détaillées
          _buildInfoRow(
            icon: FIcons.calendar,
            label: 'Disponible depuis',
            value: 'Toujours',
            theme: theme,
          ),

          const SizedBox(height: 8),

          _buildInfoRow(
            icon: FIcons.users,
            label: 'Utilisateurs ayant ce prank',
            value: '1,234 joueurs',
            theme: theme,
          ),

          if (widget.prank.requiresProof) ...[
            const SizedBox(height: 8),
            _buildInfoRow(
              icon: FIcons.camera,
              label: 'Preuve requise',
              value: 'Photo obligatoire',
              theme: theme,
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildInfoRow({
    required IconData icon,
    required String label,
    required String value,
    required FThemeData theme,
  }) {
    return Row(
      children: [
        Icon(icon, size: 16, color: Colors.grey.shade600),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            label,
            style: theme.typography.sm.copyWith(color: Colors.grey.shade600),
          ),
        ),
        Text(
          value,
          style: theme.typography.sm.copyWith(
            fontWeight: FontWeight.w600,
            color: Colors.black87,
          ),
        ),
      ],
    );
  }

  Widget _buildActions(FThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.grey.shade50,
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(20),
          bottomRight: Radius.circular(20),
        ),
      ),
      child: Column(
        children: [
          // Action principale
          SizedBox(
            width: double.infinity,
            child: AppButton(
              text: '🎮 Jouer ce Prank',
              onPressed: () {
                Navigator.of(context).pop();
                widget.onAction?.call('execute');
              },
              style: FButtonStyle.primary,
            ),
          ),

          const SizedBox(height: 12),

          // Actions secondaires
          Row(
            children: [
              Expanded(
                child: AppButton(
                  text: '💎 Ajouter aux favoris',
                  onPressed: () {
                    widget.onAction?.call('favorite');
                  },
                  style: FButtonStyle.outline,
                ),
              ),

              const SizedBox(width: 12),

              Expanded(
                child: AppButton(
                  text: '📤 Partager',
                  onPressed: () {
                    widget.onAction?.call('share');
                  },
                  style: FButtonStyle.outline,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTypeIcon() {
    final typeData = _getTypeData();
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: typeData['color'],
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Icon(typeData['icon'], size: 24, color: Colors.white),
    );
  }

  Widget _buildCostBadge(FThemeData theme) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.red.shade600,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(FIcons.heart, size: 16, color: Colors.white),
          const SizedBox(width: 6),
          Text(
            '${widget.prank.defaultJetonCostEquivalent}',
            style: theme.typography.sm.copyWith(
              fontWeight: FontWeight.bold,
              color: Colors.white,
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }

  Color _getRarityColor() {
    switch (widget.prank.rarity) {
      case PrankRarity.common:
        return Colors.grey.shade600;
      case PrankRarity.rare:
        return Colors.blue.shade600;
      case PrankRarity.extreme:
        return Colors.amber.shade600;
    }
  }

  Map<String, dynamic> _getTypeData() {
    switch (widget.prank.type) {
      case PrankType.declarative:
        return {'color': Colors.blue.shade600, 'icon': FIcons.messageSquare};
      case PrankType.inAppCosmetic:
        return {'color': Colors.purple.shade600, 'icon': FIcons.palette};
      case PrankType.inAppLock:
        return {'color': Colors.red.shade600, 'icon': FIcons.lock};
      case PrankType.notificationSpam:
        return {'color': Colors.orange.shade600, 'icon': FIcons.bell};
      case PrankType.externalAction:
        return {'color': Colors.green.shade600, 'icon': FIcons.externalLink};
    }
  }
}

/// Fonction helper pour afficher la dialog
void showPrankDetailDialog({
  required BuildContext context,
  required PrankModel prank,
  Function(String action)? onAction,
  bool showActions = true,
}) {
  showDialog(
    context: context,
    builder: (context) => PrankCardTransitionAnimation(
      child: PrankDetailDialog(
        prank: prank,
        onAction: onAction,
        showActions: showActions,
      ),
    ),
  );
}
