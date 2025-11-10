//app/audit-logs/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { AuditLogTable } from '@/components/audit/audit-log-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

export default function AuditLogsPage() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  // Filters
  const [filters, setFilters] = useState({
    userId: '',
    resource: '',
    startDate: '',
    endDate: '',
  });

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.userId && { userId: filters.userId }),
        ...(filters.resource && { resource: filters.resource }),
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate }),
      });

      const response = await fetch(`/api/audit-logs?${queryParams}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch logs');
      }

      const data = await response.json();
      setLogs(data.data);
      setPagination((prev) => ({
        ...prev,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
      }));
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('ไม่สามารถดึงข้อมูล Audit Logs ได้');
      }
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  useEffect(() => {
    fetchLogs();
  }, [pagination.page, fetchLogs]);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleFilter = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchLogs();
  };

  const handleReset = () => {
    setFilters({
      userId: '',
      resource: '',
      startDate: '',
      endDate: '',
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className='container mx-auto py-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>ประวัติการใช้งานระบบ</h1>
      </div>

      {/* Filters */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-white'>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>ผู้ใช้งาน</label>
          <Input
            type='text'
            placeholder='รหัสผู้ใช้'
            value={filters.userId}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, userId: e.target.value }))
            }
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>ทรัพยากร</label>
          <Select
            value={filters.resource || 'all'}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                resource: value === 'all' ? '' : value,
              }))
            }>
            <SelectTrigger>
              <SelectValue placeholder='ทั้งหมด' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>ทั้งหมด</SelectItem>
              <SelectItem value='user'>ผู้ใช้งาน</SelectItem>
              <SelectItem value='payment'>การชำระเงิน</SelectItem>
              <SelectItem value='recipient'>ผู้รับเงิน</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>วันที่เริ่มต้น</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !filters.startDate && 'text-muted-foreground'
                )}>
                <CalendarIcon className='mr-2 h-4 w-4' />
                {filters.startDate ? (
                  format(new Date(filters.startDate), 'dd/MM/yyyy', {
                    locale: th,
                  })
                ) : (
                  <span>เลือกวันที่</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={
                  filters.startDate ? new Date(filters.startDate) : undefined
                }
                onSelect={(date) =>
                  setFilters((prev) => ({
                    ...prev,
                    startDate: date ? date.toISOString() : '',
                  }))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>วันที่สิ้นสุด</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !filters.endDate && 'text-muted-foreground'
                )}>
                <CalendarIcon className='mr-2 h-4 w-4' />
                {filters.endDate ? (
                  format(new Date(filters.endDate), 'dd/MM/yyyy', {
                    locale: th,
                  })
                ) : (
                  <span>เลือกวันที่</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={
                  filters.endDate ? new Date(filters.endDate) : undefined
                }
                onSelect={(date) =>
                  setFilters((prev) => ({
                    ...prev,
                    endDate: date ? date.toISOString() : '',
                  }))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className='md:col-span-4 flex justify-end gap-2'>
          <Button variant='outline' onClick={handleReset}>
            ล้างตัวกรอง
          </Button>
          <Button onClick={handleFilter}>ค้นหา</Button>
        </div>
      </div>

      {/* Table */}
      <AuditLogTable
        logs={logs}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
