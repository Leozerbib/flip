# 🛒 Shop Feature

## Vue d'ensemble

La feature Shop permet aux utilisateurs d'acheter et d'ouvrir des packs de pranks avec leur monnaie virtuelle. Elle offre une expérience similaire aux "loot boxes" avec des probabilités de rareté et des animations d'ouverture.

## Architecture

### Structure des dossiers
```
shop/
├── presentation/
│   ├── screens/
│   │   └── shop_screen.dart          # Écran principal du shop
│   ├── widgets/
│   │   ├── pack_card.dart            # Carte d'affichage des packs
│   │   ├── prank_packs_tab.dart      # Onglet des packs disponibles
│   │   ├── inventory_tab.dart        # Onglet inventaire (à venir)
│   │   ├── rarity_chip.dart          # Chip d'affichage de rareté
│   │   ├── pack_opening_confirmation_dialog.dart  # Dialog de confirmation
│   │   ├── pack_opening_results_dialog.dart       # Dialog des résultats
│   │   └── widgets.dart              # Export des widgets
│   └── providers/
│       └── shop_providers.dart       # Providers Riverpod
└── shop.dart                         # Export principal
```

### Modèles de données

#### PrankPackModel
- `packId`: Identifiant unique du pack
- `name`: Nom du pack
- `description`: Description optionnelle
- `costAmount`: Coût en monnaie virtuelle
- `costCurrencyType`: Type de monnaie (coins, gems, jetons)
- `numberOfPranksAwarded`: Nombre de pranks garantis
- `rarityProbabilities`: Probabilités par rareté
- `isAvailable`: Disponibilité du pack
- `availableFrom/Until`: Période de disponibilité
- `requiredUserLevel`: Niveau requis

#### AwardedPrankModel
- `prankId`: ID du prank obtenu
- `name`: Nom du prank
- `rarity`: Rareté (common, rare, extreme)
- `description`: Description
- `quantityAwarded`: Quantité obtenue
- `isNew`: Si c'est un nouveau prank pour l'utilisateur

## Fonctionnalités

### 🎁 Onglet Packs
- **Affichage en grille** : Les packs sont affichés dans une grille responsive
- **Cartes interactives** : Chaque pack a sa propre carte avec image, prix, et probabilités
- **Filtrage automatique** : Seuls les packs disponibles sont affichés
- **Indicateurs visuels** : Chips de rareté avec couleurs et icônes distinctives
- **Validation** : Vérification du niveau et de la monnaie avant achat

### 📦 Onglet Inventaire
- **À venir** : Affichage de la collection de pranks de l'utilisateur
- **Filtrage par rareté** : Possibilité de filtrer par type de rareté
- **Statistiques** : Nombre total de pranks, répartition par rareté

### 🎯 Ouverture de packs
1. **Confirmation** : Dialog détaillé avec informations du pack
2. **Animation** : Ouverture avec effet visuel (à améliorer)
3. **Résultats** : Affichage des pranks obtenus avec leurs raretés
4. **Mise à jour** : Actualisation automatique du solde et des données

## Intégration

### Navigation
Le shop est intégré dans la navigation principale avec l'icône 🛒 et accessible via l'onglet "Shop".

### API
- **ShopService** : Service pour les appels API
- **Endpoints** :
  - `GET /api/prank-packs` : Liste des packs disponibles
  - `POST /api/prank-packs/:id/open` : Ouverture d'un pack

### État global
- **ShopStateProvider** : Gestion de l'état avec Riverpod
- **Chargement automatique** : Les packs sont chargés au démarrage
- **Gestion d'erreurs** : Affichage des erreurs avec possibilité de retry

## Composants UI

### PackCard
Carte d'affichage d'un pack avec :
- Image ou icône par défaut
- Nom et description
- Chips de probabilités de rareté
- Prix et nombre de pranks
- Bouton d'action (Ouvrir/Indisponible)

### RarityChip
Chip coloré pour afficher les raretés :
- **Commun** : Gris avec icône cercle
- **Rare** : Bleu avec icône étoile
- **Extrême** : Violet avec icône diamant

### Dialogs
- **Confirmation** : Détails du pack avant achat
- **Résultats** : Animation et liste des pranks obtenus

## Thème et Design

### Couleurs par rareté
- **Commun** : Nuances de gris
- **Rare** : Nuances de bleu
- **Extrême** : Nuances de violet

### Animations
- Transitions fluides entre les onglets
- Effets visuels lors de l'ouverture (à améliorer)
- Feedback visuel sur les interactions

## Améliorations futures

### Fonctionnalités
- [ ] Inventaire complet avec gestion des pranks
- [ ] Animations d'ouverture plus sophistiquées
- [ ] Packs temporaires et événements spéciaux
- [ ] Système de favoris pour les packs
- [ ] Historique des achats

### Technique
- [ ] Cache des images des packs
- [ ] Optimisation des performances
- [ ] Tests unitaires et d'intégration
- [ ] Gestion offline des données

### UX/UI
- [ ] Animations de particules lors de l'ouverture
- [ ] Sons et effets audio
- [ ] Prévisualisation 3D des packs
- [ ] Système de récompenses quotidiennes

## Utilisation

```dart
// Navigation vers le shop
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => const ShopScreen()),
);

// Utilisation du provider
final shopState = ref.watch(shopStateProvider);
final canOpen = ref.watch(canOpenPackProvider(pack));

// Ouverture d'un pack
await ref.read(shopStateProvider.notifier).openPack(packId);
``` 