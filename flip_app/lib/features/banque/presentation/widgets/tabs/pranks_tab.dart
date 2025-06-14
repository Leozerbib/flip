import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import '../../../../../core/api/api_services.dart';
import '../../../../../core/utils/logger.dart';
import '../../../../../core/widgets/ui/prank/index.dart';
import '../../../../../data/models/models.dart';

enum ViewMode { grid, fullCard, list }

enum PrankDisplayMode { allPranks, myPranks }

class PranksTab extends ConsumerStatefulWidget {
  final List<PrankModel> pranks;
  final List<ExecutedPrankWithDetailsModel> executedPranks;
  final bool isLoading;
  final bool isLoadingMore;
  final bool hasMore;
  final ScrollController scrollController;
  final VoidCallback onRefresh;
  final Function(PrankModel prank, String action) onPrankAction;

  const PranksTab({
    super.key,
    required this.pranks,
    required this.executedPranks,
    required this.isLoading,
    required this.isLoadingMore,
    required this.hasMore,
    required this.scrollController,
    required this.onRefresh,
    required this.onPrankAction,
  });

  @override
  ConsumerState<PranksTab> createState() => _PranksTabState();
}

class _PranksTabState extends ConsumerState<PranksTab>
    with AutomaticKeepAliveClientMixin {
  ViewMode _viewMode = ViewMode.grid;
  PrankDisplayMode _displayMode = PrankDisplayMode.allPranks;
  PrankRarity? _selectedRarity;

  // Cache des données utilisateur
  UserPranksCollection? _userPranksCollection;
  UserPranksStats? _userPranksStats;
  bool _isLoadingUserPranks = false;
  bool _hasLoadedUserPranks = false;
  String? _error;

  // Map pour lookup rapide des quantités
  Map<String, int> _userPrankQuantities = {};

  @override
  bool get wantKeepAlive => true; // Garde les données en mémoire

  List<PrankModel> get _filteredPranks {
    List<PrankModel> pranksToFilter;

    if (_displayMode == PrankDisplayMode.myPranks &&
        _userPranksCollection != null) {
      // Afficher seulement les pranks possédés
      pranksToFilter = widget.pranks
          .where(
            (prank) =>
                _userPrankQuantities.containsKey(prank.prankId.toString()),
          )
          .toList();
    } else {
      // Afficher tous les pranks
      pranksToFilter = widget.pranks;
    }

    if (_selectedRarity == null) {
      return pranksToFilter;
    }
    return pranksToFilter
        .where((prank) => prank.rarity == _selectedRarity)
        .toList();
  }

  @override
  void initState() {
    super.initState();
    // Charger les pranks utilisateur au premier accès
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!_hasLoadedUserPranks) {
        _loadUserPranks();
      }
    });
  }

  Future<void> _loadUserPranks() async {
    if (_isLoadingUserPranks) return;

    try {
      setState(() {
        _isLoadingUserPranks = true;
        _error = null;
      });

      AppLogger.info('Chargement collection pranks utilisateur');

      final collectionFuture = UserPranksService.getUserPranksCollection();
      final statsFuture = UserPranksService.getUserPranksStats();

      final results = await Future.wait([collectionFuture, statsFuture]);

      setState(() {
        _userPranksCollection = results[0] as UserPranksCollection;

        _userPranksStats = results[1] as UserPranksStats;
        _hasLoadedUserPranks = true;
        _isLoadingUserPranks = false;

        // Construire la map de lookup pour les quantités
        _userPrankQuantities.clear();
        for (final item in _userPranksCollection!.pranks) {
          _userPrankQuantities[item.prankId.toString()] = item.quantity;
        }
      });

      AppLogger.info(
        'Collection pranks chargée: ${_userPranksCollection!.totalPranks} pranks',
      );
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoadingUserPranks = false;
      });
      AppLogger.error('Erreur chargement collection pranks: $e');
    }
  }

  int _getUserPrankQuantity(int prankId) {
    return _userPrankQuantities[prankId.toString()] ?? 0;
  }

  bool _userOwnsPrank(int prankId) {
    return _userPrankQuantities.containsKey(prankId.toString());
  }

  @override
  Widget build(BuildContext context) {
    super.build(context); // Important for AutomaticKeepAliveClientMixin
    final theme = FTheme.of(context);

    return Column(
      children: [
        // En-tête avec titre, compteur, bouton de mode et sélecteur de vue
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: theme.colors.background,
            border: Border(bottom: BorderSide(color: theme.colors.border)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Row(
                children: [
                  Icon(FIcons.zap, size: 24, color: theme.colors.primary),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              _displayMode == PrankDisplayMode.myPranks
                                  ? 'Mes pranks'
                                  : 'Pranks disponibles',
                              style: theme.typography.lg.copyWith(
                                fontWeight: FontWeight.w600,
                                color: theme.colors.foreground,
                              ),
                            ),
                            const SizedBox(width: 8),
                            if (_isLoadingUserPranks)
                              SizedBox(
                                width: 16,
                                height: 16,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                ),
                              ),
                          ],
                        ),
                        Text(
                          _displayMode == PrankDisplayMode.myPranks
                              ? '${_filteredPranks.length} pranks possédés'
                              : '${_filteredPranks.length} pranks • ${_userPranksStats?.totalPranks ?? 0} possédés',
                          style: theme.typography.sm.copyWith(
                            color: theme.colors.mutedForeground,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              // Bouton de basculement entre modes
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  _buildModeToggleButton(theme),
                  const SizedBox(width: 8),
                  // Sélecteur de mode d'affichage
                  _buildViewModeSelector(context),
                ],
              ),

              // Filtres par rareté
              const SizedBox(height: 12),
              _buildRarityFilters(context),
            ],
          ),
        ),

        // Contenu selon le mode d'affichage
        Expanded(
          child: RefreshIndicator(
            onRefresh: () async {
              widget.onRefresh();
              await _loadUserPranks();
            },
            child: _error != null
                ? _buildErrorState(context)
                : widget.isLoading && widget.pranks.isEmpty
                ? const Center(child: CircularProgressIndicator())
                : _filteredPranks.isEmpty
                ? _buildEmptyState(context)
                : _buildContentForMode(context),
          ),
        ),
      ],
    );
  }

  Widget _buildModeToggleButton(FThemeData theme) {
    return Container(
      decoration: BoxDecoration(
        color: theme.colors.secondary,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: theme.colors.border),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildModeButton(
            theme,
            'Tous',
            PrankDisplayMode.allPranks,
            _displayMode == PrankDisplayMode.allPranks,
          ),
          _buildModeButton(
            theme,
            'Mes pranks',
            PrankDisplayMode.myPranks,
            _displayMode == PrankDisplayMode.myPranks,
          ),
        ],
      ),
    );
  }

  Widget _buildModeButton(
    FThemeData theme,
    String label,
    PrankDisplayMode mode,
    bool isSelected,
  ) {
    return GestureDetector(
      onTap: () {
        setState(() {
          _displayMode = mode;
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? theme.colors.primary : Colors.transparent,
          borderRadius: BorderRadius.circular(6),
        ),
        child: Text(
          label,
          style: theme.typography.sm.copyWith(
            color: isSelected
                ? theme.colors.primaryForeground
                : theme.colors.foreground,
            fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
          ),
        ),
      ),
    );
  }

  Widget _buildViewModeSelector(BuildContext context) {
    final theme = FTheme.of(context);

    return Container(
      decoration: BoxDecoration(
        color: theme.colors.secondary,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: theme.colors.border),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildViewModeButton(
            context,
            mode: ViewMode.grid,
            icon: FIcons.grid3x3,
            tooltip: 'Grille 3x3',
            isSelected: _viewMode == ViewMode.grid,
          ),
          _buildViewModeButton(
            context,
            mode: ViewMode.fullCard,
            icon: FIcons.maximize,
            tooltip: 'Carte pleine',
            isSelected: _viewMode == ViewMode.fullCard,
          ),
          _buildViewModeButton(
            context,
            mode: ViewMode.list,
            icon: FIcons.list,
            tooltip: 'Liste',
            isSelected: _viewMode == ViewMode.list,
          ),
        ],
      ),
    );
  }

  Widget _buildViewModeButton(
    BuildContext context, {
    required ViewMode mode,
    required IconData icon,
    required String tooltip,
    required bool isSelected,
  }) {
    final theme = FTheme.of(context);

    return Tooltip(
      message: tooltip,
      child: GestureDetector(
        onTap: () {
          setState(() {
            _viewMode = mode;
          });
        },
        child: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: isSelected ? theme.colors.primary : Colors.transparent,
            borderRadius: BorderRadius.circular(6),
          ),
          child: Icon(
            icon,
            size: 20,
            color: isSelected
                ? theme.colors.primaryForeground
                : theme.colors.mutedForeground,
          ),
        ),
      ),
    );
  }

  Widget _buildRarityFilters(BuildContext context) {
    final theme = FTheme.of(context);

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: [
          _buildRarityChip(context, 'Tous', null, _selectedRarity == null),
          const SizedBox(width: 8),
          _buildRarityChip(
            context,
            'Extrême',
            PrankRarity.extreme,
            _selectedRarity == PrankRarity.extreme,
          ),
          const SizedBox(width: 8),
          _buildRarityChip(
            context,
            'Rare',
            PrankRarity.rare,
            _selectedRarity == PrankRarity.rare,
          ),
          const SizedBox(width: 8),
          _buildRarityChip(
            context,
            'Commun',
            PrankRarity.common,
            _selectedRarity == PrankRarity.common,
          ),
        ],
      ),
    );
  }

  Widget _buildRarityChip(
    BuildContext context,
    String label,
    PrankRarity? rarity,
    bool isSelected,
  ) {
    final theme = FTheme.of(context);

    Color chipColor = theme.colors.secondary;
    Color textColor = theme.colors.foreground;

    if (rarity != null) {
      switch (rarity) {
        case PrankRarity.extreme:
          chipColor = Colors.amber.shade600;
          break;
        case PrankRarity.rare:
          chipColor = Colors.blue;
          break;
        case PrankRarity.common:
          chipColor = Colors.grey.shade600;
          break;
      }
      textColor = Colors.white;
    }

    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedRarity = rarity;
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? chipColor : chipColor.withOpacity(0.1),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: chipColor.withOpacity(0.5), width: 1),
        ),
        child: Text(
          label,
          style: theme.typography.sm.copyWith(
            fontWeight: FontWeight.w600,
            color: isSelected ? textColor : chipColor,
          ),
        ),
      ),
    );
  }

  Widget _buildContentForMode(BuildContext context) {
    switch (_viewMode) {
      case ViewMode.grid:
        return _buildGridView(context);
      case ViewMode.fullCard:
        return _buildFullCardView(context);
      case ViewMode.list:
        return _buildListView(context);
    }
  }

  Widget _buildGridView(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(0),
      child: GridView.builder(
        padding: const EdgeInsets.only(top: 16),
        controller: widget.scrollController,
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          childAspectRatio: 0.75,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
        ),
        itemCount: _filteredPranks.length + (widget.isLoadingMore ? 3 : 0),
        itemBuilder: (context, index) {
          if (index >= _filteredPranks.length) {
            return Card(
              child: Center(child: CircularProgressIndicator(strokeWidth: 2)),
            );
          }

          final prank = _filteredPranks[index];
          final quantity = _getUserPrankQuantity(prank.prankId);
          final userOwns = _userOwnsPrank(prank.prankId);

          return GestureDetector(
            onTap: () => widget.onPrankAction(prank, 'details'),
            child: _buildPrankCardWithQuantity(
              prank,
              quantity,
              userOwns,
              PrankCardViewType.compact,
            ),
          );
        },
      ),
    );
  }

  Widget _buildFullCardView(BuildContext context) {
    return PageView.builder(
      controller: PageController(viewportFraction: 0.9),
      itemCount: _filteredPranks.length,
      itemBuilder: (context, index) {
        final prank = _filteredPranks[index];
        final quantity = _getUserPrankQuantity(prank.prankId);
        final userOwns = _userOwnsPrank(prank.prankId);

        return Padding(
          padding: const EdgeInsets.all(16),
          child: _buildPrankCardWithQuantity(
            prank,
            quantity,
            userOwns,
            PrankCardViewType.normal,
          ),
        );
      },
    );
  }

  Widget _buildListView(BuildContext context) {
    return ListView.builder(
      controller: widget.scrollController,
      padding: const EdgeInsets.all(16),
      itemCount: _filteredPranks.length + (widget.isLoadingMore ? 1 : 0),
      itemBuilder: (context, index) {
        if (index == _filteredPranks.length) {
          return const Center(
            child: Padding(
              padding: EdgeInsets.all(16),
              child: CircularProgressIndicator(),
            ),
          );
        }

        final prank = _filteredPranks[index];
        final quantity = _getUserPrankQuantity(prank.prankId);
        final userOwns = _userOwnsPrank(prank.prankId);

        return Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: _buildPrankCardWithQuantity(
            prank,
            quantity,
            userOwns,
            PrankCardViewType.expanded,
          ),
        );
      },
    );
  }

  Widget _buildPrankCardWithQuantity(
    PrankModel prank,
    int quantity,
    bool userOwns,
    PrankCardViewType cardType,
  ) {
    return Opacity(
      opacity: userOwns ? 1.0 : 0.6, // Moins d'opacité si pas possédé
      child: Stack(
        children: [
          // Choisir le type de carte selon le mode d'affichage
          Padding(
            padding: const EdgeInsets.all(8),
            child: _buildPrankCardByType(prank, cardType),
          ),
          // Chip de quantité en haut à gauche
          if (quantity > 0)
            Positioned(
              top: 0,
              left: 0,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: Colors.green.shade600,
                  borderRadius: BorderRadius.circular(12),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.2),
                      blurRadius: 4,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: Text(
                  'x$quantity',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildPrankCardByType(PrankModel prank, PrankCardViewType cardType) {
    switch (cardType) {
      case PrankCardViewType.compact:
        return PrankCard.compact(
          prank: prank,
          onAction: (action) => widget.onPrankAction(prank, action),
        );
      case PrankCardViewType.normal:
        return PrankCard.normal(
          prank: prank,
          onAction: (action) => widget.onPrankAction(prank, action),
        );
      case PrankCardViewType.expanded:
        return PrankCard.expanded(
          prank: prank,
          onAction: (action) => widget.onPrankAction(prank, action),
        );
      case PrankCardViewType.pokemon:
        return PrankCard.pokemon(
          prank: prank,
          onAction: (action) => widget.onPrankAction(prank, action),
        );
      case PrankCardViewType.minimal:
        return PrankCard.minimal(
          prank: prank,
          onAction: (action) => widget.onPrankAction(prank, action),
        );
    }
  }

  Widget _buildEmptyState(BuildContext context) {
    final theme = FTheme.of(context);

    String title, description;
    if (_displayMode == PrankDisplayMode.myPranks) {
      title = _selectedRarity != null
          ? 'Aucun prank ${_selectedRarity!.displayName.toLowerCase()}'
          : 'Aucun prank possédé';
      description = _selectedRarity != null
          ? 'Vous ne possédez aucun prank de cette rareté.'
          : 'Vous ne possédez encore aucun prank.\nOuvrez des packs pour commencer votre collection !';
    } else {
      title = 'Aucun prank disponible';
      description =
          'Aucun prank n\'est actuellement disponible.\nRevenez plus tard pour découvrir de nouveaux pranks !';
    }

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: theme.colors.secondary.withOpacity(0.5),
              shape: BoxShape.circle,
            ),
            child: Icon(
              FIcons.zap,
              size: 48,
              color: theme.colors.mutedForeground,
            ),
          ),
          const SizedBox(height: 24),
          Text(
            title,
            style: theme.typography.lg.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.colors.foreground,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            description,
            textAlign: TextAlign.center,
            style: theme.typography.sm.copyWith(
              color: theme.colors.mutedForeground,
            ),
          ),
          const SizedBox(height: 24),
          if (_displayMode == PrankDisplayMode.myPranks &&
              _selectedRarity != null)
            FButton(
              style: FButtonStyle.secondary,
              onPress: () {
                setState(() {
                  _selectedRarity = null;
                });
              },
              child: const Text('Voir tous mes pranks'),
            )
          else if (_displayMode == PrankDisplayMode.myPranks)
            FButton(
              style: FButtonStyle.primary,
              onPress: () =>
                  setState(() => _displayMode = PrankDisplayMode.allPranks),
              child: const Text('Voir tous les pranks'),
            )
          else
            FButton(
              style: FButtonStyle.secondary,
              onPress: widget.onRefresh,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(FIcons.refreshCw, size: 16),
                  const SizedBox(width: 8),
                  Text('Actualiser'),
                ],
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildErrorState(BuildContext context) {
    final theme = FTheme.of(context);

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: theme.colors.destructive.withOpacity(0.1),
              shape: BoxShape.circle,
            ),
            child: Icon(FIcons.x, size: 48, color: theme.colors.destructive),
          ),
          const SizedBox(height: 24),
          Text(
            'Erreur de chargement',
            style: theme.typography.lg.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.colors.foreground,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Impossible de charger vos pranks.\nVérifiez votre connexion internet.',
            textAlign: TextAlign.center,
            style: theme.typography.sm.copyWith(
              color: theme.colors.mutedForeground,
            ),
          ),
          const SizedBox(height: 24),
          FButton(
            style: FButtonStyle.secondary,
            onPress: _loadUserPranks,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(FIcons.refreshCw, size: 16),
                const SizedBox(width: 8),
                Text('Réessayer'),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
