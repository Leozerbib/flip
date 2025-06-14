import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../core/widgets/ui/component/tabs.dart';
import '../../../../core/widgets/ui/pack/index.dart';
import '../../../../data/models/models.dart';
import 'tabs/prank_packs_tab.dart';
import 'tabs/inventory_tab.dart';

class ShopScreenTabs extends StatelessWidget {
  final TabController tabController;

  // Data
  final PacksByTypeModel? packs;
  final List<AwardedPrankModel> ownedPranks;

  // Loading states
  final bool isLoadingPacks;
  final bool isLoadingInventory;

  // Pagination states
  final bool isLoadingMorePacks;
  final bool hasMorePacks;

  // Controllers
  final ScrollController packsScrollController;
  final ScrollController inventoryScrollController;

  // Callbacks
  final Future<void> Function(String type) onRefresh;
  final Function(PrankPackModel pack) onOpenPack;
  final Function(PrankPackModel pack) onOpenMultiplePacks;
  final Function(int prankId) onShowPrankDetails;

  const ShopScreenTabs({
    super.key,
    required this.tabController,
    required this.packs,
    required this.ownedPranks,
    required this.isLoadingPacks,
    required this.isLoadingInventory,
    required this.isLoadingMorePacks,
    required this.hasMorePacks,
    required this.packsScrollController,
    required this.inventoryScrollController,
    required this.onRefresh,
    required this.onOpenPack,
    required this.onOpenMultiplePacks,
    required this.onShowPrankDetails,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Tabs avec Forui styling
        AppTabBar(
          controller: tabController,
          tabs: const [
            TabBarItem(icon: FIcons.shoppingBag, text: 'Packs'),
            TabBarItem(icon: FIcons.package, text: 'Inventaire'),
          ],
        ),

        // Content
        Expanded(
          child: AppTabBarView(
            controller: tabController,
            children: [
              PrankPacksTab(
                packsGrouped: packs,
                isLoading: isLoadingPacks,
                isLoadingMore: isLoadingMorePacks,
                hasMore: hasMorePacks,
                scrollController: packsScrollController,
                onRefresh: () => onRefresh('packs'),
                onOpenPack: onOpenPack,
                onOpenMultiplePacks: onOpenMultiplePacks,
              ),

              InventoryTab(
                scrollController: inventoryScrollController,
                onRefresh: () => onRefresh('inventory'),
                onOpenPack: onOpenPack,
                onOpenMultiplePacks: onOpenMultiplePacks,
              ),
            ],
          ),
        ),
      ],
    );
  }
}
