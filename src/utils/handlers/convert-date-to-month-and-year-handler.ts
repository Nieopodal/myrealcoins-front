import {pl} from 'date-fns/locale';
import {format, getMonth, getYear} from "date-fns";
export const convertDateToMonthAndYearHandler = (starts: string, ends: string): string=> {
    if (getMonth(new Date(starts)) === getMonth(new Date(ends))) {
        const month = format(new Date(starts), 'LLLL', {locale: pl});
        const year = getYear(new Date(starts));

        return `${month[0].toUpperCase() + month.slice(1)} ${year}`;
    } return '';
};