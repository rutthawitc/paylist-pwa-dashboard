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
    accessorKey: 'doc_no',
    header: 'เลขที่เช็ค',
    size: 100,
    minSize: 100,
    maxSize: 120,
    enableHiding: true,
    meta: {
      isHiddenOnMobile: true,
    },
  },
  {
    accessorKey: 'trans_type',
    header: 'ชนิดการโอน',
    enableHiding: true,
    meta: {
      isHiddenOnMobile: true,
    },
  },
  {
    accessorKey: 'due_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='วันที่กำหนดจ่าย' />
    ),
    cell: ({ row }) => {
      return <div className='text-left ml-5'>{row.getValue('due_date')}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: 'recipient',
    header: 'ผู้รับ',
    enableHiding: false,
  },
  {
    accessorKey: 'amount',
    header: () => <div className='text-center'>จำนวนเงิน (บาท)</div>,
    cell: ({ row }) => {
      return <div className='text-right ml-5'>{row.getValue('amount')}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: 'upload_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='วันที่นำเข้าข้อมูล' />
    ),
    cell: ({ row }) => {
      const date: string = row.getValue('upload_at');
      return <div className='text-center'>{formatDate(date)}</div>;
    },
    enableHiding: true,
    meta: {
      isHiddenOnMobile: true,
    },
  },
  {
    accessorKey: 'area',
    header: 'เขต',
    enableHiding: true,
    meta: {
      isHiddenOnMobile: true,
    },
  },
];
