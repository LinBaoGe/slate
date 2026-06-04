'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 2. 导入 useRouter
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '@/actions/menuActions';
// import { router } from 'next/client';

export const accountPasswordSchema = z.object({
  account: z.string().nonempty("账号必填"),
  password: z.string().nonempty("密码必填")
})

export type AccountPasswordFormData = z.infer<typeof accountPasswordSchema>

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<AccountPasswordFormData>({
    // 登录和注册要分开用的话就用useForm，如果要共同验证（多个独立组件共享表单状态）的话，就用useFormContext
    resolver: zodResolver(accountPasswordSchema),
    mode: "onBlur"
  })

  const router = useRouter()

  const signUpConfirm: SubmitHandler<AccountPasswordFormData> = async (data: AccountPasswordFormData) => {
    const { account, password } = data
    const res = await signUp(account, password)
    console.log('signUpConfirm response', res)

    switch (res.code) {
      case "SIGNUP_SUCCESS":
        router.push("/admin")
        break;
      case "DUPLICATE_ACCOUNT":
        setError("account", { type: "server", message: res.message })
        break;

      case "SERVER_ERROR":
        setError("root", { type: "server", message: res.message })
        break;
    }

  }

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">注册</CardTitle>
        <CardDescription>输入您的信息以创建后台管理账户</CardDescription>
      </CardHeader>

      <CardContent>
        {/* handleSubmit先把data验证，再递给callback signUpConfirm */}
        <form onSubmit={handleSubmit(signUpConfirm)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">账号</Label>
              <Input
                id="account"
                type="account"
                placeholder="账号名"
                {...register("account")}
              />
              {errors.account?.message}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="密码"
                {...register("password")}
              // 有了register以下这3个都不需要了
              // required
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              // disabled={isLoading}
              />
              {errors.password?.message}
            </div>

            {/* 7. 显示错误信息 */}
            {/* {error && <p className="text-sm text-red-500">{error}</p>} */}

            <Button type="submit" className="w-full">
              创建账户
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          已经有账户了？
          <Link href="/admin/login" className="underline">
            去登录
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
