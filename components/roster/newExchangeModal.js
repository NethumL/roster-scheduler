import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';

const doctors = [
  { username: 'john', name: 'John Doe' },
  { username: 'jane', name: 'Jane Doe' },
];

export default function NewExchangeModal({ open, handleClose, save }) {
  const [yourShiftDate, setYourShiftDate] = useState(new Date());
  const [yourShift, setYourShift] = useState('Morning shift');
  const [doctor, setDoctor] = useState('');
  const [theirShiftDate, setTheirShiftDate] = useState(new Date());
  const [theirShift, setTheirShift] = useState('Afternoon shift');

  const handleChangeDoctor = (event) => {
    // TODO: Get shift for doctor
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>New exchange request</DialogTitle>
      <DialogContent>
        <Box sx={{ marginY: '20px' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Your shift date"
              value={yourShiftDate}
              onChange={(newDate) => {
                setYourShiftDate(newDate);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Typography textAlign="center">{yourShift}</Typography>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          rowSpacing={5}
          columnSpacing={5}
          sx={{ marginTop: '2px' }}
        >
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel id="doctor-select-label">Doctor</InputLabel>
              <Select
                labelId="doctor-select-label"
                id="doctor-select"
                value={doctor}
                label="Doctor"
                onChange={handleChangeDoctor}
              >
                <MenuItem value={''} disabled>
                  Doctor
                </MenuItem>
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.username} value={doctor.username}>
                    {doctor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Their shift date"
                value={theirShiftDate}
                onChange={(newDate) => {
                  setTheirShiftDate(newDate);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Typography textAlign="right" sx={{ marginTop: '15px' }}>
          {theirShift}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={save}>Request</Button>
      </DialogActions>
    </Dialog>
  );
}
