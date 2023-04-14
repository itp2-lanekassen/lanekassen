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
    <PageLayout title="Min fraværsoversikt">
      <div className="relative m-auto h-full md:w-[750px]">
        <div className="flex flex-col flex-col-reverse md:flex-row md:gap-0 gap-6">
          <AbsencePeriods
            setAbsences={setAbsences}
            absences={absences}
            selectedAbsence={selectedAbsence ? selectedAbsence : null}
            setAbsence={setAbsence}
          ></AbsencePeriods>
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
