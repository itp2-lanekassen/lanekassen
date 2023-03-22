import { useGlobalContext } from '@/context/GlobalContext';
import { Section, SectionDTO } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { updateSection, postSection } from '@/API/SectionAPI';
import DropdownMultiSelect from '../DropdownMultiSelect';

interface SectionEditProps {
  setEdit: (val: boolean, section?: Section) => void;
  section?: Section;
}

const SectionEdit = ({ section, setEdit }: SectionEditProps) => {
  const queryClient = useQueryClient();

  const { departments } = useGlobalContext();

  const [sectionName, setSectionName] = useState(section?.name || '');
  const [selectedDepartments, setSelectedDepartments] = useState(
    section?.departments?.map((d) => d.departmentId) || []
  );

  const { mutate: updateExistingsSection } = useMutation({
    mutationFn: ({ id, ...updatedSection }: { id: number } & SectionDTO) =>
      updateSection(id, updatedSection),
    onSuccess: () => {
      queryClient.invalidateQueries(['sections']);
      setEdit(false);
    }
  });

  const { mutate: createSection } = useMutation({
    mutationFn: postSection,
    onSuccess: () => {
      queryClient.invalidateQueries(['sections']);
      setEdit(false);
    }
  });

  const handleSave = () => {
    if (section) {
      return updateExistingsSection({
        id: section.sectionId,
        name: sectionName,
        departments: selectedDepartments
      });
    }

    createSection({ name: sectionName, departments: selectedDepartments });
  };

  return (
    <div className="flex flex-col w-full items-center gap-8">
      <h4>{section ? 'Rediger seksjon' : 'Ny seksjon'}</h4>
      <input
        value={sectionName}
        onChange={(e) => setSectionName(e.target.value)}
        placeholder="Sekjonsnavn"
        className="rounded-full w-2/5 text-primary-light border-primary-light outline-primary-light border-1 px-3 py-1.5"
      />
      <DropdownMultiSelect
        placeholder="Velg Avdelinger"
        // TODO: shouldn't need important
        className="!w-2/5"
        value={selectedDepartments}
        listOfOptions={departments.map((d) => ({ id: d.departmentId, name: d.name }))}
        handleChange={setSelectedDepartments}
      />
      <div className="flex gap-4">
        <button
          className="px-4 py-2 rounded-full bg-primary-light text-grey-lightest hover:bg-grey-lightest hover:text-primary-light hover:outline outline-1 outline-primary-light disabled:cursor-not-allowed"
          onClick={handleSave}
          disabled={!(sectionName.length && selectedDepartments.length)}
        >
          {section ? 'Lagre' : 'Legg til'}
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

export default SectionEdit;
