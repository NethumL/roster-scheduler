import { getUser } from '@/lib/auth/session';
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export default function EditRosterPage() {
  const [month, setMonth] = useState('10/2022');

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const roster = [
    { name: 'John Doe', items: ['M', 'M', '', 'A'] },
    { name: 'Jane Doe', items: ['M', 'M', '', 'A'] },
    { name: 'Maxine Wheeler', items: ['M', 'M', '', 'A'] },
  ];

  const daysInMonth = 4;
  const dayColumns = [];
  for (let day = 1; day <= daysInMonth; day++) {
    dayColumns.push(<TableCell key={day}>{day}</TableCell>);
  }

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
            View roster
          </Typography>
        </Grid>
        <Grid item container alignItems="center">
          <Grid item xs={4} />
          <Grid item xs={4}>
            <FormControl fullWidth sx={{ marginY: '15px' }}>
              <InputLabel id="month-select-label">Month</InputLabel>
              <Select
                labelId="month-select-label"
                id="month-select"
                value={month}
                label="Month"
                onChange={handleChange}
              >
                <MenuItem value={'09/2022'}>Sep 2022</MenuItem>
                <MenuItem value={'10/2022'}>Oct 2022</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2}>
            <Button variant="contained" color="warning">
              Edit
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        rowSpacing={5}
        marginTop="5px"
      >
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                {dayColumns}
              </TableRow>
            </TableHead>
            <TableBody>
              {roster.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  {row.items.map((shift, index) => (
                    <TableCell key={shift + index} align="left">
                      {shift}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
