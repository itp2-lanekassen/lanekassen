export const backendUrl = 'https://localhost:7184';

export interface User {
  id: number;
  azureId: string;
  firstName: string;
  lastName: string;
  email: string;
  employmentType: number; // EmploymentType;
  admin: boolean;
  sectionId: number;
  //section: Section;
  absences?: Absence[];
  subjectFields?: SubjectField[];
  roles?: Role[];
  teams?: Team[];
}

export interface NewUser {
  azureId: string;
  firstName: string;
  lastName: string;
  email: string;
  employmentType: number; // EmploymentType;
  admin: boolean;
  sectionId: number;
  //section: Section;
  absences?: Absence[];
  subjectFields: SubjectField[];
  roles?: Role[];
  teams?: Team[];
}

/*  Må være på dette formatet for å poste ny bruker
{
  "azureId": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "employmentType": 0,
  "admin": true,
  "sectionId": 0,
  "subjectFields": [
    0
  ],
  "roles": [
    0
  ],
  "teams": [
    0
  ],
  "absences": [
    0
  ]
} */

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
  departments: Department[];
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
