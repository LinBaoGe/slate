'use client';

import { useEffect } from 'react';
import { supabaseBrowserClient } from '@/utils/supabase/browser';
import { useAuthStore } from '@/store/authStore';

export default function AuthListener() {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // 1. 立即获取一次当前 session，处理初始加载状态
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabaseBrowserClient.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // 2. 设置 onAuthStateChange 监听器
    const { data: authListener } = supabaseBrowserClient.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      },
    );

    // 3. 在组件卸载时，取消监听
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [setUser, setLoading]);

  // 这个组件不渲染任何 UI
  return null;
}
