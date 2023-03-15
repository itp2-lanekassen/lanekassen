import { AbsencePeriod } from './AbsencePeriod';
import { Absence } from '../types/types';
import { useEffect, useState } from 'react';
import { getAbsencesByUserId } from '../API/AbsenceAPI';
import { useUserContext } from '../context/UserContext';
import moment from 'moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  const [arrowRotation, setArrowRotation] = useState('rotate(0deg)');
  const [displayArchive, setDisplayArchive] = useState<boolean>(false);
  const [displayFutureAbsences, setDisplayFutureAbsences] = useState<boolean>(true);
  useEffect(() => {
    getAbsences(currentUser, setAbsences);
  }, [absences, currentUser]);

  // Check if absence is before todays date
  const archiveAbsence = absences
    .sort((a, b) => moment(b.startDate).unix() - moment(a.startDate).unix())
    .map((absence) => {
      if (moment(absence.endDate).isBefore(moment(), 'day')) {
        return (
          <AbsencePeriod
            key={absence.absenceId}
            setAbsence={props.setAbsence}
            absence={absence}
          ></AbsencePeriod>
        );
      }
    });

  // Check if absence is after todays date
  const futureAbsence = absences
    .sort((a, b) => moment(a.startDate).unix() - moment(b.startDate).unix())
    .map((absence) => {
      if (moment(absence.endDate).isAfter(moment(), 'day')) {
        return (
          <AbsencePeriod
            key={absence.absenceId}
            setAbsence={props.setAbsence}
            absence={absence}
          ></AbsencePeriod>
        );
      }
    });

  return (
    <div className="h-[500px] w-[350px]">
      <div
        style={{
          borderRadius: '20px 20px 20px 20px',
          border: '2px solid'
        }}
        className="mt-2 border-primary-light"
      >
        <div
          style={{
            borderRadius: '20px 20px 0px 0px'
          }}
          onClick={() => {
            setDisplayFutureAbsences(displayFutureAbsences ? false : true);
            setArrowRotation(displayFutureAbsences ? 'rotate(180deg)' : 'rotate(0deg)');
          }}
          className="hover:bg-primary-light flex flex-row justify-between white mb-3 border-primary-light leading-[30px] body-tight hover:bg-black hover:text-white"
        >
          <p className="ml-[20px] text-xl">Kommende fravær</p>
          <ExpandMoreIcon
            sx={{
              color: 'primary-light',
              height: '30px',
              mr: '10px',
              transform: arrowRotation
            }}
          ></ExpandMoreIcon>
        </div>
        <div>
          {displayFutureAbsences ? (
            <div className="overflow-scroll overflow-x-hidden mb-3 flex flex-col items-center gap-[10px] scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-lighter hover:scrollbar-thumb-primary-dark scrollbar-thumb-rounded scrollbar-track-rounded">
              {futureAbsence}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div
        style={{
          borderRadius: '20px 20px 20px 20px',
          border: '2px solid'
        }}
        className="mt-10 border-primary-light"
      >
        <div
          style={{
            borderRadius: '20px 20px 0px 0px'
          }}
          onClick={() => {
            setDisplayArchive(displayArchive ? false : true);
            setArrowRotation(displayArchive ? 'rotate(0deg)' : 'rotate(180deg)');
          }}
          className="hover:bg-primary-light flex flex-row justify-between white mb-3 border-primary-light leading-[30px] body-tight hover:bg-black hover:text-white"
        >
          <p className="ml-[20px] text-xl">Arkiv</p>
          <ExpandMoreIcon
            sx={{
              color: 'primary-light',
              height: '30px',
              mr: '10px',
              transform: arrowRotation
            }}
          ></ExpandMoreIcon>
        </div>
        <div>
          {displayArchive ? (
            <div className="overflow-scroll overflow-x-hidden mb-3 flex flex-col items-center gap-[10px] scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-lighter hover:scrollbar-thumb-primary-dark scrollbar-thumb-rounded scrollbar-track-rounded">
              {archiveAbsence}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
