import 'package:forui/forui.dart';
import 'package:flutter/material.dart';

// ignore_for_file: avoid_redundant_argument_values

/// Theme variants enum
enum ThemeType { classic, hot, cold }
enum ThemeVariant { light, dark }

/// Theme data for all variants
class AppThemes {
  // Classic themes
  static FThemeData get classicLight => _createClassicTheme(ThemeVariant.light);
  static FThemeData get classicDark => _createClassicTheme(ThemeVariant.dark);
  
  // Hot themes  
  static FThemeData get hotLight => _createHotTheme(ThemeVariant.light);
  static FThemeData get hotDark => _createHotTheme(ThemeVariant.dark);
  
  // Cold themes
  static FThemeData get coldLight => _createColdTheme(ThemeVariant.light);
  static FThemeData get coldDark => _createColdTheme(ThemeVariant.dark);

  /// Get theme by type and variant
  static FThemeData getTheme(ThemeType type, ThemeVariant variant) {
    switch (type) {
      case ThemeType.classic:
        return variant == ThemeVariant.light ? classicLight : classicDark;
      case ThemeType.hot:
        return variant == ThemeVariant.light ? hotLight : hotDark;
      case ThemeType.cold:
        return variant == ThemeVariant.light ? coldLight : coldDark;
    }
  }
}

/// Classic theme (neutral colors)
FThemeData _createClassicTheme(ThemeVariant variant) {
  final isLight = variant == ThemeVariant.light;
  
  final colors = FColors(
    brightness: isLight ? Brightness.light : Brightness.dark,
    barrier: const Color(0x33000000),
    background: isLight ? const Color(0xFFFFFFFF) : const Color(0xFF0A0A0A),
    foreground: isLight ? const Color(0xFF09090B) : const Color(0xFFFAFAFA),
    primary: isLight ? const Color(0xFF18181B) : const Color(0xFFFAFAFA),
    primaryForeground: isLight ? const Color(0xFFFAFAFA) : const Color(0xFF18181B),
    secondary: isLight ? const Color(0xFFF4F4F5) : const Color(0xFF27272A),
    secondaryForeground: isLight ? const Color(0xFF18181B) : const Color(0xFFFAFAFA),
    muted: isLight ? const Color(0xFFF4F4F5) : const Color(0xFF27272A),
    mutedForeground: isLight ? const Color(0xFF71717A) : const Color(0xFFA1A1AA),
    destructive: const Color(0xFFEF4444),
    destructiveForeground: const Color(0xFFFAFAFA),
    error: const Color(0xFFEF4444),
    errorForeground: const Color(0xFFFAFAFA),
    border: isLight ? const Color(0xFFE4E4E7) : const Color(0xFF27272A),
  );

  final typography = _typography(colors: colors);
  final style = _style(colors: colors, typography: typography);

  return FThemeData(colors: colors, typography: typography, style: style);
}

/// Hot theme (warm colors - reds, oranges, yellows)
FThemeData _createHotTheme(ThemeVariant variant) {
  final isLight = variant == ThemeVariant.light;
  
  final colors = FColors(
    brightness: isLight ? Brightness.light : Brightness.dark,
    barrier: const Color(0x33000000),
    background: isLight ? const Color(0xFFFFF8F0) : const Color(0xFF1A0A00),
    foreground: isLight ? const Color(0xFF7C2D12) : const Color(0xFFFED7AA),
    primary: isLight ? const Color(0xFFDC2626) : const Color(0xFFEF4444),
    primaryForeground: isLight ? const Color(0xFFFEF2F2) : const Color(0xFF7F1D1D),
    secondary: isLight ? const Color(0xFFFED7AA) : const Color(0xFF7C2D12),
    secondaryForeground: isLight ? const Color(0xFF7C2D12) : const Color(0xFFFED7AA),
    muted: isLight ? const Color(0xFFFEECDC) : const Color(0xFF451A03),
    mutedForeground: isLight ? const Color(0xFFA16207) : const Color(0xFFD97706),
    destructive: const Color(0xFFB91C1C),
    destructiveForeground: const Color(0xFFFEF2F2),
    error: const Color(0xFFB91C1C),
    errorForeground: const Color(0xFFFEF2F2),
    border: isLight ? const Color(0xFFFBBF24) : const Color(0xFF92400E),
  );

  final typography = _typography(colors: colors);
  final style = _style(colors: colors, typography: typography);

  return FThemeData(colors: colors, typography: typography, style: style);
}

