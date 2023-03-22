import { getDepartmentById } from '@/API/DepartmentAPI';
import { getSectionById } from '@/API/SectionAPI';
import { Department, EmploymentType, Section, User } from '@/types/types';
import { useEffect, useState } from 'react';

// copied from UserDropdown
const formatFirstName = (name: string) => {
  return name
    .split(' ')
    .map((n, i) => {
      // if first or last name, return whole name
      if (i === 0) return n;

      // return first character in uppercase with . after
      return n[0].toUpperCase() + '.';
    })
    .join(' ');
};

export default function UserRow(props: { user: User }) {
  const [department, setDepartment] = useState<Department>();
  const [section, setSection] = useState<Section>();
  const [employmentType, setEmploymentType] = useState<string>('');
  const [admin, setAdmin] = useState<string>('');

  async function loadUserData() {
    setDepartment((await getDepartmentById(props.user.departmentId)).data);
    setSection((await getSectionById(props.user.sectionId)).data);

    setEmploymentType(EmploymentType[props.user.employmentType]);

    setAdmin(props.user.admin ? 'X' : '');
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <tr>
      <td className="m-7 p-3">{formatFirstName(props.user.firstName)}</td>
      <td className="m-7 p-3">{props.user.lastName}</td>
      <td className="m-7 p-3">{props.user.email}</td>
      <td className="m-7 p-3">{admin}</td>
      <td className="m-7 p-3">{employmentType}</td>
      <td className="m-7 p-3">{department?.name}</td>
      <td className="m-7 p-3">{section?.name}</td>
    </tr>
  );
}
