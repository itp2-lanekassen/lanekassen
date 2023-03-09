import { createContext, useContext, useEffect, useState } from 'react';
import m from 'moment';
import { useQuery } from '@tanstack/react-query';
import { User } from '../types/types';
import { getAllUsers } from '../API/UserAPI';
import { useUserContext } from '../context/UserContext';
import CalendarRow from '../components/CalendarRow';
import { ArrowForward, ArrowBack } from '@mui/icons-material';

export type Column = Record<number, string[]>;

interface FilterContextType {
  fromDate: string;
  toDate: string;
}

const FilterContext = createContext<FilterContextType>({
  fromDate: '',
  toDate: ''
});

export const useFilterContext = () => useContext(FilterContext);

const CalendarPage = () => {
  const { currentUser } = useUserContext();

  const {
    data: users,
    isLoading,
    isError
  } = useQuery<(User | undefined)[]>(['users'], async () => {
    const res = (await getAllUsers()).data;
    return [...res, ...Array(30 - res.length)];
  });

  // TODO: set somewhere
  // isoWeek is needed to make week start on monday
  const [fromDate, setFromDate] = useState(m().startOf('isoWeek'));

  const [calendarColumns, setCalendarColumns] = useState<Column>({});

  useEffect(() => {
    const currentDay = m(fromDate);
    const toDate = m(fromDate).add(3, 'w').endOf('isoWeek');

    const columns: Column = {};

    while (currentDay < toDate) {
      if (!columns[currentDay.isoWeek()]) columns[currentDay.isoWeek()] = [];
      if (!currentDay.format('ddd').match(/Sat|Sun/)) {
        columns[currentDay.isoWeek()].push(currentDay.format('DD.MM.YY'));
      }
      currentDay.add(1, 'd');
    }

    setCalendarColumns(columns);
  }, [fromDate]);

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt</div>;

  // TODO: better way of doing this?
  return (
    <main className="grid place-items-center p-10">
      <div className="calendar-view">
        <button className="rounded-full bg-secondary-light px-3 py-1 text-sm text-white row-span-2 row-start-1 whitespace-nowrap mb-1 mr-4 text-center">
          Se din fraværsoversikt
        </button>
        {Object.entries(calendarColumns).map(([isoWeek, days], i) => (
          <div key={isoWeek} className="contents">
            <h6 className="col-span-5 row-start-1 w-full bg-primary-light text-white text-center relative flex items-center justify-center">
              {i === 0 && (
                <button
                  className="text-sm absolute left-0"
                  onClick={() => setFromDate((d) => m(d).subtract(1, 'w'))}
                >
                  <ArrowBack />
                </button>
              )}
              Uke&nbsp;{isoWeek}
              {i === Object.keys(calendarColumns).length - 1 && (
                <button
                  className="text-sm absolute right-0"
                  onClick={() => setFromDate((d) => m(d).add(1, 'w'))}
                >
                  <ArrowForward />
                </button>
              )}
            </h6>
            {days.map((d) => (
              <div
                key={String(isoWeek) + d}
                className={`font-header text-primary text-xs px-0.5 w-full text-center mb-1 ${
                  i % 2 ? 'bg-card-two-dark' : 'bg-card-one-dark'
                }`}
              >
                {d}
              </div>
            ))}
          </div>
        ))}

        <FilterContext.Provider
          value={{
            fromDate: fromDate.toISOString(),
            toDate: m(fromDate).add(3, 'w').endOf('isoWeek').toISOString()
          }}
        >
          <CalendarRow user={currentUser} isCurrentUser={true} columns={calendarColumns} />

          {/* TODO: filter out logged in user */}
          {users.map((user, i) => (
            <CalendarRow key={user?.userId || i} user={user} columns={calendarColumns} />
          ))}
        </FilterContext.Provider>
      </div>
    </main>
  );
};

export default CalendarPage;
