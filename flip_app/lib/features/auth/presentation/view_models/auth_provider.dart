import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/auth/auth_repository.dart';
import '../../../../core/auth/auth_service.dart';
import '../../data/models/auth_models.dart';

// Provider pour le repository d'authentification
final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepository();
});

// Provider pour l'état d'authentification
final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  final authRepository = ref.watch(authRepositoryProvider);
  return AuthNotifier(authRepository);
});

class AuthNotifier extends StateNotifier<AuthState> {
  final AuthRepository _authRepository;

  AuthNotifier(this._authRepository) : super(const AuthState()) {
    _checkInitialAuthState();
  }

  // Vérifier l'état d'authentification initial
  Future<void> _checkInitialAuthState() async {
    state = state.copyWith(status: AuthStatus.loading);
    
    try {
      final isLoggedIn = await _authRepository.checkAuthStatus();
      
      if (isLoggedIn) {
        final user = await _authRepository.getCurrentUser();
        if (user != null) {
          state = state.copyWith(
            status: AuthStatus.authenticated,
            user: user,
          );
        } else {
          state = state.copyWith(status: AuthStatus.unauthenticated);
        }
      } else {
        state = state.copyWith(status: AuthStatus.unauthenticated);
      }
    } catch (e) {
      state = state.copyWith(
        status: AuthStatus.unauthenticated,
        error: e.toString(),
      );
    }
  }

  // Connexion avec email/password
  Future<void> login(String email, String password) async {
    state = state.copyWith(status: AuthStatus.loading, error: null);
    
    try {
      final request = LoginRequest(email: email, password: password);
      final response = await _authRepository.login(request);
      
      // Sauvegarder la session
      await AuthService.saveSession(
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: response.user,
      );
      
      state = state.copyWith(
        status: AuthStatus.authenticated,
        user: response.user,
      );
    } catch (e) {
      state = state.copyWith(
        status: AuthStatus.error,
        error: e.toString(),
      );
    }
  }

  // Inscription avec email/password
  Future<void> register(String email, String password, {String? firstName, String? lastName}) async {
    state = state.copyWith(status: AuthStatus.loading, error: null);
    
    try {
      final request = RegisterRequest(
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      );
      final response = await _authRepository.register(request);
      
      // Sauvegarder la session
      await AuthService.saveSession(
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: response.user,
      );
      
      state = state.copyWith(
        status: AuthStatus.authenticated,
        user: response.user,
      );
    } catch (e) {
      state = state.copyWith(
        status: AuthStatus.error,
        error: e.toString(),
      );
    }
  }

  // Connexion avec Google
  Future<void> loginWithGoogle() async {
    state = state.copyWith(status: AuthStatus.loading, error: null);
    
    try {
      final response = await _authRepository.loginWithGoogle();
      
      // Sauvegarder la session
      await AuthService.saveSession(
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: response.user,
      );
      
      state = state.copyWith(
        status: AuthStatus.authenticated,
        user: response.user,
      );
    } catch (e) {
      state = state.copyWith(
        status: AuthStatus.error,
        error: e.toString(),
      );
    }
  }

  // Déconnexion
  Future<void> logout() async {
    state = state.copyWith(status: AuthStatus.loading);
    
    try {
      await _authRepository.logout();
      state = state.copyWith(
        status: AuthStatus.unauthenticated,
        user: null,
        error: null,
      );
    } catch (e) {
      // Même en cas d'erreur, on considère l'utilisateur comme déconnecté
      state = state.copyWith(
        status: AuthStatus.unauthenticated,
        user: null,
        error: null,
      );
    }
  }

  // Effacer les erreurs
  void clearError() {
    state = state.copyWith(error: null);
  }

  // Rafraîchir l'état d'authentification
  Future<void> refresh() async {
    await _checkInitialAuthState();
  }
} 