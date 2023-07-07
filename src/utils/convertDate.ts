/** convert year-month-day to sql datatype.DATE */

function toMySQLDate(dateStr: string | null | undefined): string | null {
    if (dateStr) {
        const date = new Date(dateStr);
        return date.toISOString().slice(0, 19).replace('T', ' ');
    } else {
        return null;
    }
}

export default toMySQLDate;
