import 'package:flutter/material.dart';
import '../../../../data/models/models.dart';
import 'prank_card.dart';

/// Exemple d'utilisation des différents types de PrankCard
class PrankCardExamples extends StatelessWidget {
  final List<PrankModel> pranks;

  const PrankCardExamples({super.key, required this.pranks});

  @override
  Widget build(BuildContext context) {
    if (pranks.isEmpty) {
      return const Center(child: Text('Aucun prank disponible'));
    }

    final samplePrank = pranks.first;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Exemples PrankCard'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Vue Compacte
            _buildSection(
              title: '📱 Vue Compacte (pour listes)',
              description: 'Parfait pour les listes avec peu d\'espace',
              child: PrankCard.compact(
                prank: samplePrank,
                onAction: _handleAction,
              ),
            ),

            const SizedBox(height: 24),

            // Vue Normale
            _buildSection(
              title: '🎯 Vue Normale',
              description: 'Vue standard pour les grilles',
              child: PrankCard.normal(
                prank: samplePrank,
                onAction: _handleAction,
              ),
            ),

            const SizedBox(height: 24),

            // Vue Étendue
            _buildSection(
              title: '📋 Vue Étendue',
              description: 'Vue complète avec toutes les informations',
              child: PrankCard.expanded(
                prank: samplePrank,
                onAction: _handleAction,
              ),
            ),

            const SizedBox(height: 24),

            // Vue Pokémon
            _buildSection(
              title: '⚡ Vue Pokémon',
              description: 'Style gaming avec effets holographiques',
              child: PrankCard.pokemon(
                prank: samplePrank,
                onAction: _handleAction,
              ),
            ),

            const SizedBox(height: 24),

            // Vue Minimaliste
            _buildSection(
              title: '⚪ Vue Minimaliste',
              description: 'Vue ultra-compacte pour les petits espaces',
              child: PrankCard.minimal(
                prank: samplePrank,
                onAction: _handleAction,
              ),
            ),

            const SizedBox(height: 24),

            // Grille d'exemples
            _buildGridExample(),
          ],
        ),
      ),
    );
  }

  Widget _buildSection({
    required String title,
    required String description,
    required Widget child,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 4),
        Text(
          description,
          style: TextStyle(fontSize: 14, color: Colors.grey.shade600),
        ),
        const SizedBox(height: 12),
        child,
      ],
    );
  }

  Widget _buildGridExample() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          '🔥 Grille d\'exemples',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 4),
        Text(
          'Différentes raretés en vue normale',
          style: TextStyle(fontSize: 14, color: Colors.grey.shade600),
        ),
        const SizedBox(height: 12),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 12,
            mainAxisSpacing: 12,
            childAspectRatio: 0.75,
          ),
          itemCount: pranks.length > 4 ? 4 : pranks.length,
          itemBuilder: (context, index) {
            return PrankCard.normal(
              prank: pranks[index],
              index: index,
              onAction: _handleAction,
            );
          },
        ),
      ],
    );
  }

  void _handleAction(String action) {
    print('Action: $action');
    // Ici vous pouvez gérer les différentes actions
    switch (action) {
      case 'execute':
        // Lancer le prank
        break;
      case 'favorite':
        // Ajouter aux favoris
        break;
      case 'share':
        // Partager
        break;
      case 'details':
        // Afficher les détails
        break;
    }
  }
}

/// Widget pour démontrer les animations
class AnimatedPrankCardDemo extends StatefulWidget {
  final List<PrankModel> pranks;

  const AnimatedPrankCardDemo({super.key, required this.pranks});

  @override
  State<AnimatedPrankCardDemo> createState() => _AnimatedPrankCardDemoState();
}

class _AnimatedPrankCardDemoState extends State<AnimatedPrankCardDemo> {
  bool _showCards = false;

  @override
  void initState() {
    super.initState();
    // Démarrer l'animation après un court délai
    Future.delayed(const Duration(milliseconds: 500), () {
      if (mounted) {
        setState(() {
          _showCards = true;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Animations PrankCard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              setState(() {
                _showCards = false;
              });
              Future.delayed(const Duration(milliseconds: 300), () {
                if (mounted) {
                  setState(() {
                    _showCards = true;
                  });
                }
              });
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            if (_showCards)
              ...widget.pranks.take(6).map((prank) {
                final index = widget.pranks.indexOf(prank);
                return Padding(
                  padding: const EdgeInsets.only(bottom: 16),
                  child: PrankCard(
                    prank: prank,
                    viewType: PrankCardViewType.normal,
                    index: index,
                    config: const PrankCardConfig(
                      enableAnimations: true,
                      enableRarityGlow: true,
                      enableHover: true,
                    ),
                    onAction: (action) => print('Action: $action'),
                  ),
                );
              }).toList(),
          ],
        ),
      ),
    );
  }
}
