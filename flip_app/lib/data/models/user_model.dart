import 'package:equatable/equatable.dart';

class UserModel extends Equatable {
  final String id;
  final String? email;
  final String username;
  final String? profilePicture;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  const UserModel({
    required this.id,
    this.email,
    required this.username,
    this.profilePicture,
    this.createdAt,
    this.updatedAt,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'].toString(),
      email: json['email'] as String?,
      username: json['username'] as String,
      profilePicture: json['profilePicture'] as String?,
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt'] as String) : null,
      updatedAt: json['updatedAt'] != null ? DateTime.parse(json['updatedAt'] as String) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'username': username,
      'profilePicture': profilePicture,
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }

  String get displayName {
    if (username.isNotEmpty) {
      return username;
    }
    return email ?? '';
  }

  @override
  List<Object?> get props => [
        id,
        email,
        username,
        profilePicture,
        createdAt,
        updatedAt,
      ];

  UserModel copyWith({
    String? id,
    String? email,
    String? username,
    String? profilePicture,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return UserModel(
      id: id ?? this.id,
      email: email ?? this.email,
      username: username ?? this.username,
      profilePicture: profilePicture ?? this.profilePicture,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
} 