import { prank_rarity_enum, prank_type_enum } from '@prisma/client';

export interface IUserPrankItem {
  userPrankId: number;
  userId: number;
  prankId: number;
  quantity: number;
  obtainedAt: Date;
  // Détails du prank inclus
  prank: {
    prankId: number;
    name: string;
    description: string;
    imageUrl?: string;
    type: prank_type_enum;
    rarity: prank_rarity_enum;
    defaultJetonCostEquivalent: number;
    xpRewardExecutor?: number;
    xpRewardTarget?: number;
    coinsRewardExecutor?: number;
    coinsRewardTarget?: number;
    requiresProof: boolean;
    isActive: boolean;
  };
}

export interface IUserPranksCollection {
  totalPranks: number;
  pranksByRarity: {
    [key in prank_rarity_enum]: IUserPrankItem[];
  };
  pranksByType: {
    [key in prank_type_enum]: IUserPrankItem[];
  };
  allPranks: IUserPrankItem[];
}

export interface IUserPranksStats {
  totalPranks: number;
  totalQuantity: number;
  totalValue: number; // Valeur totale en jetons
  pranksByRarity: {
    [key in prank_rarity_enum]: {
      count: number;
      totalQuantity: number;
    };
  };
  pranksByType: {
    [key in prank_type_enum]: {
      count: number;
      totalQuantity: number;
    };
  };
  completionPercentage: number; // Pourcentage de pranks collectés
}

export interface IAddPrankToCollectionResult {
  success: boolean;
  item?: IUserPrankItem;
  isNew: boolean; // Première fois que l'utilisateur obtient ce prank
  error?: string;
}

export interface IRemovePrankFromCollectionResult {
  success: boolean;
  remainingQuantity: number;
  error?: string;
}

export interface IUserPrankFilters {
  rarity?: prank_rarity_enum[];
  type?: prank_type_enum[];
  sortBy?: 'rarity' | 'type' | 'quantity' | 'obtainedAt' | 'name';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}
