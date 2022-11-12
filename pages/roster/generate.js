import { getUser } from '@/lib/auth/session';
import { send } from '@/lib/util';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import Router from 'next/router';
import { useState } from 'react';

export default function GenerateRosterPage() {
  const [month, setMonth] = useState('current');

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
      await send(
        'GET',
        `/api/roster/generate?year=${yearNum}&month=${monthNum}`
      );
      Router.push(`/roster/view/${yearNum}/${monthNum}`);
    } catch (error) {
      console.error(error.message);
    }
  };

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
          <Button variant="contained" color="success" onClick={handleClick}>
            Generate
          </Button>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
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
      return {
        redirect: {
          destination: '/roster/view',
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
