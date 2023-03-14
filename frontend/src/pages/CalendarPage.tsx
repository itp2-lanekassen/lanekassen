import { useEffect, useState } from 'react';
import m from 'moment';
import { useQuery } from '@tanstack/react-query';
import { User } from '../types/types';
import { filterUsers } from '../API/UserAPI';
import { useUserContext } from '../context/UserContext';
import CalendarRow from '../components/CalendarRow';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useFilterContext } from '../context/FilterContext';

export type Column = Record<string, { display: string; value: string }[]>;

const CalendarPage = () => {
  const currentUser = useUserContext();
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

    res.sort((a, b) => {
      if (a?.firstName && b?.firstName) {
        const firstnameComparison = a.firstName.localeCompare(b.firstName);

        if (firstnameComparison !== 0) {
          return firstnameComparison;
        }

        if (a?.lastName && b?.lastName) {
          return a.lastName.localeCompare(b.lastName);
        }
      }

      return 0;
    });
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
        columns[key].push({
          display: currentDay.format('DD.MM'),
          value: currentDay.toISOString()
        });
      }

      currentDay.add(1, 'd');
    }

    setCalendarColumns(columns);
  }, [fromDate]);

  if (isLoading) return <div>Laster...</div>;
  if (isError) return <div>Noe gikk galt</div>;

  function handleMyPageClick() {
    window.location.href = '/profil';
  }

  return (
    <div className="w-full py-8">
      <div className="grid grid-cols-calendar place-content-center place-items-center gap-0.5">
        <div className="row-start-1 row-span-3 flex-column ">
          <div>
            <button
              onClick={handleMyPageClick}
              className="rounded-full bg-secondary-light px-3 py-1 text-sm text-white row-start-1 row-span-3 whitespace-nowrap mb-1 mr-4 text-center hover:text-secondary-light hover:bg-white border-solid border-2 hover:scale-110"
            >
              Profil
            </button>
          </div>
          <button className="rounded-full bg-secondary-light px-3 py-1 text-sm text-white whitespace-nowrap mb-1 mr-4 text-center">
            Se din fraværsoversikt
          </button>
        </div>

        {/* <button className="rounded-full bg-primary-light px-3 py-1 text-sm text-white row-start-2 row-span-3 whitespace-nowrap mb-1 mr-4 text-center">
          Profil
        </button> */}

        <h6 className="row-start-1 col-span-20 w-full bg-primary-light text-white text-center flex justify-between items-center">
          <button
            className="text-sm"
            onClick={() =>
              setFromDate((d) => m(d).subtract(1, 'y').startOf('isoWeek').add(1, 'w').toISOString())
            }
          >
            <ArrowBack />
          </button>
          {m(fromDate).year()}
          <button
            className="text-sm"
            onClick={() => setFromDate((d) => m(d).add(1, 'y').startOf('isoWeek').toISOString())}
          >
            <ArrowForward />
          </button>
        </h6>
        {Object.entries(calendarColumns).map(([week, days], i) => (
          <div key={week} className="contents">
            <h6 className="col-span-5 row-start-2 w-full bg-primary-light text-white text-center relative flex items-center justify-center">
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
                key={week + d.value}
                className={`font-header text-primary text-sm px-0.5 w-full text-center mb-1 ${
                  i % 2 ? 'bg-card-two-dark' : 'bg-card-one-dark'
                }`}
              >
                {d.display}
              </div>
            ))}
          </div>
        ))}

        <CalendarRow user={currentUser} isCurrentUser={true} columns={calendarColumns} />
        {users.map((user, i) => (
          <CalendarRow key={user?.azureId || i} user={user} columns={calendarColumns} />
        ))}
      </div>
    </div>
  );
};
export default CalendarPage;
