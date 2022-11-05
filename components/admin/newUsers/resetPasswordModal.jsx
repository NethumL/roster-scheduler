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
  const [passwordErr, setPasswordErr] = useState('');
  const [confPasswordErr, setConfPasswordErr] = useState(false);

  const checkConfirmPassword = () => {
    if (confPassword && password !== confPassword) {
      setPasswordErr('Passwords do not match');
      setConfPasswordErr(true);
    } else {
      setPasswordErr('');
      setConfPasswordErr(false);
    }
  };

  const save = () => {
    checkConfirmPassword();
    if (passwordErr || confPasswordErr) return;
    handleSave(user._id, password);
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
          value={user ? (user.type === 'DOCTOR' ? 'Doctor' : 'Consultant') : ''}
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
          onBlur={checkConfirmPassword}
          type="password"
          error={passwordErr !== ''}
          helperText={passwordErr}
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
          onBlur={checkConfirmPassword}
          type="password"
          error={confPasswordErr}
          fullWidth
          variant="standard"
          sx={{ mt: 3 }}
        />
      </ModalHeader>
    </div>
  );
}
