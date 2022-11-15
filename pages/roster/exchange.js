import NewExchangeModal from '@/components/roster/newExchangeModal';
import { getUser } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Exchange from '@/lib/models/Exchange';
import Ward from '@/lib/models/Ward';
import { send } from '@/lib/util';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const statusToColorMap = {
  PENDING: 'primary',
  ACCEPTED: 'success',
  REJECTED: 'error',
};

export default function ExchangePage({
  user,
  pendingExchanges: origPendingExchanges,
  exchangeRequests: origExchangeRequests,
  doctors,
}) {
  const [openNewExchangeModal, setOpenNewExchangeModal] = useState(false);
  const [pendingExchanges, setPendingExchanges] =
    useState(origPendingExchanges);
  const [exchangeRequests, setExchangeRequests] =
    useState(origExchangeRequests);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleCloseNewExchangeModal = () => {
    setOpenNewExchangeModal(false);
  };

  const saveNewExchange = async (newExchange) => {
    const response = await send('POST', `/api/roster/exchange`, newExchange);
    setExchangeRequests([...exchangeRequests, response.exchange]);
  };

  /**
   * @param {string} doctor
   * @param {Date} date
   * @return {Promise<{_id: string, name: string}>}
   */
  async function getShift(doctor, date) {
    const response = await send(
      'GET',
      `/api/roster/${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}?doctor=${encodeURIComponent(doctor)}`
    );
    return response.shift;
  }

  /**
   * @param {string} status
   * @returns {import('react').MouseEventHandler}
   */
  const getUpdateStatusHandler = (status) => async (e) => {
    // @ts-ignore
    const { id } = e.target.parentElement.parentElement.dataset;

    const response = await send(
      'PUT',
      `/api/roster/exchange/${encodeURIComponent(id)}/status`,
      { status }
    );

    setPendingExchanges(
      pendingExchanges.filter((exchange) => exchange._id !== id)
    );
    setIsSnackbarOpen(true);
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
    <Container sx={{ marginBottom: '15px' }}>
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
            Pending exchanges
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
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Doctor</TableCell>
                <TableCell>Their shift</TableCell>
                <TableCell>Your shift</TableCell>
                <TableCell>Respond</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingExchanges.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  data-id={row._id}
                >
                  <TableCell>{row.doctor.name}</TableCell>
                  <TableCell>
                    {new Date(row.shiftDate).toLocaleDateString() +
                      ' ' +
                      row.shift.name}
                  </TableCell>
                  <TableCell>
                    {new Date(row.otherShiftDate).toLocaleDateString() +
                      ' ' +
                      row.otherShift.name}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ margin: '3px' }}
                      onClick={getUpdateStatusHandler('ACCEPTED')}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ margin: '3px' }}
                      onClick={getUpdateStatusHandler('REJECTED')}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        rowSpacing={5}
        marginTop="5px"
      >
        <Grid item>
          <Typography variant="h4" textAlign="center">
            Your exchange requests
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
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Doctor</TableCell>
                <TableCell>Your shift</TableCell>
                <TableCell>Their shift</TableCell>
                <TableCell>Response</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exchangeRequests.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row.otherDoctor.name}</TableCell>
                  <TableCell>
                    {new Date(row.otherShiftDate).toLocaleDateString() +
                      ' ' +
                      row.otherShift.name}
                  </TableCell>
                  <TableCell>
                    {new Date(row.shiftDate).toLocaleDateString() +
                      ' ' +
                      row.shift.name}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={statusToColorMap[row.status]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Typography textAlign="right" sx={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          onClick={() => setOpenNewExchangeModal(true)}
        >
          New request
        </Button>
      </Typography>
      <NewExchangeModal
        user={user}
        doctors={doctors}
        open={openNewExchangeModal}
        handleClose={handleCloseNewExchangeModal}
        save={saveNewExchange}
        getShift={getShift}
      />
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Status updated"
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

    if (user.type !== 'DOCTOR') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    await dbConnect();

    const pendingExchangeDocs = await Exchange.find({
      otherDoctor: user._id,
      status: 'PENDING',
    })
      .populate(['doctor', 'shift', 'otherShift'])
      .lean();

    const exchangeRequestDocs = await Exchange.find({ doctor: user._id })
      .populate(['otherDoctor', 'shift', 'otherShift'])
      .lean();

    const ward = await Ward.findOne({ doctors: user._id })
      .populate('doctors')
      .exec();

    const doctors = ward.doctors
      .map((doctor) => {
        return {
          _id: doctor._id.toString(),
          name: doctor.name,
          username: doctor.username,
        };
      })
      .filter((doctor) => doctor.username !== user.username);

    return {
      props: {
        user,
        pendingExchanges: pendingExchangeDocs.map((document) => {
          const {
            _id,
            doctor,
            otherDoctor,
            shift,
            otherShift,
            shiftDate,
            otherShiftDate,
            ...exchange
          } = document;
          return {
            ...exchange,
            _id: _id.toString(),
            doctor: serializeDocument(doctor),
            shiftDate: shiftDate.toUTCString(),
            shift: serializeDocument(shift),
            otherShiftDate: otherShiftDate.toUTCString(),
            otherShift: serializeDocument(otherShift),
          };
        }),
        exchangeRequests: exchangeRequestDocs.map((document) => {
          const {
            _id,
            doctor,
            otherDoctor,
            shift,
            otherShift,
            shiftDate,
            otherShiftDate,
            ...exchange
          } = document;
          return {
            ...exchange,
            _id: _id.toString(),
            shiftDate: shiftDate.toUTCString(),
            shift: serializeDocument(shift),
            otherDoctor: serializeDocument(otherDoctor),
            otherShiftDate: otherShiftDate.toUTCString(),
            otherShift: serializeDocument(otherShift),
          };
        }),
        doctors: doctors,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
}

function serializeDocument(document) {
  return { ...document, _id: document._id.toString() };
}
