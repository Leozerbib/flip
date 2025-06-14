import 'package:flutter/material.dart';
import 'package:forui/forui.dart';

class AppButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final FBaseButtonStyle? style;
  final Widget? icon;
  final bool isLoading;
  final bool enabled;

  const AppButton({
    super.key,
    required this.text,
    this.onPressed,
    this.style,
    this.icon,
    this.isLoading = false,
    this.enabled = true,
  });

  @override
  Widget build(BuildContext context) {
    return FButton(
      onPress: enabled && !isLoading ? onPressed : null,
      style: style ?? FButtonStyle.primary,
      child: isLoading
          ? const SizedBox(
              width: 16,
              height: 16,
              child: CircularProgressIndicator(strokeWidth: 2),
            )
          : Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (icon != null) ...[icon!, const SizedBox(width: 8)],
                Text(text),
              ],
            ),
    );
  }
}

class IconAppButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback? onPressed;
  final FBaseButtonStyle style;
  final bool isLoading;
  final bool enabled;
  final double size;

  const IconAppButton({
    super.key,
    required this.icon,
    this.onPressed,
    this.style = FButtonStyle.secondary,
    this.isLoading = false,
    this.enabled = true,
    this.size = 16,
  });

  @override
  Widget build(BuildContext context) {
    return FButton(
      onPress: enabled && !isLoading ? onPressed : null,
      style: style,
      child: isLoading
          ? SizedBox(
              width: size,
              height: size,
              child: const CircularProgressIndicator(strokeWidth: 2),
            )
          : Icon(icon, size: size),
    );
  }
}
