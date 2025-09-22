// src/components/auth/SignOutButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { supabaseBrowserClient } from '@/utils/supabase/browser';
import { LogOut } from 'lucide-react'; // 导入一个登出图标

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await supabaseBrowserClient.auth.signOut();
      if (error) throw error;
      // 登出成功后，跳转到登录页
      router.push('/login');
    } catch (error) {
      alert('登出失败，请重试。');
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSignOut}
      className="w-full justify-start"
    >
      <LogOut className="mr-2 h-4 w-4" />
      退出登录
    </Button>
  );
}
