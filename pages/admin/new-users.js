import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';

export default function NewUsersPage({ newUsers }) {
  const [users, setUsers] = useState(newUsers);

  const accept = (username) => {
    setUsers(users.filter((user) => user.username !== username));
  };

  const decline = (username) => {
    setUsers(users.filter((user) => user.username !== username));
  };

  const filter = (users) => {
    return users;
  };

  const filtered = filter(users);

  return (
    <Container>
      <Typography variant="h4" component="div" sx={{ mb: 5 }}>
        New Users
      </Typography>
      <Stack spacing={1} sx={{ maxWidth: 400, mb: 3 }}>
        <Typography variant="h5" component="div" sx={{ mb: 0 }}>
          Filters
        </Typography>
        <TextField id="filter-name" label="Name" variant="standard" />
        <Autocomplete
          multiple
          id="filter-type"
          options={['Doctor', 'Consultant']}
          getOptionLabel={(option) => option}
          defaultValue={[]}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Type"
              placeholder="Type"
            />
          )}
        />
        <span>
          <Button variant="contained" color="primary" onClick={() => {}}>
            Filter
          </Button>
        </span>
      </Stack>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}>
        {filtered.map((user) => (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={user.username}>
            <Card sx={{ height: 1, py: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
                  Name: {user.name}
                </Typography>
                <Typography>Username: {user.username}</Typography>
                <Typography variant="body2">
                  Type: {user.type === 'doctor' ? 'Doctor' : 'Consultant'}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-around' }}>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => accept(user.username)}
                >
                  Accept
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => decline(user.username)}
                >
                  Decline
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export async function getStaticProps() {
  const newUsers = [
    {
      name: 'John Doe',
      username: 'johnd',
      type: 'consultant',
    },
    {
      name: 'Maxine Wheeler',
      username: 'maxine',
      type: 'doctor',
    },
    {
      name: 'Antony Guzman',
      username: 'antony',
      type: 'doctor',
    },
    {
      name: 'Kathryn Travers',
      username: 'kathrynt',
      type: 'consultant',
    },
    {
      name: 'Willow Ryan',
      username: 'willowr',
      type: 'doctor',
    },
    {
      name: 'Aleisha Nolan',
      username: 'aleishan',
      type: 'doctor',
    },
    {
      name: 'Bryn Rahman',
      username: 'brynr',
      type: 'doctor',
    },
    {
      name: 'Erica Marshall',
      username: 'ericam',
      type: 'consultant',
    },
    {
      name: 'Dylon Barclay',
      username: 'dylonb',
      type: 'consultant',
    },
    {
      name: 'Emelia Driscoll',
      username: 'emelia',
      type: 'doctor',
    },
    {
      name: 'Klara Lindsay',
      username: 'klaral',
      type: 'doctor',
    },
    {
      name: 'Arnav Morales',
      username: 'arnav',
      type: 'doctor',
    },
  ];

  return {
    props: {
      newUsers,
    },
  };
}
