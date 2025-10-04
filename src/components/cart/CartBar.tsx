'use client';

import { useState } from 'react';
import { useCartStore, selectCartTotalPrice, selectCartTotalQuantity } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function CartDetailSheet() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore(selectCartTotalPrice);
  const { removeItem, clearCart } = useCartStore();

  return (
    <SheetContent side="bottom" className="rounded-t-lg">
      <SheetHeader>
        <SheetTitle>购物车详情</SheetTitle>
      </SheetHeader>

      <div className="max-h-[50vh] overflow-y-auto py-4">
        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item) => (
              // 2. key 应该使用 cartItemId，因为它才是列表项的唯一标识
              <div key={item.cartItemId} className="flex items-center gap-4">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                  sizes="64px"
                />
                <div className="flex-grow">
                  <p className="font-semibold">{item.name}</p>
                  {/* TODO: 这里可以添加显示已选规格的逻辑 */}
                </div>
                <div className="flex items-center gap-2">
                  {/* TODO: 这里可以替换为 QuantitySelector 组件 */}
                  <p className="font-semibold">x{item.quantity}</p>
                  <p>¥{(item.unitPrice * item.quantity).toFixed(2)}</p>
                  {/* 3. removeItem 的参数必须是 cartItemId */}
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.cartItemId)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500">购物车是空的</p>
        )}
      </div>

      <SheetFooter className="flex-col sm:flex-col sm:space-x-0">
        <div className="mb-4 flex w-full items-center justify-between">
          <Button variant="outline" onClick={clearCart}>
            清空购物车
          </Button>
          <span className="text-xl font-bold">合计: ¥{totalPrice.toFixed(2)}</span>
        </div>
        <Button className="w-full" size="lg">
          加入购物车
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}

// --- 主组件：悬浮购物车条 ---
export default function FloatingCartBar() {
  const router = useRouter();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const totalQuantity = useCartStore(selectCartTotalQuantity);
  const totalPrice = useCartStore(selectCartTotalPrice);

  // 4. 重新启用条件渲染！
  if (totalQuantity === 0) {
    return null;
  }

  function toCheckout() {
    router.push('/checkout');
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <div className="fixed bottom-16 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 cursor-pointer items-center justify-between rounded-full bg-slate-900 p-2 text-white shadow-lg">
          <div className="flex items-center gap-3 pl-3">
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {totalQuantity}
              </span>
            </div>
            <span className="text-lg font-bold">¥{totalPrice.toFixed(2)}</span>
          </div>
          <Button size="lg" className="rounded-full" onClick={toCheckout}>
            去结算
          </Button>
        </div>
      </SheetTrigger>

      {/* 5. CartDetailSheet 不再需要手动传递 props */}
      <CartDetailSheet />
    </Sheet>
  );
}
