import { CartItem, ItemToAdd } from '@/store/cart/cart.types';
import { v4 as uuidv4 } from 'uuid';
import { MenuItem } from '@/types/menu';

export function calculateUpdatedItem(item: CartItem, itemToAdd: ItemToAdd): CartItem {
  return { ...item, quantity: item.quantity + itemToAdd.quantity };
}

export function createNewCartItem(itemToAdd: ItemToAdd): CartItem {
  return {
    ...itemToAdd,
    cartItemId: uuidv4(),
  };
}

// 策略 1: 更新一个已存在商品的数量
export function updateItemQuantityInList(
  items: CartItem[],
  cartItemId: string,
  newQuantity: number,
): CartItem[] {
  return items.map((item) =>
    item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item,
  );
}

// 策略 2: 从购物车中移除一个商品
export function removeItemFromList(items: CartItem[], cartItemId: string): CartItem[] {
  return items.filter((item) => item.cartItemId !== cartItemId);
}

// 策略 3: 向购物车新增一个简单商品
export function addNewSimpleItemToList(
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

// Finite State Machine
export const getItemOperationType = (existingItem: CartItem | undefined, newQuantity: number) => {
  if (existingItem) {
    return newQuantity > 0 ? 'UPDATE' : 'REMOVE';
  } else {
    return newQuantity > 0 ? 'ADD' : 'NO_OP';
  }
};
