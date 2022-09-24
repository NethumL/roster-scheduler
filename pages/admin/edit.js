import EditUserModal from '@/components/admin/newUsers/editUserModal';
import ResetPasswordModal from '@/components/admin/newUsers/resetPasswordModal';
import UserFilters from '@/components/admin/newUsers/userFilters';
import UserTable from '@/components/admin/newUsers/userTable';
import { Container, Typography } from '@mui/material';
import { useRef, useState } from 'react';

export default function Edit({ users }) {
  const nameRef = useRef();
  const unameRef = useRef();
  const [type, setType] = useState([]);
  const [filtered, setFiltered] = useState(users);

  const [selectedUser, setSelectedUser] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);

  const handleClickOpenEditModal = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedUser(null);
    setOpenEditModal(false);
  };

  const handleSaveEdit = (username, newName, newType) => {
    const newUsers = users.map((u) => {
      if (u.username === username) {
        u.name = newName;
        u.type = newType;
      }
      return u;
    });

    console.log(username, newName, newType);

    setSelectedUser(null);
    setOpenEditModal(false);
    setFiltered(newUsers);
  };

  const handleClickOpenResetModal = (user) => {
    setSelectedUser(user);
    setOpenResetModal(true);
  };

  const handleCloseResetModal = () => {
    setSelectedUser(null);
    setOpenResetModal(false);
  };

  const handleSavePassword = (username, password) => {
    console.log(username, password);

    setSelectedUser(null);
    setOpenResetModal(false);
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
    <Container>
      <Typography variant="h4" component="div" sx={{ mb: 5 }}>
        Edit Users
      </Typography>
      <UserFilters
        filter={filter}
        clear={clear}
        nameRef={nameRef}
        unameRef={unameRef}
        type={type}
        setType={setType}
      />
      <UserTable
        users={filtered}
        handleEdit={handleClickOpenEditModal}
        handleReset={handleClickOpenResetModal}
      />
      <EditUserModal
        open={openEditModal}
        user={selectedUser}
        handleClose={handleCloseEditModal}
        handleSave={handleSaveEdit}
      />
      <ResetPasswordModal
        open={openResetModal}
        user={selectedUser}
        handleClose={handleCloseResetModal}
        handleSave={handleSavePassword}
      />
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
