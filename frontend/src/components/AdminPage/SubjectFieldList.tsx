import { deleteSubjectField, getAllSubjectFields } from '@/API/SubjectFieldAPI';
import { SubjectField } from '@/types/types';
import { Add } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import SubmitButton from '../SubmitButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import ErrorAlert from '../Alert';
import ConfirmationBox from '../ConfirmationBox';

interface SubjectFieldListProps {
  setEdit: (val: boolean, subjectField?: SubjectField) => void;
}

const SubjectFieldList = ({ setEdit }: SubjectFieldListProps) => {
  const queryClient = useQueryClient();
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState('');

  const {
    isLoading,
    isError,
    data: subjectFields
  } = useQuery(['subjectField'], async () => (await getAllSubjectFields()).data);

  const { mutate: deleteExistingSubjectField } = useMutation({
    mutationFn: deleteSubjectField,
    onSuccess: () => queryClient.invalidateQueries(['subjectField']),
    onError: () => {
      setErrorAlertMessage('Et fagområde kan ikke være i bruk før den slettes!');
      setErrorAlertOpen(true);
    }
  });
  const [subjectId, setSubjectId] = useState<number>(0);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleDeleteClick = (result: boolean) => {
    if (result) {
      deleteExistingSubjectField(subjectId);
    }
    setOpenDialog(false);
  };

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt</div>;

  return (
    <>
      {errorAlertOpen && <ErrorAlert message={errorAlertMessage} />}
      <div className="grid grid-cols-sections gap-x-2 gap-y-3 items-center">
        <div className="heading-3xs md:ml-20">Fagområde</div>
        <div className="heading-3xs text-center">Avdeling</div>
        <div className="col-span-2">
          <SubmitButton handleClick={() => setEdit(true)}>
            <Add />
          </SubmitButton>
        </div>

        <div className="col-span-4 border-b-2 w-full" />

        {subjectFields.map((subjectField) => (
          <Fragment key={subjectField.subjectFieldId}>
            <div className="md:ml-20">{subjectField.name}</div>
            <div className="ml-[35%] xl:ml-44 lg:ml-[40%] md:ml-[40%]">
              {subjectField.department?.name}
            </div>

            <EditButton onClick={() => setEdit(true, subjectField)} />
            <DeleteButton
              onClick={() => {
                setSubjectId(subjectField.subjectFieldId);
                setOpenDialog(true);
              }}
            />
            {openDialog && (
              <div className="flex justify-between items-center">
                <ConfirmationBox
                  confirmationText="Er du sikker på at du vil slette fagområdet?"
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
export default SubjectFieldList;
