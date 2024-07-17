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
 * Converts an Excel serial number to a formatted date in the format "DD/MM/YYYY".
 *
 * @param {number} serialNumber - The Excel serial number to convert to a date.
 * @return {string} The formatted date string in "DD/MM/YYYY" format.
 */
export function excelSerialNumberToDate(serialNumber: number): string {
  const milliseconds = (serialNumber - 25569) * 86400 * 1000;
  const date = new Date(milliseconds);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() + 543;
  return `${day}/${month}/${year}`;
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
    doc_no: 'หมายเลขเอกสาร',
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
