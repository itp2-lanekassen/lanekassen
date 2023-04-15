import { AbsencePeriod } from './AbsencePeriod';
import { Absence } from '../types/types';
import { getAbsencesByUserId } from '../API/AbsenceAPI';
import { useUserContext } from '../context/UserContext';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';

/**
 * Renders a scroll window that shows all absence periods for a user
 */
export const AbsencePeriods = (props: {
  setAbsence: any;
  selectedAbsence: Absence | null;
  setAbsences: any;
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
    ?.sort((a, b) => moment(b.startDate).unix() - moment(a.startDate).unix())
    .map((absence) => {
      return (
        <AbsencePeriod
          key={absence.absenceId}
          setAbsence={props.setAbsence}
          absence={absence}
        ></AbsencePeriod>
      );
    });

  return (
    <div className="h-full md:h-[500px] w-full md:w-[350px] m-auto">
      <h3 className="md:ml-[25px] md:text-left text-center md:text-2xl text-xl">Dine fravær</h3>
      <div className="overflow-scroll overflow-x-hidden md:h-[460px] flex flex-col items-center gap-[10px] scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-lighter hover:scrollbar-thumb-primary-dark scrollbar-thumb-rounded scrollbar-track-rounded">
        {absencePeriods}
      </div>
    </div>
  );
};
