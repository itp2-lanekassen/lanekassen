import { useGlobalContext } from '@/context/GlobalContext';
import { Role, RoleDTO } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { updateRole, postRole } from '@/API/RoleAPI';
import DropdownMultiSelect from '../DropdownMultiSelect';

interface RoleEditProps {
  setEdit: (val: boolean, Role?: Role) => void;
  role?: Role;
}

const RoleEdit = ({ role, setEdit }: RoleEditProps) => {
  const queryClient = useQueryClient();

  const { departments } = useGlobalContext();

  const [roleName, setRoleName] = useState(role?.name || '');
  const [selectedDepartments, setSelectedDepartments] = useState(
    role?.departments?.map((d) => d.departmentId) || []
  );

  const { mutate: updateExistingsRole } = useMutation({
    mutationFn: ({ id, ...updatedRole }: { id: number } & RoleDTO) => updateRole(id, updatedRole),
    onSuccess: () => {
      queryClient.invalidateQueries(['roles']);
      setEdit(false);
    },
    onError: () => alert('Rollen eksisterer allerede')
  });

  const { mutate: createRole } = useMutation({
    mutationFn: postRole,
    onSuccess: () => {
      queryClient.invalidateQueries(['roles']);
      setEdit(false);
    },
    onError: () => alert('Rollen eksisterer allerede')
  });

  const handleSave = () => {
    if (role) {
      return updateExistingsRole({
        id: role.roleId,
        name: roleName,
        departments: selectedDepartments
      });
    }
    createRole({ name: roleName, departments: selectedDepartments });
  };

  return (
    <div className="flex flex-col w-full items-center gap-8">
      <h4>{role ? 'Rediger rolle' : 'Ny rolle'}</h4>
      <input
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        placeholder="Rolle navn"
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
          disabled={!(roleName.length && selectedDepartments.length)}
        >
          {role ? 'Lagre' : 'Legg til'}
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

export default RoleEdit;
