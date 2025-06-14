import 'package:flutter/material.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'dart:math' as math;

/// Types d'animations disponibles pour les packs
enum PackAnimationType {
  slide, // Glissement depuis le bas
  scale, // Effet de scale
  fade, // Fondu
  bounce, // Rebond
  staggered, // Animation échelonnée
  glow, // Effet de brillance
  shake, // Secousse
}

/// Configuration pour les animations de pack
class PackAnimationConfig {
  final Duration duration;
  final Duration delay;
  final Curve curve;
  final bool autoStart;

  const PackAnimationConfig({
    this.duration = const Duration(milliseconds: 600),
    this.delay = Duration.zero,
    this.curve = Curves.easeOutBack,
    this.autoStart = true,
  });

  static const quick = PackAnimationConfig(
    duration: Duration(milliseconds: 300),
    curve: Curves.easeOut,
  );

  static const smooth = PackAnimationConfig(
    duration: Duration(milliseconds: 600),
    curve: Curves.easeOutBack,
  );

  static const dramatic = PackAnimationConfig(
    duration: Duration(milliseconds: 1000),
    curve: Curves.elasticOut,
  );
}

/// Widget pour animer l'apparition d'un pack dans une grille
class AnimatedPackCard extends StatefulWidget {
  final Widget child;
  final int index;
  final PackAnimationType animationType;
  final PackAnimationConfig config;
  final bool enabled;

  const AnimatedPackCard({
    super.key,
    required this.child,
    this.index = 0,
    this.animationType = PackAnimationType.staggered,
    this.config = const PackAnimationConfig(),
    this.enabled = true,
  });

  @override
  State<AnimatedPackCard> createState() => _AnimatedPackCardState();
}

class _AnimatedPackCardState extends State<AnimatedPackCard>
    with TickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _scaleAnimation;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();

    if (!widget.enabled) return;

    _controller = AnimationController(
      duration: widget.config.duration,
      vsync: this,
    );

    _setupAnimations();

    if (widget.config.autoStart) {
      _startAnimation();
    }
  }

  void _setupAnimations() {
    _animation = CurvedAnimation(
      parent: _controller,
      curve: widget.config.curve,
    );

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.5),
      end: Offset.zero,
    ).animate(_animation);

    _scaleAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(_animation);

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(_animation);
  }

  void _startAnimation() {
    final delay =
        widget.config.delay + Duration(milliseconds: widget.index * 100);

    Future.delayed(delay, () {
      if (mounted) {
        _controller.forward();
      }
    });
  }

  @override
  void dispose() {
    if (widget.enabled) {
      _controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.enabled) {
      return widget.child;
    }

    return AnimationConfiguration.staggeredGrid(
      position: widget.index,
      columnCount: 2,
      duration: widget.config.duration,
      child: _buildAnimatedChild(),
    );
  }

  Widget _buildAnimatedChild() {
    switch (widget.animationType) {
      case PackAnimationType.slide:
        return SlideAnimation(
          verticalOffset: 50.0,
          child: FadeInAnimation(child: widget.child),
        );
      case PackAnimationType.scale:
        return ScaleAnimation(child: widget.child);
      case PackAnimationType.fade:
        return FadeInAnimation(child: widget.child);
      case PackAnimationType.bounce:
        return AnimatedBuilder(
          animation: _scaleAnimation,
          builder: (context, child) {
            return Transform.scale(
              scale: _scaleAnimation.value,
              child: widget.child,
            );
          },
        );
      case PackAnimationType.staggered:
        return ScaleAnimation(child: FadeInAnimation(child: widget.child));
      case PackAnimationType.glow:
        return _buildGlowAnimation();
      case PackAnimationType.shake:
        return _buildShakeAnimation();
    }
  }

  Widget _buildGlowAnimation() {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: Colors.amber.withOpacity(_animation.value * 0.6),
                blurRadius: 20 * _animation.value,
                spreadRadius: 5 * _animation.value,
              ),
            ],
          ),
          child: widget.child,
        );
      },
    );
  }

  Widget _buildShakeAnimation() {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final shakeValue = math.sin(_controller.value * math.pi * 8) * 2;
        return Transform.translate(
          offset: Offset(shakeValue, 0),
          child: widget.child,
        );
      },
    );
  }
}

/// Widget pour animer les interactions avec les packs (hover, tap)
class InteractivePackCard extends StatefulWidget {
  final Widget child;
  final VoidCallback? onTap;
  final VoidCallback? onLongPress;
  final bool enableHoverEffect;
  final bool enableTapEffect;

  const InteractivePackCard({
    super.key,
    required this.child,
    this.onTap,
    this.onLongPress,
    this.enableHoverEffect = true,
    this.enableTapEffect = true,
  });

  @override
  State<InteractivePackCard> createState() => _InteractivePackCardState();
}

