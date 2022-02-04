import { format } from 'date-fns';

export const getDateFormat = (date: Date, dateFormat: string) => {
  return format(date, dateFormat);
};
