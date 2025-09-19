// src/store/authStore.ts
import { create } from 'zustand';
import { User } from '@supabase/supabase-js'; // 从 supabase 导入 User 类型

// 1. 定义 Store 的状态 (State) 和操作 (Actions) 的类型
interface AuthState {
  user: User | null; // 用户信息，未登录时为 null
  isLoading: boolean; // 初始加载状态，判断 session 是否已恢复
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

// 2. 创建 store
export const useAuthStore = create<AuthState>((set) => ({
  // 初始状态
  user: null,
  isLoading: true, // 初始时，我们总是假设正在加载/检查 session

  // Actions
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
