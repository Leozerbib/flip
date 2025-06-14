import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../../core/widgets/ui/component/listview.dart';
import '../../../../../core/widgets/ui/user/userCard.dart';
import '../../../../../data/models/friend_model.dart';

class FriendsTab extends StatelessWidget {
  final List<FriendModel> friends;
  final bool isLoading;
  final bool isLoadingMore;
  final bool hasMore;
  final ScrollController scrollController;
  final Future<void> Function() onRefresh;
  final Function(int userId) onShowUserProfile;
  final Function(int userId) onRemoveFriend;

  const FriendsTab({
    super.key,
    required this.friends,
    required this.isLoading,
    required this.isLoadingMore,
    required this.hasMore,
    required this.scrollController,
    required this.onRefresh,
    required this.onShowUserProfile,
    required this.onRemoveFriend,
  });

  @override
  Widget build(BuildContext context) {
    return AppListView<FriendModel>(
      items: friends,
      isLoading: isLoading,
      isLoadingMore: isLoadingMore,
      hasMore: hasMore,
      scrollController: scrollController,
      onRefresh: onRefresh,
      emptyStateWidget: const EmptyStateWidget(
        icon: FIcons.users,
        title: 'Aucun ami',
        subtitle:
            'Vous n\'avez pas encore d\'amis.\nUtilisez la recherche pour en trouver.',
        actionText: 'Tirez vers le bas pour actualiser',
      ),
      itemBuilder: (friend, index) => FriendUserCard(
        type: FriendCardType.friend,
        user: friend,
        onTap: () => onShowUserProfile(friend.userId),
        onAction: () => onRemoveFriend(friend.userId),
      ),
    );
  }
}
