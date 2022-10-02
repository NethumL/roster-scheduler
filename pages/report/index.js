import NewReportModal from '@/components/reports/newReportModal';
import ReportCard from '@/components/reports/reportCard';
import { getUser } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Report from '@/lib/models/Report';
import { Add, AddCircleOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  Fab,
  Grid,
  Paper,
  Switch,
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
  let isDoctor = user.type === 'doctor';

  const [filtered, setFiltered] = useState(reports);

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('md'));

  const [openReportModal, setOpenReportModal] = useState(false);

  const handleClickOpenReportModal = () => {
    setOpenReportModal(true);
  };

  const handleCloseReportModal = () => {
    setOpenReportModal(false);
  };

  const resolve = (reportId) => {
    if (isDoctor) return;

    let newReports = [...filtered];
    newReports = newReports.map((report) => {
      if (report._id === reportId) {
        report.resolved = true;
      }
      return report;
    });

    setFiltered(newReports);
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
      <NewReportModal
        open={openReportModal}
        handleClose={handleCloseReportModal}
      />
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

    if (user.type === 'doctor') {
      await dbConnect();

      reports = await Report.find({})
        .populate('user', { _id: user._id })
        .lean();

      console.log(reports, user);
      reports = JSON.parse(JSON.stringify(reports));
      return { props: { reports, user } };
    }

    if (user.type === 'consultant') {
      await dbConnect();

      /**
       * TODO: Filter reports by doctors of the ward
       */
      reports = await Report.find({}).lean();
      reports = JSON.parse(JSON.stringify(reports));
      return { props: { reports, user } };
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
}
