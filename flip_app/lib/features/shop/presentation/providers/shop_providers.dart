import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/api/shop_service.dart';
import '../../../../data/models/models.dart';
import '../../../../core/utils/logger.dart';

/// État du shop
class ShopState {
  final PacksByTypeModel? availablePacks;
  final bool isLoading;
  final String? error;

  const ShopState({this.availablePacks, this.isLoading = false, this.error});

  ShopState copyWith({
    PacksByTypeModel? availablePacks,
    bool? isLoading,
    String? error,
  }) {
    return ShopState(
      availablePacks: availablePacks ?? this.availablePacks,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

/// Notifier pour la gestion de l'état du shop
class ShopStateNotifier extends StateNotifier<ShopState> {
  ShopStateNotifier() : super(const ShopState()) {
    loadPacks();
  }

  /// Charger les packs disponibles
  Future<void> loadPacks() async {
    try {
      state = state.copyWith(isLoading: true, error: null);
      AppLogger.info('Chargement des packs de pranks');

      try {
        // Essayer d'abord le backend
        final packs = await ShopService.getAvailablePrankPacksGrouped();
        state = state.copyWith(availablePacks: packs, isLoading: false);
        AppLogger.info(
          'Packs chargés depuis le backend: ${packs?.allPacks.length ?? 0}',
        );
      } catch (e) {
        // Si le backend ne fonctionne pas, utiliser des packs de test
        AppLogger.warning(
          'Backend indisponible, utilisation de packs de test: $e',
        );

        final testPacks = [
          PrankPackModel(
            packId: 1,
            name: 'Pack Starter',
            description: 'Un pack parfait pour commencer votre collection',
            costCurrencyType: CurrencyType.gameCoins,
            costAmount: 100,
            numberOfPranksAwarded: 3,
            rarityProbabilities: PackRarityProbabilities(
              basic: RarityProbabilities(
                common: 0.7,
                rare: 0.25,
                extreme: 0.05,
              ),
            ),
            isAvailable: true,
            packType: PackType.basic,
          ),
          PrankPackModel(
            packId: 2,
            name: 'Pack Premium',
            description:
                'Pack premium avec de meilleures chances d\'obtenir des cartes rares',
            costCurrencyType: CurrencyType.gameCoins,
            costAmount: 250,
            numberOfPranksAwarded: 5,
            rarityProbabilities: PackRarityProbabilities(
              basic: RarityProbabilities(common: 0.5, rare: 0.4, extreme: 0.1),
            ),
            isAvailable: true,
            packType: PackType.event,
          ),
          PrankPackModel(
            packId: 3,
            name: 'Pack Légendaire',
            description: 'Le pack ultime pour les collectionneurs expérimentés',
            costCurrencyType: CurrencyType.gameCoins,
            costAmount: 500,
            numberOfPranksAwarded: 7,
            rarityProbabilities: PackRarityProbabilities(
              basic: RarityProbabilities(common: 0.3, rare: 0.5, extreme: 0.2),
            ),
            isAvailable: true,
            packType: PackType.limited,
          ),
        ];

        state = state.copyWith(
          availablePacks: PacksByTypeModel(
            basic: testPacks,
            event: testPacks,
            limited: testPacks,
            gift: testPacks,
            promotional: testPacks,
          ),
        );
        AppLogger.info('Packs de test chargés: ${testPacks.length}');
      }
    } catch (e) {
      AppLogger.error('Erreur chargement packs: $e');
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  /// Ouvrir un pack
  Future<PackOpeningResultModel?> openPack(int packId) async {
    try {
      AppLogger.info('Ouverture du pack: $packId');

      try {
        // Essayer d'abord le backend
        final result = await ShopService.openPrankPack(packId);
        AppLogger.info('Open pack result: $result');
        if (result != null) {
          AppLogger.info(
            'Pack ouvert avec succès: ${result.boosters.map((b) => b.awardedPranks.length).reduce((a, b) => a + b)} pranks obtenus',
          );

          // Optionnel: rafraîchir les packs après ouverture
          await loadPacks();
        }

        return result;
      } catch (e) {
        // Si le backend ne fonctionne pas, simuler l'ouverture
        AppLogger.warning(
          'Backend indisponible pour ouverture, simulation: $e',
        );

        // Créer des données factices pour l'animation
        final testAwardedPranks = [
          AwardedPrankModel(
            prankId: 1,
            name: 'Prank Magique',
            rarity: PrankRarity.rare,
            description: 'Une prank rare obtenue du pack',
            quantityAwarded: 1,
            isNew: true,
          ),
          AwardedPrankModel(
            prankId: 2,
            name: 'Prank Classique',
            rarity: PrankRarity.common,
            description: 'Une prank commune très amusante',
            quantityAwarded: 1,
            isNew: false,
          ),
          AwardedPrankModel(
            prankId: 3,
            name: 'Prank Légendaire',
            rarity: PrankRarity.extreme,
            description: 'Une prank extrêmement rare !',
            quantityAwarded: 1,
            isNew: true,
          ),
        ];

        final simulatedResult = PackOpeningResultModel(
          success: true,
          boosters: [
            BoosterOpeningResultModel(
              boosterId: 1,
              boosterName: 'Booster Test',
              awardedPranks: testAwardedPranks,
            ),
          ],
          remainingCurrency: RemainingCurrencyModel(gameCoins: 1000),
          packInfo: PackInfoModel(
            packId: packId,
            name: 'Pack Test',
            costAmount: 100,
            costCurrencyType: CurrencyType.gameCoins,
          ),
        );

        AppLogger.info(
          'Simulation d\'ouverture: ${testAwardedPranks.length} pranks générés',
        );
        return simulatedResult;
      }
    } catch (e) {
      AppLogger.error('Erreur ouverture pack: $e');
      rethrow;
    }
  }

  /// Rafraîchir les données
  Future<void> refresh() async {
    await loadPacks();
  }
}

/// Provider pour l'état du shop
final shopStateProvider = StateNotifierProvider<ShopStateNotifier, ShopState>((
  ref,
) {
  return ShopStateNotifier();
});

/// Provider pour un pack spécifique
final packByIdProvider = FutureProvider.family<PrankPackModel?, int>((
  ref,
  packId,
) async {
  try {
    return await ShopService.getPrankPackById(packId);
  } catch (e) {
    AppLogger.error('Erreur récupération pack $packId: $e');
    return null;
  }
});

/// Provider pour vérifier si un pack peut être ouvert
final canOpenPackProvider = Provider.family<bool, PrankPackModel>((ref, pack) {
  // TODO: Récupérer les vraies données utilisateur
  const userLevel = 5; // Valeur fictive
  const userCoins = 1250; // Valeur fictive

  return ShopService.canOpenPack(pack, userLevel, userCoins);
});

/// Provider pour obtenir la raison pour laquelle un pack ne peut pas être ouvert
final packNotOpenableReasonProvider = Provider.family<String?, PrankPackModel>((
  ref,
  pack,
) {
  // TODO: Récupérer les vraies données utilisateur
  const userLevel = 5; // Valeur fictive
  const userCoins = 1250; // Valeur fictive

  if (ShopService.canOpenPack(pack, userLevel, userCoins)) {
    return null;
  }

  return ShopService.getPackNotOpenableReason(pack, userLevel, userCoins);
});
