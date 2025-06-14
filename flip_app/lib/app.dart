import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import 'core/navigation/app_router.dart';
import 'core/provider/index.dart';
import 'core/services/init_service.dart';
import 'core/widgets/loading_screen.dart';
import 'features/auth/presentation/view_models/auth_provider.dart';
import 'features/auth/data/models/auth_models.dart' show AuthStatus;

class FlipApp extends ConsumerStatefulWidget {
  const FlipApp({super.key});

  @override
  ConsumerState<FlipApp> createState() => _FlipAppState();
}

class _FlipAppState extends ConsumerState<FlipApp> {
  bool _isInitializing = true;
  String? _initError;

  @override
  void initState() {
    super.initState();
    // Utiliser addPostFrameCallback pour éviter les conflits de cycle de vie
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _initializeApp();
    });
  }

  Future<void> _initializeApp() async {
    try {
      // Initialiser l'application via le service d'init
      await ref.read(initServiceProvider).initializeApp(ref);

      if (mounted) {
        setState(() {
          _isInitializing = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _isInitializing = false;
          _initError = e.toString();
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    // Configuration du thème ForUI
    final theme = FThemes.zinc.dark;

    return MaterialApp(
      title: 'Flip App',
      debugShowCheckedModeBanner: false,

      // Configuration ForUI
      localizationsDelegates: FLocalizations.localizationsDelegates,
      supportedLocales: FLocalizations.supportedLocales,
      builder: (context, child) => FTheme(data: theme, child: child!),
      theme: theme.toApproximateMaterialTheme(),

      home: _buildHome(),
    );
  }

  Widget _buildHome() {
    // Écran de chargement pendant l'initialisation
    if (_isInitializing) {
      return const LoadingScreen(
        message: 'Initialisation de l\'application...',
      );
    }

    // Écran d'erreur si l'initialisation a échoué
    if (_initError != null) {
      return _buildErrorScreen();
    }

    // Application initialisée - utiliser le router normal
    return _FlipAppContent();
  }

  Widget _buildErrorScreen() {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.error_outline,
                size: 64,
                color: Theme.of(context).colorScheme.error,
              ),
              const SizedBox(height: 24),
              Text(
                'Erreur d\'initialisation',
                style: Theme.of(context).textTheme.headlineSmall,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              Text(
                _initError!,
                style: Theme.of(context).textTheme.bodyMedium,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    _isInitializing = true;
                    _initError = null;
                  });
                  _initializeApp();
                },
                child: const Text('Réessayer'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _FlipAppContent extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Observer la synchronisation user/auth
    ref.watch(userSyncProvider);

    // Vérifier l'état de l'application
    final appState = ref.watch(appProvider);
    final authState = ref.watch(authProvider);
    final isAppReady = ref.watch(isAppReadyProvider);

    // Si l'app n'est pas prête
    if (!isAppReady) {
      return LoadingScreen(
        message: _getLoadingMessage(appState.status, authState.status),
      );
    }

    // Application prête - utiliser le router
    final router = ref.watch(routerProvider);
    return MaterialApp.router(
      title: 'Flip App',
      debugShowCheckedModeBanner: false,
      routerConfig: router,
    );
  }

  String _getLoadingMessage(AppStatus appStatus, AuthStatus authStatus) {
    switch (appStatus) {
      case AppStatus.initializing:
        return 'Initialisation...';
      case AppStatus.error:
        return 'Erreur d\'initialisation';
      case AppStatus.maintenance:
        return 'Maintenance en cours';
      case AppStatus.ready:
        switch (authStatus) {
          case AuthStatus.loading:
            return 'Vérification de l\'authentification...';
          case AuthStatus.initial:
            return 'Préparation...';
          default:
            return 'Chargement...';
        }
    }
  }
}
