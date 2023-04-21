import SubmitButton from '../SubmitButton';
import { useQuery } from '@tanstack/react-query';
import { getAllAbsenceTypes } from '@/API/AbsenceTypeAPI';
import AddAbsenceTypeComponent from '@/components/AdminPage/AddAbsenceTypeComponent';
import { useEffect, useState } from 'react';
import AbsenceTypeRow from './AbsenceTypeRow';
import { Add } from '@mui/icons-material';

export default function AbsenceTypeView() {
  const { data: absenceTypes } = useQuery({
    queryKey: ['absenceTypes'],
    queryFn: async () => (await getAllAbsenceTypes()).data
  });
  const [view, setView] = useState<JSX.Element>(<></>);

  const handleAdd = () => {
    setView(<AddAbsenceTypeComponent setView={setView} />);
  };

  const defaultView = (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center w-full ">
        <div className="grid-cols-absence-types-small md:grid-cols-absence-types grid col-span-4 w-full place-item-center gap-x-2 gap-y-3 md:col-span-6">
          <p className="flex-1 text-center font-bold mb-2 border-b-2">Beskrivelse</p>
          <p className="flex-1 text-center font-bold mb-2 border-b-2 hidden md:block">
            Forkortelse
          </p>
          <p className="flex-1 text-center font-bold mb-2 border-b-2 hidden md:block ">Farge</p>
          <p className="flex-1 text-center font-bold mb-2 border-b-2 whitespace-nowrap">
            Visning (Godkjent / Ikke-godkjent)
          </p>
          <div className="col-span-2 flex w-full justify-end mb-2 border-b-2 ">
            <SubmitButton handleClick={handleAdd}>
              <Add />
            </SubmitButton>
          </div>
          {absenceTypes?.map((absenceType) => (
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
