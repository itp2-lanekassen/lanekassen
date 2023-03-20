interface PlusButtonProps {
  handleClick: () => void;
}

export default function PlusButton({ handleClick }: PlusButtonProps) {
  return (
    <div>
      <button className="bg-primary p-3 pr-4 pl-4 rounded-full text-white" onClick={handleClick}>
        +
      </button>
    </div>
  );
}
