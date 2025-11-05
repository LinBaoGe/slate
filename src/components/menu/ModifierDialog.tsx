'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ModifierSelector, { SelectionResult } from '@/components/menu/ModifierSelector';
import { ItemToAdd } from '@/store/cart/cart.types';
import { MenuItemWithModifiers } from '@/types/menu';

interface ModifierDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  menuItems: MenuItemWithModifiers;
  onAddToCart: (result: ItemToAdd) => void;
}

export default function ModifierDialog({
  isOpen,
  setIsOpen,
  menuItems,
  onAddToCart,
}: ModifierDialogProps) {
  const { modifierGroups, basePrice } = menuItems;

  if (!menuItems) return null;

  const handleAddToCart = (selectionResult: SelectionResult) => {
    const itemToAdd: ItemToAdd = {
      ...menuItems,
      quantity: selectionResult.quantity,
      selectedOptions: selectionResult.selectedOptions,
      unitPrice: selectionResult.unitPrice,
    };

    setIsOpen(false);

    onAddToCart(itemToAdd);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>title</DialogTitle>
        <DialogHeader>WTF</DialogHeader>
        <div className="py-4">
          <ModifierSelector
            modifierGroup={modifierGroups!}
            basePrice={basePrice}
            onConfirm={handleAddToCart}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
