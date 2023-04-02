import { useGlobalContext } from '@/context/GlobalContext';
import { Team, TeamDTO } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { updateTeam, postTeam } from '@/API/TeamAPI';
import DropdownMultiSelect from '../DropdownMultiSelect';

interface TeamEditProps {
  setEdit: (val: boolean, Team?: Team) => void;
  team?: Team;
}

const TeamEdit = ({ team, setEdit }: TeamEditProps) => {
  const queryClient = useQueryClient();

  const { departments } = useGlobalContext();

  const [teamName, setTeamName] = useState(team?.name || '');
  const [selectedDepartments, setSelectedDepartments] = useState(
    team?.departments?.map((d) => d.departmentId) || []
  );

  const { mutate: updateExistingsTeam } = useMutation({
    mutationFn: ({ id, ...updatedTeam }: { id: number } & TeamDTO) => updateTeam(id, updatedTeam),
    onSuccess: () => {
      queryClient.invalidateQueries(['teams']);
      setEdit(false);
    },
    onError: () => alert('Teamet eksisterer allerede')
  });

  const { mutate: createTeam } = useMutation({
    mutationFn: postTeam,
    onSuccess: () => {
      queryClient.invalidateQueries(['teams']);
      setEdit(false);
    },
    onError: () => alert('Teamet eksisterer allerede')
  });

  const handleSave = () => {
    if (team) {
      return updateExistingsTeam({
        id: team.teamId,
        name: teamName,
        departments: selectedDepartments
      });
    }

    createTeam({ name: teamName, departments: selectedDepartments });
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
      <DropdownMultiSelect
        placeholder="Velg Avdelinger"
        className="w-2/5"
        value={selectedDepartments}
        options={departments.map((d) => ({ value: d.departmentId, label: d.name }))}
        onChange={setSelectedDepartments}
      />
      <div className="flex gap-4">
        <button
          className="px-4 py-2 rounded-full bg-primary-light text-grey-lightest hover:bg-grey-lightest hover:text-primary-light hover:outline outline-1 outline-primary-light disabled:cursor-not-allowed"
          onClick={handleSave}
          disabled={!(teamName.length && selectedDepartments.length)}
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
