'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { lineNotifyHandler } from '@/lib/linenotify'; // ปรับ path ตามโครงสร้างโปรเจคของคุณ

import dayjs from 'dayjs';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';

dayjs.extend(buddhistEra);
dayjs.locale('th');
function formatThaiDate(date: Date | string): string {
  return dayjs(date).format('D MMMM พ.ศ. BBBB');
}

interface LineNotifyButtonProps {
  messageCount: number;
  onNotificationResult: (result: { success?: string; error?: string }) => void;
}

export function LineNotifyButton({
  messageCount,
  onNotificationResult,
}: LineNotifyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const notifyDate = formatThaiDate(new Date());

  const noti_message = `แจ้งเตือนการจ่ายเงิน กปภ.ข.๖ ประจำวันที่ ${notifyDate} มีจำนวน ${messageCount.toString()} รายการ

กรุณาตรวจสอบในระบบ http://110.76.155.100:10002/`;

  const handleNotify = async () => {
    if (messageCount === 0) {
      const result = { error: 'ไม่มีข้อมูล' };
      onNotificationResult(result);
      return result;
    }
    setIsLoading(true);
    try {
      await lineNotifyHandler(noti_message);
      const result = { success: 'ส่งการแจ้งเตือนสำเร็จ' };
      onNotificationResult(result);
      //alert(result.success);
      return result;
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งการแจ้งเตือน:', error);
      const result = { error: 'เกิดข้อผิดพลาดในการส่งการแจ้งเตือน' };
      onNotificationResult(result);
      //alert(result.error);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleNotify} disabled={isLoading} className='mt-4'>
      {isLoading ? 'กำลังส่ง...' : 'ส่งการแจ้งเตือน Line'}
    </Button>
  );
}
