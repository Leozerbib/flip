import 'package:flutter/material.dart';
import '../../../../../core/widgets/ui/user/userCard.dart';
import '../../../../../data/models/friend_model.dart';

class FriendCard extends StatelessWidget {
  final FriendModel friend;
  final VoidCallback? onTap;
  final VoidCallback? onRemove;

  const FriendCard({
    super.key,
    required this.friend,
    this.onTap,
    this.onRemove,
  });

  @override
  Widget build(BuildContext context) {
    return FriendUserCard(
      type: FriendCardType.friend,
      user: friend,
      onTap: onTap,
      onAction: onRemove,
    );
  }
}
