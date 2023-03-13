import { Absence } from '../types/types';
import { useState } from 'react';
import { AbsencePeriods } from './AbsencePeriods';
import { EditAbsenceView } from './EditAbsenceView';
import { AddAbsenceView } from './AddAbsenceView';

/**
 * Renders a view that shows a users absence and lets a user edit, delete and add new absences
 */
export const AbsenceView = () => {
  const [absence, setAbsence] = useState<Absence>();

  //Show AddAbsenceView if no absence has been seleced, show EditAbsenceView if an absence has been selected
  let view;
  if (!absence) {
    view = <AddAbsenceView></AddAbsenceView>;
  } else {
    view = <EditAbsenceView absence={absence} setAbsence={setAbsence}></EditAbsenceView>;
  }

  return (
    <div className="m-auto bg-grey-lightest w-[800px] h-[550px] rounded-[20px] p-[25px]">
      <div className="flex flex-row">
        <AbsencePeriods selectedAbsence={absence} setAbsence={setAbsence}></AbsencePeriods>
        {view}
      </div>
    </div>
  );
};
