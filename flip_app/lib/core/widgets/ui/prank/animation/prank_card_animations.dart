import 'package:flutter/material.dart';

/// Widget d'animation pour l'apparition des cartes prank
class PrankCardSlideAnimation extends StatefulWidget {
  final Widget child;
  final int index;
  final Duration delay;
  final Duration duration;

  const PrankCardSlideAnimation({
    super.key,
    required this.child,
    this.index = 0,
    this.delay = const Duration(milliseconds: 100),
    this.duration = const Duration(milliseconds: 600),
  });

  @override
  State<PrankCardSlideAnimation> createState() =>
      _PrankCardSlideAnimationState();
}

class _PrankCardSlideAnimationState extends State<PrankCardSlideAnimation>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _fadeAnimation;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(duration: widget.duration, vsync: this);

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.5),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic));

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.0, 0.8, curve: Curves.easeOut),
      ),
    );

    _scaleAnimation = Tween<double>(
      begin: 0.8,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.elasticOut));

    // Démarrer l'animation avec un délai basé sur l'index
    Future.delayed(
      Duration(milliseconds: widget.index * widget.delay.inMilliseconds),
      () {
        if (mounted) {
          _controller.forward();
        }
      },
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: SlideTransition(
            position: _slideAnimation,
            child: FadeTransition(opacity: _fadeAnimation, child: widget.child),
          ),
        );
      },
    );
  }
}

/// Widget d'animation pour le survol/tap des cartes
class PrankCardHoverAnimation extends StatefulWidget {
  final Widget child;
  final VoidCallback? onTap;
  final bool enableHover;

  const PrankCardHoverAnimation({
    super.key,
    required this.child,
    this.onTap,
    this.enableHover = true,
  });

  @override
  State<PrankCardHoverAnimation> createState() =>
      _PrankCardHoverAnimationState();
}

class _PrankCardHoverAnimationState extends State<PrankCardHoverAnimation>
    with TickerProviderStateMixin {
  late AnimationController _hoverController;
  late AnimationController _tapController;
  late Animation<double> _hoverScaleAnimation;
  late Animation<double> _hoverElevationAnimation;
  late Animation<double> _tapScaleAnimation;

  bool _isHovered = false;

  @override
  void initState() {
    super.initState();

    _hoverController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );

    _tapController = AnimationController(
      duration: const Duration(milliseconds: 100),
      vsync: this,
    );

    _hoverScaleAnimation = Tween<double>(begin: 1.0, end: 1.05).animate(
      CurvedAnimation(parent: _hoverController, curve: Curves.easeOutCubic),
    );

    _hoverElevationAnimation = Tween<double>(begin: 4.0, end: 12.0).animate(
      CurvedAnimation(parent: _hoverController, curve: Curves.easeOutCubic),
    );

    _tapScaleAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(parent: _tapController, curve: Curves.easeInOut));
  }

  @override
  void dispose() {
    _hoverController.dispose();
    _tapController.dispose();
    super.dispose();
  }

  void _onHoverStart() {
    if (!widget.enableHover) return;
    setState(() => _isHovered = true);
    _hoverController.forward();
  }

  void _onHoverEnd() {
    if (!widget.enableHover) return;
    setState(() => _isHovered = false);
    _hoverController.reverse();
  }

  void _onTapDown() {
    _tapController.forward();
  }

  void _onTapUp() {
    _tapController.reverse();
    widget.onTap?.call();
  }

  void _onTapCancel() {
    _tapController.reverse();
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => _onHoverStart(),
      onExit: (_) => _onHoverEnd(),
      child: GestureDetector(
        onTapDown: (_) => _onTapDown(),
        onTapUp: (_) => _onTapUp(),
        onTapCancel: _onTapCancel,
        child: AnimatedBuilder(
          animation: Listenable.merge([_hoverController, _tapController]),
          builder: (context, child) {
            return Transform.scale(
              scale: _hoverScaleAnimation.value * _tapScaleAnimation.value,
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.1),
                      blurRadius: _hoverElevationAnimation.value,
                      offset: Offset(0, _hoverElevationAnimation.value / 2),
                    ),
                  ],
                ),
                child: widget.child,
              ),
            );
          },
        ),
      ),
    );
  }
}

/// Widget d'animation pour les transitions entre les vues
class PrankCardTransitionAnimation extends StatefulWidget {
  final Widget child;
  final bool show;
  final Duration duration;

  const PrankCardTransitionAnimation({
    super.key,
    required this.child,
    this.show = true,
    this.duration = const Duration(milliseconds: 300),
  });

  @override
  State<PrankCardTransitionAnimation> createState() =>
      _PrankCardTransitionAnimationState();
}

class _PrankCardTransitionAnimationState
    extends State<PrankCardTransitionAnimation>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(duration: widget.duration, vsync: this);

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.3),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic));

    if (widget.show) {
      _controller.forward();
    }
  }

  @override
  void didUpdateWidget(PrankCardTransitionAnimation oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.show != oldWidget.show) {
      if (widget.show) {
        _controller.forward();
      } else {
        _controller.reverse();
      }
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return SlideTransition(
          position: _slideAnimation,
          child: FadeTransition(opacity: _fadeAnimation, child: widget.child),
        );
      },
    );
  }
}

/// Widget d'animation pour l'effet de rareté (brillance)
class PrankCardRarityGlow extends StatefulWidget {
  final Widget child;
  final Color glowColor;
  final bool isAnimated;

  const PrankCardRarityGlow({
    super.key,
    required this.child,
    required this.glowColor,
    this.isAnimated = true,
  });

  @override
  State<PrankCardRarityGlow> createState() => _PrankCardRarityGlowState();
}

class _PrankCardRarityGlowState extends State<PrankCardRarityGlow>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _glowAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );

    _glowAnimation = Tween<double>(
      begin: 0.3,
      end: 0.8,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));

    if (widget.isAnimated) {
      _controller.repeat(reverse: true);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.isAnimated) {
      return widget.child;
    }

    return AnimatedBuilder(
      animation: _glowAnimation,
      builder: (context, child) {
        return Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: widget.glowColor.withOpacity(_glowAnimation.value * 0.5),
                blurRadius: 20,
                spreadRadius: 2,
              ),
            ],
          ),
          child: widget.child,
        );
      },
    );
  }
}

/// Wrapper pour combiner toutes les animations
class AnimatedPrankCard extends StatelessWidget {
  final Widget child;
  final int index;
  final VoidCallback? onTap;
  final Color? rarityColor;
  final bool enableHover;
  final bool enableRarityGlow;

  const AnimatedPrankCard({
    super.key,
    required this.child,
    this.index = 0,
    this.onTap,
    this.rarityColor,
    this.enableHover = true,
    this.enableRarityGlow = false,
  });

  @override
  Widget build(BuildContext context) {
    Widget animatedChild = child;

    // Animation d'apparition
    animatedChild = PrankCardSlideAnimation(index: index, child: animatedChild);

    // Animation de survol
    if (enableHover) {
      animatedChild = PrankCardHoverAnimation(
        onTap: onTap,
        enableHover: enableHover,
        child: animatedChild,
      );
    }

    // Effet de rareté
    if (enableRarityGlow && rarityColor != null) {
      animatedChild = PrankCardRarityGlow(
        glowColor: rarityColor!,
        isAnimated: true,
        child: animatedChild,
      );
    }

    return animatedChild;
  }
}
