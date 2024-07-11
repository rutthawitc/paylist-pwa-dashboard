'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { v4 as uuidv4 } from 'uuid';
import { updateCompanyNames, ExcelRow } from '@/actions/replacename';

import { uploadPaylist } from '@/actions/upload';
import { LineNotifyButton } from '@/components/protected/notify-button';

import {
  excelSerialNumberToDate,
  convertToThaiBaht,
  transformRowsData,
} from '@/lib/helper-fnc';
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

const XlsUploadForm = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<ExcelRow[]>([]);
  const [fileData, setFileData] = useState<File | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | undefined>('');

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
            due_date: excelSerialNumberToDate(parseInt(row[3] as string)),
            recipient: row[5],
            amount: convertToThaiBaht(parseFloat(row[6] as string)),
          }));

          rowsData = await updateCompanyNames(rowsData);
          console.log('Updated Rows Data:', rowsData);
          setPreviewData(rowsData);
          setUploadProgress(100);
        } catch (err) {
          setError('เกิดข้อผิดพลาดในการอ่านหรืออัปเดตข้อมูล');
          console.error(err);
        }
      };

      processFile();
    }
  }, [fileData]);
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

  //console.log('Preview', previewData);
  let dataCount = previewData.length;

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
          <Button onClick={handleSave} disabled={isSaving} className='mt-4'>
            {isSaving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
          </Button>
          <LineNotifyButton
            messageCount={dataCount}
            onNotificationResult={handleNotificationResult}
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
          <Table>
            <TableHeader>
              <TableRow className='text-center font-semibold'>
                <TableHead>เลขที่เอกสาร</TableHead>
                <TableHead>ประเภท</TableHead>
                <TableHead>วันที่</TableHead>
                <TableHead>ชื่อลูกค้า</TableHead>
                <TableHead>จํานวนเงิน (บาท)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {previewData.map((row) => (
                <TableRow key={row.uniqueID}>
                  <TableCell>{row.doc_no}</TableCell>
                  <TableCell>{row.trans_type}</TableCell>
                  <TableCell>{row.due_date}</TableCell>
                  <TableCell>{row.recipient}</TableCell>
                  <TableCell className='text-right'>{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </form>
    </Form>
  );
};

export default XlsUploadForm;
