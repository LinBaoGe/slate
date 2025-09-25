import { z } from 'zod';

export const MenuItemSnake = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  image_url: z.string(),
});

export const MenuItemCamel = z.object({
  // transform()怎么用
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  imageUrl: z.string(),
});

export type MenuItem = z.infer<typeof MenuItemCamel>;
