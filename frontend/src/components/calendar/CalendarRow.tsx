import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { Fragment } from 'react';
import { getAbsencesByUserId } from '@/API/AbsenceAPI';
import { useCalendarContext } from '@/context/CalendarContext';
import { User } from '@/types/types';
import CalendarCell from './CalendarCell';
import UserDropdown from './UserDropdown';

interface CalendarRowProps {
  user: User;
  isCurrentUser?: boolean;
}

const CalendarRow = ({ user, isCurrentUser = false }: CalendarRowProps) => {
  const { fromDate, toDate, columns } = useCalendarContext();
  const { data: absences } = useQuery(
    ['absences', { userId: user.userId, fromDate, toDate }],
    async () => (await getAbsencesByUserId(user.userId, fromDate, toDate)).data
  );

  const absenceOnDate = (date: string) => {
    return (absences || []).find((absence) =>
      moment(date).isBetween(absence.startDate, absence.endDate, 'd', '[]')
    );
  };

  return (
    <>
      <UserDropdown user={user} isCurrentUser={isCurrentUser} />

      {Object.entries(columns).map(([week, days], idx) => (
        <Fragment key={`${user.userId}-${week}`}>
          {days.map((date) => (
            <CalendarCell
              key={`${user.userId}-${date.value}`}
              user={user}
              date={date.value}
              absence={absenceOnDate(date.value)}
              isCurrentUser={isCurrentUser}
              defaultColor={idx % 2 ? 'bg-card-two' : 'bg-card-one'}
              hoverColor={idx % 2 ? 'bg-card-two-dark' : 'bg-card-one-dark'}
            />
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default CalendarRow;
