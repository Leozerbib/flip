class FriendshipStatsModel {
  final int totalFriends;
  final int pendingRequestsSent;
  final int pendingRequestsReceived;
  final int blockedUsers;
  final double mutualFriendsAvg;
  final int friendshipRequestsToday;

  const FriendshipStatsModel({
    required this.totalFriends,
    required this.pendingRequestsSent,
    required this.pendingRequestsReceived,
    required this.blockedUsers,
    required this.mutualFriendsAvg,
    required this.friendshipRequestsToday,
  });

  factory FriendshipStatsModel.fromJson(Map<String, dynamic> json) {
    return FriendshipStatsModel(
      totalFriends: json['total_friends'] ?? 0,
      pendingRequestsSent: json['pending_requests_sent'] ?? 0,
      pendingRequestsReceived: json['pending_requests_received'] ?? 0,
      blockedUsers: json['blocked_users'] ?? 0,
      mutualFriendsAvg: (json['mutual_friends_avg'] ?? 0.0).toDouble(),
      friendshipRequestsToday: json['friendship_requests_today'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'total_friends': totalFriends,
      'pending_requests_sent': pendingRequestsSent,
      'pending_requests_received': pendingRequestsReceived,
      'blocked_users': blockedUsers,
      'mutual_friends_avg': mutualFriendsAvg,
      'friendship_requests_today': friendshipRequestsToday,
    };
  }

  FriendshipStatsModel copyWith({
    int? totalFriends,
    int? pendingRequestsSent,
    int? pendingRequestsReceived,
    int? blockedUsers,
    double? mutualFriendsAvg,
    int? friendshipRequestsToday,
  }) {
    return FriendshipStatsModel(
      totalFriends: totalFriends ?? this.totalFriends,
      pendingRequestsSent: pendingRequestsSent ?? this.pendingRequestsSent,
      pendingRequestsReceived:
          pendingRequestsReceived ?? this.pendingRequestsReceived,
      blockedUsers: blockedUsers ?? this.blockedUsers,
      mutualFriendsAvg: mutualFriendsAvg ?? this.mutualFriendsAvg,
      friendshipRequestsToday:
          friendshipRequestsToday ?? this.friendshipRequestsToday,
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is FriendshipStatsModel &&
        other.totalFriends == totalFriends &&
        other.pendingRequestsSent == pendingRequestsSent &&
        other.pendingRequestsReceived == pendingRequestsReceived &&
        other.blockedUsers == blockedUsers;
  }

  @override
  int get hashCode {
    return Object.hash(
      totalFriends,
      pendingRequestsSent,
      pendingRequestsReceived,
      blockedUsers,
    );
  }

  @override
  String toString() {
    return 'FriendshipStatsModel(totalFriends: $totalFriends, pendingRequestsSent: $pendingRequestsSent, pendingRequestsReceived: $pendingRequestsReceived)';
  }
}
