'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cart/cart.store';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ModifierDialog from '@/components/menu/ModifierDialog';
import { QuantitySelector } from '@/components/menu/QuantitySelector';
import { ItemToAdd } from '@/store/cart/cart.types';
import { MenuItemWithModifiers } from '@/types/menu';
import { selectSimpleItemQuantityById } from '@/store/cart/cart.selectors';

interface MenuItemCardProps {
  item: MenuItemWithModifiers;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const addItem = useCartStore((state) => state.addItem);
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

  const quantityById = selectSimpleItemQuantityById(item.id);

  const quantity = useCartStore(quantityById);

  const updateSimpleItemQuantity = useCartStore((state) => state.updateSimpleItemQuantity);

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
            <QuantitySelector
              value={quantity}
              onChange={(newQuantity) => updateSimpleItemQuantity(item, newQuantity)}
              min={0}
            />
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
