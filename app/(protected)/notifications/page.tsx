import { auth } from '@/auth';
import { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NotificationClientWrapper from '@/components/protected/notification-client-wrapper';
import NotificationSettingsClient from '@/app/(protected)/notifications/notification-settings-client';

export const metadata: Metadata = {
  title: 'การแจ้งเตือน | Paylist',
  description: 'ส่งข้อความแจ้งเตือนผ่าน Line Notify และ Telegram',
};

export default async function NotificationsPage() {
  const session = await auth();
  const userId = session?.user?.id || undefined;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">การแจ้งเตือน</h2>
        <p className="text-muted-foreground">
          ส่งข้อความแจ้งเตือน และจัดการการตั้งค่าการแจ้งเตือน
        </p>
      </div>

      <Tabs defaultValue="send" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="send">ส่งข้อความ</TabsTrigger>
          <TabsTrigger value="settings">ตั้งค่าการแจ้งเตือน</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="p-0 pt-4">
          <NotificationClientWrapper userId={userId} />
        </TabsContent>

        <TabsContent value="settings" className="p-0 pt-4">
          <NotificationSettingsClient 
            userId={userId} 
            userArea={session?.user?.area || ''} 
            divName={session?.user?.div_name || ''}
            depName={session?.user?.dep_name || ''}
            role={session?.user?.role || ''}
            isAdmin={session?.user?.role === 'admin'}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
