import 'package:flutter/material.dart';
import 'package:forui/forui.dart';

// Enum pour les types d'alerte
enum AlertType { success, error, warning, info }

class GlobalAlert extends StatelessWidget {
  final AlertType type;
  final String title;
  final String? subtitle;
  final VoidCallback? onDismiss;
  final Widget? action;

  const GlobalAlert({
    super.key,
    required this.type,
    required this.title,
    this.subtitle,
    this.onDismiss,
    this.action,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Container(
      margin: const EdgeInsets.all(16),
      child: FAlert(
        style: _getAlertStyle(type),
        icon: Icon(_getIconData(type)),
        title: Text(title),
        subtitle: subtitle != null ? Text(subtitle!) : null,
      ),
    );
  }

  FBaseAlertStyle _getAlertStyle(AlertType type) {
    switch (type) {
      case AlertType.success:
        return FAlertStyle.primary;
      case AlertType.error:
        return FAlertStyle.destructive;
      case AlertType.warning:
        return FAlertStyle.primary; // Forui n'a pas de style warning par défaut
      case AlertType.info:
        return FAlertStyle.primary;
    }
  }

  IconData _getIconData(AlertType type) {
    switch (type) {
      case AlertType.success:
        return FIcons.check;
      case AlertType.error:
        return FIcons.x;
      case AlertType.warning:
        return FIcons.zap;
      case AlertType.info:
        return FIcons.info;
    }
  }
}

// Widget pour afficher des alertes temporaires
class TemporaryAlert extends StatefulWidget {
  final AlertType type;
  final String title;
  final String? subtitle;
  final Duration duration;
  final VoidCallback? onDismiss;

  const TemporaryAlert({
    super.key,
    required this.type,
    required this.title,
    this.subtitle,
    this.duration = const Duration(seconds: 4),
    this.onDismiss,
  });

  @override
  State<TemporaryAlert> createState() => _TemporaryAlertState();
}

class _TemporaryAlertState extends State<TemporaryAlert>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOut));

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, -1),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOut));

    // Démarrer l'animation d'entrée
    _controller.forward();

    // Programmer la disparition automatique
    Future.delayed(widget.duration, () {
      if (mounted) {
        _dismissAlert();
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _dismissAlert() async {
    await _controller.reverse();
    if (mounted) {
      widget.onDismiss?.call();
    }
  }

  @override
  Widget build(BuildContext context) {
    return SlideTransition(
      position: _slideAnimation,
      child: FadeTransition(
        opacity: _fadeAnimation,
        child: GlobalAlert(
          type: widget.type,
          title: widget.title,
          subtitle: widget.subtitle,
          onDismiss: _dismissAlert,
        ),
      ),
    );
  }
}

// Service pour afficher des alertes globales
class AlertService {
  static OverlayEntry? _currentOverlay;

  static void showAlert(
    BuildContext context, {
    required AlertType type,
    required String title,
    String? subtitle,
    Duration duration = const Duration(seconds: 4),
  }) {
    // Supprimer l'alerte actuelle si elle existe
    _currentOverlay?.remove();

    // Créer une nouvelle alerte
    _currentOverlay = OverlayEntry(
      builder: (context) => Positioned(
        top: MediaQuery.of(context).viewPadding.top + 16,
        left: 0,
        right: 0,
        child: Material(
          type: MaterialType.transparency,
          child: TemporaryAlert(
            type: type,
            title: title,
            subtitle: subtitle,
            duration: duration,
            onDismiss: () {
              _currentOverlay?.remove();
              _currentOverlay = null;
            },
          ),
        ),
      ),
    );

    // Afficher l'alerte
    Overlay.of(context).insert(_currentOverlay!);
  }

  static void showSuccess(
    BuildContext context, {
    required String title,
    String? subtitle,
    Duration duration = const Duration(seconds: 3),
  }) {
    showAlert(
      context,
      type: AlertType.success,
      title: title,
      subtitle: subtitle,
      duration: duration,
    );
  }

  static void showError(
    BuildContext context, {
    required String title,
    String? subtitle,
    Duration duration = const Duration(seconds: 5),
  }) {
    showAlert(
      context,
      type: AlertType.error,
      title: title,
      subtitle: subtitle,
      duration: duration,
    );
  }

  static void showWarning(
    BuildContext context, {
    required String title,
    String? subtitle,
    Duration duration = const Duration(seconds: 4),
  }) {
    showAlert(
      context,
      type: AlertType.warning,
      title: title,
      subtitle: subtitle,
      duration: duration,
    );
  }

  static void showInfo(
    BuildContext context, {
    required String title,
    String? subtitle,
    Duration duration = const Duration(seconds: 4),
  }) {
    showAlert(
      context,
      type: AlertType.info,
      title: title,
      subtitle: subtitle,
      duration: duration,
    );
  }

  static void dismiss() {
    _currentOverlay?.remove();
    _currentOverlay = null;
  }
}
