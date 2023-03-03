import { AbsencePeriod } from './AbsencePeriod';
/**
 * Renders a component that shows all absence periods for a user
 */

export const AbsencePeriods = () => {
  //const [loggedIn, setLoggedIn] = useRecoilState(tempFahrenheit);

  return (
    <div className="h-[450px] w-[350px]">
      <h3 className="ml-[25px]">Dine fravær</h3>
      <div className="overflow-scroll overflow-x-hidden h-[410px] w-[350px] flex flex-col items-center gap-[10px] scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-lighter hover:scrollbar-thumb-primary-dark scrollbar-thumb-rounded scrollbar-track-rounded">
        <AbsencePeriod
          dateStart="123"
          dateEnd="124"
          absenceType="Fravær, ikke tilgjengelig"
          personalNote="Skal på ferie til Hellas"
        ></AbsencePeriod>
        <AbsencePeriod
          dateStart="123"
          dateEnd="124"
          absenceType="Fravær, ikke tilgjengelig"
          personalNote="Skal på ferie til Hellas Skal på ferie til HellasSkal på ferie til HellasSkal på ferie til HellasSkal på ferie til HellasSkal på ferie til HellasSkal på ferie til HellasSkal på ferie til HellasSkal på ferie til HellasSkal på ferie til HellasSkal på ferie til HellasSkal på ferie til Hellas"
        ></AbsencePeriod>{' '}
        <AbsencePeriod
          dateStart="123"
          dateEnd="124"
          absenceType="Fravær, ikke tilgjengelig"
          personalNote="Skal på ferie til Hellas"
        ></AbsencePeriod>{' '}
        <AbsencePeriod
          dateStart="123"
          dateEnd="124"
          absenceType="Fravær, ikke tilgjengelig"
          personalNote="Skal på ferie til Hellas"
        ></AbsencePeriod>{' '}
        <AbsencePeriod
          dateStart="123"
          dateEnd="124"
          absenceType="Fravær, ikke tilgjengelig"
          personalNote="Skal på ferie til Hellas"
        ></AbsencePeriod>{' '}
        <AbsencePeriod
          dateStart="123"
          dateEnd="124"
          absenceType="Fravær, ikke tilgjengelig"
          personalNote="Skal på ferie til Hellas"
        ></AbsencePeriod>{' '}
        <AbsencePeriod
          dateStart="123"
          dateEnd="124"
          absenceType="Fravær, ikke tilgjengelig"
          personalNote="Skal på ferie til Hellas"
        ></AbsencePeriod>{' '}
        <AbsencePeriod
          dateStart="123"
          dateEnd="124"
          absenceType="Fravær, ikke tilgjengelig"
          personalNote="Skal på ferie til Hellas"
        ></AbsencePeriod>{' '}
        <AbsencePeriod
          dateStart="123"
          dateEnd="124"
          absenceType="Fravær, ikke tilgjengelig"
          personalNote="Skal på ferie til Hellas"
        ></AbsencePeriod>
        <AbsencePeriod
          dateStart="123"
          dateEnd="124"
          absenceType="Fravær, ikke tilgjengelig"
          personalNote="Skal på ferie til Hellas"
        ></AbsencePeriod>{' '}
        <AbsencePeriod
          dateStart="123"
          dateEnd="124"
          absenceType="Fravær, ikke tilgjengelig"
          personalNote="Skal på ferie til Hellas"
        ></AbsencePeriod>{' '}
        <AbsencePeriod
          dateStart="123"
          dateEnd="124"
          absenceType="Fravær, ikke tilgjengelig"
          personalNote="Skal på ferie til Hellas"
        ></AbsencePeriod>{' '}
        <AbsencePeriod
          dateStart="123"
          dateEnd="124"
          absenceType="Fravær, ikke tilgjengelig"
          personalNote="Skal på ferie til Hellas"
        ></AbsencePeriod>{' '}
        <AbsencePeriod
          dateStart="123"
          dateEnd="124"
          absenceType="Fravær, ikke tilgjengelig"
          personalNote="Skal på ferie til Hellas"
        ></AbsencePeriod>
      </div>
    </div>
  );
};
