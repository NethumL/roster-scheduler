import { getUser } from '@/lib/auth/session';
import Head from 'next/head';
import dbConnect from '@/lib/db';
import Roster from '@/lib/models/Roster';
import Ward from '@/lib/models/Ward';
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
import { useRouter } from 'next/router';

export default function ViewRosterPage({ user, year, month, roster, months }) {
  const router = useRouter();

  const handleChange = (event) => {
    router.push(`/roster/view/${event.target.value}`);
  };

  const daysInMonth = roster[0].items.length;
  const dayColumns = [];
  for (let day = 1; day <= daysInMonth; day++) {
    dayColumns.push(<TableCell key={day}>{day}</TableCell>);
  }

  return (
    <>
      <Head>
        <title>{`View roster for ${year}/${month} | ${process.env.NEXT_PUBLIC_TITLE}`}</title>
      </Head>
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
            <Grid item xs={3} />
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ marginY: '15px' }}>
                <InputLabel id="month-select-label">Month</InputLabel>
                <Select
                  labelId="month-select-label"
                  id="month-select"
                  value={`${year}/${month}`}
                  label="Month"
                  onChange={handleChange}
                >
                  {months.map((m) => (
                    <MenuItem value={m.id}>{m.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={2}>
              {user.type !== 'DOCTOR' ? (
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => router.push(`/roster/edit/${year}/${month}`)}
                >
                  Edit
                </Button>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          rowSpacing={5}
          marginTop="5px"
          marginBottom="20px"
        >
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
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
                      <TableCell key={shift + index.toString()} align="left">
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
    </>
  );
}

/** @type {import('next').GetServerSideProps} */
export async function getServerSideProps(context) {
  try {
    const user = await getUser(context.req);

    if (
      !context.query.hasOwnProperty('year') ||
      !context.query.hasOwnProperty('month')
    ) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    // @ts-ignore
    const year = parseInt(context.query.year);
    // @ts-ignore
    const month = parseInt(context.query.month);

    await dbConnect();

    const ward = await (async () => {
      if (user.type === 'DOCTOR') {
        const ward = await Ward.findOne({ doctors: user._id }).lean();
        return ward;
      } else {
        const ward = await Ward.findOne({ personInCharge: user._id }).lean();
        return ward;
      }
    })();

    const roster = await Roster.findOne({
      ward: ward._id,
      month: { $gte: `${year}-${month}-01`, $lte: `${year}-${month}-30` },
    })
      .populate([
        { path: 'rosters.doctor' },
        { path: 'rosters.shifts', options: { retainNullValues: true } },
      ])
      .select({ _id: 0, ward: 0, month: 0 })
      .lean();

    const data = roster.rosters.map((rosterInst) => {
      return {
        name: rosterInst.doctor.name,
        username: rosterInst.doctor.username,
        items: rosterInst.shifts.map((shift) => {
          if (shift === null) {
            return '';
          } else {
            return shift.name;
          }
        }),
      };
    });

    if (!roster) {
      // No such roster
      return { redirect: { destination: '/', permanent: false } };
    }

    const allRosters = await Roster.find({ ward: ward._id }).lean();
    const months = allRosters.map((r) => {
      const y = r.month.getFullYear();
      const m = r.month.getMonth() + 1;
      return {
        id: `${y}/${m}`,
        name: r.month.toLocaleString('en-US', { month: 'long' }) + ' ' + y,
      };
    });

    return {
      props: {
        user,
        year,
        month,
        roster: data,
        months,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
}
