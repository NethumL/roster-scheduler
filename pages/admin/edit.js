import EditUserModal from '@/components/admin/newUsers/editUserModal';
import ResetPasswordModal from '@/components/admin/newUsers/resetPasswordModal';
import UserFilters from '@/components/admin/newUsers/userFilters';
import UserTable from '@/components/admin/newUsers/userTable';
import { getUser } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { send } from '@/lib/util';
import { Alert, Container, Snackbar, Typography } from '@mui/material';
import { useRef, useState } from 'react';

export default function Edit({ users }) {
  const apiEndPoint = '/api/admin/edit';

  const nameRef = useRef(null);
  const unameRef = useRef(null);
  const [type, setType] = useState([]);
  const [filtered, setFiltered] = useState(users);

  const [selectedUser, setSelectedUser] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [openEditToast, setOpenEditToast] = useState(false);
  const [openResetToast, setOpenResetToast] = useState(false);

  const handleClickOpenEditModal = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedUser(null);
    setOpenEditModal(false);
  };

  const handleSaveEdit = async (_id, newName, newType) => {
    const original = users.map((u) => {
      return { ...u };
    });

    const newUsers = users.map((u) => {
      if (u._id === _id) {
        u.name = newName;
        u.type = newType;
      }
      return u;
    });
    filter(newUsers);

    setSelectedUser(null);
    setOpenEditModal(false);

    const body = {
      name: newName,
      type: newType,
    };

    try {
      await send('PUT', `${apiEndPoint}/${_id}`, body);
    } catch (error) {
      setOpenEditToast(true);
      filter(original);
    }
  };

  const handleClickOpenResetModal = (user) => {
    setSelectedUser(user);
    setOpenResetModal(true);
  };

  const handleCloseResetModal = () => {
    setSelectedUser(null);
    setOpenResetModal(false);
  };

  const handleCloseEditToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenEditToast(false);
  };

  const handleCloseResetToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenResetToast(false);
  };

  const handleSavePassword = async (_id, password) => {
    setSelectedUser(null);
    setOpenResetModal(false);

    const body = {
      password,
    };

    try {
      await send('PUT', `${apiEndPoint}/reset-password/${_id}`, body);
    } catch (error) {
      setOpenResetToast(true);
    }
  };

  const filter = (argUsers) => {
    let temp = argUsers ? argUsers : [...users];

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
        type.includes(user.type === 'DOCTOR' ? 'Doctor' : 'Consultant')
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
        Edit Users
      </Typography>
      <UserFilters
        filter={() => filter(null)}
        clear={clear}
        nameRef={nameRef}
        unameRef={unameRef}
        type={type}
        setType={setType}
      />
      {filtered.length !== 0 && (
        <UserTable
          users={filtered}
          handleEdit={handleClickOpenEditModal}
          handleReset={handleClickOpenResetModal}
        />
      )}
      {filtered.length === 0 && (
        <Alert severity="info" sx={{ mb: 5 }}>
          No users found!
        </Alert>
      )}
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
      <Snackbar
        open={openEditToast}
        autoHideDuration={6000}
        onClose={handleCloseEditToast}
      >
        <Alert
          onClose={handleCloseEditToast}
          severity="error"
          sx={{ width: '100%' }}
        >
          Changes could not be saved!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openResetToast}
        autoHideDuration={6000}
        onClose={handleCloseResetToast}
      >
        <Alert
          onClose={handleCloseResetToast}
          severity="error"
          sx={{ width: '100%' }}
        >
          New Password could not be saved!
        </Alert>
      </Snackbar>
    </Container>
  );
}

/**
 * @param {import('next').NextPageContext} context
 */
export async function getServerSideProps(context) {
  let users = [];

  try {
    const user = await getUser(context.req);

    if (user.type === 'ADMIN') {
      await dbConnect();

      users = await User.find({ type: { $ne: 'ADMIN' } });
      users = JSON.parse(JSON.stringify(users));
      return { props: { users } };
    } else {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
}
