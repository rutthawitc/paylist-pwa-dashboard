'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './column-header';
import { formatDate } from '@/lib/helper-fnc';

// Define a custom column type
export type PayList = {
  id: number;
  doc_no: string;
  trans_type: string;
  due_date: string;
  recipient: string;
  amount: string;
  upload_at: Date;
  area: string;
};

export const columns: ColumnDef<PayList>[] = [
  {
    accessorKey: 'trans_type',
    header: 'วิธีจ่าย',
    size: 100,
    minSize: 100,
    maxSize: 150,
    enableHiding: false,
  },
  {
    accessorKey: 'doc_no',
    header: 'คีย์ธนาคาร',
    size: 120,
    minSize: 100,
    maxSize: 150,
    enableHiding: false,
  },
  {
    accessorKey: 'due_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='กำหนดชำระ' />
    ),
    cell: ({ row }) => {
      return <div className='text-left'>{row.getValue('due_date')}</div>;
    },
    size: 120,
    minSize: 100,
    maxSize: 150,
    enableHiding: false,
  },
  {
    accessorKey: 'recipient',
    header: 'ชื่อผู้รับเงิน',
    size: 250,
    minSize: 200,
    maxSize: 300,
    enableHiding: false,
  },
  {
    accessorKey: 'amount',
    header: () => <div className='text-right'>รวมจ่ายสุทธิ</div>,
    cell: ({ row }) => {
      return <div className='text-right font-mono'>{row.getValue('amount')}</div>;
    },
    size: 150,
    minSize: 120,
    maxSize: 180,
    enableHiding: false,
  },
  {
    accessorKey: 'area',
    header: 'เขต',
    size: 80,
    minSize: 60,
    maxSize: 100,
    enableHiding: true,
    meta: {
      isHiddenOnMobile: true,
    },
  },
];
