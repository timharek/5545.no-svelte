import { formatDistanceToNow, isToday } from 'date-fns';
import nb from 'date-fns/locale/nb/index.js';

/**
 * If date is today this returns date in natural language,
 * if the date is later than today it returns weekday with the time.
 * 
 * Example:
 * - om omtrent en time
 * - mandag kl. 12:00
 * 
 * @param time Datetime from Yr
 * @returns formatted date
 */
export function getFormattedDate(time: string) {
  const date = new Date(time);

  const formattedDate = new Intl.DateTimeFormat('no', {
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);

  if (isToday(date)) {
    return formatDistanceToNow(date, { locale: nb, addSuffix: true });
  }

  return formattedDate;
}

export function formatNumber(number: string | number, format: string | undefined = undefined) {
  if (format) {
    return new Intl.NumberFormat('no', {
      style: 'unit',
      unit: format,
      maximumFractionDigits: Number(number) < 1 && format == 'millimeter' ? 1 : 0
    }).format(Number(number));
  }
  return new Intl.NumberFormat('no', { maximumFractionDigits: 0 }).format(Number(number));
}
