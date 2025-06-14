import 'package:flutter/material.dart';
import '../../../../../core/widgets/ui/user/userCard.dart';
import '../../../../../data/models/friendship_request_model.dart';

class ReceivedRequestCard extends StatelessWidget {
  final FriendshipRequestModel request;
  final VoidCallback? onTap;
  final VoidCallback? onAccept;
  final VoidCallback? onDecline;

  const ReceivedRequestCard({
    super.key,
    required this.request,
    this.onTap,
    this.onAccept,
    this.onDecline,
  });

  @override
  Widget build(BuildContext context) {
    return FriendUserCard(
      type: FriendCardType.receivedRequest,
      user: request,
      onTap: onTap,
      onAction: onAccept,
      onSecondaryAction: onDecline,
    );
  }
}

class SentRequestCard extends StatelessWidget {
  final FriendshipRequestModel request;
  final VoidCallback? onTap;

  const SentRequestCard({super.key, required this.request, this.onTap});

  @override
  Widget build(BuildContext context) {
    return FriendUserCard(
      type: FriendCardType.sentRequest,
      user: request,
      onTap: onTap,
    );
  }
}
