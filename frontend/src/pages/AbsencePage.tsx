import { Absence } from '@/types/types';
import { useState } from 'react';
import { AbsencePeriods } from '@/components/AbsencePeriods';
import { EditAbsenceView } from '@/components/EditAbsenceView';
import { AddAbsenceView } from '@/components/AddAbsenceView';
import PageLayout from '@/components/PageLayout';

/**
 * Renders a view that shows a users absence and lets a user edit, delete and add new absences
 */
const AbsencePage = () => {
  const [selectedAbsence, setAbsence] = useState<Absence>();
  const [absences, setAbsences] = useState<Absence[]>([]);

  //Show AddAbsenceView if no absence has been seleced, show EditAbsenceView if an absence has been selected
  let view;
  if (!selectedAbsence) {
    view = <AddAbsenceView absences={absences}></AddAbsenceView>;
  } else {
    view = <EditAbsenceView absence={selectedAbsence} setAbsence={setAbsence}></EditAbsenceView>;
  }

  return (
    <PageLayout title="Mine fravær">
      <div className="relative m-auto h-full md:w-[750px]">
        <div className="flex flex-col md:flex-row md:gap-0 gap-6">
          <AbsencePeriods
            setAbsences={setAbsences}
            absences={absences}
            selectedAbsence={selectedAbsence}
            setAbsence={setAbsence}
          />
          {view}
        </div>
      </div>
    </PageLayout>
  );
};

export default AbsencePage;
