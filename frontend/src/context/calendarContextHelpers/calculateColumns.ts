import m from 'moment';
import 'moment/dist/locale/nb';

export type Columns = {
  months: Record<string, number>;
  weeks: Record<string, number>;
  days: { value: string; display: string; week: number }[];
};

export default function calculateColumns(fromDate: string, toDate: string) {
  // make copies of current from and to date
  const currentDay = m(fromDate).locale('nb');
  const lastDay = m(toDate);

  // columns is an object where key is 'Uke xx' and value is an array of days
  const cols: Columns = {
    weeks: {},
    months: {},
    days: []
  };

  while (currentDay.isSameOrBefore(lastDay)) {
    // only include weekdays
    if (!currentDay.format('ddd').match(/Sat|Sun/)) {
      // add the name of the month and increment its count to determine colSpan
      const month = currentDay.format('MMMM');
      if (!cols.months[month]) cols.months[month] = 0;
      cols.months[month]++;

      // format date to isoWeek with the text 'Uke' in front
      // increment is count to determine colSpan
      const week = currentDay.format('[Uke] W');
      if (!cols.weeks[week]) cols.weeks[week] = 0;
      cols.weeks[week]++;

      // push the date in locale format (DD.MM or MM/DD) to the current week
      cols.days.push({
        value: currentDay.toISOString(),
        display: currentDay.toDate().toLocaleDateString(undefined, {
          month: 'numeric',
          day: 'numeric'
        }),
        week: Number(currentDay.format('W'))
      });
    }

    // advance day by one
    currentDay.add(1, 'd');
  }

  return cols;
}
