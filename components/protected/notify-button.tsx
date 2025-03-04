'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { lineNotify } from '@/lib/linenotify'; 
import { useSession } from 'next-auth/react';
import { sendTelegramNotification } from '@/actions/telegram';

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
  area?: string;
}

interface TelegramNotifyButtonProps {
  messageCount: number;
  onNotificationResult: (result: { success?: string; error?: string }) => void;
  area?: string;
}

export function LineNotifyButton({
  messageCount,
  onNotificationResult,
  area,
}: LineNotifyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const notifyDate = formatThaiDate(new Date());

  const handleNotify = async () => {
    if (messageCount === 0) {
      const result = { error: 'ไม่มีข้อมูล' };
      onNotificationResult(result);
      return result;
    }
    setIsLoading(true);
    try {
      console.log(`[LineButton] Session user data:`, {
        userArea: session?.user?.area,
        divName: session?.user?.div_name,
        depName: session?.user?.dep_name
      });
      console.log(`[LineButton] Sending notification with userArea: ${session?.user?.area || 'not specified'}`);
      
      // ตรวจสอบและตั้งค่าเริ่มต้น
      const divName = session?.user?.div_name || "";
      const depName = session?.user?.dep_name || "";
      
      const success = await lineNotify({
        message: `ประจำวันที่ ${notifyDate} มีจำนวน ${messageCount.toString()} รายการ`,
        area,
        userId,
        userArea: session?.user?.area || '',
        divName,
        depName,
        includeAreaDetails: true,
      });
      
      if (success) {
        const result = { success: 'ส่งการแจ้งเตือนสำเร็จ' };
        onNotificationResult(result);
        return result;
      } else {
        throw new Error('Failed to send notification');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งการแจ้งเตือน:', error);
      const result = { error: 'เกิดข้อผิดพลาดในการส่งการแจ้งเตือน' };
      onNotificationResult(result);
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

export function TelegramNotifyButton({
  messageCount,
  onNotificationResult,
  area,
}: TelegramNotifyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const notifyDate = formatThaiDate(new Date());

  const handleNotify = async () => {
    if (messageCount === 0) {
      const result = { error: 'ไม่มีข้อมูล' };
      onNotificationResult(result);
      return result;
    }
    
    setIsLoading(true);
    try {
      console.log(`[TelegramButton] Session user data:`, {
        userArea: session?.user?.area,
        divName: session?.user?.div_name,
        depName: session?.user?.dep_name
      });
      console.log(`[TelegramButton] Sending notification with userArea: ${session?.user?.area || 'not specified'}`);
      
      // ตรวจสอบและตั้งค่าเริ่มต้น
      const divName = session?.user?.div_name || "";
      const depName = session?.user?.dep_name || "";
      
      const result = await sendTelegramNotification({
        message: `ประจำวันที่ ${notifyDate} มีจำนวน ${messageCount.toString()} รายการ`,
        // ไม่ส่ง area ที่ไม่ตรงกับ DB แต่ใช้ค่า userArea จาก session แทน
        userId,
        userArea: session?.user?.area,
        divName,
        depName,
        includeAreaDetails: true,
      });

      if (result.success) {
        const successResult = { success: 'ส่งการแจ้งเตือน Telegram สำเร็จ' };
        onNotificationResult(successResult);
        return successResult;
      } else {
        throw new Error(result.message || 'Failed to send notification');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งการแจ้งเตือน Telegram:', error);
      const errorResult = { error: 'เกิดข้อผิดพลาดในการส่งการแจ้งเตือน Telegram' };
      onNotificationResult(errorResult);
      return errorResult;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleNotify} disabled={isLoading} className='mt-4 ml-2' variant="outline">
      {isLoading ? 'กำลังส่ง...' : 'ส่งการแจ้งเตือน Telegram'}
    </Button>
  );
}
