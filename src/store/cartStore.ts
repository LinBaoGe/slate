import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MenuItem } from '@/types/schemas/menu';

// 1. 定义购物车中单个商品的类型，它需要包含菜品信息和数量
export interface CartItem extends MenuItem {
  quantity: number;
}

// 2. 定义整个 Store 的状态 (State) 和操作 (Actions) 的类型
interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  addItem: (itemToAdd: MenuItem) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
}

// 3. 使用 zustand 的 create 函数来创建 store
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // 初始状态
      items: [],
      totalPrice: 0,
      totalQuantity: 0,

      // --- Actions ---

      // 添加商品到购物车
      addItem: (itemToAdd) => {
        const { items } = get(); // `get()` 函数可以让你在 action 内部获取当前的状态
        const existingItem = items.find((item) => item.id === itemToAdd.id);

        let updatedItems: CartItem[];

        if (existingItem) {
          // 如果商品已存在，则只增加数量
          updatedItems = items.map((item) =>
            item.id === itemToAdd.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        } else {
          // 如果商品不存在，则新增一个，数量为1
          updatedItems = [...items, { ...itemToAdd, quantity: 1 }];
        }

        // 更新状态
        set((state) => ({
          items: updatedItems,
          totalQuantity: state.totalQuantity + 1,
          totalPrice: state.totalPrice + itemToAdd.price,
        }));
      },

      // 从购物车移除一个商品（不管数量多少，整个移除）
      removeItem: (itemIdToRemove) => {
        const { items } = get();
        const itemToRemove = items.find((item) => item.id === itemIdToRemove);

        if (!itemToRemove) return; // 如果商品不存在，什么都不做

        const updatedItems = items.filter((item) => item.id !== itemIdToRemove);

        set((state) => ({
          items: updatedItems,
          totalQuantity: state.totalQuantity - itemToRemove.quantity,
          totalPrice:
            state.totalPrice - itemToRemove.price * itemToRemove.quantity,
        }));
      },

      clearCart: () => {
        set({
          items: [],
          totalPrice: 0,
          totalQuantity: 0,
        });
      },
    }),
    {
      name: 'cart-storage', // 存储在 localStorage 里的 key
      storage: createJSONStorage(() => localStorage), // (可选) 指定使用 localStorage
    },
  ),
);
