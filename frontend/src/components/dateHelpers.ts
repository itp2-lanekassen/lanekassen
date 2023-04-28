import { Absence } from '@/types/interfaces';
import { add, sub } from 'date-fns';

//return the first startDate of an absence after a specific date, return undefined if there is none
export function getDatePickerMaxForAbsence(date: Date, absences: Absence[]) {
  let returnDate: Date | undefined;
  let earliestDate = date;
  let diff = Infinity;
  absences.map((a) => {
    if (
      date.valueOf() < new Date(a.startDate).valueOf() &&
      new Date(a.startDate).valueOf() - date.valueOf() < diff
    ) {
      earliestDate = sub(new Date(a.startDate), { days: 1 });
      returnDate = earliestDate;
      diff = new Date(a.startDate).valueOf() - new Date(date).valueOf();
    }
  });
  return returnDate;
}

//Return array with all dates that a user has registered an absence
export function getDisableDates(absences: Absence[], activeAbsenceId?: number) {
  const dateArray: Date[] = [];
  absences.forEach((a) => {
    if (a.absenceId == activeAbsenceId) return;

    let tempDate = new Date(a.startDate);
    dateArray.push(tempDate);
    while (
      tempDate.toISOString().split('T')[0] !== new Date(a.endDate).toISOString().split('T')[0]
    ) {
      tempDate = add(tempDate, { days: 1 });
      dateArray.push(tempDate);
    }
  });
  return dateArray;
}
