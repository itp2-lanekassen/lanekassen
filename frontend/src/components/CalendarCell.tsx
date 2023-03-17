import { useModalContext } from '../context/ModalContext';
import { useUserContext } from '../context/UserContext';
import { Absence } from '../types/types';
import moment from 'moment';
import { FC } from 'react';

interface CalendarCellProps {
  date: string;
  isCurrentUser: boolean;
  defaultColor: string;
  absence?: Absence;
}

const getStyle = (absence?: Absence) => {
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

const CalendarCell: FC<CalendarCellProps> = ({ date, isCurrentUser, defaultColor, absence }) => {
  const currentUser = useUserContext();
  const { openAbsenceForm } = useModalContext();

  const handleCellClick = () => {
    if (!(isCurrentUser || currentUser.admin)) return;
    openAbsenceForm(moment(date).format('yyyy-MM-DD'));
  };

  return (
    <div
      className={`${defaultColor} ${
        isCurrentUser ? 'cursor-pointer' : 'cursor-default'
      } w-full min-h-[21px] h-full`}
      style={getStyle(absence)}
      onClick={handleCellClick}
    >
      {absence && (
        <span className="inset-0 flex items-center justify-center text-sm text-white px-1 font-bold">
          {absence.type.code}
        </span>
      )}
    </div>
  );
};

export default CalendarCell;
