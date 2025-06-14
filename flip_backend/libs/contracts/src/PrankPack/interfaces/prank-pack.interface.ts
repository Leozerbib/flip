import { prank_rarity_enum, currency_type_enum } from '@prisma/client';

// Enum pour les types de packs (selon le schéma Prisma)
export enum PackType {
  basic = 'basic',
  event = 'event',
  limited = 'limited',
  gift = 'gift',
  promotional = 'promotional',
}

// Types de probabilités pour les boosters
export interface RarityProbabilities {
  common: number;
  rare: number;
  extreme: number;
}

export interface PackRarityProbabilities {
  basic: RarityProbabilities;
  last_card?: RarityProbabilities; // Pour les packs avec plusieurs cartes
}

export interface IPrankPack {
  pack_id: number;
  name: string;
  description?: string;
  image_url?: string;
  cost_currency_type: currency_type_enum;
  cost_amount: number;
  number_of_pranks_awarded: number;
  rarity_probabilities: PackRarityProbabilities;
  is_available?: boolean;
  available_from?: Date;
  available_until?: Date;
  required_user_level?: number;
  created_at?: Date;
  updated_at?: Date;
  pack_type: PackType;
}

// Groupe de packs par type
export interface IPacksByType {
  basic: IPrankPack[];
  event: IPrankPack[];
  limited: IPrankPack[];
  gift: IPrankPack[];
  promotional: IPrankPack[];
}

export interface IAwardedPrank {
  prank_id: number;
  name: string;
  rarity: prank_rarity_enum;
  description: string;
  image_url?: string;
  quantity_awarded: number;
  is_new: boolean; // Indique si c'est la première fois que l'utilisateur obtient ce prank
}

// Résultat groupé par booster pour l'ouverture
export interface IBoosterOpeningResult {
  booster_id: number;
  booster_name: string;
  awarded_pranks: IAwardedPrank[];
}

export interface IPackOpeningResult {
  success: boolean;
  boosters: IBoosterOpeningResult[]; // Groupé par booster
  remaining_currency: {
    game_coins: number;
    // Autres devises peuvent être ajoutées ici
  };
  pack_info: {
    pack_id: number;
    name: string;
    cost_amount: number;
    cost_currency_type: currency_type_enum;
  };
}

// Résultat pour l'ouverture de multiples packs
export interface IMultiplePackOpeningResult {
  success: boolean;
  total_packs_opened: number;
  all_boosters: IBoosterOpeningResult[]; // Tous les boosters de tous les packs
  remaining_currency: {
    game_coins: number;
  };
  pack_info: {
    pack_id: number;
    name: string;
    cost_amount: number;
    cost_currency_type: currency_type_enum;
  };
}

export interface IPackOpeningError {
  success: false;
  error_code:
    | 'PACK_NOT_FOUND'
    | 'PACK_NOT_AVAILABLE'
    | 'INSUFFICIENT_LEVEL'
    | 'INSUFFICIENT_CURRENCY'
    | 'NO_ACTIVE_PRANKS'
    | 'INSUFFICIENT_PACKS'; // Pour l'ouverture de multiples packs
  error_message: string;
}

// Interface pour les pranks disponibles dans un pack
export interface IPackAvailablePranks {
  pack_id: number;
  pack_name: string;
  available_pranks_by_rarity: {
    common: IAwardedPrank[];
    rare: IAwardedPrank[];
    extreme: IAwardedPrank[];
  };
}
