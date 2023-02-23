import Dropdown from '@/components/Dropdown';
import DropdownMultiSelect from '@/components/DropdownMultiSelect';
import SubmitButton from '@/components/SubmitButton';
import ellipse from '@/media/Ellipse 1.png';

export default function FirstTimeRegisterForm() {
  return (
    <div>
      <img src={ellipse} alt="" />
      <h1 className="">Første registrering</h1>
      <DropdownMultiSelect placeholder={'Avdeling'} />
      <Dropdown placeholder={'Seksjon'} />
      <SubmitButton
        buttonText="Registrer deg"
        handleClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
}
