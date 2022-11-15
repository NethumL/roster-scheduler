import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import { useState, useEffect } from 'react';

export default function LeaveList({ dates, setNew, setIsSavedLeaves }) {
  const [newDates, setNewDates] = useState([]);
  const handleDelete = (index) => {
    var temp = [...newDates];
    temp.splice(index, 1);
    setNewDates([...temp]);
    setNew([...temp]);
  };
  useEffect(() => {
    setNewDates([...dates]);
  }, [dates]);
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        maxHeight: 450,
        bgcolor: 'background.paper',
        overflowY: 'auto',
      }}
      component="nav"
    >
      {newDates.map((date, index) => (
        <ListItem
          key={index}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="doctors"
              onClick={() => {
                setIsSavedLeaves(false);
                handleDelete(index);
              }}
            >
              <Tooltip title="Discard">
                <CloseIcon />
              </Tooltip>
            </IconButton>
          }
        >
          <ListItemText primary={date.toLocaleDateString()} />
        </ListItem>
      ))}
    </List>
  );
}
