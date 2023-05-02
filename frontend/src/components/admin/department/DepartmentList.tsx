import { deleteDepartment, getAllDepartments } from '@/api/department';
import { NewDepartment } from '@/types/interfaces';
import { Add } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import SubmitButton from '@/components/SubmitButton';
import DeleteButton from '../DeleteButton';
import EditButton from '../EditButton';
import { useModalContext } from '@/context/ModalContext';

interface DepartmentListProps {
  setEdit: (val: boolean, department?: NewDepartment) => void;
}

const DepartmentList = ({ setEdit }: DepartmentListProps) => {
  const queryClient = useQueryClient();
  const { openConfirmationBox, openMessageBox } = useModalContext();

  const {
    isLoading,
    isError,
    data: departments
  } = useQuery(['departments'], async () => (await getAllDepartments()).data);

  const { mutate: deleteExistingDepartment } = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => queryClient.invalidateQueries(['departments']),
    onError: () => openMessageBox('En avdeling kan ikke være i bruk før den slettes!')
  });

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt</div>;

  return (
    <>
      <div className="grid grid-cols-sections gap-x-2 gap-y-3 items-center">
        <div className="heading-3xs ml-5 md:ml-20">Avdelingsnavn</div>
        <div className="heading-3xs text-center">Forkortelse</div>
        <div className="col-span-2">
          <SubmitButton handleClick={() => setEdit(true)}>
            <Add />
          </SubmitButton>
        </div>

        <div className="col-span-4 border-b-2 w-full" />

        {departments.map((department) => (
          <Fragment key={department.departmentId}>
            <div className="text-left md:ml-20">{department.name}</div>
            <div className="text-left ml-[25%] xl:ml-44 lg:ml-[40%] md:ml-[30%] sm:ml-[30%]">
              ({department.abbreviation})
            </div>
            <EditButton onClick={() => setEdit(true, department)} />
            <DeleteButton
              onClick={() =>
                openConfirmationBox(
                  () => deleteExistingDepartment(department.departmentId),
                  'Er du sikker på at du vil slette denne avdelingen?'
                )
              }
            />
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default DepartmentList;
