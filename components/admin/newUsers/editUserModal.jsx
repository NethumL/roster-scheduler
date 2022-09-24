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
import { Close } from '@mui/icons-material';

export default function EditUserModal({ open, user, handleClose, handleSave }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const width = useMediaQuery(theme.breakpoints.down('md')) ? '100%' : '400px';

  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('');

  const save = () => handleSave(user.username, newName, newType);

  useEffect(() => {
    setNewName(user ? user.name : '');
    setNewType(user ? user.type : '');
  }, [user]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
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
                Edit User
              </Typography>
              <Button autoFocus color="inherit" onClick={save}>
                Save
              </Button>
            </Toolbar>
          </AppBar>
        )}
        {!fullScreen && <DialogTitle>Edit User</DialogTitle>}
        <DialogContent sx={{ p: 5 }}>
          <TextField
            autoFocus
            margin="dense"
            id="edit-name"
            label="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
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
            sx={{ mt: 3 }}
          />
          <TextField
            id="select-type"
            select
            label="Type"
            onChange={(e) => setNewType(e.target.value)}
            value={newType}
            fullWidth
            sx={{ mt: 3 }}
            variant="standard"
          >
            <MenuItem value={'consultant'}>Consultant</MenuItem>
            <MenuItem value={'doctor'}>Doctor</MenuItem>
          </TextField>
        </DialogContent>
        {!fullScreen && (
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
