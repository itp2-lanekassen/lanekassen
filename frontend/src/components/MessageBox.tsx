import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

interface MessageBoxProps {
  confirmationText: string;
  isOpen: boolean;
  onConfirm: (result: boolean) => void;
}

export default function MessageBox({ isOpen, confirmationText, onConfirm }: MessageBoxProps) {
  const [open, setOpen] = React.useState(isOpen);

  const handleConfirm = () => {
    setOpen(false);
    onConfirm(true);
    return true;
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="bg-primary-contrast">
        {confirmationText}
      </DialogTitle>
      <DialogActions className="bg-primary-contrast">
        <Button onClick={handleConfirm} autoFocus className="text-primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