class _InteractivePackCardState extends State<InteractivePackCard>
    with TickerProviderStateMixin {
  late AnimationController _hoverController;
  late AnimationController _tapController;
  late Animation<double> _hoverScale;
  late Animation<double> _hoverElevation;
  late Animation<double> _tapScale;

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

    _hoverScale = Tween<double>(
      begin: 1.0,
      end: 1.05,
    ).animate(CurvedAnimation(parent: _hoverController, curve: Curves.easeOut));

    _hoverElevation = Tween<double>(
      begin: 0.0,
      end: 8.0,
    ).animate(_hoverController);

    _tapScale = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(parent: _tapController, curve: Curves.easeOut));
  }

  @override
  void dispose() {
    _hoverController.dispose();
    _tapController.dispose();
    super.dispose();
  }

  void _onHover(bool isHovered) {
    if (!widget.enableHoverEffect) return;

    setState(() {
      _isHovered = isHovered;
    });

    if (isHovered) {
      _hoverController.forward();
    } else {
      _hoverController.reverse();
    }
  }

  void _onTapDown() {
    if (!widget.enableTapEffect) return;
    _tapController.forward();
  }

  void _onTapUp() {
    if (!widget.enableTapEffect) return;
    _tapController.reverse();
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => _onHover(true),
      onExit: (_) => _onHover(false),
      child: GestureDetector(
        onTap: widget.onTap,
        onLongPress: widget.onLongPress,
        onTapDown: (_) => _onTapDown(),
        onTapUp: (_) => _onTapUp(),
        onTapCancel: () => _onTapUp(),
        child: AnimatedBuilder(
          animation: Listenable.merge([_hoverController, _tapController]),
          builder: (context, child) {
            return Transform.scale(
              scale: _hoverScale.value * _tapScale.value,
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: widget.enableHoverEffect
                      ? [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.1),
                            blurRadius: _hoverElevation.value,
                            offset: Offset(0, _hoverElevation.value / 2),
                          ),
                        ]
                      : null,
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

/// Widget pour animer l'ouverture d'un pack
class PackOpeningAnimation extends StatefulWidget {
  final Widget child;
  final bool isOpening;
  final VoidCallback? onAnimationComplete;

  const PackOpeningAnimation({
    super.key,
    required this.child,
    this.isOpening = false,
    this.onAnimationComplete,
  });

  @override
  State<PackOpeningAnimation> createState() => _PackOpeningAnimationState();
}

class _PackOpeningAnimationState extends State<PackOpeningAnimation>
    with TickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _rotationAnimation;
  late Animation<double> _scaleAnimation;
  late Animation<double> _glowAnimation;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _rotationAnimation = Tween<double>(begin: 0.0, end: math.pi * 2).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.0, 0.6, curve: Curves.easeInOut),
      ),
    );

    _scaleAnimation = Tween<double>(begin: 1.0, end: 1.2).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.0, 0.3, curve: Curves.easeOut),
      ),
    );

    _glowAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.6, 1.0, curve: Curves.easeOut),
      ),
    );

    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        widget.onAnimationComplete?.call();
      }
    });
  }

  @override
  void didUpdateWidget(PackOpeningAnimation oldWidget) {
    super.didUpdateWidget(oldWidget);

    if (widget.isOpening && !oldWidget.isOpening) {
      _controller.forward();
    } else if (!widget.isOpening && oldWidget.isOpening) {
      _controller.reset();
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
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: Transform.rotate(
            angle: _rotationAnimation.value,
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.amber.withOpacity(_glowAnimation.value * 0.8),
                    blurRadius: 30 * _glowAnimation.value,
                    spreadRadius: 10 * _glowAnimation.value,
                  ),
                ],
              ),
              child: widget.child,
            ),
          ),
        );
      },
    );
  }
}

/// Widget wrapper qui combine toutes les animations pour un pack
class AnimatedPack extends StatelessWidget {
  final Widget child;
  final int index;
  final PackAnimationType entranceAnimation;
  final PackAnimationConfig config;
  final VoidCallback? onTap;
  final VoidCallback? onLongPress;
  final bool enableInteractions;
  final bool enabled;

  const AnimatedPack({
    super.key,
    required this.child,
    this.index = 0,
    this.entranceAnimation = PackAnimationType.staggered,
    this.config = const PackAnimationConfig(),
    this.onTap,
    this.onLongPress,
    this.enableInteractions = true,
    this.enabled = true,
  });

  @override
  Widget build(BuildContext context) {
    Widget animatedChild = child;

    // Animation d'entrée
    animatedChild = AnimatedPackCard(
      index: index,
      animationType: entranceAnimation,
      config: config,
      enabled: enabled,
      child: animatedChild,
    );

    // Interactions
    if (enableInteractions) {
      animatedChild = InteractivePackCard(
        onTap: onTap,
        onLongPress: onLongPress,
        child: animatedChild,
      );
    }

    return animatedChild;
  }
}
