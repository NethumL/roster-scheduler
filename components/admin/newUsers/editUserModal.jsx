import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import ModalHeader from '@/components/common/modalHeader';
import validateUser from '@/lib/validation/User';

export default function EditUserModal({ open, user, handleClose, handleSave }) {
  const [newName, setNewName] = useState('');
  const [nameError, setNameError] = useState('');
  const [newType, setNewType] = useState('');
  const [typeError, setTypeError] = useState('');

  const save = () => {
    const { error } = validateUser({ name: newName, type: newType }, [
      'name',
      'type',
    ]);

    setNameError('');
    setTypeError('');
    if (error) {
      for (let item of error.details) {
        if (item.path.length > 0) {
          if (item.path[0] === 'name') {
            setNameError(item.message);
          } else if (item.path[0] === 'type') {
            setTypeError(item.message);
          }
        }
      }

      return;
    }

    handleSave(user._id, newName, newType);
  };

  useEffect(() => {
    setNewName(user ? user.name : '');
    setNewType(user ? user.type : '');
  }, [user]);

  const validateName = () => {
    setNameError('');

    if (newName === '') {
      return;
    }

    const { error } = validateUser({ name: newName }, ['name']);

    if (error) {
      setNameError(error.details[0].message);
    }
  };

  const validateType = () => {
    setTypeError('');

    if (newType === '') {
      return;
    }

    const { error } = validateUser({ type: newType }, ['type']);

    if (error) {
      setTypeError(error.details[0].message);
    }
  };

  return (
    <div>
      <ModalHeader
        title="Reset Password"
        open={open}
        handleClose={handleClose}
        successActionName="Save"
        handleSuccessAction={save}
      >
        <TextField
          autoFocus
          margin="dense"
          id="edit-name"
          label="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={validateName}
          type="text"
          fullWidth
          variant="standard"
          error={nameError !== ''}
          helperText={nameError}
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
          onBlur={validateType}
          value={newType}
          fullWidth
          sx={{ mt: 3 }}
          variant="standard"
          error={typeError !== ''}
          helperText={typeError}
        >
          <MenuItem value={'CONSULTANT'}>Consultant</MenuItem>
          <MenuItem value={'DOCTOR'}>Doctor</MenuItem>
        </TextField>
      </ModalHeader>
    </div>
  );
}
