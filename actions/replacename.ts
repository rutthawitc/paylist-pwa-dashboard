// lib/updateCompanyNames.ts
'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ExcelRow {
  uniqueID: string;
  doc_no: string;
  trans_type: string;
  due_date: string;
  recipient: string;
  amount: string;
}

export async function updateCompanyNames(
  rowsData: ExcelRow[]
): Promise<ExcelRow[]> {
  return await Promise.all(
    rowsData.map(async (row) => {
      if (row.recipient) {
        const companyName = await prisma.companyname.findFirst({
          where: {
            short_name: {
              contains: row.recipient,
              //mode: 'insensitive',
            },
          },
          select: {
            full_name: true,
          },
        });

        if (companyName) {
          return { ...row, recipient: companyName.full_name };
        }
      }
      return row;
    })
  );
}
