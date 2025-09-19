'use client'; // 1. 必须是客户端组件！

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import AdminSidebar from '@/components/admin/AdminSidebar'; // 导入骨架屏用于加载状态

export default function AdminLayout({ children }: { children: ReactNode }) {
  // 2. 从全局 store 中获取用户状态和加载状态
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  // 3. 使用 useEffect 来执行副作用（路由跳转）
  useEffect(() => {
    // 确保我们只在 session 检查完成后才进行判断
    if (isLoading) {
      return; // 正在加载中，什么都不做
    }

    // 如果检查完成，但用户不存在 (未登录)
    if (!user) {
      // 强制重定向到登录页面
      router.push('/login');
    }
  }, [user, isLoading, router]); // 依赖项数组

  // 4. 处理加载状态的 UI
  // 在检查 session 期间，显示一个加载界面，避免页面闪烁
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        {/* 这里可以放一个更漂亮的加载动画或骨架屏 */}
        <p>正在加载后台...</p>
      </div>
    );
  }

  // 5. 如果用户已登录，渲染真正的后台布局
  // 我们增加一个判断，确保在跳转到登录页之前，不会意外地渲染后台UI
  if (user) {
    return (
      <div className="flex h-screen">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    );
  }

  // 如果 isLoading 为 false 且 user 为 null，
  // 此时 useEffect 里的 router.push 正在执行，
  // 我们可以返回 null 或者一个空的 Fragment，防止渲染任何东西。
  return null;
}
