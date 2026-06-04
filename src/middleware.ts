import { verifyJWT } from '@/utils/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// middleware默认是一个纯服务端的函数，不能用useRouter这种client component的方法
// URL的跳转是服务器决定的，这是最高级的权限，只能由服务器决定；client component的渲染是URL来决定的
// 跳转页面，请求图片都会触发
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/admin')) {
        const token = request.cookies.get('admin_token')?.value;

        const isVerified = token ? await verifyJWT(token) : null;

        // 登录注册这种免权的的逻辑要优先处理，防止死循環
        // '/admin'也会被'admin/login'排除的
        if (isVerified) {
            if (pathname === '/admin/login' || pathname === '/admin/signup') {
                // const searchParams = useSearchParams() // 这里不是client component，不能这样用
                // callbackUrl是一次性的，不用特地消除
                // const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard'

                const callbackUrl = request.nextUrl.searchParams.get('callbackUrl') || '/admin/dashboard'

                // 如果您只寫 NextResponse.redirect(...) 而不寫 return：程式碼只會「默默地在內存中創建了這個對象」，然後什麼都不做，繼續往下執行。
                return NextResponse.redirect(new URL(callbackUrl, request.url));
            }

            return NextResponse.next()
        } else {// 要放在注册登录的逻辑下面，否则会陷入死循环 => 因为在登录页面也是没有验证的，这个逻辑会无限执行
            // new URL() 构建绝对路径，request.url是完整的url
            // URL 構造函數會首先解析 request.url，並提取出它的 Origin（源），也就是域名和端口（例如：http://localhost:3000）。
            const loginUrl = new URL('/admin/login', request.url)
            // 假設用戶原本想訪問 /admin/orders（此時 pathname 就是 /admin/orders）。
            // 则会被拼接成 http://localhost:3000/login?callbackUrl=/admin/orders
            // searchParams就是origin后的?callbackUrl=xxx
            loginUrl.searchParams.set('callbackUrl', pathname)

            return NextResponse.redirect(loginUrl);
        }
    }
}

// 4. 設定 Matcher：規定只有以下路由才會觸發 Middleware 攔截 [1.1.2]
export const config = {
    matcher: [
        /*
         * 匹配需要保護的路由範圍：
         * - /admin 开头的所有路由 (/admin/:path*)
         */
        '/admin/:path*',
        '/profile',
        // '/about',
    ],
};