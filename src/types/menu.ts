// 单个选项（如 沙拉酱、加辣酱、生菜）
export interface Option {
  id: string;
  name: string;
  priceDelta: number;
}

// 选项组（如 酱料、配菜）
export interface OptionGroup {
  id: string;
  name: string;
  type: 'single' | 'multi'; // 单选 / 多选
  required: boolean;
  options: Option[];
}
