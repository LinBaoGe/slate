import { ReactNode } from "react";

// layout.tsx就是children的公共样式
export default function AdminAuthLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900">Slate 堂食點餐系統</h1>
                <p className="mt-2 text-sm text-gray-600">商家管理後台</p>
            </div>

            {/* 統一的卡片容器，包裹 login/page.tsx 和 signup/page.tsx */}
            {/* rounded-xl border border-gray-200 bg-white shadow-md */}
            <div className="w-full max-w-md space-y-8">
                {children}
            </div>
        </div>
    );
}