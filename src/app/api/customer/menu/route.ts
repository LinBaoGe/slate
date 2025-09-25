import { NextRequest, NextResponse } from 'next/server';
import { supabaseServerClient } from '@/utils/supabase/server';
import { MenuItemCamel } from '@/types/schemas/menu';
import { convertToCamelCase } from '@/utils/utils';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const restaurantId = searchParams.get('restaurant_id');
  const supabaseServer = await supabaseServerClient();

  const { data: menuItems, error: menuError } = await supabaseServer
    .from('menu_items')
    .select('*')
    .eq('restaurant_id', restaurantId);

  if (menuError) {
    return NextResponse.json({ error: menuError.message }, { status: 500 });
  }

  const parsed = MenuItemCamel.array().safeParse(convertToCamelCase(menuItems));

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid data from DB' },
      { status: 500 },
    );
  }

  return NextResponse.json(parsed.data); // 类型安全 + 校验
}
