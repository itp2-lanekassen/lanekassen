import { deleteRole, getAllRoles } from '@/API/RoleAPI';
import { Role } from '@/types/types';
import { Add } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import ErrorAlert from '../Alert';
import ConfirmationBox from '../ConfirmationBox';
import SubmitButton from '../SubmitButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

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
    onError: () => {
      setErrorAlertMessage('En rolle kan ikke være i bruk før den slettes!');
      setErrorAlertOpen(true);
    }
  });

  const [id, setId] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleDeleteClick = (result: boolean) => {
    if (result) {
      deleteExistingRole(id);
    }
    setOpenDialog(false);
  };

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt</div>;

  return (
    <>
      {errorAlertOpen && <ErrorAlert message={errorAlertMessage} />}
      <div className="grid grid-cols-sections gap-x-2 gap-y-3 items-center">
        <div className="heading-3xs md:ml-20">Rolle</div>
        <div className="heading-3xs text-center">Avdeling</div>
        <div className="col-span-2">
          <SubmitButton handleClick={() => setEdit(true)}>
            <Add />
          </SubmitButton>
        </div>

        <div className="col-span-4 border-b-2 w-full" />

        {roles.map((role) => (
          <Fragment key={role.roleId}>
            <div className="md:ml-20">{role.name}</div>
            <div className="ml-[35%] xl:ml-44 lg:ml-[40%] md:ml-[40%]">
              {role.departments?.map((dep) => dep.name).join(', ')}
            </div>
            <EditButton onClick={() => setEdit(true, role)} />
            <DeleteButton
              onClick={() => {
                setId(role.roleId);
                setOpenDialog(true);
              }}
            />
            {openDialog && (
              <div className="flex justify-between items-center">
                <ConfirmationBox
                  confirmationText="Er du sikker på at du vil slette rollen?"
                  isOpen={openDialog}
                  onConfirm={handleDeleteClick}
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
};
export default RoleList;
