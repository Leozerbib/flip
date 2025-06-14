# Shop Tabs

## Structure

Ce dossier contient les widgets des différents onglets du shop, suivant le même pattern que `friends/presentation/widgets/tabs/`.

### Fichiers

- `prank_packs_tab.dart` - Onglet des packs de pranks disponibles
- `inventory_tab.dart` - Onglet de l'inventaire utilisateur

### Pattern de design

Chaque tab suit la même structure :

1. **En-tête** avec titre, compteur et éventuels filtres
2. **Contenu principal** avec RefreshIndicator
3. **États vides** avec appel à l'action
4. **Loading states** pour les opérations asynchrones

### Intégration

Les tabs sont utilisés par `ShopScreenTabs` qui gère :
- La navigation entre onglets
- La transmission des données et callbacks
- La cohérence du design avec Forui

### Exemple d'utilisation

```dart
PrankPacksTab(
  packs: availablePacks,
  isLoading: false,
  onRefresh: () => loadPacks(),
  onOpenPack: (pack) => openPack(pack),
)
``` 