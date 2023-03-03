import { useEffect, useState } from 'react';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/types';
import { getAllUsers } from '@/API/UserAPI';
import { useUserContext } from '@/context/UserContext';
import CalendarRow from '@/components/CalendarRow';
import { ArrowForward, ArrowBack } from '@mui/icons-material';

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
        <button className="rounded-full bg-secondary-light px-3 py-1 text-sm text-white row-span-2 row-start-1 whitespace-nowrap mb-1 mr-4 text-center">
          Se din fraværsoversikt
        </button>
        {Object.entries(calendarColumns).map(([week, days], i) => (
          <div key={week} className="contents">
            <h6 className="col-span-5 row-start-1 w-full bg-primary-light text-white text-center relative flex items-center justify-center">
              {i === 0 && (
                <button className="text-sm absolute left-0">
                  <ArrowBack />
                </button>
              )}
              Uke&nbsp;{week}
              {i === Object.keys(calendarColumns).length - 1 && (
                <button className="text-sm absolute right-0">
                  <ArrowForward />
                </button>
              )}
            </h6>
            {days.map((d) => (
              <div
                key={String(week) + d}
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
        {data?.map((user, i) => (
          <CalendarRow key={user?.userId || i} user={user} columns={calendarColumns} />
        ))}
      </div>
    </main>
  );
};

export default CalendarPage;
