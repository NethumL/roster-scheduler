import Ward from '@/lib/models/Ward';
import { getUser } from '@/lib/auth/session';
import dbConnect from '@/lib/db';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Head from 'next/head';

export default function ViewWard({ ward, hasWard }) {
  return (
    <Container>
      <Head>
        <title>{`Ward | ${process.env.NEXT_PUBLIC_TITLE}`}</title>
      </Head>
      {hasWard && (
        <Box
          sx={{
            padding: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card variant="outlined" sx={{ border: '10px solid #e9f3fc' }}>
            <CardContent>
              <Typography variant="h4" component="div">
                {ward.name}
              </Typography>
              <Typography
                sx={{ fontSize: 20 }}
                color="text.secondary"
                gutterBottom
              >
                {ward.description}
              </Typography>

              <Typography sx={{ mt: 2 }} color="text.secondary">
                Person in charge
              </Typography>
              <Typography variant="body2" paddingLeft="15px">
                {ward.personInCharge.name}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Shifts
              </Typography>
              {ward.shifts.map((shift, index) => (
                <Typography
                  sx={{ mb: 0.5 }}
                  variant="body2"
                  paddingLeft="15px"
                  key={index}
                >
                  {shift.name + ' [' + shift.start + ' - ' + shift.end + ']'}
                </Typography>
              ))}
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Minimum number of Doctors
              </Typography>
              <Typography variant="body2" paddingLeft="15px">
                {ward.minNumberOfDoctors}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Maximum number of leaves
              </Typography>
              <Typography variant="body2" paddingLeft="15px">
                {ward.maxNumberOfLeaves}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Minimum number of doctors per shift
              </Typography>
              <Typography variant="body2" paddingLeft="15px">
                {ward.minNumberOfDoctorsPerShift}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Same doctor has not to be given both last shift of the day &
                first shift of the next Day
              </Typography>
              <Typography variant="body2" paddingLeft="15px">
                {ward.allowAdjacentShifts ? 'True' : 'False'}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Doctors
              </Typography>
              {ward.doctors.map((doctor, index) => (
                <Typography
                  sx={{ mb: 0.5 }}
                  variant="body2"
                  paddingLeft="15px"
                  key={index}
                >
                  {doctor.name} - {doctor.username}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Box>
      )}
      {!hasWard && (
        <Container
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              mt: 20,
              backgrounColor: '#ffffff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            You has not been assigned to a ward.
          </Typography>
        </Container>
      )}
    </Container>
  );
}

/**
 * @param {import('next').NextPageContext} context
 */
export async function getServerSideProps(context) {
  let ward = [];
  let hasWard = true;
  try {
    const user = await getUser(context.req);
    await dbConnect();
    if (user.type === 'CONSULTANT') {
      ward = await Ward.find({ personInCharge: user._id })
        .populate('personInCharge')
        .populate('doctors')
        .populate('shifts')
        .lean();
    } else if (user.type === 'DOCTOR') {
      ward = await Ward.find({ doctors: { $in: [user._id] } })
        .populate('personInCharge')
        .populate('doctors')
        .populate('shifts')
        .lean();
    } else {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    if (ward.length == 0) {
      hasWard = false;
    } else {
      ward = JSON.parse(JSON.stringify(ward[0]));
    }

    return { props: { ward, hasWard } };
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
}
