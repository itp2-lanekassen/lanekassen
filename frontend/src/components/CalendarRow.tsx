import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { Fragment } from 'react';
import { getAbsencesByUserId } from '../API/AbsenceAPI';
import { useFilterContext } from '../context/FilterContext';
import { Column } from '../pages/CalendarPage';
import { User } from '../types/types';
import CalendarCell from './CalendarCell';
import UserDropdown from './UserDropdown';

interface CalendarRowProps {
  user: User;
  isCurrentUser?: boolean;
  columns: Column;
}

const CalendarRow = ({ columns, user, isCurrentUser = false }: CalendarRowProps) => {
  const { fromDate, toDate } = useFilterContext();
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
    <div className="contents text-sm">
      {user ? <UserDropdown user={user} isCurrentUser={isCurrentUser} /> : <div />}

      {Object.entries(columns).map(([week, days], j) => (
        <Fragment key={`${user.userId}-${week}`}>
          {days.map((date) => (
            <CalendarCell
              key={`${user.userId}-${date.value}`}
              user={user}
              date={date.value}
              absence={absenceOnDate(date.value)}
              isCurrentUser={isCurrentUser}
              defaultColor={j % 2 ? 'bg-card-two' : 'bg-card-one'}
              hoverColor={j % 2 ? 'bg-card-two-dark' : 'bg-card-one-dark'}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default CalendarRow;
