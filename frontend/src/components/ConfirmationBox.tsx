import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

interface ConfirmationBoxProps {
  confirmationText: string;
  isOpen: boolean;
  onConfirm: (result: boolean) => void;
}

export default function ConfirmationBox({
  isOpen,
  confirmationText,
  onConfirm
}: ConfirmationBoxProps) {
  const [open, setOpen] = React.useState(isOpen);

  const handleClose = () => {
    setOpen(false);
    onConfirm(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    onConfirm(true);
    return true;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="bg-primary-contrast">
        {confirmationText}
      </DialogTitle>
      <DialogActions className="bg-primary-contrast">
        <Button onClick={handleClose} style={{ color: '#410464' }}>
          Avbryt
        </Button>
        <Button onClick={handleConfirm} autoFocus style={{ color: '#410464' }}>
          Ja
        </Button>
      </DialogActions>
    </Dialog>
  );
}
