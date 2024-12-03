import { format, parse, set } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function parseDate (date?: string) {
  if (!date) return undefined;

  const formatStr = (() => {
    if (date.length === 'yyyy-MM-dd HH:mm:ss'.length && !date.includes('/'))
      return 'yyyy-MM-dd HH:mm:ss';

    if (date.length === 'dd/MM/yyyy HH:mm:ss'.length && date.includes('/'))
      return 'dd/MM/yyyy HH:mm:ss';

    if (date.length === 'yyyy-MM-dd'.length && !date.includes('/'))
      return 'yyyy-MM-dd';
    if (date.length === 'dd/MM/yyyy'.length && date.includes('/'))
      return 'dd/MM/yyyy';

    return "yyyy-MM-dd'T'HH:mm:ss";
  })();

  return parse(date, formatStr, new Date());
}

export function parseAndDisplay (date?: string, displayFormat = 'Pp') {
  if (!date) return '';

  try {
    return format(parseDate(date) as Date, displayFormat, {
      locale: ptBR,
    });
  } catch (err) {
    return '';
  }
}

export function display (date: Date, displayFormat = 'Pp') {
  return format(date, displayFormat, { locale: ptBR });
}

export function mergeDateTime (dateFrom?: Date, timeFrom?: Date) {
  if (!dateFrom && !timeFrom) return undefined;

  if (dateFrom && !timeFrom) return dateFrom;
  if (!dateFrom && timeFrom) return timeFrom;

  return set(dateFrom as Date, {
    hours: timeFrom?.getHours(),
    minutes: timeFrom?.getMinutes(),
    seconds: timeFrom?.getSeconds(),
  });
}

export function formatDate (date: Date, _format = 'yyyy-MM-dd') {
  return format(date, _format, { locale: ptBR });
}

export function formatTime (date: Date, _format = 'pp') {
  return format(date, _format, { locale: ptBR });
}

export function formatDateTime (date: Date, _format = 'yyyy-MM-dd pp') {
  return format(date, _format, { locale: ptBR });
}
