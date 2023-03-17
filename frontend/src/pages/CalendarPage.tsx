import { Fragment, useEffect, useState } from 'react';
import m from 'moment';
import { useInfiniteQuery } from '@tanstack/react-query';
import { filterUsers } from '@/API/UserAPI';
import { useUserContext } from '@/context/UserContext';
import CalendarRow from '@/components/CalendarRow';
import CalendarHeader from '@/components/CalendarHeader';
import { useFilterContext } from '../context/FilterContext';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

export type Column = Record<string, { display: string; value: string }[]>;

const CalendarPage = () => {
  const navigate = useNavigate();

  const currentUser = useUserContext();

  const { fromDate, departments, sections, teams, roles, subjectFields } = useFilterContext();

  const { hasNextPage, data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
    ['users', { departments, sections, teams, roles, subjectFields }],
    async ({ pageParam = 1 }) =>
      (
        await filterUsers({
          page: pageParam,
          excludeIds: [currentUser.userId],
          departments,
          sections,
          teams,
          roles,
          subjectFields
        })
      ).data,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page >= lastPage.totalPages) return undefined;

        return lastPage.page + 1;
      }
    }
  );

  const { ref } = useInView({
    rootMargin: '15%',
    onChange: (inView) => inView && fetchNextPage()
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

  return (
    <div className="w-full py-8">
      <div className="grid grid-cols-calendar place-content-center place-items-center gap-0.5">
        <div className="row-start-1 row-span-3 flex flex-col items-center gap-1 self-start">
          <button
            onClick={() => navigate('/fravaersside')}
            className="rounded-full bg-secondary-light px-3 py-1 text-sm text-white whitespace-nowrap text-center hover:text-secondary-light hover:bg-white border-solid border-2 hover:scale-105"
          >
            Min fraværsoversikt
          </button>
          <button
            onClick={() => navigate('/profil')}
            className="rounded-full bg-secondary-light px-3 py-1 text-sm text-white whitespace-nowrap text-center hover:text-secondary-light hover:bg-white border-solid border-2 hover:scale-105"
          >
            Min Profil
          </button>
        </div>

        <CalendarHeader columns={calendarColumns} />

        <CalendarRow user={currentUser} isCurrentUser={true} columns={calendarColumns} />

        {data.pages.map((currentPage, i) => (
          <Fragment key={i}>
            {currentPage.data.map((user) => (
              <CalendarRow key={user.userId} user={user} columns={calendarColumns} />
            ))}
          </Fragment>
        ))}

        {hasNextPage && (
          <div className="col-span-full text-primary mt-3">
            <button ref={ref} onClick={() => fetchNextPage()}>
              Hent mer data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CalendarPage;
