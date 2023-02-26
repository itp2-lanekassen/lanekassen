import Dropdown from '@/components/Dropdown';
import DropdownMultiSelect from '@/components/DropdownMultiSelect';
import SubmitButton from '@/components/SubmitButton';
import ellipse from '@/media/Ellipse 1.png';

/*
TODO: 
pass correct handleclick function to SubmitButton
pass correct data to the dropdown menus
*/

/**
 *
 * @returns component that is the page for first-time registering
 */
export default function FirstTimeRegisterForm() {
  return (
    <div className="max-w-full">
      <div className="flex flex-1 flex-col items-center">
        <img className="w-[70vw]" src={ellipse} alt="" />
        <h1 className="mt-[-100px]">Første registrering</h1>
      </div>
      <div className="flex flex-1 flex-col items-center mt-20">
        <Dropdown placeholder="Avdeling" />
        <Dropdown placeholder="Seksjon" />
        <DropdownMultiSelect placeholder="Fagområde" />
        <DropdownMultiSelect placeholder="Team" />
        <DropdownMultiSelect placeholder="Rolle" />
        <Dropdown placeholder="Ansattforhold" />
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
