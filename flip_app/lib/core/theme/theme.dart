import 'package:flutter/material.dart';

class ThemeColors {
  final Color primary;
  final Color background;
  final Color foreground;

  const ThemeColors({
    required this.primary,
    required this.background,
    required this.foreground,
  });
}

class ThemeTypography {
  final TextStyle xl3;
  final TextStyle xl;
  final TextStyle lg;
  final TextStyle sm;

  const ThemeTypography({
    required this.xl3,
    required this.xl,
    required this.lg,
    required this.sm,
  });
}

class AppTheme {
  final ThemeColors colors;
  final ThemeTypography typography;

  const AppTheme({required this.colors, required this.typography});

  static AppTheme get light => AppTheme(
    colors: ThemeColors(
      primary: const Color(0xFF6C63FF),
      background: Colors.white,
      foreground: Colors.black,
    ),
    typography: ThemeTypography(
      xl3: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold),
      xl: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
      lg: const TextStyle(fontSize: 18),
      sm: const TextStyle(fontSize: 14),
    ),
  );

  static AppTheme get dark => AppTheme(
    colors: ThemeColors(
      primary: const Color(0xFF6C63FF),
      background: const Color(0xFF1A1A1A),
      foreground: Colors.white,
    ),
    typography: ThemeTypography(
      xl3: const TextStyle(
        fontSize: 48,
        fontWeight: FontWeight.bold,
        color: Colors.white,
      ),
      xl: const TextStyle(
        fontSize: 24,
        fontWeight: FontWeight.bold,
        color: Colors.white,
      ),
      lg: const TextStyle(fontSize: 18, color: Colors.white),
      sm: const TextStyle(fontSize: 14, color: Colors.white),
    ),
  );
}
