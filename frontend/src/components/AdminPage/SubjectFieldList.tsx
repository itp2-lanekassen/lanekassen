import { deleteSubjectField, getAllSubjectFields } from '@/API/SubjectFieldAPI';
import { SubjectField } from '@/types/types';
import { Add } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import SubmitButton from '../SubmitButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

interface SubjectFieldListProps {
  setEdit: (val: boolean, subjectField?: SubjectField) => void;
}

const SubjectFieldList = ({ setEdit }: SubjectFieldListProps) => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: subjectFields
  } = useQuery(['subjectField'], async () => (await getAllSubjectFields()).data);

  const { mutate: deleteExistingSubjectField } = useMutation({
    mutationFn: deleteSubjectField,
    onSuccess: () => queryClient.invalidateQueries(['subjectField'])
  });

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt</div>;

  return (
    <div className="grid grid-cols-sections text-center gap-x-2 gap-y-3 place-items-center">
      <div className="heading-3xs">Fagfelt</div>
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
          <DeleteButton onClick={() => deleteExistingSubjectField(subjectField.subjectFieldId)} />
        </Fragment>
      ))}
    </div>
  );
};
export default SubjectFieldList;
