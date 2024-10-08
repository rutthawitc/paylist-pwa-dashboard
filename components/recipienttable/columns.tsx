'use client';
import { ColumnDef } from '@tanstack/react-table';
import { RecipientSchema } from '@/schemas';
import { formatDate } from '@/lib/helper-fnc';
import { deleteRecipient } from '@/actions/delete-recipient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

//Actions Column
const ActionsCell = ({ row }: any) => {
  const recipient = row.original;
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const deleteRecipientHandler = async (recipient: any) => {
    const { id } = recipient;
    await deleteRecipient({ id, short_name: '', full_name: '' });
    setIsDialogOpen(false);
    router.refresh();
  };

  return (
    <div className='flox-row items-start'>
      {/*       <Button
        variant='danger'
        size={'sm'}
        onClick={() => deleteRecipientHandler(recipient)}>
        Delete
      </Button> */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant='danger' size={'sm'}>
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ยืนยันการลบผู้ใช้</DialogTitle>
            <DialogDescription>
              คุณแน่ใจหรือไม่ที่จะลบผู้รับ : {recipient.short_name}{' '}
              การกระทำนี้ไม่สามารถยกเลิกได้
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsDialogOpen(false)}>
              ยกเลิก
            </Button>
            <Button
              variant='danger'
              onClick={() => deleteRecipientHandler(recipient)}>
              ลบ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

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
  {
    id: 'actions',
    header: () => <div className='text-left'>Actions</div>,
    cell: (recipient) => <ActionsCell {...recipient} />,
  },
];
