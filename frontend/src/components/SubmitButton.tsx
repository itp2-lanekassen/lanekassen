import '../index.css';

export default function SubmitButton(buttonText: string, handleClick: () => void) {
  return (
    <div>
      <button
        className="flex text-white rounded-lg bg-primary pt-3 pl-3 pr-3 pb-3"
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
}
