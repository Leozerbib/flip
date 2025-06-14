import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../core/api/banque_services_service.dart';
import '../../../../data/models/models.dart';

class CreateServiceScreen extends StatefulWidget {
  const CreateServiceScreen({super.key});

  @override
  State<CreateServiceScreen> createState() => _CreateServiceScreenState();
}

class _CreateServiceScreenState extends State<CreateServiceScreen> {
  final _formKey = GlobalKey<FormState>();
  final _descriptionController = TextEditingController();
  final _priceController = TextEditingController();
  final _clientUsernameController = TextEditingController();

  bool _isLoading = false;

  @override
  void dispose() {
    _descriptionController.dispose();
    _priceController.dispose();
    _clientUsernameController.dispose();
    super.dispose();
  }

  Future<void> _createService() async {
    // Validation manuelle
    if (_descriptionController.text.trim().isEmpty) {
      _showErrorMessage('Veuillez saisir une description');
      return;
    }
    if (_descriptionController.text.trim().length < 10) {
      _showErrorMessage('La description doit contenir au moins 10 caractères');
      return;
    }
    if (_priceController.text.trim().isEmpty) {
      _showErrorMessage('Veuillez saisir un prix');
      return;
    }
    final price = int.tryParse(_priceController.text.trim());
    if (price == null || price <= 0) {
      _showErrorMessage('Veuillez saisir un prix valide (nombre entier > 0)');
      return;
    }
    if (price > 1000) {
      _showErrorMessage('Le prix ne peut pas dépasser 1000 jetons');
      return;
    }
    if (_clientUsernameController.text.trim().isEmpty) {
      _showErrorMessage('Veuillez saisir le nom d\'utilisateur du client');
      return;
    }
    if (_clientUsernameController.text.trim().length < 3) {
      _showErrorMessage(
        'Le nom d\'utilisateur doit contenir au moins 3 caractères',
      );
      return;
    }

    setState(() => _isLoading = true);

    try {
      final service = await BanqueServicesService.createService(
        beneficiaryId:
            1, // TODO: Obtenir l'ID réel du client par nom d'utilisateur
        description: _descriptionController.text.trim(),
        jetonValue: int.parse(_priceController.text.trim()),
      );

      if (service != null && mounted) {
        _showSuccessMessage('Service créé avec succès');
        Navigator.of(
          context,
        ).pop(true); // Retourne true pour indiquer le succès
      } else {
        _showErrorMessage('Erreur lors de la création du service');
      }
    } catch (e) {
      _showErrorMessage('Erreur: ${e.toString()}');
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  void _showSuccessMessage(String message) {
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(message), backgroundColor: Colors.green),
      );
    }
  }

  void _showErrorMessage(String message) {
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(message), backgroundColor: Colors.red),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Créer un service'),
        backgroundColor: theme.colors.background,
        foregroundColor: theme.colors.foreground,
        elevation: 0,
        actions: [
          if (_isLoading)
            const Padding(
              padding: EdgeInsets.all(16),
              child: SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(strokeWidth: 2),
              ),
            ),
        ],
      ),
      body: Form(
        key: _formKey,
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Titre section
              Text(
                'Détails du service',
                style: theme.typography.lg.copyWith(
                  fontWeight: FontWeight.w600,
                  color: theme.colors.foreground,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Décrivez le service que vous souhaitez proposer',
                style: theme.typography.sm.copyWith(
                  color: theme.colors.mutedForeground,
                ),
              ),
              const SizedBox(height: 24),

              // Description du service
              FTextField(
                controller: _descriptionController,
                label: Text('Description du service'),
                hint: 'Ex: Cours de mathématiques, aide au déménagement...',
                maxLines: 3,
              ),
              const SizedBox(height: 16),

              // Prix en jetons
              FTextField(
                controller: _priceController,
                label: Text('Prix (en jetons)'),
                hint: 'Ex: 50',
                keyboardType: TextInputType.number,
              ),
              const SizedBox(height: 16),

              // Client (nom d'utilisateur)
              FTextField(
                controller: _clientUsernameController,
                label: Text('Nom d\'utilisateur du client'),
                hint: 'Ex: john_doe',
              ),
              const SizedBox(height: 32),

              // Section d'information
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: theme.colors.secondary,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: theme.colors.border),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(
                          FIcons.info,
                          size: 16,
                          color: theme.colors.primary,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'Information',
                          style: theme.typography.sm.copyWith(
                            fontWeight: FontWeight.w600,
                            color: theme.colors.foreground,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '• Le service sera créé avec le statut "En attente"\n'
                      '• Le client devra confirmer le service\n'
                      '• Une fois confirmé, vous pourrez le marquer comme terminé\n'
                      '• Le paiement se fera automatiquement à la confirmation',
                      style: theme.typography.xs.copyWith(
                        color: theme.colors.mutedForeground,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 32),

              // Boutons d'action
              Row(
                children: [
                  Expanded(
                    child: FButton(
                      style: FButtonStyle.outline,
                      onPress: _isLoading
                          ? null
                          : () => Navigator.of(context).pop(),
                      child: Text('Annuler'),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    flex: 2,
                    child: FButton(
                      style: FButtonStyle.primary,
                      onPress: _isLoading ? null : _createService,
                      child: _isLoading
                          ? Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                SizedBox(
                                  width: 16,
                                  height: 16,
                                  child: CircularProgressIndicator(
                                    strokeWidth: 2,
                                    valueColor: AlwaysStoppedAnimation<Color>(
                                      theme.colors.primaryForeground,
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Text('Création...'),
                              ],
                            )
                          : Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(FIcons.plus, size: 16),
                                const SizedBox(width: 8),
                                Text('Créer le service'),
                              ],
                            ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
