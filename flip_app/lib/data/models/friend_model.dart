import 'dart:developer';

class FriendModel {
  final int userId;
  final String username;
  final String? profilePictureUrl;
  final int? level;
  final int? xpPoints;
  final int? gameCoins;
  final String? friendshipStatus;
  final DateTime? friendshipSince;

  const FriendModel({
    required this.userId,
    required this.username,
    this.profilePictureUrl,
    this.level,
    this.xpPoints,
    this.gameCoins,
    this.friendshipStatus,
    this.friendshipSince,
  });

  factory FriendModel.fromJson(Map<String, dynamic> json) {
    try {
      return FriendModel(
        userId: int.parse(json['user_id'].toString()),
        username: json['username'] ?? '',
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
        friendshipStatus: json['friendship_status'] != null
            ? json['friendship_status'] as String
            : 'accepted',
        friendshipSince: json['friendship_since'] != null
            ? DateTime.parse(json['friendship_since'] as String)
            : null,
      );
    } catch (e) {
      log('Error: $e');
      throw Exception(e);
    }
  }

  Map<String, dynamic> toJson() {
    return {
      'user_id': userId,
      'username': username,
      'profile_picture_url': profilePictureUrl,
      'level': level,
      'xp_points': xpPoints,
      'game_coins': gameCoins,
      'friendship_status': friendshipStatus,
      'friendship_since': friendshipSince?.toIso8601String(),
    };
  }

  FriendModel copyWith({
    int? userId,
    String? username,
    String? profilePictureUrl,
    int? level,
    int? xpPoints,
    int? gameCoins,
    String? friendshipStatus,
    DateTime? friendshipSince,
  }) {
    return FriendModel(
      userId: userId ?? this.userId,
      username: username ?? this.username,
      profilePictureUrl: profilePictureUrl ?? this.profilePictureUrl,
      level: level ?? this.level,
      xpPoints: xpPoints ?? this.xpPoints,
      gameCoins: gameCoins ?? this.gameCoins,
      friendshipStatus: friendshipStatus ?? this.friendshipStatus,
      friendshipSince: friendshipSince ?? this.friendshipSince,
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is FriendModel && other.userId == userId;
  }

  @override
  int get hashCode => userId.hashCode;

  @override
  String toString() {
    return 'FriendModel(userId: $userId, username: $username)';
  }
}
