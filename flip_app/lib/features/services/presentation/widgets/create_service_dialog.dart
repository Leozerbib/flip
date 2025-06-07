import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:forui/forui.dart';
import '../../../../core/api/services_service.dart';
import '../../../../core/api/friendship_service.dart';
import '../../../../core/api/user_service.dart';
import '../../../../core/widgets/global_alert.dart';
import '../../../../data/models/friend_model.dart';
import '../../../../data/models/user_model.dart';

class CreateServiceDialog extends StatefulWidget {
  const CreateServiceDialog({super.key});

  @override
  State<CreateServiceDialog> createState() => _CreateServiceDialogState();
}

class _CreateServiceDialogState extends State<CreateServiceDialog> {
  final _descriptionController = TextEditingController();
  final _jetonValueController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  FriendModel? _selectedFriend;
  List<FriendModel> _friends = [];
  bool _isLoading = false;
  bool _isLoadingFriends = true;
  int? _selectedCategoryId;

  @override
  void initState() {
    super.initState();
    _loadFriends();
  }

  @override
  void dispose() {
    _descriptionController.dispose();
    _jetonValueController.dispose();
    super.dispose();
  }

  Future<void> _loadFriends() async {
    try {
      final friends = await FriendshipService.getFriends(page: 1, limit: 100);
      if (mounted) {
        setState(() {
          _friends = friends ?? [];
          _isLoadingFriends = false;
        });
      }
    } catch (e) {
      setState(() => _isLoadingFriends = false);
      if (mounted) {
        AlertService.showError(
          context,
          title: 'Erreur',
          subtitle: 'Impossible de charger la liste des amis',
        );
      }
    }
  }

  void _showUserSelectionSheet() {
    showFSheet(
      context: context,
      side: FLayout.btt,
      mainAxisMaxRatio: null,
      builder: (context) => DraggableScrollableSheet(
        expand: false,
        initialChildSize: 0.7,
        minChildSize: 0.3,
        maxChildSize: 0.9,
        builder: (context, scrollController) => UserSelectionSheet(
          side: FLayout.btt,
          friends: _friends,
          selectedFriend: _selectedFriend,
          scrollController: scrollController,
          onUserSelected: (friend) {
            setState(() {
              _selectedFriend = friend;
            });
            Navigator.of(context).pop();
          },
        ),
      ),
    );
  }