/// Cold theme (cool colors - blues, teals, purples)
FThemeData _createColdTheme(ThemeVariant variant) {
  final isLight = variant == ThemeVariant.light;
  
  final colors = FColors(
    brightness: isLight ? Brightness.light : Brightness.dark,
    barrier: const Color(0x33000000),
    background: isLight ? const Color(0xFFF0F9FF) : const Color(0xFF0C1426),
    foreground: isLight ? const Color(0xFF0F172A) : const Color(0xFFE2E8F0),
    primary: isLight ? const Color(0xFF0EA5E9) : const Color(0xFF38BDF8),
    primaryForeground: isLight ? const Color(0xFFF0F9FF) : const Color(0xFF0C4A6E),
    secondary: isLight ? const Color(0xFFBAE6FD) : const Color(0xFF1E3A8A),
    secondaryForeground: isLight ? const Color(0xFF0F172A) : const Color(0xFFBAE6FD),
    muted: isLight ? const Color(0xFFE0F2FE) : const Color(0xFF1E293B),
    mutedForeground: isLight ? const Color(0xFF475569) : const Color(0xFF94A3B8),
    destructive: const Color(0xFF3B82F6),
    destructiveForeground: const Color(0xFFF0F9FF),
    error: const Color(0xFF3B82F6),
    errorForeground: const Color(0xFFF0F9FF),
    border: isLight ? const Color(0xFF7DD3FC) : const Color(0xFF334155),
  );

  final typography = _typography(colors: colors);
  final style = _style(colors: colors, typography: typography);

  return FThemeData(colors: colors, typography: typography, style: style);
}

FTypography _typography({
  required FColors colors,
  String defaultFontFamily = 'packages/forui/Inter',
}) => FTypography(
  xs: TextStyle(
    color: colors.foreground,
    fontFamily: defaultFontFamily,
    fontSize: 12,
    height: 1,
  ),
  sm: TextStyle(
    color: colors.foreground,
    fontFamily: defaultFontFamily,
    fontSize: 14,
    height: 1.25,
  ),
  base: TextStyle(
    color: colors.foreground,
    fontFamily: defaultFontFamily,
    fontSize: 16,
    height: 1.5,
  ),
  lg: TextStyle(
    color: colors.foreground,
    fontFamily: defaultFontFamily,
    fontSize: 18,
    height: 1.75,
  ),
  xl: TextStyle(
    color: colors.foreground,
    fontFamily: defaultFontFamily,
    fontSize: 20,
    height: 1.75,
  ),
  xl2: TextStyle(
    color: colors.foreground,
    fontFamily: defaultFontFamily,
    fontSize: 22,
    height: 2,
  ),
  xl3: TextStyle(
    color: colors.foreground,
    fontFamily: defaultFontFamily,
    fontSize: 30,
    height: 2.25,
  ),
  xl4: TextStyle(
    color: colors.foreground,
    fontFamily: defaultFontFamily,
    fontSize: 36,
    height: 2.5,
  ),
  xl5: TextStyle(
    color: colors.foreground,
    fontFamily: defaultFontFamily,
    fontSize: 48,
    height: 1,
  ),
  xl6: TextStyle(
    color: colors.foreground,
    fontFamily: defaultFontFamily,
    fontSize: 60,
    height: 1,
  ),
  xl7: TextStyle(
    color: colors.foreground,
    fontFamily: defaultFontFamily,
    fontSize: 72,
    height: 1,
  ),
  xl8: TextStyle(
    color: colors.foreground,
    fontFamily: defaultFontFamily,
    fontSize: 96,
    height: 1,
  ),
);

FStyle _style({required FColors colors, required FTypography typography}) =>
    FStyle(
      formFieldStyle: FFormFieldStyle.inherit(
        colors: colors,
        typography: typography,
      ),
      focusedOutlineStyle: FFocusedOutlineStyle(
        color: colors.primary,
        borderRadius: const BorderRadius.all(Radius.circular(8)),
      ),
      iconStyle: IconThemeData(color: colors.primary, size: 20),
      tappableStyle: FTappableStyle(),
      borderRadius: const FLerpBorderRadius.all(Radius.circular(8), min: 24),
      borderWidth: 1,
      pagePadding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
      shadow: const [
        BoxShadow(
          color: Color(0x0d000000),
          offset: Offset(0, 1),
          blurRadius: 2,
        ),
      ],
    );
