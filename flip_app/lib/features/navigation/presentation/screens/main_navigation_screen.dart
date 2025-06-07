import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import '../../../auth/presentation/view_models/auth_provider.dart';
import '../../../history/presentation/screens/history_screen.dart';
import '../../../friends/presentation/screens/friends_screen.dart';
import '../../../home/presentation/screens/home_screen.dart';
import '../../../services/presentation/screens/services_screen.dart';
import '../../../profile/presentation/screens/profile_screen.dart';
import '../../../settings/presentation/screens/theme_settings_screen.dart';
import '../../../../core/theme/theme_manager.dart';

class MainNavigationScreen extends ConsumerStatefulWidget {
  final int initialIndex;

  const MainNavigationScreen({
    super.key,
    this.initialIndex = 2, // Default to home (middle)
  });

  @override
  ConsumerState<MainNavigationScreen> createState() =>
      _MainNavigationScreenState();
}

class _MainNavigationScreenState extends ConsumerState<MainNavigationScreen> {
  late int _currentIndex;
  late PageController _pageController;

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.initialIndex;
    _pageController = PageController(initialPage: _currentIndex);
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
    _pageController.animateToPage(
      index,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authProvider);
    final themeManager = ref.watch(themeManagerProvider);

    return FScaffold(
      child: Column(
        children: [
          // Custom Top Bar
          TopBar(
            user: authState.user,
            onSettingsPressed: () => _showThemeSettings(context),
          ),

          // Page Content
          Expanded(
            child: PageView(
              controller: _pageController,
              onPageChanged: (index) {
                setState(() {
                  _currentIndex = index;
                });
              },
              children: const [
                HistoryScreen(),
                FriendsScreen(),
                HomeScreen(),
                ServicesScreen(),
                ProfileScreen(),
              ],
            ),
          ),

          // Forui Bottom Navigation Bar
          FBottomNavigationBar(
            index: _currentIndex,
            onChange: _onTabTapped,
            children: [
              FBottomNavigationBarItem(
                icon: const Icon(FIcons.clock),
                label: const Text('Historique'),
              ),
              FBottomNavigationBarItem(
                icon: const Icon(FIcons.users),
                label: const Text('Amis'),
              ),
              FBottomNavigationBarItem(
                icon: const Icon(FIcons.zap),
                label: const Text('Accueil'),
              ),
              FBottomNavigationBarItem(
                icon: const Icon(FIcons.grid3x3),
                label: const Text('Services'),
              ),
              FBottomNavigationBarItem(
                icon: const Icon(FIcons.user),
                label: const Text('Profil'),
              ),
            ],
          ),
        ],
      ),
    );
  }

  void _showThemeSettings(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        height: MediaQuery.of(context).size.height * 0.85,
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(20),
            topRight: Radius.circular(20),
          ),
        ),
        child: Column(
          children: [
            // Handle
            Container(
              margin: const EdgeInsets.only(top: 8),
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: Colors.grey[300],
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            // Content
            const Expanded(child: ThemeSettingsScreen()),
          ],
        ),
      ),
    );
  }
}

class TopBar extends ConsumerWidget {
  final dynamic user;
  final VoidCallback onSettingsPressed;

  const TopBar({
    super.key,
    required this.user,
    required this.onSettingsPressed,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = FTheme.of(context);
    final level = _calculateLevel(user);
    final currentExp = _getCurrentExp(user);
    final expToNext = _getExpToNextLevel(level);
    final expProgress = currentExp / expToNext;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(color: theme.colors.background),
      child: SafeArea(
        bottom: false,
        child: Center(
          child: Stack(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(vertical: 10.0),
                decoration: BoxDecoration(
                  border: Border(
                    bottom: BorderSide(color: theme.colors.border, width: 1),
                  ),
                ),
                child: Row(
                  children: [
                    // Left Section: Username, Progress Bar, Level
                    Expanded(
                      flex: 2,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Row(
                            children: [
                              Text(
                                user?.displayName ?? 'Utilisateur',
                                style: theme.typography.sm.copyWith(
                                  fontWeight: FontWeight.w600,
                                  color: theme.colors.foreground,
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                              const SizedBox(width: 8),
                              Text(
                                'Lv $level',
                                style: theme.typography.xs.copyWith(
                                  color: theme.colors.mutedForeground,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ],
                          ),

                          const SizedBox(height: 8),
                          Row(
                            children: [
                              Expanded(child: FProgress(value: expProgress)),
                            ],
                          ),
                          const SizedBox(height: 2),
                          Text(
                            '$currentExp / $expToNext XP',
                            style: theme.typography.xs.copyWith(
                              fontWeight: FontWeight.w500,
                              color: theme.colors.mutedForeground,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 10),
                    Center(
                      child: FAvatar(
                        size: 60,
                        image: user?.profilePicture != null
                            ? NetworkImage(user!.profilePicture!)
                            : const NetworkImage(''),
                      ),
                    ),
                    const SizedBox(width: 10),
                    // Right Section: Coins and Settings
                    Expanded(
                      flex: 2,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          // Coins
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 12,
                              vertical: 6,
                            ),
                            decoration: BoxDecoration(
                              color: theme.colors.secondary,
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(color: theme.colors.border),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(
                                  FIcons.circle,
                                  size: 16,
                                  color: theme.colors.primary,
                                ),
                                const SizedBox(width: 4),
                                Text(
                                  '${_getUserCoins(user)}',
                                  style: theme.typography.sm.copyWith(
                                    fontWeight: FontWeight.w600,
                                    color: theme.colors.foreground,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 12),

                          // Settings Button
                          FButton(
                            onPress: onSettingsPressed,
                            child: Icon(
                              FIcons.settings,
                              size: 20,
                              color: theme.colors.foreground,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _getUserInitials(dynamic user) {
    if (user == null) return 'U';
    final name = user.displayName ?? user.username ?? user.email ?? 'User';
    final parts = name.split(' ');
    if (parts.length >= 2) {
      return '${parts[0][0]}${parts[1][0]}'.toUpperCase();
    }
    return name.length >= 2
        ? name.substring(0, 2).toUpperCase()
        : name[0].toUpperCase();
  }

  int _calculateLevel(dynamic user) {
    // Simple level calculation based on creation date
    if (user?.createdAt == null) return 1;
    final daysSince = DateTime.now().difference(user.createdAt).inDays;
    return (daysSince / 7).floor() + 1; // Level up every week
  }

  int _getCurrentExp(dynamic user) {
    // Mock current experience
    if (user?.createdAt == null) return 50;
    final daysSince = DateTime.now().difference(user.createdAt).inDays;
    return (daysSince % 7) * 20 + 50; // 20 XP per day
  }

  int _getExpToNextLevel(int level) {
    return level * 100; // Increasing XP requirement per level
  }

  int _getUserCoins(dynamic user) {
    // Mock coins calculation
    if (user?.createdAt == null) return 220;
    final daysSince = DateTime.now().difference(user.createdAt).inDays;
    return 220 + (daysSince * 10); // 10 coins per day
  }
}
