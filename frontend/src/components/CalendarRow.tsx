import { getAbsencesByUserId } from '@/API/AbsenceAPI';
import { useFilterContext } from '@/context/FilterContext';
import { Column } from '@/pages/CalendarPage';
import { User } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { Fragment } from 'react';
import CalendarCell from './CalendarCell';

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
    <>
      <div
        className={`${
          isCurrentUser ? 'bg-secondary-light' : 'bg-primary-light'
        } text-sm text-white rounded-full w-full px-4 py`}
      >
        {user.firstName}&nbsp;{user.lastName}
      </div>

      {Object.entries(columns).map(([week, days], j) => (
        <Fragment key={`${user.userId}-${week}`}>
          {days.map((date) => (
            <CalendarCell
              key={`${user.userId}-${date.value}`}
              date={date.value}
              absence={absenceOnDate(date.value)}
              isCurrentUser={isCurrentUser}
              defaultColor={j % 2 ? 'bg-card-two' : 'bg-card-one'}
            />
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default CalendarRow;
