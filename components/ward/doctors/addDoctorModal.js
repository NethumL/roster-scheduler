import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/system';
import dayjs from 'dayjs';
import {
  AppBar,
  IconButton,
  Toolbar,
  useMediaQuery,
  Typography,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { Close } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';

export default function AddDoctorModal({
  open,
  handleClose,
  handleAdd,
  allDoctors,
  doctors,
  assignedDoctors,
  isEmpty,
  setIsEmpty,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const width = useMediaQuery(theme.breakpoints.down('md')) ? '100%' : '400px';

  const [newDoctor, setNewDoctor] = useState({});
  const add = () => {
    handleAdd(newDoctor);
    setNewDoctor({});
  };
  const close = () => {
    setNewDoctor({});
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={(_, reason) => {
          if (reason !== 'backdropClick') {
            handleClose();
          }
        }}
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth="sm"
      >
        {fullScreen && (
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                ADD DOCTOR
              </Typography>

              <Button autoFocus color="inherit" onClick={add}>
                ADD
              </Button>
            </Toolbar>
          </AppBar>
        )}
        {!fullScreen && (
          <DialogTitle sx={{ ml: 2, flex: 1 }}>ADD DOCTOR</DialogTitle>
        )}
        <DialogContent sx={{ p: 5 }}>
          {isEmpty && (
            <Alert
              severity="error"
              sx={{ marginY: '10px' }}
              onClose={() => {
                setIsEmpty(false);
              }}
            >
              One of the doctors must be selected
            </Alert>
          )}
          <TextField
            id="select-doctor"
            select
            label=""
            onChange={(e) => setNewDoctor(e.target.value)}
            value={newDoctor}
            fullWidth
            sx={{ mt: 3 }}
            variant="standard"
          >
            {allDoctors.map((doctor) => (
              <MenuItem
                key={doctor._id}
                value={doctor}
                disabled={assignedDoctors?.includes(doctor._id)}
              >
                {doctor.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        {!fullScreen && (
          <DialogActions>
            <Button onClick={close}>cancel</Button>

            <Button onClick={add}>add</Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
