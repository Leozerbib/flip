import 'package:talker/talker.dart';

class AppLogger {
  static final talker = Talker();

  static void info(String message) {
    talker.info(message);
  }

  static void debug(String message) {
    talker.debug(message);
  }

  static void verbose(String message) {
    talker.verbose(message);
  }

  static void error(String message) {
    talker.error(message);
  }

  static void warning(String message) {
    talker.warning(message);
  }
} 