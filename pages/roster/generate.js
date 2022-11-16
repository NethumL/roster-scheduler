import { getUser } from '@/lib/auth/session';
import { send } from '@/lib/util';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';

export default function GenerateRosterPage() {
  const [month, setMonth] = useState('current');
  const [isLoading, setIsLoading] = useState(false);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const handleClick = async () => {
    const today = new Date();
    let yearNum = today.getFullYear();
    let monthNum = today.getMonth() + 1;
    if (month === 'next') {
      if (monthNum === 12) {
        monthNum = 1;
        yearNum++;
      } else {
        monthNum++;
      }
    }

    try {
      setIsLoading(true);
      await send(
        'GET',
        `/api/roster/generate?year=${yearNum}&month=${monthNum}`
      );
      setIsSnackbarOpen(true);
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackbarOpen(false);
  };

  const snackbarAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Container>
      <Typography textAlign="right">Ward: ER</Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        rowSpacing={5}
        marginTop="5px"
      >
        <Grid item>
          <Typography variant="h4" textAlign="center">
            Generate roster
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        rowSpacing={5}
        marginTop="5px"
      >
        <Grid item xs={3} md={5}></Grid>
        <Grid item xs={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="month-select-label">Month</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              value={month}
              label="Month"
              onChange={handleChange}
            >
              <MenuItem value="current">Current</MenuItem>
              <MenuItem value="next">Next</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} md={5}></Grid>
      </Grid>
      <Grid container justifyContent="space-between" sx={{ marginTop: '55px' }}>
        <Grid item xs={7}></Grid>
        <Grid item xs={3}>
          <Box sx={{ m: 1, position: 'relative' }}>
            <Button
              variant="contained"
              color="success"
              disabled={isLoading}
              onClick={handleClick}
            >
              Generate
            </Button>
            {isLoading && (
              <CircularProgress
                size={24}
                disableShrink
                sx={{
                  position: 'absolute',
                  top: '20%',
                  left: '50%',
                }}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Generating roster..."
        action={snackbarAction}
      />
    </Container>
  );
}

/**
 * @param {import('next').NextPageContext} context
 */
export async function getServerSideProps(context) {
  try {
    const user = await getUser(context.req);

    if (!['CONSULTANT', 'ADMIN'].includes(user.type)) {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      return {
        redirect: {
          destination: `/roster/view/${year}/${month}`,
          permanent: false,
        },
      };
    }

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
