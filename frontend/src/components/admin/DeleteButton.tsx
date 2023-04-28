import { DeleteOutline } from '@mui/icons-material';

interface DeleteButtonProps {
  onClick: () => void;
  className?: string;
}

const DeleteButton = ({ onClick, className = '' }: DeleteButtonProps) => {
  return (
    <button
      className={`bg-error text-grey-lightest hover:bg-grey-lightest hover:text-error hover:outline outline-error outline-1 rounded-md text-sm p-0.5 ${className}`}
      onClick={onClick}
    >
      <DeleteOutline />
    </button>
  );
};

export default DeleteButton;
