import { deleteDepartment, getAllDepartments } from '@/API/DepartmentAPI';
import { NewDepartment } from '@/types/types';
import { Add } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import SubmitButton from '../SubmitButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

interface DepartmentListProps {
  setEdit: (val: boolean, department?: NewDepartment) => void;
}

const DepartmentList = ({ setEdit }: DepartmentListProps) => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: departments
  } = useQuery(['departments'], async () => (await getAllDepartments()).data);

  const { mutate: deleteExistingDepartment } = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => queryClient.invalidateQueries(['departments'])
  });

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt</div>;

  return (
    <div className="grid grid-cols-sections text-center gap-x-2 gap-y-3 place-items-center">
      <div className="heading-3xs">Avdelingsnavn</div>
      <div className="heading-3xs">Forkortelse</div>
      <div className="col-span-2">
        <SubmitButton handleClick={() => setEdit(true)}>
          <Add />
        </SubmitButton>
      </div>

      <div className="col-span-4 border-b-2 w-full" />

      {departments.map((department) => (
        <Fragment key={department.departmentId}>
          <div>{department.name}</div>
          <div>({department.abbreviation})</div>
          <EditButton onClick={() => setEdit(true, department)} />
          <DeleteButton onClick={() => deleteExistingDepartment(department.departmentId)} />
        </Fragment>
      ))}
    </div>
  );
};

export default DepartmentList;
