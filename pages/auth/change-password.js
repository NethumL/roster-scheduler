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
import Router, { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');

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
      Router.push('/');
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  return (
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
            />
          </Grid>
          <Grid item xs={3} md={5}></Grid>
        </Grid>
      </Container>
      <Grid container justifyContent="space-between" sx={{ marginTop: '55px' }}>
        <Grid item xs={7}></Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="success" type="submit">
            Update
          </Button>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </form>
  );
}

/**
 * @param {import('next').NextPageContext} context
 */
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
