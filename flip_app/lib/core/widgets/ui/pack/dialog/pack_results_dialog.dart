import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../../data/models/models.dart';
import '../../component/button.dart';
import '../elements/pack_chip.dart';

/// Dialog pour afficher les résultats d'ouverture de pack
class PackResultsDialog extends StatefulWidget {
  final PackOpeningResultModel result;
  final bool showAnimation;

  const PackResultsDialog({
    super.key,
    required this.result,
    this.showAnimation = true,
  });

  /// Affiche le dialog de résultats
  static Future<void> show(
    BuildContext context,
    PackOpeningResultModel result, {
    bool showAnimation = true,
  }) {
    return showAdaptiveDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) =>
          PackResultsDialog(result: result, showAnimation: showAnimation),
    );
  }

  @override
  State<PackResultsDialog> createState() => _PackResultsDialogState();
}

class _PackResultsDialogState extends State<PackResultsDialog>
    with TickerProviderStateMixin {
  late AnimationController _appearController;
  late AnimationController _cardRevealController;
  late Animation<double> _appearAnimation;
  late Animation<double> _cardRevealAnimation;

  int _revealedCards = 0;
  bool _allCardsRevealed = false;

  @override
  void initState() {
    super.initState();

    if (widget.showAnimation) {
      _setupAnimations();
      _startAnimations();
    } else {
      _revealedCards = widget.result.awardedPranks.length;
      _allCardsRevealed = true;
    }
  }

  void _setupAnimations() {
    _appearController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );

    _cardRevealController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );

    _appearAnimation = CurvedAnimation(
      parent: _appearController,
      curve: Curves.easeOutBack,
    );

    _cardRevealAnimation = CurvedAnimation(
      parent: _cardRevealController,
      curve: Curves.easeOut,
    );
  }

  void _startAnimations() async {
    await _appearController.forward();

    // Révéler les cartes une par une
    for (int i = 0; i < widget.result.awardedPranks.length; i++) {
      await Future.delayed(const Duration(milliseconds: 300));
      if (mounted) {
        setState(() {
          _revealedCards++;
        });
        _cardRevealController.reset();
        _cardRevealController.forward();
      }
    }

    setState(() {
      _allCardsRevealed = true;
    });
  }

  @override
  void dispose() {
    if (widget.showAnimation) {
      _appearController.dispose();
      _cardRevealController.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.showAnimation) {
      return AnimatedBuilder(
        animation: _appearAnimation,
        builder: (context, child) {
          return Transform.scale(
            scale: _appearAnimation.value,
            child: Opacity(
              opacity: _appearAnimation.value,
              child: _buildDialog(),
            ),
          );
        },
      );
    }

    return _buildDialog();
  }

  Widget _buildDialog() {
    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Container(
        constraints: const BoxConstraints(maxWidth: 500, maxHeight: 700),
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _buildHeader(),
            const SizedBox(height: 20),
            _buildPackInfo(),
            const SizedBox(height: 20),
            Flexible(child: _buildAwardedPranks()),
            const SizedBox(height: 20),
            _buildCurrencyInfo(),
            const SizedBox(height: 24),
            _buildActions(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    final theme = FTheme.of(context);

    return Column(
      children: [
        // Icône de célébration
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFFFFD700), Color(0xFFFF8C00)],
            ),
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: Colors.amber.withOpacity(0.3),
                blurRadius: 20,
                spreadRadius: 5,
              ),
            ],
          ),
          child: const Icon(Icons.celebration, size: 40, color: Colors.white),
        ),

        const SizedBox(height: 16),

        // Titre
        Text(
          '🎉 Pack ouvert !',
          style: theme.typography.xl.copyWith(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: theme.colors.foreground,
          ),
        ),

        const SizedBox(height: 8),

        // Sous-titre
        Text(
          _getSubtitle(),
          style: theme.typography.base.copyWith(
            color: theme.colors.mutedForeground,
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildPackInfo() {
    final theme = FTheme.of(context);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: theme.colors.secondary.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: theme.colors.secondary.withOpacity(0.2),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          // Icône du pack
          Container(
            width: 50,
            height: 50,
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF2196F3), Color(0xFF1976D2)],
              ),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Icon(
              Icons.card_giftcard,
              color: Colors.white,
              size: 28,
            ),
          ),

          const SizedBox(width: 16),

          // Informations
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.result.packInfo.name,
                  style: theme.typography.lg.copyWith(
                    fontWeight: FontWeight.bold,
                    color: theme.colors.foreground,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${widget.result.awardedPranks.length} cartes obtenues',
                  style: theme.typography.sm.copyWith(
                    color: theme.colors.mutedForeground,
                  ),
                ),
              ],
            ),
          ),

          // Badge de type
          PackTypeChip(packType: 'BOOSTER', size: PackChipSize.small),
        ],
      ),
    );
  }

  Widget _buildAwardedPranks() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Cartes obtenues:',
              style: FTheme.of(context).typography.base.copyWith(
                fontWeight: FontWeight.bold,
                color: FTheme.of(context).colors.foreground,
              ),
            ),
            if (!_allCardsRevealed)
              Text(
                '$_revealedCards/${widget.result.awardedPranks.length}',
                style: FTheme.of(context).typography.sm.copyWith(
                  color: FTheme.of(context).colors.mutedForeground,
                ),
              ),
          ],
        ),

        const SizedBox(height: 12),

        Flexible(
          child: GridView.builder(
            shrinkWrap: true,
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              childAspectRatio: 1.2,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
            ),
            itemCount: widget.result.awardedPranks.length,
            itemBuilder: (context, index) {
              final prank = widget.result.awardedPranks[index];
              final isRevealed = index < _revealedCards;

              return _buildPrankCard(prank, isRevealed, index);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildPrankCard(AwardedPrankModel prank, bool isRevealed, int index) {
    return AnimatedOpacity(
      duration: const Duration(milliseconds: 300),
      opacity: isRevealed ? 1.0 : 0.3,
      child: AnimatedScale(
        duration: const Duration(milliseconds: 300),
        scale: isRevealed ? 1.0 : 0.8,
        child: Container(
          decoration: BoxDecoration(
            color: _getRarityBackgroundColor(prank.rarity),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: _getRarityBorderColor(prank.rarity),
              width: 2,
            ),
            boxShadow: isRevealed
                ? [
                    BoxShadow(
                      color: _getRarityBorderColor(
                        prank.rarity,
                      ).withOpacity(0.3),
                      blurRadius: 8,
                      spreadRadius: 2,
                    ),
                  ]
                : null,
          ),
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // En-tête avec rareté et "nouveau"
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    PackRarityChip(
                      rarity: prank.rarity,
                      size: PackChipSize.small,
                    ),
                    if (prank.isNew)
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 6,
                          vertical: 2,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.green,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          'NOUVEAU',
                          style: FTheme.of(context).typography.xs.copyWith(
                            color: Colors.white,
                            fontSize: 8,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                  ],
                ),

                const SizedBox(height: 8),

                // Image ou icône
                Expanded(
                  child: Center(
                    child: prank.imageUrl != null && prank.imageUrl!.isNotEmpty
                        ? ClipRRect(
                            borderRadius: BorderRadius.circular(8),
                            child: Image.network(
                              prank.imageUrl!,
                              fit: BoxFit.cover,
                              errorBuilder: (context, error, stackTrace) =>
                                  _buildDefaultIcon(prank.rarity),
                            ),
                          )
                        : _buildDefaultIcon(prank.rarity),
                  ),
                ),

                const SizedBox(height: 8),

                // Nom du prank
                Text(
                  prank.name,
                  style: FTheme.of(context).typography.sm.copyWith(
                    fontWeight: FontWeight.bold,
                    color: FTheme.of(context).colors.foreground,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),

                // Quantité si > 1
                if (prank.quantityAwarded > 1) ...[
                  const SizedBox(height: 4),
                  Text(
                    'x${prank.quantityAwarded}',
                    style: FTheme.of(context).typography.xs.copyWith(
                      fontWeight: FontWeight.bold,
                      color: _getRarityBorderColor(prank.rarity),
                    ),
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDefaultIcon(PrankRarity rarity) {
    return Container(
      width: 50,
      height: 50,
      decoration: BoxDecoration(
        color: _getRarityBorderColor(rarity).withOpacity(0.2),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Icon(
        Icons.emoji_emotions,
        color: _getRarityBorderColor(rarity),
        size: 30,
      ),
    );
  }

  Widget _buildCurrencyInfo() {
    final theme = FTheme.of(context);

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.orange.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.orange.withOpacity(0.3), width: 1),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.monetization_on, color: Colors.orange.shade700, size: 20),
          const SizedBox(width: 8),
          Text(
            'Coins restants: ${widget.result.remainingCurrency.gameCoins}',
            style: theme.typography.sm.copyWith(
              fontWeight: FontWeight.bold,
              color: Colors.orange.shade700,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActions() {
    return SizedBox(
      width: double.infinity,
      child: AppButton(
        text: _allCardsRevealed ? 'Génial !' : 'Révéler toutes les cartes',
        onPressed: () {
          if (_allCardsRevealed) {
            Navigator.of(context).pop();
          } else {
            setState(() {
              _revealedCards = widget.result.awardedPranks.length;
              _allCardsRevealed = true;
            });
          }
        },
        style: FButtonStyle.primary,
      ),
    );
  }

  String _getSubtitle() {
    final totalCards = widget.result.awardedPranks.length;
    final newCards = widget.result.awardedPranks.where((p) => p.isNew).length;

    if (newCards > 0) {
      return 'Voici vos $totalCards cartes dont $newCards nouvelles !';
    } else {
      return 'Voici vos $totalCards cartes obtenues !';
    }
  }

  Color _getRarityBackgroundColor(PrankRarity rarity) {
    switch (rarity) {
      case PrankRarity.common:
        return Colors.grey.withOpacity(0.1);
      case PrankRarity.rare:
        return Colors.blue.withOpacity(0.1);
      case PrankRarity.extreme:
        return Colors.purple.withOpacity(0.1);
    }
  }

  Color _getRarityBorderColor(PrankRarity rarity) {
    switch (rarity) {
      case PrankRarity.common:
        return Colors.grey.shade400;
      case PrankRarity.rare:
        return Colors.blue.shade400;
      case PrankRarity.extreme:
        return Colors.purple.shade400;
    }
  }
}
