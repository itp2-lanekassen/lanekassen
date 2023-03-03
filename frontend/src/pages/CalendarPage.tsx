import { useEffect, useState } from 'react';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/types';
import { getAllUsers } from '@/API/UserAPI';
import { useUserContext } from '@/context/UserContext';
import CalendarRow from '@/components/CalendarRow';

export type Column = Record<number, string[]>;

const CalendarPage = () => {
  const { data, isLoading } = useQuery<(User | undefined)[]>(['users'], async () => {
    const users = (await getAllUsers()).data;
    return [...users, ...Array(30 - users.length)];
  });

  const { currentUser } = useUserContext();

  // TODO: set somewhere
  const [currentWeek] = useState(moment().startOf('w'));
  // ? Thought this would be 4, but ok
  const [numberOfWeeks] = useState(3);
  const [calendarColumns, setCalendarColumns] = useState<Column>({});

  useEffect(() => {
    const startWeek = moment(currentWeek);
    const endWeek = moment(currentWeek).add(numberOfWeeks, 'w').endOf('w');

    const columns: Column = {};

    while (startWeek < endWeek) {
      if (!columns[startWeek.week()]) columns[startWeek.week()] = [];
      if (!startWeek.format('ddd').match(/Sat|Sun/)) {
        columns[startWeek.week()].push(startWeek.format('DD.MM.YY'));
      }
      startWeek.add(1, 'd');
    }

    setCalendarColumns(columns);
  }, [currentWeek, numberOfWeeks]);

  if (isLoading) return null;

  // TODO: better way of doing this?
  return (
    <main className="grid place-items-center p-10">
      <div className="calendar-view">
        <button className="rounded-full bg-secondary-light px-3 py-1 button-medium text-white row-span-2 row-start-1 whitespace-nowrap mb-1 mr-4">
          Se din fraværsoversikt
        </button>
        {Object.entries(calendarColumns).map(([week, days], i) => (
          <div key={week} className="contents">
            <div className="heading-xs col-span-5 row-start-1 w-full bg-primary text-white text-center relative">
              Uke&nbsp;{week}
              {i === 0 && (
                <div className="absolute arrow-left top-0 -translate-x-full -left-0.5 border-r-primary" />
              )}
              {i === Object.keys(calendarColumns).length - 1 && (
                <div className="absolute arrow-right top-0 translate-x-full -right-0.5 border-l-primary" />
              )}
            </div>
            {days.map((d) => (
              <div
                key={String(week) + d}
                className={`font-header text-primary text-sm px-2 w-full text-center mb-1 ${
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
        {data?.map((user, i) => (
          <CalendarRow key={user?.userId || i} user={user} columns={calendarColumns} />
        ))}
      </div>
    </main>
  );
};

export default CalendarPage;
