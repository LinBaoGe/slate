"use server"

import { PrismaClientKnownRequestError } from "@/generated/prisma/internal/prismaNamespace";
import { signJWT } from "@/utils/jwt";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";


// 指定true fasle的原因：自动推理
// type Result = 
//   | { success: true; user: User } 
//   | { success: false; error: string };

// if (res.success) {
//   console.log(res.user.name); // 絕對安全，因為 TS 知道 success 為 true 時一定有 user
// } else {
//   console.log(res.user); // 這裡會報錯！TS 知道失敗時拿不到 user，保護你不崩潰
// }
type SignUpResult =
    | { success: true; message: string; code: "SIGNUP_SUCCESS" }
    | { success: false; message: string; code: "DUPLICATE_ACCOUNT" }
    | { success: false; message: string; code: "SERVER_ERROR" };

// 注册成功后呢？
const signUp = async (account: string, password: string): Promise<SignUpResult> => {
    try {
        const user = await prisma.user.create({
            data: {
                account,
                password
            }
        })

        // jwt是无状态的，不需要存入db
        // admin_token customer_token
        setAdminToken(user.id)

        return {
            success: true,
            message: "注册成功并已自动登录",
            code: "SIGNUP_SUCCESS"
        }
    } catch (error) {
        // 只要判断正确就会使用类型
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return {
                    success: false,
                    message: "账号已经存在",
                    code: "DUPLICATE_ACCOUNT" // 有利于i18n + 英文代码习惯
                }
            }
        }

        return {
            success: false,
            message: "服务器异常，请稍后再试",
            code: "SERVER_ERROR"
        };
    }
}

type LoginResult =
    | { success: true; message: string; code: "LOGIN_SUCCESS" }
    | { success: false; message: string; code: "WRONG_PASSWORD" } // 对应DUPLICATED_PASSWORD
    | { success: false; message: string; code: "SERVER_ERROR" };

const loginWithAccount = async (account: string, frontEndPassword: string): Promise<LoginResult> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                account
            }
        })

        if (!user) {
            return {
                success: false,
                message: "账号或密码错误",
                code: "WRONG_PASSWORD"
            }
        }

        // 很多所谓的限制，未来规划，根本用不上，只需要遵循MVP原则来开发即可
        const isPasswordValid = user?.password === frontEndPassword
        if (isPasswordValid) {
            await setAdminToken(user.id)
            return {
                success: true,
                message: "登陆成功",
                code: "LOGIN_SUCCESS" // i18的根语言
            }
        } else {
            return {
                success: false,
                message: "账号或密码错误",
                code: "WRONG_PASSWORD"
            }
        }
    } catch (error) {
        console.log('loginWithAccount error', error)
        return {
            success: false,
            message: "服务器异常，请稍后再试",
            code: "SERVER_ERROR"
        };
    }
}

const setAdminToken = async (userId: string) => {
    const token = await signJWT({ userId })
    const cookieStore = await cookies()
    cookieStore.set("admin_token", token, {
        httpOnly: true, // 防範 XSS 攻擊，JS 無法讀取該 Cookie
        secure: process.env.NODE_ENV === "production", // 僅在 HTTPS 下傳輸（本地開發環境除外）
        sameSite: "lax", // 防範 CSRF 攻擊
        path: "/admin", // 全站有效
        maxAge: 60 * 60 * 24 * 7 // Cookie 有效期設定為 7 天，與 JWT 一致
    });
}


export {
    signUp,
    loginWithAccount
}