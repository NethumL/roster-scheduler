import NewExchangeModal from '@/components/roster/newExchangeModal';
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
import { useState } from 'react';

export default function ExchangePage() {
  const [openNewExchangeModal, setOpenNewExchangeModal] = useState(false);
  const handleCloseNewExchangeModal = () => {
    setOpenNewExchangeModal(false);
  };
  const saveNewExchange = () => {
    // TODO: Save new exchange
  };

  const pendingExchanges = [
    {
      id: 1,
      doctor: 'John Doe',
      their: '2022/10/05 Morning',
      your: '2022/10/12 Morning',
    },
    {
      id: 1,
      doctor: 'Jane Doe',
      their: '2022/10/05 Afternoon',
      your: '2022/10/11 Evening',
    },
    {
      id: 1,
      doctor: 'Max Bolt',
      their: '2022/10/06 Morning',
      your: '2022/10/07 Morning',
    },
  ];

  const exchangeRequests = [
    {
      id: 1,
      doctor: 'John Doe',
      your: '2022/10/05 Evening',
      their: '2022/10/05 Evening',
      response: 'ACCEPTED',
    },
    {
      id: 1,
      doctor: 'Jane Doe',
      your: '2022/10/05 Afternoon',
      their: '2022/10/11 Evening',
      response: 'REJECTED',
    },
  ];

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
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row.doctor}</TableCell>
                  <TableCell>{row.their}</TableCell>
                  <TableCell>{row.your}</TableCell>
                  <TableCell>Accept/Reject</TableCell>
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
                  <TableCell>{row.doctor}</TableCell>
                  <TableCell>{row.your}</TableCell>
                  <TableCell>{row.their}</TableCell>
                  <TableCell>{row.response}</TableCell>
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
        open={openNewExchangeModal}
        handleClose={handleCloseNewExchangeModal}
        save={saveNewExchange}
      />
    </Container>
  );
}
