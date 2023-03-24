import { NewDepartment } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { updateDepartment, postDepartment } from '@/API/DepartmentAPI';

interface DepartmentEditProps {
  setEdit: (val: boolean, department?: NewDepartment) => void;
  department?: NewDepartment;
}

const DepartmentEdit = ({ department, setEdit }: DepartmentEditProps) => {
  const queryClient = useQueryClient();

  const [departmentName, setDepartmentName] = useState('');
  const [departmentAbbreviation, setDepartmentAbbrevation] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<number>(-1);

  useEffect(() => {
    if (department) {
      setDepartmentName(department.name);
      setDepartmentAbbrevation(department.abbreviation);
      setSelectedDepartment(department.departmentId ?? -1);
    }
  }, [department]);

  const { mutate: updateExistingsDepartment } = useMutation({
    mutationFn: () =>
      updateDepartment(selectedDepartment, {
        departmentId: selectedDepartment,
        name: departmentName,
        abbreviation: departmentAbbreviation
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['departments']);
      setEdit(false);
    }
  });

  const { mutate: createDepartment } = useMutation({
    mutationFn: (newDepartment: NewDepartment) => postDepartment(newDepartment),
    onSuccess: () => {
      queryClient.invalidateQueries(['departments']);
      setEdit(false);
    }
  });

  const handleSave = () => {
    if (department) {
      return updateExistingsDepartment();
    }

    createDepartment({
      name: departmentName,
      abbreviation: departmentAbbreviation
    });
  };

  return (
    <div className="flex flex-col w-full items-center gap-8">
      <h4>{department ? 'Rediger avdeling' : 'Ny avdeling'}</h4>
      <input
        value={departmentName}
        onChange={(e) => setDepartmentName(e.target.value)}
        placeholder="Avdelingsnavn"
        className="rounded-full w-2/5 text-primary-light border-primary-light outline-primary-light border-1 px-3 py-1.5"
      />
      <input
        value={departmentAbbreviation}
        onChange={(e) => setDepartmentAbbrevation(e.target.value)}
        placeholder="Forkortelse"
        className="rounded-full w-2/5 text-primary-light border-primary-light outline-primary-light border-1 px-3 py-1.5"
      />
      <div className="flex gap-4">
        <button
          className="px-4 py-2 rounded-full bg-primary-light text-grey-lightest hover:bg-grey-lightest hover:text-primary-light hover:outline outline-1 outline-primary-light disabled:cursor-not-allowed"
          onClick={handleSave}
          disabled={!departmentName.length}
        >
          {department ? 'Lagre' : 'Legg til'}
        </button>
        <button
          className="px-4 py-2 rounded-full bg-primary-light text-grey-lightest hover:bg-grey-lightest hover:text-primary-light hover:outline outline-1 outline-primary-light"
          onClick={() => setEdit(false)}
        >
          Avbryt
        </button>
      </div>
    </div>
  );
};

export default DepartmentEdit;
