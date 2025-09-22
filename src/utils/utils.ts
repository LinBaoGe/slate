import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import camelcaseKeys from 'camelcase-keys';

// 限制 T 为普通对象或数组，避免使用 any
export function convertToCamelCase<
  T extends Record<string, unknown> | Array<unknown>,
>(obj: T): T {
  return camelcaseKeys(obj, { deep: true }) as T; // 使用类型断言确保返回值符合 T 类型
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function toCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, g1) => g1.toUpperCase());
}

export function keysToCamel<T>(obj: unknown): T {
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToCamel<T>(v)) as unknown as T;
  } else if (obj !== null && typeof obj === 'object') {
    const newObj: Record<string, unknown> = {};
    for (const key of Object.keys(obj)) {
      const camel = toCamel(key);
      newObj[camel] = keysToCamel((obj as Record<string, unknown>)[key]);
    }
    return newObj as unknown as T;
  }
  return obj as T;
}
