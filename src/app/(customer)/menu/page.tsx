'use client';

import { useMemo, useState, useRef, UIEvent, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import MenuList from '@/components/menu/MenuList';
import { Skeleton } from '@/components/ui/skeleton';
import { MenuItem } from '@/types/schemas/menu';
import { useSearchParams } from 'next/navigation';

const fetchMenu = async (restaurantId: string): Promise<MenuItem[]> => {
  const res = await fetch(`/api/customer/menu?restaurant_id=${restaurantId}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export default function MenuPage() {
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get('restaurant_id') ?? '';
  const [activeCategory, setActiveCategory] = useState<string>('');
  const isScrollingProgrammatically = useRef(false);

  const {
    data: menuData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['menu'], // 缓存的键
    queryFn: () => fetchMenu(restaurantId), // 获取数据的函数
  });

  const categories = useMemo(() => {
    if (!menuData) return [];
    return [...new Set(menuData.map((item) => item.category))];
  }, [menuData]);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  }, [categories]);

  // const categories = useMemo(() => {
  //   return [...new Set(MOCK_MENU_DATA.map((item) => item.category))];
  // }, []);

  // 4. 计算 categories，但要处理 data 可能为 undefined 的情况

  // 5. 处理加载和错误状态
  if (isLoading) {
    return <MenuLoadingSkeleton />; // 显示一个加载中的占位界面
  }

  if (isError) {
    return <div>加载菜单失败，请稍后再试。</div>;
  }

  // 1. 新增一个 ref 来追踪是否正在进行程序化滚动
  // 使用 ref 是因为它不会触发重渲染，我们只需要一个标志位

  // 2. 修改点击处理函数
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);

    // 告诉系统，我们即将开始一次“自动滚动”
    isScrollingProgrammatically.current = true;

    const element = document.getElementById(`category-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });

      // 我们需要知道滚动何时结束。
      // 'smooth' 滚动没有原生的 'onEnd' 事件，我们用一个 setTimeout 来模拟。
      // 这是一个常见的、虽然不完美但有效的技巧。
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 800); // 800ms 应该足够大部分平滑滚动完成
    } else {
      isScrollingProgrammatically.current = false;
    }
  };

  // 3. 创建一个新的处理函数，传给 MenuList
  const handleScrollIntersection = (category: string) => {
    // 只有在不是“自动滚动”的状态下，才允许滚动联动更新 activeCategory
    if (!isScrollingProgrammatically.current) {
      setActiveCategory(category);
    }
  };

  // 2. 新增一个 onScroll 处理函数
  const handleMainScroll = (event: UIEvent<HTMLElement>) => {
    // 如果不是程序化滚动，并且滚动到了最顶部
    if (
      !isScrollingProgrammatically.current &&
      event.currentTarget.scrollTop === 0
    ) {
      // 强制将激活类别设置为第一个
      setActiveCategory(categories[0]);
    }
  };

  return (
    <div className="flex h-screen">
      {/* 使用 Flexbox 创建左右布局，并占满整个屏幕高度 */}
      {/* 左侧：分类导航 */}
      <aside className="w-1/4 overflow-y-auto bg-slate-100 p-4">
        <h2 className="mb-4 text-xl font-bold">分类</h2>
        <nav>
          <ul>
            {categories.map((category) => (
              <li key={category} className="mb-2">
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full rounded-md p-2 text-left ${
                    activeCategory === category
                      ? 'bg-slate-800 font-bold text-white'
                      : 'hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* 右侧：菜品列表 */}
      <main className="w-3/4 overflow-y-auto p-4" onScroll={handleMainScroll}>
        <h1 className="mb-8 text-3xl font-bold">菜单</h1>
        {menuData && (
          <MenuList
            // 6. 把从 API 获取的数据传下去
            menuData={menuData}
            categories={categories}
            onCategoryChange={handleScrollIntersection}
          />
        )}
      </main>
    </div>
  );
}

// (在文件末尾，可以创建一个简单的骨架屏组件)
const MenuLoadingSkeleton = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-slate-100 p-4">
        <Skeleton className="h-8 w-1/2" />
      </aside>
      <main className="w-3/4 p-4">
        <Skeleton className="mb-8 h-10 w-1/3" />
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </main>
    </div>
  );
};
