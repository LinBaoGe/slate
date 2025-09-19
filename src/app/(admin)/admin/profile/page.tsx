'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { supabaseBrowserClient } from '@/utils/supabase/browser';

export default function ProfilePage() {
  // 1. 获取用户状态和路由实例
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  // 2. 实现路由保护
  useEffect(() => {
    // 等待 session 检查完成
    if (isLoading) {
      return;
    }
    // 如果检查完成但用户未登录，踢回登录页
    if (!user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // 3. 创建登出处理函数
  const handleSignOut = async () => {
    try {
      const { error } = await supabaseBrowserClient.auth.signOut();
      if (error) {
        throw error;
      }
      // 登出成功后，Supabase 的 onAuthStateChange 监听器会自动触发，
      // 更新我们的 zustand store。
      // 我们只需要把用户导航到安全的地方。
      router.push('/'); // 跳转到首页
    } catch (error) {
      console.error('登出时发生错误:', error);
      alert('登出失败，请稍后再试。');
    }
  };

  // 4. 处理加载状态的 UI
  if (isLoading) {
    return <div>正在加载用户信息...</div>;
  }

  // 5. 渲染页面内容
  if (user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">个人资料</h1>
        <div className="space-y-4">
          <p>
            <strong>欢迎回来！</strong>
          </p>
          <p>
            <strong>邮箱:</strong> {user.email}
          </p>
          <Button variant="destructive" onClick={handleSignOut}>
            退出登录
          </Button>
        </div>
      </div>
    );
  }

  // 在跳转到 /login 之前，不渲染任何东西
  return null;
}
