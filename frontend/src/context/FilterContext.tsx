import m from 'moment';
import { ReactNode, createContext, useContext, useState, SetStateAction, Dispatch } from 'react';

interface FilterContextProps {
  children: ReactNode;
}

interface FilterContextType {
  fromDate: string;
  setFromDate: Dispatch<SetStateAction<string>>;
  toDate: string;
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

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = () => {
  const context = useContext(FilterContext);

  if (!context) throw new Error('FilterContext must be used within its provider');

  return context;
};

const FilterContextProvider = ({ children }: FilterContextProps) => {
  // TODO: set values from fitler options
  // isoWeek is needed to make week start on monday
  const [fromDate, setFromDate] = useState(m().startOf('isoWeek').toISOString());

  const [departments, setDepartments] = useState<number[]>([]);
  const [sections, setSections] = useState<number[]>([]);
  const [teams, setTeams] = useState<number[]>([]);
  const [roles, setRoles] = useState<number[]>([]);
  const [subjectFields, setSubjectFields] = useState<number[]>([]);

  return (
    <FilterContext.Provider
      value={{
        fromDate: fromDate,
        setFromDate,
        toDate: m(fromDate).add(3, 'w').endOf('isoWeek').toISOString(),
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
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
