export default (date: Date | string): string => {
    return new Date(date).toLocaleString().split(',')[0];
}

export const subYear = (date: Date, year: number) => {
    date.setFullYear(date.getFullYear() - year);

    return date;
}
