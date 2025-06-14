import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../api/friendship_service.dart';
import '../../../utils/logger.dart';
import '../../../../data/models/friend_model.dart';
import '../../../../data/models/friendship_request_model.dart';
import '../../../../data/models/user_model.dart';

enum FriendCardType { friend, searchResult, receivedRequest, sentRequest }

enum FriendCardAction {
  addFriend,
  removeFriend,
  acceptRequest,
  declineRequest,
  none,
}

class FriendUserCard extends StatelessWidget {
  final FriendCardType type;
  final dynamic user; // FriendModel, UserModel, ou FriendshipRequestModel
  final VoidCallback? onTap;
  final VoidCallback? onAction;
  final VoidCallback? onSecondaryAction;

  const FriendUserCard({
    super.key,
    required this.type,
    required this.user,
    this.onTap,
    this.onAction,
    this.onSecondaryAction,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);
    Color? borderColor;

    if (user is! UserModel || user.friendshipStatus == null) {
      borderColor = theme.colors.border;
    } else {
      switch (user.friendshipStatus) {
        case 'pending':
          borderColor = Colors.orange;
          break;
        case 'accepted':
          borderColor = Colors.green;
          break;
        case 'declined':
          borderColor = Colors.red;
          break;
        case 'blocked':
          borderColor = Colors.grey.shade400;
          break;
        default:
          borderColor = theme.colors.border;
          break;
      }
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      child: FCard(
        style: FCardStyle(
          decoration: BoxDecoration(
            border: Border.all(color: borderColor),
            borderRadius: BorderRadius.circular(16),
          ),
          contentStyle: FCardContentStyle(
            titleTextStyle: theme.typography.base.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.colors.foreground,
            ),
            subtitleTextStyle: theme.typography.sm.copyWith(
              color: theme.colors.mutedForeground,
            ),
          ),
        ),
        child: InkWell(
          onTap: onTap,
          customBorder: Border.all(color: borderColor),
          borderRadius: BorderRadius.circular(16),
          child: Container(
            padding: const EdgeInsets.all(2),
            child: Row(
              children: [
                _buildAvatar(theme),
                const SizedBox(width: 16),
                _buildUserInfo(theme),
                _buildActions(theme),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildAvatar(FThemeData theme) {
    String? profilePictureUrl;

    switch (type) {
      case FriendCardType.friend:
        final friend = user as FriendModel;
        profilePictureUrl = friend.profilePictureUrl;
        break;
      case FriendCardType.searchResult:
        final searchUser = user as UserModel;
        profilePictureUrl = searchUser.profilePictureUrl;
        break;
      case FriendCardType.receivedRequest:
      case FriendCardType.sentRequest:
        final request = user as FriendshipRequestModel;
        profilePictureUrl = request.requester.profilePictureUrl;
        break;
    }

    return Container(
      width: 50,
      height: 50,
      decoration: BoxDecoration(
        color: theme.colors.primary,
        borderRadius: BorderRadius.circular(25),
        image: profilePictureUrl != null
            ? DecorationImage(
                image: NetworkImage(profilePictureUrl),
                fit: BoxFit.cover,
              )
            : null,
      ),
      child: profilePictureUrl == null
          ? Icon(FIcons.user, color: theme.colors.primaryForeground, size: 24)
          : null,
    );
  }

  Widget _buildUserInfo(FThemeData theme) {
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            _getUserName(),
            style: theme.typography.base.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.colors.foreground,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            _getUserSubtitle(),
            style: theme.typography.sm.copyWith(
              color: theme.colors.mutedForeground,
            ),
          ),
        ],
      ),
    );
  }

  String _getUserName() {
    switch (type) {
      case FriendCardType.friend:
        return (user as FriendModel).username;
      case FriendCardType.searchResult:
        return (user as UserModel).username;
      case FriendCardType.receivedRequest:
      case FriendCardType.sentRequest:
        return (user as FriendshipRequestModel).requester.username;
    }
  }

  String _getUserSubtitle() {
    switch (type) {
      case FriendCardType.friend:
        final friend = user as FriendModel;
        return 'Niveau ${friend.level} • ${friend.xpPoints} XP';
      case FriendCardType.searchResult:
        final searchUser = user as UserModel;
        return 'Niveau ${searchUser.level} • ${searchUser.xpPoints} XP';
      case FriendCardType.receivedRequest:
        return 'Vous a envoyé une demande';
      case FriendCardType.sentRequest:
        return 'En attente de réponse';
    }
  }

  Widget _buildActions(FThemeData theme) {
    switch (type) {
      case FriendCardType.friend:
        return PopupMenuButton(
          icon: Icon(Icons.more_vert, color: theme.colors.mutedForeground),
          itemBuilder: (context) => [
            PopupMenuItem(
              onTap: onAction,
              child: Row(
                children: [
                  Icon(
                    FIcons.userMinus,
                    color: theme.colors.destructive,
                    size: 16,
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Supprimer',
                    style: TextStyle(color: theme.colors.destructive),
                  ),
                ],
              ),
            ),
          ],
        );

      case FriendCardType.searchResult:
        if (user.friendshipStatus == 'pending') {
          return FButton(
            onPress: () {},
            style: FButtonStyle.ghost,
            child: Icon(FIcons.clock, size: 16, color: Colors.orange),
          );
        } else if (user.friendshipStatus == 'accepted') {
          return FButton(
            onPress: () {},
            style: FButtonStyle.ghost,
            child: Icon(FIcons.check, size: 16, color: Colors.green),
          );
        } else if (user.friendshipStatus == 'declined') {
          return FButton(
            onPress: () {},
            style: FButtonStyle.ghost,
            child: Icon(FIcons.x, size: 16, color: Colors.red),
          );
        } else if (user.friendshipStatus == 'blocked') {
          return FButton(
            onPress: () {},
            style: FButtonStyle.ghost,
            child: Icon(FIcons.x, size: 16, color: Colors.grey.shade400),
          );
        }
        return FButton(
          onPress: onAction,
          style: FButtonStyle.secondary,
          child: Icon(FIcons.userPlus, size: 16, color: theme.colors.primary),
        );

      case FriendCardType.receivedRequest:
        return Row(
          children: [
            FButton(
              onPress: onAction, // Accept
              style: FButtonStyle.secondary,
              child: Icon(FIcons.check, size: 16, color: Colors.green),
            ),
            const SizedBox(width: 8),
            FButton(
              onPress: onSecondaryAction, // Decline
              style: FButtonStyle.secondary,
              child: Icon(FIcons.x, size: 16, color: theme.colors.destructive),
            ),
          ],
        );

      case FriendCardType.sentRequest:
        return Icon(FIcons.clock, color: Colors.orange, size: 20);
    }
  }
}
