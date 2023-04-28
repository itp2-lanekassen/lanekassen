import { Section } from '@/types/interfaces';
import { useState } from 'react';
import SectionEdit from './SectionEdit';
import SectionList from './SectionList';

const SectionView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [section, setSection] = useState<Section>();

  const setEdit = (edit: boolean, editSection?: Section) => {
    setIsEditing(edit);
    setSection(editSection);
  };

  if (isEditing) {
    return <SectionEdit section={section} setEdit={setEdit} />;
  }

  return <SectionList setEdit={setEdit} />;
};
export default SectionView;
