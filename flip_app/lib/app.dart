import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import 'core/navigation/app_router.dart';

class FlipApp extends ConsumerWidget {
  const FlipApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);
    
    // Configuration du thème ForUI
    final theme = FThemes.zinc.dark;

    return MaterialApp.router(
      title: 'Flip App',
      debugShowCheckedModeBanner: false,
      
      // Configuration ForUI
      localizationsDelegates: FLocalizations.localizationsDelegates,
      supportedLocales: FLocalizations.supportedLocales,
      builder: (context, child) => FTheme(data: theme, child: child!),
      theme: theme.toApproximateMaterialTheme(),
      
      // Configuration du router
      routerConfig: router,
    );
  }
} 