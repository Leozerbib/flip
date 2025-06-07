class ServiceModel {
  final int serviceId;
  final int providerId;
  final int clientId;
  final String title;
  final String description;
  final int price;
  final String status;
  final String type; // 'service' ou 'prank'
  final DateTime createdAt;
  final DateTime? confirmedAt;
  final DateTime? completedAt;
  final UserInfo provider;
  final UserInfo client;
  final RepaymentServiceInfo? repaymentService;

  ServiceModel({
    required this.serviceId,
    required this.providerId,
    required this.clientId,
    required this.title,
    required this.description,
    required this.price,
    required this.status,
    required this.type,
    required this.createdAt,
    this.confirmedAt,
    this.completedAt,
    required this.provider,
    required this.client,
    this.repaymentService,
  });

  factory ServiceModel.fromJson(Map<String, dynamic> json) {
    return ServiceModel(
      serviceId: json['service_id'] != null
          ? int.parse(json['service_id'].toString())
          : json['serviceId'] != null
          ? int.parse(json['serviceId'].toString())
          : 0,
      providerId: json['provider_id'] != null
          ? int.parse(json['provider_id'].toString())
          : json['providerId'] != null
          ? int.parse(json['providerId'].toString())
          : 0,
      clientId: json['beneficiary_id'] != null
          ? int.parse(json['beneficiary_id'].toString())
          : json['beneficiary_id'] != null
          ? int.parse(json['beneficiary_id'].toString())
          : 0,
      title: json['description'] ?? '',
      description: json['description'] ?? '',
      price: json['jeton_value'] != null
          ? int.parse(json['jeton_value'].toString())
          : 0,
      status: switch (json['status']) {
        'pending_confirmation' => ServiceStatus.pending.value,
        'confirmed_unpaid' => ServiceStatus.confirmed.value,
        'completed' => ServiceStatus.completed.value,
        'cancelled' => ServiceStatus.cancelled.value,
        'repaid_by_service' => ServiceStatus.repaid.value,
        'repaid_by_prank' => ServiceStatus.repaid.value,
        Object() => ServiceStatus.pending.value,
        null => ServiceStatus.pending.value,
      },
      type: json['type'] ?? 'service',
      createdAt:
          DateTime.tryParse(json['created_at'] ?? json['createdAt'] ?? '') ??
          DateTime.now(),
      confirmedAt: json['confirmed_at'] != null || json['confirmedAt'] != null
          ? DateTime.tryParse(json['confirmed_at'] ?? json['confirmedAt'])
          : null,
      completedAt: json['completed_at'] != null || json['completedAt'] != null
          ? DateTime.tryParse(json['completed_at'] ?? json['completedAt'])
          : null,
      provider: UserInfo.fromJson(json['provider'] ?? {}),
      client: UserInfo.fromJson(json['client'] ?? {}),
      repaymentService:
          json['repayment_service'] != null || json['repaymentService'] != null
          ? RepaymentServiceInfo.fromJson(
              json['repayment_service'] ?? json['repaymentService'],
            )
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'service_id': serviceId,
      'provider_id': providerId,
      'client_id': clientId,
      'title': title,
      'description': description,
      'price': price,
      'status': status,
      'type': type,
      'created_at': createdAt.toIso8601String(),
      'confirmed_at': confirmedAt?.toIso8601String(),
      'completed_at': completedAt?.toIso8601String(),
      'provider': provider.toJson(),
      'client': client.toJson(),
      'repayment_service': repaymentService?.toJson(),
    };
  }

  ServiceModel copyWith({
    int? serviceId,
    int? providerId,
    int? clientId,
    String? title,
    String? description,
    int? price,
    String? status,
    String? type,
    DateTime? createdAt,
    DateTime? confirmedAt,
    DateTime? completedAt,
    UserInfo? provider,
    UserInfo? client,
    RepaymentServiceInfo? repaymentService,
  }) {
    return ServiceModel(
      serviceId: serviceId ?? this.serviceId,
      providerId: providerId ?? this.providerId,
      clientId: clientId ?? this.clientId,
      title: title ?? this.title,
      description: description ?? this.description,
      price: price ?? this.price,
      status: status ?? this.status,
      type: type ?? this.type,
      createdAt: createdAt ?? this.createdAt,
      confirmedAt: confirmedAt ?? this.confirmedAt,
      completedAt: completedAt ?? this.completedAt,
      provider: provider ?? this.provider,
      client: client ?? this.client,
      repaymentService: repaymentService ?? this.repaymentService,
    );
  }
}

class UserInfo {
  final int userId;
  final String username;
  final String? profilePictureUrl;
  final int level;
  final int xpPoints;

  UserInfo({
    required this.userId,
    required this.username,
    this.profilePictureUrl,
    required this.level,
    required this.xpPoints,
  });

  factory UserInfo.fromJson(Map<String, dynamic> json) {
    return UserInfo(
      userId: json['user_id'] ?? json['userId'] ?? 0,
      username: json['username'] ?? '',
      profilePictureUrl:
          json['profile_picture_url'] ?? json['profilePictureUrl'],
      level: json['level'] ?? 1,
      xpPoints: json['xp_points'] ?? json['xpPoints'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'user_id': userId,
      'username': username,
      'profile_picture_url': profilePictureUrl,
      'level': level,
      'xp_points': xpPoints,
    };
  }
}

class RepaymentServiceInfo {
  final int serviceId;
  final String title;
  final String status;

  RepaymentServiceInfo({
    required this.serviceId,
    required this.title,
    required this.status,
  });

  factory RepaymentServiceInfo.fromJson(Map<String, dynamic> json) {
    return RepaymentServiceInfo(
      serviceId: json['service_id'] ?? json['serviceId'] ?? 0,
      title: json['title'] ?? '',
      status: json['status'] ?? 'pending',
    );
  }

  Map<String, dynamic> toJson() {
    return {'service_id': serviceId, 'title': title, 'status': status};
  }
}

// Enum pour les statuts de service
enum ServiceStatus { pending, confirmed, completed, cancelled, repaid }

extension ServiceStatusExtension on ServiceStatus {
  String get value {
    switch (this) {
      case ServiceStatus.pending:
        return 'pending';
      case ServiceStatus.confirmed:
        return 'confirmed';
      case ServiceStatus.completed:
        return 'completed';
      case ServiceStatus.cancelled:
        return 'cancelled';
      case ServiceStatus.repaid:
        return 'repaid';
    }
  }

  static ServiceStatus fromString(String status) {
    switch (status.toLowerCase()) {
      case 'pending':
        return ServiceStatus.pending;
      case 'confirmed':
        return ServiceStatus.confirmed;
      case 'completed':
        return ServiceStatus.completed;
      case 'cancelled':
        return ServiceStatus.cancelled;
      case 'repaid':
        return ServiceStatus.repaid;
      default:
        return ServiceStatus.pending;
    }
  }
}

// Enum pour les types de service
enum ServiceType { service, prank }

extension ServiceTypeExtension on ServiceType {
  String get value {
    switch (this) {
      case ServiceType.service:
        return 'service';
      case ServiceType.prank:
        return 'prank';
    }
  }

  static ServiceType fromString(String type) {
    switch (type.toLowerCase()) {
      case 'service':
        return ServiceType.service;
      case 'prank':
        return ServiceType.prank;
      default:
        return ServiceType.service;
    }
  }
}
