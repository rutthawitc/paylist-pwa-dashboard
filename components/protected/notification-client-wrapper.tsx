'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { lineNotify } from '@/lib/linenotify';
import { telegramNotify } from '@/lib/telegramnotify';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getNotificationSettings } from '@/actions/notification-settings';
import { useToast } from '@/hooks/use-toast';

interface NotificationWrapperProps {
  title?: string;
  description?: string;
  userId?: string;
}

export default function NotificationClientWrapper({
  title = 'การแจ้งเตือน',
  description = 'ส่งข้อความแจ้งเตือนไปยัง Line Notify หรือ Telegram Bot',
  userId,
}: NotificationWrapperProps) {
  const [message, setMessage] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('default');
  const [areas, setAreas] = useState<
    { id: string; area: string; description?: string | null }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();

  useEffect(() => {
    const loadAreas = async () => {
      const result = await getNotificationSettings();
      if (result.success && result.data) {
        setAreas(
          result.data.map((item) => ({
            id: item.id,
            area: item.area,
            description: item.description,
          }))
        );
      }
    };

    loadAreas();
  }, []);

  const handleLineNotify = async () => {
    if (!message) return;

    setIsLoading(true);
    try {
      // ส่งข้อความไปที่ server โดยไม่ต้องเพิ่ม URL ที่นี่ เพราะจะถูกเพิ่มที่ server
      const success = await lineNotify({
        message,
        area: selectedArea === 'default' ? undefined : selectedArea,
        userId,
        userArea: session?.user?.area || '',
        includeAreaDetails: true,
      });
      setMessage('');
      if (success) {
        toast({
          title: 'ส่งข้อความสำเร็จ',
          description: 'ส่งแจ้งเตือนผ่าน Line Notify สำเร็จแล้ว',
          variant: 'success'
        });
      } else {
        toast({
          title: 'เกิดข้อผิดพลาด',
          description: 'ไม่สามารถส่งแจ้งเตือนผ่าน Line Notify ได้',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถส่งแจ้งเตือนผ่าน Line Notify ได้',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTelegramNotify = async () => {
    if (!message) return;

    setIsLoading(true);
    try {
      // ส่งข้อความไปที่ server โดยไม่ต้องเพิ่ม URL ที่นี่ เพราะจะถูกเพิ่มที่ server
      console.log(`[NotificationClient] Sending Telegram with userArea: ${session?.user?.area || 'not specified'}`);
      const success = await telegramNotify({
        message,
        userId,
        // ไม่ส่ง area แต่ใช้เพียง userArea
        userArea: session?.user?.area,
        divName: session?.user?.div_name,
        depName: session?.user?.dep_name,
        includeAreaDetails: true, // ส่งเป็น true เสมอเพื่อให้แสดงข้อมูลพื้นที่และหน่วยงาน
      });
      setMessage('');
      if (success) {
        toast({
          title: 'ส่งข้อความสำเร็จ',
          description: 'ส่งแจ้งเตือนผ่าน Telegram สำเร็จแล้ว',
          variant: 'success'
        });
      } else {
        toast({
          title: 'เกิดข้อผิดพลาด',
          description: 'ไม่สามารถส่งแจ้งเตือนผ่าน Telegram ได้',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถส่งแจ้งเตือนผ่าน Telegram ได้',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="line"
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="line">Line Notify</TabsTrigger>
            <TabsTrigger value="telegram">Telegram</TabsTrigger>
          </TabsList>

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">พื้นที่</label>
              <Select
                value={selectedArea}
                onValueChange={setSelectedArea}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกพื้นที่ (หรือเว้นว่างสำหรับค่าเริ่มต้น)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">ค่าเริ่มต้น (Default)</SelectItem>
                  {areas.map((area) => (
                    <SelectItem key={area.id} value={area.area}>
                      {area.area} {area.description ? `- ${area.description}` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">ข้อความ</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="ข้อความที่ต้องการส่ง"
                rows={4}
              />
            </div>
          </div>

          <TabsContent value="line" className="pt-4">
            <div className="flex justify-end">
              <Button
                onClick={handleLineNotify}
                disabled={!message || isLoading}
              >
                {isLoading ? 'กำลังส่ง...' : 'ส่งข้อความผ่าน Line'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="telegram" className="pt-4">
            <div className="flex justify-end">
              <Button
                onClick={handleTelegramNotify}
                disabled={!message || isLoading}
              >
                {isLoading ? 'กำลังส่ง...' : 'ส่งข้อความผ่าน Telegram'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
