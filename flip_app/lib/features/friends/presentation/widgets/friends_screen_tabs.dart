import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../core/widgets/ui/component/tabs.dart';
import '../../../../data/models/friend_model.dart';
import '../../../../data/models/friendship_request_model.dart';
import '../../../../data/models/user_model.dart';
import 'tabs/friends_tab.dart';
import 'tabs/received_requests_tab.dart';
import 'tabs/sent_requests_tab.dart';
import 'tabs/search_tab.dart';

class FriendsScreenTabs extends StatelessWidget {
  final TabController tabController;

  // Data
  final List<FriendModel> friends;
  final List<FriendshipRequestModel> receivedRequests;
  final List<FriendshipRequestModel> sentRequests;
  final List<FriendModel> suggestions;
  final List<UserModel> searchResults;

  // Loading states
  final bool isLoadingFriends;
  final bool isLoadingRequests;
  final bool isSearching;

  // Pagination states
  final bool isLoadingMoreFriends;
  final bool isLoadingMoreReceived;
  final bool isLoadingMoreSent;
  final bool hasMoreFriends;
  final bool hasMoreReceived;
  final bool hasMoreSent;

  // Controllers
  final TextEditingController searchController;
  final ScrollController friendsScrollController;
  final ScrollController receivedScrollController;
  final ScrollController sentScrollController;

  // Callbacks
  final Future<void> Function(String type) onRefresh;
  final Function(String query) onSearchUsers;
  final Function(int userId) onSendFriendshipRequest;
  final Function(int friendshipId) onAcceptRequest;
  final Function(int friendshipId) onDeclineRequest;
  final Function(int friendId) onRemoveFriend;
  final Function(int userId, [dynamic request]) onShowUserProfile;

  const FriendsScreenTabs({
    super.key,
    required this.tabController,
    required this.friends,
    required this.receivedRequests,
    required this.sentRequests,
    required this.suggestions,
    required this.searchResults,
    required this.isLoadingFriends,
    required this.isLoadingRequests,
    required this.isSearching,
    required this.isLoadingMoreFriends,
    required this.isLoadingMoreReceived,
    required this.isLoadingMoreSent,
    required this.hasMoreFriends,
    required this.hasMoreReceived,
    required this.hasMoreSent,
    required this.searchController,
    required this.friendsScrollController,
    required this.receivedScrollController,
    required this.sentScrollController,
    required this.onRefresh,
    required this.onSearchUsers,
    required this.onSendFriendshipRequest,
    required this.onAcceptRequest,
    required this.onDeclineRequest,
    required this.onRemoveFriend,
    required this.onShowUserProfile,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Tabs avec Forui styling
        AppTabBar(
          controller: tabController,
          tabs: const [
            TabBarItem(icon: FIcons.users),
            TabBarItem(icon: FIcons.inbox),
            TabBarItem(icon: FIcons.send),
            TabBarItem(icon: FIcons.search),
          ],
        ),

        // Content
        Expanded(
          child: AppTabBarView(
            controller: tabController,
            children: [
              FriendsTab(
                friends: friends,
                isLoading: isLoadingFriends,
                isLoadingMore: isLoadingMoreFriends,
                hasMore: hasMoreFriends,
                scrollController: friendsScrollController,
                onRefresh: () => onRefresh('friends'),
                onShowUserProfile: (userId) => onShowUserProfile(userId),
                onRemoveFriend: onRemoveFriend,
              ),

              ReceivedRequestsTab(
                receivedRequests: receivedRequests,
                isLoading: isLoadingRequests,
                isLoadingMore: isLoadingMoreReceived,
                hasMore: hasMoreReceived,
                scrollController: receivedScrollController,
                onRefresh: () => onRefresh('received'),
                onShowUserProfile: (userId, request) =>
                    onShowUserProfile(userId, request),
                onAcceptRequest: onAcceptRequest,
                onDeclineRequest: onDeclineRequest,
              ),

              SentRequestsTab(
                sentRequests: sentRequests,
                isLoadingMore: isLoadingMoreSent,
                hasMore: hasMoreSent,
                scrollController: sentScrollController,
                onRefresh: () => onRefresh('sent'),
                onShowUserProfile: (userId, request) =>
                    onShowUserProfile(userId, request),
              ),

              SearchTab(
                searchController: searchController,
                suggestions: suggestions,
                searchResults: searchResults,
                isSearching: isSearching,
                onRefresh: () => onRefresh('search'),
                onSearchUsers: onSearchUsers,
                onShowUserProfile: (userId) => onShowUserProfile(userId),
                onSendFriendshipRequest: onSendFriendshipRequest,
              ),
            ],
          ),
        ),
      ],
    );
  }
}
