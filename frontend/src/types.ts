export interface Role {
  roleId: number;
  name: string;
  users?: User[];
}

export interface Team {
  teamId: number;
  name: string;
  users?: User[];
}

export interface SubjectField {
  subjectFieldId: number;
  name: string;
  departments?: Department[];
}

export interface Absence {
  absenceId: number;
  startDate: string; // 0001-01-01T00:00:00
  endDate: string;
  absenceTypeId: number;
  type: AbsenceType;
  userId: number;
  user?: User;
  comment?: string;
}

export interface Department {
  departmentId: number;
  name: string;
  abbreviation: string;
  subjectFields?: SubjectField[];
  sections?: Section[];
}

export interface Section {
  sectionId: number;
  name: string;
  users?: User[];
  departments?: Department[];
}

export interface AbsenceType {
  absenceTypeId: number;
  name: string;
  code: string;
  colorCode: string;
  absences?: Absence[];
}

export interface User {
  userId: number;
  azureId: string;
  firstName: string;
  lastName: string;
  email: string;
  employmentType: EmploymentType;
  admin: boolean;
  sectionId: number;
  section?: Section;
  absences: Absence[];
  subjectFields: SubjectField[];
  roles: Role[];
  teams: Team[];
}

export enum EmploymentType {
  Ansatt,
  Konsulent
}
