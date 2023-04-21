import { isAfter, isWeekend, format, add } from 'date-fns';
import { nb } from 'date-fns/locale';

export type Columns = {
  months: Record<string, number>;
  weeks: Record<string, number>;
  days: { value: string; display: string; week: number }[];
};

export default function calculateColumns(fromDate: string, toDate: string) {
  // make copies of current from and to date
  let currentDay = new Date(fromDate);
  const lastDay = new Date(toDate);

  // columns is an object where key is 'Uke xx' and value is an array of days
  const cols: Columns = {
    weeks: {},
    months: {},
    days: []
  };

  while (!isAfter(currentDay, lastDay)) {
    // exclude weekends
    if (!isWeekend(currentDay)) {
      // add the name of the month and increment its count to determine colSpan
      const month = format(currentDay, 'MMMM', { locale: nb });
      if (!cols.months[month]) cols.months[month] = 0;
      cols.months[month]++;

      // format date to isoWeek with the text 'Uke' in front
      // increment is count to determine colSpan
      const week = `Uke ${format(currentDay, 'I')}`;
      if (!cols.weeks[week]) cols.weeks[week] = 0;
      cols.weeks[week]++;

      // push the day to the days array
      cols.days.push({
        value: currentDay.toISOString(),
        display: format(currentDay, 'd'),
        week: Number(format(currentDay, 'I'))
      });
    }

    // advance day by one
    currentDay = add(currentDay, { days: 1 });
  }

  return cols;
}
