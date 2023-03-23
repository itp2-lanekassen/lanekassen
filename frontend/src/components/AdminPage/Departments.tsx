import { deleteDepartment, postDepartment, updateDepartment } from '@/API/DepartmentAPI';
import { useFilterContext } from '@/context/FilterContext';
import { useGlobalContext } from '@/context/GlobalContext';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

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

  const { mutate: changeDepartment } = useMutation({
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
      <div className="admin-dep-grid grid grid-cols-4 ">
        <p className="col-span-1">Avdelingsnavn</p>
        <p className="col-span-1">Forkortelse</p>
        <p className="col-span-1"> Rediger</p>
        <p className="col-span-1 "> Slett</p>
      </div>

      {departments.map((department) => (
        <div key={department.departmentId} className="admin-dep-grid grid grid-cols-4">
          <p className="col-span-1">{department.name}</p>
          <p className="col-span-1">({department.abbreviation})</p>
          <button className="col-span-1" onClick={() => delDepartment(department.departmentId)}>
            X
          </button>
          <button className="col-span-1 " onClick={() => changeDepartment()}>
            O
          </button>
        </div>
      ))}

      <button onClick={() => addDepartment()}> plus icon</button>
    </div>
  );
}
