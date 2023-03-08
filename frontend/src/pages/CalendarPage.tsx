import { useEffect, useState } from 'react';
import m from 'moment';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/types/types';
import { filterUsers } from '@/API/UserAPI';
import { useUserContext } from '@/context/UserContext';
import CalendarRow from '@/components/CalendarRow';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useFilterContext } from '@/context/FilterContext';

export type Column = Record<string, string[]>;

const CalendarPage = () => {
  const { currentUser } = useUserContext();
  const { fromDate, setFromDate, departments, sections, teams, roles, subjectFields } =
    useFilterContext();

  const {
    data: users,
    isLoading,
    isError
  } = useQuery<(User | undefined)[]>(['users'], async () => {
    const res = (
      await filterUsers({
        excludeIds: [currentUser.userId],
        departments,
        sections,
        teams,
        roles,
        subjectFields
      })
    ).data;
    return [...res, ...Array(30 - res.length)];
  });

  const [calendarColumns, setCalendarColumns] = useState<Column>({});

  useEffect(() => {
    const currentDay = m(fromDate);
    const toDate = m(fromDate).add(3, 'w').endOf('isoWeek');

    const columns: Column = {};

    while (currentDay.isBefore(toDate)) {
      const key = `Uke ${String(currentDay.isoWeek())}`;

      if (!columns[key]) columns[key] = [];

      if (!currentDay.format('ddd').match(/Sat|Sun/)) {
        columns[key].push(currentDay.format('DD.MM.YY'));
      }

      currentDay.add(1, 'd');
    }

    setCalendarColumns(columns);
  }, [fromDate]);

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt</div>;

  // TODO: better way of doing this?
  return (
    <main className="grid place-items-center p-10">
      <div className="calendar-view">
        <button className="rounded-full bg-secondary-light px-3 py-1 text-sm text-white row-span-2 row-start-1 whitespace-nowrap mb-1 mr-4 text-center">
          Se din fraværsoversikt
        </button>
        {Object.entries(calendarColumns).map(([week, days], i) => (
          <div key={week} className="contents">
            <h6 className="col-span-5 row-start-1 w-full bg-primary-light text-white text-center relative flex items-center justify-center">
              {i === 0 && (
                <button
                  className="text-sm absolute left-0"
                  onClick={() => setFromDate((d) => m(d).subtract(1, 'w').toISOString())}
                >
                  <ArrowBack />
                </button>
              )}
              {week}
              {i === Object.keys(calendarColumns).length - 1 && (
                <button
                  className="text-sm absolute right-0"
                  onClick={() => setFromDate((d) => m(d).add(1, 'w').toISOString())}
                >
                  <ArrowForward />
                </button>
              )}
            </h6>
            {days.map((d) => (
              <div
                key={week + d}
                className={`font-header text-primary text-xs px-0.5 w-full text-center mb-1 ${
                  i % 2 ? 'bg-card-two-dark' : 'bg-card-one-dark'
                }`}
              >
                {d}
              </div>
            ))}
          </div>
        ))}

        <CalendarRow user={currentUser} isCurrentUser={true} columns={calendarColumns} />

        {/* TODO: filter out logged in user */}
        {users.map((user, i) => (
          <CalendarRow key={user?.userId || i} user={user} columns={calendarColumns} />
        ))}
      </div>
    </main>
  );
};

export default CalendarPage;
