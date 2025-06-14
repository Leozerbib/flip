import 'package:flutter/material.dart';

class AppListView<T> extends StatelessWidget {
  final List<T>? items;
  final bool isLoading;
  final bool isLoadingMore;
  final bool hasMore;
  final ScrollController? scrollController;
  final Future<void> Function() onRefresh;
  final Widget Function(T item, int index)? itemBuilder;
  final Widget emptyStateWidget;
  final EdgeInsets? padding;
  final double itemSpacing;

  const AppListView({
    super.key,
    this.items,
    required this.isLoading,
    required this.isLoadingMore,
    required this.hasMore,
    this.scrollController,
    required this.onRefresh,
    this.itemBuilder,
    required this.emptyStateWidget,
    this.padding,
    this.itemSpacing = 12.0,
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
          child: Container(
            constraints: BoxConstraints(
              minHeight: MediaQuery.of(context).size.height - 200,
            ),
            child: Center(child: emptyStateWidget),
          ),
        ),
      );
    }

    return RefreshIndicator(
      onRefresh: onRefresh,
      child: ListView.builder(
        controller: scrollController,
        padding: padding ?? const EdgeInsets.all(16),
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

          return Padding(
            padding: EdgeInsets.only(bottom: itemSpacing),
            child:
                itemBuilder?.call(safeItems[index], index) ??
                const SizedBox.shrink(),
          );
        },
      ),
    );
  }
}

class EmptyStateWidget extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final String? actionText;
  final VoidCallback? onAction;

  const EmptyStateWidget({
    super.key,
    required this.icon,
    required this.title,
    required this.subtitle,
    this.actionText,
    this.onAction,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            height: 200,
            padding: const EdgeInsets.all(12),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  icon,
                  size: 64,
                  color: theme.colorScheme.onSurface.withOpacity(0.5),
                ),
                const SizedBox(height: 16),
                Text(
                  title,
                  style: theme.textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 8),
                Text(
                  subtitle,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurface.withOpacity(0.7),
                  ),
                  textAlign: TextAlign.center,
                ),
                if (actionText != null) ...[
                  const SizedBox(height: 16),
                  if (onAction != null)
                    ElevatedButton(
                      onPressed: onAction,
                      child: Text(actionText!),
                    )
                  else
                    Text(
                      actionText!,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.onSurface.withOpacity(0.5),
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
