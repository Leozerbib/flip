// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_inventory_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserPackInventoryItem _$UserPackInventoryItemFromJson(
  Map<String, dynamic> json,
) => UserPackInventoryItem(
  userPackInventoryId: json['userPackInventoryId'].toString(),
  userId: json['userId'].toString(),
  packId: json['packId'].toString(),
  quantity: (json['quantity'] as num).toInt(),
  acquiredAt: DateTime.parse(json['acquiredAt'] as String),
  pack: PrankPackModel.fromJson(json['pack'] as Map<String, dynamic>),
);

Map<String, dynamic> _$UserPackInventoryItemToJson(
  UserPackInventoryItem instance,
) => <String, dynamic>{
  'userPackInventoryId': instance.userPackInventoryId,
  'userId': instance.userId,
  'packId': instance.packId,
  'quantity': instance.quantity,
  'acquiredAt': instance.acquiredAt.toIso8601String(),
  'pack': instance.pack,
};

UserPackInventory _$UserPackInventoryFromJson(Map<String, dynamic> json) =>
    UserPackInventory(
      userId: json['packsByType']['basic'][0]['userId'].toString(),
      items: (json['allPacks'] as List<dynamic>)
          .map((e) => UserPackInventoryItem.fromJson(e as Map<String, dynamic>))
          .toList(),
      totalPacks: (json['totalPacks'] as num).toInt(),
      itemsByType: (json['packsByType'] as Map<String, dynamic>).map(
        (k, e) => MapEntry(
          k,
          (e as List<dynamic>)
              .map(
                (e) =>
                    UserPackInventoryItem.fromJson(e as Map<String, dynamic>),
              )
              .toList(),
        ),
      ),
    );

Map<String, dynamic> _$UserPackInventoryToJson(UserPackInventory instance) =>
    <String, dynamic>{
      'userId': instance.userId,
      'items': instance.items,
      'totalPacks': instance.totalPacks,
      'itemsByType': instance.itemsByType,
    };

UserPackInventoryStats _$UserPackInventoryStatsFromJson(
  Map<String, dynamic> json,
) => UserPackInventoryStats(
  totalPacks: (json['totalPacks'] as num).toInt(),
  totalValue: (json['totalValue'] as num).toDouble(),
  packsByType: (json['packsByType'] as Map<String, dynamic>).map(
    (k, e) => MapEntry(k, PacksByTypeStats.fromJson(e as Map<String, dynamic>)),
  ),
);

Map<String, dynamic> _$UserPackInventoryStatsToJson(
  UserPackInventoryStats instance,
) => <String, dynamic>{
  'totalPacks': instance.totalPacks,
  'totalValue': instance.totalValue,
  'packsByType': instance.packsByType,
};

PacksByTypeStats _$PacksByTypeStatsFromJson(Map<String, dynamic> json) =>
    PacksByTypeStats(
      count: (json['count'] as num).toInt(),
      totalValue: (json['totalQuantity'] as num).toDouble(),
    );

Map<String, dynamic> _$PacksByTypeStatsToJson(PacksByTypeStats instance) =>
    <String, dynamic>{
      'count': instance.count,
      'totalValue': instance.totalValue,
    };

AddPackToInventoryDto _$AddPackToInventoryDtoFromJson(
  Map<String, dynamic> json,
) => AddPackToInventoryDto(
  packId: json['packId'] as String,
  quantity: (json['quantity'] as num).toInt(),
);

Map<String, dynamic> _$AddPackToInventoryDtoToJson(
  AddPackToInventoryDto instance,
) => <String, dynamic>{
  'packId': instance.packId,
  'quantity': instance.quantity,
};

RemovePackFromInventoryDto _$RemovePackFromInventoryDtoFromJson(
  Map<String, dynamic> json,
) => RemovePackFromInventoryDto(
  packId: json['packId'] as String,
  quantity: (json['quantity'] as num).toInt(),
);

Map<String, dynamic> _$RemovePackFromInventoryDtoToJson(
  RemovePackFromInventoryDto instance,
) => <String, dynamic>{
  'packId': instance.packId,
  'quantity': instance.quantity,
};

AddPackToInventoryResult _$AddPackToInventoryResultFromJson(
  Map<String, dynamic> json,
) => AddPackToInventoryResult(
  success: json['success'] as bool,
  item: json['item'] == null
      ? null
      : UserPackInventoryItem.fromJson(json['item'] as Map<String, dynamic>),
  error: json['error'] as String?,
);

Map<String, dynamic> _$AddPackToInventoryResultToJson(
  AddPackToInventoryResult instance,
) => <String, dynamic>{
  'success': instance.success,
  'item': instance.item,
  'error': instance.error,
};

RemovePackFromInventoryResult _$RemovePackFromInventoryResultFromJson(
  Map<String, dynamic> json,
) => RemovePackFromInventoryResult(
  success: json['success'] as bool,
  remainingQuantity: (json['remainingQuantity'] as num?)?.toInt(),
  error: json['error'] as String?,
);

Map<String, dynamic> _$RemovePackFromInventoryResultToJson(
  RemovePackFromInventoryResult instance,
) => <String, dynamic>{
  'success': instance.success,
  'remainingQuantity': instance.remainingQuantity,
  'error': instance.error,
};
