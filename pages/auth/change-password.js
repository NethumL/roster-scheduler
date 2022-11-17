import { getUser } from '@/lib/auth/session';
import { send } from '@/lib/util';
import {
  Alert,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  /** @type import('react').FormEventHandler<HTMLFormElement> */
  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      currentPassword: currentPasswordRef.current.value,
      newPassword: newPasswordRef.current.value,
    };

    try {
      await send('POST', '/api/auth/change-password', body);
      router.push('/api/logout');
    } catch (error) {
      setErrorMsg(JSON.parse(error.message).error);
    }
  }

  const checkConfirmPassword = () => {
    if (
      confirmPasswordRef.current.value &&
      newPasswordRef.current.value != confirmPasswordRef.current.value
    ) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  return (
    <>
      <Head>
        <title>{`Change password | ${process.env.NEXT_PUBLIC_TITLE}`}</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          rowSpacing={5}
          marginTop="5px"
        >
          <Grid item>
            <Typography variant="h4" textAlign="center">
              Change password
            </Typography>
          </Grid>
        </Grid>
        <Container>
          {errorMsg && (
            <Alert severity="error" sx={{ marginY: '10px' }}>
              {errorMsg}
            </Alert>
          )}
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            rowSpacing={5}
          >
            <Grid item xs={3} md={5}></Grid>
            <Grid item xs={6} md={2}>
              <TextField
                variant="standard"
                label="Current password"
                inputRef={currentPasswordRef}
                type="password"
              />
            </Grid>
            <Grid item xs={3} md={5}></Grid>
            <Grid item xs={3} md={5}></Grid>
            <Grid item xs={6} md={2}>
              <TextField
                variant="standard"
                label="New password"
                inputRef={newPasswordRef}
                type="password"
                onBlur={checkConfirmPassword}
              />
            </Grid>
            <Grid item xs={3} md={5}></Grid>
            <Grid item xs={3} md={5}></Grid>
            <Grid item xs={6} md={2}>
              <TextField
                variant="standard"
                label="Confirm password"
                inputRef={confirmPasswordRef}
                type="password"
                onBlur={checkConfirmPassword}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
              />
            </Grid>
            <Grid item xs={3} md={5}></Grid>
          </Grid>
        </Container>
        <Grid
          container
          justifyContent="space-between"
          sx={{ marginTop: '55px' }}
        >
          <Grid item xs={7}></Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="success" type="submit">
              Update
            </Button>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </form>
    </>
  );
}

/** @type {import('next').GetServerSideProps} */
export async function getServerSideProps(context) {
  try {
    const user = await getUser(context.req);
    return { props: { user } };
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
}
