/** convert year-month-day to sql datatype.DATE */

function toMySQLDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

export default toMySQLDate;
