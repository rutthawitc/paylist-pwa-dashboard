// transformData.ts

import dayjs from 'dayjs';
import 'dayjs/locale/th';
dayjs.locale('th');
import buddhistEra from 'dayjs/plugin/buddhistEra';
dayjs.extend(buddhistEra);

//import { nameReplacements } from '@/data/receiptname';

/**
 * Convert a number to Thai Baht format.
 *
 * @param {number} number - The number to convert to Thai Baht format
 * @return {string} The formatted string with Thai Baht symbol
 */
export function convertToThaiBaht(number: number): string {
  const [integerPart, decimalPart] = number.toFixed(2).toString().split('.');
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ','
  );
  return `${formattedIntegerPart}.${decimalPart}`;
}

/**
 * Converts an Excel serial number or a date string in DD.MM.YYYY format to a date string in DD.MM.YYYY format, where the year is in the Buddhist era.
 *
 * @param {string | number | null} dateValue - The Excel serial number or date string to be converted.
 * @return {string} The converted date string in DD.MM.YYYY format, or an empty string if the input is null or invalid.
 */
export function excelSerialNumberToDate(
  dateValue: string | number | null
): string {
  if (dateValue === null) {
    return ''; // หรือค่าเริ่มต้นอื่นๆ ตามที่คุณต้องการ เช่น 'N/A'
  }

  if (typeof dateValue === 'string') {
    // ถ้าเป็นสตริง ให้สันนิษฐานว่าอยู่ในรูปแบบ DD.MM.YYYY
    const [day, month, year] = dateValue.split('.');
    // แปลงปี ค.ศ. เป็น พ.ศ.
    const buddhistYear = parseInt(year) + 543;
    return `${day}.${month}.${buddhistYear}`;
  } else if (typeof dateValue === 'number') {
    // ถ้าเป็นตัวเลข ให้แปลงจาก Excel serial number
    const milliseconds = (dateValue - 25569) * 86400 * 1000;
    const date = new Date(milliseconds);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear() + 543; // แปลงเป็นปีพุทธศักราช
    return `${day}.${month}.${year}`;
  }

  // หากไม่ใช่ทั้งสตริง, ตัวเลข, หรือ null ให้คืนค่าสตริงว่าง
  return '';
}

/**
 * Formats the given ISO string into "DD/MM/YYYY" format.
 *
 * @param {string} isoString - The ISO string to format.
 * @return {string} The formatted date string in "DD/MM/YYYY" format.
 */
export function formatDate(isoString: string): string {
  dayjs.locale('th');
  return dayjs(isoString).format('DD/MM/BBBB');
}

/**
 * Formats the input string by removing underscores, capitalizing each word, and joining them together.
 *
 * @param {string} input - The input string to format.
 * @return {string} The formatted string with each word capitalized and joined together.
 */
export function formatString(input: string): string {
  // ลบเครื่องหมาย '_' และแยกคำ
  const words = input.split('_');

  // แปลงคำแต่ละคำให้ขึ้นต้นด้วยตัวพิมพ์ใหญ่
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  // รวมคำกลับเข้าด้วยกัน
  return capitalizedWords.join('');
}

/**
 * Translates the given field name into its corresponding translated string.
 *
 * @param {string} fieldName - The field name to be translated.
 * @return {string} The translated string for the given field name. If the field name is not found in the translations object, the original field name is returned.
 */
export function translateField(fieldName: string): string {
  const translations: { [key: string]: string } = {
    doc_no: 'เลขที่เช็ค',
    trans_type: 'ชนิดการโอน',
    due_date: 'วันที่กำหนดจ่าย',
    recipient: 'ผู้รับ',
    amount: 'จำนวนเงิน',
    upload_at: 'วันที่นำเข้าข้อมูล',
  };

  return translations[fieldName] || fieldName;
}

/**
 * Translates the given input string by replacing occurrences of field = value
 * with the translated field and the original value.
 *
 * @param {string} input - The input string to be translated.
 * @return {string} The translated string with field names replaced.
 */
export function translateText(input: string): string {
  const regex = /(\w+)\s*=\s*(\w+)/g;
  return input.replace(regex, (match, field, value) => {
    const translatedField = translateField(field);
    return `${translatedField} = ${value}`;
  });
}
