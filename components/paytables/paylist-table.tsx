import { DataTable } from '@/components/paytables/data-table';
import { columns, PayList } from '@/components/paytables/columns';

import { getPayData } from '@/lib/data';

const PaylistTable = async () => {
  const data: any = await getPayData();
  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default PaylistTable;
