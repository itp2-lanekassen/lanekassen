import { FC } from 'react';
import moment from 'moment';
import { useUserContext } from '@/context/UserContext';
import { useModalContext } from '@/context/ModalContext';
import { useCalendarContext } from '@/context/CalendarContext';
import { Absence, User } from '@/types/types';
import classNames from 'classnames';

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

  // Only show holiday cell
  if (holiday && !isCurrentUser) return null;

  return (
    <div
      className={classNames(
        holiday
          ? 'bg-error-light hover:bg-error text-2xs'
          : `${defaultColor} hover:${hoverColor} text-sm`,
        isCurrentUser || currentUser.admin ? 'cursor-pointer' : 'cursor-default',
        'w-full h-full px-1 py-0.5',
        'text-center text-grey-lightest font-bold',
        'whitespace-nowrap overflow-hidden'
      )}
      // make holiday cell span all rows
      style={holiday ? { gridRow: `span ${totalRows} / span ${totalRows}` } : getStyle(absence)}
      onClick={handleCellClick}
    >
      {holiday ? isCurrentUser && holiday.description : absence && absence.type.code}
    </div>
  );
};

export default CalendarCell;
