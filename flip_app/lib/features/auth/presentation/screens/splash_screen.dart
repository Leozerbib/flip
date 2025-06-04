import 'package:flip_app/core/theme/theme_manager.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import '../view_models/auth_provider.dart';
import '../../data/models/auth_models.dart';

class SplashScreen extends ConsumerWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
    final themeManager = ref.watch(themeManagerProvider);

    return FScaffold(
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Logo de l'application
            Image.asset('asset/logo/logo.png', width: 180),

            const SizedBox(height: 32),

            // Indicateur de chargement
            if (authState.status == AuthStatus.loading ||
                authState.status == AuthStatus.initial) ...[
              CircularProgressIndicator(
                color: themeManager.currentTheme.colors.primary,
                strokeWidth: 2,
                
              ),
            ] else if (authState.status == AuthStatus.error) ...[
              Icon(
                Icons.error,
                size: 48,
                color: themeManager.currentTheme.colors.destructive,
              ),
              const SizedBox(height: 16),
              Text(
                authState.error ?? 'Une erreur est survenue',
                textAlign: TextAlign.center,
                style: themeManager.currentTheme.typography.base.copyWith(
                  color: themeManager.currentTheme.colors.destructive,
                ),
              ),
              const SizedBox(height: 16),
              FButton(
                onPress: () => ref.read(authProvider.notifier).refresh(),
                child: Text(
                  'Réessayer',
                  style: themeManager.currentTheme.typography.base.copyWith(
                    color: themeManager.currentTheme.colors.destructive,
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
