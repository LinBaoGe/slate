import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isEqual } from 'lodash';
import { CartItem, CartState } from '@/store/cart/cart.types';
import { calculateUpdatedItem, createNewCartItem } from '@/store/cart/cart.actions';

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

        if (existingItem) {
          if (newQuantity > 0) {
            // 3a. 用户期望的新数量大于 0 (比如从 2 -> 3, 或 2 -> 1)
            // 我们需要“更新”它的数量
            set({
              items: items.map((item) =>
                item.cartItemId === existingItem.cartItemId
                  ? { ...item, quantity: newQuantity }
                  : item,
              ),
            });
          } else {
            // newQuantity is 0
            // 用户期望的新数量为 0 (比如从 1 -> 0) 我们需要“移除”这个商品
            removeItem(existingItem.cartItemId);
          }
        } else {
          // --- 情况 B: 商品还不存在于购物车中 ---
          if (newQuantity > 0) {
            // 用户期望的新数量大于 0 (比如从 0 -> 1)
            addItem({
              ...itemToUpdate,
              quantity: newQuantity,
              unitPrice: itemToUpdate.basePrice, // 简单商品的单价就是基础价
              selectedOptions: undefined,
            });
          }
          // else { (newQuantity is 0)
          //   // 商品不存在，新数量也是0，什么都不用做
          // }
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
