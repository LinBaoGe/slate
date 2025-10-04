import { FullMenuData } from '@/types/menu';

export const MOCK_FULL_MENU_DATA: FullMenuData = {
  restaurantId: '7b1fe6ea-d865-414c-ab9f-58fe6a1d01c8',
  categories: [
    {
      id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
      name: '主食',
      displayOrder: 1,
      menuItems: [
        {
          id: 'b1c2d3e4-f5a6-b7c8-d9e0-f1a2b3c4d5e6',
          name: '经典牛肉汉堡套餐',
          description: '多汁安格斯牛肉饼，可自由搭配配餐和饮品。',
          basePrice: 38.0,
          category: '主食',
          imageUrl:
            'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
          displayOrder: 1,
          modifierGroups: [
            {
              id: 'c1d2e3f4-a5b6-c7d8-e9f0-a1b2c3d4e5f6',
              name: '选择配餐',
              selectionType: 'single',
              isRequired: true,
              defaultOptionId: 'd1e2f3a4-b5c6-d7e8-f9a0-b1c2d3e4f5a6',
              displayOrder: 1,
              options: [
                {
                  id: 'd1e2f3a4-b5c6-d7e8-f9a0-b1c2d3e4f5a6',
                  name: '中份薯条',
                  priceDelta: 0,
                  displayOrder: 1,
                },
                {
                  id: 'e1f2a3b4-c5d6-e7f8-a9b0-c1d2e3f4a5b6',
                  name: '升级大份薯条',
                  priceDelta: 5,
                  displayOrder: 2,
                },
                {
                  id: 'f1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6',
                  name: '换成蔬菜沙拉',
                  priceDelta: 3,
                  displayOrder: 3,
                },
              ],
            },
            {
              id: 'a2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7',
              name: '选择饮品',
              selectionType: 'single',
              isRequired: true,
              defaultOptionId: 'b2c3d4e5-f6a7-b8c9-d0e1-f2a3b4c5d6e7',
              displayOrder: 2,
              options: [
                {
                  id: 'b2c3d4e5-f6a7-b8c9-d0e1-f2a3b4c5d6e7',
                  name: '可口可乐',
                  priceDelta: 0,
                  displayOrder: 1,
                },
                {
                  id: 'c2d3e4f5-a6b7-c8d9-e0f1-a2b3c4d5e6f7',
                  name: '升级鲜榨橙汁',
                  priceDelta: 8,
                  displayOrder: 2,
                },
              ],
            },
          ],
        },
        {
          id: 'd4e5f6a7-b8c9-d0e1-f2a3-b4c5d6e7f8a9',
          name: '凯撒沙拉',
          description: '罗马生菜、面包丁和帕玛森芝士，配以经典的凯撒酱。',
          basePrice: 42.0,
          category: '主食',
          imageUrl:
            'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
          displayOrder: 2,
        },
      ],
    },
    {
      id: 'e5f6a7b8-c9d0-e1f2-a3b4-c5d6e7f8a9b0',
      name: '饮品',
      displayOrder: 2,
      menuItems: [
        {
          id: 'f6a7b8c9-d0e1-f2a3-b4c5-d6e7f8a9b0c1',
          name: '拿铁咖啡',
          description: '意式浓缩与蒸煮牛奶的完美融合，可自定义口味。',
          basePrice: 28.0,
          category: '饮品',
          imageUrl:
            'https://zenklgcenvgjolmzdjqg.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
          displayOrder: 1,
          modifierGroups: [
            {
              id: 'a7b8c9d0-e1f2-a3b4-c5d6-e7f8a9b0c1d2',
              name: '温度',
              selectionType: 'single',
              isRequired: true,
              defaultOptionId: 'c8d9e0f1-a2b3-c4d5-e6f7-a8b9c0d1e2f3',
              displayOrder: 1,
              options: [
                {
                  id: 'b7c8d9e0-f1a2-b3c4-d5e6-f7a8b9c0d1e2',
                  name: '热',
                  priceDelta: 0,
                  displayOrder: 2,
                },
                {
                  id: 'c8d9e0f1-a2b3-c4d5-e6f7-a8b9c0d1e2f3',
                  name: '冰',
                  priceDelta: 0,
                  displayOrder: 1,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
