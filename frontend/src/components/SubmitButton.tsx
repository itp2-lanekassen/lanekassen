import { ReactNode } from 'react';

interface SubmitButtonProps {
  disabledTitle?: string;
  disabled?: boolean;
  buttonText?: string;
  handleClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
}

/**
 *
 * @param buttonText the text on the button
 * @param handleClick the onClick function
 * @param disabled whether the button is disabled or not
 * @param disabledTitle the title of the button when it is disabled
 * @param type button type
 * @returns the big purple button that is used for submitting forms
 */
export default function SubmitButton({
  buttonText,
  handleClick,
  disabled,
  disabledTitle,
  children,
  type = 'button'
}: SubmitButtonProps) {
  return (
    <div>
      <button
        className={`flex text-white rounded-full bg-primary p-3 hover:text-primary hover:bg-white border-solid border-2 ${
          disabled ? 'bg-gray-300 border-gray-300 cursor-not-allowed' : 'bg-primary border-primary'
        }`}
        onClick={handleClick}
        disabled={disabled}
        title={disabled ? disabledTitle : ''}
        type={type}
      >
        {children || buttonText}
      </button>
    </div>
  );
}
