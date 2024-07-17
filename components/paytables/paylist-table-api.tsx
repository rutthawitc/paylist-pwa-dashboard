'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/paytables/data-table';
import { columns } from '@/components/paytables/columns';

const PaylistTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/paydata');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const payData = await response.json();
        setData(payData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default PaylistTable;
