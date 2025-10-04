'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ModifierSelector, { SelectionResult } from '@/components/menu/ModifierSelector';
import { ItemToAdd } from '@/types/store/cart';
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
      // 从 props.item (我们将其重命名为了 menuItems) 继承所有主菜品信息
      ...menuItems,
      // 覆盖/添加从 selectionResult 来的信息
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
          <p>这里将是所有配菜选项 (Modifier Groups) 的渲染区域。</p>
          <p>我们会在这里使用单选框、复选框等组件。</p>
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
