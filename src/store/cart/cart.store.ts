import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isEqual } from 'lodash';
import { CartItem, CartState } from '@/store/cart/cart.types';
import {
  calculateUpdatedItem,
  createNewCartItem,
  getItemOperationType,
} from '@/store/cart/cart.actions';

// 根据商品在购物车中的存在状态和数量变化来分类处理不同的业务逻辑
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
        // 普通商品的undefined === undefined -> true

        let updatedItems: CartItem[];

        if (existingItemIndex !== -1) {
          // 商品存在
          updatedItems = [...items];
          const existingItem = items[existingItemIndex];
          updatedItems[existingItemIndex] = calculateUpdatedItem(existingItem, itemToAdd);
        } else {
          // 商品不存在
          const newItems = createNewCartItem(itemToAdd);
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

      updateSimpleItemQuantity: (itemToUpdate, newQuantity) => {
        // 1. 获取当前的状态和需要的其他 actions
        const { items, removeItem, addItem } = get();

        // 2. 在购物车中，查找是否已存在“这个”简单商品 (ID 相同，且没有规格选项)
        const existingItem = items.find(
          (item) => item.id === itemToUpdate.id && !item.selectedOptions,
        );

        const operation = getItemOperationType(existingItem, newQuantity);
        switch (operation) {
          case 'UPDATE':
            if (!existingItem) {
              throw new Error('UPDATE needs existingItem');
            }
            set({
              items: items.map((item) =>
                item.cartItemId === existingItem.cartItemId
                  ? { ...item, quantity: newQuantity }
                  : item,
              ),
            });
            break;
          case 'REMOVE':
            if (!existingItem) {
              throw new Error('REMOVE needs existingItem');
            }
            removeItem(existingItem.cartItemId);
            break;
          case 'ADD':
            addItem({
              ...itemToUpdate,
              quantity: newQuantity,
              unitPrice: itemToUpdate.basePrice, // 简单商品的单价就是基础价
              selectedOptions: undefined,
            });
            break;
          case 'NO_OP':
            break;

          default:
            throw new Error(`未知的操作类型: ${operation}`);
        }
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
