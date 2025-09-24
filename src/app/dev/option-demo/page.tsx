'use client';

import { useMemo, useState } from 'react';
import { OptionSelector } from '@/components/menu/OptionSelector';
import { QuantitySelector } from '@/components/menu/QuantitySelector';
import type { OptionGroup } from '@/types/menu';
import { Button } from '@/components/ui/button';

const groups: OptionGroup[] = [
  {
    id: 'sauce',
    name: '酱料',
    type: 'single',
    required: true,
    options: [
      { id: 'salad', name: '沙拉酱', priceDelta: 0 },
      { id: 'spicy', name: '辣酱', priceDelta: 1 },
    ],
  },
  {
    id: 'veggie',
    name: '配菜',
    type: 'multi',
    required: true,
    options: [
      { id: 'lettuce', name: '生菜', priceDelta: 0 },
      { id: 'spinach', name: '菠菜', priceDelta: 2 },
      { id: 'onion', name: '洋葱', priceDelta: 1 },
    ],
  },
];

const basePrice = 20;

const initSelected = {
  sauce: ['spicy'],
  veggie: ['spinach'],
};

function calcOptionDelta(
  value: Record<string, string[]>,
  groups: OptionGroup[],
) {
  let sum = 0;
  for (const g of groups) {
    const chosen = value[g.id] ?? [];
    const map = new Map(g.options.map((o) => [o.id, o.priceDelta]));
    for (const id of chosen) sum += map.get(id) ?? 0;
  }
  return sum;
}

function requiredFilled(
  value: Record<string, string[]>,
  groups: OptionGroup[],
) {
  return groups
    .filter((g) => g.required)
    .every((g) => (value[g.id]?.length ?? 0) > 0);
}

export default function OptionDemoPage() {
  const [selected, setSelected] =
    useState<Record<string, string[]>>(initSelected);
  const [qty, setQty] = useState(1);

  const optionDelta = useMemo(
    () => calcOptionDelta(selected, groups),
    [selected],
  );
  const unitPrice = basePrice + optionDelta;
  const total = unitPrice * qty;

  const canConfirm = requiredFilled(selected, groups) && qty > 0;

  return (
    <main className="mx-auto max-w-md space-y-6 p-4">
      <h1 className="text-xl font-semibold">汉堡自定义示例</h1>

      <section className="space-y-4">
        <OptionSelector
          groups={groups}
          value={selected}
          onChange={setSelected}
        />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">
            单价 = 基础 {basePrice} + 配料 {optionDelta} = <b>{unitPrice}</b>
          </span>
          <QuantitySelector value={qty} onChange={setQty} min={0} />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">合计：</span>
          <span className="text-lg font-bold" data-testid="total">
            ¥ {total}
          </span>
        </div>
        <Button
          disabled={!canConfirm}
          data-testid="confirm"
          onClick={() =>
            alert(`下单成功！配置=${JSON.stringify(selected)} 数量=${qty}`)
          }
          className="w-full"
        >
          确认加入购物车
        </Button>
      </section>

      <section className="bg-muted/50 rounded-lg p-3">
        <div className="text-muted-foreground mb-1 text-xs">当前选中：</div>
        <pre className="text-xs whitespace-pre-wrap">
          {JSON.stringify(selected, null, 2)}
        </pre>
      </section>
    </main>
  );
}
