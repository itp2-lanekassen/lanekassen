import { SubjectField } from '@/types/interfaces';
import { useState } from 'react';
import SubjectFieldEdit from './SubjectFieldEdit';
import SubjectFieldList from './SubjectFieldList';

const SubjectFieldView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [subjectField, setSubjectField] = useState<SubjectField>();

  const setEdit = (edit: boolean, editSubjectField?: SubjectField) => {
    setIsEditing(edit);
    setSubjectField(editSubjectField);
  };

  if (isEditing) {
    return <SubjectFieldEdit subjectField={subjectField} setEdit={setEdit} />;
  }

  return <SubjectFieldList setEdit={setEdit} />;
};
export default SubjectFieldView;
