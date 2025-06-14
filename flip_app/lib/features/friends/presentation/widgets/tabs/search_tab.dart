import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../../core/widgets/ui/user/userCard.dart';
import '../../../../../data/models/friend_model.dart';
import '../../../../../data/models/user_model.dart';

class SearchTab extends StatelessWidget {
  final TextEditingController searchController;
  final List<FriendModel> suggestions;
  final List<UserModel> searchResults;
  final bool isSearching;
  final Future<void> Function() onRefresh;
  final Function(String query) onSearchUsers;
  final Function(int userId) onShowUserProfile;
  final Function(int userId) onSendFriendshipRequest;

  const SearchTab({
    super.key,
    required this.searchController,
    required this.suggestions,
    required this.searchResults,
    required this.isSearching,
    required this.onRefresh,
    required this.onSearchUsers,
    required this.onShowUserProfile,
    required this.onSendFriendshipRequest,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Column(
      children: [
        // Barre de recherche fixe en haut
        Container(
          padding: const EdgeInsets.all(8),
          child: TextField(
            controller: searchController,
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
            onChanged: onSearchUsers,
            style: theme.typography.base.copyWith(
              color: theme.colors.foreground,
            ),
          ),
        ),

        // Contenu avec pull-to-refresh
        Expanded(
          child: RefreshIndicator(
            onRefresh: onRefresh,
            child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              child: Container(
                constraints: BoxConstraints(
                  minHeight: MediaQuery.of(context).size.height - 200,
                ),
                child: Column(
                  children: [
                    // Suggestions d'amis
                    if ((suggestions.isNotEmpty) &&
                        searchController.text.isEmpty) ...[
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
                            ...suggestions.map(
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
                                onTap: () =>
                                    onShowUserProfile(suggestion.userId),
                                onAction: () =>
                                    onSendFriendshipRequest(suggestion.userId),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],

                    // État vide par défaut quand aucune recherche
                    if (suggestions.isEmpty &&
                        searchController.text.isEmpty) ...[
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
                    if (searchController.text.isNotEmpty) ...[
                      if (isSearching)
                        Container(
                          padding: const EdgeInsets.all(32),
                          child: const Center(
                            child: CircularProgressIndicator(),
                          ),
                        )
                      else if (searchResults.isEmpty)
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
                                  '${searchResults.length} résultat${searchResults.length > 1 ? 's' : ''} trouvé${searchResults.length > 1 ? 's' : ''}',
                                  style: theme.typography.sm.copyWith(
                                    color: theme.colors.mutedForeground,
                                  ),
                                ),
                              ),
                              ...searchResults.map(
                                (user) => FriendUserCard(
                                  type: FriendCardType.searchResult,
                                  user: user,
                                  onTap: () => onShowUserProfile(user.userId),
                                  onAction: () =>
                                      onSendFriendshipRequest(user.userId),
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
}
