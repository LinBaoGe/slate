'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, UtensilsCrossed, User, ShoppingCart } from 'lucide-react';

const navItems = [
  { href: '/', label: '首页', icon: Home },
  { href: '/menu', label: '点餐', icon: UtensilsCrossed },
  { href: '/profile', label: '我的', icon: User },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    // 3. 创建一个固定在底部的容器
    <nav className="fixed right-0 bottom-0 left-0 z-50 h-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex h-full max-w-md items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex h-full flex-1 flex-col items-center justify-center gap-1"
            >
              <item.icon
                className={`h-6 w-6 transition-colors ${
                  isActive ? 'text-slate-900' : 'text-slate-400'
                }`}
              />
              <span
                className={`text-xs transition-colors ${
                  isActive ? 'font-semibold text-slate-900' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
