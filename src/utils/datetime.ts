import { lightFormat, parseISO } from 'date-fns';

export const DATETIME_FORMAT = 'yyyy/MM/dd HH:mm:ss';

export function formatDateTime(dateTime: string) {
  return lightFormat(parseISO(dateTime), DATETIME_FORMAT);
}
