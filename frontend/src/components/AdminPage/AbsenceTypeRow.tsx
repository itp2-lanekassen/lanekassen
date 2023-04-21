import { deleteAbsenceType } from '@/API/AbsenceTypeAPI';
import { AbsenceType } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CalendarCellDisplay } from './CalendarCellDisplay';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import UpdateAbsenceTypeComponent from './UpdateAbsencetypeComponent';
import { useModalContext } from '@/context/ModalContext';

export default function AbsenceTypeRow(props: {
  absenceType: AbsenceType;
  setView: React.Dispatch<React.SetStateAction<JSX.Element>>;
}) {
  const queryClient = useQueryClient();
  const { openConfirmationBox, openMessageBox } = useModalContext();

  const { mutate: deleteAbsenceTypeFromDatabase } = useMutation({
    mutationFn: deleteAbsenceType,
    onSuccess: () => queryClient.invalidateQueries(['absenceTypes']),
    onError: () => openMessageBox(() => null, 'Kan ikke slette fraværstyper som er i bruk')
  });

  const handleEdit = async () => {
    props.setView(
      <UpdateAbsenceTypeComponent absenceType={props.absenceType} setView={props.setView} />
    );
  };

  return (
    <>
      <p className="flex-1 text-center">{props.absenceType.name}</p>
      <p className="flex-1 text-center hidden md:block">{props.absenceType.code}</p>
      <p className="flex-1 text-center hidden md:block">{props.absenceType.colorCode}</p>
      <CalendarCellDisplay code={props.absenceType.code} colorCode={props.absenceType.colorCode} />
      <EditButton onClick={handleEdit} />
      <DeleteButton
        onClick={() =>
          openConfirmationBox(
            () => deleteAbsenceTypeFromDatabase(props.absenceType.absenceTypeId),
            'Er du sikker på at du vil slette fraværstypen?'
          )
        }
      />
    </>
  );
}
