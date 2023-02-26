import Dropdown from '@/components/Dropdown';
import DropdownMultiSelect from '@/components/DropdownMultiSelect';
import SubmitButton from '@/components/SubmitButton';
import ellipse from '@/media/Ellipse 1.png';

export default function FirstTimeRegisterForm() {
  return (
    <div className="max-w-full">
      <img className="w-[70vw] content-center" src={ellipse} alt="" />
      <h1 className="">Første registrering</h1>
      <div className="items-center">
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
