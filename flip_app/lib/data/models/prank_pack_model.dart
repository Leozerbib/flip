import 'prank_model.dart';
import '../../../core/utils/logger.dart';

extension PrankRarityExtension on PrankRarity {
  String get displayName {
    switch (this) {
      case PrankRarity.common:
        return 'Commun';
      case PrankRarity.rare:
        return 'Rare';
      case PrankRarity.extreme:
        return 'Extrême';
    }
  }
}

enum CurrencyType { gameCoins, premiumGems, jetons }

extension CurrencyTypeExtension on CurrencyType {
  String get value {
    switch (this) {
      case CurrencyType.gameCoins:
        return 'game_coins';
      case CurrencyType.premiumGems:
        return 'premium_gems';
      case CurrencyType.jetons:
        return 'jetons';
    }
  }

  String get displayName {
    switch (this) {
      case CurrencyType.gameCoins:
        return 'Coins';
      case CurrencyType.premiumGems:
        return 'Gemmes';
      case CurrencyType.jetons:
        return 'Jetons';
    }
  }

  static CurrencyType fromString(String value) {
    switch (value) {
      case 'game_coins':
        return CurrencyType.gameCoins;
      case 'premium_gems':
        return CurrencyType.premiumGems;
      case 'jetons':
        return CurrencyType.jetons;
      default:
        return CurrencyType.gameCoins;
    }
  }
}

// Nouveaux enums pour les types de packs
enum PackType { basic, event, limited, gift, promotional }

extension PackTypeExtension on PackType {
  String get value {
    switch (this) {
      case PackType.basic:
        return 'basic';
      case PackType.event:
        return 'event';
      case PackType.limited:
        return 'limited';
      case PackType.gift:
        return 'gift';
      case PackType.promotional:
        return 'promotional';
    }
  }

  String get displayName {
    switch (this) {
      case PackType.basic:
        return 'Basique';
      case PackType.event:
        return 'Événement';
      case PackType.limited:
        return 'Limité';
      case PackType.gift:
        return 'Cadeau';
      case PackType.promotional:
        return 'Promotionnel';
    }
  }

  static PackType fromString(String value) {
    switch (value) {
      case 'basic':
        return PackType.basic;
      case 'event':
        return PackType.event;
      case 'limited':
        return PackType.limited;
      case 'gift':
        return PackType.gift;
      case 'promotional':
        return PackType.promotional;
      default:
        return PackType.basic;
    }
  }
}

// Modèles pour les probabilités de rareté
class RarityProbabilities {
  final double common;
  final double rare;
  final double extreme;

  RarityProbabilities({
    required this.common,
    required this.rare,
    required this.extreme,
  });

  factory RarityProbabilities.fromJson(Map<String, dynamic> json) {
    return RarityProbabilities(
      common: (json['common'] as num?)?.toDouble() ?? 0.0,
      rare: (json['rare'] as num?)?.toDouble() ?? 0.0,
      extreme: (json['extreme'] as num?)?.toDouble() ?? 0.0,
    );
  }

  Map<String, dynamic> toJson() {
    return {'common': common, 'rare': rare, 'extreme': extreme};
  }
}

class PackRarityProbabilities {
  final RarityProbabilities basic;
  final RarityProbabilities? lastCard;

  PackRarityProbabilities({required this.basic, this.lastCard});

  factory PackRarityProbabilities.fromJson(Map<String, dynamic> json) {
    return PackRarityProbabilities(
      basic: RarityProbabilities.fromJson(json['basic'] ?? {}),
      lastCard: json['last_card'] != null
          ? RarityProbabilities.fromJson(json['last_card'])
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'basic': basic.toJson(),
      if (lastCard != null) 'last_card': lastCard!.toJson(),
    };
  }

  // Compatibilité avec l'ancien format
  Map<PrankRarity, double> get legacyFormat {
    return {
      PrankRarity.common: basic.common,
      PrankRarity.rare: basic.rare,
      PrankRarity.extreme: basic.extreme,
    };
  }
}

