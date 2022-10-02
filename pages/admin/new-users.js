import NewUserCard from '@/components/admin/newUsers/newUserCard';
import UserFilters from '@/components/admin/newUsers/userFilters';
import { Grid, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useState, useRef } from 'react';

export default function NewUsersPage({ newUsers }) {
  const [users, setUsers] = useState(newUsers);
  const [filtered, setFiltered] = useState(users);

  const nameRef = useRef(null);
  const unameRef = useRef(null);
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

    const uname = unameRef.current.value;
    if (uname) {
      temp = temp.filter((user) =>
        user.username.toLowerCase().includes(uname.toLowerCase())
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
    unameRef.current.value = '';
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" component="div" sx={{ mb: 5 }}>
        New Users
      </Typography>
      <UserFilters
        filter={filter}
        clear={clear}
        nameRef={nameRef}
        unameRef={unameRef}
        type={type}
        setType={setType}
      />
      <Paper elevation={2} sx={{ p: 5, mb: 5 }}>
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
      </Paper>
    </Container>
  );
}

export async function getStaticProps() {
  const newUsers = [
    {
      _id: '632e63375a6845d0ae14c740',
      name: 'John Doe',
      username: 'johnd',
      type: 'consultant',
    },
    {
      _id: '632e6337a6db8ba5fee28a38',
      name: 'Maxine Wheeler',
      username: 'maxine',
      type: 'doctor',
    },
    {
      _id: '632e6337a48dcc8015be0c87',
      name: 'Antony Guzman',
      username: 'antony',
      type: 'doctor',
    },
    {
      _id: '632e63376fb5c78f40e80911',
      name: 'Kathryn Travers',
      username: 'kathrynt',
      type: 'consultant',
    },
    {
      _id: '632e6337705876a9daafa3b5',
      name: 'Willow Ryan',
      username: 'willowr',
      type: 'doctor',
    },
    {
      _id: '632e6337a48dcc8015be0c87',
      name: 'Aleisha Nolan',
      username: 'aleishan',
      type: 'doctor',
    },
    {
      _id: '632e63376fb5c78f40e80911',
      name: 'Bryn Rahman',
      username: 'brynr',
      type: 'doctor',
    },
    {
      _id: '632e6337ff2beff05f9151af',
      name: 'Erica Marshall',
      username: 'ericam',
      type: 'consultant',
    },
    {
      _id: '632e6337dbcc10757750f75a',
      name: 'Dylon Barclay',
      username: 'dylonb',
      type: 'consultant',
    },
    {
      _id: '632e6337b05a9b20bd6a7445',
      name: 'Emelia Driscoll',
      username: 'emelia',
      type: 'doctor',
    },
    {
      _id: '632e63370f1d4de18fbf83a4',
      name: 'Klara Lindsay',
      username: 'klaral',
      type: 'doctor',
    },
    {
      _id: '632e633728262fefb5239f68',
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
