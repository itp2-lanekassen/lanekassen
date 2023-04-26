import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

interface MessageBoxProps {
  confirmationText: string;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function MessageBox({
  isOpen,
  confirmationText,
  onConfirm,
  onClose
}: MessageBoxProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="bg-primary-contrast">
        {confirmationText}
      </DialogTitle>
      <DialogActions className="bg-primary-contrast">
        <Button onClick={onConfirm} autoFocus className="text-primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
