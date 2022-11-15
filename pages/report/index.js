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

export default function ViewReports({ reports, user }) {
  let isDoctor = user.type === 'DOCTOR';

  const [status, setStatus] = useState(['Pending', 'Resolved']);
  const [allReports, setAllReports] = useState(reports);
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

    const newReports = [
      ...allReports,
      {
        subject,
        description,
        resolved: false,
      },
    ];

    const original = [...allReports];

    setAllReports(newReports);

    const body = {
      subject,
      description,
    };

    try {
      await send('POST', '/api/report', body);
    } catch (error) {
      setOpenToast(true);
      setAllReports(original);
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

    let original = [...allReports];
    let newReports = [...allReports];
    newReports = newReports.map((report) => {
      const newReport = { ...report };
      if (report._id === reportId) {
        newReport.resolved = true;
      }
      return newReport;
    });
    setAllReports(newReports);

    const body = { resolve: true };

    try {
      await send('PUT', `/api/report/resolve/${reportId}`, body);
    } catch (error) {
      setOpenToast(true);
      setAllReports(original);
    }
  };

  const filter = () => {
    let temp = [...allReports];

    if (status.length) {
      temp = temp.filter((report) => {
        if (report.resolved) {
          if (status.includes('Resolved')) {
            return report;
          }
        } else {
          if (!report.resolved) {
            if (status.includes('Pending')) {
              return report;
            }
          }
        }
      });
    }

    setFiltered(temp);
  };

  useEffect(filter, [status, allReports]);

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
      )}
      {filtered.length === 0 && (
        <Alert severity="info" sx={{ mb: 5 }}>
          No reports found
        </Alert>
      )}
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

      const ward = await Ward.findOne({
        personInCharge: user._id,
      }).lean();

      if (ward !== null) {
        reports = await Report.find({ user: { $in: ward.doctors } })
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
