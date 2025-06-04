import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import '../../theme/theme.dart';

class ThemeManager extends ChangeNotifier {
  static const String _themeTypeKey = "theme_type";
  static const String _themeVariantKey = "theme_variant";
  
  SharedPreferences? _prefs;
  ThemeType _currentThemeType = ThemeType.classic;
  ThemeVariant _currentVariant = ThemeVariant.light;
  bool _isInitialized = false;

  ThemeType get currentThemeType => _currentThemeType;
  ThemeVariant get currentVariant => _currentVariant;
  bool get isDarkMode => _currentVariant == ThemeVariant.dark;
  bool get isInitialized => _isInitialized;
  
  /// Get current theme data
  FThemeData get currentTheme => AppThemes.getTheme(_currentThemeType, _currentVariant);

  /// Get theme name for display
  String get currentThemeName {
    final typeName = _getThemeTypeName(_currentThemeType);
    final variantName = _currentVariant == ThemeVariant.light ? 'Clair' : 'Sombre';
    return '$typeName ($variantName)';
  }

  ThemeManager() {
    // Don't await in constructor, just start the async process
    _initializeAsync();
  }

  /// Async initialization without blocking constructor
  void _initializeAsync() async {
    try {
      await _loadPreferences();
      _isInitialized = true;
    } catch (e) {
      // If loading fails, just use defaults
      _isInitialized = true;
      notifyListeners();
    }
  }

  /// Initialize SharedPreferences
  Future<void> _initializePrefs() async {
    _prefs ??= await SharedPreferences.getInstance();
  }

  /// Load saved theme preferences
  Future<void> _loadPreferences() async {
    try {
      await _initializePrefs();
      
      final themeTypeIndex = _prefs?.getInt(_themeTypeKey) ?? 0;
      final themeVariantIndex = _prefs?.getInt(_themeVariantKey) ?? 0;
      
      // Ensure indices are valid
      if (themeTypeIndex >= 0 && themeTypeIndex < ThemeType.values.length) {
        _currentThemeType = ThemeType.values[themeTypeIndex];
      }
      
      if (themeVariantIndex >= 0 && themeVariantIndex < ThemeVariant.values.length) {
        _currentVariant = ThemeVariant.values[themeVariantIndex];
      }
      
      notifyListeners();
    } catch (e) {
      // If loading fails, use defaults and notify listeners
      debugPrint('Error loading theme preferences: $e');
      notifyListeners();
    }
  }

  /// Save theme preferences
  Future<void> _savePreferences() async {
    try {
      await _initializePrefs();
      
      await _prefs?.setInt(_themeTypeKey, _currentThemeType.index);
      await _prefs?.setInt(_themeVariantKey, _currentVariant.index);
    } catch (e) {
      debugPrint('Error saving theme preferences: $e');
    }
  }

  /// Switch to a specific theme type
  Future<void> switchThemeType(ThemeType themeType) async {
    if (_currentThemeType != themeType) {
      _currentThemeType = themeType;
      await _savePreferences();
      notifyListeners();
    }
  }

  /// Switch between light and dark variants
  Future<void> switchVariant(ThemeVariant variant) async {
    if (_currentVariant != variant) {
      _currentVariant = variant;
      await _savePreferences();
      notifyListeners();
    }
  }

  /// Toggle between light and dark
  Future<void> toggleVariant() async {
    final newVariant = _currentVariant == ThemeVariant.light 
        ? ThemeVariant.dark 
        : ThemeVariant.light;
    await switchVariant(newVariant);
  }

  /// Switch to specific theme and variant
  Future<void> switchTheme(ThemeType themeType, ThemeVariant variant) async {
    bool changed = false;
    
    if (_currentThemeType != themeType) {
      _currentThemeType = themeType;
      changed = true;
    }
    
    if (_currentVariant != variant) {
      _currentVariant = variant;
      changed = true;
    }
    
    if (changed) {
      await _savePreferences();
      notifyListeners();
    }
  }

  /// Get all available themes for display
  List<ThemeOption> get availableThemes {
    return [
      for (final type in ThemeType.values)
        for (final variant in ThemeVariant.values)
          ThemeOption(
            type: type,
            variant: variant,
            name: '${_getThemeTypeName(type)} (${variant == ThemeVariant.light ? 'Clair' : 'Sombre'})',
            description: _getThemeDescription(type, variant),
          ),
    ];
  }

  /// Get theme type display name
  String _getThemeTypeName(ThemeType type) {
    switch (type) {
      case ThemeType.classic:
        return 'Classique';
      case ThemeType.hot:
        return 'Chaud';
      case ThemeType.cold:
        return 'Froid';
    }
  }

  /// Get theme description
  String _getThemeDescription(ThemeType type, ThemeVariant variant) {
    final baseDescription = switch (type) {
      ThemeType.classic => 'Couleurs neutres et équilibrées',
      ThemeType.hot => 'Couleurs chaudes (rouge, orange)',
      ThemeType.cold => 'Couleurs froides (bleu, cyan)',
    };
    
    final variantDescription = variant == ThemeVariant.light 
        ? 'avec un fond clair' 
        : 'avec un fond sombre';
        
    return '$baseDescription $variantDescription';
  }
}

/// Theme option data class
class ThemeOption {
  final ThemeType type;
  final ThemeVariant variant;
  final String name;
  final String description;

  const ThemeOption({
    required this.type,
    required this.variant,
    required this.name,
    required this.description,
  });

  bool isSelected(ThemeType currentType, ThemeVariant currentVariant) {
    return type == currentType && variant == currentVariant;
  }
}

// Provider for theme manager
final themeManagerProvider = ChangeNotifierProvider<ThemeManager>((ref) {
  return ThemeManager();
}); 