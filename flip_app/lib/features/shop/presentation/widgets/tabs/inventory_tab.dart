import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import '../../../../../core/api/api_services.dart';
import '../../../../../core/utils/logger.dart';
import '../../../../../core/widgets/ui/pack/index.dart';
import '../../../../../data/models/models.dart';

enum ViewMode { grid, fullCard, list }

class InventoryTab extends ConsumerStatefulWidget {
  final ScrollController scrollController;
  final VoidCallback onRefresh;
  final Function(PrankPackModel pack) onOpenPack;
  final Function(PrankPackModel pack) onOpenMultiplePacks;

  const InventoryTab({
    super.key,
    required this.scrollController,
    required this.onRefresh,
    required this.onOpenPack,
    required this.onOpenMultiplePacks,
  });

  @override
  ConsumerState<InventoryTab> createState() => _InventoryTabState();
}

class _InventoryTabState extends ConsumerState<InventoryTab> {
  ViewMode _viewMode = ViewMode.grid;
  PackType? _selectedPackType;
  UserPackInventory? _inventory;
  UserPackInventoryStats? _stats;
  bool _isLoading = true;
  String? _error;

  List<UserPackInventoryItem> get _filteredPacks {
    if (_inventory == null) return [];
    if (_selectedPackType == null) {
      return _inventory!.items;
    }
    return _inventory!.items
        .where((pack) => pack.pack.packType == _selectedPackType)
        .toList();
  }

  @override
  void initState() {
    super.initState();
    _loadInventory();
  }

