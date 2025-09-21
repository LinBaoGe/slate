import { NextRequest, NextResponse } from 'next/server';
import { MOCK_MENU_DATA } from '@/data/menu';
import { supabaseServerClient } from '@/utils/supabase/server'; // 我们暂时还用模拟数据

export async function GET(req: NextRequest) {
  console.log(req);
  const { searchParams } = new URL(req.url);
  const restaurantId = searchParams.get('restaurant_id');
  console.log('server restaurantId', restaurantId);

  const supabaseServer = await supabaseServerClient();

  const { data: menuItems, error: menuError } = await supabaseServer
    .from('menu_items')
    .select('*')
    .eq('restaurant_id', restaurantId);

  if (menuError) {
    return NextResponse.json({ error: menuError.message }, { status: 500 });
  }

  console.log('menuItems', menuItems);
  return NextResponse.json(menuItems);
}