  Future<void> _createService() async {
    if (!_formKey.currentState!.validate() || _selectedFriend == null) {
      return;
    }

    setState(() => _isLoading = true);

    try {
      final service = await ServicesService.createService(
        beneficiaryId: _selectedFriend!.userId,
        description: _descriptionController.text.trim(),
        jetonValue: int.tryParse(_jetonValueController.text) ?? 0,
        categoryId: _selectedCategoryId,
      );

      if (service != null) {
        if (mounted) {
          AlertService.showSuccess(
            context,
            title: 'Service créé',
            subtitle: 'Votre service a été créé avec succès',
          );
          Navigator.of(context).pop(true);
        }
      } else {
        throw Exception('Échec de la création');
      }
    } catch (e) {
      if (mounted) {
        AlertService.showError(
          context,
          title: 'Erreur',
          subtitle: 'Impossible de créer le service',
        );
      }
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return FDialog(
      direction: Axis.vertical,
      title: Text(
        'Créer un Service',
        style: theme.typography.lg.copyWith(fontWeight: FontWeight.bold),
      ),
      body: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Description
              FTextField(
                controller: _descriptionController,
                label: const Text('Description'),
                hint: 'Décrivez en détail le service demandé...',
                maxLines: 3,
                maxLength: 500,
              ),
              const SizedBox(height: 16),

              // Valeur en jetons
              FTextField(
                controller: _jetonValueController,
                label: const Text('Valeur (jetons)'),
                hint: '50',
                keyboardType: TextInputType.number,
              ),
              const SizedBox(height: 16),

              // Sélection d'ami - Nouveau bouton avec Sheet
              Text(
                'Choisir un ami',
                style: theme.typography.sm.copyWith(
                  fontWeight: FontWeight.w600,
                  color: theme.colors.foreground,
                ),
              ),
              const SizedBox(height: 8),

              if (_isLoadingFriends)
                const Center(
                  child: Padding(
                    padding: EdgeInsets.all(20),
                    child: CircularProgressIndicator(),
                  ),
                )
              else if (_friends.isEmpty)
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    border: Border.all(color: theme.colors.border),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    children: [
                      Icon(FIcons.userX, color: theme.colors.mutedForeground),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          'Aucun ami disponible.\nAjoutez des amis pour créer des services.',
                          style: theme.typography.sm.copyWith(
                            color: theme.colors.mutedForeground,
                          ),
                        ),
                      ),
                    ],
                  ),
                )
              else
                _buildUserSelectionButton(theme),
            ],
          ),
        ),
      ),
      actions: [
        FButton(
          style: FButtonStyle.outline,
          onPress: () => Navigator.of(context).pop(false),
          child: const Text('Annuler'),
        ),
        FButton(
          onPress: _isLoading || _selectedFriend == null
              ? null
              : _createService,
          child: _isLoading
              ? const SizedBox(
                  width: 16,
                  height: 16,
                  child: CircularProgressIndicator(strokeWidth: 2),
                )
              : const Text('Créer'),
        ),
      ],
    );
  }

  Widget _buildUserSelectionButton(FThemeData theme) {
    if (_selectedFriend != null) {
      // Afficher l'utilisateur sélectionné
      return GestureDetector(
        onTap: _showUserSelectionSheet,
        child: Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            border: Border.all(color: theme.colors.primary),
            borderRadius: BorderRadius.circular(8),
            color: theme.colors.primary.withOpacity(0.1),
          ),
          child: Row(
            children: [
              CircleAvatar(
                radius: 20,
                backgroundImage: _selectedFriend!.profilePictureUrl != null
                    ? NetworkImage(_selectedFriend!.profilePictureUrl!)
                    : null,
                backgroundColor: theme.colors.primary,
                child: _selectedFriend!.profilePictureUrl == null
                    ? Icon(
                        FIcons.user,
                        color: theme.colors.primaryForeground,
                        size: 16,
                      )
                    : null,
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      _selectedFriend!.username,
                      style: theme.typography.sm.copyWith(
                        fontWeight: FontWeight.w600,
                        color: theme.colors.foreground,
                      ),
                    ),
                    Text(
                      'Niveau ${_selectedFriend!.level} • ${_selectedFriend!.xpPoints} XP',
                      style: theme.typography.xs.copyWith(
                        color: theme.colors.mutedForeground,
                      ),
                    ),
                  ],
                ),
              ),
              Icon(FIcons.chevronDown, color: theme.colors.primary, size: 16),
            ],
          ),
        ),
      );
    } else {
      // Bouton de sélection
      return FButton(
        onPress: _showUserSelectionSheet,
        style: FButtonStyle.outline,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(FIcons.users, size: 16),
            const SizedBox(width: 8),
            Text('Sélectionner un ami (${_friends.length})'),
          ],
        ),
      );
    }
  }
}

class UserSelectionSheet extends StatefulWidget {
  final FLayout side;
  final List<FriendModel> friends;
  final FriendModel? selectedFriend;
  final Function(FriendModel) onUserSelected;
  final ScrollController? scrollController;

  const UserSelectionSheet({
    super.key,
    required this.side,
    required this.friends,
    required this.selectedFriend,
    required this.onUserSelected,
    this.scrollController,
  });

  @override
  State<UserSelectionSheet> createState() => _UserSelectionSheetState();
}

class _UserSelectionSheetState extends State<UserSelectionSheet> {
  final _searchController = TextEditingController();
  List<FriendModel> _filteredFriends = [];
  List<UserModel> _searchResults = [];
  bool _isSearching = false;

