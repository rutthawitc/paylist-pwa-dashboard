'use client';
import { ColumnDef } from '@tanstack/react-table';
import { RecipientSchema } from '@/schemas';
import { formatDate } from '@/lib/helper-fnc';

export const columns: ColumnDef<typeof RecipientSchema>[] = [
  {
    accessorKey: 'short_name',
    header: 'ชื่อที่ถูกตัด/ชื่อย่อ',
  },
  {
    accessorKey: 'full_name',
    header: 'ชื่อเต็ม',
  },
  {
    accessorKey: 'created_at',
    header: 'สร้างเมื่อ',
    cell: ({ row }) => {
      return formatDate(row.getValue('created_at'));
    },
  },
];
