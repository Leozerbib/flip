import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import '../../../../core/api/api_services.dart';
import '../../../../core/utils/logger.dart';
import '../../../../data/models/models.dart';
import '../widgets/widgets.dart';
import '../widgets/pack_opening_animation.dart' as legacy;
import '../providers/shop_providers.dart';

class ShopScreen extends ConsumerStatefulWidget {
  const ShopScreen({super.key});

  @override
  ConsumerState<ShopScreen> createState() => _ShopScreenState();
}

class _ShopScreenState extends ConsumerState<ShopScreen>
    with TickerProviderStateMixin {
  late TabController _tabController;

  // Data
  List<AwardedPrankModel> _ownedPranks = [];

  // Loading states
  bool _isLoadingInventory = false;

  // Pagination states
  bool _isLoadingMorePacks = false;
  bool _hasMorePacks = true;

  // Controllers
  final ScrollController _packsScrollController = ScrollController();
  final ScrollController _inventoryScrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _setupScrollControllers();
    AppLogger.info('Shop screen initialisé');
  }

  @override
  void dispose() {
    _tabController.dispose();
    _packsScrollController.dispose();
    _inventoryScrollController.dispose();
    super.dispose();
  }

  void _setupScrollControllers() {
    _packsScrollController.addListener(() {
      if (_packsScrollController.position.pixels >=
          _packsScrollController.position.maxScrollExtent - 200) {
        _loadMorePacks();
      }
    });
  }

  Future<void> _loadMorePacks() async {
    if (_isLoadingMorePacks || !_hasMorePacks) return;

    setState(() => _isLoadingMorePacks = true);
    try {
      // TODO: Implémenter le chargement de plus de packs
      AppLogger.info('Chargement de plus de packs - à implémenter');
    } catch (e) {
      AppLogger.error('Erreur chargement plus de packs: $e');
    } finally {
      if (mounted) {
        setState(() => _isLoadingMorePacks = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);
    final shopState = ref.watch(shopStateProvider);
    return Scaffold(
      backgroundColor: theme.colors.background,
      body: ShopScreenTabs(
        tabController: _tabController,
        packs: shopState.availablePacks,
        ownedPranks: _ownedPranks,
        isLoadingPacks: shopState.isLoading,
        isLoadingInventory: _isLoadingInventory,
        isLoadingMorePacks: _isLoadingMorePacks,
        hasMorePacks: _hasMorePacks,
        packsScrollController: _packsScrollController,
        inventoryScrollController: _inventoryScrollController,
        onRefresh: _refresh,
        onOpenPack: _handleOpenPack,
        onOpenMultiplePacks: _handleOpenMultiplePacks,
        onShowPrankDetails: _showPrankDetails,
      ),
    );
  }

  Future<void> _refresh(String type) async {
    try {
      AppLogger.info('Rafraîchissement: $type');
      if (type == 'packs') {
        await ref.read(shopStateProvider.notifier).loadPacks();
      } else if (type == 'inventory') {
        await _loadInventory();
      }
    } catch (e) {
      AppLogger.error('Erreur rafraîchissement: $e');
    }
  }

  Future<void> _loadInventory() async {
    setState(() => _isLoadingInventory = true);
    try {
      // TODO: Implémenter le chargement de l'inventaire
      AppLogger.info('Chargement inventaire - à implémenter');
      await Future.delayed(const Duration(milliseconds: 500));
    } catch (e) {
      AppLogger.error('Erreur chargement inventaire: $e');
    } finally {
      if (mounted) {
        setState(() => _isLoadingInventory = false);
      }
    }
  }

  void _showPrankDetails(int prankId) {
    AppLogger.info('Affichage détails prank: $prankId');
    // TODO: Implémenter l'affichage des détails d'un prank
  }

  Future<void> _handleOpenPack(PrankPackModel pack) async {
    try {
      AppLogger.info('Tentative d\'ouverture du pack: ${pack.name}');

      // Afficher le dialogue de confirmation avec FDialog
      final confirmed = await PackOpeningConfirmationDialog.show(context, pack);
      if (confirmed != true) return;

      // Aller directement à l'animation qui gérera le chargement
      AppLogger.info('Lancement animation pack opening');

      // L'animation gérera l'ouverture du pack en interne
      await _showPackOpeningAnimation(pack);

      // Rafraîchir les données après l'animation
      ref.read(shopStateProvider.notifier).loadPacks();
    } catch (e) {
      AppLogger.error('Erreur ouverture pack: $e');
      if (mounted) {
        _showErrorDialog(e.toString());
      }
    }
  }

  Future<void> _handleOpenMultiplePacks(PrankPackModel pack) async {
    try {
      AppLogger.info('Tentative d\'ouverture de 10 packs: ${pack.name}');

      // Afficher le dialogue de confirmation pour x10
      final confirmed = await _showMultiplePackConfirmationDialog(pack);
      if (confirmed != true) return;

      AppLogger.info('Lancement ouverture multiple de packs');

      // Ouvrir les packs via le service
      final result = await ShopService.openMultiplePrankPacks(pack.packId, 10);

      if (result != null && result.success) {
        // Lancer l'animation pour les résultats multiples
        await _showMultiplePackOpeningAnimation(result);
      } else {
        throw Exception('Échec de l\'ouverture des packs multiples');
      }

      // Rafraîchir les données après l'animation
      ref.read(shopStateProvider.notifier).loadPacks();
    } catch (e) {
      AppLogger.error('Erreur ouverture packs multiples: $e');
      if (mounted) {
        _showErrorDialog(e.toString());
      }
    }
  }

  Future<bool?> _showMultiplePackConfirmationDialog(PrankPackModel pack) async {
    final theme = FTheme.of(context);
    final totalCost = pack.costAmount * 10;

    return showAdaptiveDialog<bool>(
      context: context,
      builder: (context) => FDialog(
        title: Row(
          children: [
            Icon(FIcons.package, color: theme.colors.primary, size: 24),
            const SizedBox(width: 8),
            const Text('Ouvrir 10 packs'),
          ],
        ),
        body: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Voulez-vous vraiment ouvrir 10x ${pack.name} ?',
              style: theme.typography.base.copyWith(
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: theme.colors.secondary,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Coût total:',
                        style: theme.typography.sm.copyWith(
                          color: theme.colors.mutedForeground,
                        ),
                      ),
                      Text(
                        '$totalCost ${_getCurrencySymbol(pack.costCurrencyType)}',
                        style: theme.typography.sm.copyWith(
                          fontWeight: FontWeight.bold,
                          color: theme.colors.foreground,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Pranks attendus:',
                        style: theme.typography.sm.copyWith(
                          color: theme.colors.mutedForeground,
                        ),
                      ),
                      Text(
                        '${pack.numberOfPranksAwarded * 10} pranks',
                        style: theme.typography.sm.copyWith(
                          fontWeight: FontWeight.bold,
                          color: theme.colors.foreground,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          FButton(
            style: FButtonStyle.secondary,
            onPress: () => Navigator.of(context).pop(false),
            child: const Text('Annuler'),
          ),
          FButton(
            style: FButtonStyle.primary,
            onPress: () => Navigator.of(context).pop(true),
            child: const Text('Ouvrir x10'),
          ),
        ],
      ),
    );
  }

  String _getCurrencySymbol(CurrencyType type) {
    switch (type) {
      case CurrencyType.gameCoins:
        return '💰';
      case CurrencyType.premiumGems:
        return '💎';
      case CurrencyType.jetons:
        return '🪙';
      default:
        return '💰';
    }
  }

  Future<void> _showPackOpeningAnimation(PrankPackModel pack) async {
    await Navigator.of(context).push(
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) =>
            legacy.PackOpeningAnimation(
              pack: pack,
              awardedPranks: [], // Sera chargé en interne
              onAnimationComplete: () {
                AppLogger.info('Animation d\'ouverture terminée');
              },
              onReturnToShop: () {
                Navigator.of(context).pop();
              },
            ),
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return FadeTransition(opacity: animation, child: child);
        },
        transitionDuration: const Duration(milliseconds: 500),
      ),
    );
  }

  Future<void> _showMultiplePackOpeningAnimation(
    MultiplePackOpeningResultModel result,
  ) async {
    // Pour l'instant, on montre un dialogue avec les résultats
    // TODO: Implémenter l'animation complète plus tard
    await _showMultiplePackResults(result);
  }

  Future<void> _showMultiplePackResults(
    MultiplePackOpeningResultModel result,
  ) async {
    final theme = FTheme.of(context);

    await showAdaptiveDialog(
      context: context,
      builder: (context) => FDialog(
        title: Row(
          children: [
            Icon(FIcons.gift, color: theme.colors.primary, size: 24),
            const SizedBox(width: 8),
            const Text('Résultats d\'ouverture x10'),
          ],
        ),
        body: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Félicitations ! Vous avez obtenu :',
              style: theme.typography.base.copyWith(
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 16),
            Container(
              constraints: const BoxConstraints(maxHeight: 300),
              child: SingleChildScrollView(
                child: Column(
                  children: result.allAwardedPranks.map((prank) {
                    return Container(
                      margin: const EdgeInsets.only(bottom: 8),
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: theme.colors.secondary,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Row(
                        children: [
                          Container(
                            width: 40,
                            height: 40,
                            decoration: BoxDecoration(
                              color: _getRarityColor(prank.rarity),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Center(
                              child: Text(
                                '${prank.rarity.displayName[0]}',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  prank.name,
                                  style: theme.typography.sm.copyWith(
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                Text(
                                  prank.rarity.displayName,
                                  style: theme.typography.xs.copyWith(
                                    color: theme.colors.mutedForeground,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    );
                  }).toList(),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Text(
              'Total : ${result.allAwardedPranks.length} pranks obtenus',
              style: theme.typography.sm.copyWith(
                color: theme.colors.mutedForeground,
                fontStyle: FontStyle.italic,
              ),
            ),
          ],
        ),
        actions: [
          FButton(
            style: FButtonStyle.primary,
            onPress: () => Navigator.of(context).pop(),
            child: const Text('Formidable !'),
          ),
        ],
      ),
    );
  }

  Color _getRarityColor(PrankRarity rarity) {
    switch (rarity) {
      case PrankRarity.extreme:
        return Colors.amber.shade600;
      case PrankRarity.rare:
        return Colors.blue;
      case PrankRarity.common:
        return Colors.grey.shade600;
    }
  }

  void _showErrorDialog(String error) {
    final theme = FTheme.of(context);

    showAdaptiveDialog(
      context: context,
      builder: (context) => FDialog(
        title: Row(
          children: [
            Icon(Icons.error, color: theme.colors.destructive, size: 24),
            const SizedBox(width: 8),
            const Text('Erreur'),
          ],
        ),
        body: Text(
          error,
          style: theme.typography.base.copyWith(
            color: theme.colors.mutedForeground,
          ),
        ),
        actions: [
          FButton(
            style: FButtonStyle.primary,
            onPress: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }
}
