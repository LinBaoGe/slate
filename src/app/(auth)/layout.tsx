// src/app/(auth)/layout.tsx
'use client'; // 1. 必须是客户端组件，因为它需要使用 Hooks

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AuthLayout({ children }: { children: ReactNode }) {
  // 2. 同样，获取用户状态和路由实例
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  // 3. 编写“已登录用户”的重定向逻辑
  useEffect(() => {
    // 同样，等待 session 检查完成
    if (isLoading) {
      return;
    }

    // 如果检查完成，并且用户“存在”(已登录)
    if (user) {
      // 立刻把他送回后台主页
      router.push('/admin/dashboard');
    }
  }, [user, isLoading, router]);

  // 4. 处理加载状态
  // 在检查 session 期间，为了防止页面闪烁，我们可以什么都不渲染
  if (isLoading) {
    return null;
  }

  // 5. 如果用户未登录，或者正在跳转中，才渲染真正的登录/注册页面
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        {children}
      </div>
    );
  }

  // 如果 isLoading 为 false 且 user 存在，
  // 此时 useEffect 里的 router.push 正在执行，
  // 返回 null 防止在跳转前渲染登录页。
  return null;
}
