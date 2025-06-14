# 🛒 Shop Microservice

Le microservice Shop gère les fonctionnalités liées à la boutique, notamment l'ouverture de packs de pranks.

## 🚀 Fonctionnalités

### Prank Packs

- **Récupération des packs disponibles** : Liste tous les packs de pranks actuellement disponibles
- **Ouverture de packs** : Permet aux utilisateurs d'ouvrir des packs et de recevoir des pranks aléatoirement

## 📡 Architecture

Ce microservice utilise :

- **Transport TCP** sur le port `4005`
- **Prisma** pour l'accès à la base de données PostgreSQL
- **Transactions atomiques** pour garantir la cohérence des données
- **Système de probabilités** pour la distribution des raretés

## 🔧 Configuration

### Variables d'environnement

```bash
SHOP_SERVICE_HOST=localhost
SHOP_SERVICE_PORT=4005
```

### Démarrage

```bash
# Développement
npm run start:dev shop

# Production
npm run start:prod shop
```

## 📋 API Endpoints (via API Gateway)

### GET /prank-packs

Récupère tous les packs de pranks disponibles.

**Réponse :**

```json
[
  {
    "pack_id": 1,
    "name": "Pack Débutant",
    "description": "Pack parfait pour commencer",
    "image_url": "https://example.com/pack1.jpg",
    "cost_currency_type": "game_coins",
    "cost_amount": 100,
    "number_of_pranks_awarded": 3,
    "rarity_probabilities": {
      "common": 0.7,
      "rare": 0.25,
      "extreme": 0.05
    },
    "required_user_level": 1
  }
]
```

### POST /prank-packs/:packId/open

Ouvre un pack de pranks pour l'utilisateur authentifié.

**Paramètres :**

- `packId` (number) : ID du pack à ouvrir

**Réponse en cas de succès :**

```json
{
  "success": true,
  "awarded_pranks": [
    {
      "prank_id": 1,
      "name": "Faux Appel",
      "rarity": "common",
      "description": "Un prank classique",
      "image_url": "https://example.com/prank1.jpg",
      "quantity_awarded": 1,
      "is_new": true
    }
  ],
  "remaining_currency": {
    "game_coins": 400
  },
  "pack_info": {
    "pack_id": 1,
    "name": "Pack Débutant",
    "cost_amount": 100,
    "cost_currency_type": "game_coins"
  }
}
```

**Réponse en cas d'erreur :**

```json
{
  "success": false,
  "error_code": "INSUFFICIENT_CURRENCY",
  "error_message": "Coins insuffisants. Requis: 100, disponible: 50."
}
```

## 🎯 Logique d'ouverture de pack

### Vérifications préalables

1. **Existence du pack** : Le pack doit exister et être disponible
2. **Période de disponibilité** : Vérification des dates `available_from` et `available_until`
3. **Niveau utilisateur** : L'utilisateur doit avoir le niveau requis
4. **Devise suffisante** : L'utilisateur doit avoir assez de `game_coins`

### Processus d'attribution

1. **Déduction de la devise** : Soustraction du coût du pack
2. **Sélection des raretés** : Utilisation des probabilités définies dans le pack
3. **Sélection des pranks** : Choix aléatoire parmi les pranks actifs de chaque rareté
4. **Attribution** : Ajout ou incrémentation dans `user_pranks`
5. **Logging** : Enregistrement dans `pack_opening_log`

### Système de probabilités

Les probabilités sont définies dans le champ JSONB `rarity_probabilities` :

```json
{
  "common": 0.7, // 70% de chance
  "rare": 0.25, // 25% de chance
  "extreme": 0.05 // 5% de chance
}
```

## 🔒 Sécurité et Intégrité

### Transactions atomiques

Toutes les opérations d'ouverture de pack sont effectuées dans une transaction unique pour garantir :

- La déduction de la devise
- L'attribution des pranks
- L'enregistrement des logs

### Gestion d'erreurs

- `PACK_NOT_FOUND` : Pack inexistant
- `PACK_NOT_AVAILABLE` : Pack non disponible actuellement
- `INSUFFICIENT_LEVEL` : Niveau utilisateur insuffisant
- `INSUFFICIENT_CURRENCY` : Devise insuffisante
- `NO_ACTIVE_PRANKS` : Aucun prank actif pour une rareté donnée

## 🧪 Tests

### Lancer les tests

```bash
# Tests unitaires
npm run test shop

# Tests avec couverture
npm run test:cov shop
```

### Couverture des tests

- ✅ Service PrankPack
- ✅ Logique d'ouverture de pack
- ✅ Système de probabilités
- ✅ Gestion d'erreurs
- ✅ Transactions atomiques

## 📊 Monitoring et Logs

Le service utilise le système de logging centralisé avec les contextes :

- `Shop.main` : Démarrage du service
- `Shop.controller` : Requêtes reçues
- `PrankPack.service` : Logique métier

### Exemples de logs

```
[INFO] Shop.main - 🛒 Shop Service is running on port 4005
[INFO] PrankPack.service - Récupération des packs disponibles
[INFO] PrankPack.service - Pack ouvert avec succès { userId: 1, packId: 1, awardedPranksCount: 3 }
[WARN] PrankPack.service - Coins insuffisants { userId: 1, userCoins: 50, requiredCoins: 100 }
```

## 🔄 Intégration avec d'autres services

### Dépendances

- **Base de données** : PostgreSQL via Prisma
- **Authentification** : Via API Gateway (JWT)
- **Logging** : Service de logging centralisé

### Communication

- **Entrée** : Messages TCP depuis l'API Gateway
- **Sortie** : Réponses directes (pas d'appels vers d'autres microservices)

## 🚀 Déploiement

### Docker

```dockerfile
# Exemple de configuration Docker
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/apps/shop ./
EXPOSE 4005
CMD ["node", "main.js"]
```

### Variables d'environnement de production

```bash
SHOP_SERVICE_HOST=0.0.0.0
SHOP_SERVICE_PORT=4005
DATABASE_URL=postgresql://...
```
