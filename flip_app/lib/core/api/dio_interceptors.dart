import 'package:dio/dio.dart';
import '../auth/auth_service.dart';
import '../config/app_config.dart';
import '../utils/logger.dart';

class AuthInterceptor extends Interceptor {
  @override
  void onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    // Ajouter le token d'authentification à chaque requête
    final token = await AuthService.getAccessToken();
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }

    AppLogger.info('Requête API: ${options.method} ${options.path}');
    handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.response?.statusCode == 401) {
      // Token expiré, tenter de le renouveler
      final refreshToken = await AuthService.getRefreshToken();
      if (refreshToken != null) {
        try {
          // Créer une nouvelle instance Dio pour éviter la récursion
          final dio = Dio();
          final response = await dio.post(
            AppConfig.refreshUrl,
            data: {'refreshToken': refreshToken},
          );

          final newAccessToken = response.data['access_token'] as String;
          await AuthService.saveAccessToken(newAccessToken);

          // Réessayer la requête originale avec le nouveau token
          final requestOptions = err.requestOptions;
          requestOptions.headers['Authorization'] = 'Bearer $newAccessToken';

          final newResponse = await dio.fetch(requestOptions);
          handler.resolve(newResponse);
          return;
        } catch (e) {
          AppLogger.error('Échec du renouvellement du token: $e');
          // Supprimer la session expirée
          await AuthService.clearSession();
        }
      }
    }

    AppLogger.error('Erreur API: ${err.message}');
    handler.next(err);
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    AppLogger.info(
      'Réponse API: ${response.statusCode} ${response.requestOptions.path}',
    );
    handler.next(response);
  }
}

class LoggingInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    if (AppConfig.debugMode) {
      AppLogger.debug('🚀 REQUÊTE: ${options.method} ${options.uri}');
      AppLogger.debug('📋 Headers: ${options.headers}');
      AppLogger.debug('📝 Params: ${options.queryParameters}');
    }
    handler.next(options);
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    if (AppConfig.debugMode) {
      AppLogger.debug(
        '✅ RÉPONSE: ${response.statusCode} ${response.requestOptions.uri}',
      );
      AppLogger.debug('📋 Headers: ${response.headers}');
      AppLogger.debug('📄 Data: ${response.data}');
    }
    handler.next(response);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    if (AppConfig.debugMode) {
      AppLogger.debug('❌ ERREUR: ${err.message}');
      AppLogger.debug('📄 Response: ${err.response?.data}');
    }
    handler.next(err);
  }
}
