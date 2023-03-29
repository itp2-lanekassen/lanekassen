import { getAllAbsenceTypes } from '../API/AbsenceTypeAPI';
import { getAllDepartments } from '../API/DepartmentAPI';
import { getAllRoles } from '../API/RoleAPI';
import { getAllSections } from '../API/SectionAPI';
import { getAllSubjectFields } from '../API/SubjectFieldAPI';
import { getAllTeams } from '../API/TeamAPI';
import {
  AbsenceType,
  Department,
  Holiday,
  Role,
  Section,
  SubjectField,
  Team
} from '../types/types';
import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useState } from 'react';
import { getHolidaysByYear } from '@/API/HolidaysAPI';

interface GlobalContextProps {
  children?: ReactNode;
}

interface GlobalContextType {
  absenceTypes: AbsenceType[];
  roles: Role[];
  teams: Team[];
  sections: Section[];
  departments: Department[];
  subjectFields: SubjectField[];
  holidays: Holiday[];
  handleYearChange: (year: number) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const ctx = useContext(GlobalContext);

  if (!ctx) throw new Error('GlobalContext must be used within its provider');

  return ctx;
};

const GlobalContextProvider = ({ children }: GlobalContextProps) => {
  const absenceTypes = useQuery(['absence-types'], async () => (await getAllAbsenceTypes()).data);
  const roles = useQuery(['roles'], async () => (await getAllRoles()).data);
  const teams = useQuery(['teams'], async () => (await getAllTeams()).data);
  const sections = useQuery(['sections'], async () => (await getAllSections()).data);
  const departments = useQuery(['departments'], async () => (await getAllDepartments()).data);
  const subjectFields = useQuery(
    ['subject-fields'],
    async () => (await getAllSubjectFields()).data
  );
  const [year, setYear] = useState(new Date().getFullYear());
  const holidays = useQuery(
    ['holidays', year],
    async () => (await getHolidaysByYear(year)).data.data // gir feilmedling, men er riktig
  );

  const handleYearChange = (newYear: number) => {
    if (newYear !== year) setYear(newYear);
  };

  // TODO: Single return or individual?
  if (absenceTypes.isLoading) return <div>Laster fraværstyper...</div>;
  if (roles.isLoading) return <div>Laster roller...</div>;
  if (teams.isLoading) return <div>Laster team...</div>;
  if (sections.isLoading) return <div>Laster seksjoner...</div>;
  if (departments.isLoading) return <div>Laster avdelinger...</div>;
  if (subjectFields.isLoading) return <div>Laster fagfelt...</div>;
  if (holidays.isLoading) return <div>Laster høytider...</div>;

  if (
    absenceTypes.isError ||
    roles.isError ||
    teams.isError ||
    sections.isError ||
    departments.isError ||
    subjectFields.isError ||
    holidays.isError
  )
    return <div>Error :/</div>;

  return (
    <GlobalContext.Provider
      value={{
        absenceTypes: absenceTypes.data,
        roles: roles.data,
        teams: teams.data,
        sections: sections.data,
        departments: departments.data,
        subjectFields: subjectFields.data,
        holidays: holidays.data,
        handleYearChange
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
