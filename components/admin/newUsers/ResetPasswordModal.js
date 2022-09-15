import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/system';
import {
  AppBar,
  IconButton,
  Toolbar,
  useMediaQuery,
  Typography,
  MenuItem,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function ResetPasswordModal({
  open,
  user,
  handleClose,
  handleSave,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const width = useMediaQuery(theme.breakpoints.down('md')) ? '100%' : '400px';

  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const save = () => {
    handleSave(user.username, password);
    setPassword('');
    setConfPassword('');
  };

  const close = () => {
    handleClose();
    setPassword('');
    setConfPassword('');
  };

  return (
    <div>
      <Dialog open={open} onClose={close} fullScreen={fullScreen}>
        {fullScreen && (
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={close}
                aria-label="close"
              >
                X
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Reset Password
              </Typography>
              <Button autoFocus color="inherit" onClick={save}>
                Save
              </Button>
            </Toolbar>
          </AppBar>
        )}
        {!fullScreen && <DialogTitle>Reset Password</DialogTitle>}
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Name"
            value={user ? user.name : ''}
            type="text"
            fullWidth
            disabled
            variant="standard"
            sx={{ width }}
          />
          <TextField
            margin="dense"
            id="username"
            label="Username"
            value={user ? user.username : ''}
            type="text"
            fullWidth
            disabled
            variant="standard"
            sx={{ width, mt: 3 }}
          />
          <TextField
            margin="dense"
            id="type"
            label="Type"
            value={
              user ? (user.type === 'doctor' ? 'Doctor' : 'Consultant') : ''
            }
            type="text"
            fullWidth
            disabled
            variant="standard"
            sx={{ width, mt: 3 }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="new-password"
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            fullWidth
            variant="standard"
            sx={{ width, mt: 3 }}
          />
          <TextField
            margin="dense"
            id="conf-password"
            label="Confirm Password"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            type="password"
            fullWidth
            variant="standard"
            sx={{ width, mt: 3 }}
          />
        </DialogContent>
        {!fullScreen && (
          <DialogActions>
            <Button onClick={close}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