class PrankPackModel {
  final int packId;
  final String name;
  final String? description;
  final String? imageUrl;
  final CurrencyType costCurrencyType;
  final int costAmount;
  final int numberOfPranksAwarded;
  final PackRarityProbabilities rarityProbabilities;
  final bool? isAvailable;
  final DateTime? availableFrom;
  final DateTime? availableUntil;
  final int? requiredUserLevel;
  final DateTime? createdAt;
  final DateTime? updatedAt;
  final PackType packType;

  PrankPackModel({
    required this.packId,
    required this.name,
    this.description,
    this.imageUrl,
    required this.costCurrencyType,
    required this.costAmount,
    required this.numberOfPranksAwarded,
    required this.rarityProbabilities,
    this.isAvailable,
    this.availableFrom,
    this.availableUntil,
    this.requiredUserLevel,
    this.createdAt,
    this.updatedAt,
    required this.packType,
  });

  factory PrankPackModel.fromJson(Map<String, dynamic> json) {
    try {
      return PrankPackModel(
        packId: json['pack_id'] ?? 0,
        name: json['name'] ?? '',
        description: json['description'],
        imageUrl: json['image_url'],
        costCurrencyType: CurrencyTypeExtension.fromString(
          json['cost_currency_type'] ?? 'game_coins',
        ),
        costAmount: json['cost_amount'] ?? 0,
        numberOfPranksAwarded: json['number_of_pranks_awarded'] ?? 1,
        rarityProbabilities: _parseRarityProbabilities(
          json['rarity_probabilities'],
        ),
        isAvailable: json['is_available'],
        availableFrom: json['available_from'] != null
            ? DateTime.tryParse(json['available_from'])
            : null,
        availableUntil: json['available_until'] != null
            ? DateTime.tryParse(json['available_until'])
            : null,
        requiredUserLevel: json['required_user_level'],
        createdAt: json['created_at'] != null
            ? DateTime.tryParse(json['created_at'])
            : null,
        updatedAt: json['updated_at'] != null
            ? DateTime.tryParse(json['updated_at'])
            : null,
        packType: PackTypeExtension.fromString(json['pack_type'] ?? 'basic'),
      );
    } catch (e) {
      AppLogger.error('Error parsing PrankPackModel: $e');
      rethrow;
    }
  }

  Map<String, dynamic> toJson() {
    return {
      'pack_id': packId,
      'name': name,
      'description': description,
      'image_url': imageUrl,
      'cost_currency_type': costCurrencyType.value,
      'cost_amount': costAmount,
      'number_of_pranks_awarded': numberOfPranksAwarded,
      'rarity_probabilities': rarityProbabilities.toJson(),
      'is_available': isAvailable,
      'available_from': availableFrom?.toIso8601String(),
      'available_until': availableUntil?.toIso8601String(),
      'required_user_level': requiredUserLevel,
      'created_at': createdAt?.toIso8601String(),
      'updated_at': updatedAt?.toIso8601String(),
      'pack_type': packType.value,
    };
  }

  static PackRarityProbabilities _parseRarityProbabilities(dynamic json) {
    if (json is Map<String, dynamic>) {
      // Nouveau format avec basic/last_card
      if (json.containsKey('basic')) {
        return PackRarityProbabilities.fromJson(json);
      }

      // Ancien format de compatibilité
      return PackRarityProbabilities(
        basic: RarityProbabilities(
          common: (json['common'] as num?)?.toDouble() ?? 0.7,
          rare: (json['rare'] as num?)?.toDouble() ?? 0.25,
          extreme: (json['extreme'] as num?)?.toDouble() ?? 0.05,
        ),
      );
    }

    // Valeurs par défaut
    return PackRarityProbabilities(
      basic: RarityProbabilities(common: 0.7, rare: 0.25, extreme: 0.05),
    );
  }

