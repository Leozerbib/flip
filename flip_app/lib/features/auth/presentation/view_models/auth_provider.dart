import 'dart:developer';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/auth/auth_repository.dart';
import '../../../../core/auth/auth_service.dart';
import '../../../../data/models/user_model.dart';
import '../../data/models/auth_models.dart';

// Provider pour le repository d'authentification
final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepository();
});

// Provider pour l'état d'authentification
final authProvider = StateNotifierProvider<AuthStateNotifier, AuthState>((ref) {
  final authRepository = ref.watch(authRepositoryProvider);
  return AuthStateNotifier(authRepository);
});

class AuthState {
  final AuthStatus status;
  final UserModel? user;
  final String? accessToken;
  final String? refreshToken;
  final String? error;

  AuthState({
    this.status = AuthStatus.initial,
    this.user,
    this.accessToken,
    this.refreshToken,
    this.error,
  });

  AuthState copyWith({
    AuthStatus? status,
    UserModel? user,
    String? accessToken,
    String? refreshToken,
    String? error,
    bool clearError = false,
  }) {
    return AuthState(
      status: status ?? this.status,
      user: user ?? this.user,
      accessToken: accessToken ?? this.accessToken,
      refreshToken: refreshToken ?? this.refreshToken,
      error: clearError ? null : error ?? this.error,
    );
  }
}

class AuthStateNotifier extends StateNotifier<AuthState> {
  final AuthRepository _authRepository;

  AuthStateNotifier(this._authRepository) : super(AuthState()) {
    _checkInitialAuthStatus();
  }

  // Vérifier l'état d'authentification initial
  Future<void> _checkInitialAuthStatus() async {
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
      log('Response: $response');
      log('Access Token: ${response.accessToken}');
      log('Refresh Token: ${response.refreshToken}');
      log('User: ${response.user}');
      log('Expires In: ${response.expiresIn}');
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
  Future<void> register(String email, String password, String username) async {
    state = state.copyWith(status: AuthStatus.loading, error: null);
    
    try {
      final request = RegisterRequest(
        email: email,
        password: password,
        username: username,
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
      // La nouvelle implémentation retourne directement une AuthResponse
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
    await _checkInitialAuthStatus();
  }
} 