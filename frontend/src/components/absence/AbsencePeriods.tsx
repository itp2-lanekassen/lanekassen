import { AbsencePeriod } from './AbsencePeriod';
import { Absence } from '@/types/types';
import { getAbsencesByUserId } from '@/api/absence';
import { useUserContext } from '@/context/UserContext';
import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

/**
 * Renders a scroll window that shows all absence periods for a user
 */
export const AbsencePeriods = (props: {
  setAbsence: Dispatch<SetStateAction<Absence | undefined>>;
  selectedAbsence?: Absence;
  setAbsences: Dispatch<SetStateAction<Absence[]>>;
  absences: Absence[];
}) => {
  const currentUser = useUserContext();

  const { data: absences } = useQuery(
    ['absences', { userId: currentUser.userId }],
    () => getAbsencesByUserId(currentUser.userId).then((response) => response.data),
    {
      onSuccess: (data) => {
        props.setAbsences(data);
      }
    }
  );

  const absencePeriods = absences
    ?.sort((a, b) => new Date(b.startDate).valueOf() - new Date(a.startDate).valueOf())
    .map((absence) => {
      return (
        <AbsencePeriod
          key={absence.absenceId}
          isSelected={props.selectedAbsence?.absenceId === absence.absenceId}
          setAbsence={props.setAbsence}
          absence={absence}
        />
      );
    });

  return (
    <div className="h-full md:h-[500px] w-full md:w-[350px] mx-auto">
      <h3 className="md:ml-[25px] md:text-left text-center md:text-2xl">Dine fravær</h3>
      <div className="md:h-[460px] overflow-y-auto items-center gap-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-lighter hover:scrollbar-thumb-primary-dark scrollbar-thumb-rounded scrollbar-track-rounded py-0.5">
        {absencePeriods}
      </div>
    </div>
  );
};
