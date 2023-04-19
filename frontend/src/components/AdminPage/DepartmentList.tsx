import { deleteDepartment, getAllDepartments } from '@/API/DepartmentAPI';
import { NewDepartment } from '@/types/types';
import { Add } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import ErrorAlert from '../Alert';
import SubmitButton from '../SubmitButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import ConfirmationBox from '../ConfirmationBox';

interface DepartmentListProps {
  setEdit: (val: boolean, department?: NewDepartment) => void;
}

const DepartmentList = ({ setEdit }: DepartmentListProps) => {
  const queryClient = useQueryClient();
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState('');

  const {
    isLoading,
    isError,
    data: departments
  } = useQuery(['departments'], async () => (await getAllDepartments()).data);

  const { mutate: deleteExistingDepartment } = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => queryClient.invalidateQueries(['departments']),
    onError: (error: Error) => {
      setErrorAlertMessage('En avdeling kan ikke være i bruk før den slettes!');
      setErrorAlertOpen(true);
    }
  });

  const [id, setId] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleDeleteClick = (result: boolean) => {
    if (result) {
      deleteExistingDepartment(id);
    }
    setOpenDialog(false);
  };

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt</div>;

  return (
    <>
      {errorAlertOpen && <ErrorAlert message={errorAlertMessage} />}
      <div className="grid grid-cols-sections text-center gap-x-2 gap-y-3 place-items-center">
        <div className="heading-3xs">Avdelingsnavn</div>
        <div className="heading-3xs">Forkortelse</div>
        <div className="col-span-2">
          <SubmitButton handleClick={() => setEdit(true)}>
            <Add />
          </SubmitButton>
        </div>

        <div className="col-span-4 border-b-2 w-full" />

        {departments.map((department) => (
          <Fragment key={department.departmentId}>
            <div>{department.name}</div>
            <div>({department.abbreviation})</div>
            <EditButton onClick={() => setEdit(true, department)} />
            <DeleteButton
              onClick={() => {
                setId(department.departmentId);
                setOpenDialog(true);
              }}
            />
            {openDialog && (
              <div className="flex justify-between items-center">
                <ConfirmationBox
                  confirmationText="Er du sikker på at du vil slette seksjonen?"
                  isOpen={openDialog}
                  onConfirm={handleDeleteClick}
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default DepartmentList;
