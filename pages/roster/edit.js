import { getUser } from '@/lib/auth/session';
import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export default function EditRosterPage() {
  const handleClick = () => {
    // TODO: Update roster
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
            Edit roster
          </Typography>
          <Typography variant="subtitle1" textAlign="center">
            2022/10
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  {row.items.map((shift, index) => (
                    <TableCell key={shift + index}>{shift}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid container justifyContent="space-between" sx={{ marginTop: '55px' }}>
        <Grid item xs={7}></Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="success" onClick={handleClick}>
            Update
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
