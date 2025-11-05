import { CartState } from './cart.types';

export const selectCartItems = (state: CartState) => state.items;

export const selectCartTotalQuantity = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalPrice = (state: CartState) =>
  state.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

export const selectSimpleItemQuantityById = (itemId: string) => (state: CartState) => {
  // 在 items 数组中查找匹配的商品
  const foundItem = state.items.find(
    (cartItem) =>
      // 条件1: 主商品 ID 必须匹配
      cartItem.id === itemId &&
      // 条件2: 必须是“简单商品”（即没有 selectedOptions）
      !cartItem.selectedOptions,
  );

  // 如果找到了，返回它的数量；否则，返回 0
  return foundItem ? foundItem.quantity : 0;
};
