import SubmitButton from '../SubmitButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { deleteAbsenceType } from '@/API/AbsenceTypeAPI';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { CalendarCellDisplay } from './CalendarCellDisplay';

export default function AbsenceTypeView() {
  const queryClient = useQueryClient();
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  //initialize deleteAbsence mutation
  const { mutate: deleteAbsenceTypeFromDatabase } = useMutation({
    mutationFn: deleteAbsenceType,
    onSuccess: () => queryClient.invalidateQueries(['absenceTypes'])
  });

  //Delete absenceType
  const handleDelete = async () => {
    deleteAbsenceTypeFromDatabase(-1); // TODO: Change to dynamic id
  };

  //Edit absenceType
  const handleEdit = async () => {
    console.log('edit');
    // display UpdateAbsenceTypeComponent
  };

  const handleAdd = async () => {
    console.log('add');
    // display AddAbsenceTypeComponent
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="absolute right-6">
          <SubmitButton
            disabled={false}
            disabledTitle={'Legg til'}
            buttonText={'+'}
            handleClick={handleAdd}
          />
        </div>
        <h3 className="text-xl">Fraværstyper</h3>
        <br />
        <div className="flex flex-col">
          <div className="flex flex-row items-center border-b-2 w-full justify-evenly">
            <p className="flex-1 text-center font-bold">Beskrivelse</p>
            <p className="flex-1 text-center font-bold">Kode</p>
            <p className="flex-1 text-center font-bold">Farge</p>
            <p className="flex-1 text-center font-bold">Visning (Godkjent / Ikke-godkjent)</p>
            <p className="flex-1 text-center font-bold"></p>
          </div>
          <div className="flex flex-row items-center w-full justify-evenly">
            <p className="flex-1 text-center">Sykdom</p>
            <p className="flex-1 text-center">A</p>
            <p className="flex-1 text-center">#590689</p>
            <div className="flex-1 text-center">
              <CalendarCellDisplay code={'A'} colorCode={'#590689'} />
            </div>
            <div className="flex-1 text-center">
              <Button onClick={handleEdit}>Edit</Button>
              <Button onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="w-1/5 px-4 py-2">Beskrivelse</th>
              <th className="w-1/5 px-4 py-2">Kode</th>
              <th className="w-1/5 px-4 py-2">Farge</th>
              <th className="w-1/5 px-4 py-2">Visning (Godkjent / Ikke-godkjent)</th>
              <th className="w-1/5 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-1/5 border px-4 py-2">Sykdom</td>
              <td className="w-1/5 border px-4 py-2">A</td>
              <td className="w-1/5 border px-4 py-2">#590689</td>
              <td className="w-1/5 border px-4 py-2">
                <CalendarCellDisplay code={'A'} colorCode={'#590689'} />
              </td>
              <td className="w-1/5 border px-4 py-2">
                <div className="flex flex-row justify-evenly">
                  <Button variant="contained" color="primary" onClick={handleEdit}>
                    Endre
                  </Button>
                  <Button variant="contained" color="error" onClick={handleDelete}>
                    Slett
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table> */
