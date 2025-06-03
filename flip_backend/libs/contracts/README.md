# @app/contracts

Bibliothèque de types, interfaces et DTOs partagés pour LifeOS basée sur le schéma Prisma.

## Structure

### Types communs (`/types/common.types.ts`)

- **Enums Prisma** : Tous les enums du schéma Prisma

  - `ExecutedPrankStatusEnum`
  - `FriendshipStatusEnum`
  - `MissionTypeEnum`
  - `PrankTypeEnum`
  - `ServiceStatusEnum`
  - `UserMissionStatusEnum`

- **Interfaces utilitaires** :
  - `PaginationParams`
  - `PaginatedResponse<T>`
  - `DateRange`
  - `ErrorResponse`
  - `SuccessResponse<T>`

### User (`/User/`)

**Interfaces :**

- `IUser` - Modèle User complet
- `IUserResponse` - User sans mot de passe
- `IUserWithPassword` - User avec mot de passe
- `IUserProfile` - Profil utilisateur public
- `IUserStats` - Statistiques utilisateur
- `ICreateUserResponse` - Réponse création utilisateur
- `ILoginResponse` - Réponse connexion
- `IValidationResponse` - Réponse validation

**DTOs :**

- `CreateUserDto` - Création utilisateur
- `UpdateUserDto` - Mise à jour utilisateur
- `UserResponseDto` - Réponse utilisateur
- `UserStatsDto` - Statistiques utilisateur
- `UserProfileDto` - Profil utilisateur

### Auth (`/Auth/`)

**DTOs existants :**

- `LoginDto`
- `AuthResponseDto`
- `TokenValidationDto`
- `RefreshTokenDto`
- `RefreshTokenResponseDto`

### Service (`/Service/`)

**Interfaces :**

- `IService` - Modèle Service
- `IServiceCategory` - Catégorie de service
- `IServiceWithDetails` - Service avec détails
- `IServiceStats` - Statistiques services
- `IServiceFilters` - Filtres de recherche

**DTOs :**

- `CreateServiceDto` - Création service
- `UpdateServiceDto` - Mise à jour service
- `ServiceResponseDto` - Réponse service
- `ServiceWithDetailsDto` - Service avec détails
- `ServiceCategoryDto` - Catégorie de service
- `CreateServiceCategoryDto` - Création catégorie
- `ServiceStatsDto` - Statistiques
- `ServiceFiltersDto` - Filtres

### Prank (`/Prank/`)

**Interfaces :**

- `IPrank` - Modèle Prank
- `IExecutedPrank` - Prank exécuté
- `IExecutedPrankWithDetails` - Prank exécuté avec détails
- `IPrankStats` - Statistiques pranks
- `IPrankFilters` - Filtres pranks
- `IExecutedPrankFilters` - Filtres pranks exécutés

**DTOs :**

- `CreatePrankDto` - Création prank
- `UpdatePrankDto` - Mise à jour prank
- `PrankResponseDto` - Réponse prank
- `CreateExecutedPrankDto` - Création prank exécuté
- `UpdateExecutedPrankDto` - Mise à jour prank exécuté
- `ExecutedPrankResponseDto` - Réponse prank exécuté
- `ExecutedPrankWithDetailsDto` - Prank exécuté avec détails
- `PrankFiltersDto` - Filtres pranks
- `ExecutedPrankFiltersDto` - Filtres pranks exécutés

### Mission (`/Mission/`)

**Interfaces :**

- `IMission` - Modèle Mission
- `IUserMission` - Mission utilisateur
- `IMissionWithDetails` - Mission avec détails
- `IUserMissionWithDetails` - Mission utilisateur avec détails
- `IMissionStats` - Statistiques missions
- `IMissionFilters` - Filtres missions
- `IUserMissionFilters` - Filtres missions utilisateur

**DTOs :**

- `CreateMissionDto` - Création mission
- `UpdateMissionDto` - Mise à jour mission
- `MissionResponseDto` - Réponse mission
- `CreateUserMissionDto` - Création mission utilisateur
- `UpdateUserMissionDto` - Mise à jour mission utilisateur
- `UserMissionResponseDto` - Réponse mission utilisateur
- `MissionWithDetailsDto` - Mission avec détails
- `UserMissionWithDetailsDto` - Mission utilisateur avec détails
- `MissionStatsDto` - Statistiques
- `MissionFiltersDto` - Filtres missions
- `UserMissionFiltersDto` - Filtres missions utilisateur

### Friendship (`/Friendship/`)

**Interfaces :**

- `IFriendship` - Modèle Friendship
- `IFriendshipWithDetails` - Amitié avec détails
- `IFriend` - Ami
- `IFriendshipRequest` - Demande d'amitié
- `IFriendshipStats` - Statistiques amitiés
- `IFriendshipFilters` - Filtres amitiés
- `IFriendSearchFilters` - Filtres recherche d'amis

**DTOs :**

- `CreateFriendshipDto` - Création amitié
- `UpdateFriendshipDto` - Mise à jour amitié
- `FriendshipResponseDto` - Réponse amitié
- `FriendshipWithDetailsDto` - Amitié avec détails
- `FriendDto` - Ami
- `FriendshipRequestDto` - Demande d'amitié
- `FriendshipStatsDto` - Statistiques
- `FriendshipFiltersDto` - Filtres amitiés
- `FriendSearchFiltersDto` - Filtres recherche
- `BlockUserDto` - Bloquer utilisateur
- `UnblockUserDto` - Débloquer utilisateur
- `AcceptFriendshipDto` - Accepter amitié
- `DeclineFriendshipDto` - Refuser amitié

## Utilisation

```typescript
import { IUser, CreateUserDto, ServiceStatusEnum, PaginatedResponse } from '@app/contracts';
```

## Correspondance avec Prisma

Tous les types correspondent exactement au schéma Prisma :

- Les noms de champs utilisent la convention `snake_case` du schéma
- Les types de données correspondent aux types Prisma
- Les relations sont représentées dans les interfaces `*WithDetails`
- Tous les enums utilisent les valeurs exactes du schéma
