export const backendUrl = 'https://localhost:7184';

export interface User {
  id: number;
  azureId: string;
  firstName: string;
  lastName: string;
  email: string;
  employmentType: EmploymentType;
  admin: boolean;
  sectionId: number;
  section: Section;
  absences?: Absence[];
  subjectField: SubjectField[];
  roles?: Role[];
  teams?: Team[];
}

export interface Absence {
  id: number;
  startDate: Date;
  endDate: Date;
  comment: string;
  userId: number;
  user: User;
  absenceTypeId: number;
  absenceType: AbsenceType;
}

export interface AbsenceType {
  id: number;
  name: string;
  code: string;
  colorCode: string;
  absences?: Absence[];
}

export interface Section {
  id: number;
  name: string;
  users?: User[];
  departmentId: number;
  department: Department[];
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
  departmentid: number;
  departments: Department[];
  users?: User[];
}

export interface Role {
  id: number;
  name: string;
  users?: User[];
}

export interface Team {
  id: number;
  name: string;
  users?: User[];
}

export interface EmploymentType {
  id: number;
}
