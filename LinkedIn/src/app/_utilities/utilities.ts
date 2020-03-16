import { FormGroup } from "@angular/forms";
import { DateData } from "../_models/dateData";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export function years(start, end) {
  const y = [];
  for (let i = start; i <= end; i++) {
    y.unshift(i);
  }
  return y;
}

export const rangeValidator = (formGroup: FormGroup) => {
  const start = formGroup.get("start").value;
  const end = formGroup.get("end").value;
  const today: DateData = {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  };
  let rangeStart = false;
  let rangeEnd = false;
  if (getDateDifference(start, today).years < 0 && start.year !== null) {
    rangeStart = true;
  }
  if (getDateDifference(end, today).years < 0 && end.year !== null) {
    rangeEnd = true;
  }
  if (rangeStart || rangeEnd) {
    return { rangeStart, rangeEnd };
  }
  if (
    (getDateDifference(start, end).years < 0 ||
      (getDateDifference(start, end).years === 0 &&
        getDateDifference(start, end).months === 0)) &&
    start.year !== null &&
    end.year !== null
  ) {
    return { range: true };
  }
  return null;
};

export function getDateDifference(start: DateData, end: DateData) {
  if (end.month === null && end.year === null) {
    end = {
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    };
  }
  let yearsX = end.year - start.year;
  let monthsX = end.month - start.month + 1;
  if (monthsX < 0) {
    yearsX--;
    monthsX = Math.abs(12 - start.month - end.month - 1);
  }
  return { years: yearsX, months: monthsX };
}