  bool get isCurrentlyAvailable {
    if (isAvailable != true) return false;

    final now = DateTime.now();

    if (availableFrom != null && now.isBefore(availableFrom!)) {
      return false;
    }

    if (availableUntil != null && now.isAfter(availableUntil!)) {
      return false;
    }

    return true;
  }

  String get rarityBreakdown {
    final basicProbs = rarityProbabilities.basic;
    return 'Commun: ${(basicProbs.common * 100).toInt()}%, '
        'Rare: ${(basicProbs.rare * 100).toInt()}%, '
        'Extrême: ${(basicProbs.extreme * 100).toInt()}%';
  }

  PrankPackModel copyWith({
    int? packId,
    String? name,
    String? description,
    String? imageUrl,
    CurrencyType? costCurrencyType,
    int? costAmount,
    int? numberOfPranksAwarded,
    PackRarityProbabilities? rarityProbabilities,
    bool? isAvailable,
    DateTime? availableFrom,
    DateTime? availableUntil,
    int? requiredUserLevel,
    DateTime? createdAt,
    DateTime? updatedAt,
    PackType? packType,
  }) {
    return PrankPackModel(
      packId: packId ?? this.packId,
      name: name ?? this.name,
      description: description ?? this.description,
      imageUrl: imageUrl ?? this.imageUrl,
      costCurrencyType: costCurrencyType ?? this.costCurrencyType,
      costAmount: costAmount ?? this.costAmount,
      numberOfPranksAwarded:
          numberOfPranksAwarded ?? this.numberOfPranksAwarded,
      rarityProbabilities: rarityProbabilities ?? this.rarityProbabilities,
      isAvailable: isAvailable ?? this.isAvailable,
      availableFrom: availableFrom ?? this.availableFrom,
      availableUntil: availableUntil ?? this.availableUntil,
      requiredUserLevel: requiredUserLevel ?? this.requiredUserLevel,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      packType: packType ?? this.packType,
    );
  }
}

// Modèle pour les packs groupés par type
class PacksByTypeModel {
  final List<PrankPackModel> basic;
  final List<PrankPackModel> event;
  final List<PrankPackModel> limited;
  final List<PrankPackModel> gift;
  final List<PrankPackModel> promotional;

  PacksByTypeModel({
    required this.basic,
    required this.event,
    required this.limited,
    required this.gift,
    required this.promotional,
  });

