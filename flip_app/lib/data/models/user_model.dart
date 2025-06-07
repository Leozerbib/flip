import 'dart:developer';

import 'package:equatable/equatable.dart';

class UserModel extends Equatable {
  final int userId;
  final String? email;
  final String username;
  final String? profilePictureUrl;
  final int? level;
  final int? xpPoints;
  final int? gameCoins;
  final DateTime? createdAt;
  final DateTime? updatedAt;
  final String? friendshipStatus;

  const UserModel({
    required this.userId,
    this.email,
    required this.username,
    this.profilePictureUrl,
    this.level,
    this.xpPoints,
    this.gameCoins,
    this.createdAt,
    this.updatedAt,
    this.friendshipStatus,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    var id = 0;
    if (json['user_id'] != null) {
      id = int.parse(json['user_id'].toString());
    } else if (json['id'] != null) {
      id = int.parse(json['id'].toString());
    }
    try {
      return UserModel(
        userId: id,
        email: json['email'] as String?,
        username: json['username'] as String,
        profilePictureUrl:
            json['profile_picture_url'].toString().startsWith(
              'https://i.pravatar.cc/',
            )
            ? '${json['profile_picture_url'] as String?}?u=${json['username'] as String}'
            : json['profile_picture_url'] as String?,
        level: json['level'] != null
            ? int.parse(json['level'].toString())
            : null,
        xpPoints: json['xp_points'] != null
            ? int.parse(json['xp_points'].toString())
            : null,
        gameCoins: json['game_coins'] != null
            ? int.parse(json['game_coins'].toString())
            : null,
        createdAt: json['created_at'] != null
            ? DateTime.parse(json['created_at'] as String)
            : DateTime.now(),
        updatedAt: json['updated_at'] != null
            ? DateTime.parse(json['updated_at'] as String)
            : null,
        friendshipStatus: json['friendship_status'] as String? ?? null,
      );
    } catch (e) {
      log('Error: $e');
      throw Exception(e);
    }
  }

  Map<String, dynamic> toJson() {
    return {
      'user_id': userId,
      'email': email,
      'username': username,
      'profile_picture_url': profilePictureUrl,
      'level': level,
      'xp_points': xpPoints,
      'game_coins': gameCoins,
      'created_at': createdAt?.toIso8601String(),
      'updated_at': updatedAt?.toIso8601String(),
    };
  }

  String get displayName {
    if (username.isNotEmpty) {
      return username;
    }
    return email ?? '';
  }

  // Rétrocompatibilité avec l'ancien modèle
  String get id => userId.toString();
  String? get profilePicture => profilePictureUrl;

  @override
  List<Object?> get props => [
    userId,
    email,
    username,
    profilePictureUrl,
    level,
    xpPoints,
    gameCoins,
    createdAt,
    updatedAt,
  ];

  UserModel copyWith({
    int? userId,
    String? email,
    String? username,
    String? profilePictureUrl,
    int? level,
    int? xpPoints,
    int? gameCoins,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return UserModel(
      userId: userId ?? this.userId,
      email: email ?? this.email,
      username: username ?? this.username,
      profilePictureUrl: profilePictureUrl ?? this.profilePictureUrl,
      level: level ?? this.level,
      xpPoints: xpPoints ?? this.xpPoints,
      gameCoins: gameCoins ?? this.gameCoins,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}
