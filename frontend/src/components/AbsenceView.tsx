import { Absence } from '../types/types';
import { useState } from 'react';
import { AbsencePeriods } from './AbsencePeriods';
import { EditAbsenceView } from './EditAbsenceView';
import { AddAbsenceView } from './AddAbsenceView';
import SubmitButton from './SubmitButton';
import { useNavigate } from 'react-router-dom';

/**
 * Renders a view that shows a users absence and lets a user edit, delete and add new absences
 */
export const AbsenceView = () => {
  const navigate = useNavigate();

  const [selectedAbsence, setAbsence] = useState<Absence | null>(null);
  const [absences, setAbsences] = useState<Absence[]>([]);

  //Show AddAbsenceView if no absence has been seleced, show EditAbsenceView if an absence has been selected
  let view;
  if (!selectedAbsence) {
    view = <AddAbsenceView absences={absences}></AddAbsenceView>;
  } else {
    view = <EditAbsenceView absence={selectedAbsence} setAbsence={setAbsence}></EditAbsenceView>;
  }

  return (
    <div className="relative m-auto bg-grey-lightest w-[800px] h-[550px] rounded-[20px] p-[25px]">
      <div className="flex flex-row">
        <AbsencePeriods
          setAbsences={setAbsences}
          absences={absences}
          selectedAbsence={selectedAbsence ? selectedAbsence : null}
          setAbsence={setAbsence}
        ></AbsencePeriods>
        {view}
      </div>
      <div className="absolute top-[5px] right-[5px]">
        <SubmitButton buttonText="x" handleClick={() => navigate('/')}></SubmitButton>
      </div>
    </div>
  );
};
