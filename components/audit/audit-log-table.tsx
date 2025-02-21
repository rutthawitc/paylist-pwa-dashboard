//components/audit/audit-log-table.tsx
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

interface AuditLogTableProps {
  logs: any[];
  loading?: boolean;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

export function AuditLogTable({
  logs,
  loading = false,
  pagination,
  onPageChange,
}: AuditLogTableProps) {
  if (loading) {
    return (
      <div className="w-full text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <div className="mt-2">กำลังโหลด...</div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='rounded-md border overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-4 py-2 text-left font-medium'>วันที่-เวลา</th>
              <th className='px-4 py-2 text-left font-medium'>ผู้ใช้งาน</th>
              <th className='px-4 py-2 text-left font-medium'>การกระทำ</th>
              <th className='px-4 py-2 text-left font-medium'>ทรัพยากร</th>
              <th className='px-4 py-2 text-left font-medium'>รายละเอียด</th>
              <th className='px-4 py-2 text-left font-medium'>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className='border-t hover:bg-gray-50'>
                <td className='px-4 py-2'>
                  {format(new Date(log.createdAt), 'dd MMM yyyy HH:mm:ss', {
                    locale: th,
                  })}
                </td>
                <td className='px-4 py-2'>{log.userId}</td>
                <td className='px-4 py-2'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getActionColor(
                      log.action
                    )}`}>
                    {log.action}
                  </span>
                </td>
                <td className='px-4 py-2'>{log.resource}</td>
                <td className='px-4 py-2 max-w-xs truncate'>
                  {log.details ? JSON.stringify(log.details) : '-'}
                </td>
                <td className='px-4 py-2'>{log.ipAddress || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex items-center justify-center space-x-2'>
        <button
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
          className='px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50'>
          ก่อนหน้า
        </button>

        {[...Array(pagination.totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 rounded border ${
              pagination.page === i + 1
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-50'
            }`}>
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={pagination.page === pagination.totalPages}
          className='px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50'>
          ถัดไป
        </button>
      </div>
    </div>
  );
}

function getActionColor(action: string) {
  switch (action) {
    case 'CREATE':
      return 'bg-green-100 text-green-800';
    case 'UPDATE':
      return 'bg-blue-100 text-blue-800';
    case 'DELETE':
      return 'bg-red-100 text-red-800';
    case 'LOGIN':
      return 'bg-purple-100 text-purple-800';
    case 'LOGOUT':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
