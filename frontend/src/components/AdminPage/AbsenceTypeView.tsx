import SubmitButton from '../SubmitButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteAbsenceType, getAllAbsenceTypes } from '@/API/AbsenceTypeAPI';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { CalendarCellDisplay } from './CalendarCellDisplay';
import { AbsenceType } from '@/types/types';
import { useState } from 'react';

export default function AbsenceTypeView() {
  const navigate = useNavigate();

  const handleAdd = async () => {
    console.log('add');
    // display AddAbsenceTypeComponent
  };

  const { data: absenceTypes } = useQuery({
    queryKey: ['absenceTypes'],
    queryFn: getAllAbsenceTypes
  });

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center w-full">
        <div className="grid-cols-absence-types grid col-span-6 w-full place-item-center">
          <p className="flex-1 text-center font-bold mb-2 border-b-2">Beskrivelse</p>
          <p className="flex-1 text-center font-bold mb-2 border-b-2">Kode</p>
          <p className="flex-1 text-center font-bold mb-2 border-b-2">Farge</p>
          <p className="flex-1 text-center font-bold mb-2 border-b-2 whitespace-nowrap">
            Visning (Godkjent / Ikke-godkjent)
          </p>
          <div className="col-span-2 flex w-full justify-end mb-2 border-b-2 ">
            <SubmitButton
              disabled={false}
              disabledTitle={'Legg til'}
              buttonText={'+'}
              handleClick={handleAdd}
            />
          </div>
          {absenceTypes?.data.map((absenceType) => (
            <AbsenceTypeRow absenceType={absenceType} key={absenceType.absenceTypeId} />
          ))}
        </div>
      </div>
    </div>
  );
}

type AbsenceTypeRowProps = {
  absenceType: AbsenceType;
};

const AbsenceTypeRow = ({ absenceType }: AbsenceTypeRowProps) => {
  const queryClient = useQueryClient();
  //Delete absenceType
  const handleDelete = async () => {
    deleteAbsenceTypeFromDatabase(absenceType.absenceTypeId);
  };

  //initialize deleteAbsence mutation
  const { mutate: deleteAbsenceTypeFromDatabase } = useMutation({
    mutationFn: deleteAbsenceType,
    onSuccess: () => queryClient.invalidateQueries(['absenceTypes'])
  });

  //Edit absenceType
  const handleEdit = async () => {
    console.log('edit');
    // display UpdateAbsenceTypeComponent
  };
  return (
    <>
      <p className="flex-1 text-center">{absenceType.name}</p>
      <p className="flex-1 text-center">{absenceType.code}</p>
      <p className="flex-1 text-center">{absenceType.colorCode}</p>
      <CalendarCellDisplay code={absenceType.code} colorCode={absenceType.colorCode} />
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </>
  );
};
