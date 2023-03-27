import { Absence } from '../types/types';
import { useState } from 'react';
import { AbsencePeriods } from './AbsencePeriods';
import { EditAbsenceView } from './EditAbsenceView';
import { AddAbsenceView } from './AddAbsenceView';
import SubmitButton from './SubmitButton';
import { useNavigate } from 'react-router-dom';
import PageLayout from './PageLayout';

/**
 * Renders a view that shows a users absence and lets a user edit, delete and add new absences
 */
export const AbsenceView = () => {
  const navigate = useNavigate();

  const [absence, setAbsence] = useState<Absence>();

  //Show AddAbsenceView if no absence has been seleced, show EditAbsenceView if an absence has been selected
  let view;
  if (!absence) {
    view = <AddAbsenceView></AddAbsenceView>;
  } else {
    view = <EditAbsenceView absence={absence} setAbsence={setAbsence}></EditAbsenceView>;
  }

  return (
    <PageLayout title="Din egen fraværsoversikt">
      <div className="relative m-auto w-[800px] h-[550px] p-[25px]">
        <div className="flex flex-row">
          <AbsencePeriods selectedAbsence={absence} setAbsence={setAbsence}></AbsencePeriods>
          {view}
        </div>
      </div>
      <div className="absolute top-10 left-10 flex justify-end">
        <SubmitButton
          disabledTitle={'Tilbake'}
          buttonText={'Tilbake til kalender'}
          handleClick={() => {
            navigate('/');
          }}
        />
      </div>
    </PageLayout>
  );
};
