import m from 'moment';
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
  useEffect
} from 'react';

interface CalendarContextProps {
  children: ReactNode;
}

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
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (!context) throw new Error('CalendarContext must be used within its provider');

  return context;
};

const CalendarContextProvider = ({ children }: CalendarContextProps) => {
  const [fromDate, setFromDate] = useState(m().startOf('isoWeek').toISOString());
  const [toDate, setToDate] = useState(m().add(3, 'w').endOf('isoWeek').toISOString());

  useEffect(() => {
    if (m(fromDate).isSameOrAfter(m(toDate))) {
      setToDate(m(fromDate).add(4, 'w').subtract(1, 'd').toISOString());
    }

    if (m(toDate).isSameOrBefore(m(fromDate))) {
      setFromDate(m(toDate).subtract(4, 'w').add(1, 'd').toISOString());
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    console.log(m(fromDate).format('DD.MM'), m(toDate).format('DD.MM'));
  }, [fromDate, toDate]);

  const [departments, setDepartments] = useState<number[]>([]);
  const [sections, setSections] = useState<number[]>([]);
  const [teams, setTeams] = useState<number[]>([]);
  const [roles, setRoles] = useState<number[]>([]);
  const [subjectFields, setSubjectFields] = useState<number[]>([]);

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
        setSubjectFields
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarContextProvider;
