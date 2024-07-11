//import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import { AddUserForm } from '@/components/auth/adduser-form';

const AddUserPage = async () => {
  /*   const session = await auth();
  if (session?.user?.role !== 'admin') {
    redirect('/auth/login');
  } */
  return <AddUserForm />;
};

export default AddUserPage;
