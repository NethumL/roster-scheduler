import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function deleteConfirm(
  open,
  deleteIndex,
  handleClose,
  handleDeleteConfirm
) {
  return (
    <div>
      <Dialog
        open={open.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'DELETE WARD'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this ward?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={open.handleClose}>CANCEL</Button>
          <Button
            onClick={() => open.handleDeleteConfirm(open.index)}
            autoFocus
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
