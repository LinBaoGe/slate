import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/components/providers/QueryProvider';
import AuthListener from '@/components/auth/AuthListener';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Slate',
  description: 'A modern ordering system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthListener />
          {children} {/* 所有的子布局 (customer/menu) 都会在这里渲染 */}
        </QueryProvider>
      </body>
    </html>
  );
}
