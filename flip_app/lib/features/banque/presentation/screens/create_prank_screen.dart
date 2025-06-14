import 'package:flutter/material.dart';
import 'package:forui/forui.dart';

class CreatePrankScreen extends StatelessWidget {
  const CreatePrankScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Création de Prank'),
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Icône d'information
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.blue.withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(
                Icons.info_outline,
                size: 64,
                color: Colors.blue.shade600,
              ),
            ),

            const SizedBox(height: 32),

            // Titre
            Text(
              'Création de Pranks Désactivée',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
                color: Colors.grey.shade800,
              ),
              textAlign: TextAlign.center,
            ),

            const SizedBox(height: 16),

            // Message explicatif
            Text(
              'La création de nouveaux pranks n\'est actuellement pas disponible. '
              'Vous pouvez consulter et exécuter les pranks existants depuis l\'onglet Pranks.',
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                color: Colors.grey.shade600,
                height: 1.5,
              ),
              textAlign: TextAlign.center,
            ),

            const SizedBox(height: 32),

            // Suggestions d'actions
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.grey.shade50,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey.shade200),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Que pouvez-vous faire ?',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                      color: Colors.grey.shade800,
                    ),
                  ),
                  const SizedBox(height: 12),
                  _buildSuggestionItem(
                    icon: Icons.visibility,
                    text: 'Consulter les pranks disponibles',
                  ),
                  const SizedBox(height: 8),
                  _buildSuggestionItem(
                    icon: Icons.play_arrow,
                    text: 'Exécuter un prank pour rembourser un service',
                  ),
                  const SizedBox(height: 8),
                  _buildSuggestionItem(
                    icon: Icons.history,
                    text: 'Voir vos exécutions de pranks en cours',
                  ),
                ],
              ),
            ),

            const SizedBox(height: 32),

            // Bouton de retour
            SizedBox(
              width: double.infinity,
              child: FButton(
                onPress: () => Navigator.of(context).pop(),
                style: FButtonStyle.primary,
                child: const Text('Retour aux Pranks'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSuggestionItem({required IconData icon, required String text}) {
    return Row(
      children: [
        Icon(icon, size: 20, color: Colors.blue.shade600),
        const SizedBox(width: 12),
        Expanded(
          child: Text(
            text,
            style: TextStyle(color: Colors.grey.shade700, fontSize: 14),
          ),
        ),
      ],
    );
  }
}
