import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import ModalHeader from '@/components/common/modalHeader';

export default function EditUserModal({ open, user, handleClose, handleSave }) {
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('');

  const save = () => handleSave(user._id, newName, newType);

  useEffect(() => {
    setNewName(user ? user.name : '');
    setNewType(user ? user.type : '');
  }, [user]);

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
      </ModalHeader>
    </div>
  );
}
