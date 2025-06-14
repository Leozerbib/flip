import 'dart:convert';
import 'package:dio/dio.dart';
import '../../data/models/models.dart';
import '../utils/logger.dart';
import 'api_client.dart';

class ShopService {
  static final Dio _dio = ApiClient.dio;

  /// Récupérer tous les packs de pranks disponibles
  static Future<List<PrankPackModel>?> getAvailablePrankPacks() async {
    try {
      AppLogger.info('Récupération des packs de pranks disponibles');

      final response = await _dio.get('/api/prank-packs');

      if (response.statusCode == 200) {
        final List<dynamic> packsJson = response.data ?? [];
        final packs = packsJson
            .map((json) => PrankPackModel.fromJson(json))
            .toList();

        AppLogger.info('Packs de pranks récupérés: ${packs.length}');
        return packs;
      }
      return [];
    } catch (e) {
      AppLogger.error('Erreur récupération packs de pranks: $e');
      rethrow;
    }
  }

  /// Récupérer tous les packs de pranks groupés par type
  static Future<PacksByTypeModel?> getAvailablePrankPacksGrouped() async {
    try {
      AppLogger.info('Récupération des packs de pranks groupés par type');

      final response = await _dio.get('/api/prank-packs/grouped');

      if (response.statusCode == 200) {
        final packsGrouped = PacksByTypeModel.fromJson(response.data ?? {});
        AppLogger.info(
          'Packs de pranks groupés récupérés: ${packsGrouped.allPacks.length} total',
        );
        return packsGrouped;
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur récupération packs groupés: $e');
      rethrow;
    }
  }

  /// Récupérer les pranks disponibles dans un pack
  static Future<PackAvailablePranksModel?> getPackAvailablePranks(
    int packId,
  ) async {
    try {
      AppLogger.info(
        'Récupération des pranks disponibles pour le pack: $packId',
      );

      final response = await _dio.get('/api/prank-packs/$packId/pranks');

      if (response.statusCode == 200) {
        final availablePranks = PackAvailablePranksModel.fromJson(
          response.data ?? {},
        );
        AppLogger.info(
          'Pranks disponibles récupérés: ${availablePranks.allAvailablePranks.length}',
        );
        return availablePranks;
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur récupération pranks disponibles: $e');
      rethrow;
    }
  }

  /// Ouvrir un pack de pranks
  static Future<PackOpeningResultModel?> openPrankPack(int packId) async {
    try {
      AppLogger.info('Ouverture du pack de pranks: $packId');

      final response = await _dio.post('/api/prank-packs/$packId/open');
      if (response.data['success'] == true) {
        AppLogger.info('Pack ouvert avec succès');
        return PackOpeningResultModel.fromJson(response.data);
      } else {
        // Gérer les erreurs d'ouverture
        final error = PackOpeningErrorModel.fromJson(response.data);
        AppLogger.error('Erreur ouverture pack: ${error.errorMessage}');
        throw ShopException(error.errorCode, error.errorMessage);
      }
    } catch (e) {
      if (e is ShopException) {
        rethrow;
      }
      AppLogger.error('Erreur ouverture pack de pranks: $e');
      rethrow;
    }
  }

  /// Ouvrir plusieurs packs de pranks d'un coup
  static Future<MultiplePackOpeningResultModel?> openMultiplePrankPacks(
    int packId,
    int quantity,
  ) async {
    try {
      AppLogger.info('Ouverture de $quantity packs de pranks: $packId');

      final response = await _dio.post(
        '/api/prank-packs/$packId/open-multiple',
        data: {'quantity': quantity},
      );

      if (response.data['success'] == true) {
        AppLogger.info('$quantity packs ouverts avec succès');
        return MultiplePackOpeningResultModel.fromJson(response.data);
      } else {
        // Gérer les erreurs d'ouverture
        final error = PackOpeningErrorModel.fromJson(response.data);
        AppLogger.error(
          'Erreur ouverture packs multiples: ${error.errorMessage}',
        );
        throw ShopException(error.errorCode, error.errorMessage);
      }
    } catch (e) {
      if (e is ShopException) {
        rethrow;
      }
      AppLogger.error('Erreur ouverture packs multiples: $e');
      rethrow;
    }
  }

  /// Récupérer les détails d'un pack spécifique
  static Future<PrankPackModel?> getPrankPackById(int packId) async {
    try {
      AppLogger.info('Récupération détails pack: $packId');

      final response = await _dio.get('/api/prank-packs/$packId');

      if (response.statusCode == 200) {
        AppLogger.info('Détails pack récupérés avec succès');
        return PrankPackModel.fromJson(response.data);
      }
      return null;
    } catch (e) {
      AppLogger.error('Erreur récupération détails pack: $e');
      rethrow;
    }
  }

  /// Vérifier si l'utilisateur peut ouvrir un pack
  static bool canOpenPack(PrankPackModel pack, int userLevel, int userCoins) {
    // Vérifier si le pack est disponible
    if (!pack.isCurrentlyAvailable) {
      return false;
    }

    // Vérifier le niveau requis
    if (pack.requiredUserLevel != null && userLevel < pack.requiredUserLevel!) {
      return false;
    }

    // Vérifier la devise (pour l'instant seulement game_coins)
    if (pack.costCurrencyType == CurrencyType.gameCoins) {
      return userCoins >= pack.costAmount;
    }

    // Pour les autres devises, on assume qu'on ne peut pas encore les vérifier
    return false;
  }

  /// Vérifier si l'utilisateur peut ouvrir plusieurs packs
  static bool canOpenMultiplePacks(
    PrankPackModel pack,
    int userLevel,
    int userCoins,
    int quantity,
  ) {
    // Vérifier si le pack est disponible
    if (!pack.isCurrentlyAvailable) {
      return false;
    }

    // Vérifier le niveau requis
    if (pack.requiredUserLevel != null && userLevel < pack.requiredUserLevel!) {
      return false;
    }

    // Vérifier la devise pour tous les packs
    if (pack.costCurrencyType == CurrencyType.gameCoins) {
      return userCoins >= (pack.costAmount * quantity);
    }

    return false;
  }

  /// Obtenir le message d'erreur pour un pack non ouvrable
  static String getPackNotOpenableReason(
    PrankPackModel pack,
    int userLevel,
    int userCoins,
  ) {
    if (!pack.isCurrentlyAvailable) {
      if (pack.isAvailable != true) {
        return 'Ce pack n\'est pas disponible';
      }
      if (pack.availableFrom != null &&
          DateTime.now().isBefore(pack.availableFrom!)) {
        return 'Ce pack sera disponible plus tard';
      }
      if (pack.availableUntil != null &&
          DateTime.now().isAfter(pack.availableUntil!)) {
        return 'Ce pack n\'est plus disponible';
      }
    }

    if (pack.requiredUserLevel != null && userLevel < pack.requiredUserLevel!) {
      return 'Niveau ${pack.requiredUserLevel} requis (votre niveau: $userLevel)';
    }

    if (pack.costCurrencyType == CurrencyType.gameCoins &&
        userCoins < pack.costAmount) {
      return 'Coins insuffisants (requis: ${pack.costAmount}, disponible: $userCoins)';
    }

    return 'Impossible d\'ouvrir ce pack';
  }

  /// Obtenir le message d'erreur pour l'ouverture multiple
  static String getMultiplePackNotOpenableReason(
    PrankPackModel pack,
    int userLevel,
    int userCoins,
    int quantity,
  ) {
    if (!pack.isCurrentlyAvailable) {
      if (pack.isAvailable != true) {
        return 'Ce pack n\'est pas disponible';
      }
      if (pack.availableFrom != null &&
          DateTime.now().isBefore(pack.availableFrom!)) {
        return 'Ce pack sera disponible plus tard';
      }
      if (pack.availableUntil != null &&
          DateTime.now().isAfter(pack.availableUntil!)) {
        return 'Ce pack n\'est plus disponible';
      }
    }

    if (pack.requiredUserLevel != null && userLevel < pack.requiredUserLevel!) {
      return 'Niveau ${pack.requiredUserLevel} requis (votre niveau: $userLevel)';
    }

    final totalCost = pack.costAmount * quantity;
    if (pack.costCurrencyType == CurrencyType.gameCoins &&
        userCoins < totalCost) {
      return 'Coins insuffisants (requis: $totalCost, disponible: $userCoins)';
    }

    return 'Impossible d\'ouvrir ces packs';
  }
}

/// Exception personnalisée pour les erreurs du shop
class ShopException implements Exception {
  final String code;
  final String message;

  ShopException(this.code, this.message);

  @override
  String toString() => 'ShopException: $code - $message';

  /// Obtenir un message utilisateur convivial
  String get userFriendlyMessage {
    switch (code) {
      case 'PACK_NOT_FOUND':
        return 'Pack introuvable';
      case 'PACK_NOT_AVAILABLE':
        return 'Pack non disponible actuellement';
      case 'INSUFFICIENT_LEVEL':
        return 'Niveau insuffisant pour ouvrir ce pack';
      case 'INSUFFICIENT_CURRENCY':
        return 'Coins insuffisants';
      case 'NO_ACTIVE_PRANKS':
        return 'Aucun prank disponible dans ce pack';
      case 'INSUFFICIENT_PACKS':
        return 'Impossible d\'ouvrir le nombre de packs demandé';
      default:
        return message;
    }
  }
}
