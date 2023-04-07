import { Fragment } from 'react';
import m from 'moment';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useCalendarContext } from '@/context/CalendarContext';
import classNames from 'classnames';

const CalendarHeader = () => {
  const { fromDate, setFromDate, setToDate, columns } = useCalendarContext();

  const totalColumns = Object.values(columns).reduce((tot, val) => (tot += val.length), 0);

  const handleWeek = (add = false) => {
    if (add) {
      setFromDate((d) => m(d).add(1, 'w').toISOString());
      setToDate((d) => m(d).add(1, 'w').toISOString());
      return;
    }

    setFromDate((d) => m(d).subtract(1, 'w').toISOString());
    setToDate((d) => m(d).subtract(1, 'w').toISOString());
  };

  const handleYear = (add = false) => {
    if (add) {
      setFromDate((d) => m(d).add(1, 'y').toISOString());
      setToDate((d) => m(d).add(1, 'y').toISOString());
      return;
    }

    setFromDate((d) => m(d).subtract(1, 'y').toISOString());
    setToDate((d) => m(d).subtract(1, 'y').toISOString());
  };

  return (
    <>
      {/* year indicator */}
      <h6
        className={classNames(
          `row-start-1 col-start-2 col-span-${totalColumns}`,
          'bg-primary-light text-white text-center',
          'w-full flex justify-between items-center'
        )}
      >
        <button className="text-sm" onClick={() => handleYear()}>
          <ArrowBack className="hover:scale-115" />
        </button>
        {m(fromDate).year()}
        <button className="text-sm" onClick={() => handleYear(true)}>
          <ArrowForward className="hover:scale-115" />
        </button>
      </h6>

      {/* WEEKS */}
      {Object.entries(columns).map(([week, days], i, arr) => (
        <Fragment key={week}>
          <h6
            className={classNames(
              `col-span-${days.length} row-start-2`,
              'bg-primary-light text-white text-center whitespace-nowrap',
              'w-full h-full relative',
              'flex items-center justify-center'
            )}
          >
            {i === 0 && (
              <button className="text-sm absolute left-0" onClick={() => handleWeek()}>
                <ArrowBack className="hover:scale-115" />
              </button>
            )}
            {days.length > 2 && week}
            {i === arr.length - 1 && (
              <button className="text-sm absolute right-0" onClick={() => handleWeek(true)}>
                <ArrowForward className="hover:scale-115" />
              </button>
            )}
          </h6>
          {/* days */}
          {days.map((date) => (
            <div
              key={week + date.value}
              className={classNames(
                i % 2 ? 'bg-card-two-dark' : 'bg-card-one-dark',
                'text-primary font-header text-sm text-center',
                `row-start-3 w-full px-0.5 mb-1`
              )}
            >
              {date.display}
            </div>
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default CalendarHeader;
