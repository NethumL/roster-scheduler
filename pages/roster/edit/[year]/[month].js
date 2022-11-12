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
import Router from 'next/router';
import { useState } from 'react';

export default function EditRosterPage({
  year,
  month,
  shifts,
  roster: origRoster,
}) {
  const [roster, setRoster] = useState(origRoster);

  /** @type {import('react').MouseEventHandler} */
  const handleUpdate = async (e) => {
    try {
      await send('PUT', `/api/roster/${year}/${month}`, { roster });
      Router.push(`/roster/view/${year}/${month}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const dayColumns = shifts.map((shift) => (
    <TableCell key={shift.name}>{shift.name}</TableCell>
  ));

  /** @type {import('react').DragEventHandler<HTMLTableCellElement>} */
  const handleDragStart = (e) => {
    // @ts-ignore
    const { name, shift, index } = e.target.dataset;
    e.dataTransfer.setData('text', `${name}/${shift}/${index}`);
  };

  /** @type {import('react').DragEventHandler} */
  const handleDrop = (e) => {
    e.preventDefault();
    const [otherName, otherShift, otherIndex] = e.dataTransfer
      .getData('text')
      .split('/');
    // @ts-ignore
    const { name, shift, index } = e.target.dataset;

    setRoster(
      roster
        .map((doctor) => {
          if (doctor.name === name) {
            return {
              name: name,
              items: doctor.items.map((s, i) => {
                if (parseInt(index) === i) {
                  return otherShift;
                } else {
                  return s;
                }
              }),
            };
          } else {
            return doctor;
          }
        })
        .map((doctor) => {
          if (doctor.name === otherName) {
            return {
              name: otherName,
              items: doctor.items.map((s, i) => {
                if (parseInt(otherIndex) === i) {
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
  };

  /** @type {import('react').MouseEventHandler<HTMLElement>} */
  const handleDoubleClick = (e) => {
    e.target.contentEditable = 'true';
    e.target.addEventListener('blur', handleStopEditing);
  };

  /** @type {EventListener} */
  function handleStopEditing(e) {
    e.target.contentEditable = 'false';
    e.target.removeEventListener('blur', handleStopEditing);

    // @ts-ignore
    const { name, index } = e.target.dataset;
    // @ts-ignore
    e.target.dataset.shift = e.target.textContent;
    setRoster(
      roster.map((doctor) => {
        if (doctor.name === name) {
          return {
            name: name,
            items: doctor.items.map((s, i) => {
              if (parseInt(index) === i) {
                return e.target.textContent;
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
                      draggable
                      onDragStart={handleDragStart}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      onDoubleClick={handleDoubleClick}
                      key={`${shift}${index}`}
                      data-name={row.name}
                      data-shift={shift}
                      data-index={index}
                    >
                      {shift}
                    </TableCell>
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
      month: `${year}-${month}-01`,
    }).lean();

    if (!roster) {
      // No such roster
      return { redirect: { destination: '/', permanent: false } };
    }

    return {
      props: { user, year, month, roster: roster.shifts, shifts: ward.shifts },
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
