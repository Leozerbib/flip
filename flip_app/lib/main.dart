import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'core/navigation/app_router.dart';
import 'core/theme/theme_manager.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Load environment variables
  await dotenv.load(fileName: ".env");
  
  runApp(
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);
    final themeManager = ref.watch(themeManagerProvider);

    return FTheme(
      data: themeManager.currentTheme,
      child: MaterialApp.router(
        title: 'Flip App',
        routerConfig: router,
        debugShowCheckedModeBanner: false,
      ),
    );
  }
} 