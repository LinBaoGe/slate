'use client';

import { MenuItem } from '@/types/schemas/menu';
import CategorySection from './CategorySection';
import { useState, useMemo, useCallback, useEffect } from 'react';

interface MenuListProps {
  menuData: MenuItem[];
  categories: string[];
  onCategoryChange: (category: string) => void;
}

export default function MenuList({
  menuData,
  categories,
  onCategoryChange,
}: MenuListProps) {
  const [visibleCategories, setVisibleCategories] = useState(new Set<string>());

  const handleVisibilityChange = useCallback(
    (category: string, isVisible: boolean) => {
      setVisibleCategories((prev) => {
        const newVisible = new Set(prev);
        if (isVisible) {
          newVisible.add(category);
        } else {
          newVisible.delete(category);
        }
        return newVisible;
      });
    },
    [],
  );

  useEffect(() => {
    // a. 将可见的类别，按照它们在原始 categories 数组中的顺序排序
    const sortedVisible = categories.filter((cat) =>
      visibleCategories.has(cat),
    );

    // b. 如果有可见的类别，就把第一个通知给父组件
    if (sortedVisible.length > 0) {
      onCategoryChange(sortedVisible[0]);
    }
  }, [visibleCategories, categories, onCategoryChange]); // 3. 依赖项是 visibleCategories

  const groupedMenu = useMemo(
    () =>
      menuData.reduce(
        (acc, item) => {
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
      ),
    [menuData],
  );

  return (
    <div>
      {categories.map((category) => (
        <CategorySection
          key={category}
          category={category}
          items={groupedMenu[category] || []}
          onVisibilityChange={handleVisibilityChange}
        />
      ))}
    </div>
  );
}
