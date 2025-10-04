import { MenuItem, MenuItemWithModifiers } from '@/types/menu';

export interface CartItem extends MenuItemWithModifiers {
  cartItemId: string;
  quantity: number;
  selectedOptions?: Record<string, string[]>;
  unitPrice: number;
}

export type ItemToAdd = Omit<CartItem, 'cartItemId' | 'quantity'> & {
  quantity: number;
};

export interface CartState {
  items: CartItem[];
  addItem: (itemToAdd: ItemToAdd) => void;
  removeItem: (cartItemId: string) => void;
  updateItemQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
}

interface UpdateQuantityPayload {
  strategy: 'UPDATE_QUANTITY';
  items: CartItem[];
  cartItemId: string;
  newQuantity: number;
}

interface RemoveItemPayload {
  strategy: 'REMOVE_ITEM';
  items: CartItem[];
  cartItemId: string;
}

interface AddNewItemPayload {
  strategy: 'ADD_NEW_ITEM';
  items: CartItem[];
  itemToAdd: MenuItem;
  newQuantity: number;
}

interface DoNothingPayload {
  strategy: 'DO_NOTHING';
  items: CartItem[];
}

// 使用“可辨识联合类型”来统一所有可能性
type UpdatePayload =
  | UpdateQuantityPayload
  | RemoveItemPayload
  | AddNewItemPayload
  | DoNothingPayload;
