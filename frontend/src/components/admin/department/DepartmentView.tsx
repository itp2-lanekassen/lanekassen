import { NewDepartment } from '@/types/interfaces';
import { useState } from 'react';
import DepartmentEdit from './DepartmentEdit';
import DepartmentList from './DepartmentList';

const DepartmentView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [department, setDepartment] = useState<NewDepartment>();

  const setEdit = (edit: boolean, editDepartment?: NewDepartment) => {
    setIsEditing(edit);
    setDepartment(editDepartment);
  };

  if (isEditing) {
    return <DepartmentEdit department={department} setEdit={setEdit} />;
  }

  return <DepartmentList setEdit={setEdit} />;
};
export default DepartmentView;
