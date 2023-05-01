import { useEffect, useState } from 'react';
import { getDatePickerMaxForAbsence, getDisableDates } from './dateHelpers';
import { Absence } from '@/types/interfaces';

const useAbsenceMaxDate = (
  date: Date | undefined,
  absences: Absence[] | undefined,
  activeAbsence?: Absence
) => {
  const [maxToDate, setMaxToDate] = useState<Date>();
  const [disabledDates, setDisabledDates] = useState<Date[]>();

  useEffect(() => {
    if (!date) return;

    //set max on datepicker state based on when the next absence starts
    const datePickerMax = getDatePickerMaxForAbsence(date, absences || []);

    setMaxToDate(datePickerMax);
  }, [activeAbsence, absences, date]);

  useEffect(() => {
    // get all absence dates in array
    setDisabledDates(getDisableDates(absences || [], activeAbsence?.absenceId));
  }, [absences, activeAbsence]);

  return { maxToDate, disabledDates };
};

export default useAbsenceMaxDate;
