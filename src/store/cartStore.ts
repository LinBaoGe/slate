import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isEqual } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { CartItem, CartState, ItemToAdd } from '@/types/store/cart';
import { MenuItem } from '@/types/menu';

function handleExistingItem(item: CartItem, itemToAdd: ItemToAdd): CartItem {
  // 处理器 A: 处理已存在的商品
  return { ...item, quantity: item.quantity + itemToAdd.quantity };
}

function handleNewItem(itemToAdd: ItemToAdd): CartItem {
  // 处理器 B: 处理新商品
  return {
    ...itemToAdd,
    cartItemId: uuidv4(),
  };
}

// --- 处理器 (Strategies / Handlers) for updateSimpleItemQuantity ---

// 策略 1: 更新一个已存在商品的数量
function handleUpdateQuantity(
  items: CartItem[],
  cartItemId: string,
  newQuantity: number,
): CartItem[] {
  return items.map((item) =>
    item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item,
  );
}

// 策略 2: 从购物车中移除一个商品
function handleRemoveItem(items: CartItem[], cartItemId: string): CartItem[] {
  return items.filter((item) => item.cartItemId !== cartItemId);
}

// 策略 3: 向购物车新增一个简单商品
function handleAddNewSimpleItem(
  items: CartItem[],
  itemToAdd: MenuItem,
  newQuantity: number,
): CartItem[] {
  const newCartItem: CartItem = {
    ...itemToAdd,
    cartItemId: uuidv4(),
    quantity: newQuantity,
    unitPrice: itemToAdd.basePrice,
    selectedOptions: undefined,
  };
  return [...items, newCartItem];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (itemToAdd) => {
        const { items } = get();

        const existingItemIndex = items.findIndex(
          (item) =>
            item.id === itemToAdd.id && isEqual(item.selectedOptions, itemToAdd.selectedOptions),
        );
        // 普通商品的undefined也可以用isEqual()处理

        let updatedItems: CartItem[];

        if (existingItemIndex !== -1) {
          updatedItems = [...items]; // 创建一个副本
          const existingItem = items[existingItemIndex];
          updatedItems[existingItemIndex] = handleExistingItem(existingItem, itemToAdd);
        } else {
          // 如果是新商品或新规格组合，则新增一项
          const newItems = handleNewItem(itemToAdd);
          updatedItems = [...items, newItems];
        }

        set({ items: updatedItems });
      },

      removeItem: (cartItemIdToRemove) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemIdToRemove),
        }));
      },

      updateItemQuantity: (cartItemIdToUpdate, newQuantity) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.cartItemId === cartItemIdToUpdate ? { ...item, quantity: newQuantity } : item,
            )
            .filter((item) => item.quantity > 0), // 如果数量减到0，就直接移除
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'cart-storage',
    },
  ),
);

export const selectCartTotalQuantity = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalPrice = (state: CartState) =>
  state.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
