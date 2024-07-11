'use client';
import { ColumnDef } from '@tanstack/react-table';
import { RecipientSchema } from '@/schemas';
import { formatDate } from '@/lib/helper-fnc';
import { deleteRecipient } from '@/actions/delete-recipient';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

//Actions Column
const ActionsCell = ({ row }: any) => {
  const recipient = row.original;
  const router = useRouter();
  const deleteRecipientHandler = async (recipient: any) => {
    const { id } = recipient;
    await deleteRecipient({ id, short_name: '', full_name: '' });
    router.refresh();
  };

  return (
    <div className='flox-row items-start'>
      <Button
        variant='danger'
        size={'sm'}
        onClick={() => deleteRecipientHandler(recipient)}>
        Delete
      </Button>
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
