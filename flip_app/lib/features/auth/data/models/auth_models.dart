import 'package:equatable/equatable.dart';
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
    return AuthResponse(
      accessToken: json['access_token'] as String,
      refreshToken: json['refresh_token'] as String,
      user: UserModel.fromJson(json['user'] as Map<String, dynamic>),
      expiresIn: json['expires_in'] as int,
    );
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
  final String? firstName;
  final String? lastName;

  const RegisterRequest({
    required this.email,
    required this.password,
    this.firstName,
    this.lastName,
  });

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'password': password,
      if (firstName != null) 'firstName': firstName,
      if (lastName != null) 'lastName': lastName,
    };
  }

  @override
  List<Object?> get props => [email, password, firstName, lastName];
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