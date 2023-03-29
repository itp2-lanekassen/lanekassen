import moment from 'moment';
import { FC } from 'react';
import { useModalContext } from '../context/ModalContext';
import { useUserContext } from '../context/UserContext';
import { Absence, Holiday, User } from '../types/types';
import { useGlobalContext } from '@/context/GlobalContext';

interface CalendarCellProps {
  date: string;
  isCurrentUser: boolean;
  defaultColor: string;
  hoverColor: string;
  absence?: Absence;
  user: User;
}

const getStyle = (absence?: Absence, holiday?: Holiday) => {
  if (holiday) return { backgroundColor: '#FF0000' };

  if (!absence) return {};

  // solid background with absence.type?.colorCode as background color
  if (absence.isApproved) return { backgroundColor: absence.type.colorCode };

  //hatch pattern with absence.type.colorCode as background color
  return {
    backgroundImage: `repeating-linear-gradient(
      135deg,
      ${absence.type.colorCode},
      ${absence.type.colorCode} 4px,
      #000000 3px,
      #000000 8px
    )`
  };
};

const CalendarCell: FC<CalendarCellProps> = ({
  user,
  date,
  isCurrentUser,
  defaultColor,
  hoverColor,
  absence
}) => {
  const currentUser = useUserContext();
  const { openAbsenceForm } = useModalContext();
  const { holidays } = useGlobalContext();
  const holiday = holidays?.find((h) => moment(date).isSame(h.date, 'd'));

  //TODO: bruk moment(date) til å sjekke om den datoen har fravær fra før
  const handleCellClick = () => {
    if (!(isCurrentUser || currentUser.admin)) return;

    //open editing version of form if an absence was clicked, otherwise open add version
    if (absence) {
      openAbsenceForm(user, moment(date).format('yyyy-MM-DD'), 'edit', absence);
    } else {
      openAbsenceForm(user, moment(date).format('yyyy-MM-DD'));
    }
  };

  return (
    <div
      className={`hover:${hoverColor} ${defaultColor} ${
        isCurrentUser || currentUser.admin ? 'cursor-pointer' : 'cursor-default'
      } w-full min-h-[21px] h-full`}
      style={getStyle(absence, holiday)}
      // onClick={absence ? undefined : handleCellClick}
      onClick={handleCellClick}
    >
      {/* If absence and holiday on same day, only display holiday */}
      {absence && holiday ? (
        <span className="inset-0 flex items-center justify-center text-[0.65rem] text-white px-1 hover:scale-115">
          {holiday.description}
        </span>
      ) : (
        <>
          {absence && (
            <span className="inset-0 flex items-center justify-center text-sm text-white px-1 font-bold hover:scale-115">
              {absence.type.code}
            </span>
          )}
          {holiday && (
            <span className="inset-0 flex items-center justify-center text-[0.65rem] text-white px-1 hover:scale-115">
              {holiday.description}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default CalendarCell;
