import { getDepartmentById } from '@/API/DepartmentAPI';
import { getSectionById } from '@/API/SectionAPI';
import { deleteUser } from '@/API/UserAPI';
import { EmploymentType, User } from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import UserSelectedView from './UserSelectedView';
import { useModalContext } from '@/context/ModalContext';
import { useUserContext } from '@/context/UserContext';

/**
 * @param props takes in a user passed down from user tab on admin page
 * @returns table row with user data filled into table cells
 */
export default function UserRow(props: {
  user: User;
  setView: React.Dispatch<React.SetStateAction<JSX.Element>>;
}) {
  const queryClient = useQueryClient();
  const currentUser = useUserContext();
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
  const { openConfirmationBox, openMessageBox } = useModalContext();
  const { mutate: deleteExistingUser } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);

      if (props.user.userId === currentUser.userId) {
        queryClient.invalidateQueries(['current-user']);
      }
    },
    onError: () => openMessageBox('Brukeren kunne ikke slettes. Prøv igjen senere.')
  });

  return (
    <>
      <p className="flex-1 text-left ml-3 xl:ml-12">{formatFirstName(props.user.firstName)}</p>
      <p className="flex-1 text-left ml-3 xl:ml-10">{props.user.lastName}</p>
      <p className="flex-1 text-left ml-3 xl:ml-6 hidden md:block">
        {EmploymentType[props.user.employmentType]}
      </p>
      <p className="flex-1 text-left  xl:ml-12">{department?.name}</p>
      <p className="flex-1 text-left ml-3 hidden md:block">{section?.name}</p>
      <EditButton onClick={handleEdit} />
      <DeleteButton
        onClick={() =>
          openConfirmationBox(
            () => deleteExistingUser(props.user.userId),
            'Er du sikker på at du vil sletter brukeren?'
          )
        }
      />
    </>
  );
}
