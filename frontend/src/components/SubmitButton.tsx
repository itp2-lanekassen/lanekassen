import { ISubmitButton } from '@/types/types';
import '../index.css';

export default function SubmitButton({ buttonText, handleClick }: ISubmitButton) {
  return (
    <div>
      <button
        className="flex text-white rounded-3xl bg-primary pt-3 pl-3 pr-3 pb-3 hover:text-primary hover:bg-white border-solid border-2 border-primary"
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
}
