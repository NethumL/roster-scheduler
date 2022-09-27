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

  const handleSaveEdit = (_id, newName, newType) => {
    const newUsers = users.map((u) => {
      if (u._id === _id) {
        u.name = newName;
        u.type = newType;
      }
      return u;
    });

    console.log(_id, newName, newType);

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

  const handleSavePassword = (_id, password, confPassword) => {
    console.log(_id, password, confPassword);

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
      users,
    },
  };
}
