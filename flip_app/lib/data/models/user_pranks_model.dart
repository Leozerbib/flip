import 'package:json_annotation/json_annotation.dart';
import 'prank_model.dart';

part 'user_pranks_model.g.dart';

@JsonSerializable()
class UserPrankItem {
  final String userPrankId;
  final String userId;
  final String prankId;
  final int quantity;
  final DateTime acquiredAt;
  final bool isNew;
  final PrankModel prank;

  UserPrankItem({
    required this.userPrankId,
    required this.userId,
    required this.prankId,
    required this.quantity,
    required this.acquiredAt,
    required this.isNew,
    required this.prank,
  });

  factory UserPrankItem.fromJson(Map<String, dynamic> json) =>
      _$UserPrankItemFromJson(json);

  Map<String, dynamic> toJson() => _$UserPrankItemToJson(this);
}

@JsonSerializable()
class UserPranksCollection {
  final String userId;
  final List<UserPrankItem> pranks;
  final int totalPranks;
  final Map<String, List<UserPrankItem>> pranksByRarity;
  final UserPrankFilters filters;
  final int? totalCount;
  final bool hasMore;

  UserPranksCollection({
    required this.userId,
    required this.pranks,
    required this.totalPranks,
    required this.pranksByRarity,
    required this.filters,
    this.totalCount,
    required this.hasMore,
  });

  factory UserPranksCollection.fromJson(
    Map<String, dynamic> json, {
    UserPrankFilters? filters,
  }) => _$UserPranksCollectionFromJson(json, filters);

  Map<String, dynamic> toJson() => _$UserPranksCollectionToJson(this);
}

@JsonSerializable()
class UserPranksStats {
  final int totalPranks;
  final int totalUniquePranks;
  final double completionPercentage;
  final Map<String, PranksByRarityStats> pranksByRarity;

  UserPranksStats({
    required this.totalPranks,
    required this.totalUniquePranks,
    required this.completionPercentage,
    required this.pranksByRarity,
  });

  factory UserPranksStats.fromJson(Map<String, dynamic> json) =>
      _$UserPranksStatsFromJson(json);

  Map<String, dynamic> toJson() => _$UserPranksStatsToJson(this);
}

@JsonSerializable()
class PranksByRarityStats {
  final int count;
  final int uniqueCount;
  final double completionPercentage;

  PranksByRarityStats({
    required this.count,
    required this.uniqueCount,
    required this.completionPercentage,
  });

  factory PranksByRarityStats.fromJson(Map<String, dynamic> json) =>
      _$PranksByRarityStatsFromJson(json);

  Map<String, dynamic> toJson() => _$PranksByRarityStatsToJson(this);
}

@JsonSerializable()
class UserPrankFilters {
  final List<String>? rarity;
  final List<String>? type;
  final String? sortBy;
  final String? sortOrder;
  final int? limit;
  final int? offset;

  UserPrankFilters({
    this.rarity,
    this.type,
    this.sortBy,
    this.sortOrder,
    this.limit,
    this.offset,
  });

  factory UserPrankFilters.fromJson(Map<String, dynamic> json) =>
      _$UserPrankFiltersFromJson(json);

  Map<String, dynamic> toJson() => _$UserPrankFiltersToJson(this);

  Map<String, dynamic> toQueryParams() {
    final params = <String, dynamic>{};

    if (rarity != null) params['rarity'] = rarity;
    if (type != null) params['type'] = type;
    if (sortBy != null) params['sortBy'] = sortBy;
    if (sortOrder != null) params['sortOrder'] = sortOrder;
    if (limit != null) params['limit'] = limit.toString();
    if (offset != null) params['offset'] = offset.toString();

    return params;
  }
}

// DTOs pour les opérations
@JsonSerializable()
class AddPrankToCollectionDto {
  final String prankId;
  final int quantity;

  AddPrankToCollectionDto({required this.prankId, required this.quantity});

  factory AddPrankToCollectionDto.fromJson(Map<String, dynamic> json) =>
      _$AddPrankToCollectionDtoFromJson(json);

  Map<String, dynamic> toJson() => _$AddPrankToCollectionDtoToJson(this);
}

@JsonSerializable()
class RemovePrankFromCollectionDto {
  final String prankId;
  final int quantity;

  RemovePrankFromCollectionDto({required this.prankId, required this.quantity});

  factory RemovePrankFromCollectionDto.fromJson(Map<String, dynamic> json) =>
      _$RemovePrankFromCollectionDtoFromJson(json);

  Map<String, dynamic> toJson() => _$RemovePrankFromCollectionDtoToJson(this);
}

@JsonSerializable()
class AddPrankToCollectionResult {
  final bool success;
  final UserPrankItem? item;
  final bool isNewPrank;
  final String? error;

  AddPrankToCollectionResult({
    required this.success,
    this.item,
    required this.isNewPrank,
    this.error,
  });

  factory AddPrankToCollectionResult.fromJson(Map<String, dynamic> json) =>
      _$AddPrankToCollectionResultFromJson(json);

  Map<String, dynamic> toJson() => _$AddPrankToCollectionResultToJson(this);
}

@JsonSerializable()
class RemovePrankFromCollectionResult {
  final bool success;
  final int? remainingQuantity;
  final String? error;

  RemovePrankFromCollectionResult({
    required this.success,
    this.remainingQuantity,
    this.error,
  });

  factory RemovePrankFromCollectionResult.fromJson(Map<String, dynamic> json) =>
      _$RemovePrankFromCollectionResultFromJson(json);

  Map<String, dynamic> toJson() =>
      _$RemovePrankFromCollectionResultToJson(this);
}
