import { EditOutlined } from '@mui/icons-material';

interface EditButtonProps {
  onClick: () => void;
  className?: string;
}

const EditButton = ({ onClick, className = '' }: EditButtonProps) => {
  return (
    <button
      className={`bg-info text-primary-light hover:bg-primary-light hover:text-info rounded-md text-sm p-0.5 ${className}`}
      onClick={onClick}
    >
      <EditOutlined />
    </button>
  );
};

export default EditButton;
