import NewUserCard from '@/components/admin/newUsers/newUserCard';
import UserFilters from '@/components/admin/newUsers/userFilters';
import { getUser } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import NewUser from '@/lib/models/NewUser';
import { send } from '@/lib/util';
import { Alert, Grid, Paper, Snackbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

export default function NewUsersPage({ newUsers }) {
  const [users, setUsers] = useState(newUsers);
  const [filtered, setFiltered] = useState(users);
  const [openToast, setOpenToast] = useState(false);

  const nameRef = useRef(null);
  const unameRef = useRef(null);
  const [type, setType] = useState([]);

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  const action = async (_id, accept) => {
    const original = [...users];
    setUsers(users.filter((user) => user._id !== _id));

    const body = { accept };

    try {
      await send('PUT', `/api/admin/new-users/${_id}`, body);
    } catch (error) {
      console.log(error);
      setOpenToast(true);
      setFiltered(original);
    }
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

  useEffect(filter, [users]);

  return (
    <>
      <Head>
        <title>{`New users | ${process.env.NEXT_PUBLIC_TITLE}`}</title>
      </Head>
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
        {filtered.length !== 0 && (
          <Paper elevation={2} sx={{ p: 5, mb: 5 }}>
            <Grid
              container
              id="new-users-grid"
              spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}
            >
              {filtered.map((user, index) => (
                <NewUserCard key={index} user={user} action={action} />
              ))}
            </Grid>
          </Paper>
        )}
        {filtered.length === 0 && (
          <Alert severity="info" sx={{ mb: 5 }}>
            No new users found!
          </Alert>
        )}
        <Snackbar
          open={openToast}
          autoHideDuration={6000}
          onClose={handleCloseToast}
        >
          <Alert
            onClose={handleCloseToast}
            severity="error"
            sx={{ width: '100%' }}
          >
            The request could not be completed!
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

/**
 * @param {import('next').NextPageContext} context
 */
export async function getServerSideProps(context) {
  let newUsers = [];

  try {
    const user = await getUser(context.req);

    if (user.type === 'ADMIN') {
      await dbConnect();

      newUsers = await NewUser.find({});
      newUsers = JSON.parse(JSON.stringify(newUsers));
      return { props: { newUsers } };
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
