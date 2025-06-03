import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import 'package:go_router/go_router.dart';
import '../view_models/auth_provider.dart';
import '../../data/models/auth_models.dart';

class RegisterScreen extends ConsumerStatefulWidget {
  const RegisterScreen({super.key});

  @override
  ConsumerState<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends ConsumerState<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _usernameController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _usernameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authProvider);

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
              child: SingleChildScrollView(
                child: Form(
                  key: _formKey,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Logo et titre
                      const Icon(
                        FIcons.userPlus,
                        size: 64,
                      ),
                      const SizedBox(height: 24),
                      const Text(
                        'Inscription',
                        style: TextStyle(
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        'Créez votre compte',
                        style: TextStyle(fontSize: 16),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 32),

                      FTextFormField(
                        controller: _usernameController,
                        label: const Text('Nom d\'utilisateur'),
                        hint: 'Nom d\'utilisateur',
                        autovalidateMode: AutovalidateMode.onUserInteraction,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Veuillez saisir votre nom d\'utilisateur';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 16),

                      // Champ email
                      FTextFormField.email(
                        controller: _emailController,
                        label: const Text('Email *'),
                        hint: 'votre@email.com',
                        autovalidateMode: AutovalidateMode.onUserInteraction,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Veuillez saisir votre email';
                          }
                          if (!RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(value)) {
                            return 'Format d\'email invalide';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 16),

                      // Champ mot de passe
                      FTextFormField.password(
                        controller: _passwordController,
                        label: const Text('Mot de passe *'),
                        hint: 'Au moins 6 caractères',
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
                      const SizedBox(height: 16),

                      // Champ confirmation mot de passe
                      FTextFormField.password(
                        controller: _confirmPasswordController,
                        label: const Text('Confirmer le mot de passe *'),
                        hint: 'Répétez votre mot de passe',
                        autovalidateMode: AutovalidateMode.onUserInteraction,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Veuillez confirmer votre mot de passe';
                          }
                          if (value != _passwordController.text) {
                            return 'Les mots de passe ne correspondent pas';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 24),

                      // Bouton d'inscription
                      FButton(
                        onPress: authState.status == AuthStatus.loading ? null : _handleRegister,
                        child: authState.status == AuthStatus.loading
                            ? const Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  SizedBox(
                                    width: 16,
                                    height: 16,
                                    child: CircularProgressIndicator(strokeWidth: 2),
                                  ),
                                  SizedBox(width: 8),
                                  Text('Création du compte...'),
                                ],
                              )
                            : const Text('Créer mon compte'),
                      ),
                      const SizedBox(height: 16),

                      // Diviseur "OU"
                      const Row(
                        children: [
                          Expanded(child: Divider()),
                          Padding(
                            padding: EdgeInsets.symmetric(horizontal: 16),
                            child: Text('OU'),
                          ),
                          Expanded(child: Divider()),
                        ],
                      ),
                      const SizedBox(height: 16),

                      // Bouton Google
                      FButton(
                        onPress: authState.status == AuthStatus.loading ? null : _handleGoogleRegister,
                        prefix: const Icon(FIcons.chrome),
                        style: FButtonStyle.outline,
                        child: const Text('S\'inscrire avec Google'),
                      ),
                      const SizedBox(height: 24),

                      // Lien vers la connexion
                      TextButton(
                        onPressed: () => context.go('/login'),
                        child: const Text.rich(
                          TextSpan(
                            children: [
                              TextSpan(text: 'Déjà un compte ? '),
                              TextSpan(
                                text: 'Se connecter',
                                style: TextStyle(fontWeight: FontWeight.w500, decoration: TextDecoration.underline),
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
      ),
    );
  }

  void _handleRegister() {
    if (_formKey.currentState?.validate() ?? false) {
      ref.read(authProvider.notifier).register(
            _emailController.text.trim(),
            _passwordController.text,
            _usernameController.text.trim(),
          );
    }
  }

  void _handleGoogleRegister() {
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