  Future<void> _loadInventory() async {
    try {
      setState(() {
        _isLoading = true;
        _error = null;
      });

      AppLogger.info('Chargement de l\'inventaire utilisateur');

      final inventoryFuture = UserInventoryService.getUserInventory();
      final statsFuture = UserInventoryService.getUserInventoryStats();

      final results = await Future.wait([inventoryFuture, statsFuture]);

      setState(() {
        _inventory = results[0] as UserPackInventory;
        _stats = results[1] as UserPackInventoryStats;
        _isLoading = false;
      });

      AppLogger.info('Inventaire chargé: ${_inventory!.totalPacks} packs');
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
      AppLogger.error('Erreur chargement inventaire: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Column(
      children: [
        // En-tête avec titre, compteur et sélecteur de vue
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: theme.colors.background,
            border: Border(bottom: BorderSide(color: theme.colors.border)),
          ),
          child: Column(
            children: [
              Row(
                children: [
                  Icon(FIcons.package, size: 24, color: theme.colors.primary),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Mon inventaire',
                          style: theme.typography.lg.copyWith(
                            fontWeight: FontWeight.w600,
                            color: theme.colors.foreground,
                          ),
                        ),
                        Text(
                          _isLoading
                              ? 'Chargement...'
                              : '${_filteredPacks.length} packs ${_selectedPackType != null ? '• Filtrés par ${_selectedPackType!.displayName}' : '• Collection complète'}',
                          style: theme.typography.sm.copyWith(
                            color: theme.colors.mutedForeground,
                          ),
                        ),
                      ],
                    ),
                  ),
                  // Sélecteur de mode d'affichage
                  _buildViewModeSelector(context),
                ],
              ),
              // Filtres par type de pack
              const SizedBox(height: 12),
              _buildPackTypeFilters(context),
            ],
          ),
        ),

        // Contenu selon le mode d'affichage
        Expanded(
          child: RefreshIndicator(
            onRefresh: () async {
              widget.onRefresh();
              await _loadInventory();
            },
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : _error != null
                ? _buildErrorState(context)
                : _filteredPacks.isEmpty
                ? _buildEmptyState(context)
                : _buildContentForMode(context),
          ),
        ),
      ],
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

  Widget _buildPackTypeFilters(BuildContext context) {
    final theme = FTheme.of(context);

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: [
          _buildPackTypeChip(context, 'Tous', null, _selectedPackType == null),
          const SizedBox(width: 8),
          _buildPackTypeChip(
            context,
            'Basique',
            PackType.basic,
            _selectedPackType == PackType.basic,
          ),
          const SizedBox(width: 8),
          _buildPackTypeChip(
            context,
            'Événement',
            PackType.event,
            _selectedPackType == PackType.event,
          ),
          const SizedBox(width: 8),
          _buildPackTypeChip(
            context,
            'Limité',
            PackType.limited,
            _selectedPackType == PackType.limited,
          ),
          const SizedBox(width: 8),
          _buildPackTypeChip(
            context,
            'Cadeau',
            PackType.gift,
            _selectedPackType == PackType.gift,
          ),
          const SizedBox(width: 8),
          _buildPackTypeChip(
            context,
            'Promotionnel',
            PackType.promotional,
            _selectedPackType == PackType.promotional,
          ),
        ],
      ),
    );
  }

  Widget _buildPackTypeChip(
    BuildContext context,
    String label,
    PackType? packType,
    bool isSelected,
  ) {
    final theme = FTheme.of(context);

    Color chipColor = theme.colors.secondary;
    Color textColor = theme.colors.foreground;

    if (packType != null) {
      switch (packType) {
        case PackType.basic:
          chipColor = Colors.grey.shade600;
          break;
        case PackType.event:
          chipColor = Colors.blue;
          break;
        case PackType.limited:
          chipColor = Colors.purple;
          break;
        case PackType.gift:
          chipColor = Colors.green.shade600;
          break;
        case PackType.promotional:
          chipColor = Colors.amber.shade600;
          break;
      }
      textColor = Colors.white;
    }

    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedPackType = packType;
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
          crossAxisCount: 2,
          childAspectRatio: 0.75, // Ratio pour cartes style Pokémon
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
        ),
        itemCount: _filteredPacks.length,
        itemBuilder: (context, index) {
          final packItem = _filteredPacks[index];
          return PackCard.grid(
            pack: packItem.pack,
            index: index,
            onAction: (action) {
              switch (action) {
                case PackActionType.open:
                  widget.onOpenPack(packItem.pack);
                  break;
                case PackActionType.openMultiple:
                  widget.onOpenMultiplePacks(packItem.pack);
                  break;
                case PackActionType.preview:
                case PackActionType.favorite:
                case PackActionType.details:
                  // Actions non utilisées dans ce contexte
                  break;
              }
            },
          );
        },
      ),
    );
  }

  Widget _buildFullCardView(BuildContext context) {
    return PageView.builder(
      controller: PageController(viewportFraction: 0.9),
      itemCount: _filteredPacks.length,
      itemBuilder: (context, index) {
        final packItem = _filteredPacks[index];
        return Padding(
          padding: const EdgeInsets.all(16),
          child: PackCard.showcase(
            pack: packItem.pack,
            index: index,
            onAction: (action) {
              switch (action) {
                case PackActionType.open:
                  widget.onOpenPack(packItem.pack);
                  break;
                case PackActionType.openMultiple:
                  widget.onOpenMultiplePacks(packItem.pack);
                  break;
                case PackActionType.preview:
                case PackActionType.favorite:
                case PackActionType.details:
                  // Actions non utilisées dans ce contexte
                  break;
              }
            },
          ),
        );
      },
    );
  }

  Widget _buildListView(BuildContext context) {
    return ListView.builder(
      controller: widget.scrollController,
      padding: const EdgeInsets.all(16),
      itemCount: _filteredPacks.length,
      itemBuilder: (context, index) {
        final packItem = _filteredPacks[index];
        return Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: PackCard.standard(
            pack: packItem.pack,
            index: index,
            onAction: (action) {
              switch (action) {
                case PackActionType.open:
                  widget.onOpenPack(packItem.pack);
                  break;
                case PackActionType.openMultiple:
                  widget.onOpenMultiplePacks(packItem.pack);
                  break;
                case PackActionType.preview:
                case PackActionType.favorite:
                case PackActionType.details:
                  // Actions non utilisées dans ce contexte
                  break;
              }
            },
          ),
        );
      },
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    final theme = FTheme.of(context);

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
              FIcons.package,
              size: 48,
              color: theme.colors.mutedForeground,
            ),
          ),
          const SizedBox(height: 24),
          Text(
            _selectedPackType != null
                ? 'Aucun pack ${_selectedPackType!.displayName.toLowerCase()}'
                : 'Inventaire vide',
            style: theme.typography.lg.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.colors.foreground,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            _selectedPackType != null
                ? 'Vous n\'avez pas encore de pack de ce type.\nVisitez la boutique pour en acheter !'
                : 'Votre inventaire est vide.\nAchetez des packs dans la boutique pour commencer !',
            textAlign: TextAlign.center,
            style: theme.typography.sm.copyWith(
              color: theme.colors.mutedForeground,
            ),
          ),
          const SizedBox(height: 24),
          if (_selectedPackType != null)
            FButton(
              style: FButtonStyle.secondary,
              onPress: () {
                setState(() {
                  _selectedPackType = null;
                });
              },
              child: const Text('Voir tous les packs'),
            )
          else
            FButton(
              style: FButtonStyle.primary,
              onPress: () {
                // TODO: Navigation vers la boutique
              },
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(FIcons.shoppingCart, size: 16),
                  const SizedBox(width: 8),
                  Text('Aller à la boutique'),
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
            'Impossible de charger votre inventaire.\nVérifiez votre connexion internet.',
            textAlign: TextAlign.center,
            style: theme.typography.sm.copyWith(
              color: theme.colors.mutedForeground,
            ),
          ),
          const SizedBox(height: 24),
          FButton(
            style: FButtonStyle.secondary,
            onPress: _loadInventory,
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
