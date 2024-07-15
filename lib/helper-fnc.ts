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
