import { deleteSection, getAllSections } from '@/API/SectionAPI';
import { Section } from '@/types/types';
import { Add } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import SubmitButton from '../SubmitButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { useModalContext } from '@/context/ModalContext';

interface SectionListProps {
  setEdit: (val: boolean, section?: Section) => void;
}

const SectionList = ({ setEdit }: SectionListProps) => {
  const queryClient = useQueryClient();
  const { openConfirmationBox, openMessageBox } = useModalContext();

  const {
    isLoading,
    isError,
    data: sections
  } = useQuery(['sections'], async () => (await getAllSections()).data);

  const { mutate: deleteExistingSection } = useMutation({
    mutationFn: deleteSection,
    onSuccess: () => queryClient.invalidateQueries(['sections']),
    onError: () => openMessageBox('En seksjon kan ikke være i bruk før den slettes!')
  });

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt</div>;

  return (
    <>
      <div className="grid grid-cols-sections text-center gap-x-2 gap-y-3 place-items-center">
        <div className="heading-3xs">Seksjon</div>
        <div className="heading-3xs">Avdelinger</div>
        <div className="col-span-2">
          <SubmitButton handleClick={() => setEdit(true)}>
            <Add />
          </SubmitButton>
        </div>

        <div className="col-span-4 border-b-2 w-full" />

        {sections.map((section) => (
          <Fragment key={section.sectionId}>
            <div>{section.name}</div>
            <div>{section.department?.name}</div>
            <EditButton onClick={() => setEdit(true, section)} />
            <DeleteButton
              onClick={() =>
                openConfirmationBox(
                  () => () => deleteExistingSection(section.sectionId),
                  'Er du sikker på at du vil slette denne seksjonen?'
                )
              }
            />
          </Fragment>
        ))}
      </div>
    </>
  );
};
export default SectionList;
