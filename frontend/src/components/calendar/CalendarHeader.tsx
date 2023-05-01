import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useCalendarContext } from '@/context/CalendarContext';
import classNames from 'classnames';
import { add, differenceInDays, isWeekend } from 'date-fns';

const CalendarHeader = () => {
  const { dates, setDates, columns } = useCalendarContext();

  const handleWeek = (addWeek = false) => {
    const diff = Math.abs(differenceInDays(new Date(dates.from), new Date(dates.to)));

    if (diff < 7) {
      // workaround to ensure correct date range with weekens
      // as datepicker does not allow minimun date ranges
      return setDates((oldDates) => {
        const newFrom = add(new Date(oldDates.from), { days: diff });
        let newTo = newFrom;

        for (let i = 0; i < diff; i++) {
          newTo = add(newTo, { days: 1 });

          while (isWeekend(newTo)) {
            newTo = add(newTo, { days: 1 });
          }
        }

        return {
          from: newFrom.toISOString(),
          to: newTo.toISOString()
        };
      });
    }

    setDates((oldDates) => ({
      from: add(new Date(oldDates.from), { weeks: addWeek ? 1 : -1 }).toISOString(),
      to: add(new Date(oldDates.to), { weeks: addWeek ? 1 : -1 }).toISOString()
    }));
  };

  return (
    <>
      {/* MONTHS */}
      {Object.entries(columns.months).map(([month, length]) => (
        <h6
          key={month}
          className={classNames(
            'bg-primary-light text-primary-contrast text-center whitespace-nowrap',
            'w-full h-full relative row-start-1 py-0.5',
            'flex items-center justify-center',
            'text-sm lg:text-base'
          )}
          style={{
            gridColumn: `span ${length} / span ${length}`
          }}
        >
          {month.substring(0, 1).toUpperCase() + month.substring(1)}
        </h6>
      ))}

      {/* WEEKS */}
      {Object.entries(columns.weeks).map(([week, length], i, arr) => (
        <h6
          key={week}
          className={classNames(
            `col-span-${length} row-start-2`,
            'bg-primary-light text-primary-contrast text-center whitespace-nowrap',
            'w-full h-full relative py-0.5',
            'flex items-center justify-center',
            'text-sm lg:text-base'
          )}
        >
          {i === 0 && (
            <button
              className="text-sm absolute left-0 hover:bg-primary"
              onClick={() => handleWeek()}
            >
              <ArrowBack />
            </button>
          )}
          {/* Show week number if week has more than 2 days or we show less than 3 weeks */}
          {(length > 2 || arr.length < 3) && week}
          {i === arr.length - 1 && (
            <button
              className="text-sm absolute right-0 hover:bg-primary"
              onClick={() => handleWeek(true)}
            >
              <ArrowForward />
            </button>
          )}
        </h6>
      ))}

      {/* DAYS */}
      {columns.days.map((date) => (
        <div
          key={date.value}
          className={classNames(
            date.week % 2 ? 'bg-card-two-dark' : 'bg-card-one-dark',
            'text-primary font-header text-center',
            'row-start-3 w-full px-0.5 mb-1',
            'text-xs lg:text-sm'
          )}
        >
          {date.display}
        </div>
      ))}
    </>
  );
};

export default CalendarHeader;
