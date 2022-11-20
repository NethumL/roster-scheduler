import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import LetterAvatar from '../common/letterAvatar';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';

export default function DoctorsList({ doctors, handleDelete }) {
  const [newDoctors, setNewDoctors] = useState([]);

  useEffect(() => {
    setNewDoctors(doctors.map((obj) => ({ ...obj })));
  }, [doctors]);

  return newDoctors.map((doctor, index) => (
    <div key={index}>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="doctors"
            onClick={() => handleDelete(index)}
          >
            <Tooltip title="Delete Doctor">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        }
      >
        <ListItemIcon>
          <LetterAvatar name={doctor.name}></LetterAvatar>
        </ListItemIcon>
        <ListItemText primary={doctor.name} secondary={doctor.username} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  ));
}
