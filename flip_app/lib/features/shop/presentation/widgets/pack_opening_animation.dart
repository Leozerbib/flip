import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import 'dart:math' as math;
import '../../../../data/models/models.dart';
import '../../../../core/widgets/ui/prank/prank_card.dart';
import '../../../../core/services/audio_service.dart';
import '../providers/shop_providers.dart';

// Étapes de l'animation
enum AnimationPhase {
  loading,
  boosterSelection,
  swipeToOpen,
  cardsDrawing,
  cardReveal,
  results,
}

class PackOpeningAnimation extends ConsumerStatefulWidget {
  final PrankPackModel pack;
  final List<AwardedPrankModel> awardedPranks;
  final VoidCallback onAnimationComplete;
  final VoidCallback onReturnToShop;

  const PackOpeningAnimation({
    super.key,
    required this.pack,
    required this.awardedPranks,
    required this.onAnimationComplete,
    required this.onReturnToShop,
  });

  @override
  ConsumerState<PackOpeningAnimation> createState() =>
      _PackOpeningAnimationState();
}

class _PackOpeningAnimationState extends ConsumerState<PackOpeningAnimation>
    with TickerProviderStateMixin {
  AnimationPhase _currentPhase = AnimationPhase.loading;

  // Services
  final AudioService _audioService = AudioService();

  // State local pour les cartes chargées
  List<AwardedPrankModel> _loadedPranks = [];

  // Controllers d'animation
  late AnimationController _loadingController;
  late AnimationController _boosterBoxController;
  late AnimationController _selectedBoosterController;
  late AnimationController _swipeController;
  late AnimationController _cardsController;
  late AnimationController _resultsController;
  late AnimationController _confettiController;
  late AnimationController _sparkleController;

  // Animations
  late Animation<double> _loadingOpacity;
  late Animation<double> _boosterBoxScale;
  late Animation<double> _selectedBoosterScale;
  late Animation<Offset> _swipeOffset;
  late Animation<double> _cardsDrawAnimation;
  late Animation<double> _resultsSlideAnimation;

  // États
  int _selectedBoosterIndex = -1;
  bool _hasSwipedToOpen = false;
  List<bool> _cardRevealed = [];
  List<double> _cardOffsets = [];
  int _currentTopCardIndex = 0;

  // Position du swipe
  double _swipeProgress = 0.0;

  @override
  void initState() {
    super.initState();
    _loadedPranks =
        widget.awardedPranks; // Initialiser avec les cartes fournies
    _initializeAnimations();
    _startLoadingSequence();
  }

  void _initializeAnimations() {
    // Animation de chargement
    _loadingController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );
    _loadingOpacity = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _loadingController, curve: Curves.easeInOut),
    );

    // Animation de la boîte de boosters
    _boosterBoxController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );
    _boosterBoxScale = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _boosterBoxController, curve: Curves.elasticOut),
    );

    // Animation du booster sélectionné
    _selectedBoosterController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _selectedBoosterScale = Tween<double>(begin: 1.0, end: 1.2).animate(
      CurvedAnimation(
        parent: _selectedBoosterController,
        curve: Curves.easeInOut,
      ),
    );

    // Animation du swipe
    _swipeController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _swipeOffset = Tween<Offset>(
      begin: Offset.zero,
      end: const Offset(0, -0.3),
    ).animate(CurvedAnimation(parent: _swipeController, curve: Curves.easeOut));

    // Animation des cartes qui sortent
    _cardsController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );
    _cardsDrawAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _cardsController, curve: Curves.easeOutBack),
    );

    // Animation des résultats
    _resultsController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _resultsSlideAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _resultsController, curve: Curves.easeInOut),
    );

    // Animation des effets spéciaux
    _confettiController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );

    _sparkleController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );

    // Initialiser les états des cartes
    _cardRevealed = List.filled(_loadedPranks.length, false);
    _cardOffsets = List.generate(_loadedPranks.length, (index) => index * 0.05);
  }

  void _startLoadingSequence() async {
    print('🎮 Phase: Chargement');
    _audioService.playPackOpeningMusic(); // Lancer la musique en boucle
    _loadingController.forward();

    // Si pas de cartes fournies, charger via l'API
    if (_loadedPranks.isEmpty) {
      await _loadPackData();
    }

    await Future.delayed(const Duration(milliseconds: 1500));

    setState(() {
      _currentPhase = AnimationPhase.boosterSelection;
    });

    print('🎮 Phase: Sélection booster');
    _boosterBoxController.forward();
  }

  void _updateCardStates() {
    // Mettre à jour les états des cartes après chargement
    _cardRevealed = List.filled(_loadedPranks.length, false);
    _cardOffsets = List.generate(_loadedPranks.length, (index) => index * 0.05);
  }

  Future<void> _loadPackData() async {
    try {
      print('🎮 Chargement des données du pack via API...');

      // Ici on peut charger via le provider shop ou directement via ShopService
      final result = await ref
          .read(shopStateProvider.notifier)
          .openPack(widget.pack.packId);

      if (result != null && mounted) {
        // Remplacer les cartes vides par les vraies cartes
        setState(() {
          _loadedPranks = result.awardedPranks;
          _updateCardStates();
        });
        print(
          '🎮 ✅ Données du pack chargées: ${result.awardedPranks.length} cartes',
        );
      }
    } catch (e) {
      print('🎮 ❌ Erreur chargement pack: $e');
    }
  }

  void _selectBooster(int index) async {
    if (_selectedBoosterIndex != -1) return;

    print('🎮 Booster $index sélectionné');

    // Jouer le SFX sans interrompre la musique
    _audioService.playBoosterSelect();

    setState(() {
      _selectedBoosterIndex = index;
      _currentPhase = AnimationPhase.swipeToOpen;
    });

    _selectedBoosterController.forward();
  }

  void _handleSwipe(DragUpdateDetails details) {
    if (_currentPhase != AnimationPhase.swipeToOpen || _hasSwipedToOpen) return;

    setState(() {
      _swipeProgress += details.delta.dy / 200;
      _swipeProgress = _swipeProgress.clamp(0.0, 1.0);
    });

    if (_swipeProgress > 0.7) {
      _openBooster();
    }
  }

  void _openBooster() async {
    if (_hasSwipedToOpen) return;

    print('🎮 Phase: Ouverture du booster');
    _audioService.playSwipeOpen();
    _audioService.ensureMusicIsPlaying();

    setState(() {
      _hasSwipedToOpen = true;
      _currentPhase = AnimationPhase.cardsDrawing;
    });

    _swipeController.forward();

    await Future.delayed(const Duration(milliseconds: 300));

    print('🎮 Phase: Cartes qui sortent');
    _cardsController.forward();

    await Future.delayed(const Duration(milliseconds: 1500));

    setState(() {
      _currentPhase = AnimationPhase.cardReveal;
    });

    print('🎮 Phase: Révélation des cartes');
  }

  void _handleCardTap() {
    if (_currentPhase != AnimationPhase.cardReveal || _loadedPranks.isEmpty)
      return;

    setState(() {
      if (!_cardRevealed[_currentTopCardIndex]) {
        // Révéler la carte du dessus
        _cardRevealed[_currentTopCardIndex] = true;
        print('🎮 Carte ${_currentTopCardIndex + 1} révélée');

        // Sons de révélation
        _audioService.playCardReveal();
        _audioService.ensureMusicIsPlaying();

        // Déclencher effets selon la rareté
        _triggerRarityEffects(_loadedPranks[_currentTopCardIndex].rarity);
      } else {
        // Passer à la carte suivante (garder celle-ci révélée)
        _currentTopCardIndex++;
        print('🎮 Prochaine carte: ${_currentTopCardIndex + 1}');

        if (_currentTopCardIndex >= _loadedPranks.length) {
          // Toutes les cartes ont été vues, aller aux résultats
          _showResults();
        }
      }
    });
  }

  void _handleCardSwipe(DragEndDetails details) {
    if (_currentPhase != AnimationPhase.cardReveal) return;

    // Swipe vers la gauche ou la droite pour passer à la suivante
    if (details.primaryVelocity != null &&
        details.primaryVelocity!.abs() > 300) {
      if (_cardRevealed[_currentTopCardIndex]) {
        _handleCardTap(); // Même logique que le tap pour passer à la suivante
      }
    }
  }

  void _triggerRarityEffects(PrankRarity rarity) {
    // Son de rareté
    _audioService.playRaritySound(rarity);

    // Effets visuels
    switch (rarity) {
      case PrankRarity.extreme:
        _triggerConfettiEffect();
        break;
      case PrankRarity.rare:
        _triggerSparkleEffect();
        break;
      case PrankRarity.common:
        // Pas d'effet spécial
        break;
    }
  }

  void _triggerConfettiEffect() {
    // Effet confetti pour les cartes Extreme
    print('🎉 Confetti pour carte Extreme !');
    _confettiController.reset();
    _confettiController.forward();
  }

  void _triggerSparkleEffect() {
    // Petit effet sparkle pour les cartes Rare
    print('✨ Sparkle pour carte Rare !');
    _sparkleController.reset();
    _sparkleController.forward();
  }

  void _showResults() async {
    print('🎮 Phase: Affichage résultats');

    // Arrêter la musique de fond
    _audioService.stopPackOpeningMusic();

    setState(() {
      _currentPhase = AnimationPhase.results;
    });

    _resultsController.forward();
    widget.onAnimationComplete();
  }

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // Fond animé
          _buildAnimatedBackground(),

          // Contenu selon la phase
          ..._buildPhaseContent(theme),

          // Bouton de retour (toujours visible)
          Positioned(
            top: MediaQuery.of(context).padding.top + 16,
            left: 16,
            child: FButton(
              style: FButtonStyle.outline,
              onPress: () {
                // Arrêter la musique avant de retourner au shop
                _audioService.stopPackOpeningMusic();
                widget.onReturnToShop();
              },
              child: const Icon(Icons.close),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAnimatedBackground() {
    return Container(
      decoration: BoxDecoration(
        gradient: RadialGradient(
          center: Alignment.center,
          radius: 1.0,
          colors: [_getPackRarityColor().withOpacity(0.3), Colors.black],
        ),
      ),
    );
  }

  List<Widget> _buildPhaseContent(FThemeData theme) {
    switch (_currentPhase) {
      case AnimationPhase.loading:
        return [_buildLoadingPhase(theme)];
      case AnimationPhase.boosterSelection:
        return [_buildBoosterSelectionPhase(theme)];
      case AnimationPhase.swipeToOpen:
        return [_buildSwipeToOpenPhase(theme)];
      case AnimationPhase.cardsDrawing:
        return [_buildCardsDrawingPhase(theme)];
      case AnimationPhase.cardReveal:
        return [_buildCardRevealPhase(theme)];
      case AnimationPhase.results:
        return [_buildResultsPhase(theme)];
    }
  }

  Widget _buildLoadingPhase(FThemeData theme) {
    return AnimatedBuilder(
      animation: _loadingOpacity,
      builder: (context, child) {
        return Opacity(
          opacity: _loadingOpacity.value,
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 100,
                  height: 100,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: LinearGradient(
                      colors: [
                        _getPackRarityColor(),
                        _getPackRarityColor().withOpacity(0.5),
                      ],
                    ),
                  ),
                  child: const Center(
                    child: CircularProgressIndicator(
                      color: Colors.white,
                      strokeWidth: 3,
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                Text(
                  'Préparation de la boîte magique...',
                  style: theme.typography.lg.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Les boosters s\'organisent pour vous',
                  style: theme.typography.sm.copyWith(color: Colors.white70),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildBoosterSelectionPhase(FThemeData theme) {
    return AnimatedBuilder(
      animation: _boosterBoxScale,
      builder: (context, child) {
        return Transform.scale(
          scale: _boosterBoxScale.value,
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Choisissez votre booster',
                  style: theme.typography.xl.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 32),

                // Grille de 10 boosters (2x5)
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.brown.withOpacity(0.3),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: Colors.brown, width: 2),
                  ),
                  child: Column(
                    children: [
                      for (int row = 0; row < 2; row++)
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 8),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              for (int col = 0; col < 5; col++)
                                _buildBoosterOption(row * 5 + col),
                            ],
                          ),
                        ),
                    ],
                  ),
                ),

                const SizedBox(height: 24),
                Text(
                  'Chaque booster contient ${widget.pack.numberOfPranksAwarded} cartes',
                  style: theme.typography.sm.copyWith(color: Colors.white70),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildBoosterOption(int index) {
    final isSelected = _selectedBoosterIndex == index;

    return GestureDetector(
      onTap: () => _selectBooster(index),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        width: 50,
        height: 70,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8),
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              _getPackRarityColor(),
              _getPackRarityColor().withOpacity(0.7),
            ],
          ),
          border: Border.all(
            color: isSelected ? Colors.white : Colors.transparent,
            width: 2,
          ),
          boxShadow: [
            if (isSelected)
              BoxShadow(
                color: Colors.white.withOpacity(0.5),
                blurRadius: 10,
                spreadRadius: 2,
              ),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.card_giftcard, color: Colors.white, size: 20),
            const SizedBox(height: 4),
            Text(
              '${index + 1}',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 10,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSwipeToOpenPhase(FThemeData theme) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'Glissez vers le haut pour ouvrir',
            style: theme.typography.lg.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 32),

          GestureDetector(
            onPanUpdate: _handleSwipe,
            child: AnimatedBuilder(
              animation: _selectedBoosterScale,
              builder: (context, child) {
                return Transform.scale(
                  scale: _selectedBoosterScale.value,
                  child: Transform.translate(
                    offset: Offset(0, -_swipeProgress * 50),
                    child: Container(
                      width: 150,
                      height: 200,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(16),
                        gradient: LinearGradient(
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                          colors: [
                            _getPackRarityColor(),
                            _getPackRarityColor().withOpacity(0.8),
                          ],
                        ),
                        boxShadow: [
                          BoxShadow(
                            color: _getPackRarityColor().withOpacity(0.5),
                            blurRadius: 20,
                            spreadRadius: 5,
                          ),
                        ],
                      ),
                      child: Stack(
                        children: [
                          // Effet de déchirure au sommet
                          if (_swipeProgress > 0.1)
                            Positioned(
                              top: 20 * _swipeProgress,
                              left: 10,
                              right: 10,
                              child: Container(
                                height: 2,
                                decoration: BoxDecoration(
                                  color: Colors.white.withOpacity(0.8),
                                  boxShadow: [
                                    BoxShadow(
                                      color: Colors.white.withOpacity(0.5),
                                      blurRadius: 5,
                                    ),
                                  ],
                                ),
                              ),
                            ),

                          Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  Icons.card_giftcard,
                                  size: 60,
                                  color: Colors.white,
                                ),
                                const SizedBox(height: 16),
                                Text(
                                  widget.pack.name,
                                  style: theme.typography.base.copyWith(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),

          const SizedBox(height: 32),

          // Indicateur de progression
          Container(
            width: 200,
            height: 4,
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.3),
              borderRadius: BorderRadius.circular(2),
            ),
            child: FractionallySizedBox(
              alignment: Alignment.centerLeft,
              widthFactor: _swipeProgress,
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
          ),

          const SizedBox(height: 16),
          Text(
            '${(_swipeProgress * 100).toInt()}%',
            style: theme.typography.sm.copyWith(color: Colors.white70),
          ),
        ],
      ),
    );
  }

  Widget _buildCardsDrawingPhase(FThemeData theme) {
    // Si les cartes ne sont pas encore chargées, afficher un loader
    if (_loadedPranks.isEmpty) {
      return const Center(
        child: CircularProgressIndicator(color: Colors.white),
      );
    }

    return AnimatedBuilder(
      animation: _cardsDrawAnimation,
      builder: (context, child) {
        return Center(
          child: Stack(
            alignment: Alignment.center,
            children: [
              // Booster ouvert
              Container(
                width: 150,
                height: 200,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Colors.white.withOpacity(0.9),
                      _getPackRarityColor().withOpacity(0.3),
                    ],
                  ),
                ),
              ),

              // Cartes qui sortent (empilées en sens inverse)
              ..._loadedPranks
                  .asMap()
                  .entries
                  .map((entry) {
                    final index = entry.key;
                    final progress =
                        ((_cardsDrawAnimation.value - (index * 0.2)).clamp(
                          0.0,
                          1.0,
                        ));

                    return Transform.translate(
                      offset: Offset(0, -progress * 150 - (index * 5)),
                      child: Transform.rotate(
                        angle: (index - _loadedPranks.length / 2) * 0.1,
                        child: Opacity(
                          opacity: progress,
                          child: _buildCardBack(80, 110),
                        ),
                      ),
                    );
                  })
                  .toList()
                  .reversed
                  .toList(),
            ],
          ),
        );
      },
    );
  }

  Widget _buildCardRevealPhase(FThemeData theme) {
    // Si les cartes ne sont pas encore chargées, afficher un loader
    if (_loadedPranks.isEmpty) {
      return const Center(
        child: CircularProgressIndicator(color: Colors.white),
      );
    }

    return SafeArea(
      child: Stack(
        children: [
          // Interface principale
          Column(
            children: [
              // Header avec info
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    Text(
                      'Carte ${_currentTopCardIndex + 1}/${_loadedPranks.length}',
                      style: theme.typography.lg.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      widget.pack.name,
                      style: theme.typography.sm.copyWith(
                        color: Colors.white70,
                      ),
                    ),
                  ],
                ),
              ),

              // Zone de carte - prend tout l'espace disponible
              Expanded(
                child: GestureDetector(
                  onTap: _handleCardTap,
                  onPanEnd: _handleCardSwipe,
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(horizontal: 10),
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        // Afficher seulement la carte courante
                        if (_currentTopCardIndex < _loadedPranks.length)
                          Padding(
                            padding: const EdgeInsets.all(16),
                            child: AnimatedSwitcher(
                              duration: const Duration(milliseconds: 600),
                              child: _cardRevealed[_currentTopCardIndex]
                                  ? Container(
                                      key: ValueKey(
                                        'revealed_$_currentTopCardIndex',
                                      ),
                                      child: _buildFullScreenRevealedCard(
                                        _loadedPranks[_currentTopCardIndex],
                                      ),
                                    )
                                  : Container(
                                      key: ValueKey(
                                        'hidden_$_currentTopCardIndex',
                                      ),
                                      child: _buildFullScreenCardBack(),
                                    ),
                            ),
                          ),

                        // Indicateur de pile (cartes restantes)
                        if (_currentTopCardIndex < _loadedPranks.length - 1)
                          Positioned(
                            top: 0,
                            right: 0,
                            child: Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 6,
                              ),
                              decoration: BoxDecoration(
                                color: Colors.black.withOpacity(0.7),
                                borderRadius: BorderRadius.circular(20),
                                border: Border.all(color: Colors.white24),
                              ),
                              child: Text(
                                '+${_loadedPranks.length - _currentTopCardIndex - 1}',
                                style: theme.typography.sm.copyWith(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                ),
              ),

              // Footer avec instructions et cartes révélées
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    Text(
                      _cardRevealed[_currentTopCardIndex]
                          ? 'Tapez ou glissez pour passer à la suivante'
                          : 'Tapez pour révéler la carte',
                      style: theme.typography.sm.copyWith(
                        color: Colors.white70,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
            ],
          ),

          // Effets spéciaux par-dessus
          _buildConfettiEffect(),
          _buildSparkleEffect(),
        ],
      ),
    );
  }

  Widget _buildResultsPhase(FThemeData theme) {
    return AnimatedBuilder(
      animation: _resultsSlideAnimation,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(
            0,
            (1 - _resultsSlideAnimation.value) *
                MediaQuery.of(context).size.height,
          ),
          child: Container(
            color: theme.colors.background,
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                const SizedBox(height: 60),

                Text(
                  '🎉 Pack ouvert !',
                  style: theme.typography.xl.copyWith(
                    fontWeight: FontWeight.bold,
                    color: theme.colors.foreground,
                  ),
                ),

                const SizedBox(height: 20),

                Text(
                  'Vous avez obtenu ${_loadedPranks.length} nouvelles cartes :',
                  style: theme.typography.base.copyWith(
                    color: theme.colors.mutedForeground,
                  ),
                ),

                const SizedBox(height: 20),

                Expanded(
                  child: GridView.builder(
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          childAspectRatio: 0.7,
                          crossAxisSpacing: 12,
                          mainAxisSpacing: 12,
                        ),
                    itemCount: _loadedPranks.length,
                    itemBuilder: (context, index) {
                      final awardedPrank = _loadedPranks[index];
                      final prankModel = PrankModel(
                        prankId: awardedPrank.prankId,
                        name: awardedPrank.name,
                        description: awardedPrank.description,
                        rarity: awardedPrank.rarity,
                        type: PrankType.declarative, // Valeur par défaut
                        defaultJetonCostEquivalent: 5,
                        imageUrl: '${awardedPrank.imageUrl}',
                        requiresProof: false,
                        isActive: true,
                        coinsRewardExecutor: 10,
                        xpRewardExecutor: 5,
                        createdAt: DateTime.now(),
                      );

                      return PrankCard(
                        prank: prankModel,
                        viewType: PrankCardViewType.compact,
                        onAction: (action) {
                          print(
                            'Action sur carte ${awardedPrank.name}: $action',
                          );
                        },
                      );
                    },
                  ),
                ),

                const SizedBox(height: 20),

                SizedBox(
                  width: double.infinity,
                  child: FButton(
                    style: FButtonStyle.primary,
                    onPress: widget.onReturnToShop,
                    child: const Text('Retour au shop'),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildCardBack(double width, double height) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF1E3A8A), Color(0xFF3B82F6)],
        ),
        border: Border.all(color: Colors.white, width: 2),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: const Center(
        child: Icon(Icons.help_outline, color: Colors.white, size: 40),
      ),
    );
  }

  Widget _buildRevealedCard(AwardedPrankModel awardedPrank) {
    final prankModel = PrankModel(
      prankId: awardedPrank.prankId,
      name: awardedPrank.name,
      description: awardedPrank.description,
      rarity: awardedPrank.rarity,
      type: PrankType.declarative,
      defaultJetonCostEquivalent: 5,
      imageUrl: '${awardedPrank.imageUrl}',
      requiresProof: false,
      isActive: true,
      coinsRewardExecutor: 10,
      xpRewardExecutor: 5,
      createdAt: DateTime.now(),
    );

    return SizedBox(
      width: 180,
      height: 250,
      child: PrankCard(prank: prankModel, onAction: (action) {}),
    );
  }

  Widget _buildFullScreenRevealedCard(AwardedPrankModel awardedPrank) {
    final prankModel = PrankModel(
      prankId: awardedPrank.prankId,
      name: awardedPrank.name,
      description: awardedPrank.description,
      rarity: awardedPrank.rarity,
      type: PrankType.declarative,
      defaultJetonCostEquivalent: 5,
      imageUrl: '${awardedPrank.imageUrl}',
      requiresProof: false,
      isActive: true,
      coinsRewardExecutor: 10,
      xpRewardExecutor: 5,
      createdAt: DateTime.now(),
    );

    return AspectRatio(
      aspectRatio: 0.7, // Ratio carte standard
      child: PrankCard(
        prank: prankModel,
        onAction: (action) {
          _handleCardTap();
        },
      ),
    );
  }

  Widget _buildFullScreenCardBack() {
    return AspectRatio(
      aspectRatio: 0.7,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF1E3A8A), Color(0xFF3B82F6)],
          ),
          border: Border.all(color: Colors.white, width: 3),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.4),
              blurRadius: 15,
              offset: const Offset(0, 8),
            ),
          ],
        ),
        child: Stack(
          children: [
            // Pattern de fond
            Positioned.fill(
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(13),
                  gradient: RadialGradient(
                    center: Alignment.center,
                    radius: 0.8,
                    colors: [Colors.white.withOpacity(0.1), Colors.transparent],
                  ),
                ),
              ),
            ),

            // Icône centrale
            const Center(
              child: Icon(Icons.help_outline, color: Colors.white, size: 80),
            ),

            // Texte en bas
            Positioned(
              bottom: 20,
              left: 20,
              right: 20,
              child: Text(
                'Tapez pour révéler',
                style: TextStyle(
                  color: Colors.white.withOpacity(0.9),
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildConfettiEffect() {
    return AnimatedBuilder(
      animation: _confettiController,
      builder: (context, child) {
        if (_confettiController.value == 0.0) return const SizedBox.shrink();

        return Positioned.fill(
          child: IgnorePointer(
            child: Stack(
              children: List.generate(30, (index) {
                final random = math.Random(index);
                final startX = random.nextDouble();
                final startY = random.nextDouble() * 0.3;
                final endY = 1.2;
                final rotation = random.nextDouble() * 4 * math.pi;

                return Positioned(
                  left: startX * MediaQuery.of(context).size.width,
                  top:
                      MediaQuery.of(context).size.height *
                      (startY + (_confettiController.value * (endY - startY))),
                  child: Transform.rotate(
                    angle: rotation * _confettiController.value,
                    child: Opacity(
                      opacity: (1.0 - _confettiController.value).clamp(
                        0.0,
                        1.0,
                      ),
                      child: Container(
                        width: (8 + random.nextInt(4)).toDouble(),
                        height: (8 + random.nextInt(4)).toDouble(),
                        decoration: BoxDecoration(
                          color: [
                            Colors.yellow,
                            Colors.orange,
                            Colors.red,
                            Colors.pink,
                            Colors.purple,
                            Colors.blue,
                          ][random.nextInt(6)],
                          shape: random.nextBool()
                              ? BoxShape.circle
                              : BoxShape.rectangle,
                        ),
                      ),
                    ),
                  ),
                );
              }),
            ),
          ),
        );
      },
    );
  }

  Widget _buildSparkleEffect() {
    return AnimatedBuilder(
      animation: _sparkleController,
      builder: (context, child) {
        if (_sparkleController.value == 0.0) return const SizedBox.shrink();

        return Positioned.fill(
          child: IgnorePointer(
            child: Stack(
              children: List.generate(15, (index) {
                final random = math.Random(index + 100);
                final centerX = MediaQuery.of(context).size.width / 2;
                final centerY = MediaQuery.of(context).size.height / 2;
                final radius = 100 + random.nextDouble() * 50;
                final angle =
                    (index / 15) * 2 * math.pi +
                    _sparkleController.value * math.pi;

                final x =
                    centerX +
                    math.cos(angle) * radius * _sparkleController.value;
                final y =
                    centerY +
                    math.sin(angle) * radius * _sparkleController.value;

                return Positioned(
                  left: x,
                  top: y,
                  child: Transform.scale(
                    scale: math.sin(_sparkleController.value * math.pi),
                    child: Opacity(
                      opacity: math.sin(_sparkleController.value * math.pi),
                      child: Icon(
                        Icons.auto_awesome,
                        color: Colors.blue.shade300,
                        size: (16 + random.nextInt(8)).toDouble(),
                      ),
                    ),
                  ),
                );
              }),
            ),
          ),
        );
      },
    );
  }

  Color _getPackRarityColor() {
    final legacyProbabilities = widget.pack.rarityProbabilities.legacyFormat;
    if (legacyProbabilities.isEmpty) return const Color(0xFF9E9E9E);

    final dominantRarity = legacyProbabilities.entries
        .reduce((a, b) => a.value > b.value ? a : b)
        .key;

    switch (dominantRarity) {
      case PrankRarity.extreme:
        return const Color(0xFFFFD700);
      case PrankRarity.rare:
        return const Color(0xFF2196F3);
      case PrankRarity.common:
        return const Color(0xFF9E9E9E);
    }
  }

  @override
  void dispose() {
    // Arrêter la musique si elle joue encore
    _audioService.stopPackOpeningMusic();

    _loadingController.dispose();
    _boosterBoxController.dispose();
    _selectedBoosterController.dispose();
    _swipeController.dispose();
    _cardsController.dispose();
    _resultsController.dispose();
    _confettiController.dispose();
    _sparkleController.dispose();
    super.dispose();
  }
}

class MultiplePackOpeningAnimation extends StatefulWidget {
  final MultiplePackOpeningResultModel result;
  final VoidCallback onComplete;

  const MultiplePackOpeningAnimation({
    super.key,
    required this.result,
    required this.onComplete,
  });

  @override
  State<MultiplePackOpeningAnimation> createState() =>
      _MultiplePackOpeningAnimationState();
}

class _MultiplePackOpeningAnimationState
    extends State<MultiplePackOpeningAnimation>
    with TickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _rotationAnimation;

  int _currentBoosterIndex = 0;
  int _currentPrankIndex = 0;
  bool _showingPrank = false;

  List<AwardedPrankModel> get _currentBoosterPranks =>
      widget.result.allBoosters[_currentBoosterIndex].awardedPranks;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.elasticOut));

    _rotationAnimation = Tween<double>(
      begin: 0.0,
      end: 0.25,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));

    _startAnimation();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _startAnimation() async {
    await _controller.forward();
    await Future.delayed(const Duration(milliseconds: 500));

    if (_showingPrank) {
      _nextPrank();
    } else {
      _showPranks();
    }
  }

  void _showPranks() {
    setState(() {
      _showingPrank = true;
      _currentPrankIndex = 0;
    });
    _controller.reset();
    _startAnimation();
  }

  void _nextPrank() async {
    _currentPrankIndex++;

    if (_currentPrankIndex >= _currentBoosterPranks.length) {
      // Passer au booster suivant
      _currentBoosterIndex++;
      _currentPrankIndex = 0;

      if (_currentBoosterIndex >= widget.result.allBoosters.length) {
        // Tous les boosters terminés
        widget.onComplete();
        return;
      }

      setState(() {
        _showingPrank = false;
      });
    }

    _controller.reset();
    _startAnimation();
  }

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Scaffold(
      backgroundColor: Colors.black.withOpacity(0.9),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Titre
            Padding(
              padding: const EdgeInsets.all(20),
              child: Text(
                _showingPrank
                    ? 'Booster ${_currentBoosterIndex + 1}/${widget.result.allBoosters.length}'
                    : 'Ouverture de ${widget.result.totalPacksOpened} packs...',
                style: theme.typography.xl.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
            ),

            // Animation principale
            AnimatedBuilder(
              animation: _controller,
              builder: (context, child) {
                if (_showingPrank &&
                    _currentPrankIndex < _currentBoosterPranks.length) {
                  return _buildPrankReveal(theme);
                } else {
                  return _buildPackAnimation(theme);
                }
              },
            ),

            // Informations
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  if (_showingPrank &&
                      _currentPrankIndex < _currentBoosterPranks.length)
                    Text(
                      'Prank ${_currentPrankIndex + 1}/${_currentBoosterPranks.length}',
                      style: theme.typography.base.copyWith(
                        color: Colors.white70,
                      ),
                    ),
                  const SizedBox(height: 10),
                  Text(
                    'Appuyez pour continuer...',
                    style: theme.typography.sm.copyWith(color: Colors.white60),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPackAnimation(FThemeData theme) {
    return GestureDetector(
      onTap: _startAnimation,
      child: Transform.scale(
        scale: _scaleAnimation.value,
        child: Transform.rotate(
          angle: _rotationAnimation.value,
          child: Container(
            width: 200,
            height: 280,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              gradient: LinearGradient(
                colors: [
                  Colors.purple.shade400,
                  Colors.blue.shade400,
                  Colors.purple.shade600,
                ],
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.purple.withOpacity(0.5),
                  blurRadius: 20,
                  spreadRadius: 5,
                ),
              ],
            ),
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.card_giftcard, size: 60, color: Colors.white),
                  const SizedBox(height: 10),
                  Text(
                    widget.result.packInfo.name,
                    style: theme.typography.base.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildPrankReveal(FThemeData theme) {
    final prank = _currentBoosterPranks[_currentPrankIndex];

    return GestureDetector(
      onTap: _nextPrank,
      child: Transform.scale(
        scale: _scaleAnimation.value,
        child: Container(
          width: 250,
          height: 350,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(15),
            gradient: LinearGradient(colors: _getPrankGradient(prank.rarity)),
            boxShadow: [
              BoxShadow(
                color: _getPrankColor(prank.rarity).withOpacity(0.6),
                blurRadius: 25,
                spreadRadius: 5,
              ),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Icône de rareté
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.white.withOpacity(0.2),
                  ),
                  child: Icon(
                    _getPrankIcon(prank.rarity),
                    size: 40,
                    color: Colors.white,
                  ),
                ),

                const SizedBox(height: 20),

                // Nom du prank
                Text(
                  prank.name,
                  style: theme.typography.lg.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),

                const SizedBox(height: 10),

                // Rareté
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    prank.rarity.displayName.toUpperCase(),
                    style: theme.typography.sm.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1,
                    ),
                  ),
                ),

                const SizedBox(height: 10),

                // Quantité si > 1
                if (prank.quantityAwarded > 1)
                  Text(
                    'x${prank.quantityAwarded}',
                    style: theme.typography.xl.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  List<Color> _getPrankGradient(PrankRarity rarity) {
    switch (rarity) {
      case PrankRarity.extreme:
        return [
          Colors.amber.shade300,
          Colors.orange.shade500,
          Colors.red.shade400,
        ];
      case PrankRarity.rare:
        return [
          Colors.blue.shade300,
          Colors.purple.shade400,
          Colors.indigo.shade500,
        ];
      case PrankRarity.common:
        return [
          Colors.grey.shade400,
          Colors.grey.shade600,
          Colors.grey.shade700,
        ];
    }
  }

  Color _getPrankColor(PrankRarity rarity) {
    switch (rarity) {
      case PrankRarity.extreme:
        return Colors.amber;
      case PrankRarity.rare:
        return Colors.blue;
      case PrankRarity.common:
        return Colors.grey;
    }
  }

  IconData _getPrankIcon(PrankRarity rarity) {
    switch (rarity) {
      case PrankRarity.extreme:
        return Icons.auto_awesome;
      case PrankRarity.rare:
        return Icons.star;
      case PrankRarity.common:
        return Icons.circle;
    }
  }
}