  @override
  void initState() {
    super.initState();
    _filteredFriends = widget.friends;
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _filterFriends(String query) async {
    if (query.isEmpty) {
      setState(() {
        _filteredFriends = widget.friends;
        _searchResults = [];
      });
      return;
    }

    // Filtrer les amis localement
    final filtered = widget.friends
        .where(
          (friend) =>
              friend.username.toLowerCase().contains(query.toLowerCase()),
        )
        .toList();

    setState(() {
      _filteredFriends = filtered;
      _isSearching = true;
    });

    // Rechercher d'autres utilisateurs
    try {
      final results = await UserService.searchUsers(query);
      if (mounted) {
        setState(() {
          _searchResults = results ?? [];
          _isSearching = false;
        });
      }
    } catch (e) {
      setState(() {
        _searchResults = [];
        _isSearching = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Material(
      color: theme.colors.background,
      borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // En-tête
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              border: Border(bottom: BorderSide(color: theme.colors.border)),
            ),
            child: Row(
              children: [
                Icon(FIcons.users, color: theme.colors.primary),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    'Sélectionner un ami',
                    style: theme.typography.lg.copyWith(
                      fontWeight: FontWeight.bold,
                      color: theme.colors.foreground,
                    ),
                  ),
                ),
                GestureDetector(
                  onTap: () => Navigator.of(context).pop(),
                  child: Icon(FIcons.x, color: theme.colors.mutedForeground),
                ),
              ],
            ),
          ),

          // Barre de recherche
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Rechercher un ami...',
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
              onChanged: _filterFriends,
              style: theme.typography.base.copyWith(
                color: theme.colors.foreground,
              ),
            ),
          ),

