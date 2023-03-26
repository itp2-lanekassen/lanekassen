import { deleteRole, getAllRoles } from '@/API/RoleAPI';
import { Role } from '@/types/types';
import { Add } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import SubmitButton from '../SubmitButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import ErrorAlert from '../Alert';

interface RoleListProps {
  setEdit: (val: boolean, role?: Role) => void;
}

const RoleList = ({ setEdit }: RoleListProps) => {
  const queryClient = useQueryClient();
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState('');

  const {
    isLoading,
    isError,
    data: roles
  } = useQuery(['roles'], async () => (await getAllRoles()).data);

  const { mutate: deleteExistingRole } = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => queryClient.invalidateQueries(['roles']),
    onError: (error: Error) => {
      setErrorAlertMessage('En rolle kan ikke være i bruk før den slettes!');
      setErrorAlertOpen(true);
    }
  });

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt</div>;

  return (
    <>
      {errorAlertOpen && <ErrorAlert message={errorAlertMessage} />}
      <div className="grid grid-cols-sections text-center gap-x-2 gap-y-3 place-items-center">
        <div className="heading-3xs">Rolle</div>
        <div className="heading-3xs">Avdelinger</div>
        <div className="col-span-2">
          <SubmitButton handleClick={() => setEdit(true)}>
            <Add />
          </SubmitButton>
        </div>

        <div className="col-span-4 border-b-2 w-full" />

        {roles.map((role) => (
          <Fragment key={role.roleId}>
            <div>{role.name}</div>
            <div>{role.departments?.map((dep) => dep.name).join(', ')}</div>
            <EditButton onClick={() => setEdit(true, role)} />
            <DeleteButton onClick={() => deleteExistingRole(role.roleId)} />
          </Fragment>
        ))}
      </div>
    </>
  );
};
export default RoleList;
