import { Fragment } from 'react';
import { useInView } from 'react-intersection-observer';
import m from 'moment';
import { useUserContext } from '@/context/UserContext';
import { useCalendarContext } from '@/context/CalendarContext';
import PageLayout from '@/components/PageLayout';
import CalendarRow from '@/components/calendar/CalendarRow';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import FilterComponents from '@/components/calendar/CalendarFilter';

const CalendarPage = () => {
  const currentUser = useUserContext();

  const { queryResult, updateFromDate } = useCalendarContext();

  const { ref } = useInView({
    rootMargin: '20%',
    onChange: (inView) => inView && queryResult.fetchNextPage()
  });

  if (queryResult.isError) return <div>Noe gikk galt</div>;

  return (
    <PageLayout title="Kalender">
      <FilterComponents />

      <div className="w-full grid grid-cols-calendar-columns place-items-center gap-0.5 overflow-x-auto">
        <div className="row-start-1 row-span-3 w-full">
          <button
            onClick={() => updateFromDate(m().startOf('isoWeek').toISOString())}
            className="rounded-full w-full bg-primary-light px-3 py-1 text-sm text-white whitespace-nowrap text-center hover:text-primary-light hover:bg-white border-solid border-1"
          >
            Denne uken
          </button>
        </div>

        <CalendarHeader />

        <CalendarRow user={currentUser} isCurrentUser={true} />

        {(queryResult.data?.pages || []).map((currentPage, i) => (
          <Fragment key={i}>
            {currentPage.data.map((user) => (
              <CalendarRow key={user.userId} user={user} />
            ))}
          </Fragment>
        ))}
      </div>
      <div className="text-primary flex justify-center mt-3">
        {(queryResult.isInitialLoading || queryResult.isFetchingNextPage) && <div>Laster...</div>}

        {queryResult.hasNextPage && !queryResult.isFetchingNextPage && (
          <div ref={ref}>Hent mer data</div>
        )}
      </div>
    </PageLayout>
  );
};

export default CalendarPage;
