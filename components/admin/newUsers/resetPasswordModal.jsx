import TextField from '@mui/material/TextField';
import { useState } from 'react';
import ModalHeader from '@/components/common/modalHeader';
import validateUser from '@/lib/validation/User';

export default function ResetPasswordModal({
  open,
  user,
  handleClose,
  handleSave,
}) {
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [confPasswordErr, setConfPasswordErr] = useState('');

  const checkConfirmPassword = () => {
    if (confPassword && password !== confPassword) {
      setConfPasswordErr('Passwords do not match');
      return true;
    }
    setConfPasswordErr('');
    return false;
  };

  const checkPassword = (skipZero) => {
    setPasswordErr('');
    if (password.length == 0 && skipZero) {
      return false;
    }

    const { error } = validateUser({ password }, ['password']);
    if (error) {
      setPasswordErr(error.details[0].message);
      return true;
    }

    return false;
  };

  const save = () => {
    const pwdErr = checkPassword(false);
    const confPwdErr = checkConfirmPassword();
    if (pwdErr || confPwdErr) return;
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
          onBlur={() => checkPassword(true)}
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
          error={confPasswordErr !== ''}
          helperText={confPasswordErr}
          fullWidth
          variant="standard"
          sx={{ mt: 3 }}
        />
      </ModalHeader>
    </div>
  );
}
