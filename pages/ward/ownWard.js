import Ward from '@/lib/models/Ward';
import { getUser } from '@/lib/auth/session';
import dbConnect from '@/lib/db';

import GroupIcon from '@mui/icons-material/Group';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ViewWard({ ward }) {
  return (
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
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            {ward.description}
          </Typography>

          <Typography sx={{ mt: 2 }} color="text.secondary">
            personInCharge
          </Typography>
          <Typography variant="body2" paddingLeft="15px">
            {ward.personInCharge.name}
            {/* <br />
            {'"a benevolent smile"'} */}
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
              {shift.name +
                ' [' +
                shift.start.slice(-13, -8) +
                ' - ' +
                shift.end.slice(-13, -8) +
                ']'}
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
            Same doctor has not to be given both last shift of the day & first
            shift of the next Day
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
              {doctor.name}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}

/**
 * @param {import('next').NextPageContext} context
 */
export async function getServerSideProps(context) {
  let ward = [];
  //   try {
  const user = await getUser(context.req);
  await dbConnect();
  if (user.type === 'CONSULTANT') {
    ward = await Ward.find({ consultant: user._id })
      .populate('personInCharge')
      .populate('docotrs')
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
  console.log(ward);
  ward = JSON.parse(JSON.stringify(ward[0]));
  console.log(ward);
  return { props: { ward } };
  //   } catch (error) {
  //     return {
  //       redirect: {
  //         destination: '/auth/login',
  //         permanent: false,
  //       },
  //     };
  //   }
}
