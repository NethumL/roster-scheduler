import NewReportModal from '@/components/reports/newReportModal';
import ReportCard from '@/components/reports/reportCard';
import { getUser } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Report from '@/lib/models/Report';
import Ward from '@/lib/models/Ward';
import { send } from '@/lib/util';
import { Add, AddCircleOutline } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Fab,
  Grid,
  Paper,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';

export default function ViewReports({ reports, user }) {
  /**
   * TODO: user type implementation
   */
  let isDoctor = user.type === 'DOCTOR';

  const [filtered, setFiltered] = useState(reports);

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('md'));

  const [openReportModal, setOpenReportModal] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const handleClickOpenReportModal = () => {
    setOpenReportModal(true);
  };

  const handleCloseReportModal = () => {
    setOpenReportModal(false);
  };

  const handleSaveReport = async (subject, description) => {
    if (!isDoctor) return;

    const newFiltered = [
      ...filtered,
      {
        subject,
        description,
        resolved: false,
      },
    ];

    const original = [...filtered];

    setFiltered(newFiltered);

    const body = {
      subject,
      description,
    };

    try {
      await send('POST', '/api/report', body);
    } catch (error) {
      setOpenToast(true);
      setFiltered(original);
    }

    setOpenReportModal(false);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  const resolve = async (reportId) => {
    if (isDoctor) return;

    let original = [...filtered];
    let newReports = [...filtered];
    newReports = newReports.map((report) => {
      const newReport = { ...report };
      if (report._id === reportId) {
        newReport.resolved = true;
      }
      return newReport;
    });
    setFiltered(newReports);

    const body = { resolve: true };

    try {
      await send('PUT', `/api/report/resolve/${reportId}`, body);
    } catch (error) {
      setOpenToast(true);
      setFiltered(original);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5 }}>
        <Typography variant="h4" component="span">
          {isDoctor ? 'My Reports' : 'Reports'}
        </Typography>
        {isDoctor && !mobileView && (
          <Button
            variant="contained"
            startIcon={<AddCircleOutline />}
            onClick={handleClickOpenReportModal}
          >
            New
          </Button>
        )}
      </Box>
      <Paper elevation={2} sx={{ p: 5, mb: 5 }}>
        <Grid
          container
          id="reports-grid"
          spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}
        >
          {filtered.map((report, index) => (
            <ReportCard
              key={index}
              report={report}
              isDoctor={isDoctor}
              resolve={resolve}
            />
          ))}
        </Grid>
      </Paper>
      {isDoctor && mobileView && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={handleClickOpenReportModal}
        >
          <Add />
        </Fab>
      )}
      {isDoctor && (
        <NewReportModal
          open={openReportModal}
          handleClose={handleCloseReportModal}
          handleSave={handleSaveReport}
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
            ? 'The report could not be saved!'
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
  let reports = [];

  try {
    const user = await getUser(context.req);

    if (user.type === 'DOCTOR') {
      await dbConnect();

      reports = await Report.find({ user: user._id }).populate('user').lean();
    } else if (user.type === 'CONSULTANT') {
      await dbConnect();

      const { doctors } = await Ward.findOne({
        personInCharge: user._id,
      }).lean();
      reports = await Report.find({ user: { $in: doctors } })
        .populate('user')
        .lean();
    } else {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    reports = JSON.parse(JSON.stringify(reports));
    return { props: { reports, user } };
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
}
