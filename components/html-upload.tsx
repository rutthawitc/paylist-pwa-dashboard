'use client';
import { useState, DragEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { v4 as uuidv4 } from 'uuid';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Upload, FileText } from 'lucide-react';
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
import { useToast } from '@/components/ui/use-toast';

const MAX_FILE_SIZE = 10000000; // 10MB
const ACCEPTED_FILE_TYPES = ['text/html', 'text/htm'];

const formSchema = z.object({
  file: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, 'ต้องเลือกไฟล์ HTML')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `ขนาดไฟล์ต้องไม่เกิน 10MB`
    )
    .refine(
      (files) => {
        const file = files?.[0];
        if (!file) return false;
        const fileName = file.name.toLowerCase();
        return fileName.endsWith('.html') || fileName.endsWith('.htm');
      },
      'รองรับเฉพาะไฟล์ .html และ .htm เท่านั้น'
    ),
});

export interface PaymentRow {
  uniqueID: string;
  รหัสเจ้าหนี้: string;
  ชื่อเจ้าหนี้: string;
  เลขที่เอกสารตั้งหนี้: string;
  วิธีการจ่าย: string;
  กำหนดชำระ: string;
  แหล่งเงิน: string;
  เลขที่เอกสารสั่งจ่ายเงิน: string;
  คีย์ธนาคาร: string;
  เลขที่บัญชีธนาคาร: string;
  ชื่อผู้รับเงิน: string;
  จำนวนเงิน: string;
  ภาษีหัก_ณ_ที่จ่าย: string;
  รวมจ่ายสุทธิ: string;
}

/**
 * ฟังก์ชันสำหรับแปลงรายงานการจ่ายเงินจาก HTML เป็นข้อมูลที่จัดเรียบร้อย
 */
