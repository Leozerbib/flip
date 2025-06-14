import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import '../../../../data/models/models.dart';
import '../../../../core/widgets/ui/component/component.dart';
import 'rarity_chip.dart';

class PackOpeningResultsDialog extends ConsumerWidget {
  final PackOpeningResultModel result;

  const PackOpeningResultsDialog({super.key, required this.result});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Container(
        constraints: const BoxConstraints(maxWidth: 400),
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // En-tête
            _buildHeader(),

            const SizedBox(height: 20),

            // Liste des pranks obtenus
            _buildAwardedPranks(),

            const SizedBox(height: 20),

            // Informations sur la monnaie restante
            _buildRemainingCurrency(),

            const SizedBox(height: 24),

            // Bouton de fermeture
            SizedBox(
              width: double.infinity,
              child: AppButton(
                text: 'Génial !',
                onPressed: () => Navigator.of(context).pop(),
                style: FButtonStyle.primary,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Column(
      children: [
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            color: Colors.amber.withOpacity(0.2),
            shape: BoxShape.circle,
          ),
          child: const Icon(Icons.celebration, size: 40, color: Colors.orange),
        ),
        const SizedBox(height: 12),
        Text(
          '🎉 Pack ouvert !',
          style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        Text(
          'Voici ce que vous avez obtenu:',
          style: TextStyle(fontSize: 14, color: Colors.grey.shade600),
        ),
      ],
    );
  }

  Widget _buildAwardedPranks() {
    return Container(
      constraints: const BoxConstraints(maxHeight: 300),
      child: ListView.separated(
        shrinkWrap: true,
        itemCount: result.awardedPranks.length,
        separatorBuilder: (context, index) => const SizedBox(height: 8),
        itemBuilder: (context, index) {
          final prank = result.awardedPranks[index];
          return _buildPrankCard(prank);
        },
      ),
    );
  }

  Widget _buildPrankCard(AwardedPrankModel prank) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: _getRarityBackgroundColor(prank.rarity),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: _getRarityBorderColor(prank.rarity),
          width: 2,
        ),
      ),
      child: Row(
        children: [
          // Icône du prank
          Container(
            width: 50,
            height: 50,
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.3),
              borderRadius: BorderRadius.circular(8),
            ),
            child: prank.imageUrl != null
                ? ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: Image.network(
                      prank.imageUrl!,
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) =>
                          _buildDefaultPrankIcon(),
                    ),
                  )
                : _buildDefaultPrankIcon(),
          ),

          const SizedBox(width: 12),

          // Informations du prank
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        prank.name,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
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
                        child: const Text(
                          'NOUVEAU',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  prank.description,
                  style: TextStyle(fontSize: 12, color: Colors.grey.shade700),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 6),
                Row(
                  children: [
                    RarityChip(
                      rarity: prank.rarity,
                      probability: 1.0, // Pas pertinent ici
                      size: RarityChipSize.small,
                    ),
                    const Spacer(),
                    if (prank.quantityAwarded > 1)
                      Text(
                        'x${prank.quantityAwarded}',
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDefaultPrankIcon() {
    return const Icon(Icons.emoji_emotions, color: Colors.white, size: 24);
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
        return Colors.grey.shade300;
      case PrankRarity.rare:
        return Colors.blue.shade300;
      case PrankRarity.extreme:
        return Colors.purple.shade300;
    }
  }

  Widget _buildRemainingCurrency() {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.orange.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.monetization_on, color: Colors.orange.shade700, size: 20),
          const SizedBox(width: 8),
          Text(
            'Coins restants: ${result.remainingCurrency.gameCoins}',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: Colors.orange.shade700,
            ),
          ),
        ],
      ),
    );
  }
}
 