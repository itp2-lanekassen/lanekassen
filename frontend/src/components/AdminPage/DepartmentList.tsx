/* import { deleteDepartment, postDepartment, updateDepartment } from '@/API/DepartmentAPI';
import { useFilterContext } from '@/context/FilterContext';
import { useGlobalContext } from '@/context/GlobalContext';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

export default function AdminDepartments() {
  const { departments } = useGlobalContext();
  //const { departments: selectedDepartments, setDepartments } = useFilterContext();

  const [Name, setName] = useState('');
  const [Abbreviation, setAbbrevation] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<number>(-1);

  const { mutate: addDepartment } = useMutation({
    mutationFn: () =>
      postDepartment({
        name: Name,
        abbreviation: Abbreviation
      })
  });

  const { mutate: editDepartment } = useMutation({
    mutationFn: () =>
      updateDepartment(selectedDepartment, {
        departmentId: selectedDepartment,
        name: Name,
        abbreviation: Abbreviation
      })
  });

  const { mutate: delDepartment } = useMutation((departmentId: number) =>
    deleteDepartment(departmentId)
  );
  // eslint-disable-next-line prettier/prettier
  return (
    <div>
      <div className="grid grid-cols-sections text-center gap-x-2 gap-y-3 place-items-center col-span-4 border-b-2 w-full">
        <p className="">Avdelingsnavn</p>
        <p className="">Forkortelse</p>
        <p className=""> Rediger</p>
        <p className=""> Slett</p>
      </div>

      {departments.map((department) => (
        <div
          key={department.departmentId}
          className="grid grid-cols-sections text-center gap-x-2 gap-y-3 place-items-center"
        >
          <p className="">{department.name}</p>
          <p className="">({department.abbreviation})</p>
          <EditButton
            onClick={() => {
              setSelectedDepartment(department.departmentId);
              editDepartment();
            }}
          />
          <DeleteButton onClick={() => delDepartment(department.departmentId)} />
        </div>
      ))}

      <button onClick={() => addDepartment()}> plus icon</button>
    </div>
  );
}
 */
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
