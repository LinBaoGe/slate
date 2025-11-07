'use client';

import { useMemo, useState, useRef, UIEvent, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import MenuList from '@/components/menu/MenuList';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchParams } from 'next/navigation';
import { MOCK_FULL_MENU_DATA } from '@/data/menuWithModifiers';
import FloatingCartBar from '@/components/cart/CartBar';
import { Categories } from '@/types/menu';
import { useSessionStore } from '@/store/sessionStore';
import { v4 as uuidv4 } from 'uuid';

const USE_MOCK = true;

const fetchMenu = async (restaurantId: string): Promise<Categories[]> => {
  if (USE_MOCK) {
    return Promise.resolve(MOCK_FULL_MENU_DATA.categories);
  }

  const res = await fetch(`/api/customer/menu?restaurant_id=${restaurantId}`);
  if (!res.ok) {
    throw new Error('Network response was not available');
  }
  return res.json();
};

export default function MenuPage() {
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get('restaurant_id') ?? '';
  const [activeCategory, setActiveCategory] = useState<string>('');
  const isScrollingProgrammatically = useRef(false);
  const { sessionId, tableId, setSession } = useSessionStore();

  useEffect(() => {
    const table = searchParams.get('table');
    let sid = localStorage.getItem('session_id');

    if (!sid) {
      sid = uuidv4();
      localStorage.setItem('session_id', sid);
    }

    if (table) setSession(sid, table);
  }, [setSession]);

  const {
    data: menuData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['menu'],
    queryFn: () => fetchMenu(restaurantId),
  });

  const categories = useMemo(() => {
    if (!menuData) return [];
    return [...new Set(menuData.map((item) => item.name))];
  }, [menuData]);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  }, [categories]);

  if (isLoading) {
    return <MenuLoadingSkeleton />; // 显示一个加载中的占位界面
  }

  if (isError) {
    return <div>加载菜单失败，请稍后再试。</div>;
  }

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);

    isScrollingProgrammatically.current = true;

    const element = document.getElementById(`category-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });

      // 'smooth' 滚动没有原生的 'onEnd' 事件，我们用一个 setTimeout 来模拟。
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
    if (!isScrollingProgrammatically.current && event.currentTarget.scrollTop === 0) {
      // 强制将激活类别设置为第一个
      setActiveCategory(categories[0]);
    }
  };

  return (
    <>
      <div>sessionId: {sessionId}</div>
      <div>tableId: {tableId}</div>
      <div className="flex h-screen">
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

        <FloatingCartBar />
      </div>
    </>
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
