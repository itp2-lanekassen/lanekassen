import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmationBoxProps {
  confirmationText: string;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmationBox({
  isOpen,
  confirmationText,
  onConfirm,
  onClose
}: ConfirmationBoxProps) {
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
        <Button onClick={onClose} className="text-primary">
          Avbryt
        </Button>
        <Button onClick={onConfirm} autoFocus className="text-primary">
          Ja
        </Button>
      </DialogActions>
    </Dialog>
  );
}
