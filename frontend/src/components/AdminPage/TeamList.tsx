import { deleteTeam, getAllTeams } from '@/API/TeamAPI';
import { Team } from '@/types/types';
import { Add } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import SubmitButton from '../SubmitButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

interface TeamListProps {
  setEdit: (val: boolean, team?: Team) => void;
}

const TeamList = ({ setEdit }: TeamListProps) => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: teams
  } = useQuery(['teams'], async () => (await getAllTeams()).data);

  const { mutate: deleteExistingTeam } = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => queryClient.invalidateQueries(['teams'])
  });

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt</div>;

  return (
    <div className="grid grid-cols-sections text-center gap-x-2 gap-y-3 place-items-center">
      <div className="heading-3xs">Team</div>
      <div className="heading-3xs">Avdelinger</div>
      <div className="col-span-2">
        <SubmitButton handleClick={() => setEdit(true)}>
          <Add />
        </SubmitButton>
      </div>

      <div className="col-span-4 border-b-2 w-full" />

      {teams.map((team) => (
        <Fragment key={team.teamId}>
          <div>{team.name}</div>
          <div>{team.departments?.map((dep) => dep.name).join(', ')}</div>
          <EditButton onClick={() => setEdit(true, team)} />
          <DeleteButton onClick={() => deleteExistingTeam(team.teamId)} />
        </Fragment>
      ))}
    </div>
  );
};
export default TeamList;
