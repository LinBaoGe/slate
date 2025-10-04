'use client';

import { useMemo, useState } from 'react';
import { OptionSelector } from '@/components/menu/OptionSelector';
import { QuantitySelector } from '@/components/menu/QuantitySelector';
import { Button } from '@/components/ui/button';
import { ModifierGroup } from '@/types/menu';

export interface SelectionResult {
  selectedOptions: Record<string, string[]>;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface ModifierSelectorProps {
  modifierGroup: Array<ModifierGroup>;
  basePrice: number;
  onConfirm: (result: SelectionResult) => void; // 用于“汇报”结果
}

function calcOptionDelta(value: Record<string, string[]>, groups: ModifierGroup[]) {
  let sum = 0;
  for (const g of groups) {
    const chosen = value[g.id] ?? [];
    const map = new Map(g.options.map((o) => [o.id, o.priceDelta]));
    for (const id of chosen) sum += map.get(id) ?? 0;
  }
  return sum;
}

function requiredFilled(value: Record<string, string[]>, groups: ModifierGroup[]) {
  return groups.filter((g) => g.isRequired).every((g) => (value[g.id]?.length ?? 0) > 0);
}

export default function ModifierSelector(props: ModifierSelectorProps) {
  const { modifierGroup, basePrice, onConfirm } = props;

  const [selected, setSelected] = useState<Record<string, string[]>>(() => {
    const initial: Record<string, string[]> = {};
    modifierGroup.forEach((group) => {
      if (group.isRequired && group.defaultOptionId) {
        initial[group.id] = [group.defaultOptionId];
      }
    });
    return initial;
  });
  const [quantity, setQuantity] = useState(1);

  const optionDelta = useMemo(() => calcOptionDelta(selected, modifierGroup), [selected]);
  const unitPrice = basePrice + optionDelta;
  const totalPrice = unitPrice * quantity;

  const canConfirm = requiredFilled(selected, modifierGroup) && quantity > 0;

  const handleConfirm = () => {
    onConfirm({
      selectedOptions: selected,
      quantity,
      unitPrice,
      totalPrice,
    });
  };

  return (
    <main className="mx-auto max-w-md space-y-6 p-4">
      <h1 className="text-xl font-semibold">汉堡自定义示例</h1>

      <section className="space-y-4">
        <OptionSelector groups={modifierGroup} value={selected} onChange={setSelected} />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">
            单价 = 基础 {basePrice} + 配料 {optionDelta} = <b>{unitPrice}</b>
          </span>
          <QuantitySelector value={quantity} onChange={setQuantity} min={0} />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">合计：</span>
          <span className="text-lg font-bold" data-testid="total">
            ¥ {totalPrice}
          </span>
        </div>
        <Button
          disabled={!canConfirm}
          data-testid="confirm"
          onClick={handleConfirm}
          className="w-full"
        >
          确认加入购物车
        </Button>
      </section>
    </main>
  );
}
