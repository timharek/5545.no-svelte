import { formatDistanceToNow, isToday } from "date-fns";
import { nb } from 'date-fns/locale'

export function getFormattedDate(time: string) {
const date = new Date(time);


const formattedDate = new Intl.DateTimeFormat('no', {
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric'
}).format(date);
    // IsToday show hours
    // isTomorrow or later, weekday and time
    if (isToday(date)) {
        return formatDistanceToNow(date, {locale: nb, addSuffix: true})
    }

    return formattedDate;
}

export function formatNumber(number: string | number, format: string | undefined = undefined) {
if (format) {
    return new Intl.NumberFormat('no', {
    style: 'unit',
    unit: format,
    maximumFractionDigits: 0
    }).format(Number(number));
}
return new Intl.NumberFormat('no', { maximumFractionDigits: 0 }).format(Number(number));
}
