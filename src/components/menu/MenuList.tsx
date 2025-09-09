// src/components/menu/MenuList.tsx
import { MOCK_MENU_DATA, MenuItem } from '@/data/menu';
import CategorySection from './CategorySection';

interface MenuListProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
}

export default function MenuList({
  categories,
  onCategoryChange,
}: MenuListProps) {
  const groupedMenu = MOCK_MENU_DATA.reduce(
    (acc, item) => {
      // 获取当前菜品的类别
      const category = item.category;

      // 如果累加器(acc)中还没有这个类别的键，就创建一个空数组
      if (!acc[category]) {
        acc[category] = [];
      }

      // 将当前菜品推进对应的类别数组里
      acc[category].push(item);

      return acc;
    },
    {} as Record<string, MenuItem[]>,
  );

  return (
    <div>
      {categories.map((category) => (
        <CategorySection
          key={category}
          category={category}
          items={groupedMenu[category]}
          onVisible={() => onCategoryChange(category)}
        />
      ))}
    </div>
  );
}
