import { CircleMinus, CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuantitySelectorProps {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  value,
  onChange,
  min = 0,
  max = Infinity,
}: QuantitySelectorProps) {
  const handleAdd = () => {
    if (value < max) onChange(value + 1);
  };

  const handleRemove = () => {
    if (value > min) onChange(value - 1);
  };

  if (value === 0) {
    return (
      <Button size="icon" onClick={handleAdd}>
        <CirclePlus className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button size="icon" variant="outline" onClick={handleRemove}>
        <CircleMinus className="h-4 w-4" />
      </Button>
      <span className="w-6 text-center">{value}</span>
      <Button size="icon" onClick={handleAdd}>
        <CirclePlus className="h-4 w-4" />
      </Button>
    </div>
  );
}
