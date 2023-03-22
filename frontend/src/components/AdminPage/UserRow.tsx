import { getDepartmentById } from '@/API/DepartmentAPI';
import { getSectionById } from '@/API/SectionAPI';
import { Department, EmploymentType, Section, User } from '@/types/types';
import { useEffect, useState } from 'react';

// Format first name to avoid table overflow
const formatFirstName = (name: string) => {
  return name
    .split(' ')
    .map((n, i) => {
      // if first name, return whole name
      if (i === 0) return n;

      // return first character in uppercase with . after
      return n[0].toUpperCase() + '.';
    })
    .join(' ');
};

/**
 * @param props takes in a user passed down from user tab on admin page
 * @returns table row with user data filled into table cells
 */
export default function UserRow(props: { user: User }) {
  const [department, setDepartment] = useState<Department>();
  const [section, setSection] = useState<Section>();
  const [employmentType, setEmploymentType] = useState<string>('');

  // Load user data into states
  async function loadUserData() {
    setDepartment((await getDepartmentById(props.user.departmentId)).data);
    setSection((await getSectionById(props.user.sectionId)).data);
    setEmploymentType(EmploymentType[props.user.employmentType]);
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <tr className="hover:bg-primary-lighter">
      <td className="p-3 pr-5">{formatFirstName(props.user.firstName)}</td>
      <td className="p-3 pr-5">{props.user.lastName}</td>
      <td className="p-3 pr-5">{props.user.email}</td>
      <td className="p-3 pr-5">{employmentType}</td>
      <td className="p-3 pr-5">{department?.name}</td>
      <td className="p-3 pr-5">{section?.name}</td>
    </tr>
  );
}
