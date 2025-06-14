import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../../data/models/models.dart';
import 'prank_chip.dart';

enum PrankCardBodyType { compact, normal, expanded }

class PrankCardBody extends StatelessWidget {
  final PrankModel prank;
  final PrankCardBodyType type;
  final bool showImage;
  final bool showChips;
  final VoidCallback? onTap;

  const PrankCardBody({
    super.key,
    required this.prank,
    this.type = PrankCardBodyType.normal,
    this.showImage = true,
    this.showChips = true,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        gradient: _getCardGradient(),
        boxShadow: [
          BoxShadow(
            color: _getRarityColor().withOpacity(0.3),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(16),
          child: Container(
            padding: const EdgeInsets.all(4),
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                color: theme.colors.background,
                border: Border.all(
                  color: _getRarityColor().withOpacity(0.3),
                  width: 1,
                ),
              ),
              child: _buildContent(context, theme),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildContent(BuildContext context, FThemeData theme) {
    switch (type) {
      case PrankCardBodyType.compact:
        return _buildCompactContent(theme);
      case PrankCardBodyType.normal:
        return _buildNormalContent(theme);
      case PrankCardBodyType.expanded:
        return _buildExpandedContent(theme);
    }
  }

  Widget _buildCompactContent(FThemeData theme) {
    return Center(
      child: Stack(
        fit: StackFit.expand,
        alignment: Alignment.center,
        children: [
          _buildPrankImage(),

          Padding(
            padding: const EdgeInsets.all(4),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,

              children: [
                // Icône type
                _buildTypeIcon(),
                const SizedBox(width: 12),
              ],
            ),
          ),
          // Contenu principal
        ],
      ),
    );
  }

  Widget _buildNormalContent(FThemeData theme) {
    return Stack(
      fit: StackFit.expand,
      children: [
        if (showImage) ...[_buildPrankImage(), const SizedBox(height: 12)],

        Padding(
          padding: const EdgeInsets.all(8),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  _buildTypeIcon(),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Container(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      alignment: Alignment.center,
                      padding: const EdgeInsets.all(4),
                      child: Text(
                        prank.name,
                        style: theme.typography.base.copyWith(
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  _buildCostBadge(theme),
                ],
              ),

              AspectRatio(
                aspectRatio: 1.7,
                child: Container(
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  padding: const EdgeInsets.all(4),
                  alignment: Alignment.center,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      mainAxisSize: MainAxisSize.max,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        // Description courte
                        Flexible(
                          flex: 8,
                          child: Center(
                            child: Container(
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(
                                  color: Colors.black12,
                                  width: 1,
                                ),
                              ),
                              padding: const EdgeInsets.all(4),
                              alignment: Alignment.center,
                              child: Text(
                                prank.description,
                                style: theme.typography.sm.copyWith(
                                  color: Colors.black54,
                                  height: 1.3,
                                ),
                                maxLines: 4,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ),
                        ),

                        Flexible(
                          flex: 2,
                          child: Center(child: _buildQuickStats(theme)),
                        ),

                        // Stats rapides
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildExpandedContent(FThemeData theme) {
    return Padding(
      padding: const EdgeInsets.all(8),
      child: Container(
        height: double.infinity,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,

          children: [
            // Header étendu
            Flexible(
              flex: 1,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  _buildTypeIcon(),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Container(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      alignment: Alignment.center,
                      padding: const EdgeInsets.all(4),
                      child: Text(
                        prank.name,
                        style: theme.typography.lg.copyWith(
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  _buildCostBadge(theme),
                ],
              ),
            ),
            // Description complète
            Flexible(
              flex: 9,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  spacing: 12,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.start,
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    Flexible(
                      flex: 8,
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        padding: const EdgeInsets.all(8),
                        alignment: Alignment.topLeft,
                        child: Text(
                          prank.description,
                          style: theme.typography.base.copyWith(
                            color: Colors.black87,
                            height: 1.4,
                          ),
                        ),
                      ),
                    ),
                    // Stats détaillées
                    Flexible(
                      flex: 2,
                      child: Container(child: _buildDetailedStats(theme)),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTypeIcon() {
    final typeData = _getTypeData();
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: typeData['color'],
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: typeData['color'].withOpacity(0.3),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Icon(
        typeData['icon'],
        size: type == PrankCardBodyType.compact ? 14 : 18,
        color: Colors.white,
      ),
    );
  }

  Widget _buildCostBadge(FThemeData theme) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: Colors.red.shade600,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.red.withOpacity(0.3),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            FIcons.heart,
            size: type == PrankCardBodyType.compact ? 12 : 14,
            color: Colors.white,
          ),
          const SizedBox(width: 4),
          Text(
            '${prank.defaultJetonCostEquivalent}',
            style: theme.typography.sm.copyWith(
              fontWeight: FontWeight.bold,
              color: Colors.white,
              fontSize: type == PrankCardBodyType.compact ? 11 : 13,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPrankImage() {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            _getRarityColor().withOpacity(0.3),
            _getRarityColor().withOpacity(0.1),
          ],
        ),
        border: Border.all(color: _getRarityColor().withOpacity(0.3), width: 1),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: (prank.imageUrl != null && prank.imageUrl!.isNotEmpty)
            ? Image.asset(
                prank.imageUrl!,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) {
                  return _buildDefaultImage();
                },
              )
            : _buildDefaultImage(),
      ),
    );
  }

  Widget _buildDefaultImage() {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            _getRarityColor().withOpacity(0.3),
            _getRarityColor().withOpacity(0.1),
          ],
        ),
      ),
      child: Center(
        child: Icon(
          FIcons.image,
          size: type == PrankCardBodyType.expanded ? 48 : 32,
          color: _getRarityColor().withOpacity(0.6),
        ),
      ),
    );
  }

  Widget _buildQuickStats(FThemeData theme) {
    return Wrap(
      spacing: 6,
      runSpacing: 4,
      children: [
        if (prank.xpRewardExecutor != null)
          _buildStatChip(
            icon: FIcons.star,
            text: '+${prank.xpRewardExecutor} XP',
            color: Colors.purple.shade600,
          ),
        if (prank.coinsRewardExecutor != null)
          _buildStatChip(
            icon: FIcons.circle,
            text: '+${prank.coinsRewardExecutor}',
            color: Colors.amber.shade600,
          ),
        if (prank.requiresProof)
          _buildStatChip(
            icon: FIcons.camera,
            text: 'Preuve',
            color: Colors.orange.shade600,
          ),
      ],
    );
  }

  Widget _buildDetailedStats(FThemeData theme) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: Colors.grey.shade50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Wrap(
            spacing: 8,
            runSpacing: 6,
            children: [
              if (prank.xpRewardExecutor != null)
                _buildStatChip(
                  icon: FIcons.star,
                  text: '+${prank.xpRewardExecutor} XP',
                  color: Colors.purple.shade600,
                ),
              if (prank.coinsRewardExecutor != null)
                _buildStatChip(
                  icon: FIcons.circle,
                  text: '+${prank.coinsRewardExecutor} coins',
                  color: Colors.amber.shade600,
                ),
              if (prank.requiresProof)
                _buildStatChip(
                  icon: FIcons.camera,
                  text: 'Preuve requise',
                  color: Colors.orange.shade600,
                ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatChip({
    required IconData icon,
    required String text,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: color.withOpacity(0.3), width: 1),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 10, color: color),
          const SizedBox(width: 3),
          Text(
            text,
            style: TextStyle(
              fontSize: 9,
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
        ],
      ),
    );
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

  LinearGradient _getCardGradient() {
    switch (prank.rarity) {
      case PrankRarity.extreme:
        return const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFFFFD700), Color(0xFFFF8C00), Color(0xFFFF4500)],
        );
      case PrankRarity.rare:
        return const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF2196F3), Color(0xFF3F51B5), Color(0xFF673AB7)],
        );
      case PrankRarity.common:
        return const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF9E9E9E), Color(0xFF607D8B), Color(0xFF455A64)],
        );
    }
  }

  Map<String, dynamic> _getTypeData() {
    switch (prank.type) {
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
