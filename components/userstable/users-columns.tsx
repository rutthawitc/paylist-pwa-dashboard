'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

import { UserSchema } from '@/schemas';
import { setStatus } from '@/actions/set-status';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/actions/delete-user';

//Actions Column
const ActionsCell = ({ row }: any) => {
  const user = row.original;
  const router = useRouter();
  const toggleStatus = async (user: any) => {
    const { id, status } = user;
    await setStatus({
      id,
      status: status === 'active' ? 'inactive' : 'active',
      name: '',
      role: '',
    });
    router.refresh();
  };

  const deleteUserHandler = async (user: any) => {
    const { id } = user;
    await deleteUser({ id, name: '', role: '', status: '' });
    router.refresh();
  };

  return (
    <div className='flox-row items-start'>
      <Button variant='ghost' size={'sm'} onClick={() => toggleStatus(user)}>
        Toggle Status
      </Button>
      <span>
        <Button
          variant='danger'
          size={'sm'}
          onClick={() => deleteUserHandler(user)}>
          Delete
        </Button>
      </span>
    </div>
  );
};

export const columns: ColumnDef<typeof UserSchema>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: () => <div className='text-left'>Employee ID</div>,
  },
  {
    accessorKey: 'role',
    header: () => <div className='text-left'>Role</div>,
    cell: ({ row }) => {
      const str: string = row.getValue('role');
      const modStr = str.charAt(0).toUpperCase() + str.slice(1);
      return <div className='text-left'>{modStr}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: () => <div className='text-left'>Status</div>,
    cell: ({ row }) => {
      const str: string = row.getValue('status');
      const modStr = str.charAt(0).toUpperCase() + str.slice(1);
      const bgColor =
        modStr === 'Active'
          ? 'bg-green-200'
          : modStr === 'Inactive'
          ? 'bg-red-200'
          : '';
      return (
        <div className={`text-left px-1 py-1 rounded ${bgColor}`}>{modStr}</div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className='text-left'>Actions</div>,
    cell: (user) => <ActionsCell {...user} />,
  },
];
