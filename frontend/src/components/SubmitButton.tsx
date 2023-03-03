import { ISubmitButton } from '../types/types';
import '../index.css';

/**
 *
 * @param buttonText the text on the button
 * @param handleClick the onClick function
 * @returns the big purple button that is used for submitting forms
 */
export default function SubmitButton({
  buttonText,
  handleClick,
  disabled
}: ISubmitButton & { disabled?: boolean }) {
  const title = disabled
    ? 'Fyll ut avdeling, seksjon, fagområde og ansattforhold'
    : 'Trykk for å registrere bruker';
  return (
    <div>
      <button
        //className="flex text-white rounded-3xl bg-primary pt-3 pl-3 pr-3 pb-3 hover:text-primary hover:bg-white border-solid border-2 border-primary ${disabled ? 'bg-gray-300 border-gray-300 cursor-not-allowed' : 'bg-primary border-primary'}"
        className={`flex text-white rounded-3xl bg-primary pt-3 pl-3 pr-3 pb-3 hover:text-primary hover:bg-white border-solid border-2 ${
          disabled ? 'bg-gray-300 border-gray-300 cursor-not-allowed' : 'bg-primary border-primary'
        }`}
        onClick={handleClick}
        disabled={disabled}
        title={title}
      >
        {buttonText}
      </button>
    </div>
  );
}
