class UrlConstants {
  // Base URLs
  static const String baseUrl = 'http://localhost:4001';
  static const String apiPrefix = '/api';

  // Auth endpoints
  static const String authLogin = '$apiPrefix/auth/login';
  static const String authRegister = '$apiPrefix/auth/register';
  static const String authRefresh = '$apiPrefix/auth/refresh';
  static const String authLogout = '$apiPrefix/auth/logout';
  static const String authProfile = '$apiPrefix/auth/profile';
  static const String authValidateToken = '$apiPrefix/auth/validate-token';
  static const String authGoogle = '$apiPrefix/auth/google';
  static const String authGoogleVerifyIdToken =
      '$apiPrefix/auth/google/verify-id-token';
  static const String authCheck = '$apiPrefix/auth/check';

  // User endpoints
  static const String userProfile = '$apiPrefix/users/profile';
  static const String userUpdate = '$apiPrefix/users/update';

  // User Inventory endpoints
  static const String userInventory = '$apiPrefix/users/:userId/inventory';
  static const String userInventoryStats =
      '$apiPrefix/users/:userId/inventory/stats';
  static const String userInventoryAdd =
      '$apiPrefix/users/:userId/inventory/add';
  static const String userInventoryRemove =
      '$apiPrefix/users/:userId/inventory/remove';

  // User Pranks endpoints
  static const String userPranks = '$apiPrefix/users/:userId/pranks';
  static const String userPranksStats = '$apiPrefix/users/:userId/pranks/stats';
  static const String userPranksAdd = '$apiPrefix/users/:userId/pranks/add';
  static const String userPranksRemove =
      '$apiPrefix/users/:userId/pranks/remove';

  // Shop endpoints
  static const String shopPacks = '$apiPrefix/shop/packs';
  static const String shopPacksGrouped = '$apiPrefix/shop/packs/grouped';
  static const String shopBuyPack = '$apiPrefix/shop/buy';
  static const String shopOpenPack = '$apiPrefix/shop/open';

  // Banque endpoints
  static const String banqueStats = '$apiPrefix/banque/stats';
  static const String banqueServices = '$apiPrefix/banque/services';
  static const String banquePranks = '$apiPrefix/banque/pranks';
  static const String banqueTransactions = '$apiPrefix/banque/transactions';

  // Friendship endpoints
  static const String friendshipRequests = '$apiPrefix/friendships/requests';
  static const String friendshipSend = '$apiPrefix/friendships/send';
  static const String friendshipAccept = '$apiPrefix/friendships/accept';
  static const String friendshipDecline = '$apiPrefix/friendships/decline';
  static const String friendshipRemove = '$apiPrefix/friendships/remove';
  static const String friendshipStats = '$apiPrefix/friendships/stats';

  // Helper method to replace userId placeholder
  static String replaceUserId(String url, String userId) {
    return url.replaceAll(':userId', userId);
  }
}
