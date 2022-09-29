import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';
import LetterAvatar from '../common/letterAvatar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';

export default function WardsList({ wards, handleView, handleViewDoctors }) {
  let router = useRouter();
  return (
    <List
      sx={{
        border: '10px solid #e9f3fc',
        width: '100%',
        maxWidth: 1120,
        maxHeight: '89vh',
        bgcolor: 'background.paper',
        overflowY: 'auto',
      }}
      component="nav"
    >
      {wards.map((ward, index) => (
        <Container>
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="doctors"
                onClick={() =>
                  router.push({
                    pathname: '/ward/doctors',
                    query: { index },
                  })
                }
              >
                <Tooltip title="Doctors">
                  <GroupIcon />
                </Tooltip>
              </IconButton>
            }
          >
            <ListItemButton onClick={() => handleView(ward, index)}>
              <ListItemIcon>
                <LetterAvatar name={ward.name}></LetterAvatar>
              </ListItemIcon>
              <ListItemText primary={ward.name} secondary={ward.description} />
            </ListItemButton>
          </ListItem>
          <Divider variant="inset" component="li" />
        </Container>
      ))}
    </List>
  );
}
