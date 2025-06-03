import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/presentation/screens/login_screen.dart';
import '../../features/auth/presentation/screens/register_screen.dart';
import '../../features/auth/presentation/screens/splash_screen.dart';
import '../../features/auth/presentation/view_models/auth_provider.dart';
import '../../features/auth/data/models/auth_models.dart';
import '../../features/home/presentation/screens/home_screen.dart';

// Provider pour le router
final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authProvider);
  
  return GoRouter(
    initialLocation: '/splash',
    redirect: (context, state) {
      final isAuthenticated = authState.status == AuthStatus.authenticated;
      final isLoading = authState.status == AuthStatus.loading || authState.status == AuthStatus.initial;
      final isUnauthenticated = authState.status == AuthStatus.unauthenticated;
      
      // Pendant le chargement initial, aller au splash
      if (isLoading && state.matchedLocation != '/splash') {
        return '/splash';
      }
      
      // Si le chargement est terminé et on est sur le splash
      if (state.matchedLocation == '/splash' && !isLoading) {
        return isAuthenticated ? '/home' : '/login';
      }
      
      // Routes publiques
      final isPublicRoute = ['/login', '/register', '/splash'].contains(state.matchedLocation);
      
      // Si authentifié et sur une route publique, rediriger vers l'accueil
      if (isAuthenticated && ['/login', '/register'].contains(state.matchedLocation)) {
        return '/home';
      }
      
      // Si non authentifié et sur une route privée, rediriger vers la connexion
      if (isUnauthenticated && !isPublicRoute) {
        return '/login';
      }
      
      return null; // Pas de redirection nécessaire
    },
    routes: [
      // Écran de chargement initial
      GoRoute(
        path: '/splash',
        name: 'splash',
        builder: (context, state) => const SplashScreen(),
      ),
      
      // Routes d'authentification
      GoRoute(
        path: '/login',
        name: 'login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/register',
        name: 'register',
        builder: (context, state) => const RegisterScreen(),
      ),
      
      // Routes principales
      GoRoute(
        path: '/home',
        name: 'home',
        builder: (context, state) => const HomeScreen(),
      ),
      
      // Route par défaut - redirection
      GoRoute(
        path: '/',
        redirect: (context, state) => '/splash',
      ),
    ],
    
    // Gestion des erreurs
    errorBuilder: (context, state) => Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.error, size: 64, color: Colors.red),
            const SizedBox(height: 16),
            Text(
              'Page non trouvée',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 8),
            const Text('La page demandée n\'existe pas.'),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => context.go('/splash'),
              child: const Text('Retour à l\'accueil'),
            ),
          ],
        ),
      ),
    ),
  );
}); 