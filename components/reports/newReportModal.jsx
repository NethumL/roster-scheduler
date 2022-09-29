import { TextField } from '@mui/material';
import { useState } from 'react';
import ModalHeader from '../common/modalHeader';

export default function NewReportModal({ open, handleClose }) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const save = () => {
    console.log(subject, description);
    setSubject('');
    setDescription('');
  };

  const close = () => {
    handleClose();
    setSubject('');
    setDescription('');
  };

  return (
    <div>
      <ModalHeader
        title="New Report"
        open={open}
        handleClose={close}
        successActionName="Send"
        handleSuccessAction={save}
      >
        <TextField
          autoFocus
          margin="dense"
          id="report-subject"
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          id="report-description"
          label="Description"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={10}
          fullWidth
          variant="standard"
          sx={{ mt: 3 }}
        />
      </ModalHeader>
    </div>
  );
}
