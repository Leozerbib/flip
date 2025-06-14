import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import 'dart:math' as math;
import '../../../../../data/models/models.dart';

/// Tailles d'image pour les packs
enum PackImageSize { small, medium, large, fullscreen }

/// Widget pour afficher l'image d'un pack avec effets visuels
class PackImage extends StatefulWidget {
  final PrankPackModel pack;
  final PackImageSize size;
  final bool showEffects;
  final bool showRarityGlow;
  final double? customWidth;
  final double? customHeight;

  const PackImage({
    super.key,
    required this.pack,
    this.size = PackImageSize.medium,
    this.showEffects = true,
    this.showRarityGlow = true,
    this.customWidth,
    this.customHeight,
  });

  @override
  State<PackImage> createState() => _PackImageState();
}

class _PackImageState extends State<PackImage> with TickerProviderStateMixin {
  late AnimationController _sparkleController;
  late Animation<double> _sparkleAnimation;

  @override
  void initState() {
    super.initState();

    if (widget.showEffects) {
      _sparkleController = AnimationController(
        duration: const Duration(milliseconds: 2000),
        vsync: this,
      );

      _sparkleAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
        CurvedAnimation(parent: _sparkleController, curve: Curves.easeInOut),
      );

      _sparkleController.repeat(reverse: true);
    }
  }

  @override
  void dispose() {
    if (widget.showEffects) {
      _sparkleController.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final dimensions = _getDimensions();
    final dominantRarity = _getDominantRarity();

    return Container(
      width: widget.customWidth ?? dimensions.width,
      height: widget.customHeight ?? dimensions.height,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(dimensions.borderRadius),
        gradient: _getBackgroundGradient(dominantRarity),
        boxShadow: widget.showRarityGlow
            ? [
                BoxShadow(
                  color: _getRarityColor(dominantRarity).withOpacity(0.4),
                  blurRadius: 15,
                  spreadRadius: 3,
                  offset: const Offset(0, 5),
                ),
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: 5,
                  offset: const Offset(0, 4),
                ),
              ]
            : [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: 5,
                  offset: const Offset(0, 4),
                ),
              ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(dimensions.borderRadius),
        child: Stack(
          children: [
            // Image de fond ou pattern
            _buildImageContent(dimensions, dominantRarity),

            // Overlay pour les effets
            if (widget.showEffects) ...[
              _buildShimmerOverlay(dimensions),
              if (dominantRarity != PrankRarity.common)
                _buildSparkleEffects(dimensions),
            ],

            // Badge de rareté
            _buildRarityBadge(dominantRarity, dimensions),

            // Icône centrale
            _buildCenterIcon(dominantRarity, dimensions),
          ],
        ),
      ),
    );
  }

  Widget _buildImageContent(
    _PackImageDimensions dimensions,
    PrankRarity rarity,
  ) {
    return Container(
      width: double.infinity,
      height: double.infinity,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: _getBoosterGradient(rarity),
        ),
      ),
      child: Stack(
        children: [
          // Motif de fond
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
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

          // Motif géométrique
          if (widget.showEffects) _buildGeometricPattern(dimensions),
        ],
      ),
    );
  }

  Widget _buildShimmerOverlay(_PackImageDimensions dimensions) {
    return Positioned.fill(
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Colors.white.withOpacity(0.0),
              Colors.white.withOpacity(0.1),
              Colors.white.withOpacity(0.0),
            ],
            stops: const [0.0, 0.5, 1.0],
          ),
        ),
      ),
    );
  }

  Widget _buildSparkleEffects(_PackImageDimensions dimensions) {
    return AnimatedBuilder(
      animation: _sparkleAnimation,
      builder: (context, child) {
        return Stack(
          children: List.generate(6, (index) {
            final random = math.Random(index);
            final x = random.nextDouble() * dimensions.width;
            final y = random.nextDouble() * dimensions.height;
            final size = 8 + random.nextDouble() * 6;
            final opacity =
                (math.sin(_sparkleAnimation.value * 2 * math.pi + index) + 1) /
                2;

            return Positioned(
              left: x,
              top: y,
              child: Opacity(
                opacity: opacity * 0.8,
                child: Icon(
                  Icons.auto_awesome,
                  size: size,
                  color: Colors.white,
                ),
              ),
            );
          }),
        );
      },
    );
  }

  Widget _buildGeometricPattern(_PackImageDimensions dimensions) {
    return CustomPaint(
      size: Size(dimensions.width, dimensions.height),
      painter: _GeometricPatternPainter(),
    );
  }

  Widget _buildRarityBadge(
    PrankRarity rarity,
    _PackImageDimensions dimensions,
  ) {
    return Positioned(
      top: dimensions.padding,
      right: dimensions.padding,
      child: Container(
        padding: EdgeInsets.symmetric(
          horizontal: dimensions.padding * 0.8,
          vertical: dimensions.padding * 0.4,
        ),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.9),
          borderRadius: BorderRadius.circular(dimensions.borderRadius * 0.6),
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
          style: TextStyle(
            fontSize: dimensions.badgeFontSize,
            fontWeight: FontWeight.bold,
            color: _getRarityColor(rarity),
          ),
        ),
      ),
    );
  }

  Widget _buildCenterIcon(PrankRarity rarity, _PackImageDimensions dimensions) {
    return Positioned.fill(
      child: Center(
        child: Container(
          width: dimensions.iconSize,
          height: dimensions.iconSize,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: Colors.white.withOpacity(0.2),
            border: Border.all(color: Colors.white.withOpacity(0.3), width: 2),
          ),
          child: Icon(
            _getIconForRarity(rarity),
            size: dimensions.iconSize * 0.6,
            color: Colors.white,
          ),
        ),
      ),
    );
  }

  _PackImageDimensions _getDimensions() {
    switch (widget.size) {
      case PackImageSize.small:
        return _PackImageDimensions(
          width: 80,
          height: 110,
          borderRadius: 8,
          padding: 6,
          iconSize: 40,
          badgeFontSize: 8,
        );
      case PackImageSize.medium:
        return _PackImageDimensions(
          width: 120,
          height: 160,
          borderRadius: 12,
          padding: 8,
          iconSize: 50,
          badgeFontSize: 10,
        );
      case PackImageSize.large:
        return _PackImageDimensions(
          width: 150,
          height: 200,
          borderRadius: 16,
          padding: 12,
          iconSize: 60,
          badgeFontSize: 12,
        );
      case PackImageSize.fullscreen:
        return _PackImageDimensions(
          width: double.infinity,
          height: 250,
          borderRadius: 20,
          padding: 16,
          iconSize: 80,
          badgeFontSize: 14,
        );
    }
  }

  PrankRarity _getDominantRarity() {
    final legacyProbabilities = widget.pack.rarityProbabilities.legacyFormat;
    if (legacyProbabilities.isEmpty) return PrankRarity.common;

    return legacyProbabilities.entries
        .reduce((a, b) => a.value > b.value ? a : b)
        .key;
  }

  LinearGradient _getBackgroundGradient(PrankRarity rarity) {
    switch (rarity) {
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

  List<Color> _getBoosterGradient(PrankRarity rarity) {
    switch (rarity) {
      case PrankRarity.extreme:
        return [
          const Color(0xFFFFD700).withOpacity(0.9),
          const Color(0xFFFF8C00).withOpacity(0.8),
          const Color(0xFFFF4500).withOpacity(0.9),
        ];
      case PrankRarity.rare:
        return [
          const Color(0xFF2196F3).withOpacity(0.9),
          const Color(0xFF3F51B5).withOpacity(0.8),
          const Color(0xFF673AB7).withOpacity(0.9),
        ];
      case PrankRarity.common:
        return [
          const Color(0xFF9E9E9E).withOpacity(0.9),
          const Color(0xFF607D8B).withOpacity(0.8),
          const Color(0xFF455A64).withOpacity(0.9),
        ];
    }
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
        return 'EXTRÊME';
      case PrankRarity.rare:
        return 'RARE';
      case PrankRarity.common:
        return 'COMMUN';
    }
  }

  IconData _getIconForRarity(PrankRarity rarity) {
    switch (rarity) {
      case PrankRarity.extreme:
        return Icons.auto_awesome;
      case PrankRarity.rare:
        return Icons.star;
      case PrankRarity.common:
        return Icons.card_giftcard;
    }
  }
}

// Classes d'aide
class _PackImageDimensions {
  final double width;
  final double height;
  final double borderRadius;
  final double padding;
  final double iconSize;
  final double badgeFontSize;

  _PackImageDimensions({
    required this.width,
    required this.height,
    required this.borderRadius,
    required this.padding,
    required this.iconSize,
    required this.badgeFontSize,
  });
}

class _GeometricPatternPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.white.withOpacity(0.05)
      ..strokeWidth = 1.0
      ..style = PaintingStyle.stroke;

    // Dessiner des lignes diagonales
    for (int i = 0; i < 10; i++) {
      final y = (size.height / 10) * i;
      canvas.drawLine(
        Offset(0, y),
        Offset(size.width, y + size.height * 0.2),
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
