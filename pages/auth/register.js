import { getLoginSession } from '@/lib/auth/session';
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

export default function RegisterPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  /** @type import('react').FormEventHandler<HTMLFormElement> */
  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      name: nameRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await send('POST', '/api/auth/register', body);
      Router.push('/');
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  const checkConfirmPassword = () => {
    if (
      confirmPasswordRef.current.value &&
      passwordRef.current.value != confirmPasswordRef.current.value
    ) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  /** @param {string} href */
  const getRedirector = (href) => () => {
    router.push(href);
  };

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
          <Typography variant="h4">Register</Typography>
        </Grid>
      </Grid>
      <Container>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          rowSpacing={5}
        >
          <Grid item xs={3} md={5}></Grid>
          <Grid item xs={6} md={2}>
            <TextField variant="standard" label="Name" inputRef={nameRef} />
          </Grid>
          <Grid item xs={3} md={5}></Grid>
          <Grid item xs={3} md={5}></Grid>
          <Grid item xs={6} md={2}>
            <TextField
              variant="standard"
              label="Username"
              inputRef={usernameRef}
            />
          </Grid>
          <Grid item xs={3} md={5}></Grid>
          <Grid item xs={3} md={5}></Grid>
          <Grid item xs={6} md={2}>
            <TextField
              variant="standard"
              label="Password"
              inputRef={passwordRef}
              type="password"
              onBlur={checkConfirmPassword}
              error={passwordError ? true : false}
            />
          </Grid>
          <Grid item xs={3} md={5}></Grid>
          <Grid item xs={3} md={5}></Grid>
          <Grid item xs={6} md={2}>
            <TextField
              variant="standard"
              label="Confirm password"
              type="password"
              inputRef={confirmPasswordRef}
              onBlur={checkConfirmPassword}
              error={passwordError ? true : false}
              helperText={passwordError}
            />
          </Grid>
          <Grid item xs={3} md={5}></Grid>
        </Grid>
      </Container>

      <Grid container justifyContent="space-between" sx={{ marginTop: '55px' }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={getRedirector('/auth/login')}
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="success" type="submit">
            Register
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
    const session = await getLoginSession(context.req);
    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  } catch (error) {}

  return { props: {} };
}
