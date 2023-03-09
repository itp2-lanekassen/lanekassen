import { ISubmitButton } from '../types/types';
import '../index.css';

/**
 *
 * @param buttonText the text on the button
 * @param handleClick the onClick function
 * @param disabled whether the button is disabled or not
 * @param disabledTitle the title of the button when it is disabled
 * @returns the big purple button that is used for submitting forms
 */
export default function SubmitButton({
  buttonText,
  handleClick,
  disabled,
  disabledTitle
}: ISubmitButton & { disabled?: boolean; disabledTitle?: string }) {
  const enabledTitle = '';

  return (
    <div>
      <button
        //className="flex text-white rounded-3xl bg-primary pt-3 pl-3 pr-3 pb-3 hover:text-primary hover:bg-white border-solid border-2 border-primary ${disabled ? 'bg-gray-300 border-gray-300 cursor-not-allowed' : 'bg-primary border-primary'}"
        className={`flex text-white rounded-3xl bg-primary pt-3 pl-3 pr-3 pb-3 hover:text-primary hover:bg-white border-solid border-2 ${
          disabled ? 'bg-gray-300 border-gray-300 cursor-not-allowed' : 'bg-primary border-primary'
        }`}
        onClick={handleClick}
        disabled={disabled}
        title={disabled ? disabledTitle : enabledTitle}
      >
        {buttonText}
      </button>
    </div>
  );
}
