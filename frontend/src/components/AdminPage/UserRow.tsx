import { getDepartmentById } from '@/API/DepartmentAPI';
import { getSectionById } from '@/API/SectionAPI';
import { deleteUser } from '@/API/UserAPI';
import { EmploymentType, User } from '@/types/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ConfirmationBox from '../ConfirmationBox';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import UserSelectedView from './UserSelectedView';
import { useState } from 'react';

/**
 * @param props takes in a user passed down from user tab on admin page
 * @returns table row with user data filled into table cells
 */
export default function UserRow(props: {
  user: User;
  setView: React.Dispatch<React.SetStateAction<JSX.Element>>;
}) {
  const queryClient = useQueryClient();
  const { data: department } = useQuery(
    [`dep-${props.user.userId}`],
    async () => (await getDepartmentById(props.user.departmentId)).data
  );
  const { data: section } = useQuery(
    [`sec-${props.user.userId}`],
    async () => (await getSectionById(props.user.sectionId)).data
  );

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
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // When a user is deleted, the list of users reloads
  const handleDeleteProfileClick = (result: boolean) => {
    if (result) {
      deleteUser(props.user?.userId).then(async () => {
        queryClient.invalidateQueries(['users']);
      });
    }
  };

  return (
    <>
      <p className="flex-1 text-left ml-3 xl:ml-12">{formatFirstName(props.user.firstName)}</p>
      <p className="flex-1 text-left ml-3 xl:ml-12">{props.user.lastName}</p>
      <p className="flex-1 text-left ml-3 xl:ml-8 hidden md:block">
        {EmploymentType[props.user.employmentType]}
      </p>
      <p className="flex-1 text-left  xl:ml-12">{department?.name}</p>
      <p className="flex-1 text-left ml-3 hidden md:block">{section?.name}</p>
      <EditButton onClick={handleEdit} />
      <DeleteButton onClick={() => setOpenDialog(true)} />
      {openDialog && (
        <div className="flex justify-between items-center">
          <ConfirmationBox
            confirmationText="Er du sikker på at du vil slette brukeren?"
            isOpen={openDialog}
            onConfirm={handleDeleteProfileClick}
          />
        </div>
      )}
    </>
  );
}
