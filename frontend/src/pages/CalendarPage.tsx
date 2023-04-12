import { Fragment } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/UserContext';
import { useCalendarContext } from '@/context/CalendarContext';
import PageLayout from '@/components/PageLayout';
import CalendarRow from '@/components/calendar/CalendarRow';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import FilterComponents from '@/components/calendar/CalendarFilter';

const CalendarPage = () => {
  const navigate = useNavigate();

  const currentUser = useUserContext();

  const { queryResult } = useCalendarContext();

  const { ref } = useInView({
    rootMargin: '20%',
    onChange: (inView) => inView && queryResult.fetchNextPage()
  });

  if (queryResult.isError) return <div>Noe gikk galt</div>;

  return (
    <PageLayout title="Fraværsoversikt">
      <FilterComponents />

      <div className="w-full grid grid-cols-calendar-columns place-items-center gap-0.5">
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
