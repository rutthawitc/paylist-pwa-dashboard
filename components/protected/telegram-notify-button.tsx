'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { telegramNotify } from '@/lib/telegramnotify';
import { useSession } from 'next-auth/react';

import dayjs from 'dayjs';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';

dayjs.extend(buddhistEra);
dayjs.locale('th');

function formatThaiDate(date: Date | string): string {
  return dayjs(date).format('D MMMM พ.ศ. BBBB');
}

interface TelegramNotifyButtonProps {
  messageCount: number;
  onNotificationResult: (result: { success?: string; error?: string }) => void;
  area?: string;
  disabled?: boolean;
}

export function TelegramNotifyButton({
  messageCount,
  onNotificationResult,
  area,
  disabled,
}: TelegramNotifyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const notifyDate = formatThaiDate(new Date());

  const noti_message = `แจ้งเตือนการจ่ายเงิน ประจำวันที่ ${notifyDate} มีจำนวน ${messageCount.toString()} รายการ

กรุณาตรวจสอบในระบบ http://110.76.155.100:10002/`;

  const handleNotify = async () => {
    if (messageCount === 0) {
      const result = { error: 'ไม่มีข้อมูล' };
      onNotificationResult(result);
      return result;
    }

    setIsLoading(true);

    try {
      console.log('Sending Telegram notification with area:', area);

      const success = await telegramNotify({
        message: noti_message,
        userId,
        area,
      });

      console.log('Telegram notification result:', success);

      if (success) {
        const result = { success: 'ส่งข้อความผ่าน Telegram สำเร็จแล้ว' };
        onNotificationResult(result);
        return result;
      } else {
        const result = { error: 'ไม่สามารถส่งข้อความผ่าน Telegram ได้' };
        onNotificationResult(result);
        return result;
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งการแจ้งเตือน Telegram:', error);
      const errorMsg =
        error instanceof Error
          ? `เกิดข้อผิดพลาดในการส่งการแจ้งเตือน Telegram: ${error.message}`
          : 'เกิดข้อผิดพลาดในการส่งการแจ้งเตือน Telegram';

      const result = { error: errorMsg };
      onNotificationResult(result);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleNotify}
      disabled={isLoading || disabled}
      variant='default'
      className='mt-4'>
      {isLoading ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          กำลังส่งข้อความ...
        </>
      ) : (
        `ส่งข้อความผ่าน Telegram${
          session?.user?.area ? ` เขต ${session?.user?.area}` : ''
        }`
      )}
    </Button>
  );
}
