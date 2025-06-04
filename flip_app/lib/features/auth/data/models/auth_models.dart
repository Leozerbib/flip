
import 'package:equatable/equatable.dart';
import 'package:flip_app/core/utils/logger.dart';
import '../../../../data/models/user_model.dart';

// Réponse d'authentification
class AuthResponse extends Equatable {
  final String accessToken;
  final String refreshToken;
  final UserModel user;
  final int expiresIn;

  const AuthResponse({
    required this.accessToken,
    required this.refreshToken,
    required this.user,
    required this.expiresIn,
  });

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    try {
      UserModel user = UserModel.fromJson(json['user'] as Map<String, dynamic>);
      AuthResponse response = AuthResponse(
        accessToken: json['access_token'] as String,
        refreshToken: json['refresh_token'] as String,
        user: user,
        expiresIn: int.parse(json['expires_in']),
      );
      AppLogger.debug('User ${response.user.toJson()}:${response.user.username} is logged in');
      return response;
    } catch (e) {
      AppLogger.error('Error: $e');
      throw Exception(e);
    }
  }

  @override
  String toString() {
    return 'AuthResponse(accessToken: $accessToken, refreshToken: $refreshToken, user: $user)';
  }

  @override
  List<Object?> get props => [accessToken, refreshToken, user, expiresIn];
}

// Réponse de refresh token
class RefreshTokenResponse extends Equatable {
  final String accessToken;
  final int expiresIn;

  const RefreshTokenResponse({
    required this.accessToken,
    required this.expiresIn,
  });

  factory RefreshTokenResponse.fromJson(Map<String, dynamic> json) {
    return RefreshTokenResponse(
      accessToken: json['access_token'] as String,
      expiresIn: json['expires_in'] as int,
    );
  }

  @override
  List<Object?> get props => [accessToken, expiresIn];
}

// Requête de connexion
class LoginRequest extends Equatable {
  final String email;
  final String password;

  const LoginRequest({
    required this.email,
    required this.password,
  });

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'password': password,
    };
  }

  @override
  List<Object?> get props => [email, password];
}

// Requête d'inscription
class RegisterRequest extends Equatable {
  final String email;
  final String password;
  final String username;

  const RegisterRequest({
    required this.email,
    required this.password,
    required this.username,
  });

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'password': password,
      'username': username,
    };
  }

  @override
  List<Object?> get props => [email, password, username];
}

// État d'authentification
enum AuthStatus {
  initial,
  loading,
  authenticated,
  unauthenticated,
  error,
}

class AuthState extends Equatable {
  final AuthStatus status;
  final UserModel? user;
  final String? error;

  const AuthState({
    this.status = AuthStatus.initial,
    this.user,
    this.error,
  });

  AuthState copyWith({
    AuthStatus? status,
    UserModel? user,
    String? error,
  }) {
    return AuthState(
      status: status ?? this.status,
      user: user ?? this.user,
      error: error ?? this.error,
    );
  }

  @override
  List<Object?> get props => [status, user, error];
} 