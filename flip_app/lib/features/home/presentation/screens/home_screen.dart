import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import 'package:flip_app/core/theme/theme_manager.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen>
    with TickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _showCreateDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Que souhaitez-vous créer ?'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            FButton(
              style: FButtonStyle.primary,
              onPress: () {
                Navigator.of(context).pop();
                // TODO: Naviguer vers la création de service
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(FIcons.hand, color: Colors.white),
                  const SizedBox(width: 8),
                  const Text('Créer un service'),
                ],
              ),
            ),
            const SizedBox(height: 16),
            FButton(
              style: FButtonStyle.secondary,
              onPress: () {
                Navigator.of(context).pop();
                // TODO: Naviguer vers la création de prank
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(FIcons.smile, color: Colors.white),
                  const SizedBox(width: 8),
                  const Text('Créer un prank'),
                ],
              ),
            ),
          ],
        ),
        actions: [
          FButton(
            style: FButtonStyle.outline,
            onPress: () => Navigator.of(context).pop(),
            child: const Text('Annuler'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final themeManager = ref.watch(themeManagerProvider);
    final colors = themeManager.currentTheme.colors;
    final typography = themeManager.currentTheme.typography;

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            // TabBar en haut
            Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: 16.0,
                vertical: 12,
              ),
              child: Container(
                decoration: BoxDecoration(
                  color: colors.background,
                  borderRadius: BorderRadius.circular(32),
                  boxShadow: [
                    BoxShadow(
                      color: colors.primary.withOpacity(0.08),
                      blurRadius: 8,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: TabBar(
                  controller: _tabController,
                  indicator: BoxDecoration(
                    borderRadius: BorderRadius.circular(32),
                    gradient: LinearGradient(
                      colors: [
                        _tabController.index == 0
                            ? const Color(0xFF3EC6FF)
                            : const Color(0xFFB388FF),
                        _tabController.index == 0
                            ? const Color(0xFF3EC6FF)
                            : const Color(0xFFB388FF),
                      ],
                    ),
                  ),
                  labelColor: Colors.white,
                  unselectedLabelColor: colors.foreground.withOpacity(0.7),
                  tabs: const [
                    Tab(
                      child: Text(
                        'Créer un service',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                    Tab(
                      child: Text(
                        'Créer un prank',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                  onTap: (index) {
                    setState(() {}); // Pour rafraîchir le gradient
                  },
                ),
              ),
            ),
            const Spacer(),
            // Bouton central pastille
            Center(
              child: GestureDetector(
                onTap: _showCreateDialog,
                child: Container(
                  width: 180,
                  height: 180,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: const LinearGradient(
                      begin: Alignment.centerLeft,
                      end: Alignment.centerRight,
                      colors: [
                        Color(0xFF3EC6FF), // Bleu service
                        Color(0xFFB388FF), // Violet prank
                      ],
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: colors.primary.withOpacity(0.18),
                        blurRadius: 24,
                        spreadRadius: 2,
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      // Moitié gauche : service (bleu)
                      Expanded(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(FIcons.hand, size: 56, color: Colors.white),
                            const SizedBox(height: 8),
                            Text(
                              'Service',
                              style: typography.sm.copyWith(
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),
                      ),
                      // Moitié droite : prank (violet)
                      Expanded(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(FIcons.smile, size: 56, color: Colors.white),
                            const SizedBox(height: 8),
                            Text(
                              'Prank',
                              style: typography.sm.copyWith(
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const Spacer(),
            // Texte d'accueil
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Column(
                children: [
                  Text(
                    'Bienvenue sur Flip',
                    style: typography.xl3.copyWith(
                      fontWeight: FontWeight.bold,
                      color: colors.foreground,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Créez, partagez et amusez-vous avec vos amis !',
                    style: typography.lg.copyWith(
                      color: colors.foreground.withOpacity(0.7),
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}
