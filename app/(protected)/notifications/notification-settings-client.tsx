'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  getNotificationSettings,
  createNotificationSetting,
  updateNotificationSetting,
  deleteNotificationSetting,
} from '@/actions/notification-settings';
import { Loader2, PenIcon, Trash2Icon } from 'lucide-react';

interface NotificationSetting {
  id: string;
  area: string;
  userArea: string | null;
  divName: string | null;
  depName: string | null;
  description: string | null;
  lineToken: string | null;
  telegramBotToken: string | null;
  telegramChatId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string | null;
  updatedBy: string | null;
}

interface NotificationSettingsClientProps {
  userId?: string;
  userArea?: string;
  divName?: string;
  depName?: string;
}

export default function NotificationSettingsClient({
  userId,
  userArea = '',
  divName = '',
  depName = '',
}: NotificationSettingsClientProps) {
  const { toast } = useToast();
  const [settings, setSettings] = useState<NotificationSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Form state for creating/editing
  const [formData, setFormData] = useState({
    id: '',
    area: '',
    userArea: userArea,
    divName: divName,
    depName: depName,
    description: '',
    lineToken: '',
    telegramBotToken: '',
    telegramChatId: '',
    isActive: true,
  });

  // Load settings
  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getNotificationSettings();
      if (result.success && result.data) {
        setSettings(result.data);
      } else {
        toast({
          title: 'เกิดข้อผิดพลาด',
          description: result.error || 'ไม่สามารถโหลดการตั้งค่าการแจ้งเตือนได้',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถโหลดการตั้งค่าการแจ้งเตือนได้',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ตัด toast ออกจาก dependency เพื่อไม่ให้ function ถูกสร้างใหม่เมื่อ toast เปลี่ยน

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Reset form
  const resetForm = () => {
    setFormData({
      id: '',
      area: '',
      userArea: userArea,
      divName: divName,
      depName: depName,
      description: '',
      lineToken: '',
      telegramBotToken: '',
      telegramChatId: '',
      isActive: true,
    });
    setIsEditing(false);
  };

  // Open dialog for creating
  const handleCreateClick = () => {
    resetForm();
    setDialogOpen(true);
  };

  // Open dialog for editing
  const handleEditClick = (setting: NotificationSetting) => {
    setFormData({
      id: setting.id,
      area: setting.area,
      userArea: userArea,
      divName: divName,
      depName: depName,
      description: setting.description || '',
      lineToken: setting.lineToken || '',
      telegramBotToken: setting.telegramBotToken || '',
      telegramChatId: setting.telegramChatId || '',
      isActive: setting.isActive,
    });
    setIsEditing(true);
    setDialogOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let result;

      if (isEditing) {
        result = await updateNotificationSetting({
          id: formData.id,
          area: formData.area,
          userArea: formData.userArea,
          divName: formData.divName,
          depName: formData.depName,
          description: formData.description || undefined,
          lineToken: formData.lineToken || undefined,
          telegramBotToken: formData.telegramBotToken || undefined,
          telegramChatId: formData.telegramChatId || undefined,
          isActive: formData.isActive,
          userId,
        });
      } else {
        result = await createNotificationSetting({
          area: formData.area,
          userArea: formData.userArea,
          divName: formData.divName,
          depName: formData.depName,
          description: formData.description || undefined,
          lineToken: formData.lineToken || undefined,
          telegramBotToken: formData.telegramBotToken || undefined,
          telegramChatId: formData.telegramChatId || undefined,
          isActive: formData.isActive,
          userId,
        });
      }

      if (result.success) {
        toast({
          title: 'บันทึกสำเร็จ',
          description: result.message || 'ตั้งค่าการแจ้งเตือนสำเร็จแล้ว',
          variant: 'success',
        });
        setDialogOpen(false);
        resetForm();
        loadSettings();
      } else {
        toast({
          title: 'เกิดข้อผิดพลาด',
          description: result.error || 'ไม่สามารถบันทึกการตั้งค่าได้',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error saving notification setting:', error);
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถบันทึกการตั้งค่าได้',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string, area: string) => {
    if (!confirm(`คุณต้องการลบการตั้งค่าสำหรับพื้นที่ "${area}" ใช่หรือไม่?`)) {
      return;
    }

    try {
      const result = await deleteNotificationSetting(id, userId);
      if (result.success) {
        toast({
          title: 'ลบสำเร็จ',
          description: result.message || 'ลบการตั้งค่าเรียบร้อยแล้ว',
          variant: 'success',
        });
        loadSettings();
      } else {
        toast({
          title: 'เกิดข้อผิดพลาด',
          description: result.error || 'ไม่สามารถลบการตั้งค่าได้',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error deleting notification setting:', error);
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถลบการตั้งค่าได้',
        variant: 'destructive',
      });
    }
  };

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle switch change
  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }));
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>ตั้งค่าการแจ้งเตือน</CardTitle>
        <CardDescription>
          จัดการการตั้งค่าการแจ้งเตือนสำหรับแต่ละพื้นที่
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='flex justify-center items-center py-8'>
            <Loader2 className='h-8 w-8 animate-spin text-primary' />
          </div>
        ) : (
          <>
            <div className='flex justify-end mb-4'>
              <Button onClick={handleCreateClick}>เพิ่มการตั้งค่าใหม่</Button>
            </div>

            {settings.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>พื้นที่</TableHead>
                    <TableHead>คำอธิบาย</TableHead>
                    <TableHead>Line Token</TableHead>
                    <TableHead>Telegram</TableHead>
                    <TableHead className='text-center'>สถานะ</TableHead>
                    <TableHead className='text-right'>จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {settings.map((setting) => (
                    <TableRow key={setting.id}>
                      <TableCell className='font-medium'>
                        {setting.area}
                      </TableCell>
                      <TableCell>{setting.description || '-'}</TableCell>
                      <TableCell>
                        {setting.lineToken
                          ? `${setting.lineToken.substring(0, 6)}...`
                          : 'ไม่ได้ตั้งค่า'}
                      </TableCell>
                      <TableCell>
                        {setting.telegramBotToken
                          ? `${setting.telegramBotToken.substring(0, 6)}...`
                          : 'ไม่ได้ตั้งค่า'}
                      </TableCell>
                      <TableCell className='text-center'>
                        {setting.isActive ? (
                          <span className='px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs'>
                            เปิดใช้งาน
                          </span>
                        ) : (
                          <span className='px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs'>
                            ปิดใช้งาน
                          </span>
                        )}
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex justify-end space-x-2'>
                          <Button
                            variant='outline'
                            size='icon'
                            onClick={() => handleEditClick(setting)}>
                            <PenIcon className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='outline'
                            size='icon'
                            onClick={() =>
                              handleDelete(setting.id, setting.area)
                            }>
                            <Trash2Icon className='h-4 w-4' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className='text-center py-8 text-muted-foreground'>
                ยังไม่มีการตั้งค่าการแจ้งเตือน
              </div>
            )}
          </>
        )}
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>
              {isEditing
                ? 'แก้ไขการตั้งค่าการแจ้งเตือน'
                : 'เพิ่มการตั้งค่าการแจ้งเตือนใหม่'}
            </DialogTitle>
            <DialogDescription>
              ตั้งค่า tokens สำหรับการแจ้งเตือนในแต่ละพื้นที่
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className='space-y-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='area' className='text-right'>
                  พื้นที่ <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='area'
                  name='area'
                  placeholder='ชื่อพื้นที่ (เช่น กรุงเทพฯ, นนทบุรี)'
                  className='col-span-3'
                  value={formData.area}
                  onChange={handleInputChange}
                  required
                  readOnly={isEditing} // ไม่ให้แก้ไขพื้นที่ถ้าเป็นการแก้ไข
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='userArea' className='text-right'>
                  User Area
                </Label>
                <Input
                  id='userArea'
                  name='userArea'
                  placeholder='User Area'
                  className='col-span-3'
                  value={formData.userArea}
                  onChange={handleInputChange}
                  readOnly
                  disabled
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='divName' className='text-right'>
                  Div Name
                </Label>
                <Input
                  id='divName'
                  name='divName'
                  placeholder='Div Name'
                  className='col-span-3'
                  value={formData.divName}
                  onChange={handleInputChange}
                  readOnly
                  disabled
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='depName' className='text-right'>
                  Dep Name
                </Label>
                <Input
                  id='depName'
                  name='depName'
                  placeholder='Dep Name'
                  className='col-span-3'
                  value={formData.depName}
                  onChange={handleInputChange}
                  readOnly
                  disabled
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='description' className='text-right'>
                  คำอธิบาย
                </Label>
                <Textarea
                  id='description'
                  name='description'
                  placeholder='คำอธิบายเพิ่มเติม'
                  className='col-span-3'
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='lineToken' className='text-right'>
                  Line Token
                </Label>
                <Input
                  id='lineToken'
                  name='lineToken'
                  placeholder='Line Notify Token'
                  className='col-span-3'
                  value={formData.lineToken}
                  onChange={handleInputChange}
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='telegramBotToken' className='text-right'>
                  Telegram Bot Token
                </Label>
                <Input
                  id='telegramBotToken'
                  name='telegramBotToken'
                  placeholder='Telegram Bot Token'
                  className='col-span-3'
                  value={formData.telegramBotToken}
                  onChange={handleInputChange}
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='telegramChatId' className='text-right'>
                  Telegram Chat ID
                </Label>
                <Input
                  id='telegramChatId'
                  name='telegramChatId'
                  placeholder='Telegram Chat ID'
                  className='col-span-3'
                  value={formData.telegramChatId}
                  onChange={handleInputChange}
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='isActive' className='text-right'>
                  สถานะ
                </Label>
                <div className='flex items-center space-x-2 col-span-3'>
                  <Switch
                    id='isActive'
                    checked={formData.isActive}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor='isActive'>
                    {formData.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => setDialogOpen(false)}>
                ยกเลิก
              </Button>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    กำลังบันทึก...
                  </>
                ) : (
                  'บันทึก'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
