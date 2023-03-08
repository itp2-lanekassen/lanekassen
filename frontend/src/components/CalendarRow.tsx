import { getAbsencesByUserId } from '@/API/AbsenceAPI';
import { useFilterContext } from '@/context/FilterContext';
import { useGlobalContext } from '@/context/GlobalContext';
import { useUserContext } from '@/context/UserContext';
import { Column } from '@/pages/CalendarPage';
import { Absence, User } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

interface CalendarRowProps {
  user?: User;
  isCurrentUser?: boolean;
  columns: Column;
}

function getBgColor(absences: Absence[] = [], day: string) {
  const matchedAbsence = absences.find((a) =>
    moment(day, 'DD.MM.YY').isBetween(moment(a.startDate), moment(a.endDate), 'd', '[]')
  );

  if (matchedAbsence) {
    return { backgroundColor: matchedAbsence.type?.colorCode };
  }
}

const CalendarRow = ({ columns, user, isCurrentUser = false }: CalendarRowProps) => {
  const { currentUser } = useUserContext();
  const { openAbsenceForm } = useGlobalContext();
  const { fromDate, toDate } = useFilterContext();

  const handleRowClick = (day: string) => {
    if (!(isCurrentUser || currentUser.admin)) return;

    openAbsenceForm(moment(day, 'DD.MM.YY').format('yyyy-MM-DD'));
  };

  const {
    data: absences,
    isLoading,
    isError,
    error
  } = useQuery(['absences', { userId: user?.userId, fromDate, toDate }], async () =>
    user ? (await getAbsencesByUserId(user.userId, fromDate, toDate)).data : []
  );

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt: {String(error)}</div>;

  return (
    <div className="contents text-sm">
      {user ? (
        <div
          className={`${
            isCurrentUser ? 'bg-secondary-light' : 'bg-primary-light'
          } text-white rounded-full w-full px-4 py`}
        >
          {user.firstName}&nbsp;{user.lastName}
        </div>
      ) : (
        <div></div>
      )}

      {Object.values(columns).map((days, j) => (
        <div key={(user?.userId || '') + days.join(',')} className="contents">
          {days.map((day) => (
            <div
              key={String(user?.userId || '') + j + day}
              className={`w-full min-h-[21px] h-full ${
                getBgColor(absences, day) ? '' : j % 2 ? 'bg-card-two' : 'bg-card-one'
              }`}
              style={getBgColor(absences, day)}
              role="button"
              onClick={() => handleRowClick(day)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalendarRow;
