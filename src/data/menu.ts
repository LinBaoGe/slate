import { MenuItem } from '@/types/schemas/menu';

export const MOCK_MENU_DATA: MenuItem[] = [
  {
    id: 1,
    name: '经典牛肉汉堡',
    description: '多汁牛肉饼配新鲜生菜和秘制酱料',
    price: 35,
    category: 'main',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: 2,
    name: '香脆炸鸡汉堡',
    description: '酥脆炸鸡胸肉配特调蛋黄酱和酸黄瓜',
    price: 32,
    category: 'main',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: 3,
    name: '薯条（大份）',
    description: '金黄酥脆，外焦里嫩，撒上海盐',
    price: 18,
    category: 'main',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  {
    id: 4,
    name: '巧克力奶昔',
    description: '香浓巧克力口味，顶部配鲜奶油和巧克力碎',
    price: 22,
    category: 'desserts',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
  // ...后面依次改成 id: 5, id: 6 ...
  {
    id: 17,
    name: '柠檬冰茶',
    description: '清新柠檬与红茶的完美结合',
    price: 16,
    category: 'drinks',
    imageUrl:
      'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
  },
];
