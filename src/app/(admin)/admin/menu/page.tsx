'use client';

import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { MenuItem } from '@/data/menu';
import MenuTable from '@/components/admin/menu/MenuTable';

// 定义获取数据的函数
const fetchAdminMenu = async (): Promise<MenuItem[]> => {
  const res = await fetch('/api/admin/menu', {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch menu');
  }
  return res.json();
};

export default function AdminMenuPage() {
  // “项目经理”开始工作：获取数据
  const {
    data: menuData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['admin', 'menu'],
    queryFn: fetchAdminMenu,
  });

  // “项目经理”处理各种意外情况
  if (isLoading) return <div>正在加载菜单...</div>;
  if (isError) return <div>加载失败！</div>;

  // “项目经理”搭建页面的整体框架
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">菜单管理</h1>
        <Button>+ 添加新菜品</Button>
      </div>

      {/* 
        2. 【使用/调用】“项目经理”把任务派发给“专业工人”
           - 他把获取到的 menuData，通过 data={menuData} 这个 prop 交给了 MenuTable 组件。
           - 现在，MenuTable 就开始用这份数据，去渲染那个复杂的表格了。
      */}
      {menuData && <MenuTable data={menuData} />}
    </div>
  );
}
