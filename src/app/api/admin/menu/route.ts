import { supabaseServerClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseServer = await supabaseServerClient();

  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Make sure only return one record.
  const { data: restaurant, error: restaurantError } = await supabaseServer
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single();

  if (restaurantError || !restaurant) {
    return NextResponse.json(
      { error: 'Restaurant not found' },
      { status: 404 },
    );
  }

  const { data: menuItems, error: menuError } = await supabaseServer
    .from('menu_items')
    .select('*')
    .eq('restaurant_id', restaurant.id);

  if (menuError) {
    return NextResponse.json({ error: menuError.message }, { status: 500 });
  }

  return NextResponse.json(menuItems);
}
