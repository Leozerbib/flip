import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../../core/widgets/ui/component/listview.dart';
import '../../../../../core/widgets/ui/user/userCard.dart';
import '../../../../../data/models/friendship_request_model.dart';

class ReceivedRequestsTab extends StatelessWidget {
  final List<FriendshipRequestModel> receivedRequests;
  final bool isLoading;
  final bool isLoadingMore;
  final bool hasMore;
  final ScrollController scrollController;
  final Future<void> Function() onRefresh;
  final Function(int userId, FriendshipRequestModel request) onShowUserProfile;
  final Function(int friendshipId) onAcceptRequest;
  final Function(int friendshipId) onDeclineRequest;

  const ReceivedRequestsTab({
    super.key,
    required this.receivedRequests,
    required this.isLoading,
    required this.isLoadingMore,
    required this.hasMore,
    required this.scrollController,
    required this.onRefresh,
    required this.onShowUserProfile,
    required this.onAcceptRequest,
    required this.onDeclineRequest,
  });

  @override
  Widget build(BuildContext context) {
    return AppListView<FriendshipRequestModel>(
      items: receivedRequests,
      isLoading: isLoading,
      isLoadingMore: isLoadingMore,
      hasMore: hasMore,
      scrollController: scrollController,
      onRefresh: onRefresh,
      emptyStateWidget: const EmptyStateWidget(
        icon: FIcons.inbox,
        title: 'Aucune demande',
        subtitle: 'Aucune demande d\'amitié reçue',
        actionText: 'Tirez vers le bas pour actualiser',
      ),
      itemBuilder: (request, index) => FriendUserCard(
        type: FriendCardType.receivedRequest,
        user: request,
        onTap: () => onShowUserProfile(request.requester.userId, request),
        onAction: () => onAcceptRequest(request.friendshipId),
        onSecondaryAction: () => onDeclineRequest(request.friendshipId),
      ),
    );
  }
}
