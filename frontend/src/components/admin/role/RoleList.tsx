import { deleteRole, getAllRoles } from '@/api/role';
import { Role } from '@/types/types';
import { Add } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import SubmitButton from '@/components/SubmitButton';
import DeleteButton from '../DeleteButton';
import EditButton from '../EditButton';
import { useModalContext } from '@/context/ModalContext';

interface RoleListProps {
  setEdit: (val: boolean, role?: Role) => void;
}

const RoleList = ({ setEdit }: RoleListProps) => {
  const queryClient = useQueryClient();
  const { openConfirmationBox, openMessageBox } = useModalContext();

  const {
    isLoading,
    isError,
    data: roles
  } = useQuery(['roles'], async () => (await getAllRoles()).data);

  const { mutate: deleteExistingRole } = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => queryClient.invalidateQueries(['roles']),
    onError: () => openMessageBox('En rolle kan ikke være i bruk før den slettes!')
  });

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt</div>;

  return (
    <>
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
              onClick={() =>
                openConfirmationBox(
                  () => deleteExistingRole(role.roleId),
                  'Er du sikker på at du vil slette denne rollen?'
                )
              }
            />
          </Fragment>
        ))}
      </div>
    </>
  );
};
export default RoleList;
