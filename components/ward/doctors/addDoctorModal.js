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

export default function AddDoctorModal({
  open,
  handleClose,
  handleAdd,
  allDoctors,
  doctors,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const width = useMediaQuery(theme.breakpoints.down('md')) ? '100%' : '400px';

  const [newDoctor, setNewDoctor] = useState('');
  const [isInvaild, setIsInvalid] = useState(false);
  const add = () => {
    if (newDoctor == '') {
      setIsInvalid(true);
    } else {
      handleAdd(newDoctor);
      setIsInvalid(false);
      setNewDoctor('');
    }
  };
  const close = () => {
    setIsInvalid(false);
    setNewDoctor('');
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
          <TextField
            id="select-doctor"
            select
            label=""
            onChange={(e) => setNewDoctor(e.target.value)}
            error={isInvaild}
            value={newDoctor}
            fullWidth
            sx={{ mt: 3 }}
            variant="standard"
          >
            {allDoctors.map((doctor) => (
              <MenuItem value={doctor.name}>{doctor.name}</MenuItem>
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