function convertPaymentHTMLToData(htmlContent: string): PaymentRow[] {
  // สร้าง parser ชั่วคราว
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  // เตรียมอาร์เรย์สำหรับเก็บข้อมูล
  const payments: PaymentRow[] = [];

  // หาข้อมูลในหน้าเอกสาร
  const lines = doc.querySelectorAll('font[face="courier new"] nobr');

  // เตรียมตัวแปรสำหรับเก็บข้อมูล
  let currentPayment: Partial<PaymentRow> | null = null;

  // วนลูปผ่านแต่ละบรรทัด
  for (let i = 0; i < lines.length; i++) {
    const text = lines[i].textContent?.trim() || '';

    // ตรวจหาบรรทัดที่มีข้อมูลรหัสเจ้าหนี้ (รูปแบบ ตัวเลข 6 หลัก ตามด้วยชื่อบริษัท)
    if (/^\d{6}\s+[หบ].*/.test(text)) {
      // เริ่มเก็บข้อมูลใหม่
      currentPayment = {};

      // แยกรหัสเจ้าหนี้และชื่อ
      const vendorMatch = text.match(/^(\d{6})\s+(.*?)\s+ช\.แหล่งเงินทุนกปภ\.$/);
      if (vendorMatch) {
        currentPayment['รหัสเจ้าหนี้'] = vendorMatch[1];
        currentPayment['ชื่อเจ้าหนี้'] = vendorMatch[2].trim();
        currentPayment['แหล่งเงิน'] = 'ช.แหล่งเงินทุนกปภ.';
      }

      // อ่านข้อมูลในบรรทัดถัดไป
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1].textContent?.trim() || '';

        // ตรวจสอบว่าบรรทัดถัดไปเป็นรูปแบบปกติ (มีข้อมูลครบในบรรทัดเดียว)
        // ใช้ [\s\u00A0]+ เพื่อรองรับทั้ง space ปกติและ non-breaking space (char 160)
        const detailMatch = nextLine.match(
          /^(\d{10})[\s\u00A0]+([A-Z])[\s\u00A0]+(\d{2}\.\d{2}\.\d{4})[\s\u00A0]+(\d{10})[\s\u00A0]+(KTB|KT\d{3}|[A-Z]+)[\s\u00A0]+(\d{10})[\s\u00A0]+(.*?)[\s\u00A0]+(\d{1,3}(?:,\d{3})*\.\d{2})[\s\u00A0]+(\d{1,3}(?:,\d{3})*\.\d{2})[\s\u00A0]+(\d{1,3}(?:,\d{3})*\.\d{2})/
        );

        if (detailMatch) {
          currentPayment['เลขที่เอกสารตั้งหนี้'] = detailMatch[1];
          currentPayment['วิธีการจ่าย'] = detailMatch[2];
          currentPayment['กำหนดชำระ'] = detailMatch[3];
          currentPayment['เลขที่เอกสารสั่งจ่ายเงิน'] = detailMatch[4];
          currentPayment['คีย์ธนาคาร'] = detailMatch[5];
          currentPayment['เลขที่บัญชีธนาคาร'] = detailMatch[6];
          currentPayment['ชื่อผู้รับเงิน'] = detailMatch[7].trim();
          currentPayment['จำนวนเงิน'] = detailMatch[8].replace(/,/g, '');
          currentPayment['ภาษีหัก_ณ_ที่จ่าย'] = detailMatch[9].replace(/,/g, '');
          currentPayment['รวมจ่ายสุทธิ'] = detailMatch[10].replace(/,/g, '');
          currentPayment['uniqueID'] = uuidv4();

          // เพิ่มข้อมูลลงในอาร์เรย์
          payments.push({ ...currentPayment } as PaymentRow);
          i++; // ข้ามบรรทัดที่ประมวลผลแล้ว เพื่อไม่ให้ถูกประมวลผลซ้ำ
        } else {
          // บันทึกบรรทัดที่ไม่ตรงรูปแบบปกติ
          console.log('Failed normal match. Next line:', nextLine, 'Length:', nextLine.length, 'Chars:', Array.from(nextLine).map(c => c.charCodeAt(0)));

          // กรณีพิเศษ: วิธีการจ่าย "C" อาจอยู่คนละบรรทัดกับข้อมูลที่เหลือ
          // ตรวจสอบว่าบรรทัดถัดไปเป็นแค่ตัวอักษร C หรือไม่ (อาจมีช่องว่างข้างหน้าหรือข้างหลัง)
          const methodOnlyMatch = nextLine.match(/^\s*([A-Z])\s*$/);

          if (methodOnlyMatch && i + 2 < lines.length) {
            // วิธีการจ่ายอยู่คนละบรรทัด ให้อ่านบรรทัดถัดไป
            const paymentMethod = methodOnlyMatch[1];
            const dataLine = lines[i + 2].textContent?.trim() || '';

            console.log(`Found method-only line: ${paymentMethod}`);
            console.log(`Next data line (i+2):`, dataLine);

            // ตรวจสอบข้อมูลในบรรทัดที่ 3 (ไม่มีวิธีการจ่าย)
            const splitDataMatch = dataLine.match(
              /^(\d{10})\s+(\d{2}\.\d{2}\.\d{4})\s+(\d{10})\s+(KT\d{3}|[A-Z]+)\s+(\d{10})\s+(.*?)(?:\s+(\d{1,3}(?:,\d{3})*\.\d{2})\s+(\d{1,3}(?:,\d{3})*\.\d{2})\s+(\d{1,3}(?:,\d{3})*\.\d{2}))?/
            );

            if (splitDataMatch) {
              currentPayment['เลขที่เอกสารตั้งหนี้'] = splitDataMatch[1];
              currentPayment['วิธีการจ่าย'] = paymentMethod;
              currentPayment['กำหนดชำระ'] = splitDataMatch[2];
              currentPayment['เลขที่เอกสารสั่งจ่ายเงิน'] = splitDataMatch[3];
              currentPayment['คีย์ธนาคาร'] = splitDataMatch[4];
              currentPayment['เลขที่บัญชีธนาคาร'] = splitDataMatch[5];
              currentPayment['ชื่อผู้รับเงิน'] = splitDataMatch[6].trim();
              currentPayment['จำนวนเงิน'] = splitDataMatch[7]?.replace(/,/g, '') || '';
              currentPayment['ภาษีหัก_ณ_ที่จ่าย'] = splitDataMatch[8]?.replace(/,/g, '') || '';
              currentPayment['รวมจ่ายสุทธิ'] = splitDataMatch[9]?.replace(/,/g, '') || '';
              currentPayment['uniqueID'] = uuidv4();

              console.log(`Successfully parsed C payment:`, currentPayment);

              // เพิ่มข้อมูลลงในอาร์เรย์
              payments.push({ ...currentPayment } as PaymentRow);
            } else {
              console.log(`Failed to match split data for method ${paymentMethod}`);

              // ลองหาข้อมูลในบรรทัดถัดไปอีก (i+3) เผื่อจำนวนเงินอยู่อีกบรรทัด
              if (i + 3 < lines.length) {
                const nextDataLine = lines[i + 3].textContent?.trim() || '';
                console.log(`Checking next line (i+3):`, nextDataLine);

                // ตรวจสอบว่าบรรทัดที่ 3 มีข้อมูลบางส่วน และบรรทัดที่ 4 มีจำนวนเงิน
                const partialDataMatch = dataLine.match(
                  /^(\d{10})\s+(\d{2}\.\d{2}\.\d{4})\s+(\d{10})\s+(KT\d{3}|[A-Z]+)\s+(\d{10})\s+(.*?)$/
                );
                const amountMatch = nextDataLine.match(
                  /^\s*(\d{1,3}(?:,\d{3})*\.\d{2})\s+(\d{1,3}(?:,\d{3})*\.\d{2})\s+(\d{1,3}(?:,\d{3})*\.\d{2})/
                );

                if (partialDataMatch && amountMatch) {
                  currentPayment['เลขที่เอกสารตั้งหนี้'] = partialDataMatch[1];
                  currentPayment['วิธีการจ่าย'] = paymentMethod;
                  currentPayment['กำหนดชำระ'] = partialDataMatch[2];
                  currentPayment['เลขที่เอกสารสั่งจ่ายเงิน'] = partialDataMatch[3];
                  currentPayment['คีย์ธนาคาร'] = partialDataMatch[4];
                  currentPayment['เลขที่บัญชีธนาคาร'] = partialDataMatch[5];
                  currentPayment['ชื่อผู้รับเงิน'] = partialDataMatch[6].trim();
                  currentPayment['จำนวนเงิน'] = amountMatch[1].replace(/,/g, '');
                  currentPayment['ภาษีหัก_ณ_ที่จ่าย'] = amountMatch[2].replace(/,/g, '');
                  currentPayment['รวมจ่ายสุทธิ'] = amountMatch[3].replace(/,/g, '');
                  currentPayment['uniqueID'] = uuidv4();

                  console.log(`Successfully parsed C payment (multi-line):`, currentPayment);

                  // เพิ่มข้อมูลลงในอาร์เรย์
                  payments.push({ ...currentPayment } as PaymentRow);
                }
              }
            }
          }
        }
      }
    }
    // ตรวจหาบรรทัดที่มีแค่เลขที่เอกสารตั้งหนี้ (กรณีที่มีหลายรายการต่อเจ้าหนี้เดียวกัน)
    else if (/^\d{10}[\s\u00A0]+[A-Z][\s\u00A0]+\d{2}\.\d{2}\.\d{4}/.test(text) && currentPayment) {
      const detailMatch = text.match(
        /^(\d{10})[\s\u00A0]+([A-Z])[\s\u00A0]+(\d{2}\.\d{2}\.\d{4})[\s\u00A0]+(\d{10})[\s\u00A0]+(KTB|KT\d{3}|[A-Z]+)[\s\u00A0]+(\d{10})[\s\u00A0]+(.*?)[\s\u00A0]+(\d{1,3}(?:,\d{3})*\.\d{2})[\s\u00A0]+(\d{1,3}(?:,\d{3})*\.\d{2})[\s\u00A0]+(\d{1,3}(?:,\d{3})*\.\d{2})/
      );

      if (detailMatch) {
        // สร้างรายการใหม่โดยใช้ข้อมูลเจ้าหนี้เดิม
        const additionalPayment: Partial<PaymentRow> = { ...currentPayment };
        additionalPayment['เลขที่เอกสารตั้งหนี้'] = detailMatch[1];
        additionalPayment['วิธีการจ่าย'] = detailMatch[2];
        additionalPayment['กำหนดชำระ'] = detailMatch[3];
        additionalPayment['เลขที่เอกสารสั่งจ่ายเงิน'] = detailMatch[4];
        additionalPayment['คีย์ธนาคาร'] = detailMatch[5];
        additionalPayment['เลขที่บัญชีธนาคาร'] = detailMatch[6];
        additionalPayment['ชื่อผู้รับเงิน'] = detailMatch[7].trim();
        additionalPayment['จำนวนเงิน'] = detailMatch[8].replace(/,/g, '');
        additionalPayment['ภาษีหัก_ณ_ที่จ่าย'] = detailMatch[9].replace(/,/g, '');
        additionalPayment['รวมจ่ายสุทธิ'] = detailMatch[10].replace(/,/g, '');
        additionalPayment['uniqueID'] = uuidv4();

        // Debug: Log payment method
        console.log(`Additional payment method for ${detailMatch[1]}:`, detailMatch[2]);

        // เพิ่มข้อมูลลงในอาร์เรย์
        payments.push(additionalPayment as PaymentRow);
      }
    }
  }

  return payments;
}

