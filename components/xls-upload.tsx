'use client';
import { revalidateUrl } from '@/actions/revalidate';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, z } from 'zod';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { v4 as uuidv4 } from 'uuid';
import { updateCompanyNames, ExcelRow } from '@/actions/replacename';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';

import { uploadPaylist } from '@/actions/upload';
import { LineNotifyButton } from '@/components/protected/notify-button';
import { TelegramNotifyButton } from '@/components/protected/telegram-notify-button';

import { excelSerialNumberToDate, convertToThaiBaht } from '@/lib/helper-fnc';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { useToast } from '@/components/ui/use-toast';

const MAX_FILE_SIZE = 10000000; // 10MB
const ACCEPTED_FILE_TYPES = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const formSchema = z.object({
  file: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, 'ต้องเลือกไฟล์ Excel')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `ขนาดไฟล์ต้องไม่เกิน 10MB`
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      'รองรับเฉพาะไฟล์ .xls และ .xlsx เท่านั้น'
    ),
});

type RowData = (string | number | null)[];

interface AnonymizationConfig {
  replacementChar: string;
  firstNameChars: number;
  lastNameChars: number;
}

const defaultConfig: AnonymizationConfig = {
  replacementChar: '*',
  firstNameChars: 4,
  lastNameChars: 4,
};

const thaiPrefixes = [
  'นาย',
  'นาง',
  'นางสาว',
  'ด.ช.',
  'ด.ญ.',
  'เด็กชาย',
  'เด็กหญิง',
  'พล.ต.',
  'พ.ต.',
  'ร.ต.',
  'พ.อ.',
  'พ.ท.',
  'ดร.',
  'นพ.',
  'พญ.',
  'ศ.',
  'รศ.',
  'ผศ.',
  'คุณ',
];
/**
 * ฟังก์ชันสำหรับเปลี่ยนตัวอักษรในคำให้เป็นอักขระที่กำหนด
 */
function anonymizeWord(
  word: string,
  numChars: number,
  config: AnonymizationConfig = defaultConfig
): string {
  // ถ้าคำมีความยาวน้อยกว่าหรือเท่ากับ 4 ตัวอักษร ให้เปลี่ยนแค่ตัวสุดท้าย
  if (word.length <= 4) {
    return word.slice(0, -1) + config.replacementChar;
  }

  // ถ้าคำมีความยาวน้อยกว่าหรือเท่ากับจำนวนที่ต้องการเปลี่ยน
  if (word.length <= numChars) {
    return config.replacementChar.repeat(word.length);
  }

  // เปลี่ยนตัวอักษรท้ายของคำตามจำนวนที่กำหนด
  const visiblePart = word.slice(0, -numChars);
  const anonymizedPart = config.replacementChar.repeat(numChars);
  return visiblePart + anonymizedPart;
}

/**
 * ฟังก์ชันหลักสำหรับการเปลี่ยนชื่อ-นามสกุลให้เป็นรูปแบบที่กำหนด
 */
function anonymizeThaiName(
  fullName: string,
  config: AnonymizationConfig = defaultConfig
): string {
  // แยกคำในชื่อ
  const words: string[] = fullName.split(' ');

  // ตรวจสอบว่าคำแรกเป็นคำนำหน้าหรือไม่
  let startIndex: number = 0;
  if (thaiPrefixes.some((prefix) => words[0].startsWith(prefix))) {
    startIndex = 1; // ข้ามคำนำหน้า
  }

  // เปลี่ยนตัวอักษรในชื่อและนามสกุล
  for (let i = startIndex; i < words.length; i++) {
    const word = words[i];
    if (i === startIndex) {
      // ชื่อ
      words[i] = anonymizeWord(word, config.firstNameChars, config);
    } else {
      // นามสกุล
      words[i] = anonymizeWord(word, config.lastNameChars, config);
    }
  }

  return words.join(' ');
}

