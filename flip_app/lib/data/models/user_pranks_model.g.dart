// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_pranks_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserPrankItem _$UserPrankItemFromJson(Map<String, dynamic> json) =>
    UserPrankItem(
      userPrankId: json['userPrankId'].toString(),
      userId: json['userId'].toString(),
      prankId: json['prankId'].toString(),
      quantity: (json['quantity'] as num).toInt(),
      acquiredAt: DateTime.parse(json['obtainedAt'] as String),
      isNew: true,
      prank: PrankModel.fromJson(json['prank'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$UserPrankItemToJson(UserPrankItem instance) =>
    <String, dynamic>{
      'userPrankId': instance.userPrankId,
      'userId': instance.userId,
      'prankId': instance.prankId,
      'quantity': instance.quantity,
      'acquiredAt': instance.acquiredAt.toIso8601String(),
      'isNew': instance.isNew,
      'prank': instance.prank,
    };

UserPranksCollection _$UserPranksCollectionFromJson(
  Map<String, dynamic> json,
  UserPrankFilters? filters,
) => UserPranksCollection(
  userId: json['allPranks'][0]['userId'].toString(),
  pranks: (json['allPranks'] as List<dynamic>)
      .map((e) => UserPrankItem.fromJson(e as Map<String, dynamic>))
      .toList(),
  totalPranks: (json['totalPranks'] as num).toInt(),
  pranksByRarity: (json['pranksByRarity'] as Map<String, dynamic>).map(
    (k, e) => MapEntry(
      k,
      (e as List<dynamic>)
          .map((e) => UserPrankItem.fromJson(e as Map<String, dynamic>))
          .toList(),
    ),
  ),
  filters: filters ?? UserPrankFilters(),
  totalCount: (json['totalQuantity'] as num?)?.toInt(),
  hasMore: true,
);

Map<String, dynamic> _$UserPranksCollectionToJson(
  UserPranksCollection instance,
) => <String, dynamic>{
  'userId': instance.userId,
  'pranks': instance.pranks,
  'totalPranks': instance.totalPranks,
  'pranksByRarity': instance.pranksByRarity,
  'filters': instance.filters,
  'totalCount': instance.totalCount,
  'hasMore': instance.hasMore,
};

UserPranksStats _$UserPranksStatsFromJson(Map<String, dynamic> json) =>
    UserPranksStats(
      totalPranks: (json['totalQuantity'] as num).toInt(),
      totalUniquePranks: (json['totalPranks'] as num).toInt(),
      completionPercentage: (json['completionPercentage'] as num).toDouble(),
      pranksByRarity: (json['pranksByRarity'] as Map<String, dynamic>).map(
        (k, e) => MapEntry(
          k,
          PranksByRarityStats.fromJson(e as Map<String, dynamic>),
        ),
      ),
    );

Map<String, dynamic> _$UserPranksStatsToJson(UserPranksStats instance) =>
    <String, dynamic>{
      'totalPranks': instance.totalPranks,
      'totalUniquePranks': instance.totalUniquePranks,
      'completionPercentage': instance.completionPercentage,
      'pranksByRarity': instance.pranksByRarity,
    };

PranksByRarityStats _$PranksByRarityStatsFromJson(Map<String, dynamic> json) =>
    PranksByRarityStats(
      count: (json['totalQuantity'] as num).toInt(),
      uniqueCount: (json['count'] as num).toInt(),
      completionPercentage: (0).toDouble(),
    );

Map<String, dynamic> _$PranksByRarityStatsToJson(
  PranksByRarityStats instance,
) => <String, dynamic>{
  'count': instance.count,
  'uniqueCount': instance.uniqueCount,
  'completionPercentage': instance.completionPercentage,
};

UserPrankFilters _$UserPrankFiltersFromJson(Map<String, dynamic> json) =>
    UserPrankFilters(
      rarity: (json['rarity'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      type: (json['type'] as List<dynamic>?)?.map((e) => e as String).toList(),
      sortBy: json['sortBy'] as String?,
      sortOrder: json['sortOrder'] as String?,
      limit: (json['limit'] as num?)?.toInt(),
      offset: (json['offset'] as num?)?.toInt(),
    );

Map<String, dynamic> _$UserPrankFiltersToJson(UserPrankFilters instance) =>
    <String, dynamic>{
      'rarity': instance.rarity,
      'type': instance.type,
      'sortBy': instance.sortBy,
      'sortOrder': instance.sortOrder,
      'limit': instance.limit,
      'offset': instance.offset,
    };

AddPrankToCollectionDto _$AddPrankToCollectionDtoFromJson(
  Map<String, dynamic> json,
) => AddPrankToCollectionDto(
  prankId: json['prankId'] as String,
  quantity: (json['quantity'] as num).toInt(),
);

Map<String, dynamic> _$AddPrankToCollectionDtoToJson(
  AddPrankToCollectionDto instance,
) => <String, dynamic>{
  'prankId': instance.prankId,
  'quantity': instance.quantity,
};

RemovePrankFromCollectionDto _$RemovePrankFromCollectionDtoFromJson(
  Map<String, dynamic> json,
) => RemovePrankFromCollectionDto(
  prankId: json['prankId'] as String,
  quantity: (json['quantity'] as num).toInt(),
);

Map<String, dynamic> _$RemovePrankFromCollectionDtoToJson(
  RemovePrankFromCollectionDto instance,
) => <String, dynamic>{
  'prankId': instance.prankId,
  'quantity': instance.quantity,
};

AddPrankToCollectionResult _$AddPrankToCollectionResultFromJson(
  Map<String, dynamic> json,
) => AddPrankToCollectionResult(
  success: json['success'] as bool,
  item: json['item'] == null
      ? null
      : UserPrankItem.fromJson(json['item'] as Map<String, dynamic>),
  isNewPrank: json['isNewPrank'] as bool,
  error: json['error'] as String?,
);

Map<String, dynamic> _$AddPrankToCollectionResultToJson(
  AddPrankToCollectionResult instance,
) => <String, dynamic>{
  'success': instance.success,
  'item': instance.item,
  'isNewPrank': instance.isNewPrank,
  'error': instance.error,
};

RemovePrankFromCollectionResult _$RemovePrankFromCollectionResultFromJson(
  Map<String, dynamic> json,
) => RemovePrankFromCollectionResult(
  success: json['success'] as bool,
  remainingQuantity: (json['remainingQuantity'] as num?)?.toInt(),
  error: json['error'] as String?,
);

Map<String, dynamic> _$RemovePrankFromCollectionResultToJson(
  RemovePrankFromCollectionResult instance,
) => <String, dynamic>{
  'success': instance.success,
  'remainingQuantity': instance.remainingQuantity,
  'error': instance.error,
};