          // Liste des résultats
          Expanded(
            child: _isSearching
                ? const Center(child: CircularProgressIndicator())
                : _filteredFriends.isEmpty && _searchResults.isEmpty
                ? _buildEmptyState(theme)
                : _buildUserList(theme),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState(FThemeData theme) {
    return Padding(
      padding: const EdgeInsets.all(32),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(FIcons.userX, size: 48, color: theme.colors.mutedForeground),
          const SizedBox(height: 16),
          Text(
            _searchController.text.isEmpty
                ? 'Aucun ami disponible'
                : 'Aucun résultat trouvé',
            style: theme.typography.base.copyWith(
              color: theme.colors.mutedForeground,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildUserList(FThemeData theme) {
    // Filtrer les utilisateurs non-amis des résultats de recherche
    final filteredSearchResults = _searchResults
        .where(
          (user) =>
              !widget.friends.any((friend) => friend.userId == user.userId),
        )
        .toList();

    final showFriendsHeader = _filteredFriends.isNotEmpty;
    final showSearchHeader =
        filteredSearchResults.isNotEmpty && _searchController.text.isNotEmpty;

    // Calculer le nombre total d'éléments
    int totalItems = 0;
    if (showFriendsHeader) totalItems += 1 + _filteredFriends.length;
    if (showSearchHeader) totalItems += 1 + filteredSearchResults.length;

    return ScrollConfiguration(
      behavior: ScrollConfiguration.of(context).copyWith(
        dragDevices: {
          PointerDeviceKind.touch,
          PointerDeviceKind.mouse,
          PointerDeviceKind.trackpad,
        },
      ),
      child: ListView.builder(
        controller: widget.scrollController,
        itemCount: totalItems,
        itemBuilder: (context, index) {
          int currentIndex = 0;

          // Section des amis
          if (showFriendsHeader) {
            if (index == currentIndex) {
              // En-tête "Vos amis"
              return Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 8,
                ),
                child: Text(
                  'Vos amis',
                  style: theme.typography.sm.copyWith(
                    fontWeight: FontWeight.w600,
                    color: theme.colors.mutedForeground,
                  ),
                ),
              );
            }
            currentIndex++;

            if (index < currentIndex + _filteredFriends.length) {
              // Ami dans la liste
              final friendIndex = index - currentIndex;
              return _buildUserTile(_filteredFriends[friendIndex], theme, true);
            }
            currentIndex += _filteredFriends.length;
          }

          // Section des résultats de recherche
          if (showSearchHeader) {
            if (index == currentIndex) {
              // En-tête "Autres utilisateurs"
              return Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 8,
                ),
                child: Text(
                  'Autres utilisateurs',
                  style: theme.typography.sm.copyWith(
                    fontWeight: FontWeight.w600,
                    color: theme.colors.mutedForeground,
                  ),
                ),
              );
            }
            currentIndex++;

            if (index < currentIndex + filteredSearchResults.length) {
              // Utilisateur dans les résultats de recherche
              final userIndex = index - currentIndex;
              return _buildSearchUserTile(
                filteredSearchResults[userIndex],
                theme,
              );
            }
          }

          // Fallback (ne devrait jamais arriver)
          return const SizedBox.shrink();
        },
      ),
    );
  }

  Widget _buildUserTile(FriendModel friend, FThemeData theme, bool isFriend) {
    final isSelected = widget.selectedFriend?.userId == friend.userId;

    return ListTile(
      leading: CircleAvatar(
        backgroundImage: friend.profilePictureUrl != null
            ? NetworkImage(friend.profilePictureUrl!)
            : null,
        backgroundColor: theme.colors.primary,
        child: friend.profilePictureUrl == null
            ? Icon(FIcons.user, color: theme.colors.primaryForeground)
            : null,
      ),
      title: Text(
        friend.username,
        style: theme.typography.sm.copyWith(
          fontWeight: FontWeight.w500,
          color: theme.colors.foreground,
        ),
      ),
      subtitle: Text(
        'Niveau ${friend.level} • ${friend.xpPoints} XP',
        style: theme.typography.xs.copyWith(
          color: theme.colors.mutedForeground,
        ),
      ),
      trailing: isSelected
          ? Icon(FIcons.check, color: theme.colors.primary)
          : (isFriend
                ? Icon(FIcons.userCheck, color: theme.colors.primary, size: 16)
                : null),
      onTap: () => widget.onUserSelected(friend),
    );
  }

  Widget _buildSearchUserTile(UserModel user, FThemeData theme) {
    return ListTile(
      leading: CircleAvatar(
        backgroundImage: user.profilePictureUrl != null
            ? NetworkImage(user.profilePictureUrl!)
            : null,
        backgroundColor: theme.colors.mutedForeground,
        child: user.profilePictureUrl == null
            ? Icon(FIcons.user, color: theme.colors.background)
            : null,
      ),
      title: Text(
        user.username,
        style: theme.typography.sm.copyWith(
          fontWeight: FontWeight.w500,
          color: theme.colors.foreground,
        ),
      ),
      subtitle: Text(
        'Niveau ${user.level} • ${user.xpPoints} XP • Non ami',
        style: theme.typography.xs.copyWith(
          color: theme.colors.mutedForeground,
        ),
      ),
      trailing: Icon(
        FIcons.userPlus,
        color: theme.colors.mutedForeground,
        size: 16,
      ),
      onTap: () {
        // Pour les non-amis, on pourrait afficher un message ou rediriger vers l'ajout d'ami
        AlertService.showError(
          context,
          title: 'Utilisateur non ami',
          subtitle: 'Vous ne pouvez créer des services qu\'avec vos amis.',
        );
      },
    );
  }
}

// Extensions pour validation
extension FormValidation on String {
  String? validateDescription() {
    if (isEmpty) return 'La description est requise';
    if (length < 10)
      return 'La description doit contenir au moins 10 caractères';
    if (length > 500)
      return 'La description ne peut pas dépasser 500 caractères';
    return null;
  }

  String? validateJetonValue() {
    if (isEmpty) return 'La valeur est requise';
    final value = int.tryParse(this);
    if (value == null) return 'La valeur doit être un nombre';
    if (value < 1) return 'La valeur doit être supérieure à 0';
    if (value > 1000) return 'La valeur ne peut pas dépasser 1000 jetons';
    return null;
  }
}
