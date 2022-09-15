import NewUserCard from '@/components/admin/newUsers/newUserCard';
import NewUsersFilters from '@/components/admin/newUsers/newUsersFilters';
import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';

export default function NewUsersPage({ newUsers }) {
  const [users, setUsers] = useState(newUsers);
  const [filtered, setFiltered] = useState(users);

  const accept = (username) => {
    setUsers(users.filter((user) => user.username !== username));
  };

  const decline = (username) => {
    setUsers(users.filter((user) => user.username !== username));
  };

  const filter = () => {
    setFiltered(users);
  };

  const clear = () => {
    setFiltered(users);
  };

  return (
    <Container>
      <Typography variant="h4" component="div" sx={{ mb: 5 }}>
        New Users
      </Typography>
      <NewUsersFilters filter={filter} clear={clear} />
      <Grid
        container
        id="new-users-grid"
        spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}
      >
        {filtered.map((user, index) => (
          <NewUserCard
            key={index}
            user={user}
            accept={accept}
            decline={decline}
          />
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
