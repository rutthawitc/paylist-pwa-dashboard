'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

import { UserSchema } from '@/schemas';
import { setStatus } from '@/actions/set-status';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/actions/delete-user';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
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
  const user = row.original;
  const router = useRouter();
  const [isActive, setIsActive] = useState(user.status === 'active');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleStatus = async (checked: boolean) => {
    const newStatus = checked ? 'active' : 'inactive';
    await setStatus({
      id: user.id,
      status: newStatus,
      name: '',
      role: '',
    });
    setIsActive(checked);
    router.refresh();
  };

  const deleteUserHandler = async () => {
    await deleteUser({ id: user.id, name: '', role: '', status: '' });
    setIsDialogOpen(false);
    router.refresh();
  };

  return (
    <div className='flex items-center space-x-4'>
      <div className='flex items-center space-x-2'>
        <Switch checked={isActive} onCheckedChange={toggleStatus} />
        <span>Status</span>
      </div>
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
              คุณแน่ใจหรือไม่ที่จะลบผู้ใช้รหัส : {user.name}{' '}
              การกระทำนี้ไม่สามารถยกเลิกได้
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsDialogOpen(false)}>
              ยกเลิก
            </Button>
            <Button variant='danger' onClick={deleteUserHandler}>
              ลบ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
