'use client'; // 因为包含了 SignOutButton 这个客户端组件

import Link from 'next/link';
import SignOutButton from '@/components/auth/SignOutButton';
import { useAuthStore } from '@/store/authStore';

export default function AdminSidebar() {
  const { user } = useAuthStore();

  return (
    <aside className="flex w-64 flex-shrink-0 flex-col bg-slate-800 p-4 text-white">
      <h2 className="mb-8 text-2xl font-bold">Slate Admin</h2>

      <nav className="flex-grow">
        <ul>
          <li>
            <Link href="/admin/dashboard" className="block py-2">
              仪表盘
            </Link>
          </li>
          <li>
            <Link href="/admin/menu" className="block py-2">
              菜单管理
            </Link>
          </li>
          <li>
            <Link href="/admin/orders" className="block py-2">
              订单管理
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto">
        {user && (
          <div className="mb-4 text-sm">
            <p>已登录为:</p>
            <p className="font-semibold break-all">{user.email}</p>
          </div>
        )}
        <SignOutButton />
      </div>
    </aside>
  );
}
