import { getDepartmentById } from '@/API/DepartmentAPI';
import { getSectionById } from '@/API/SectionAPI';
import { Department, EmploymentType, Section, User } from '@/types/types';
import { useEffect, useState } from 'react';

// copied from UserDropdown
const formatName = (name: string) => {
  return name
    .split(' ')
    .map((n, i, arr) => {
      // if first or last name, return whole name
      if (i === 0 || i === arr.length - 1) return n;

      // return first character in uppercase with . after
      return n[0].toUpperCase() + '.';
    })
    .join(' ');
};

export default function UserRow(props: { user: User }) {
  const [department, setDepartment] = useState<Department>();
  const [section, setSection] = useState<Section>();
  const [teams, setTeams] = useState<string[]>();
  const [roles, setRoles] = useState<string[]>();
  const [subjectFields, setSubjectFields] = useState<string[]>();
  const [employmentType, setEmploymentType] = useState<string>('');
  const [admin, setAdmin] = useState<string>('');

  async function loadUserData() {
    const listTeam: string[] = [];
    const listSubjectField: string[] = [];
    const listRole: string[] = [];

    setDepartment((await getDepartmentById(props.user.departmentId)).data);
    setSection((await getSectionById(props.user.sectionId)).data);

    props.user.teams?.forEach((team) => listTeam.push(team.name));
    setTeams(listTeam);

    props.user.subjectFields?.forEach((subjectField) => listSubjectField.push(subjectField.name));
    setSubjectFields(listSubjectField);

    props.user.roles?.forEach((role) => listRole.push(role.name));
    setRoles(listRole);

    setEmploymentType(EmploymentType[props.user.employmentType]);

    setAdmin(props.user.admin ? 'X' : '');
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <tr>
      <td>{props.user.firstName}</td>
      <td>{props.user.lastName}</td>
      <td>{props.user.email}</td>
      <td>{admin}</td>
      <td>{employmentType}</td>
      <td>{department?.name}</td>
      <td>{section?.name}</td>
      <td>{subjectFields?.join(', ')}</td>
      <td>{teams?.join(', ')}</td>
      <td>{roles?.join(', ')}</td>
    </tr>
  );
}
