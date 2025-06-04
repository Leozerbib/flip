import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import 'package:flip_app/core/theme/theme_manager.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeManager = ref.watch(themeManagerProvider);

    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            FIcons.zap,
            size: 64,
            color: themeManager.currentTheme.colors.primary,
          ),
          const SizedBox(height: 24),
          Text(
            'Bienvenue sur Flip',
            style: themeManager.currentTheme.typography.xl3,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 16),
          Text(
            'Votre application de flip favorite',
            style: themeManager.currentTheme.typography.base,
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
} 