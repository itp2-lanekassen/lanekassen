import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

interface MessageBoxProps {
  confirmationText: string;
  isOpen: boolean;
}

export default function MessageBox({ isOpen, confirmationText }: MessageBoxProps) {
  const [open, setOpen] = React.useState(isOpen);

  const handleConfirm = () => {
    setOpen(false);
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
        <Button onClick={handleConfirm} autoFocus style={{ color: '#410464' }}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
