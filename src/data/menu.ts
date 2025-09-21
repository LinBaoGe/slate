// src/data/menu.ts
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'main' | 'drinks' | 'desserts';
  imageUrl: string;
}

export const MOCK_MENU_DATA: MenuItem[] = [
  {
    id: '1',
    name: '经典牛肉汉堡',
    description: '多汁牛肉饼配新鲜生菜和秘制酱料',
    price: 35,
    category: 'main',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: '2',
    name: '香脆炸鸡汉堡',
    description: '酥脆炸鸡胸肉配特调蛋黄酱和酸黄瓜',
    price: 32,
    category: 'main',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: '3',
    name: '薯条（大份）',
    description: '金黄酥脆，外焦里嫩，撒上海盐',
    price: 18,
    category: 'main',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: '4',
    name: '巧克力奶昔',
    description: '香浓巧克力口味，顶部配鲜奶油和巧克力碎',
    price: 22,
    category: 'desserts',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: '5',
    name: '双层芝士汉堡',
    description: '双层牛肉饼搭配融化芝士和新鲜蔬菜',
    price: 42,
    category: 'main',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: '6',
    name: '冰拿铁咖啡',
    description: '意式浓缩咖啡与冰牛奶的完美融合',
    price: 25,
    category: 'drinks',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: '7',
    name: '草莓奶昔',
    description: '新鲜草莓制作，顶部配鲜奶油和草莓粒',
    price: 22,
    category: 'desserts',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: '8',
    name: '可乐',
    description: '冰镇可口可乐，畅快淋漓',
    price: 12,
    category: 'drinks',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: '9',
    name: '苹果派',
    description: '酥脆外皮包裹香甜苹果馅料',
    price: 15,
    category: 'desserts',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: '10',
    name: '鸡块（10块）',
    description: '金黄酥脆的鸡块，配特色蘸酱',
    price: 28,
    category: 'main',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: '11',
    name: '柠檬冰茶',
    description: '清新柠檬与红茶的完美结合',
    price: 16,
    category: 'drinks',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: '12',
    name: '香草冰淇淋',
    description: '经典香草口味，丝滑细腻',
    price: 14,
    category: 'desserts',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: '13',
    name: '柠檬冰茶',
    description: '清新柠檬与红茶的完美结合',
    price: 16,
    category: 'drinks',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: '14',
    name: '柠檬冰茶',
    description: '清新柠檬与红茶的完美结合',
    price: 16,
    category: 'drinks',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: '15',
    name: '柠檬冰茶',
    description: '清新柠檬与红茶的完美结合',
    price: 16,
    category: 'drinks',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: '16',
    name: '柠檬冰茶',
    description: '清新柠檬与红茶的完美结合',
    price: 16,
    category: 'drinks',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: '17',
    name: '柠檬冰茶',
    description: '清新柠檬与红茶的完美结合',
    price: 16,
    category: 'drinks',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
];
