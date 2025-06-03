# Flip App

Application Flutter moderne avec authentification complète (email/password + Google OAuth) utilisant l'architecture clean avec Riverpod et ForUI.

## 🏗️ Architecture

L'application suit une architecture clean et modulaire :

```
flip_app/
├── lib/
│   ├── main.dart                     # Point d'entrée principal
│   ├── app.dart                      # Widget racine de l'application
│   │
│   ├── core/                         # Logique partagée
│   │   ├── api/                      # Client API (Dio)
│   │   │   ├── api_client.dart
│   │   │   └── dio_interceptors.dart
│   │   ├── auth/                     # Authentification core
│   │   │   ├── auth_repository.dart
│   │   │   └── auth_service.dart
│   │   ├── config/                   # Configuration
│   │   │   ├── app_config.dart
│   │   │   └── app_constants.dart
│   │   ├── navigation/               # Router (GoRouter)
│   │   │   └── app_router.dart
│   │   └── utils/                    # Utilitaires
│   │       └── logger.dart
│   │
│   ├── features/                     # Modules par fonctionnalité
│   │   ├── auth/                     # Fonctionnalité d'authentification
│   │   │   ├── presentation/
│   │   │   │   ├── screens/          # Écrans d'auth
│   │   │   │   │   ├── login_screen.dart
│   │   │   │   │   ├── register_screen.dart
│   │   │   │   │   └── splash_screen.dart
│   │   │   │   └── view_models/       # Providers Riverpod
│   │   │   │       └── auth_provider.dart
│   │   │   └── data/
│   │   │       └── models/            # Modèles de données
│   │   │           └── auth_models.dart
│   │   └── home/                     # Écran principal
│   │       └── presentation/screens/
│   │           └── home_screen.dart
│   │
│   └── data/                         # Modèles globaux
│       └── models/
│           └── user_model.dart
│
├── .env                              # Variables d'environnement
└── pubspec.yaml                      # Dépendances
```

## 🚀 Fonctionnalités

### ✅ Authentification Complète
- **Connexion/Inscription** avec email/password
- **Authentification Google OAuth**
- **Gestion des tokens** (JWT access + refresh)
- **Stockage sécurisé** (flutter_secure_storage)
- **Auto-refresh** des tokens expirés
- **Vérification d'état** au démarrage

### ✅ Interface Utilisateur Moderne
- **ForUI** pour l'interface utilisateur
- **Design responsive** et moderne
- **Écrans d'authentification** élégants
- **Écran d'accueil** avec profil utilisateur

### ✅ Architecture Robuste
- **Clean Architecture** avec séparation des couches
- **Riverpod** pour la gestion d'état
- **GoRouter** pour la navigation
- **Dio** pour les appels API avec intercepteurs

## 🛠️ Technologies Utilisées

- **Flutter** 3.32.1
- **Dart** 3.8.1
- **ForUI** - Interface utilisateur moderne
- **Riverpod** - Gestion d'état
- **GoRouter** - Navigation déclarative
- **Dio** - Client HTTP
- **flutter_secure_storage** - Stockage sécurisé
- **google_sign_in** - Authentification Google
- **flutter_dotenv** - Variables d'environnement

## ⚙️ Configuration

### 1. Variables d'environnement

Créer/modifier le fichier `.env` :

```env
# Configuration API
API_BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001

# Google OAuth (remplacer par vos vraies clés)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Debug
DEBUG_MODE=true
```

### 2. Configuration Google OAuth

Pour activer l'authentification Google :

1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créer un projet ou sélectionner un projet existant
3. Activer l'API Google Sign-In
4. Créer des identifiants OAuth 2.0
5. Mettre à jour le `GOOGLE_CLIENT_ID` dans `.env`

### 3. Backend API

L'application est conçue pour fonctionner avec le backend NestJS fourni dans `flip_backend/`. 

Endpoints attendus :
- `POST /auth/login` - Connexion
- `POST /auth/register` - Inscription
- `POST /auth/google` - Auth Google
- `POST /auth/refresh` - Refresh token
- `POST /auth/logout` - Déconnexion
- `GET /auth/check` - Vérification d'état

## 🚦 Installation et Lancement

### Prérequis
- Flutter SDK 3.32.1+
- Dart 3.8.1+

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd flip_app

# Installer les dépendances
flutter pub get

# Lancer l'application
flutter run
```

### Compilation

```bash
# Web
flutter build web

# Android
flutter build apk

# iOS (sur macOS uniquement)
flutter build ios
```

## 🏃‍♂️ Utilisation

### 1. Démarrage
Au lancement, l'application :
- Vérifie automatiquement l'état d'authentification
- Redirige vers l'écran de connexion si non connecté
- Redirige vers l'accueil si déjà connecté

### 2. Authentification
- **Connexion** : Email + mot de passe
- **Inscription** : Email, mot de passe, nom/prénom (optionnel)
- **Google OAuth** : Authentification via Google

### 3. Navigation Automatique
- Routes protégées automatiquement
- Redirection intelligente basée sur l'état d'auth
- Gestion des erreurs de navigation

## 🔐 Sécurité

### Stockage Sécurisé
- Tokens stockés via `flutter_secure_storage`
- Chiffrement natif sur chaque plateforme
- Accès biométrique sur mobile (optionnel)

### Gestion des Tokens
- Auto-refresh des tokens expirés
- Validation JWT côté client
- Nettoyage automatique en cas d'erreur

### Intercepteurs API
- Ajout automatique des headers d'authentification
- Gestion centralisée des erreurs 401/403
- Retry automatique avec nouveau token

## 🎨 Interface Utilisateur

### Thème
- Utilise le thème **ForUI Zinc Dark**
- Design moderne et cohérent
- Composants réutilisables

### Écrans
1. **Splash** - Chargement et vérification d'état
2. **Login** - Connexion avec email/Google
3. **Register** - Inscription complète
4. **Home** - Accueil avec profil utilisateur

## 🧪 Tests

```bash
# Tests unitaires
flutter test

# Tests d'intégration
flutter test integration_test/
```

## 📝 Développement

### Ajout d'une nouvelle fonctionnalité

1. Créer le dossier dans `lib/features/`
2. Suivre la structure : `data/`, `presentation/`
3. Créer les modèles dans `data/models/`
4. Créer les providers dans `presentation/view_models/`
5. Créer les écrans dans `presentation/screens/`
6. Ajouter les routes dans `app_router.dart`

### Bonnes Pratiques

- Utiliser Riverpod pour la gestion d'état
- Séparer la logique métier de l'UI
- Créer des modèles immutables avec Equatable
- Utiliser des constantes pour les chaînes
- Gérer les erreurs de manière centralisée

## 🐛 Débogage

### Logs
- Utiliser `AppLogger` pour les logs
- Niveau de log configuré via `DEBUG_MODE`
- Logs réseau via les intercepteurs Dio

### Problèmes Communs

1. **Erreur de token** : Vérifier la configuration backend
2. **Google OAuth** : Vérifier les clés dans `.env`
3. **Navigation** : Vérifier les routes dans `app_router.dart`

## 📚 Ressources

- [Flutter Documentation](https://docs.flutter.dev/)
- [ForUI Documentation](https://forui.dev/)
- [Riverpod Documentation](https://riverpod.dev/)
- [GoRouter Documentation](https://pub.dev/packages/go_router)

## 📄 Licence

[MIT License](LICENSE)
