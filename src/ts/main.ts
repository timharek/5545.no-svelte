export function getFormattedDate(time: string) {
const date = new Date(time);

return new Intl.DateTimeFormat('no', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
}).format(date);
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
