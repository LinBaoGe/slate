// "use server" // 要不要啊？？

// jose = 依賴 W3C 國際 Web 標準 API（Web Crypto），因此可以在瀏覽器、Middleware、Edge 邊緣端等任何现代 JS 環境上跑
// JWT 是一個「技術標準」，而 jsonwebtoken 只是實現這個標準的「工具之一」
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET

// 2. 將密鑰轉換為 Web Crypto API 所需的 Uint8Array 格式 [1.1.2]
const secret = new TextEncoder().encode(JWT_SECRET);

/**
 * 簽發 JWT Token [1.1.2]
 * @param payload 想要存入 Token 的數據（如 { userId: "xxx" }）
 * @param expires 過期時間，默認 7 天（可設置為 '2h', '1d' 等）
 */
export async function signJWT(payload: Record<string, any>, expires: string = '7d') {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' }) // 使用 HS256 對稱加密算法
        .setIssuedAt() // 設置簽發時間
        .setExpirationTime(expires) // 設置過期時間
        .sign(secret); // 進行簽名
}

/**
 * 驗證并解析 JWT Token [1.1.2]
 * @param token 傳入的 JWT 字串
 * @returns 解析後的數據，驗證失敗則返回 null
 */
export async function verifyJWT(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload; // 驗證成功，返回存儲的數據
    } catch (error) {
        // Token 過期或被篡改時會觸發異常
        console.error('JWT verification failed:', error);
        return null;
    }
}