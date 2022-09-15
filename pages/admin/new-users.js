import NewUserCard from '@/components/admin/newUsers/newUserCard';
import UserFilters from '@/components/admin/newUsers/userFilters';
import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useState, useRef } from 'react';

export default function NewUsersPage({ newUsers }) {
  const [users, setUsers] = useState(newUsers);
  const [filtered, setFiltered] = useState(users);

  const nameRef = useRef();
  const [type, setType] = useState([]);

  const accept = (username) => {
    setUsers(users.filter((user) => user.username !== username));
    setFiltered(filtered.filter((user) => user.username !== username));
  };

  const decline = (username) => {
    setUsers(users.filter((user) => user.username !== username));
    setFiltered(filtered.filter((user) => user.username !== username));
  };

  const filter = () => {
    let temp = [...users];

    const name = nameRef.current.value;
    if (name) {
      temp = temp.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (type.length) {
      temp = temp.filter((user) =>
        type.includes(user.type === 'doctor' ? 'Doctor' : 'Consultant')
      );
    }

    setFiltered(temp);
  };

  const clear = () => {
    setFiltered(users);
    setType([]);
    nameRef.current.value = '';
  };

  return (
    <Container>
      <Typography variant="h4" component="div" sx={{ mb: 5 }}>
        New Users
      </Typography>
      <UserFilters
        filter={filter}
        clear={clear}
        nameRef={nameRef}
        type={type}
        setType={setType}
      />
      <Grid
        container
        id="new-users-grid"
        spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}
        sx={{ mb: 5 }}
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
