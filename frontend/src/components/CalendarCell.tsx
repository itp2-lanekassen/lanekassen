import { useModalContext } from '@/context/ModalContext';
import { useUserContext } from '@/context/UserContext';
import { Absence } from '@/types/types';
import moment from 'moment';
import { FC } from 'react';

interface CalendarCellProps {
  date: string;
  isCurrentUser: boolean;
  defaultColor: string;
  absence?: Absence;
}

const CalendarCell: FC<CalendarCellProps> = ({ date, isCurrentUser, defaultColor, absence }) => {
  const currentUser = useUserContext();
  const { openAbsenceForm } = useModalContext();

  const handleCellClick = () => {
    if (!(isCurrentUser || currentUser.admin)) return;

    openAbsenceForm(moment(date).format('yyyy-MM-DD'));
  };

  if (!absence)
    return (
      <div
        className={`${defaultColor} ${
          isCurrentUser ? 'cursor-pointer' : 'cursor-default'
        } w-full min-h-[21px] h-full`}
        onClick={handleCellClick}
      />
    );

  return (
    <div
      className={`w-full min-h-[21px] h-full ${
        isCurrentUser ? 'cursor-pointer' : 'cursor-default'
      }`}
      style={{ backgroundColor: absence.type.colorCode }}
      role="button"
      onClick={handleCellClick}
    />
  );
};

export default CalendarCell;
