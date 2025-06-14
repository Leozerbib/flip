import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../core/api/friendship_service.dart';
import '../../../../core/api/user_service.dart';
import '../../../../core/utils/logger.dart';
import '../../../../core/widgets/global_alert.dart';
import '../../../../core/widgets/ui/user_profile_dialog.dart'
    as UserProfileDialogModule;
import '../../../../data/models/friend_model.dart';
import '../../../../data/models/friendship_request_model.dart';
import '../../../../data/models/friendship_stats_model.dart';
import '../../../../data/models/user_model.dart';
import '../widgets/friends_screen_tabs.dart';

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
    setState(() => _isLoadingFriends = true);
    setState(() => _isLoadingRequests = true);
    setState(() => _isLoadingStats = true);
    await Future.delayed(const Duration(milliseconds: 400));
    if (!mounted) return;
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
      if (mounted) {
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
      if (mounted) {
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
      if (mounted) {
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
      AppLogger.error('Erreur rafraîchissement: $e');
    }
  }

  Future<void> _refreshSearchContent() async {
    try {
      if (_searchController.text.isNotEmpty) {
        await _searchUsers(_searchController.text);
      } else {
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

  void _showUserProfile(int userId, [dynamic friendshipRequest]) async {
    UserProfileDialogModule.DialogContext dialogContext;

    // Déterminer le contexte basé sur l'onglet actuel
    switch (_tabController.index) {
      case 0:
        dialogContext = UserProfileDialogModule.DialogContext.friends;
        break;
      case 1:
        dialogContext = UserProfileDialogModule.DialogContext.receivedRequests;
        break;
      case 2:
        dialogContext = UserProfileDialogModule.DialogContext.sentRequests;
        break;
      case 3:
        dialogContext = UserProfileDialogModule.DialogContext.search;
        break;
      default:
        dialogContext = UserProfileDialogModule.DialogContext.search;
    }

    final result = await showAdaptiveDialog<bool>(
      context: context,
      builder: (context) => UserProfileDialogModule.UserProfileDialog(
        userId: userId,
        context: dialogContext,
        friendshipRequest: friendshipRequest is FriendshipRequestModel
            ? friendshipRequest
            : null,
      ),
    );

    if (result == true) {
      _loadInitialData();
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Scaffold(
      backgroundColor: theme.colors.background,
      body: FriendsScreenTabs(
        tabController: _tabController,
        friends: _friends,
        receivedRequests: _receivedRequests,
        sentRequests: _sentRequests,
        suggestions: _suggestions,
        searchResults: _searchResults,
        isLoadingFriends: _isLoadingFriends,
        isLoadingRequests: _isLoadingRequests,
        isSearching: _isSearching,
        isLoadingMoreFriends: _isLoadingMoreFriends,
        isLoadingMoreReceived: _isLoadingMoreReceived,
        isLoadingMoreSent: _isLoadingMoreSent,
        hasMoreFriends: _hasMoreFriends,
        hasMoreReceived: _hasMoreReceived,
        hasMoreSent: _hasMoreSent,
        searchController: _searchController,
        friendsScrollController: _friendsScrollController,
        receivedScrollController: _receivedScrollController,
        sentScrollController: _sentScrollController,
        onRefresh: _refresh,
        onSearchUsers: _searchUsers,
        onSendFriendshipRequest: _sendFriendshipRequest,
        onAcceptRequest: _acceptRequest,
        onDeclineRequest: _declineRequest,
        onRemoveFriend: _removeFriend,
        onShowUserProfile: _showUserProfile,
      ),
    );
  }
}
