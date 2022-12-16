export default (date: Date | string): string => {
  return new Date(date).toLocaleString().split(",")[0];
};

export const subYear = (date: Date, year: number) => {
  date.setFullYear(date.getFullYear() - year);

  return date;
};

export function convertDDMMYYYY(input) {
  const date = new Date(input);
  const yyyy = date.getFullYear();
  let mm: any = date.getMonth() + 1; // Months start at 0!
  let dd: any = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const result = dd + "/" + mm + "/" + yyyy;

  return result;
}

export function toUTCWithoutHour(date) {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
}
