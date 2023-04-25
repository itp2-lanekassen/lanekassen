import { deleteAbsenceType } from '@/API/AbsenceTypeAPI';
import { AbsenceType } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ConfirmationBox from '../ConfirmationBox';
import { Button } from '@mui/material';
import { CalendarCellDisplay } from './CalendarCellDisplay';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import UpdateAbsenceTypeComponent from './UpdateAbsencetypeComponent';

export default function AbsenceTypeRow(props: {
  absenceType: AbsenceType;
  setView: React.Dispatch<React.SetStateAction<JSX.Element>>;
}) {
  const queryClient = useQueryClient();

  const { mutate: deleteAbsenceTypeFromDatabase } = useMutation({
    mutationFn: deleteAbsenceType,
    onSuccess: () => queryClient.invalidateQueries(['absenceTypes']),
    onError: () =>
      alert('Fraværstypen kunne ikke slettes. Fraværstyper som er i bruk kan ikke slettes.')
  });

  const handleDelete = async () => {
    deleteAbsenceTypeFromDatabase(props.absenceType.absenceTypeId);
  };

  const handleEdit = async () => {
    props.setView(
      <UpdateAbsenceTypeComponent absenceType={props.absenceType} setView={props.setView} />
    );
  };

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleDeleteClick = (result: boolean) => {
    if (result) {
      handleDelete();
    }
    setOpenDialog(false);
  };

  return (
    <>
      {openDialog && (
        <div className="flex justify-between items-center">
          <ConfirmationBox
            confirmationText="Er du sikker på at du vil slette fraværstypen?"
            isOpen={openDialog}
            onConfirm={handleDeleteClick}
          />
        </div>
      )}
      <p className="flex-1 xl:ml-8 lg:ml-6">{props.absenceType.name}</p>
      <p className="flex-1 hidden md:block xl:ml-16 lg:ml-10">{props.absenceType.code}</p>
      <p className="flex-1 text-center hidden md:block">{props.absenceType.colorCode}</p>
      <CalendarCellDisplay code={props.absenceType.code} colorCode={props.absenceType.colorCode} />
      <EditButton onClick={handleEdit} />
      <DeleteButton onClick={() => setOpenDialog(true)} />
    </>
  );
}
