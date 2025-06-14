import 'package:flip_app/core/theme/theme_manager.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import 'package:go_router/go_router.dart';
import '../view_models/auth_provider.dart';
import '../../data/models/auth_models.dart' hide AuthState;

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authProvider);
    final themeManager = ref.watch(themeManagerProvider);
    // Écouter les changements d'état pour la navigation
    ref.listen<AuthState>(authProvider, (previous, next) {
      if (next.status == AuthStatus.authenticated) {
        // Navigation vers l'écran principal sera gérée par le router
      } else if (next.status == AuthStatus.error && next.error != null) {
        _showErrorDialog(next.error!);
      }
    });

    return FScaffold(
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 400),
              child: Form(
                key: _formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // Logo et titre
                    Center(
                      child: Image.asset(
                        'assets/logo/logo.png',
                        width: 180,
                        height: 180,
                        fit: BoxFit.contain,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'Connexion',
                      style: themeManager.currentTheme.typography.xl3,
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 32),

                    // Champ email
                    FTextFormField.email(
                      controller: _emailController,
                      label: const Text('Email'),
                      hint: 'votre@email.com',
                      autovalidateMode: AutovalidateMode.onUserInteraction,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Veuillez saisir votre email';
                        }
                        if (!RegExp(
                          r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$',
                        ).hasMatch(value)) {
                          return 'Format d\'email invalide';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),

                    // Champ mot de passe
                    FTextFormField.password(
                      controller: _passwordController,
                      label: const Text('Mot de passe'),
                      hint: 'Votre mot de passe',
                      autovalidateMode: AutovalidateMode.onUserInteraction,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Veuillez saisir votre mot de passe';
                        }
                        if (value.length < 6) {
                          return 'Le mot de passe doit contenir au moins 6 caractères';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 24),

                    // Bouton de connexion
                    FButton(
                      onPress: authState.status == AuthStatus.loading
                          ? null
                          : _handleLogin,
                      child: authState.status == AuthStatus.loading
                          ? const Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                SizedBox(
                                  width: 16,
                                  height: 16,
                                  child: CircularProgressIndicator(
                                    strokeWidth: 2,
                                  ),
                                ),
                                SizedBox(width: 8),
                                Text('Connexion...'),
                              ],
                            )
                          : const Text('Se connecter'),
                    ),
                    const SizedBox(height: 16),

                    // Diviseur "OU"
                    Row(
                      children: [
                        Expanded(child: Divider()),
                        Padding(
                          padding: EdgeInsets.symmetric(horizontal: 16),
                          child: Text(
                            'OU',
                            style: themeManager.currentTheme.typography.base
                                .copyWith(
                                  color: themeManager
                                      .currentTheme
                                      .colors
                                      .mutedForeground,
                                ),
                          ),
                        ),
                        Expanded(child: Divider()),
                      ],
                    ),
                    const SizedBox(height: 16),

                    // Bouton Google
                    FButton(
                      prefix: const Icon(FIcons.chrome),
                      style: FButtonStyle.outline,
                      onPress: authState.status == AuthStatus.loading
                          ? null
                          : _handleGoogleLogin,
                      child: const Text('Continuer avec Google'),
                    ),
                    const SizedBox(height: 24),

                    // Lien vers l'inscription
                    TextButton(
                      onPressed: () => context.go('/register'),
                      child: Text.rich(
                        TextSpan(
                          children: [
                            TextSpan(
                              text: 'Pas encore de compte ? ',
                              style: themeManager.currentTheme.typography.base
                                  .copyWith(
                                    color: themeManager
                                        .currentTheme
                                        .colors
                                        .mutedForeground,
                                  ),
                            ),
                            TextSpan(
                              text: 'S\'inscrire',
                              style: themeManager.currentTheme.typography.base
                                  .copyWith(
                                    fontWeight: FontWeight.w500,
                                    decoration: TextDecoration.underline,
                                  ),
                            ),
                          ],
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  void _handleLogin() {
    if (_formKey.currentState?.validate() ?? false) {
      ref
          .read(authProvider.notifier)
          .login(_emailController.text.trim(), _passwordController.text);
    }
  }

  void _handleGoogleLogin() {
    ref.read(authProvider.notifier).loginWithGoogle();
  }

  void _showErrorDialog(String error) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Erreur'),
        content: Text(error),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              ref.read(authProvider.notifier).clearError();
            },
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }
}
