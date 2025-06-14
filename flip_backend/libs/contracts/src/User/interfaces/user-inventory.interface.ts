import { currency_type_enum, pack_type_enum } from '@prisma/client';

export interface IUserPackInventoryItem {
  userPackInventoryId: number;
  userId: number;
  packId: number;
  quantity: number;
  acquiredAt: Date;
  // Détails du pack inclus
  pack: {
    packId: number;
    name: string;
    description?: string;
    imageUrl?: string;
    costCurrencyType: currency_type_enum;
    costAmount: number;
    numberOfPranksAwarded: number;
    packType: pack_type_enum;
    isAvailable: boolean;
    requiredUserLevel?: number;
  };
}

export interface IUserPackInventory {
  totalPacks: number;
  packsByType: {
    [key in pack_type_enum]: IUserPackInventoryItem[];
  };
  allPacks: IUserPackInventoryItem[];
}

export interface IUserPackInventoryStats {
  totalPacks: number;
  totalValue: number; // Valeur totale des packs possédés
  packsByType: {
    [key in pack_type_enum]: {
      count: number;
      totalQuantity: number;
    };
  };
}

export interface IAddPackToInventoryResult {
  success: boolean;
  item?: IUserPackInventoryItem;
  error?: string;
}

export interface IRemovePackFromInventoryResult {
  success: boolean;
  remainingQuantity: number;
  error?: string;
}
