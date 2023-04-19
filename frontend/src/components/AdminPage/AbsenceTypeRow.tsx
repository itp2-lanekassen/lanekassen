import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAbsenceType } from '@/API/AbsenceTypeAPI';
import { CalendarCellDisplay } from './CalendarCellDisplay';
import { AbsenceType } from '@/types/types';
import UpdateAbsenceTypeComponent from './UpdateAbsencetypeComponent';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

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
    const confirmDelete = window.confirm('Er du sikker på at du vil slette denne fraværstypen?');
    if (confirmDelete) {
      deleteAbsenceTypeFromDatabase(props.absenceType.absenceTypeId);
    }
  };

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
      <DeleteButton onClick={handleDelete} />
    </>
  );
}
