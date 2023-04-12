import { deleteTeam, getAllTeams } from '@/API/TeamAPI';
import { Team } from '@/types/types';
import { Add } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import SubmitButton from '../SubmitButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import ErrorAlert from '../Alert';

interface TeamListProps {
  setEdit: (val: boolean, team?: Team) => void;
}

const TeamList = ({ setEdit }: TeamListProps) => {
  const queryClient = useQueryClient();
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState('');

  const {
    isLoading,
    isError,
    data: teams
  } = useQuery(['teams'], async () => (await getAllTeams()).data);

  const { mutate: deleteExistingTeam } = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => queryClient.invalidateQueries(['teams']),
    onError: (error: Error) => {
      setErrorAlertMessage('Et team kan ikke være i bruk før den slettes!');
      setErrorAlertOpen(true);
    }
  });

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt</div>;

  return (
    <>
      {errorAlertOpen && <ErrorAlert message={errorAlertMessage} />}
      <div className="grid grid-cols-teams text-center gap-x-2 gap-y-3 place-items-center">
        <div className="heading-3xs">Team</div>
        <div className="col-span-1">
          <SubmitButton handleClick={() => setEdit(true)}>
            <Add />
          </SubmitButton>
        </div>

        <div className="col-span-3 border-b-2 w-full" />

        {teams.map((team) => (
          <Fragment key={team.teamId}>
            <div>{team.name}</div>
            <EditButton onClick={() => setEdit(true, team)} />
            <DeleteButton
              onClick={() => {
                const confirmDelete = confirm('Er du sikker på at du vil slette dette teamet?');
                if (confirmDelete) deleteExistingTeam(team.teamId);
              }}
            />
          </Fragment>
        ))}
      </div>
    </>
  );
};
export default TeamList;
