import { getDepartmentById } from '@/API/DepartmentAPI';
import { getSectionById } from '@/API/SectionAPI';
import { deleteUser, getAllUsers } from '@/API/UserAPI';
import { Department, EmploymentType, Section, User } from '@/types/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

/**
 * @param props takes in a user passed down from user tab on admin page
 * @returns table row with user data filled into table cells
 */
export default function UserRow(props: {
  user: User;
  setClickedUser: Dispatch<SetStateAction<number>>;
  handleDeleteUpdate: () => void;
}) {
  const [department, setDepartment] = useState<Department>();
  const [section, setSection] = useState<Section>();
  const [employmentType, setEmploymentType] = useState<string>('');

  // Load user data into states
  async function loadUserData() {
    setDepartment((await getDepartmentById(props.user.departmentId)).data);
    console.log(props.user.departmentId);
    setSection((await getSectionById(props.user.sectionId)).data);
    setEmploymentType(EmploymentType[props.user.employmentType]);
  }
  /*
    useEffect (() => {
      console.log(department);
    }, [department]);*/

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

  // Pass the ID of the selected user to UserTab
  const handleUserClick = () => {
    props.setClickedUser(props.user.userId);
  };

  // When a user is deleted, the list of users reloads
  const handleDeleteProfileClick = () => {
    const confirmDelete = confirm('Er du sikker på at du vil slette denne profilen?');
    if (confirmDelete) {
      deleteUser(props.user!.userId).then(async () => {
        //props.setUsers((await getAllUsers()).data);
        props.handleDeleteUpdate();
      });
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <tr className="">
      <td className="p-3 pr-5">{formatFirstName(props.user.firstName)}</td>
      <td className="p-3 pr-5">{props.user.lastName}</td>
      <td className="p-3 pr-5">{props.user.email}</td>
      <td className="p-3 pr-5">{employmentType}</td>
      <td className="p-3 pr-5">{department?.name}</td>
      <td className="p-3 pr-5">{section?.name}</td>
      <td className="p-3 pr-5">
        <EditButton className={'m-2'} onClick={handleUserClick} />
        <DeleteButton onClick={handleDeleteProfileClick} />
      </td>
    </tr>
  );
}
