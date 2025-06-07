class FriendshipModel {
  final int friendshipId;
  final int userOneId;
  final int userTwoId;
  final int actionUserId;
  final String status;
  final DateTime requestedAt;
  final DateTime? acceptedAt;
  final DateTime? updatedAt;

  const FriendshipModel({
    required this.friendshipId,
    required this.userOneId,
    required this.userTwoId,
    required this.actionUserId,
    required this.status,
    required this.requestedAt,
    this.acceptedAt,
    this.updatedAt,
  });

  factory FriendshipModel.fromJson(Map<String, dynamic> json) {
    return FriendshipModel(
      friendshipId: json['friendship_id'] ?? 0,
      userOneId: json['user_one_id'] ?? 0,
      userTwoId: json['user_two_id'] ?? 0,
      actionUserId: json['action_user_id'] ?? 0,
      status: json['status'] ?? 'pending',
      requestedAt: json['requested_at'] != null
          ? DateTime.parse(json['requested_at'] as String)
          : DateTime.now(),
      acceptedAt: json['accepted_at'] != null
          ? DateTime.parse(json['accepted_at'] as String)
          : null,
      updatedAt: json['updated_at'] != null
          ? DateTime.parse(json['updated_at'] as String)
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'friendship_id': friendshipId,
      'user_one_id': userOneId,
      'user_two_id': userTwoId,
      'action_user_id': actionUserId,
      'status': status,
      'requested_at': requestedAt.toIso8601String(),
      'accepted_at': acceptedAt?.toIso8601String(),
      'updated_at': updatedAt?.toIso8601String(),
    };
  }

  FriendshipModel copyWith({
    int? friendshipId,
    int? userOneId,
    int? userTwoId,
    int? actionUserId,
    String? status,
    DateTime? requestedAt,
    DateTime? acceptedAt,
    DateTime? updatedAt,
  }) {
    return FriendshipModel(
      friendshipId: friendshipId ?? this.friendshipId,
      userOneId: userOneId ?? this.userOneId,
      userTwoId: userTwoId ?? this.userTwoId,
      actionUserId: actionUserId ?? this.actionUserId,
      status: status ?? this.status,
      requestedAt: requestedAt ?? this.requestedAt,
      acceptedAt: acceptedAt ?? this.acceptedAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is FriendshipModel && other.friendshipId == friendshipId;
  }

  @override
  int get hashCode => friendshipId.hashCode;

  @override
  String toString() {
    return 'FriendshipModel(friendshipId: $friendshipId, status: $status)';
  }
}

enum FriendshipStatus {
  pending,
  accepted,
  declined,
  blocked;

  String get displayName {
    switch (this) {
      case FriendshipStatus.pending:
        return 'En attente';
      case FriendshipStatus.accepted:
        return 'Accepté';
      case FriendshipStatus.declined:
        return 'Refusé';
      case FriendshipStatus.blocked:
        return 'Bloqué';
    }
  }
}
