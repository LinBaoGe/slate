'use client';

import Image from 'next/image';
import { selectCartTotalQuantity, useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ModifierDialog from '@/components/menu/ModifierDialog';
import { QuantitySelector } from '@/components/menu/QuantitySelector';
import { ItemToAdd } from '@/types/store/cart';
import { MenuItemWithModifiers } from '@/types/menu';

interface MenuItemCardProps {
  item: MenuItemWithModifiers;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const totalItems = useCartStore((state) => state.items);
  const [shownModifier, setShowModifier] = useState(false);

  // const [selectedItemForModification, setSelectedItemForModification] =
  //   useState<MenuItemWithModifiers | null>(null);

  const handleCloseDialog = () => {
    // setSelectedItemForModification(null);
  };

  const handleAddToCartFromDialog = (configuredItem: ItemToAdd) => {
    addItem(configuredItem);
    handleCloseDialog();
  };

  const quantity = useCartStore(selectCartTotalQuantity);

  // const handleAddToCartFromSimpleGood = () => {
  //   const itemToAdd: ItemToAdd = {
  //     ...item, // 基础菜品信息
  //     quantity: quantity, // 每次增加 1
  //     unitPrice: item.basePrice, // 简单商品的单价就是基础价
  //   };
  //   addItem(itemToAdd);
  // };

  return (
    <div className="flex overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image src={item.imageUrl} alt={item.name} layout="fill" objectFit="cover" />
      </div>

      <div className="flex flex-grow flex-col p-3">
        <h3 className="text-lg font-bold">{item.name}</h3>
        <p className="mt-1 flex-grow text-sm text-gray-500">{item.description}</p>

        <div className="mt-2 flex items-end justify-between">
          <span className="text-lg font-semibold text-red-500">¥{item.basePrice.toFixed(2)}</span>
          {item.modifierGroups ? (
            <Button
              onClick={() => {
                setShowModifier(!shownModifier);
              }}
            >
              选规格
            </Button>
          ) : (
            <QuantitySelector value={quantity} onChange={() => {}} min={0} />
          )}

          <ModifierDialog
            menuItems={item}
            isOpen={shownModifier}
            setIsOpen={setShowModifier}
            onAddToCart={handleAddToCartFromDialog}
          />
        </div>
      </div>
    </div>
  );
}
