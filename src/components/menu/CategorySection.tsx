'use client';

import { useInView } from 'react-intersection-observer';
import { MenuItem } from '@/types/schemas/menu';
import MenuItemCard from './MenuItemCard';
import { useEffect } from 'react';

interface CategorySectionProps {
  category: string;
  items: MenuItem[];
  // onVisible 不再是简单的函数，而是报告自己的状态
  onVisibilityChange: (category: string, isVisible: boolean) => void;
}

export default function CategorySection({
  category,
  items,
  onVisibilityChange,
}: CategorySectionProps) {
  const { ref, inView } = useInView({
    // 我们还是用这个精确的 rootMargin 来定义触发线
    rootMargin: '0px 0px -100% 0px',
    threshold: 0,
  });

  // 使用 useEffect 来报告 inView 的任何变化
  useEffect(() => {
    onVisibilityChange(category, inView);
  }, [inView, category, onVisibilityChange]);

  return (
    <div id={`category-${category}`}>
      <h2 ref={ref} className="-mt-4 mb-4 pt-4 text-2xl font-semibold">
        {category}
      </h2>
      {/* 
        给 h2 加上 padding-top 和 negative margin-top 是一个小技巧，
        可以增大它的“可点击/可观察”区域，而不影响视觉布局。
      */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
