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

    return FScaffold(
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Logo de l'application
            const Icon(
              FIcons.zap,
              size: 80,
            ),
            const SizedBox(height: 24),
            
            // Nom de l'application
            const Text(
              'Flip App',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 32),
            
            // Indicateur de chargement
            if (authState.status == AuthStatus.loading || authState.status == AuthStatus.initial) ...[
              const CircularProgressIndicator(),
              const SizedBox(height: 16),
              const Text('Chargement...'),
            ] else if (authState.status == AuthStatus.error) ...[
              const Icon(
                Icons.error,
                size: 48,
                color: Colors.red,
              ),
              const SizedBox(height: 16),
              Text(
                authState.error ?? 'Une erreur est survenue',
                textAlign: TextAlign.center,
                style: const TextStyle(color: Colors.red),
              ),
              const SizedBox(height: 16),
              FButton(
                onPress: () => ref.read(authProvider.notifier).refresh(),
                child: const Text('Réessayer'),
              ),
            ],
          ],
        ),
      ),
    );
  }
} 