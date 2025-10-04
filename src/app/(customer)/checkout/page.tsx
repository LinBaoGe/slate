'use client';

import { useCartStore, CartItem } from '@/store/cartStore';
import { selectCartTotalPrice, selectCartTotalQuantity } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// 子组件：用于显示订单摘要中的单项
function OrderSummaryItem({ item }: { item: CartItem }) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={64}
          height={64}
          className="rounded-md object-cover"
          sizes="64px"
        />
        <div>
          <p className="font-semibold">{item.name}</p>
          {/* TODO: 在这里渲染用户选择的规格 */}
          <p className="text-sm text-slate-500">x {item.quantity}</p>
        </div>
      </div>
      <p className="font-medium">¥{(item.unitPrice * item.quantity).toFixed(2)}</p>
    </div>
  );
}

// 主页面组件
export default function CheckoutPage() {
  // 1. 从 store 中获取所有需要的数据
  const items = useCartStore((state) => state.items);
  const totalQuantity = useCartStore(selectCartTotalQuantity);
  const totalPrice = useCartStore(selectCartTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const router = useRouter();

  // 2. 路由保护：如果购物车是空的，就没必要停留在结算页
  useEffect(() => {
    if (totalQuantity === 0) {
      // 购物车空了，可能是用户清空了，或者直接访问了这个 URL
      // 把他送回菜单页
      router.replace('/menu');
    }
  }, [totalQuantity, router]);

  // 3. 处理下单逻辑 (MVP 版本)
  const handlePlaceOrder = () => {
    // 在这里，未来你会调用一个 useMutation 来把订单数据发送到后端
    // const placeOrderMutation = useMutation(...);
    // placeOrderMutation.mutate({ items, totalPrice });

    // 在我们的 MVP 中，我们只是模拟成功
    alert('下单成功！后厨已接单，请在用餐结束后到前台结账。');

    // 下单成功后，清空购物车
    clearCart();

    // 跳转到首页或一个专门的“下单成功”页面
    router.push('/');
  };

  // 如果正在跳转，可以先不渲染
  if (totalQuantity === 0) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-lg p-4 pt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">确认您的订单</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* --- 桌号信息 (待实现) --- */}
          <div className="flex items-center justify-between">
            <span className="text-slate-600">桌号</span>
            <span className="font-semibold">A3</span>
          </div>

          <Separator />

          {/* --- 订单摘要 --- */}
          <div className="space-y-4">
            <h3 className="font-semibold">订单详情</h3>
            {items.map((item) => (
              <OrderSummaryItem key={item.cartItemId} item={item} />
            ))}
          </div>

          <Separator />

          {/* --- 金额统计 --- */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>商品小计 ({totalQuantity} 件)</span>
              <span>¥{totalPrice.toFixed(2)}</span>
            </div>
            {/* 未来可以增加服务费、折扣等 */}
            <div className="flex justify-between text-lg font-bold">
              <span>总计</span>
              <span>¥{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {/* 在 MVP 中，这个按钮就是我们的核心 CTA */}
          <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
            通知后厨下单
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
