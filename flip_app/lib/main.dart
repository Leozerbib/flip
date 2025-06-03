import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/config/app_config.dart';
import 'app.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialiser la configuration de l'application
  await AppConfig.initialize();
  
  runApp(
    const ProviderScope(
      child: FlipApp(),
    ),
  );
} 