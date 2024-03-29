import { Fragment } from 'react';
import { useInView } from 'react-intersection-observer';
import CalendarFilter from '@/components/calendar/CalendarFilter';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import CalendarRow from '@/components/calendar/CalendarRow';
import PageLayout from '@/pages/PageLayout';
import { useCalendarContext } from '@/context/CalendarContext';
import { useModalContext } from '@/context/ModalContext';
import { useUserContext } from '@/context/UserContext';
import { startOfWeek } from 'date-fns';

const CalendarPage = () => {
  const currentUser = useUserContext();
  const { queryResult, updateFromDate } = useCalendarContext();
  const { openAbsenceForm } = useModalContext();

  const { ref } = useInView({
    rootMargin: '20%',
    onChange: (inView) => inView && queryResult.fetchNextPage()
  });

  if (queryResult.isError) return <div>Noe gikk galt</div>;

  return (
    <PageLayout title="Kalender">
      <CalendarFilter />

      <div className="w-full grid grid-cols-calendar-columns place-items-center gap-0.5 overflow-x-auto">
        <div className="row-start-1 row-span-3 flex flex-col gap-1 w-full self-start pt-1">
          <button
            onClick={() => openAbsenceForm(currentUser, new Date().toISOString())}
            className="rounded-full w-full lg:w-11/12 bg-primary-light px-3 py-1 text-xs lg:text-sm text-grey-lightest whitespace-nowrap text-center hover:text-primary-light hover:bg-grey-lightest border-solid border-1 mx-auto"
          >
            Legg til fravær
          </button>
          <button
            onClick={() => updateFromDate(startOfWeek(new Date()).toISOString())}
            className="rounded-full w-full lg:w-11/12 bg-primary-light px-3 py-1 text-xs lg:text-sm text-grey-lightest whitespace-nowrap text-center hover:text-primary-light hover:bg-grey-lightest border-solid border-1 mx-auto"
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
