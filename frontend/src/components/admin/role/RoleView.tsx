import { Role } from '@/types/types';
import { useState } from 'react';
import RoleEdit from './RoleEdit';
import RoleList from './RoleList';

const RoleView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState<Role>();

  const setEdit = (edit: boolean, editRole?: Role) => {
    setIsEditing(edit);
    setRole(editRole);
  };

  if (isEditing) {
    return <RoleEdit role={role} setEdit={setEdit} />;
  }

  return <RoleList setEdit={setEdit} />;
};
export default RoleView;
