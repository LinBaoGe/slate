'use client';

import { useState, FormEvent } from 'react'; // 1. 导入
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
import { useRouter } from 'next/navigation';
import { supabaseBrowserClient } from '@/utils/supabase/browser';
import { getErrorMessage } from '@/utils/error';

export default function LoginPage() {
  // 4. 添加 state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // 5. 创建登录处理函数
  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 调用 Supabase 的核心登录函数
      // const res = await supabase.
      const { error: signInError } =
        await supabaseBrowserClient.auth.signInWithPassword({
          email: email,
          password: password,
        });

      if (signInError) {
        if (signInError.message === 'Invalid login credentials') {
          throw Error('邮箱或密码错误，请重试。'); // 抛出一个更友好的 Error 对象
        }
        throw signInError;
      }

      // 登录成功！
      // Supabase 的客户端库会自动处理 session 和 cookie，我们只需要跳转页面
      router.push('/admin/dashboard'); // 重定向到商家后台的仪表盘
    } catch (err) {
      console.error('登录过程中发生错误:', err);
      // 3. 使用你的通用函数来处理错误
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">登录</CardTitle>
        <CardDescription>输入您的邮箱和密码以登录后台</CardDescription>
      </CardHeader>
      <CardContent>
        {/* 6. 绑定表单 */}
        <form onSubmit={handleSignIn}>
          <div className="grid gap-4">
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
              <div className="flex items-center">
                <Label htmlFor="password">密码</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  忘记密码?
                </Link>
              </div>
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
              {isLoading ? '正在登录...' : '登录'}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          还没有账户?{' '}
          <Link href="/signup" className="underline">
            去注册
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
