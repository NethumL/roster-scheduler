import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

export default function NewUserCard({ user, accept, decline }) {
  const { name, username, type } = user;

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
      <Card sx={{ height: 1, py: 2 }} elevation={3}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
            Name: {name}
          </Typography>
          <Typography>Username: {username}</Typography>
          <Typography variant="body2">
            Type: {type === 'Doctor' ? 'Doctor' : 'Consultant'}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-around' }}>
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={() => accept(username)}
          >
            Accept
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => decline(username)}
          >
            Decline
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
