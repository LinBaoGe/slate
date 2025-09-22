import { z } from 'zod';
import { convertToCamelCase } from '@/utils/utils';

export const MenuItemSnake = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  image_url: z.string(),
});

export const MenuItemCamel = MenuItemSnake.transform((data) =>
  convertToCamelCase(data),
);

export type MenuItem = z.infer<typeof MenuItemCamel>;
