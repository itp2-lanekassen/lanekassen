import { useGlobalContext } from '@/context/GlobalContext';
import { SubjectField, SubjectFieldDTO } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { updateSubjectField, postSubjectField } from '@/API/SubjectFieldAPI';
import Dropdown from '../Dropdown';

interface SubjectFieldEditProps {
  setEdit: (val: boolean, subjectField?: SubjectField) => void;
  subjectField?: SubjectField;
}

const SubjectFieldEdit = ({ subjectField, setEdit }: SubjectFieldEditProps) => {
  const queryClient = useQueryClient();

  const { departments } = useGlobalContext();

  const [subjectFieldName, setSubjectFieldName] = useState(subjectField?.name || '');
  const [selectedDepartment, setSelectedDepartment] = useState(subjectField?.departmentId || -1);

  const { mutate: updateExistingsSubjectField } = useMutation({
    mutationFn: ({ id, ...updatedSubjectField }: { id: number } & SubjectFieldDTO) =>
      updateSubjectField(id, updatedSubjectField),
    onSuccess: () => {
      queryClient.invalidateQueries(['subjectField']);
      setEdit(false);
    }
  });

  const { mutate: createSubjectField } = useMutation({
    mutationFn: postSubjectField,
    onSuccess: () => {
      queryClient.invalidateQueries(['subjectField']);
      setEdit(false);
    }
  });

  const handleSave = () => {
    if (subjectField) {
      return updateExistingsSubjectField({
        id: subjectField.subjectFieldId,
        name: subjectFieldName,
        departmentId: selectedDepartment
      });
    }

    createSubjectField({
      name: subjectFieldName,
      departmentId: selectedDepartment
    });
  };

  return (
    <div className="flex flex-col w-full items-center gap-8">
      <h4>{subjectField ? 'Rediger fagfelt' : 'Nytt fagfelt'}</h4>
      <input
        value={subjectFieldName}
        onChange={(e) => setSubjectFieldName(e.target.value)}
        placeholder="Sekjonsnavn"
        className="rounded-full w-2/5 text-primary-light border-primary-light outline-primary-light border-1 px-3 py-1.5"
      />
      <Dropdown
        placeholder="Velg Avdelinger"
        className="w-2/5"
        value={selectedDepartment}
        options={departments.map((d) => ({ value: d.departmentId, label: d.name }))}
        onChange={setSelectedDepartment}
        isDisabled={false}
      />
      <div className="flex gap-4">
        <button
          className="px-4 py-2 rounded-full bg-primary-light text-grey-lightest hover:bg-grey-lightest hover:text-primary-light hover:outline outline-1 outline-primary-light disabled:cursor-not-allowed"
          onClick={handleSave}
          disabled={!(subjectFieldName.length && selectedDepartment)}
        >
          {subjectField ? 'Lagre' : 'Legg til'}
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

export default SubjectFieldEdit;
