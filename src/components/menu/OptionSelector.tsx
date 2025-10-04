import { ModifierGroup } from '@/data/menuWithModifiers';

interface OptionSelectorProps {
  groups: ModifierGroup[];
  value: Record<string, string[]>; // groupId -> optionId[]（多选用数组）
  onChange: (newValue: Record<string, string[]>) => void;
}

export function OptionSelector({ groups, value, onChange }: OptionSelectorProps) {
  // 切换单选
  const handleSingleChange = (groupId: string, optionId: string) => {
    onChange({ ...value, [groupId]: [optionId] });
  };

  // 切换多选
  const handleMultiChange = (groupId: string, optionId: string) => {
    const prev = value[groupId] || [];
    const exists = prev.includes(optionId);
    const newOptions = exists ? prev.filter((id) => id !== optionId) : [...prev, optionId];
    onChange({ ...value, [groupId]: newOptions });
  };

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.id}>
          <p className="mb-2 font-medium">
            {group.name}
            {group.isRequired && <span className="ml-1 text-red-500">*</span>}
          </p>

          <div className="flex flex-wrap gap-2">
            {group.options.map((opt) => {
              const selected = value[group.id]?.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() =>
                    group.selectionType === 'single'
                      ? handleSingleChange(group.id, opt.id)
                      : handleMultiChange(group.id, opt.id)
                  }
                  className={`rounded border px-3 py-1 ${
                    selected
                      ? 'bg-primary border-primary text-white'
                      : 'border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  {opt.name}
                  {opt.priceDelta !== 0 && (
                    <span className="ml-1 text-sm text-gray-500">
                      {opt.priceDelta > 0 ? `+${opt.priceDelta}` : opt.priceDelta}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
