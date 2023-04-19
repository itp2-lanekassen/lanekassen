import { ReactNode } from 'react';

interface SubmitButtonProps {
  disabledTitle?: string;
  disabled?: boolean;
  buttonText?: string;
  handleClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
  rounded?: string;
  bgColor?: string;
  hover?: string;
  className?: string;
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
  rounded = 'rounded-full',
  bgColor = 'bg-primary disabled:bg-grey-darker',
  type = 'button',
  hover = 'hover:text-primary hover:bg-primary-contrast',
  className = ''
}: SubmitButtonProps) {
  return (
    <div className={className}>
      <button
        className={`flex ${rounded} text-grey-lightest ${bgColor} p-3 ${hover} border-solid border-2  ${
          disabled ? 'bg-gray-300 border-gray-300 cursor-not-allowed' : ''
        } '}`}
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
