import TextField from '@mui/material/TextField';
import { useState } from 'react';
import ModalHeader from '@/components/common/modalHeader';

export default function ResetPasswordModal({
  open,
  user,
  handleClose,
  handleSave,
}) {
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
      <ModalHeader
        title="Reset Password"
        open={open}
        handleClose={close}
        successActionName="Save"
        handleSuccessAction={save}
      >
        <TextField
          margin="dense"
          id="name"
          label="Name"
          value={user ? user.name : ''}
          type="text"
          fullWidth
          disabled
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
          margin="dense"
          id="type"
          label="Type"
          value={user ? (user.type === 'doctor' ? 'Doctor' : 'Consultant') : ''}
          type="text"
          fullWidth
          disabled
          variant="standard"
          sx={{ mt: 3 }}
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
          sx={{ mt: 3 }}
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
          sx={{ mt: 3 }}
        />
      </ModalHeader>
    </div>
  );
}
