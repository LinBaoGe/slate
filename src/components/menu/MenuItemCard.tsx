'use client';

import Image from 'next/image';
import { MenuItem } from '@/data/menu'; // 导入我们之前定义的数据类型
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const addItemToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItemToCart(item);
  };

  return (
    // 卡片整体是一个横向的 Flexbox 容器
    <div className="flex overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex flex-grow flex-col p-3">
        <h3 className="text-lg font-bold">{item.name}</h3>
        <p className="mt-1 flex-grow text-sm text-gray-500">
          {item.description}
        </p>

        {/* 底部：价格和按钮 */}
        <div className="mt-2 flex items-end justify-between">
          <span className="text-lg font-semibold text-red-500">
            ¥{item.price.toFixed(2)}
          </span>
          <Button size="sm" onClick={() => addItemToCart(item)}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
