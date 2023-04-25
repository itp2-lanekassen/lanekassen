import { useQuery } from '@tanstack/react-query';
import { getAbsencesByUserId } from '@/API/AbsenceAPI';
import { useCalendarContext } from '@/context/CalendarContext';
import { User } from '@/types/types';
import CalendarCell from './CalendarCell';
import UserDropdown from './UserDropdown';
import { isWithinInterval } from 'date-fns';

interface CalendarRowProps {
  user: User;
  isCurrentUser?: boolean;
}

const CalendarRow = ({ user, isCurrentUser = false }: CalendarRowProps) => {
  const { dates, columns } = useCalendarContext();
  const { data: absences } = useQuery(
    ['absences', { userId: user.userId, dates }],
    async () => (await getAbsencesByUserId(user.userId, dates.from, dates.to)).data
  );

  const absenceOnDate = (date: string) => {
    return (absences || []).find((absence) =>
      isWithinInterval(new Date(date), {
        start: new Date(absence.startDate),
        end: new Date(absence.endDate)
      })
    );
  };

  return (
    <>
      <UserDropdown user={user} isCurrentUser={isCurrentUser} />

      {columns.days.map((date) => (
        <CalendarCell
          key={`${user.userId}-${date.value}`}
          user={user}
          date={date.value}
          absence={absenceOnDate(date.value)}
          isCurrentUser={isCurrentUser}
          defaultColor={date.week % 2 ? 'bg-card-two' : 'bg-card-one'}
          hoverColor={date.week % 2 ? 'bg-card-two-dark' : 'bg-card-one-dark'}
        />
      ))}
    </>
  );
};

export default CalendarRow;
