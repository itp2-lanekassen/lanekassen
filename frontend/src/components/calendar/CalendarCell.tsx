import { FC } from 'react';
import { useUserContext } from '@/context/UserContext';
import { useModalContext } from '@/context/ModalContext';
import { useCalendarContext } from '@/context/CalendarContext';
import { Absence, User } from '@/types/types';
import classNames from 'classnames';
import { isSameDay } from 'date-fns';

interface CalendarCellProps {
  date: string;
  isCurrentUser: boolean;
  defaultColor: string;
  hoverColor: string;
  absence?: Absence;
  user: User;
}

const getStyle = (absence?: Absence) => {
  // Return empty style if there is no absence in this cell
  if (!absence) return {};

  // Use the color code of the absence type if there is approved absence in this cell
  if (absence.isApproved) return { backgroundColor: absence.type.colorCode };

  // Use hatch pattern with the color code of the absence type for unapproved absences
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
  const { holidays, queryResult } = useCalendarContext();

  const totalRows = queryResult.data?.pages.reduce((tot, page) => (tot += page.data.length), 1);

  const holiday = holidays?.find((h) => isSameDay(new Date(date), new Date(h.date)));

  const handleCellClick = () => {
    if (!(isCurrentUser || currentUser.admin)) return;
    if (holiday) return;

    //open editing version of form if an absence was clicked, otherwise open add version
    if (absence) {
      openAbsenceForm(user, date, 'edit', absence);
    } else {
      openAbsenceForm(user, date);
    }
  };

  // Only show holiday cell
  if (holiday && !isCurrentUser) return null;

  return (
    <button
      className={classNames(
        holiday
          ? 'bg-error-light cursor-auto text-2xs'
          : `${defaultColor} hover:${hoverColor} text-sm`,
        isCurrentUser || currentUser.admin ? 'cursor-pointer' : 'cursor-default',
        'w-full h-full px-1 py-0.5',
        'text-center text-grey-lightest font-bold',
        'whitespace-nowrap overflow-hidden'
      )}
      // make holiday cell span all rows
      style={holiday ? { gridRow: `span ${totalRows} / span ${totalRows}` } : getStyle(absence)}
      title={holiday?.description}
      onClick={handleCellClick}
    >
      {holiday ? isCurrentUser && '' : absence && absence.type.code}
    </button>
  );
};

export default CalendarCell;
