'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { CirclePlus } from 'lucide-react';
import { MenuItem } from '@/types/schemas/menu';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const addItemToCart = useCartStore((state) => state.addItem);

  return (
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
          {/*<Button size="sm" onClick={() => addItemToCart(item)}>*/}
          {/*  +*/}
          {/*</Button>*/}
          <CirclePlus onClick={() => addItemToCart(item)} />
        </div>
      </div>
    </div>
  );
}
