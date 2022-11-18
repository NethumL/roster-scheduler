import { TextField } from '@mui/material';
import { useState } from 'react';
import ModalHeader from '@/components/common/modalHeader';
import validateRequest from '@/lib/validation/Request';

export default function NewRequestModal({ open, handleClose, handleSave }) {
  const [subject, setSubject] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const save = () => {
    const { error } = validateRequest({ subject, description }, [
      'subject',
      'description',
    ]);

    setSubjectError('');
    setDescriptionError('');
    if (error) {
      for (let item of error.details) {
        if (item.path.length > 0) {
          if (item.path[0] === 'subject') {
            setSubjectError(item.message);
          } else if (item.path[0] === 'description') {
            setDescriptionError(item.message);
          }
        }
      }

      return;
    }

    handleSave(subject, description);
    setSubject('');
    setDescription('');
  };

  const close = () => {
    handleClose();
    setSubject('');
    setDescription('');
  };

  const validateSubject = () => {
    setSubjectError('');

    if (subject === '') {
      return;
    }

    const { error } = validateRequest({ subject }, ['subject']);

    if (error) {
      setSubjectError(error.details[0].message);
    }
  };

  const validateDescription = () => {
    setDescriptionError('');

    if (description === '') {
      return;
    }

    const { error } = validateRequest({ description }, ['description']);

    if (error) {
      setDescriptionError(error.details[0].message);
    }
  };

  return (
    <div>
      <ModalHeader
        title="New Request"
        open={open}
        handleClose={close}
        successActionName="Send"
        handleSuccessAction={save}
      >
        <TextField
          autoFocus
          margin="dense"
          id="request-subject"
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          onBlur={validateSubject}
          type="text"
          fullWidth
          variant="standard"
          error={subjectError !== ''}
          helperText={subjectError}
        />
        <TextField
          id="request-description"
          label="Description"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={validateDescription}
          rows={10}
          fullWidth
          variant="standard"
          sx={{ mt: 3 }}
          error={descriptionError !== ''}
          helperText={descriptionError}
        />
      </ModalHeader>
    </div>
  );
}
