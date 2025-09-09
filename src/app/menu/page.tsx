// app/menu/page.tsx (左右联动版)
'use client'; // 这个页面现在需要处理复杂交互，必须是客户端组件

import { useReducer, useMemo, useState } from 'react'; // 导入 useReducer 和 useMemo
import { MOCK_MENU_DATA, MenuItem } from '@/data/menu';
import MenuItemCard from '@/components/menu/MenuItemCard';
import MenuList from '@/components/menu/MenuList';

export default function MenuPage() {
  // 我们不再用 reduce 了，因为需要保留原始顺序来滚动
  // const groupedMenu = ...

  // 我们直接计算出所有的类别，用于渲染左侧导航
  const categories = useMemo(() => {
    // 使用 Set 去重，然后转回数组
    return [...new Set(MOCK_MENU_DATA.map((item) => item.category))];
  }, []); // useMemo 缓存计算结果，避免重复计算

  // 使用一个 state 来追踪当前高亮的类别
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  // 点击左侧分类的处理函数
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    // 滚动逻辑
    const element = document.getElementById(`category-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-screen">
      {' '}
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
      <main className="w-3/4 overflow-y-auto p-4">
        <h1 className="mb-8 text-3xl font-bold">菜单</h1>

        {/* 这里我们将渲染新的、支持观察的菜品列表组件 */}
        <MenuList
          categories={categories}
          onCategoryChange={setActiveCategory}
        />
      </main>
    </div>
  );
}
