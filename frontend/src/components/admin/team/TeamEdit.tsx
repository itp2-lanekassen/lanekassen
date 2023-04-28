import { Team, TeamDTO } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { updateTeam, postTeam } from '@/api/team';
import { useModalContext } from '@/context/ModalContext';

interface TeamEditProps {
  setEdit: (val: boolean, Team?: Team) => void;
  team?: Team;
}

const TeamEdit = ({ team, setEdit }: TeamEditProps) => {
  const queryClient = useQueryClient();
  const { openMessageBox } = useModalContext();

  const [teamName, setTeamName] = useState(team?.name || '');

  const { mutate: updateExistingsTeam } = useMutation({
    mutationFn: ({ id, ...updatedTeam }: { id: number } & TeamDTO) => updateTeam(id, updatedTeam),
    onSuccess: () => {
      queryClient.invalidateQueries(['teams']);
      setEdit(false);
    },
    onError: () => openMessageBox('Teamet eksisterer allerede')
  });

  const { mutate: createTeam } = useMutation({
    mutationFn: postTeam,
    onSuccess: () => {
      queryClient.invalidateQueries(['teams']);
      setEdit(false);
    },
    onError: () => openMessageBox('Teamet eksisterer allerede')
  });

  const handleSave = () => {
    if (team) {
      return updateExistingsTeam({
        id: team.teamId,
        name: teamName
      });
    }

    createTeam({ name: teamName });
  };

  return (
    <div className="flex flex-col w-full items-center gap-8">
      <h4>{team ? 'Rediger team' : 'Nytt team'}</h4>
      <input
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Team navn"
        className="rounded-full w-2/5 text-primary-light border-primary-light outline-primary-light border-1 px-3 py-1.5"
      />

      <div className="flex gap-4">
        <button
          className="px-4 py-2 rounded-full bg-primary-light text-grey-lightest hover:bg-grey-lightest hover:text-primary-light hover:outline outline-1 outline-primary-light disabled:cursor-not-allowed"
          onClick={handleSave}
          disabled={!(teamName.length > 0)}
        >
          {team ? 'Lagre' : 'Legg til'}
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

export default TeamEdit;
