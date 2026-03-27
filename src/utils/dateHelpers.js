import { format, parseISO, isValid } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  if (!isValid(date)) return '—';
  return format(date, 'MMM dd, yyyy');
};

export const formatShortDate = (dateString) => {
  if (!dateString) return '—';
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  if (!isValid(date)) return '—';
  return format(date, 'dd MMM');
};

export const getMonthYear = (dateString) => {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  if (!isValid(date)) return '';
  return format(date, 'MMM yyyy');
};

export const toInputDate = (dateString) => {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  if (!isValid(date)) return '';
  return format(date, 'yyyy-MM-dd');
};
