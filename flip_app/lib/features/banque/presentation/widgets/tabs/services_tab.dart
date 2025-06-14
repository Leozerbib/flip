import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../../data/models/models.dart';
import '../cards/service_card.dart';

class ServicesTab extends StatelessWidget {
  final List<ServiceModel> services;
  final bool isLoading;
  final bool isLoadingMore;
  final bool hasMore;
  final bool isSearching;
  final TextEditingController searchController;
  final ScrollController scrollController;
  final VoidCallback onRefresh;
  final Function(String query) onSearch;
  final VoidCallback onCreate;
  final Function(ServiceModel service, String action) onServiceAction;

  const ServicesTab({
    super.key,
    required this.services,
    required this.isLoading,
    required this.isLoadingMore,
    required this.hasMore,
    required this.isSearching,
    required this.searchController,
    required this.scrollController,
    required this.onRefresh,
    required this.onSearch,
    required this.onCreate,
    required this.onServiceAction,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Column(
      children: [
        // Header avec recherche et bouton créer
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: theme.colors.background,
            border: Border(bottom: BorderSide(color: theme.colors.border)),
          ),
          child: Column(
            children: [
              // Barre de recherche
              TextField(
                controller: searchController,
                decoration: InputDecoration(
                  hintText: 'Rechercher des services...',
                  prefixIcon: Icon(FIcons.search),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                onChanged: onSearch,
              ),

              const SizedBox(height: 12),

              // Bouton créer service
              SizedBox(
                width: double.infinity,
                child: FButton(
                  style: FButtonStyle.primary,
                  onPress: onCreate,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(FIcons.plus, size: 16),
                      const SizedBox(width: 8),
                      Text('Créer un service'),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),

        // Liste des services
        Expanded(
          child: RefreshIndicator(
            onRefresh: () async => onRefresh(),
            child: isLoading && services.isEmpty
                ? const Center(child: CircularProgressIndicator())
                : services.isEmpty
                ? _buildEmptyState(context)
                : ListView.builder(
                    controller: scrollController,
                    padding: const EdgeInsets.all(16),
                    itemCount: services.length + (isLoadingMore ? 1 : 0),
                    itemBuilder: (context, index) {
                      if (index == services.length) {
                        return const Center(
                          child: Padding(
                            padding: EdgeInsets.all(16),
                            child: CircularProgressIndicator(),
                          ),
                        );
                      }

                      final service = services[index];
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: ServiceCard(
                          service: service,
                          onAction: (action) =>
                              onServiceAction(service, action),
                        ),
                      );
                    },
                  ),
          ),
        ),
      ],
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    final theme = FTheme.of(context);

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(FIcons.briefcase, size: 64, color: theme.colors.mutedForeground),
          const SizedBox(height: 16),
          Text(
            'Aucun service trouvé',
            style: theme.typography.lg.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.colors.foreground,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Créez votre premier service ou\najustez vos critères de recherche',
            textAlign: TextAlign.center,
            style: theme.typography.sm.copyWith(
              color: theme.colors.mutedForeground,
            ),
          ),
          const SizedBox(height: 24),
          FButton(
            style: FButtonStyle.primary,
            onPress: onCreate,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(FIcons.plus, size: 16),
                const SizedBox(width: 8),
                Text('Créer un service'),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
