# 📦 Pack Widget System

## Vue d'ensemble

Système modulaire et réutilisable pour afficher et gérer les packs dans l'application Flip. Inspiré de la structure des `PrankCard`, ce système offre une approche composée et flexible.

## 🏗️ Architecture

```
/core/widgets/ui/pack/
├── elements/                    # Composants élémentaires
│   ├── pack_chip.dart          # Chips (rareté, type, coût)
│   ├── pack_image.dart         # Image avec effets visuels
│   ├── pack_info_panel.dart    # Panel d'informations détaillées
│   └── pack_action_buttons.dart # Boutons d'action
├── animation/                   # Système d'animations
│   └── pack_animations.dart    # Animations et interactions
├── dialog/                     # Dialogues
│   ├── pack_confirmation_dialog.dart # Confirmation d'ouverture
│   └── pack_results_dialog.dart      # Résultats d'ouverture
├── pack_card.dart              # Widget principal
├── index.dart                  # Exports
├── example_usage.dart          # Exemples d'utilisation
└── README.md                   # Documentation
```

## 🎨 Types de vues disponibles

### 1. Vue Compacte (`PackCard.compact`)
- **Usage** : Listes, grilles denses
- **Taille** : 200x280px
- **Contenu** : Image, nom, chips de base, bouton principal

### 2. Vue Standard (`PackCard.standard`)
- **Usage** : Affichage général
- **Taille** : 250x350px
- **Contenu** : Image, informations, coût, actions

### 3. Vue Détaillée (`PackCard.detailed`)
- **Usage** : Pages de détail, modales
- **Taille** : 300x500px
- **Contenu** : Toutes les informations, probabilités

### 4. Vue Vitrine (`PackCard.showcase`)
- **Usage** : Mise en avant, promotions
- **Taille** : 350x600px
- **Contenu** : Design premium avec animations dramatiques

### 5. Vue Grille (`PackCard.grid`)
- **Usage** : Grilles compactes
- **Taille** : 180x250px
- **Contenu** : Minimal, optimisé pour l'espace

## 🧩 Composants élémentaires

### PackChip
Chips modulaires pour afficher des informations spécifiques :
- `PackRarityChip` : Affiche la rareté dominante
- `PackCardsCountChip` : Nombre de cartes
- `PackTypeChip` : Type de pack
- `PackCostChip` : Coût avec devise

### PackImage
Affichage d'image avec effets :
- Gestion des erreurs de chargement
- Effets de rareté (brillance)
- Différentes tailles (small, medium, large, fullscreen)

### PackInfoPanel
Panel d'informations détaillées :
- Description du pack
- Statistiques rapides
- Probabilités de rareté avec barres visuelles
- Informations de coût détaillées

### PackActionButtons
Système de boutons adaptatif :
- Configuration flexible des actions
- Layout automatique selon le nombre de boutons
- Support de l'état indisponible
- Styles adaptés à la rareté

## 🎭 Animations

### AnimatedPack
Wrapper principal pour toutes les animations :
- Animation d'entrée échelonnée
- Effets de survol et interaction
- Animations de rareté (brillance pour items rares)

### Types d'animations
- `slide` : Glissement depuis le bas
- `scale` : Effet de mise à l'échelle
- `fade` : Fondu progressif
- `staggered` : Animation échelonnée
- `glow` : Effet de brillance
- `shake` : Effet de secousse

## 💬 Dialogues

### PackConfirmationDialog
Dialogue de confirmation avant ouverture :
- Affichage du coût total
- Informations sur le contenu
- Support ouverture multiple
- Probabilités de rareté

### PackResultsDialog
Affichage des résultats d'ouverture :
- Animation de révélation des cartes
- Mise en valeur des nouvelles cartes
- Statistiques de session
- Monnaie restante

## 🚀 Utilisation

### Exemple basique
```dart
PackCard.standard(
  pack: myPack,
  onAction: (action) {
    switch (action) {
      case PackActionType.open:
        // Gérer l'ouverture
        break;
      // ...
    }
  },
)
```

### Configuration avancée
```dart
PackCard(
  pack: myPack,
  viewType: PackCardViewType.detailed,
  config: PackCardConfig(
    showRarityProbabilities: true,
    enableAnimations: true,
    actionConfig: PackActionConfig.full,
    animationConfig: PackAnimationConfig.dramatic,
  ),
  onAction: _handleAction,
)
```

### Animations personnalisées
```dart
AnimatedPack(
  index: index,
  entranceAnimation: PackAnimationType.glow,
  config: PackAnimationConfig.dramatic,
  child: myPackWidget,
)
```

## 🎯 Avantages

### Modularité
- Composants réutilisables indépendamment
- Configuration flexible via `PackCardConfig`
- Factories pour cas d'usage courants

### Performance
- Animations optimisées avec `TickerProvider`
- Lazy loading des composants complexes
- Gestion intelligente du cache d'images

### Accessibilité
- Support des lecteurs d'écran
- Navigation au clavier
- Contrastes respectés

### Maintenance
- Code séparé par responsabilité
- Types sûrs avec enums
- Documentation intégrée

## 🔧 Configuration

### Actions disponibles
- `open` : Ouvrir un pack
- `openMultiple` : Ouverture multiple
- `preview` : Aperçu du contenu
- `favorite` : Ajouter aux favoris
- `details` : Voir les détails

### Configurations prédéfinies
- `PackActionConfig.compact` : Bouton principal seulement
- `PackActionConfig.standard` : Ouverture simple et multiple
- `PackActionConfig.full` : Toutes les actions

## 🎨 Personnalisation

### Thème
Le système s'adapte automatiquement au thème Forui de l'application.

### Couleurs de rareté
- **Commun** : Gris (#9E9E9E)
- **Rare** : Bleu (#2196F3)
- **Extrême** : Or (#FFD700)

### Devises
- **Game Coins** : 💰 Orange
- **Premium Gems** : 💎 Violet
- **Jetons** : 🪙 Vert

## 📋 API Reference

Voir les fichiers individuels pour la documentation détaillée de chaque composant.

---

*Ce système est entièrement en français et suit les conventions de l'application Flip.* 