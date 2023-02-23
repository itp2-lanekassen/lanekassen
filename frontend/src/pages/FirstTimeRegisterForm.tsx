import Dropdown from '@/components/Dropdown';
import DropdownMultiSelect from '@/components/DropdownMultiSelect';
import SubmitButton from '@/components/SubmitButton';

export default function FirstTimeRegisterForm() {
  return (
    <div>
      <div className="h-32 w-80 rounded-bl-full rounded-br-full bg-card-two-light"></div>
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
