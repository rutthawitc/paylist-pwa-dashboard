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
};

export const columns: ColumnDef<PayList>[] = [
  /*   {
    accessorKey: 'id',
    header: 'id',
  }, */
  {
    accessorKey: 'doc_no',
    header: 'หมายเลขเอกสาร',
    size: 100,
    minSize: 100,
    maxSize: 120,
  },
  {
    accessorKey: 'trans_type',
    header: 'ชนิดการโอน',
  },
  {
    accessorKey: 'due_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='วันที่กำหนดจ่าย' />
    ),

    cell: ({ row }) => {
      return <div className='text-left ml-5'>{row.getValue('due_date')}</div>;
    },
  },
  {
    accessorKey: 'recipient',
    header: 'ผู้รับ',
  },
  {
    accessorKey: 'amount',
    header: () => <div className='text-right'>จำนวนเงิน</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
      }).format(amount);

      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'upload_at',
    //header: 'วันที่นำเข้าข้อมูล',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='วันที่นำเข้าข้อมูล' />
    ),
    cell: ({ row }) => {
      const date: string = row.getValue('upload_at');
      return <div className='text-center'>{formatDate(date)}</div>;
    },
  },
];
