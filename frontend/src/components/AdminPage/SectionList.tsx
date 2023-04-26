import { deleteSection, getAllSections } from '@/API/SectionAPI';
import { Section } from '@/types/types';
import { Add } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import ErrorAlert from '../Alert';
import ConfirmationBox from '../ConfirmationBox';
import SubmitButton from '../SubmitButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

interface SectionListProps {
  setEdit: (val: boolean, section?: Section) => void;
}

const SectionList = ({ setEdit }: SectionListProps) => {
  const queryClient = useQueryClient();
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState('');

  const {
    isLoading,
    isError,
    data: sections
  } = useQuery(['sections'], async () => (await getAllSections()).data);

  const { mutate: deleteExistingSection } = useMutation({
    mutationFn: deleteSection,
    onSuccess: () => queryClient.invalidateQueries(['sections']),
    onError: () => {
      setErrorAlertMessage('En seksjon kan ikke være i bruk før den slettes!');
      setErrorAlertOpen(true);
    }
  });

  const [id, setId] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleDeleteClick = (result: boolean) => {
    if (result) {
      deleteExistingSection(id);
    }
    setOpenDialog(false);
  };

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt</div>;
  // 48 44
  return (
    <>
      {errorAlertOpen && <ErrorAlert message={errorAlertMessage} />}
      <div className="grid grid-cols-sections gap-x-2 gap-y-3 items-center">
        <div className="heading-3xs md:ml-20">Seksjon</div>
        <div className="heading-3xs md:text-center">Avdeling</div>
        <div className="col-span-2">
          <SubmitButton handleClick={() => setEdit(true)}>
            <Add />
          </SubmitButton>
        </div>

        <div className="col-span-4 border-b-2 w-full" />

        {sections.map((section) => (
          <Fragment key={section.sectionId}>
            <div className="text-left md:ml-20">{section.name}</div>
            <div className="text-left ml-[20%] xl:ml-44 lg:ml-[35%] md:ml-[30%] sm:ml-[30%]">
              {section.department?.name}
            </div>
            <EditButton onClick={() => setEdit(true, section)} />
            <DeleteButton
              onClick={() => {
                setId(section.sectionId);
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
export default SectionList;
