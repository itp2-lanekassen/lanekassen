import SubmitButton from '../SubmitButton';
import { useQuery } from '@tanstack/react-query';
import { getAllAbsenceTypes } from '@/API/AbsenceTypeAPI';
import AddAbsenceTypeComponent from '@/components/AdminPage/AddAbsenceTypeComponent';
import { useEffect, useState } from 'react';
import AbsenceTypeRow from './AbsenceTypeRow';

export default function AbsenceTypeView() {
  const { data: absenceTypes } = useQuery({
    queryKey: ['absenceTypes'],
    queryFn: getAllAbsenceTypes
  });
  const [view, setView] = useState<JSX.Element>(<></>);

  const handleAdd = () => {
    setView(<AddAbsenceTypeComponent setView={setView} />);
  };

  const defaultView = (
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
            <AbsenceTypeRow
              absenceType={absenceType}
              key={absenceType.absenceTypeId}
              setView={setView}
            />
          ))}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    setView(defaultView);
  }, [absenceTypes]);

  return view;
}