const XlsUploadForm = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<ExcelRow[]>([]);
  const [fileData, setFileData] = useState<File | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | undefined>('');

  // State for row selection and deletion
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [dataCount, setDataCount] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  /***Define notification status
   * @param {string} success
   * @param {string} error
   */
  const [notificationStatus, setNotificationStatus] = useState<string | null>(
    null
  );

  const handleNotificationResult = (result: {
    success?: string;
    error?: string;
  }) => {
    if (result.success) {
      setNotificationStatus(result.success);
    } else if (result.error) {
      setNotificationStatus(result.error);
    }
  };
  //---------------------------//

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (data.file && data.file.length > 0) {
      setFileData(data.file[0]);
      setError(null);
      setUploadProgress(0);
    }
  };
  useEffect(() => {
    if (fileData) {
      const processFile = async () => {
        try {
          const arrayBuffer = await readFileAsArrayBuffer(fileData);
          const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
            type: 'array',
          });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const xcelData: any = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          });

          let rowsData: ExcelRow[] = xcelData.map((row: RowData) => ({
            uniqueID: uuidv4(),
            doc_no: row[0],
            trans_type: row[2],
            due_date: excelSerialNumberToDate(row[3]),
            recipient: row[5],
            amount: convertToThaiBaht(parseFloat(row[6] as string)),
          }));

          rowsData = await updateCompanyNames(rowsData);
          console.log('Updated Rows Data:', rowsData);
          setPreviewData(rowsData);
          setDataCount(rowsData.length);
          setUploadProgress(100);
        } catch (err) {
          setError('เกิดข้อผิดพลาดในการอ่านหรืออัปเดตข้อมูล');
          console.error(err);
        }
      };

      processFile();
    }
  }, [fileData]);

  const { toast } = useToast();

  const handlePDPACheck = () => {
    if (!previewData || previewData.length === 0) {
      setError('ไม่พบข้อมูลที่จะตรวจสอบ PDPA');
      return;
    }

    const updatedData = previewData.map((row) => {
      if (row.recipient) {
        // หาคำนำหน้าที่ตรงกับข้อความ
        const matchedPrefix = thaiPrefixes.find((prefix) =>
          row.recipient.startsWith(prefix)
        );

        if (matchedPrefix) {
          // แยกส่วนที่เหลือหลังจากคำนำหน้า
          const remainingPart = row.recipient
            .slice(matchedPrefix.length)
            .trim();

          // แยกชื่อและนามสกุล
          const [name, surname] = remainingPart.split(' ');

          // เปลี่ยนเฉพาะชื่อและนามสกุล
          const anonymizedName = name
            ? anonymizeWord(name, defaultConfig.firstNameChars)
            : '';
          const anonymizedSurname = surname
            ? anonymizeWord(surname, defaultConfig.lastNameChars)
            : '';

          // รวมคำกลับเข้าด้วยกัน
          return {
            ...row,
            recipient: [matchedPrefix, anonymizedName, anonymizedSurname]
              .filter(Boolean)
              .join(' '),
          };
        }
      }
      return row;
    });

    setPreviewData(updatedData);
    toast({
      title: 'PDPA Check',
      description: 'ตรวจสอบและปรับปรุงข้อมูล PDPA เรียบร้อยแล้ว',
      duration: 3000,
    });
  };

  /**
   * Reads the contents of the provided File as an ArrayBuffer.
   *
   * @param {File} file - The File to read as an ArrayBuffer.
   * @return {Promise<ArrayBuffer>} A Promise that resolves with the ArrayBuffer content of the File.
   */
  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
      reader.onerror = (e) => reject(e);
      reader.readAsArrayBuffer(file);
    });
  };

  console.log('Preview', previewData);

  const handleSave = async () => {
    if (!previewData || previewData.length === 0) {
      setSaveMessage('ไม่พบข้อมูลที่จะบันทึก');
      return;
    }
    setIsSaving(true);
    setSaveMessage(null);
    try {
      const result = await uploadPaylist(previewData);
      if (result.success) {
        setSaveMessage(result.success);
      } else if (result.error) {
        setSaveMessage(result.error);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveMessage('An error occurred while saving the data');
    } finally {
      setIsSaving(false);
      await revalidateUrl({ path: '/dashboard' }); // เรียกใช้ Server Action เพื่อ revalidate
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full p-2'>
        <FormField
          control={form.control}
          name='file'
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>
                เลือกไฟล์ Excel ที่จัดเตรียมไว้แล้ว เพื่อนำเข้าข้อมูล
              </FormLabel>
              <FormControl>
                <Input
                  type='file'
                  onChange={(e) => onChange(e.target.files)}
                  accept='.xls,.xlsx'
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-start gap-4'>
          <Button type='submit' className='mt-4'>
            ตรวจสอบข้อมูล
          </Button>
          <Button
            type='button'
            onClick={handlePDPACheck}
            disabled={!previewData || previewData.length === 0}
            className='mt-4'>
            PDPA Check
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className='mt-4'>
            {isSaving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
          </Button>

          {/*           <LineNotifyButton
            messageCount={dataCount}
            onNotificationResult={handleNotificationResult}
            area='Line Notify'
          /> */}
          <TelegramNotifyButton
            messageCount={dataCount}
            onNotificationResult={handleNotificationResult}
            area='Telegram'
            disabled={isSaving || previewData.length === 0 || saveMessage === null || !saveMessage.includes('Success')}
          />
          {notificationStatus && (
            <p
              className={`mt-6 ${
                notificationStatus.includes('ส่งการแจ้งเตือนสำเร็จ')
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}>
              {notificationStatus}
            </p>
          )}
        </div>
        {saveMessage && (
          <p
            className={
              saveMessage.includes('Success')
                ? 'text-green-500'
                : 'text-red-500'
            }>
            {saveMessage}
          </p>
        )}

        {uploadProgress > 0 && (
          <div className='mt-4'>
            <Progress value={uploadProgress} className='w-full' />
            <p className='text-center'>{uploadProgress}%</p>
          </div>
        )}

        {error && <p className='text-red-500 mt-4'>{error}</p>}

        {previewData.length > 0 && (
          <>
            <div className='flex justify-end mb-2 gap-2'>
              <Button
                variant='destructive'
                size='sm'
                onClick={() => {
                  const newPreviewData = previewData.filter(
                    (row) => !selectedRows.includes(row.uniqueID)
                  );
                  setPreviewData(newPreviewData);
                  setSelectedRows([]);
                  setSelectAll(false);
                  setDataCount(newPreviewData.length);
                }}
                disabled={selectedRows.length === 0}>
                ลบรายการที่เลือก ({selectedRows.length})
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow className='text-center font-semibold'>
                  <TableHead className='w-[50px]'>
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={(checked) => {
                        setSelectAll(!!checked);
                        if (checked) {
                          setSelectedRows(
                            previewData.map((row) => row.uniqueID)
                          );
                        } else {
                          setSelectedRows([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>เลขที่เช็ค</TableHead>
                  <TableHead>ประเภท</TableHead>
                  <TableHead>วันที่</TableHead>
                  <TableHead>ชื่อลูกค้า</TableHead>
                  <TableHead>จํานวนเงิน (บาท)</TableHead>
                  <TableHead className='w-[80px]'>จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.map((row) => (
                  <TableRow key={row.uniqueID}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(row.uniqueID)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRows((prev) => [...prev, row.uniqueID]);
                          } else {
                            setSelectedRows((prev) =>
                              prev.filter((id) => id !== row.uniqueID)
                            );
                            setSelectAll(false);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.doc_no}</TableCell>
                    <TableCell>{row.trans_type}</TableCell>
                    <TableCell>{row.due_date}</TableCell>
                    <TableCell>{row.recipient}</TableCell>
                    <TableCell className='text-right'>{row.amount}</TableCell>
                    <TableCell>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => {
                          const newPreviewData = previewData.filter(
                            (item) => item.uniqueID !== row.uniqueID
                          );
                          setPreviewData(newPreviewData);
                          setSelectedRows((prev) =>
                            prev.filter((id) => id !== row.uniqueID)
                          );
                          setDataCount(newPreviewData.length);
                        }}>
                        <Trash2 className='h-4 w-4 text-red-500' />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </form>
    </Form>
  );
};

export default XlsUploadForm;
