import { Absence } from '@/types/interfaces';
import { useState } from 'react';
import { AbsencePeriods } from '@/components/absence/AbsencePeriods';
import { EditAbsenceView } from '@/components/absence/EditAbsenceView';
import { AddAbsenceView } from '@/components/absence/AddAbsenceView';
import PageLayout from '@/pages/PageLayout';

/**
 * Renders a view that shows a users absence and lets a user edit, delete and add new absences
 */
const AbsencePage = () => {
  const [selectedAbsence, setAbsence] = useState<Absence>();
  const [absences, setAbsences] = useState<Absence[]>([]);

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
          {/* Show AddAbsenceView if no absence has been seleced, show EditAbsenceView if an absence has been selected */}
          {selectedAbsence ? (
            <EditAbsenceView
              absences={absences}
              selectedAbsence={selectedAbsence}
              setAbsence={setAbsence}
            />
          ) : (
            <AddAbsenceView absences={absences} />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default AbsencePage;
