import { AbsencePeriod } from './AbsencePeriod';
import { Absence } from '../types/types';
import { useEffect, useState } from 'react';
import { getAbsencesByUserId } from '../API/AbsenceAPI';
import { useUserContext } from '../context/UserContext';
import moment from 'moment';

//Get all absences for a user from database
async function getAbsences(currentUser: { userId: number }, setAbsences: any) {
  setAbsences(await getAbsencesByUserId(currentUser.userId).then((response) => response.data));
}

/**
 * Renders a scroll window that shows all absence periods for a user
 */
export const AbsencePeriods = (props: { setAbsence: any; selectedAbsence?: Absence }) => {
  const currentUser = useUserContext();
  const [absences, setAbsences] = useState<Absence[]>([]);
  useEffect(() => {
    getAbsences(currentUser, setAbsences);
  }, [absences, currentUser]);

  //Sort and return all absences in AbsencePeriod components
  const absencePeriods = absences
    .sort((a, b) => moment(a.startDate).unix() - moment(b.startDate).unix())
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
    <div className="h-[500px] w-[350px]">
      <h3 className="ml-[25px]">Dine fravær</h3>
      <div className="overflow-scroll overflow-x-hidden h-[460px] w-[350px] flex flex-col items-center gap-[10px] scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-lighter hover:scrollbar-thumb-primary-dark scrollbar-thumb-rounded scrollbar-track-rounded">
        {absencePeriods}
      </div>
    </div>
  );
};