const HtmlUploadForm = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<PaymentRow[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for row selection and deletion
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast();

  /**
   * Reads the contents of the provided File as text
   */
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file, 'UTF-8');
    });
  };

  /**
   * Process the HTML file
   */
  const processFile = async (file: File) => {
    try {
      setError(null);
      setUploadProgress(30);

      const htmlContent = await readFileAsText(file);
      setUploadProgress(60);

      const payments = convertPaymentHTMLToData(htmlContent);
      setUploadProgress(90);

      if (payments.length === 0) {
        throw new Error('ไม่พบข้อมูลการจ่ายเงินในไฟล์ HTML');
      }

      setPreviewData(payments);
      setUploadProgress(100);

      // Debug: Log first payment to verify data
      console.log('First payment record:', payments[0]);
      console.log('Total payments:', payments.length);

      toast({
        title: 'อ่านไฟล์สำเร็จ',
        description: `พบข้อมูลทั้งหมด ${payments.length} รายการ`,
        duration: 3000,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการอ่านไฟล์');
      console.error(err);
      setUploadProgress(0);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (data.file && data.file.length > 0) {
      processFile(data.file[0]);
    }
  };

  // Drag and drop handlers
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileName = file.name.toLowerCase();

      // Validate file type
      if (!fileName.endsWith('.html') && !fileName.endsWith('.htm')) {
        toast({
          title: 'ประเภทไฟล์ไม่ถูกต้อง',
          description: 'รองรับเฉพาะไฟล์ .html และ .htm เท่านั้น',
          variant: 'destructive',
          duration: 3000,
        });
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: 'ไฟล์ใหญ่เกินไป',
          description: 'ขนาดไฟล์ต้องไม่เกิน 10MB',
          variant: 'destructive',
          duration: 3000,
        });
        return;
      }

      processFile(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const formatAmount = (amount: string): string => {
    if (!amount || amount === '-') return '-';
    const num = parseFloat(amount);
    if (isNaN(num)) return amount;
    return new Intl.NumberFormat('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const getPaymentMethodLabel = (method: string): string => {
    const methodMap: Record<string, string> = {
      E: 'Direct Credit',
      M: 'Media Clearing',
      C: 'Cheque',
    };
    return methodMap[method] || method;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full p-2'>
        {/* Drag and Drop Zone */}
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-primary/10'
              : 'border-gray-300 hover:border-gray-400'
          }`}>
          <div className='flex flex-col items-center gap-4'>
            <div className='p-4 rounded-full bg-primary/10'>
              {isDragging ? (
                <Upload className='w-12 h-12 text-primary' />
              ) : (
                <FileText className='w-12 h-12 text-primary' />
              )}
            </div>
            <div>
              <p className='text-lg font-medium mb-2'>
                {isDragging ? 'วางไฟล์ที่นี่' : 'ลากและวางไฟล์ HTML ที่นี่'}
              </p>
              <p className='text-sm text-gray-500 mb-4'>หรือ</p>
              <Button type='button' onClick={handleBrowseClick} variant='outline'>
                เลือกไฟล์จากเครื่อง
              </Button>
            </div>
            <p className='text-xs text-gray-400'>
              รองรับไฟล์ .html และ .htm ขนาดไม่เกิน 10MB
            </p>
          </div>
        </div>

        {/* Hidden File Input */}
        <FormField
          control={form.control}
          name='file'
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem className='hidden'>
              <FormControl>
                <input
                  ref={fileInputRef}
                  type='file'
                  onChange={(e) => {
                    onChange(e.target.files);
                    if (e.target.files && e.target.files.length > 0) {
                      processFile(e.target.files[0]);
                    }
                  }}
                  accept='.html,.htm'
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className='mt-4'>
            <Progress value={uploadProgress} className='w-full' />
            <p className='text-center text-sm mt-2'>กำลังประมวลผล... {uploadProgress}%</p>
          </div>
        )}

        {error && (
          <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-lg'>
            <p className='text-red-600 text-sm'>{error}</p>
          </div>
        )}

        {previewData.length > 0 && (
          <>
            <div className='flex justify-between items-center my-4'>
              <p className='text-sm text-gray-600'>
                ข้อมูลทั้งหมด: {previewData.length} รายการ
                {selectedRows.length > 0 && ` (เลือก ${selectedRows.length} รายการ)`}
              </p>
              <Button
                type='button'
                variant='destructive'
                size='sm'
                onClick={() => {
                  const newPreviewData = previewData.filter(
                    (row) => !selectedRows.includes(row.uniqueID)
                  );
                  setPreviewData(newPreviewData);
                  setSelectedRows([]);
                  setSelectAll(false);
                  toast({
                    title: 'ลบรายการสำเร็จ',
                    description: `ลบรายการ ${selectedRows.length} รายการแล้ว`,
                    duration: 2000,
                  });
                }}
                disabled={selectedRows.length === 0}>
                <Trash2 className='w-4 h-4 mr-2' />
                ลบรายการที่เลือก ({selectedRows.length})
              </Button>
            </div>

            <div className='overflow-x-auto border rounded-lg'>
              <Table>
                <TableHeader>
                  <TableRow className='bg-gray-50'>
                    <TableHead className='w-[50px] sticky left-0 bg-gray-50 z-10'>
                      <Checkbox
                        checked={selectAll}
                        onCheckedChange={(checked) => {
                          setSelectAll(!!checked);
                          if (checked) {
                            setSelectedRows(previewData.map((row) => row.uniqueID));
                          } else {
                            setSelectedRows([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead className='min-w-[150px]'>วิธีจ่าย</TableHead>
                    <TableHead className='min-w-[120px]'>คีย์ธนาคาร</TableHead>
                    <TableHead className='min-w-[120px]'>กำหนดชำระ</TableHead>
                    <TableHead className='min-w-[250px]'>ชื่อผู้รับเงิน</TableHead>
                    <TableHead className='min-w-[150px] text-right'>รวมจ่ายสุทธิ</TableHead>
                    <TableHead className='w-[80px] sticky right-0 bg-gray-50 z-10'>
                      จัดการ
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData.map((row) => (
                    <TableRow key={row.uniqueID} className='hover:bg-gray-50'>
                      <TableCell className='sticky left-0 bg-white z-10'>
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
                      <TableCell>
                        <span className='inline-block px-3 py-1 bg-blue-100 text-blue-800 font-semibold rounded text-sm'>
                          {getPaymentMethodLabel(row.วิธีการจ่าย)}
                        </span>
                      </TableCell>
                      <TableCell>{row.คีย์ธนาคาร}</TableCell>
                      <TableCell>{row.กำหนดชำระ}</TableCell>
                      <TableCell>{row.ชื่อผู้รับเงิน}</TableCell>
                      <TableCell className='text-right font-mono'>
                        {formatAmount(row.รวมจ่ายสุทธิ)}
                      </TableCell>
                      <TableCell className='sticky right-0 bg-white z-10'>
                        <Button
                          type='button'
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
                          }}>
                          <Trash2 className='h-4 w-4 text-red-500' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
              <p className='text-sm text-blue-800'>
                <strong>หมายเหตุ:</strong> ตรวจสอบความถูกต้องของข้อมูลก่อนนำไปใช้งาน
                คุณสามารถเลือกและลบรายการที่ไม่ต้องการได้
              </p>
            </div>
          </>
        )}
      </form>
    </Form>
  );
};

export default HtmlUploadForm;
