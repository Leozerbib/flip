import 'package:flip_app/core/api/banque_service.dart';
import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../core/widgets/ui/component/tabs.dart';
import '../../../../data/models/models.dart';
import 'tabs/services_tab.dart';
import 'tabs/pranks_tab.dart';
import 'tabs/stats_tab.dart';

class BanqueScreenTabs extends StatelessWidget {
  final TabController tabController;

  // Data
  final List<ServiceModel> services;
  final List<PrankModel> pranks;
  final List<ExecutedPrankWithDetailsModel> executedPranks;
  final BanqueStatsModel? stats;
  final UserBalanceModel? balance;

  // Loading states
  final bool isLoadingServices;
  final bool isLoadingPranks;
  final bool isLoadingStats;
  final bool isSearching;

  // Pagination states
  final bool isLoadingMoreServices;
  final bool isLoadingMorePranks;
  final bool hasMoreServices;
  final bool hasMorePranks;

  // Controllers
  final TextEditingController searchController;
  final ScrollController servicesScrollController;
  final ScrollController pranksScrollController;
  final ScrollController executedPranksScrollController;

  // Callbacks
  final Future<void> Function(String type) onRefresh;
  final Function(String query) onSearchServices;
  final VoidCallback onCreateService;
  final Function(ServiceModel service, String action) onServiceAction;
  final Function(PrankModel prank, String action) onPrankAction;

  const BanqueScreenTabs({
    super.key,
    required this.tabController,
    required this.services,
    required this.pranks,
    required this.executedPranks,
    required this.stats,
    required this.balance,
    required this.isLoadingServices,
    required this.isLoadingPranks,
    required this.isLoadingStats,
    required this.isSearching,
    required this.isLoadingMoreServices,
    required this.isLoadingMorePranks,
    required this.hasMoreServices,
    required this.hasMorePranks,
    required this.searchController,
    required this.servicesScrollController,
    required this.pranksScrollController,
    required this.executedPranksScrollController,
    required this.onRefresh,
    required this.onSearchServices,
    required this.onCreateService,
    required this.onServiceAction,
    required this.onPrankAction,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Column(
      children: [
        // Tabs avec Forui styling
        AppTabBar(
          controller: tabController,
          tabs: const [
            TabBarItem(icon: FIcons.briefcase),
            TabBarItem(icon: FIcons.zap),
            TabBarItem(icon: FIcons.activity),
          ],
        ),

        // Content
        Expanded(
          child: Container(
            color: theme.colors.background,
            padding: const EdgeInsets.all(2),
            width: double.infinity,
            height: double.infinity,
            child: AppTabBarView(
              controller: tabController,
              children: [
                ServicesTab(
                  services: services,
                  isLoading: isLoadingServices,
                  isLoadingMore: isLoadingMoreServices,
                  hasMore: hasMoreServices,
                  isSearching: isSearching,
                  searchController: searchController,
                  scrollController: servicesScrollController,
                  onRefresh: () => onRefresh('services'),
                  onSearch: onSearchServices,
                  onCreate: onCreateService,
                  onServiceAction: onServiceAction,
                ),

                PranksTab(
                  pranks: pranks,
                  executedPranks: executedPranks,
                  isLoading: isLoadingPranks,
                  isLoadingMore: isLoadingMorePranks,
                  hasMore: hasMorePranks,
                  scrollController: pranksScrollController,
                  onRefresh: () => onRefresh('pranks'),
                  onPrankAction: onPrankAction,
                ),

                StatsTab(
                  stats: stats,
                  balance: balance,
                  isLoading: isLoadingStats,
                  onRefresh: () => onRefresh('stats'),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
