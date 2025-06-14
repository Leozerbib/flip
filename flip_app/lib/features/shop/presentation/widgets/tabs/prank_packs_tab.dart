import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import '../../../../../core/utils/logger.dart';
import '../../../../../core/widgets/ui/pack/index.dart';
import '../../../../../data/models/models.dart';

class PrankPacksTab extends ConsumerStatefulWidget {
  final PacksByTypeModel? packsGrouped;
  final bool isLoading;
  final bool isLoadingMore;
  final bool hasMore;
  final ScrollController scrollController;
  final VoidCallback onRefresh;
  final Function(PrankPackModel pack) onOpenPack;
  final Function(PrankPackModel pack) onOpenMultiplePacks;

  const PrankPacksTab({
    super.key,
    required this.packsGrouped,
    required this.isLoading,
    required this.isLoadingMore,
    required this.hasMore,
    required this.scrollController,
    required this.onRefresh,
    required this.onOpenPack,
    required this.onOpenMultiplePacks,
  });

  @override
  ConsumerState<PrankPacksTab> createState() => _PrankPacksTabState();
}

class _PrankPacksTabState extends ConsumerState<PrankPacksTab>
    with TickerProviderStateMixin {
  late Map<PackType, AnimationController> _controllers;
  late Map<PackType, Animation<double>> _animations;
  late Map<PackType, bool> _expandedStates;

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
  }

  void _initializeAnimations() {
    _controllers = {};
    _animations = {};
    _expandedStates = {};

    for (final type in PackType.values) {
      final controller = AnimationController(
        duration: const Duration(milliseconds: 300),
        vsync: this,
      );
      _controllers[type] = controller;
      _animations[type] = CurvedAnimation(
        parent: controller,
        curve: Curves.easeInOut,
      );
      _expandedStates[type] = false;
      controller.value = 0.0;
    }
  }

  @override
  void dispose() {
    for (final controller in _controllers.values) {
      controller.dispose();
    }
    super.dispose();
  }

  void _toggleSection(PackType type) {
    setState(() {
      _expandedStates[type] = !_expandedStates[type]!;
    });
    _controllers[type]!.toggle();
  }

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Column(
      children: [
        // En-tête avec titre et compteur
        _buildHeader(theme),

        // Contenu principal - toujours groupé
        Expanded(
          child: RefreshIndicator(
            onRefresh: () async {
              AppLogger.info('Rafraîchissement des packs');
              widget.onRefresh();
            },
            child:
                widget.isLoading &&
                    (widget.packsGrouped?.allPacks.isEmpty ?? true)
                ? const Center(child: CircularProgressIndicator())
                : (widget.packsGrouped?.allPacks.isEmpty ?? true)
                ? _buildEmptyState(context)
                : _buildCollapsibleGroupsView(context),
          ),
        ),
      ],
    );
  }

  Widget _buildHeader(FThemeData theme) {
    final totalPacks = widget.packsGrouped?.allPacks.length ?? 0;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            theme.colors.background,
            theme.colors.background.withOpacity(0.8),
          ],
        ),
        border: Border(bottom: BorderSide(color: theme.colors.border)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: theme.colors.primary.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(
              FIcons.shoppingBag,
              size: 24,
              color: theme.colors.primary,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Collection de Packs',
                  style: theme.typography.lg.copyWith(
                    fontWeight: FontWeight.w600,
                    color: theme.colors.foreground,
                  ),
                ),
                Text(
                  '$totalPacks packs disponibles • Organisés par catégorie',
                  style: theme.typography.sm.copyWith(
                    color: theme.colors.mutedForeground,
                  ),
                ),
              ],
            ),
          ),
          _buildTypeIndicators(theme),
        ],
      ),
    );
  }

  Widget _buildTypeIndicators(FThemeData theme) {
    if (widget.packsGrouped == null) return const SizedBox.shrink();

    final packsGrouped = widget.packsGrouped!;
    final types = <MapEntry<PackType, int>>[
      MapEntry(PackType.basic, packsGrouped.basic.length),
      MapEntry(PackType.event, packsGrouped.event.length),
      MapEntry(PackType.limited, packsGrouped.limited.length),
      MapEntry(PackType.gift, packsGrouped.gift.length),
      MapEntry(PackType.promotional, packsGrouped.promotional.length),
    ].where((entry) => entry.value > 0).toList();

    return Wrap(
      spacing: 6,
      children: types.map((entry) {
        final colors = _getTypeTheme(entry.key);
        return Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [colors.primary, colors.secondary],
            ),
            borderRadius: BorderRadius.circular(12),
            boxShadow: [
              BoxShadow(
                color: colors.primary.withOpacity(0.3),
                blurRadius: 4,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Text(
            '${entry.value}',
            style: theme.typography.xs.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildCollapsibleGroupsView(BuildContext context) {
    final packsGrouped = widget.packsGrouped!;
    final theme = FTheme.of(context);

    final sections = [
      if (packsGrouped.basic.isNotEmpty)
        _PackSection(
          'Packs Basiques',
          packsGrouped.basic,
          PackType.basic,
          '⚡',
          'Cartes de démarrage pour tous les joueurs',
        ),
      if (packsGrouped.event.isNotEmpty)
        _PackSection(
          'Packs Événement',
          packsGrouped.event,
          PackType.event,
          '🎉',
          'Éditions limitées pour les événements spéciaux',
        ),
      if (packsGrouped.limited.isNotEmpty)
        _PackSection(
          'Packs Limités',
          packsGrouped.limited,
          PackType.limited,
          '🔥',
          'Collections rares à durée limitée',
        ),
      if (packsGrouped.gift.isNotEmpty)
        _PackSection(
          'Packs Cadeaux',
          packsGrouped.gift,
          PackType.gift,
          '🎁',
          'Cadeaux spéciaux et récompenses',
        ),
      if (packsGrouped.promotional.isNotEmpty)
        _PackSection(
          'Packs Promotionnels',
          packsGrouped.promotional,
          PackType.promotional,
          '💎',
          'Offres promotionnelles exceptionnelles',
        ),
    ];

    return SingleChildScrollView(
      controller: widget.scrollController,
      child: Column(
        children: [
          ...sections.map(
            (section) => _buildCollapsibleSection(section, theme),
          ),

          // Indicateur de chargement
          if (widget.isLoadingMore)
            Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                children: [
                  const CircularProgressIndicator(),
                  const SizedBox(height: 8),
                  Text(
                    'Chargement de nouveaux packs...',
                    style: theme.typography.sm.copyWith(
                      color: theme.colors.mutedForeground,
                    ),
                  ),
                ],
              ),
            ),

          // Espace final
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  Widget _buildCollapsibleSection(_PackSection section, FThemeData theme) {
    final colors = _getTypeTheme(section.type);
    final isExpanded = _expandedStates[section.type]!;
    final animation = _animations[section.type]!;

    return Container(
      margin: const EdgeInsets.fromLTRB(0, 8, 0, 8),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            colors.primary.withOpacity(0.05),
            colors.secondary.withOpacity(0.02),
          ],
        ),
        border: Border.all(color: colors.primary.withOpacity(0.2), width: 1),
        boxShadow: [
          BoxShadow(
            color: colors.primary.withOpacity(0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // En-tête cliquable
          Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: () => _toggleSection(section.type),
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(16),
              ),
              child: Container(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [
                    // Icône avec gradient
                    Container(
                      width: 48,
                      height: 48,
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: [colors.primary, colors.secondary],
                        ),
                        borderRadius: BorderRadius.circular(12),
                        boxShadow: [
                          BoxShadow(
                            color: colors.primary.withOpacity(0.3),
                            blurRadius: 8,
                            offset: const Offset(0, 2),
                          ),
                        ],
                      ),
                      child: Center(
                        child: Text(
                          section.emoji,
                          style: const TextStyle(fontSize: 24),
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),

                    // Texte principal
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Text(
                                section.title,
                                style: theme.typography.base.copyWith(
                                  fontWeight: FontWeight.bold,
                                  color: colors.primary,
                                ),
                              ),
                              const SizedBox(width: 8),
                              Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 8,
                                  vertical: 2,
                                ),
                                decoration: BoxDecoration(
                                  color: colors.primary.withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Text(
                                  '${section.packs.length}',
                                  style: theme.typography.xs.copyWith(
                                    color: colors.primary,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 4),
                          Text(
                            section.description,
                            style: theme.typography.sm.copyWith(
                              color: theme.colors.mutedForeground,
                            ),
                          ),
                        ],
                      ),
                    ),

                    // Icône d'expansion
                    AnimatedRotation(
                      turns: isExpanded ? 0.5 : 0,
                      duration: const Duration(milliseconds: 300),
                      child: Icon(
                        FIcons.chevronDown,
                        color: colors.primary,
                        size: 20,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Contenu collapsible
          AnimatedBuilder(
            animation: animation,
            builder: (context, child) => FCollapsible(
              value: animation.value,
              child: _buildSectionContent(section, theme),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionContent(_PackSection section, FThemeData theme) {
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
      child: GridView.builder(
        padding: const EdgeInsets.fromLTRB(0, 8, 0, 8),
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          childAspectRatio: 0.65,
        ),
        itemCount: section.packs.length,
        itemBuilder: (context, index) {
          final pack = section.packs[index];
          return PackCard.grid(
            pack: pack,
            index: index,
            onAction: (action) {
              switch (action) {
                case PackActionType.open:
                  widget.onOpenPack(pack);
                  break;
                case PackActionType.openMultiple:
                  widget.onOpenMultiplePacks(pack);
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

  _PackTypeTheme _getTypeTheme(PackType type) {
    switch (type) {
      case PackType.basic:
        return _PackTypeTheme(
          primary: const Color(0xFF6B7280),
          secondary: const Color(0xFF9CA3AF),
        );
      case PackType.event:
        return _PackTypeTheme(
          primary: const Color(0xFF7C3AED),
          secondary: const Color(0xFFA855F7),
        );
      case PackType.limited:
        return _PackTypeTheme(
          primary: const Color(0xFFEA580C),
          secondary: const Color(0xFFF97316),
        );
      case PackType.gift:
        return _PackTypeTheme(
          primary: const Color(0xFFEC4899),
          secondary: const Color(0xFFF472B6),
        );
      case PackType.promotional:
        return _PackTypeTheme(
          primary: const Color(0xFF059669),
          secondary: const Color(0xFF10B981),
        );
    }
  }

  Widget _buildEmptyState(BuildContext context) {
    final theme = FTheme.of(context);

    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 120,
              height: 120,
              decoration: BoxDecoration(
                color: theme.colors.mutedForeground.withOpacity(0.1),
                borderRadius: BorderRadius.circular(60),
              ),
              child: Icon(
                FIcons.shoppingBag,
                size: 60,
                color: theme.colors.mutedForeground,
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'Aucun pack disponible',
              style: theme.typography.xl.copyWith(
                fontWeight: FontWeight.bold,
                color: theme.colors.mutedForeground,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Revenez plus tard pour découvrir de nouveaux packs organisés par catégorie !',
              textAlign: TextAlign.center,
              style: theme.typography.base.copyWith(
                color: theme.colors.mutedForeground,
              ),
            ),
            const SizedBox(height: 32),
            FButton(
              style: FButtonStyle.primary,
              onPress: widget.onRefresh,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(FIcons.rotateCcw, size: 16),
                  const SizedBox(width: 8),
                  const Text('Actualiser'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _PackSection {
  final String title;
  final List<PrankPackModel> packs;
  final PackType type;
  final String emoji;
  final String description;

  const _PackSection(
    this.title,
    this.packs,
    this.type,
    this.emoji,
    this.description,
  );
}

class _PackTypeTheme {
  final Color primary;
  final Color secondary;

  const _PackTypeTheme({required this.primary, required this.secondary});
}
