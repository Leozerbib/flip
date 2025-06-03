import 'dart:developer' as developer;

class AppLogger {
  static void info(String message) {
    developer.log(message, name: 'INFO');
  }

  static void debug(String message) {
    developer.log(message, name: 'DEBUG');
  }

  static void error(String message) {
    developer.log(message, name: 'ERROR');
  }

  static void warning(String message) {
    developer.log(message, name: 'WARNING');
  }
} 