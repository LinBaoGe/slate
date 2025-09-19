// src/app/api/menu/route.ts

import { NextResponse } from 'next/server';
import { MOCK_MENU_DATA } from '@/data/menu'; // 我们暂时还用模拟数据

// 导出 GET 请求的处理函数
export async function GET() {
  // 在真实世界中，你在这里会去查询数据库
  // const menuData = await db.menu.findMany();

  // 现在，我们只是简单地返回模拟数据
  // NextResponse.json 会自动处理 JSON 序列化和正确的 HTTP 头
  return NextResponse.json(MOCK_MENU_DATA);
}
