import { useFilterContext } from '@/context/FilterContext';
import { useGlobalContext } from '@/context/GlobalContext';
import { Column } from '@/pages/CalendarPage';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import m from 'moment';
import { Fragment, useEffect } from 'react';

interface CalendarHeaderProps {
  columns: Column;
}

const CalendarHeader = ({ columns }: CalendarHeaderProps) => {
  const { fromDate, setFromDate } = useFilterContext();
  const { handleYearChange } = useGlobalContext();

  useEffect(() => {
    handleYearChange(m(fromDate).year());
  }, [fromDate]);

  return (
    <>
      <h6 className="row-start-1 col-span-20 w-full bg-primary-light text-white text-center flex justify-between items-center">
        <button
          className="text-sm"
          onClick={() =>
            setFromDate((d) => m(d).subtract(1, 'y').startOf('isoWeek').add(1, 'w').toISOString())
          }
        >
          <ArrowBack className="hover:scale-115" />
        </button>
        {m(fromDate).year()}
        <button
          className="text-sm"
          onClick={() => setFromDate((d) => m(d).add(1, 'y').startOf('isoWeek').toISOString())}
        >
          <ArrowForward className="hover:scale-115" />
        </button>
      </h6>
      {Object.entries(columns).map(([week, days], i) => (
        <Fragment key={week}>
          <h6 className="col-span-5 row-start-2 w-full bg-primary-light text-white text-center relative flex items-center justify-center">
            {i === 0 && (
              <button
                className="text-sm absolute left-0"
                onClick={() => setFromDate((d) => m(d).subtract(1, 'w').toISOString())}
              >
                <ArrowBack className="hover:scale-115" />
              </button>
            )}
            {week}
            {i === Object.keys(columns).length - 1 && (
              <button
                className="text-sm absolute right-0"
                onClick={() => setFromDate((d) => m(d).add(1, 'w').toISOString())}
              >
                <ArrowForward className="hover:scale-115" />
              </button>
            )}
          </h6>
          {days.map((date) => (
            <div
              key={week + date.value}
              className={`font-header text-primary text-sm px-0.5 w-full text-center mb-1 ${
                i % 2 ? 'bg-card-two-dark' : 'bg-card-one-dark'
              }`}
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
