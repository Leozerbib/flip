import 'package:json_annotation/json_annotation.dart';
import 'prank_pack_model.dart';

part 'user_inventory_model.g.dart';

@JsonSerializable()
class UserPackInventoryItem {
  final String userPackInventoryId;
  final String userId;
  final String packId;
  final int quantity;
  final DateTime acquiredAt;
  final PrankPackModel pack;

  UserPackInventoryItem({
    required this.userPackInventoryId,
    required this.userId,
    required this.packId,
    required this.quantity,
    required this.acquiredAt,
    required this.pack,
  });

  factory UserPackInventoryItem.fromJson(Map<String, dynamic> json) =>
      _$UserPackInventoryItemFromJson(json);

  Map<String, dynamic> toJson() => _$UserPackInventoryItemToJson(this);
}

@JsonSerializable()
class UserPackInventory {
  final String userId;
  final List<UserPackInventoryItem> items;
  final int totalPacks;
  final Map<String, List<UserPackInventoryItem>> itemsByType;

  UserPackInventory({
    required this.userId,
    required this.items,
    required this.totalPacks,
    required this.itemsByType,
  });

  factory UserPackInventory.fromJson(Map<String, dynamic> json) =>
      _$UserPackInventoryFromJson(json);

  Map<String, dynamic> toJson() => _$UserPackInventoryToJson(this);
}

@JsonSerializable()
class UserPackInventoryStats {
  final int totalPacks;
  final double totalValue;
  final Map<String, PacksByTypeStats> packsByType;

  UserPackInventoryStats({
    required this.totalPacks,
    required this.totalValue,
    required this.packsByType,
  });

  factory UserPackInventoryStats.fromJson(Map<String, dynamic> json) =>
      _$UserPackInventoryStatsFromJson(json);

  Map<String, dynamic> toJson() => _$UserPackInventoryStatsToJson(this);
}

@JsonSerializable()
class PacksByTypeStats {
  final int count;
  final double totalValue;

  PacksByTypeStats({required this.count, required this.totalValue});

  factory PacksByTypeStats.fromJson(Map<String, dynamic> json) =>
      _$PacksByTypeStatsFromJson(json);

  Map<String, dynamic> toJson() => _$PacksByTypeStatsToJson(this);
}

// DTOs pour les opérations
@JsonSerializable()
class AddPackToInventoryDto {
  final String packId;
  final int quantity;

  AddPackToInventoryDto({required this.packId, required this.quantity});

  factory AddPackToInventoryDto.fromJson(Map<String, dynamic> json) =>
      _$AddPackToInventoryDtoFromJson(json);

  Map<String, dynamic> toJson() => _$AddPackToInventoryDtoToJson(this);
}

@JsonSerializable()
class RemovePackFromInventoryDto {
  final String packId;
  final int quantity;

  RemovePackFromInventoryDto({required this.packId, required this.quantity});

  factory RemovePackFromInventoryDto.fromJson(Map<String, dynamic> json) =>
      _$RemovePackFromInventoryDtoFromJson(json);

  Map<String, dynamic> toJson() => _$RemovePackFromInventoryDtoToJson(this);
}

@JsonSerializable()
class AddPackToInventoryResult {
  final bool success;
  final UserPackInventoryItem? item;
  final String? error;

  AddPackToInventoryResult({required this.success, this.item, this.error});

  factory AddPackToInventoryResult.fromJson(Map<String, dynamic> json) =>
      _$AddPackToInventoryResultFromJson(json);

  Map<String, dynamic> toJson() => _$AddPackToInventoryResultToJson(this);
}

@JsonSerializable()
class RemovePackFromInventoryResult {
  final bool success;
  final int? remainingQuantity;
  final String? error;

  RemovePackFromInventoryResult({
    required this.success,
    this.remainingQuantity,
    this.error,
  });

  factory RemovePackFromInventoryResult.fromJson(Map<String, dynamic> json) =>
      _$RemovePackFromInventoryResultFromJson(json);

  Map<String, dynamic> toJson() => _$RemovePackFromInventoryResultToJson(this);
}
