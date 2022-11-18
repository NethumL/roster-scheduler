import NewRequestModal from '@/components/requests/newRequestModal';
import RequestCard from '@/components/requests/requestCard';
import { getUser } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Request from '@/lib/models/Request';
import Ward from '@/lib/models/Ward';
import { send } from '@/lib/util';
import { Add, AddCircleOutline } from '@mui/icons-material';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Fab,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';

export default function ViewRequests({ requests, user }) {
  let isDoctor = user.type === 'DOCTOR';

  const [status, setStatus] = useState(['Pending', 'Resolved']);
  const [allRequests, setAllRequests] = useState(requests);
  const [filtered, setFiltered] = useState(requests);

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('md'));

  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const handleClickOpenRequestModal = () => {
    setOpenRequestModal(true);
  };

  const handleCloseRequestModal = () => {
    setOpenRequestModal(false);
  };

  const handleSaveRequest = async (subject, description) => {
    if (!isDoctor) return;

    const newRequests = [
      ...allRequests,
      {
        subject,
        description,
        resolved: false,
      },
    ];

    const original = [...allRequests];

    setAllRequests(newRequests);

    const body = {
      subject,
      description,
    };

    try {
      await send('POST', '/api/request', body);
    } catch (error) {
      setOpenToast(true);
      setAllRequests(original);
    }

    setOpenRequestModal(false);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  const resolve = async (requestId) => {
    if (isDoctor) return;

    let original = [...allRequests];
    let newRequests = [...allRequests];
    newRequests = newRequests.map((request) => {
      const newRequest = { ...request };
      if (request._id === requestId) {
        newRequest.resolved = true;
      }
      return newRequest;
    });
    setAllRequests(newRequests);

    const body = { resolve: true };

    try {
      await send('PUT', `/api/request/resolve/${requestId}`, body);
    } catch (error) {
      setOpenToast(true);
      setAllRequests(original);
    }
  };

  const filter = () => {
    let temp = [...allRequests];

    if (status.length) {
      temp = temp.filter((request) => {
        if (request.resolved) {
          if (status.includes('Resolved')) {
            return request;
          }
        } else {
          if (!request.resolved) {
            if (status.includes('Pending')) {
              return request;
            }
          }
        }
      });
    }

    setFiltered(temp);
  };

  useEffect(filter, [status, allRequests]);

  return (
    <Container sx={{ mt: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5 }}>
        <Typography variant="h4" component="span">
          {isDoctor ? 'My Requests' : 'Requests'}
        </Typography>
        {isDoctor && !mobileView && (
          <Button
            variant="contained"
            startIcon={<AddCircleOutline />}
            onClick={handleClickOpenRequestModal}
          >
            New
          </Button>
        )}
      </Box>
      <Autocomplete
        multiple
        id="filter-status"
        onChange={(event, value) => setStatus(value)}
        value={status}
        options={['Pending', 'Resolved']}
        getOptionLabel={(option) => option}
        defaultValue={[]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Status"
            placeholder="Status"
          />
        )}
        sx={{ mb: 5 }}
      />
      {filtered.length !== 0 && (
        <Paper elevation={2} sx={{ p: 5, mb: 5 }}>
          <Grid
            container
            id="requests-grid"
            spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}
          >
            {filtered.map((request, index) => (
              <RequestCard
                key={index}
                request={request}
                isDoctor={isDoctor}
                resolve={resolve}
              />
            ))}
          </Grid>
        </Paper>
      )}
      {filtered.length === 0 && (
        <Alert severity="info" sx={{ mb: 5 }}>
          No requests found
        </Alert>
      )}
      {isDoctor && mobileView && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={handleClickOpenRequestModal}
        >
          <Add />
        </Fab>
      )}
      {isDoctor && (
        <NewRequestModal
          open={openRequestModal}
          handleClose={handleCloseRequestModal}
          handleSave={handleSaveRequest}
        />
      )}
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity="error"
          sx={{ width: '100%' }}
        >
          {isDoctor
            ? 'The request could not be saved!'
            : 'The request could not be completed!'}
        </Alert>
      </Snackbar>
    </Container>
  );
}

/**
 * @param {import('next').NextPageContext} context
 */
export async function getServerSideProps(context) {
  let requests = [];

  try {
    const user = await getUser(context.req);

    if (user.type === 'DOCTOR') {
      await dbConnect();

      requests = await Request.find({ user: user._id }).populate('user').lean();
    } else if (user.type === 'CONSULTANT') {
      await dbConnect();

      const ward = await Ward.findOne({
        personInCharge: user._id,
      }).lean();

      if (ward !== null) {
        requests = await Request.find({ user: { $in: ward.doctors } })
          .populate('user')
          .lean();
      }
    } else {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    requests = JSON.parse(JSON.stringify(requests));
    return { props: { requests, user } };
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
}
