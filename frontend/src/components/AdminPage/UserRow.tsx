import { getDepartmentById } from '@/API/DepartmentAPI';
import { getSectionById } from '@/API/SectionAPI';
import { deleteUser } from '@/API/UserAPI';
import { Department, EmploymentType, Section, User } from '@/types/types';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import UserSelectedView from './UserSelectedView';

/**
 * @param props takes in a user passed down from user tab on admin page
 * @returns table row with user data filled into table cells
 */
export default function UserRow(props: {
  user: User;
  setView: React.Dispatch<React.SetStateAction<JSX.Element>>;
}) {
  const [department, setDepartment] = useState<Department>();
  const [section, setSection] = useState<Section>();
  const [employmentType, setEmploymentType] = useState<string>('');
  const [email, setEmail] = useState<string>(props.user.email);
  const queryClient = useQueryClient();

  // To edit a user, change view to the display of a chosen user's information
  const handleEdit = async () => {
    props.setView(<UserSelectedView setView={props.setView} selectedUser={props.user} />);
  };

  // Format first name to avoid table overflow. Last name isn't formatted because a user can ony have one last name
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

  // When a user is deleted, the list of users reloads
  const handleDeleteProfileClick = () => {
    const confirmDelete = confirm('Er du sikker på at du vil slette denne profilen?');
    if (confirmDelete) {
      deleteUser(props.user.userId).then(async () => {
        queryClient.invalidateQueries(['users']);
      });
    }
  };

  useEffect(() => {
    // Load user data into states
    async function loadUserData() {
      setDepartment((await getDepartmentById(props.user.departmentId)).data);
      setSection((await getSectionById(props.user.sectionId)).data);
      setEmploymentType(EmploymentType[props.user.employmentType]);

      if (email.length > 20) {
        const shorterEmail = email.slice(0, 20) + '...';
        setEmail(shorterEmail);
      }
    }

    loadUserData();
  }, [props.user, email]);

  return (
    <>
      <p className="flex-1">{formatFirstName(props.user.firstName)}</p>
      <p className="flex-1">{props.user.lastName}</p>
      <p className="flex-1 hidden md:block">{email}</p>
      <p className="flex-1 hidden md:block">{employmentType}</p>
      <p className="flex-1">{department?.name}</p>
      <p className="flex-1 hidden md:block">{section?.name}</p>
      <div className="w-[24px] h-[24px]">
        <EditButton onClick={handleEdit} />
      </div>
      <div className="w-[24px] h-[24px]">
        <DeleteButton onClick={handleDeleteProfileClick} />
      </div>
    </>
  );
}
