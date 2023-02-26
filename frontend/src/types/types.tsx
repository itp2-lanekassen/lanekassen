export const backendUrl = 'https://localhost:7184';

export interface User {
  azureId: string;
  firstName: string;
  lastName: string;
  email: string;
  employmentType: number;
  admin: boolean;
  sectionId: number;
  subjectField: string;
  roles: Role[];
  teams: Team[];
  absences: Absence[];
}

export interface Absence {
  id: number;
  startDate: Date;
  endDate: Date;
  comment: string;
  userId: number;
  absenceTypeId: number;
}

export interface AbsenceType {
  id: number;
  name: string;
  code: string;
  colorCode: string;
  absences: Absence[];
}

export interface Section {
  id: number;
  name: string;
  users: User[];
  departmentId: number;
}

export interface Department {
  id: number;
  name: string;
  abbreviation: string;
  sections: Section[];
  subjectFields: SubjectField[];
}

export interface SubjectField {
  id: number;
  name: string;
  departments: Department[];
  users: User[];
}

export interface Role {
  id: number;
  name: string;
  users: User[];
}

export interface Team {
  id: number;
  name: string;
  users: User[];
}
