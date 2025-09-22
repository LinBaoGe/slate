// src/app/(auth)/signup/page.tsx
'use client';

import { useState, FormEvent } from 'react'; // 1. 导入 useState 和 FormEvent
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 2. 导入 useRouter
import { supabaseBrowserClient } from '@/utils/supabase/browser';
import { getErrorMessage } from '@/utils/error'; // 3. 导入 supabase 实例

export default function SignUpPage() {
  // 4. 使用 state 管理表单输入
  const [restaurantName, setRestaurantName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter(); // 初始化 router

  // 5. 创建处理表单提交的异步函数
  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault(); // 阻止表单默认的刷新页面行为

    setIsLoading(true);
    setError(null);

    try {
      // --- 步骤 A: 注册用户 ---
      const { data: authData, error: authError } =
        await supabaseBrowserClient.auth.signUp({
          email: email,
          password: password,
        });

      if (authError) {
        throw authError; // 如果认证出错，直接抛出
      }

      if (!authData.user) {
        // 理论上 signUp 成功后 user 对象一定存在，但做好防御性编程
        throw new Error('注册成功，但未返回用户信息！');
      }

      const userId = authData.user.id;

      // --- 步骤 B: 创建餐厅档案 ---
      // 我们将 user.id 作为 restaurant 表的主键
      const { error: profileError } = await supabaseBrowserClient
        .from('restaurants')
        .insert({
          id: userId, // 将用户的 UID 作为餐厅表的主键
          owner_id: userId, // 同时 owner_id 也指向这个 UID
          name: restaurantName,
        });

      if (profileError) {
        throw profileError; // 如果创建档案出错，也抛出
      }

      // --- 步骤 C: 注册成功 ---
      alert('注册成功！请检查您的邮箱以完成验证。');
      router.push('/login'); // 重定向到登录页面
    } catch (err) {
      // 捕获所有错误
      setError(getErrorMessage(err));
    } finally {
      // 无论成功还是失败，最后都结束加载状态
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">注册</CardTitle>
        <CardDescription>输入您的信息以创建账户</CardDescription>
      </CardHeader>
      <CardContent>
        {/* 6. 将表单与 state 和 handler 绑定 */}
        <form onSubmit={handleSignUp}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="restaurant-name">餐厅名称</Label>
              <Input
                id="restaurant-name"
                placeholder="例如：麦当劳"
                required
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* 7. 显示错误信息 */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? '正在创建...' : '创建账户'}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          已经有账户了?{' '}
          <Link href="/login" className="underline">
            去登录
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
