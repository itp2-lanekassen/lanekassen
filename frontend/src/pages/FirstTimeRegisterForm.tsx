import SubmitButton from '@/components/SubmitButton';

export default function FirstTimeRegisterForm() {
  return (
    <div>
      <SubmitButton
        buttonText="Registrer deg"
        handleClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
}
