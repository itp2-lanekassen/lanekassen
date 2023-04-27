import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useCalendarContext } from '@/context/CalendarContext';
import classNames from 'classnames';
import { add, sub } from 'date-fns';

const CalendarHeader = () => {
  const { setDates, columns } = useCalendarContext();

  const handleWeek = (addWeek = false) => {
    if (addWeek) {
      return setDates((dates) => ({
        from: add(new Date(dates.from), { weeks: 1 }).toISOString(),
        to: add(new Date(dates.to), { weeks: 1 }).toISOString()
      }));
    }

    setDates((dates) => ({
      from: sub(new Date(dates.from), { weeks: 1 }).toISOString(),
      to: sub(new Date(dates.to), { weeks: 1 }).toISOString()
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
          {length > 2 && week}
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
