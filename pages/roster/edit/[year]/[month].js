import { getUser } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Roster from '@/lib/models/Roster';
import Ward from '@/lib/models/Ward';
import { send } from '@/lib/util';
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
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function EditRosterPage({
  year,
  month,
  roster: originalRoster,
  shifts,
}) {
  const router = useRouter();

  const [roster, setRoster] = useState(originalRoster);

  /** @type {import('react').MouseEventHandler} */
  const handleUpdate = async (e) => {
    try {
      await send('PUT', `/api/roster/${year}/${month}`, { roster });
      router.push(`/roster/view/${year}/${month}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const daysInMonth = roster[0].items.length;
  const dayColumns = [];
  for (let day = 1; day <= daysInMonth; day++) {
    dayColumns.push(<TableCell key={day}>{day}</TableCell>);
  }

  /** @type {import('react').ChangeEventHandler} */
  function handleShiftChange(e) {
    // @ts-ignore
    const shift = e.target.value;
    const { name, index } = e.target.parentElement.dataset;
    setRoster(
      roster.map((doctor) => {
        if (doctor.name === name) {
          return {
            ...doctor,
            items: doctor.items.map((s, i) => {
              if (parseInt(index) === i) {
                return shift;
              } else {
                return s;
              }
            }),
          };
        } else {
          return doctor;
        }
      })
    );
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
            {year}/{month}
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
                    <TableCell
                      key={`${shift}${index}`}
                      data-name={row.name}
                      data-index={index}
                    >
                      <select onChange={handleShiftChange}>
                        <option value=""></option>
                        {shifts.map((s) => (
                          <option value={s._id} selected={s._id === shift}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid container justifyContent="space-between" sx={{ marginY: '55px' }}>
        <Grid item xs={8}></Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="success" onClick={handleUpdate}>
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

    // @ts-ignore
    const year = parseInt(context.query.year);
    // @ts-ignore
    const month = parseInt(context.query.month);

    await dbConnect();

    const ward = await (async () => {
      if (user.type === 'DOCTOR') {
        const ward = await Ward.findOne({ doctors: user._id })
          .populate('shifts')
          .lean();
        return ward;
      } else {
        const ward = await Ward.findOne({ personInCharge: user._id })
          .populate('shifts')
          .lean();
        return ward;
      }
    })();

    const roster = await Roster.findOne({
      ward: ward._id,
      month: new Date(year, month - 1, 1),
    })
      .populate([
        { path: 'rosters.doctor' },
        { path: 'rosters.shifts', options: { retainNullValues: true } },
      ])
      .select({ _id: 0, ward: 0, month: 0 })
      .lean();

    const data = roster.rosters.map((rosterInst) => {
      return {
        _id: rosterInst.doctor._id.toString(),
        name: rosterInst.doctor.name,
        username: rosterInst.doctor.username,
        items: rosterInst.shifts.map((shift) => {
          if (shift === null) {
            return '';
          } else {
            return shift._id.toString();
          }
        }),
      };
    });

    if (!roster) {
      // No such roster
      return { redirect: { destination: '/', permanent: false } };
    }

    return {
      props: {
        user,
        year,
        month,
        roster: data,
        shifts: ward.shifts.map((shift) => {
          const { _id, ...result } = shift;
          return { ...result, _id: _id.toString() };
        }),
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
}
