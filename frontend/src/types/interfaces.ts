import ConfirmationBox from '../components/ConfirmationBox';
export const backendUrl = 'https://localhost:7184';

export interface Role {
  roleId: number;
  name: string;
  users?: User[];
  departments?: Department[];
}

export interface RoleDTO {
  name: string;
  departments: number[];
}

export interface Team {
  teamId: number;
  name: string;
  users?: User[];
}

export interface TeamDTO {
  name: string;
}

export interface SubjectField {
  subjectFieldId: number;
  name: string;
  departmentId: number;
  department?: Department;
}

export interface SubjectFieldDTO {
  name: string;
  departmentId: number;
}

export interface Section {
  sectionId: number;
  name: string;
  users?: User[];
  departmentId: number;
  department?: Department;
}

export interface SectionDTO {
  name: string;
  departmentId: number;
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
  isApproved: boolean;
}

export interface NewAbsence {
  startDate: string; // 0001-01-01T00:00:00
  endDate: string;
  absenceTypeId: number;
  userId: number;
  comment?: string;
  isApproved: boolean;
}

export interface Department {
  departmentId: number;
  name: string;
  abbreviation: string;
  subjectFields?: SubjectField[];
  sections?: Section[];
}

export interface NewDepartment {
  departmentId?: number;
  name: string;
  abbreviation: string;
  subjectFields?: SubjectField[];
  sections?: Section[];
}

export interface AbsenceType {
  absenceTypeId: number;
  name: string;
  code: string;
  colorCode: string;
  absences?: Absence[];
}

export interface NewAbsenceType {
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
  businessAffiliation: string;
  sectionId: number;
  section?: Section;
  absences?: Absence[];
  subjectFields: SubjectField[];
  roles: Role[];
  teams: Team[];
  departmentId: number;
  department?: Department;
}

export enum EmploymentType {
  Ansatt,
  Konsulent
}

export interface PageResponse<T> {
  page: number;
  size: number;
  totalPages: number;
  data: T[];
}

export interface UserFilter {
  departments: number[];
  sections: number[];
  teams: number[];
  roles: number[];
  subjectFields: number[];
}

export interface NewUser {
  azureId: string;
  firstName: string;
  lastName: string;
  email: string;
  employmentType: EmploymentType;
  admin: boolean;
  businessAffiliation: string;
  sectionId: number;
  departmentId: number;
  subjectFields: number[];
  roles?: number[];
  teams?: number[];
}

export interface Holiday {
  date: string;
  description: string;
}

export interface ConfirmationBox {
  confirmationText: string;
}
