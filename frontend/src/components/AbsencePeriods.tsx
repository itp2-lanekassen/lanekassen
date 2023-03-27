import { AbsencePeriod } from './AbsencePeriod';
import { Absence } from '../types/types';
import { useEffect } from 'react';
import { getAbsencesByUserId } from '../API/AbsenceAPI';
import { useUserContext } from '../context/UserContext';
import moment from 'moment';

//Get all absences for a user from database
export async function getAbsences(
  currentUser: { userId: number },
  setAbsences: React.Dispatch<React.SetStateAction<Absence[]>>
) {
  setAbsences(await getAbsencesByUserId(currentUser.userId).then((response) => response.data));
}

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

  //update absences displayed in AbsenceView when absences changes
  useEffect(() => {
    getAbsences(currentUser, props.setAbsences);
  }, [props.absences]);

  //Sort and return all absences in AbsencePeriod components
  const absencePeriods = props.absences
    .sort((a, b) => moment(b.startDate).unix() - moment(a.startDate).unix())
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
