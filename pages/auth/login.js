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
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export default function LoginPage({ setUser }) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  /** @type import('react').FormEventHandler<HTMLFormElement> */
  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await send('POST', '/api/login', body);
      router.push('/');
      setUser(response.user);
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

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
          <Typography variant="h4">Login</Typography>
        </Grid>
      </Grid>
      <Container sx={{ marginTop: '15px' }}>
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
          <Grid item container xs={6} md={2} justifyContent="center">
            <TextField
              variant="standard"
              label="Username"
              inputRef={usernameRef}
            />
          </Grid>
          <Grid item xs={3} md={5}></Grid>
          <Grid item xs={3} md={5}></Grid>
          <Grid item container xs={6} md={2} justifyContent="center">
            <TextField
              variant="standard"
              label="Password"
              inputRef={passwordRef}
              type="password"
            />
          </Grid>
          <Grid item xs={3} md={5}></Grid>
        </Grid>
      </Container>
      <Grid container justifyContent="space-between" sx={{ marginTop: '55px' }}>
        <Grid item xs={3} md={5} />
        <Grid item container xs={4} md={1} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={getRedirector('/auth/register')}
          >
            Register
          </Button>
        </Grid>
        <Grid item xs={0} md={0} />
        <Grid item container xs={3} md={1} justifyContent="center">
          <Button variant="contained" color="success" type="submit">
            Login
          </Button>
        </Grid>
        <Grid item xs md={5} />
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
