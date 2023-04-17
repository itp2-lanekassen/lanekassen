import m from 'moment';
import { UseInfiniteQueryResult, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
  startTransition
} from 'react';
import { filterUsers } from '@/API/UserAPI';
import { Holiday, PageResponse, User, UserFilter } from '@/types/types';
import { getHolidaysByYear } from '@/API/HolidaysAPI';
import { useUserContext } from './UserContext';
import calculateColumns, { Columns } from './calendarContextHelpers/calculateColumns';
import useViewport from './calendarContextHelpers/useViewport';
import getNumberOfWeeks from './calendarContextHelpers/getNumberOfWeeks';

interface Dates {
  from: string;
  to: string;
}

interface CalendarContextType {
  dates: Dates;
  setDates: Dispatch<SetStateAction<Dates>>;
  updateFromDate: (date: string) => void;
  queryResult: UseInfiniteQueryResult<PageResponse<User>, unknown>;
  columns: Columns;
  holidays?: Holiday[];
  filter: UserFilter;
  setFilter: Dispatch<SetStateAction<UserFilter>>;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (!context) throw new Error('CalendarContext must be used within its provider');

  return context;
};

const CalendarContextProvider = ({ children }: { children: ReactNode }) => {
  const currentUser = useUserContext();

  const [numberOfWeeks, setNumberOfWeeks] = useState(getNumberOfWeeks(window.innerWidth));

  useViewport({
    onWidthChange: (w) => setNumberOfWeeks(getNumberOfWeeks(w))
  });

  const [dates, setDates] = useState({
    from: m().startOf('isoWeek').toISOString(),
    to: m().startOf('isoWeek').add(numberOfWeeks, 'w').subtract(1, 'd').toISOString()
  });

  const updateFromDate = (newDate: string) => {
    const daysDiff = Math.abs(m(dates.from).diff(m(dates.to), 'd'));

    setDates({
      from: newDate,
      to: m(newDate).add(daysDiff, 'd').toISOString()
    });
  };

  useEffect(() => {
    startTransition(() => {
      setDates((d) => ({
        ...d,
        to: m(d.from).add(numberOfWeeks, 'w').subtract(1, 'd').toISOString()
      }));
    });
  }, [numberOfWeeks]);

  const { data: holidays } = useQuery(
    ['holidays', { year: m(dates.from).year() }],
    async () => (await getHolidaysByYear(m(dates.from).year())).data.data
  );

  const [columns, setColumns] = useState<Columns>({ weeks: {}, months: {}, days: [] });

  useEffect(() => {
    startTransition(() => {
      // ## Calculate calendar columns
      setColumns(calculateColumns(dates.from, dates.to));
    });
  }, [dates]);

  const [filter, setFilter] = useState<UserFilter>({
    departments: [currentUser.departmentId],
    sections: [],
    teams: [],
    roles: [],
    subjectFields: []
  });

  const queryResult = useInfiniteQuery(
    ['users', { filter }],
    async ({ pageParam = 1 }) =>
      (
        await filterUsers({
          page: pageParam,
          excludeIds: [currentUser.userId],
          ...filter
        })
      ).data,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page >= lastPage.totalPages) return undefined;

        return lastPage.page + 1;
      }
    }
  );

  return (
    <CalendarContext.Provider
      value={{
        dates,
        setDates,
        updateFromDate,
        queryResult,
        columns,
        holidays,
        filter,
        setFilter
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarContextProvider;
