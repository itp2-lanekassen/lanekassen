import { deleteSubjectField, getAllSubjectFields } from '@/API/SubjectFieldAPI';
import { SubjectField } from '@/types/types';
import { Add } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import SubmitButton from '../SubmitButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { useModalContext } from '@/context/ModalContext';

interface SubjectFieldListProps {
  setEdit: (val: boolean, subjectField?: SubjectField) => void;
}

const SubjectFieldList = ({ setEdit }: SubjectFieldListProps) => {
  const queryClient = useQueryClient();
  const { openConfirmationBox, openMessageBox } = useModalContext();

  const {
    isLoading,
    isError,
    data: subjectFields
  } = useQuery(['subjectField'], async () => (await getAllSubjectFields()).data);

  const { mutate: deleteExistingSubjectField } = useMutation({
    mutationFn: deleteSubjectField,
    onSuccess: () => queryClient.invalidateQueries(['subjectField']),
    onError: () => openMessageBox('Et fagområde kan ikke være i bruk før den slettes!')
  });

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt</div>;

  return (
    <>
      <div className="grid grid-cols-sections text-center gap-x-2 gap-y-3 place-items-center">
        <div className="heading-3xs">Fagområde</div>
        <div className="heading-3xs">Avdeling</div>
        <div className="col-span-2">
          <SubmitButton handleClick={() => setEdit(true)}>
            <Add />
          </SubmitButton>
        </div>

        <div className="col-span-4 border-b-2 w-full" />

        {subjectFields.map((subjectField) => (
          <Fragment key={subjectField.subjectFieldId}>
            <div>{subjectField.name}</div>
            <div>{subjectField.department?.name}</div>

            <EditButton onClick={() => setEdit(true, subjectField)} />
            <DeleteButton
              onClick={() =>
                openConfirmationBox(
                  () => deleteExistingSubjectField(subjectField.subjectFieldId),
                  'Er du sikker på at du vil slette fagområdet?'
                )
              }
            />
          </Fragment>
        ))}
      </div>
    </>
  );
};
export default SubjectFieldList;
