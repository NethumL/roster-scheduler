import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';
import LetterAvatar from '../common/letterAvatar';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';

export default function WardsList({ wards, handleView }) {
  let router = useRouter();
  const theme = useTheme();
  const border = useMediaQuery(theme.breakpoints.down('sm'))
    ? ''
    : '10px solid #e9f3fc';
  return (
    <List
      sx={{
        border: { border },
        width: '100%',
        maxWidth: 1120,
        height: '80vh',
        bgcolor: 'background.paper',
        overflowY: 'auto',
        paddingLeft: 0,
      }}
      component="nav"
    >
      {wards.map((ward, index) => (
        <Container key={index}>
          <ListItem
            sx={{ paddingLeft: 0 }}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="doctors"
                onClick={() =>
                  router.push({
                    pathname: '/ward/doctors',
                    query: { w_id: ward._id },
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
