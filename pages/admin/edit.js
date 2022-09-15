import UserFilters from '@/components/admin/newUsers/userFilters';
import UserTable from '@/components/admin/newUsers/userTable';
import { Container, Typography } from '@mui/material';
import { useRef, useState } from 'react';

export default function Edit({ users }) {
  const nameRef = useRef();
  const [type, setType] = useState([]);
  const [filtered, setFiltered] = useState(users);

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
        Edit Users
      </Typography>
      <UserFilters
        filter={filter}
        clear={clear}
        nameRef={nameRef}
        type={type}
        setType={setType}
      />
      <UserTable users={filtered} />
    </Container>
  );
}

export async function getStaticProps() {
  const users = [
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
      users,
    },
  };
}
