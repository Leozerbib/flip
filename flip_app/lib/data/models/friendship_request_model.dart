import 'user_model.dart';

class FriendshipRequestModel {
  final int friendshipId;
  final UserModel requester;
  final DateTime requestedAt;

  const FriendshipRequestModel({
    required this.friendshipId,
    required this.requester,
    required this.requestedAt,
  });

  factory FriendshipRequestModel.fromJson(Map<String, dynamic> json) {
    return FriendshipRequestModel(
      friendshipId: json['friendship_id'] ?? 0,
      requester: UserModel.fromJson(json['requester'] ?? {}),
      requestedAt: json['requested_at'] != null
          ? DateTime.parse(json['requested_at'] as String)
          : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'friendship_id': friendshipId,
      'requester': requester.toJson(),
      'requested_at': requestedAt.toIso8601String(),
    };
  }

  FriendshipRequestModel copyWith({
    int? friendshipId,
    UserModel? requester,
    DateTime? requestedAt,
  }) {
    return FriendshipRequestModel(
      friendshipId: friendshipId ?? this.friendshipId,
      requester: requester ?? this.requester,
      requestedAt: requestedAt ?? this.requestedAt,
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is FriendshipRequestModel &&
        other.friendshipId == friendshipId;
  }

  @override
  int get hashCode => friendshipId.hashCode;

  @override
  String toString() {
    return 'FriendshipRequestModel(friendshipId: $friendshipId, requester: ${requester.username})';
  }
}
