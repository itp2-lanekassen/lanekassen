import m from 'moment';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useCalendarContext } from '@/context/CalendarContext';
import classNames from 'classnames';

const CalendarHeader = () => {
  const { setDates, columns } = useCalendarContext();

  const handleWeek = (add = false) => {
    if (add) {
      return setDates((dates) => ({
        from: m(dates.from).add(1, 'w').toISOString(),
        to: m(dates.to).add(1, 'w').toISOString()
      }));
    }

    setDates((dates) => ({
      from: m(dates.from).subtract(1, 'w').toISOString(),
      to: m(dates.to).subtract(1, 'w').toISOString()
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
            'flex items-center justify-center'
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
            'flex items-center justify-center'
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
            'text-primary font-header text-sm text-center',
            'row-start-3 w-full px-0.5 mb-1',
            'overflow-hidden'
          )}
        >
          {date.display}
        </div>
      ))}
    </>
  );
};

export default CalendarHeader;
