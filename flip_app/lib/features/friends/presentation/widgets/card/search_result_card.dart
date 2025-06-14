import 'package:flutter/material.dart';
import '../../../../../core/widgets/ui/user/userCard.dart';
import '../../../../../data/models/user_model.dart';

class SearchResultCard extends StatelessWidget {
  final UserModel user;
  final VoidCallback? onTap;
  final VoidCallback? onSendRequest;

  const SearchResultCard({
    super.key,
    required this.user,
    this.onTap,
    this.onSendRequest,
  });

  @override
  Widget build(BuildContext context) {
    return FriendUserCard(
      type: FriendCardType.searchResult,
      user: user,
      onTap: onTap,
      onAction: onSendRequest,
    );
  }
}