  factory PacksByTypeModel.fromJson(Map<String, dynamic> json) {
    return PacksByTypeModel(
      basic: (json['basic'] as List<dynamic>? ?? [])
          .map((e) => PrankPackModel.fromJson(e as Map<String, dynamic>))
          .toList(),
      event: (json['event'] as List<dynamic>? ?? [])
          .map((e) => PrankPackModel.fromJson(e as Map<String, dynamic>))
          .toList(),
      limited: (json['limited'] as List<dynamic>? ?? [])
          .map((e) => PrankPackModel.fromJson(e as Map<String, dynamic>))
          .toList(),
      gift: (json['gift'] as List<dynamic>? ?? [])
          .map((e) => PrankPackModel.fromJson(e as Map<String, dynamic>))
          .toList(),
      promotional: (json['promotional'] as List<dynamic>? ?? [])
          .map((e) => PrankPackModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }

  List<PrankPackModel> get allPacks {
    return [...basic, ...event, ...limited, ...gift, ...promotional];
  }

  Map<PackType, List<PrankPackModel>> get packsByType {
    return {
      PackType.basic: basic,
      PackType.event: event,
      PackType.limited: limited,
      PackType.gift: gift,
      PackType.promotional: promotional,
    };
  }
}

class AwardedPrankModel {
  final int prankId;
  final String name;
  final PrankRarity rarity;
  final String description;
  final String? imageUrl;
  final int quantityAwarded;
  final bool isNew;

  AwardedPrankModel({
    required this.prankId,
    required this.name,
    required this.rarity,
    required this.description,
    this.imageUrl,
    required this.quantityAwarded,
    required this.isNew,
  });

  factory AwardedPrankModel.fromJson(Map<String, dynamic> json) {
    return AwardedPrankModel(
      prankId: json['prank_id'] ?? 0,
      name: json['name'] ?? '',
      rarity: _parsePrankRarity(json['rarity']),
      description: json['description'] ?? '',
      imageUrl: json['image_url'],
      quantityAwarded: json['quantity_awarded'] ?? 1,
      isNew: json['is_new'] ?? false,
    );
  }

  static PrankRarity _parsePrankRarity(String? rarity) {
    switch (rarity) {
      case 'common':
        return PrankRarity.common;
      case 'rare':
        return PrankRarity.rare;
      case 'extreme':
        return PrankRarity.extreme;
      default:
        return PrankRarity.common;
    }
  }
}

// Nouveau modèle pour les boosters
class BoosterOpeningResultModel {
  final int boosterId;
  final String boosterName;
  final List<AwardedPrankModel> awardedPranks;

  BoosterOpeningResultModel({
    required this.boosterId,
    required this.boosterName,
    required this.awardedPranks,
  });

  factory BoosterOpeningResultModel.fromJson(Map<String, dynamic> json) {
    return BoosterOpeningResultModel(
      boosterId: json['booster_id'] ?? 0,
      boosterName: json['booster_name'] ?? '',
      awardedPranks: (json['awarded_pranks'] as List<dynamic>? ?? [])
          .map((e) => AwardedPrankModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }
}

class PackOpeningResultModel {
  final bool success;
  final List<BoosterOpeningResultModel> boosters;
  final RemainingCurrencyModel remainingCurrency;
  final PackInfoModel packInfo;

  PackOpeningResultModel({
    required this.success,
    required this.boosters,
    required this.remainingCurrency,
    required this.packInfo,
  });

  // Rétrocompatibilité - toutes les pranks des boosters
  List<AwardedPrankModel> get awardedPranks {
    return boosters.expand((booster) => booster.awardedPranks).toList();
  }

  factory PackOpeningResultModel.fromJson(Map<String, dynamic> json) {
    // Support pour le nouveau format avec boosters
    if (json.containsKey('boosters')) {
      return PackOpeningResultModel(
        success: json['success'] ?? false,
        boosters: (json['boosters'] as List<dynamic>? ?? [])
            .map(
              (e) =>
                  BoosterOpeningResultModel.fromJson(e as Map<String, dynamic>),
            )
            .toList(),
        remainingCurrency: RemainingCurrencyModel.fromJson(
          json['remaining_currency'] as Map<String, dynamic>? ?? {},
        ),
        packInfo: PackInfoModel.fromJson(
          json['pack_info'] as Map<String, dynamic>? ?? {},
        ),
      );
    }

    // Rétrocompatibilité avec l'ancien format
    return PackOpeningResultModel(
      success: json['success'] ?? false,
      boosters: [
        BoosterOpeningResultModel(
          boosterId: 1,
          boosterName: 'Booster Principal',
          awardedPranks: (json['awarded_pranks'] as List<dynamic>? ?? [])
              .map((e) => AwardedPrankModel.fromJson(e as Map<String, dynamic>))
              .toList(),
        ),
      ],
      remainingCurrency: RemainingCurrencyModel.fromJson(
        json['remaining_currency'] as Map<String, dynamic>? ?? {},
      ),
      packInfo: PackInfoModel.fromJson(
        json['pack_info'] as Map<String, dynamic>? ?? {},
      ),
    );
  }
}

// Modèle pour l'ouverture de multiples packs
class MultiplePackOpeningResultModel {
  final bool success;
  final int totalPacksOpened;
  final List<BoosterOpeningResultModel> allBoosters;
  final RemainingCurrencyModel remainingCurrency;
  final PackInfoModel packInfo;

  MultiplePackOpeningResultModel({
    required this.success,
    required this.totalPacksOpened,
    required this.allBoosters,
    required this.remainingCurrency,
    required this.packInfo,
  });

  // Toutes les pranks obtenues
  List<AwardedPrankModel> get allAwardedPranks {
    return allBoosters.expand((booster) => booster.awardedPranks).toList();
  }

  factory MultiplePackOpeningResultModel.fromJson(Map<String, dynamic> json) {
    return MultiplePackOpeningResultModel(
      success: json['success'] ?? false,
      totalPacksOpened: json['total_packs_opened'] ?? 0,
      allBoosters: (json['all_boosters'] as List<dynamic>? ?? [])
          .map(
            (e) =>
                BoosterOpeningResultModel.fromJson(e as Map<String, dynamic>),
          )
          .toList(),
      remainingCurrency: RemainingCurrencyModel.fromJson(
        json['remaining_currency'] as Map<String, dynamic>? ?? {},
      ),
      packInfo: PackInfoModel.fromJson(
        json['pack_info'] as Map<String, dynamic>? ?? {},
      ),
    );
  }
}

// Modèle pour les pranks disponibles dans un pack
class PackAvailablePranksModel {
  final int packId;
  final String packName;
  final Map<PrankRarity, List<AwardedPrankModel>> availablePranksByRarity;

  PackAvailablePranksModel({
    required this.packId,
    required this.packName,
    required this.availablePranksByRarity,
  });

  factory PackAvailablePranksModel.fromJson(Map<String, dynamic> json) {
    final availablePranks =
        json['available_pranks_by_rarity'] as Map<String, dynamic>? ?? {};

    return PackAvailablePranksModel(
      packId: json['pack_id'] ?? 0,
      packName: json['pack_name'] ?? '',
      availablePranksByRarity: {
        PrankRarity.common: (availablePranks['common'] as List<dynamic>? ?? [])
            .map((e) => AwardedPrankModel.fromJson(e as Map<String, dynamic>))
            .toList(),
        PrankRarity.rare: (availablePranks['rare'] as List<dynamic>? ?? [])
            .map((e) => AwardedPrankModel.fromJson(e as Map<String, dynamic>))
            .toList(),
        PrankRarity
            .extreme: (availablePranks['extreme'] as List<dynamic>? ?? [])
            .map((e) => AwardedPrankModel.fromJson(e as Map<String, dynamic>))
            .toList(),
      },
    );
  }

  List<AwardedPrankModel> get allAvailablePranks {
    return availablePranksByRarity.values.expand((pranks) => pranks).toList();
  }
}

class RemainingCurrencyModel {
  final int gameCoins;

  RemainingCurrencyModel({required this.gameCoins});

  factory RemainingCurrencyModel.fromJson(Map<String, dynamic> json) {
    return RemainingCurrencyModel(gameCoins: json['game_coins'] ?? 0);
  }
}

class PackInfoModel {
  final int packId;
  final String name;
  final int costAmount;
  final CurrencyType costCurrencyType;

  PackInfoModel({
    required this.packId,
    required this.name,
    required this.costAmount,
    required this.costCurrencyType,
  });

  factory PackInfoModel.fromJson(Map<String, dynamic> json) {
    return PackInfoModel(
      packId: json['pack_id'] ?? 0,
      name: json['name'] ?? '',
      costAmount: json['cost_amount'] ?? 0,
      costCurrencyType: CurrencyTypeExtension.fromString(
        json['cost_currency_type'] ?? 'game_coins',
      ),
    );
  }
}

class PackOpeningErrorModel {
  final bool success;
  final String errorCode;
  final String errorMessage;

  PackOpeningErrorModel({
    required this.success,
    required this.errorCode,
    required this.errorMessage,
  });

  factory PackOpeningErrorModel.fromJson(Map<String, dynamic> json) {
    return PackOpeningErrorModel(
      success: json['success'] ?? false,
      errorCode: json['error_code'] ?? '',
      errorMessage: json['error_message'] ?? '',
    );
  }
}
