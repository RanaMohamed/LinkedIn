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
  const start = formGroup.get("start").get("year").value;
  const end = formGroup.get("end").get("year").value;
  return start !== null && end !== null && start > end ? { range: true } : null;
};

export function getDateDifference(start: DateData, end: DateData) {
  const val =
    end.month - start.month >= 0
      ? end.year - start.year + " yrs " + (end.month - start.month + 1) + " mos"
      : end.year -
        start.year -
        1 +
        " yrs " +
        Math.abs(12 - start.month - end.month - 1) +
        " mos";
  return val;
}
