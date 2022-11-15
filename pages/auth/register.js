import { getLoginSession } from '@/lib/auth/session';
import { send } from '@/lib/util';
import schemaRegister from '@/lib/validation/auth/register';
import {
  Alert,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [errors, setErrors] = useState({});

  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const userTypeRef = useRef(null);

  /** @type import('react').FormEventHandler<HTMLFormElement> */
  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      name: nameRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      userType: userTypeRef.current.value,
    };

    const { error, value } = schemaRegister.validate(body, {
      abortEarly: false,
    });

    if (error) {
      setErrors(
        Object.fromEntries(
          error.details.map((err) => {
            return [err.path[0], err.message];
          })
        )
      );
      return;
    }

    try {
      await send('POST', '/api/auth/register', value);
      router.push('/');
    } catch (error) {
      console.log(error.message);
    }
  }

  const checkConfirmPassword = () => {
    if (
      confirmPasswordRef.current.value &&
      passwordRef.current.value != confirmPasswordRef.current.value
    ) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
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
      <Container sx={{ marginTop: '20px' }}>
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
              label="Name"
              inputRef={nameRef}
              error={!!errors['name']}
              helperText={errors['name']}
            />
          </Grid>
          <Grid item xs={3} md={5}></Grid>
          <Grid item xs={3} md={5}></Grid>
          <Grid item xs={6} md={2}>
            <TextField
              variant="standard"
              label="Username"
              inputRef={usernameRef}
              error={!!errors['username']}
              helperText={errors['username']}
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
              error={!!errors['password']}
              helperText={errors['password']}
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
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />
          </Grid>
          <Grid item xs={3} md={5}></Grid>
          <Grid item xs={3} md={5}></Grid>
          <Grid item xs={6} md={2}>
            <FormControl fullWidth>
              <InputLabel id="user-type-select-label">Type</InputLabel>
              <Select
                labelId="user-type-select-label"
                id="user-type-select"
                label="Type"
                inputProps={{ ref: userTypeRef }}
              >
                <MenuItem value="DOCTOR">Doctor</MenuItem>
                <MenuItem value="CONSULTANT">Consultant</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={5}></Grid>
        </Grid>
      </Container>

      <Grid
        container
        justifyContent="space-between"
        sx={{ marginTop: '55px', marginBottom: '20px' }}
      >
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
