// 单个选项（如 沙拉酱、加辣酱、生菜）
export interface Option {
  id: string;
  name: string;
  priceDelta: number;
}

// 选项组（如 酱料、配菜）
export interface OptionGroup {
  id: string;
  name: string;
  type: 'single' | 'multi'; // 单选 / 多选
  required: boolean;
  options: Option[];
}

export interface Modifier {
  id: string;
  name: string;
  priceDelta: number;
  displayOrder: number;
}

export interface ModifierGroup {
  id: string;
  name: string;
  selectionType: 'single' | 'multiple';
  isRequired: boolean;
  defaultOptionId?: string | null; // UUID of the default modifier
  displayOrder: number;
  options: Modifier[];
}
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: string;
  imageUrl: string;
  displayOrder: number;
}

export interface MenuItemWithModifiers extends MenuItem {
  modifierGroups?: ModifierGroup[];
}

export interface Categories {
  id: string;
  name: string;
  displayOrder: number;
  menuItems: MenuItemWithModifiers[];
}

export interface FullMenuData {
  restaurantId: string;
  categories: Categories[];
}
