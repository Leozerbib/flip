import 'package:flutter/material.dart';
import 'package:forui/forui.dart';

class AppTabBar extends StatelessWidget {
  final TabController controller;
  final List<TabBarItem> tabs;

  const AppTabBar({super.key, required this.controller, required this.tabs});

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Container(
      decoration: BoxDecoration(
        color: theme.colors.background,
        border: Border(
          bottom: BorderSide(color: theme.colors.border, width: 1),
        ),
      ),
      child: TabBar(
        controller: controller,
        labelColor: theme.colors.primary,
        unselectedLabelColor: theme.colors.mutedForeground,
        labelStyle: theme.typography.sm.copyWith(fontWeight: FontWeight.w600),
        unselectedLabelStyle: theme.typography.sm,
        indicatorColor: theme.colors.primary,
        indicatorWeight: 2,
        tabs: tabs
            .map(
              (tab) => Tab(
                icon: tab.icon != null ? Icon(tab.icon) : null,
                text: tab.text,
              ),
            )
            .toList(),
      ),
    );
  }
}

class TabBarItem {
  final IconData? icon;
  final String? text;

  const TabBarItem({this.icon, this.text});
}

class AppTabBarView extends StatelessWidget {
  final TabController controller;
  final List<Widget> children;

  const AppTabBarView({
    super.key,
    required this.controller,
    required this.children,
  });

  @override
  Widget build(BuildContext context) {
    return TabBarView(controller: controller, children: children);
  }
}
