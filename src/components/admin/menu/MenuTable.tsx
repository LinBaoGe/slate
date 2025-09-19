'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MenuItem } from '@/data/menu'; // 复用类型

// 1. 定义表格的列
export const columns: ColumnDef<MenuItem>[] = [
  { accessorKey: 'name', header: '菜品名称' },
  { accessorKey: 'description', header: '描述' },
  {
    accessorKey: 'price',
    header: '价格',
    cell: ({ row }) => `¥${row.original.price.toFixed(2)}`,
  },
  { accessorKey: 'category', header: '分类' },
  // 稍后我们会在这里添加一个“操作”列
];

interface MenuTableProps {
  data: MenuItem[];
}

export default function MenuTable({ data }: MenuTableProps) {
  // 2. 初始化 TanStack Table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                您的菜单还是空的，快添加第一个菜品吧！
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
