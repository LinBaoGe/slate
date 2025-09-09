// src/components/menu/CategorySection.tsx
'use client';

import { useInView } from 'react-intersection-observer';
import { MenuItem } from '@/data/menu';
import MenuItemCard from './MenuItemCard';
import { useEffect } from 'react';

interface CategorySectionProps {
  category: string;
  items: MenuItem[];
  onVisible: () => void;
}

export default function CategorySection({
  category,
  items,
  onVisible,
}: CategorySectionProps) {
  // useInView 是这个库的核心 Hook
  const { ref, inView } = useInView({
    threshold: 0.5, // 当元素 50% 可见时，才算作 inView
  });

  // 使用 useEffect 来监听 inView 的变化
  useEffect(() => {
    // 当这个区块进入视野时，调用父组件传来的 onVisible 函数
    if (inView) {
      onVisible();
    }
  }, [inView, onVisible]);

  return (
    // 把 ref 绑定到这个区块的根元素上
    // 并且给它一个唯一的 ID，用于点击联动
    <div id={`category-${category}`} ref={ref} className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">{category}</h2>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
