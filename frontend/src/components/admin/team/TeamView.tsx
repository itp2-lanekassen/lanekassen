import { Team } from '@/types/interfaces';
import { useState } from 'react';
import TeamEdit from './TeamEdit';
import TeamList from './TeamList';

const TeamView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [team, setTeam] = useState<Team>();

  const setEdit = (edit: boolean, editTeam?: Team) => {
    setIsEditing(edit);
    setTeam(editTeam);
  };

  if (isEditing) {
    return <TeamEdit team={team} setEdit={setEdit} />;
  }

  return <TeamList setEdit={setEdit} />;
};
export default TeamView;
