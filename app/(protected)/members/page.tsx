import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { columns } from '@/components/userstable/users-columns';
import { DataTable } from '@/components/userstable/data-table';
import { getAllUsers } from '@/lib/user';
import AddMemberForm from '@/components/auth/addmember-form';

const MembersPage = async () => {
  const session = await auth();
  if (session?.user?.role !== 'admin') {
    redirect('/auth/login');
  }
  const data: any = await getAllUsers();
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-2 lg:p-4'>
      <div className='flex items-center'>
        <h1 className='text-xs font-semibold md:text-2xl'>
          Member Management.
        </h1>
      </div>
      <DataTable columns={columns} data={data} />
      <div
        className='p-4 rounded-lg border border-dashed shadow-sm'
        x-chunk='dashboard-02-chunk-1'>
        <h3 className='text-xl font-bold tracking-tight pb-2'>Add Member</h3>
        <AddMemberForm />
      </div>
    </main>
  );
};

export default MembersPage;
