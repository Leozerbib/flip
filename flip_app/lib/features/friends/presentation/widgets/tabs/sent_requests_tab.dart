import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../../core/widgets/ui/component/listview.dart';
import '../../../../../core/widgets/ui/user/userCard.dart';
import '../../../../../data/models/friendship_request_model.dart';

class SentRequestsTab extends StatelessWidget {
  final List<FriendshipRequestModel> sentRequests;
  final bool isLoadingMore;
  final bool hasMore;
  final ScrollController scrollController;
  final Future<void> Function() onRefresh;
  final Function(int userId, FriendshipRequestModel request) onShowUserProfile;

  const SentRequestsTab({
    super.key,
    required this.sentRequests,
    required this.isLoadingMore,
    required this.hasMore,
    required this.scrollController,
    required this.onRefresh,
    required this.onShowUserProfile,
  });

  @override
  Widget build(BuildContext context) {
    return AppListView<FriendshipRequestModel>(
      items: sentRequests,
      isLoading: false, // Pas de loading séparé pour les envoyées
      isLoadingMore: isLoadingMore,
      hasMore: hasMore,
      scrollController: scrollController,
      onRefresh: onRefresh,
      emptyStateWidget: const EmptyStateWidget(
        icon: FIcons.send,
        title: 'Aucune demande envoyée',
        subtitle: 'Aucune demande d\'amitié envoyée',
        actionText: 'Tirez vers le bas pour actualiser',
      ),
      itemBuilder: (request, index) => FriendUserCard(
        type: FriendCardType.sentRequest,
        user: request,
        onTap: () => onShowUserProfile(request.requester.userId, request),
      ),
    );
  }
}
