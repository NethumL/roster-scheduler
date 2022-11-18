import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

export default function RequestCard({ request, isDoctor, resolve }) {
  const { _id, subject, description, resolved } = request;

  return (
    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
      <Card sx={{ height: 1, py: 2 }} elevation={3}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
            {subject}
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
            {isDoctor
              ? `Status: ${resolved ? 'Resolved' : 'Pending'}`
              : request.user.name}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        {!isDoctor && !resolved && (
          <CardActions>
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={() => resolve(_id)}
            >
              Mark as Resolved
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}
