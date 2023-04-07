import m from 'moment';
import { UseInfiniteQueryResult, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
  useEffect
} from 'react';
import { filterUsers } from '@/API/UserAPI';
import { Holiday, PageResponse, User } from '@/types/types';
import { useUserContext } from './UserContext';
import { getHolidaysByYear } from '@/API/HolidaysAPI';

type Columns = Record<string, { display: string; value: string }[]>;

interface CalendarContextType {
  fromDate: string;
  setFromDate: Dispatch<SetStateAction<string>>;
  toDate: string;
  setToDate: Dispatch<SetStateAction<string>>;
  departments: number[];
  setDepartments: Dispatch<SetStateAction<number[]>>;
  sections: number[];
  setSections: Dispatch<SetStateAction<number[]>>;
  teams: number[];
  setTeams: Dispatch<SetStateAction<number[]>>;
  roles: number[];
  setRoles: Dispatch<SetStateAction<number[]>>;
  subjectFields: number[];
  setSubjectFields: Dispatch<SetStateAction<number[]>>;
  queryResult: UseInfiniteQueryResult<PageResponse<User>, unknown>;
  columns: Columns;
  holidays?: Holiday[];
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (!context) throw new Error('CalendarContext must be used within its provider');

  return context;
};

const CalendarContextProvider = ({ children }: { children: ReactNode }) => {
  const currentUser = useUserContext();

  const [fromDate, setFromDate] = useState(m().startOf('isoWeek').toISOString());
  const [toDate, setToDate] = useState(m().add(3, 'w').endOf('isoWeek').toISOString());

  const { data: holidays } = useQuery(
    ['holidays', { year: m(fromDate).year() }],
    async () => (await getHolidaysByYear(m(fromDate).year())).data.data
  );

  const [columns, setColumns] = useState<Columns>({});

  useEffect(() => {
    // return when we need to update to prevent early rerender
    if (m(fromDate).isSameOrAfter(m(toDate))) {
      return setToDate(m(fromDate).add(4, 'w').subtract(1, 'd').toISOString());
    }

    if (m(toDate).isSameOrBefore(m(fromDate))) {
      return setFromDate(m(toDate).subtract(4, 'w').add(1, 'd').toISOString());
    }

    const currentDay = m(fromDate);
    const lastDay = m(toDate);

    const cols: Columns = {};

    while (currentDay.isSameOrBefore(lastDay)) {
      // Format date to isoWeek with the text 'Uke' in front
      const key = currentDay.format('[Uke] WW');

      // only include weekdays
      if (!currentDay.format('ddd').match(/Sat|Sun/)) {
        if (!cols[key]) cols[key] = [];

        // push the date in locale format (DD.MM or MM/DD) to the current week
        cols[key].push({
          display: currentDay.toDate().toLocaleDateString(undefined, {
            month: 'numeric',
            day: 'numeric'
          }),
          value: currentDay.toISOString()
        });
      }

      // advance day by one
      currentDay.add(1, 'd');
    }

    setColumns(cols);
  }, [fromDate, toDate]);

  const [departments, setDepartments] = useState<number[]>([]);
  const [sections, setSections] = useState<number[]>([]);
  const [teams, setTeams] = useState<number[]>([]);
  const [roles, setRoles] = useState<number[]>([]);
  const [subjectFields, setSubjectFields] = useState<number[]>([]);

  const queryResult = useInfiniteQuery(
    ['users', { departments, sections, teams, roles, subjectFields }],
    async ({ pageParam = 1 }) =>
      (
        await filterUsers({
          page: pageParam,
          excludeIds: [currentUser.userId],
          departments,
          sections,
          teams,
          roles,
          subjectFields
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
        fromDate: fromDate,
        setFromDate,
        toDate,
        setToDate,
        departments,
        setDepartments,
        sections,
        setSections,
        teams,
        setTeams,
        roles,
        setRoles,
        subjectFields,
        setSubjectFields,
        queryResult,
        columns,
        holidays
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarContextProvider;
