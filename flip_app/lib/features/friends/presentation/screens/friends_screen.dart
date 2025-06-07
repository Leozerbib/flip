import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../core/api/friendship_service.dart';
import '../../../../core/api/user_service.dart';
import '../../../../core/utils/logger.dart';
import '../../../../core/widgets/global_alert.dart';
import '../../../../data/models/friend_model.dart';
import '../../../../data/models/friendship_request_model.dart';
import '../../../../data/models/friendship_stats_model.dart';
import '../../../../data/models/user_model.dart';
import '../widgets/user_profile_dialog.dart';

// Enums pour les types de cartes et actions
enum FriendCardType { friend, searchResult, receivedRequest, sentRequest }

enum FriendCardAction {
  addFriend,
  removeFriend,
  acceptRequest,
  declineRequest,
  none,
}

class FriendsScreen extends StatefulWidget {
  const FriendsScreen({super.key});

  @override
  State<FriendsScreen> createState() => _FriendsScreenState();
}

class _FriendsScreenState extends State<FriendsScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  // Data
  List<FriendModel> _friends = [];
  List<FriendshipRequestModel> _receivedRequests = [];
  List<FriendshipRequestModel> _sentRequests = [];
  List<FriendModel> _suggestions = [];
  FriendshipStatsModel? _stats;
  List<UserModel> _searchResults = [];

  // Loading states
  bool _isLoadingFriends = false;
  bool _isLoadingRequests = false;
  bool _isLoadingStats = false;
  bool _isSearching = false;

  // Pagination states
  bool _isLoadingMoreFriends = false;
  bool _isLoadingMoreReceived = false;
  bool _isLoadingMoreSent = false;
  bool _hasMoreFriends = true;
  bool _hasMoreReceived = true;
  bool _hasMoreSent = true;
  int _friendsPage = 1;
  int _receivedPage = 1;
  int _sentPage = 1;
  final int _pageSize = 20;

  // Controllers
  final TextEditingController _searchController = TextEditingController();
  final ScrollController _friendsScrollController = ScrollController();
  final ScrollController _receivedScrollController = ScrollController();
  final ScrollController _sentScrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
    _setupScrollControllers();
    _loadInitialData();
  }

  @override
  void dispose() {
    _tabController.dispose();
    _searchController.dispose();
    _friendsScrollController.dispose();
    _receivedScrollController.dispose();
    _sentScrollController.dispose();
    super.dispose();
  }

  void _setupScrollControllers() {
    _friendsScrollController.addListener(() {
      if (_friendsScrollController.position.pixels >=
          _friendsScrollController.position.maxScrollExtent - 200) {
        _loadMoreFriends();
      }
    });

    _receivedScrollController.addListener(() {
      if (_receivedScrollController.position.pixels >=
          _receivedScrollController.position.maxScrollExtent - 200) {
        _loadMoreReceivedRequests();
      }
    });

    _sentScrollController.addListener(() {
      if (_sentScrollController.position.pixels >=
          _sentScrollController.position.maxScrollExtent - 200) {
        _loadMoreSentRequests();
      }
    });
  }

  Future<void> _loadInitialData() async {
    await Future.wait([
      _loadFriends(isRefresh: true),
      _loadReceivedRequests(isRefresh: true),
      _loadSentRequests(isRefresh: true),
      _loadStats(),
      _loadSuggestions(),
    ]);
  }

  Future<void> _loadFriends({bool isRefresh = false}) async {
    if (isRefresh) {
      setState(() {
        _isLoadingFriends = true;
        _friendsPage = 1;
        _hasMoreFriends = true;
        _friends.clear();
      });
    }

    try {
      final friends = await FriendshipService.getFriends(
        page: _friendsPage,
        limit: _pageSize,
      );

      if (mounted) {
        setState(() {
          final safeFriends = friends ?? [];
          if (isRefresh) {
            _friends = safeFriends;
          } else {
            _friends.addAll(safeFriends);
          }
          _hasMoreFriends = safeFriends.length == _pageSize;
          if (!isRefresh) _friendsPage++;
        });
      }
    } catch (e) {
      AppLogger.error('Erreur chargement amis: $e');
      if (mounted) {
        AlertService.showError(
          context,
          title: 'Erreur',
          subtitle: 'Erreur lors du chargement des amis',
        );
      }
      // Assurer que la liste n'est jamais null
      if (_friends == null && mounted) {
        setState(() => _friends = []);
      }
    } finally {
      if (mounted) {
        setState(() => _isLoadingFriends = false);
      }
    }
  }

  Future<void> _loadMoreFriends() async {
    if (_isLoadingMoreFriends || !_hasMoreFriends) return;

    setState(() => _isLoadingMoreFriends = true);
    try {
      final friends = await FriendshipService.getFriends(
        page: _friendsPage,
        limit: _pageSize,
      );

      if (mounted) {
        setState(() {
          final safeFriends = friends ?? [];
          _friends.addAll(safeFriends);
          _hasMoreFriends = safeFriends.length == _pageSize;
          _friendsPage++;
        });
      }
    } catch (e) {
      AppLogger.error('Erreur chargement plus d\'amis: $e');
    } finally {
      if (mounted) {
        setState(() => _isLoadingMoreFriends = false);
      }
    }
  }

  Future<void> _loadReceivedRequests({bool isRefresh = false}) async {
    if (isRefresh) {
      setState(() {
        _isLoadingRequests = true;
        _receivedPage = 1;
        _hasMoreReceived = true;
        _receivedRequests.clear();
      });
    }

    try {
      final requests = await FriendshipService.getReceivedRequests(
        page: _receivedPage,
        limit: _pageSize,
      );

      if (mounted) {
        setState(() {
          final safeRequests = requests ?? [];
          if (isRefresh) {
            _receivedRequests = safeRequests;
          } else {
            _receivedRequests.addAll(safeRequests);
          }
          _hasMoreReceived = safeRequests.length == _pageSize;
          if (!isRefresh) _receivedPage++;
        });
      }
    } catch (e) {
      AppLogger.error('Erreur chargement demandes reçues: $e');
      // Assurer que la liste n'est jamais null
      if (_receivedRequests == null && mounted) {
        setState(() => _receivedRequests = []);
      }
    } finally {
      if (mounted) {
        setState(() => _isLoadingRequests = false);
      }
    }
  }

  Future<void> _loadMoreReceivedRequests() async {
    if (_isLoadingMoreReceived || !_hasMoreReceived) return;

    setState(() => _isLoadingMoreReceived = true);
    try {
      final requests = await FriendshipService.getReceivedRequests(
        page: _receivedPage,
        limit: _pageSize,
      );

      if (mounted) {
        setState(() {
          final safeRequests = requests ?? [];
          _receivedRequests.addAll(safeRequests);
          _hasMoreReceived = safeRequests.length == _pageSize;
          _receivedPage++;
        });
      }
    } catch (e) {
      AppLogger.error('Erreur chargement plus de demandes reçues: $e');
    } finally {
      if (mounted) {
        setState(() => _isLoadingMoreReceived = false);
      }
    }
  }

  Future<void> _loadSentRequests({bool isRefresh = false}) async {
    if (isRefresh) {
      setState(() {
        _sentPage = 1;
        _hasMoreSent = true;
        _sentRequests.clear();
      });
    }

    try {
      final requests = await FriendshipService.getSentRequests(
        page: _sentPage,
        limit: _pageSize,
      );

      setState(() {
        final safeRequests = requests ?? [];
        if (isRefresh) {
          _sentRequests = safeRequests;
        } else {
          _sentRequests.addAll(safeRequests);
        }
        _hasMoreSent = safeRequests.length == _pageSize;
        if (!isRefresh) _sentPage++;
      });
    } catch (e) {
      AppLogger.error('Erreur chargement demandes envoyées: $e');
      // Assurer que la liste n'est jamais null
      if (_sentRequests == null && mounted) {
        setState(() => _sentRequests = []);
      }
    }
  }

  Future<void> _loadMoreSentRequests() async {
    if (_isLoadingMoreSent || !_hasMoreSent) return;

    setState(() => _isLoadingMoreSent = true);
    try {
      final requests = await FriendshipService.getSentRequests(
        page: _sentPage,
        limit: _pageSize,
      );

      setState(() {
        final safeRequests = requests ?? [];
        _sentRequests.addAll(safeRequests);
        _hasMoreSent = safeRequests.length == _pageSize;
        _sentPage++;
      });
    } catch (e) {
      AppLogger.error('Erreur chargement plus de demandes envoyées: $e');
    } finally {
      if (mounted) {
        setState(() => _isLoadingMoreSent = false);
      }
    }
  }

  Future<void> _loadStats() async {
    if (mounted) {
      setState(() => _isLoadingStats = true);
    }
    try {
      final stats = await FriendshipService.getStats();
      if (mounted) {
        setState(() => _stats = stats);
      }
    } catch (e) {
      AppLogger.error('Erreur chargement statistiques: $e');
    } finally {
      if (mounted) {
        setState(() => _isLoadingStats = false);
      }
    }
  }

  Future<void> _loadSuggestions() async {
    try {
      final suggestions = await FriendshipService.getSuggestions();
      if (mounted) {
        setState(() => _suggestions = suggestions ?? []);
      }
    } catch (e) {
      AppLogger.error('Erreur chargement suggestions: $e');
      if (mounted) {
        setState(() => _suggestions = []);
      }
    }
  }

  Future<void> _refresh(String type) async {
    try {
      if (type == 'suggestions') {
        await _loadSuggestions();
      } else if (type == 'friends') {
        await _loadFriends(isRefresh: true);
      } else if (type == 'received') {
        await _loadReceivedRequests(isRefresh: true);
      } else if (type == 'sent') {
        await _loadSentRequests(isRefresh: true);
      } else if (type == 'search') {
        await _refreshSearchContent();
      }
    } catch (e) {
      AppLogger.error('Erreur chargement suggestions: $e');
    }
  }

  Future<void> _refreshSearchContent() async {
    try {
      // Si on a un terme de recherche, relancer la recherche
      if (_searchController.text.isNotEmpty) {
        await _searchUsers(_searchController.text);
      } else {
        // Sinon recharger les suggestions
        await _loadSuggestions();
      }
    } catch (e) {
      AppLogger.error('Erreur rafraîchissement recherche: $e');
      if (mounted) {
        AlertService.showError(
          context,
          title: 'Erreur',
          subtitle: 'Erreur lors du rafraîchissement',
        );
      }
    }
  }

  Future<void> _searchUsers(String query) async {
    if (query.isEmpty) {
      if (mounted) {
        setState(() => _searchResults = []);
      }
      return;
    }

    if (mounted) {
      setState(() => _isSearching = true);
    }
    try {
      final results = await UserService.searchUsers(query);
      if (mounted) {
        setState(() => _searchResults = results ?? []);
      }
    } catch (e) {
      AppLogger.error('Erreur recherche: $e');
      if (mounted) {
        AlertService.showError(
          context,
          title: 'Erreur',
          subtitle: 'Erreur lors de la recherche',
        );
        setState(() => _searchResults = []);
      }
    } finally {
      if (mounted) {
        setState(() => _isSearching = false);
      }
    }
  }

  Future<void> _sendFriendshipRequest(int userId) async {
    try {
      await FriendshipService.sendFriendshipRequest(userId);
      if (mounted) {
        AlertService.showSuccess(
          context,
          title: 'Demande envoyée',
          subtitle: 'Demande d\'amitié envoyée avec succès',
        );
      }
      _loadSentRequests(isRefresh: true);
      _searchController.clear();
      if (mounted) {
        setState(() => _searchResults = []);
      }
    } catch (e) {
      AppLogger.error('Erreur envoi demande: $e');
      if (mounted) {
        AlertService.showError(
          context,
          title: 'Erreur',
          subtitle: 'Erreur lors de l\'envoi de la demande',
        );
      }
    }
  }

  Future<void> _acceptRequest(int friendshipId) async {
    try {
      await FriendshipService.acceptFriendshipRequest(friendshipId);
      if (mounted) {
        AlertService.showSuccess(
          context,
          title: 'Demande acceptée',
          subtitle: 'La demande d\'amitié a été acceptée',
        );
      }
      // Refresh all relevant data
      await Future.wait([
        _loadFriends(isRefresh: true),
        _loadReceivedRequests(isRefresh: true),
        _loadStats(),
      ]);
    } catch (e) {
      AppLogger.error('Erreur acceptation: $e');
      if (mounted) {
        AlertService.showError(
          context,
          title: 'Erreur',
          subtitle: 'Erreur lors de l\'acceptation',
        );
      }
    }
  }

  Future<void> _declineRequest(int friendshipId) async {
    try {
      await FriendshipService.declineFriendshipRequest(friendshipId);
      if (mounted) {
        AlertService.showSuccess(
          context,
          title: 'Demande refusée',
          subtitle: 'La demande d\'amitié a été refusée',
        );
      }
      _loadReceivedRequests(isRefresh: true);
    } catch (e) {
      AppLogger.error('Erreur refus: $e');
      if (mounted) {
        AlertService.showError(
          context,
          title: 'Erreur',
          subtitle: 'Erreur lors du refus',
        );
      }
    }
  }

  Future<void> _removeFriend(int friendId) async {
    try {
      await FriendshipService.removeFriend(friendId);
      if (mounted) {
        AlertService.showSuccess(
          context,
          title: 'Ami supprimé',
          subtitle: 'L\'ami a été supprimé de votre liste',
        );
      }
      await Future.wait([_loadFriends(isRefresh: true), _loadStats()]);
    } catch (e) {
      AppLogger.error('Erreur suppression: $e');
      if (mounted) {
        AlertService.showError(
          context,
          title: 'Erreur',
          subtitle: 'Erreur lors de la suppression',
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Scaffold(
      backgroundColor: theme.colors.background,
      body: Column(
        children: [
          // Tabs avec Forui styling
          Container(
            decoration: BoxDecoration(
              color: theme.colors.background,
              border: Border(
                bottom: BorderSide(color: theme.colors.border, width: 1),
              ),
            ),
            child: TabBar(
              controller: _tabController,
              labelColor: theme.colors.primary,
              unselectedLabelColor: theme.colors.mutedForeground,
              labelStyle: theme.typography.sm.copyWith(
                fontWeight: FontWeight.w600,
              ),
              unselectedLabelStyle: theme.typography.sm,
              indicatorColor: theme.colors.primary,
              indicatorWeight: 2,
              tabs: [
                Tab(icon: Icon(FIcons.users)),
                Tab(icon: Icon(FIcons.inbox)),
                Tab(icon: Icon(FIcons.send)),
                Tab(icon: Icon(FIcons.search)),
              ],
            ),
          ),

          // Content
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildFriendsTab(theme),
                _buildReceivedRequestsTab(theme),
                _buildSentRequestsTab(theme),
                _buildSearchTab(theme),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFriendsTab(FThemeData theme) {
    return FriendListView<FriendModel>(
      items: _friends,
      isLoading: _isLoadingFriends,
      isLoadingMore: _isLoadingMoreFriends,
      hasMore: _hasMoreFriends,
      scrollController: _friendsScrollController,
      onRefresh: () => _refresh('friends'),
      emptyStateWidget: EmptyStateWidget(
        icon: FIcons.users,
        title: 'Aucun ami',
        subtitle:
            'Vous n\'avez pas encore d\'amis.\nUtilisez la recherche pour en trouver.',
        theme: theme,
      ),
      itemBuilder: (friend, index) => FriendUserCard(
        type: FriendCardType.friend,
        user: friend,
        theme: theme,
        onTap: () => _showUserProfile(friend.userId, DialogContext.friends),
        onAction: () => _removeFriend(friend.userId),
      ),
    );
  }

  Widget _buildReceivedRequestsTab(FThemeData theme) {
    return FriendListView<FriendshipRequestModel>(
      items: _receivedRequests,
      isLoading: _isLoadingRequests,
      isLoadingMore: _isLoadingMoreReceived,
      hasMore: _hasMoreReceived,
      scrollController: _receivedScrollController,
      onRefresh: () => _refresh('received'),
      emptyStateWidget: EmptyStateWidget(
        icon: FIcons.inbox,
        title: 'Aucune demande',
        subtitle: 'Aucune demande d\'amitié reçue',
        theme: theme,
      ),
      itemBuilder: (request, index) => FriendUserCard(
        type: FriendCardType.receivedRequest,
        user: request,
        theme: theme,
        onTap: () => _showUserProfile(
          request.requester.userId,
          DialogContext.receivedRequests,
          request,
        ),
        onAction: () => _acceptRequest(request.friendshipId),
        onSecondaryAction: () => _declineRequest(request.friendshipId),
      ),
    );
  }

  Widget _buildSentRequestsTab(FThemeData theme) {
    return FriendListView<FriendshipRequestModel>(
      items: _sentRequests,
      isLoading: false, // Pas de loading séparé pour les envoyées
      isLoadingMore: _isLoadingMoreSent,
      hasMore: _hasMoreSent,
      scrollController: _sentScrollController,
      onRefresh: () => _refresh('sent'),
      emptyStateWidget: EmptyStateWidget(
        icon: FIcons.send,
        title: 'Aucune demande envoyée',
        subtitle: 'Aucune demande d\'amitié envoyée',
        theme: theme,
      ),
      itemBuilder: (request, index) => FriendUserCard(
        type: FriendCardType.sentRequest,
        user: request,
        theme: theme,
        onTap: () => _showUserProfile(
          request.requester.userId,
          DialogContext.sentRequests,
          request,
        ),
      ),
    );
  }

  Widget _buildSearchTab(FThemeData theme) {
    return Column(
      children: [
        // Barre de recherche fixe en haut
        Container(
          padding: const EdgeInsets.all(8),
          child: TextField(
            controller: _searchController,
            decoration: InputDecoration(
              hintText: 'Rechercher des utilisateurs...',
              prefixIcon: Icon(
                FIcons.search,
                color: theme.colors.mutedForeground,
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide(color: theme.colors.border),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide(color: theme.colors.primary),
              ),
            ),
            onChanged: _searchUsers,
            style: theme.typography.base.copyWith(
              color: theme.colors.foreground,
            ),
          ),
        ),

        // Contenu avec pull-to-refresh
        Expanded(
          child: RefreshIndicator(
            onRefresh: () => _refresh('search'),
            child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              child: Container(
                constraints: BoxConstraints(
                  minHeight: MediaQuery.of(context).size.height - 200,
                ),
                child: Column(
                  children: [
                    // Suggestions d'amis
                    if ((_suggestions?.isNotEmpty ?? false) &&
                        _searchController.text.isEmpty) ...[
                      Container(
                        padding: const EdgeInsets.all(16),
                        width: double.infinity,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Suggestions d\'amis',
                              style: theme.typography.lg.copyWith(
                                fontWeight: FontWeight.bold,
                                color: theme.colors.foreground,
                              ),
                            ),
                            const SizedBox(height: 16),
                            ...(_suggestions ?? []).map(
                              (suggestion) => FriendUserCard(
                                type: FriendCardType.searchResult,
                                user: UserModel(
                                  userId: suggestion.userId,
                                  username: suggestion.username,
                                  email: '',
                                  profilePictureUrl:
                                      suggestion.profilePictureUrl,
                                  level: suggestion.level,
                                  xpPoints: suggestion.xpPoints,
                                  gameCoins: suggestion.gameCoins,
                                  createdAt: DateTime.now(),
                                ),
                                theme: theme,
                                onTap: () => _showUserProfile(
                                  suggestion.userId,
                                  DialogContext.search,
                                ),
                                onAction: () =>
                                    _sendFriendshipRequest(suggestion.userId),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],

                    // État vide par défaut quand aucune recherche
                    if ((_suggestions?.isEmpty ?? true) &&
                        _searchController.text.isEmpty) ...[
                      Container(
                        padding: const EdgeInsets.all(32),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              FIcons.search,
                              size: 64,
                              color: theme.colors.mutedForeground,
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'Recherchez des amis',
                              style: theme.typography.lg.copyWith(
                                fontWeight: FontWeight.bold,
                                color: theme.colors.foreground,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Utilisez la barre de recherche ci-dessus\npour trouver de nouveaux amis',
                              textAlign: TextAlign.center,
                              style: theme.typography.base.copyWith(
                                color: theme.colors.mutedForeground,
                              ),
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'Tirez vers le bas pour actualiser',
                              style: theme.typography.sm.copyWith(
                                color: theme.colors.mutedForeground,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],

                    // Résultats de recherche
                    if (_searchController.text.isNotEmpty) ...[
                      if (_isSearching)
                        Container(
                          padding: const EdgeInsets.all(32),
                          child: const Center(
                            child: CircularProgressIndicator(),
                          ),
                        )
                      else if (_searchResults?.isEmpty ?? true)
                        Container(
                          padding: const EdgeInsets.all(32),
                          child: Column(
                            children: [
                              Icon(
                                FIcons.userX,
                                size: 64,
                                color: theme.colors.mutedForeground,
                              ),
                              const SizedBox(height: 16),
                              Text(
                                'Aucun utilisateur trouvé',
                                style: theme.typography.lg.copyWith(
                                  fontWeight: FontWeight.bold,
                                  color: theme.colors.foreground,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                'Essayez avec un autre terme de recherche',
                                style: theme.typography.base.copyWith(
                                  color: theme.colors.mutedForeground,
                                ),
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 16),
                              Text(
                                'Tirez vers le bas pour actualiser',
                                style: theme.typography.sm.copyWith(
                                  color: theme.colors.mutedForeground,
                                ),
                              ),
                            ],
                          ),
                        )
                      else
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Padding(
                                padding: const EdgeInsets.symmetric(
                                  vertical: 8,
                                ),
                                child: Text(
                                  '${_searchResults?.length ?? 0} résultat${(_searchResults?.length ?? 0) > 1 ? 's' : ''} trouvé${(_searchResults?.length ?? 0) > 1 ? 's' : ''}',
                                  style: theme.typography.sm.copyWith(
                                    color: theme.colors.mutedForeground,
                                  ),
                                ),
                              ),
                              ...(_searchResults ?? []).map(
                                (user) => FriendUserCard(
                                  type: FriendCardType.searchResult,
                                  user: user,
                                  theme: theme,
                                  onTap: () => _showUserProfile(
                                    user.userId,
                                    DialogContext.search,
                                  ),
                                  onAction: () =>
                                      _sendFriendshipRequest(user.userId),
                                ),
                              ),
                            ],
                          ),
                        ),
                    ],
                  ],
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  void _showUserProfile(
    int userId,
    DialogContext dialogContext, [
    FriendshipRequestModel? friendshipRequest,
  ]) async {
    final result = await showAdaptiveDialog<bool>(
      context: context,
      builder: (context) => UserProfileDialog(
        userId: userId,
        context: dialogContext,
        friendshipRequest: friendshipRequest,
      ),
    );

    if (result == true) {
      _loadInitialData();
    }
  }
}

// ==================== WIDGETS RÉUTILISABLES ====================

/// Widget réutilisable pour afficher une carte utilisateur
class FriendUserCard extends StatelessWidget {
  final FriendCardType type;
  final dynamic user; // FriendModel, UserModel, ou FriendshipRequestModel
  final FThemeData theme;
  final VoidCallback? onTap;
  final VoidCallback? onAction;
  final VoidCallback? onSecondaryAction;

  const FriendUserCard({
    super.key,
    required this.type,
    required this.user,
    required this.theme,
    this.onTap,
    this.onAction,
    this.onSecondaryAction,
  });

  @override
  Widget build(BuildContext context) {
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
                _buildAvatar(),
                const SizedBox(width: 16),
                _buildUserInfo(),
                _buildActions(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildAvatar() {
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

  Widget _buildUserInfo() {
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

  Widget _buildActions() {
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

/// Widget réutilisable pour les listes avec pull-to-refresh
class FriendListView<T> extends StatelessWidget {
  final List<T>? items;
  final bool isLoading;
  final bool isLoadingMore;
  final bool hasMore;
  final ScrollController scrollController;
  final Future<void> Function() onRefresh;
  final Widget Function(T item, int index)? itemBuilder;
  final Widget emptyStateWidget;

  const FriendListView({
    super.key,
    this.items,
    required this.isLoading,
    required this.isLoadingMore,
    required this.hasMore,
    required this.scrollController,
    required this.onRefresh,
    this.itemBuilder,
    required this.emptyStateWidget,
  });

  @override
  Widget build(BuildContext context) {
    final safeItems = items ?? [];

    if (isLoading && safeItems.isEmpty) {
      return const Center(child: CircularProgressIndicator());
    }

    if (safeItems.isEmpty && !isLoading) {
      return RefreshIndicator(
        onRefresh: onRefresh,
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: Center(child: emptyStateWidget),
        ),
      );
    }

    return RefreshIndicator(
      onRefresh: onRefresh,
      child: ListView.builder(
        controller: scrollController,
        padding: const EdgeInsets.all(16),
        itemCount: safeItems.length + (hasMore ? 1 : 0),
        itemBuilder: (context, index) {
          if (index == safeItems.length) {
            return Container(
              padding: const EdgeInsets.all(16),
              child: Center(
                child: isLoadingMore
                    ? const CircularProgressIndicator()
                    : const SizedBox.shrink(),
              ),
            );
          }

          return itemBuilder?.call(safeItems[index], index) ??
              const SizedBox.shrink();
        },
      ),
    );
  }
}

/// Widget réutilisable pour le contenu des onglets
class FriendTabContent extends StatelessWidget {
  final String title;
  final IconData icon;
  final Widget child;

  const FriendTabContent({
    super.key,
    required this.title,
    required this.icon,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return child;
  }
}

/// Widget réutilisable pour les états vides
class EmptyStateWidget extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final String? actionText;
  final FThemeData theme;

  const EmptyStateWidget({
    super.key,
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.theme,
    this.actionText,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        children: [
          const SizedBox(height: 16),
          Text(
            title,
            style: theme.typography.lg.copyWith(
              fontWeight: FontWeight.bold,
              color: theme.colors.foreground,
            ),
          ),
          Container(
            height: 200,
            padding: const EdgeInsets.all(12),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(icon, size: 64, color: theme.colors.mutedForeground),
                const SizedBox(height: 16),
                Text(
                  subtitle,
                  style: theme.typography.base.copyWith(
                    color: theme.colors.mutedForeground,
                  ),
                  textAlign: TextAlign.center,
                ),
                if (actionText != null) ...[
                  const SizedBox(height: 8),
                  Text(
                    actionText!,
                    style: theme.typography.sm.copyWith(
                      color: theme.colors.mutedForeground,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}
