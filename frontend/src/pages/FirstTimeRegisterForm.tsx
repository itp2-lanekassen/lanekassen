import Dropdown from '@/components/Dropdown';
import DropdownMultiSelect from '@/components/DropdownMultiSelect';
import SubmitButton from '@/components/SubmitButton';
import ellipse from '@/media/Ellipse 1.png';

/*
TODO: 
pass correct handleclick function to SubmitButton
pass correct data to listOfOptions (retrieve from database)
*/

/**
 *
 * @returns component that is the page for first-time registering
 */
export default function FirstTimeRegisterForm() {
  return (
    <div className="max-w-full">
      <div className="flex flex-1 flex-col items-center">
        <img
          className="sm:w-[70vw] mobile:w-[90vw] sm:h-[20vh] mobile:h-[15vh]"
          src={ellipse}
          alt=""
        />
        <h1 className="mt-[-100px]">Første registrering</h1>
      </div>
      <div className="flex flex-1 flex-col items-center tablet:mt-20 mobile:mt-40">
        <Dropdown placeholder="Avdeling" listOfOptions={[]} />
        <Dropdown placeholder="Seksjon" listOfOptions={[]} />
        <DropdownMultiSelect placeholder="Fagområde" listOfOptions={[]} />
        <DropdownMultiSelect placeholder="Team" listOfOptions={[]} />
        <DropdownMultiSelect placeholder="Rolle" listOfOptions={[]} />
        <Dropdown placeholder="Ansattforhold" listOfOptions={[]} />
        <SubmitButton
          buttonText="Registrer deg"
          handleClick={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
    </div>
  );
}
