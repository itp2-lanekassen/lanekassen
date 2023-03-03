import { AbsencePeriods } from './AbsencePeriods';
/**
 * Renders a view that shows a users absence
 */
export const AbsenceView = () => {
  return (
    <div className="m-auto bg-grey-lightest w-[800px] h-[500px] rounded-[20px] p-[25px]">
      <AbsencePeriods></AbsencePeriods>
    </div>
  );
};
