import { createContext, ReactNode, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AbsenceType, Department, Role, Section, SubjectField, Team } from '@/types/interfaces';
import { getAllAbsenceTypes } from '@/api/absenceType';
import { getAllDepartments } from '@/api/department';
import { getAllRoles } from '@/api/role';
import { getAllSections } from '@/api/section';
import { getAllSubjectFields } from '@/api/subjectField';
import { getAllTeams } from '@/api/team';

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
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const ctx = useContext(GlobalContext);

  if (!ctx) throw new Error('GlobalContext must be used within its provider');

  return ctx;
};

const GlobalContextProvider = ({ children }: GlobalContextProps) => {
  const absenceTypes = useQuery(['absenceTypes'], async () => (await getAllAbsenceTypes()).data);
  const roles = useQuery(['roles'], async () => (await getAllRoles()).data);
  const teams = useQuery(['teams'], async () => (await getAllTeams()).data);
  const sections = useQuery(['sections'], async () => (await getAllSections()).data);
  const departments = useQuery(['departments'], async () => (await getAllDepartments()).data);
  const subjectFields = useQuery(
    ['subject-fields'],
    async () => (await getAllSubjectFields()).data
  );

  // TODO: Single return or individual?
  if (absenceTypes.isLoading) return <div>Laster fraværstyper...</div>;
  if (roles.isLoading) return <div>Laster roller...</div>;
  if (teams.isLoading) return <div>Laster team...</div>;
  if (sections.isLoading) return <div>Laster seksjoner...</div>;
  if (departments.isLoading) return <div>Laster avdelinger...</div>;
  if (subjectFields.isLoading) return <div>Laster fagområde...</div>;

  if (
    absenceTypes.isError ||
    roles.isError ||
    teams.isError ||
    sections.isError ||
    departments.isError ||
    subjectFields.isError
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
        subjectFields: subjectFields.data
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
