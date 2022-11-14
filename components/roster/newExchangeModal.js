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
import { useEffect, useState } from 'react';

export default function NewExchangeModal({
  user,
  doctors,
  open,
  handleClose,
  save,
  getShift,
}) {
  const [yourShiftDate, setYourShiftDate] = useState(new Date());
  const [yourShift, setYourShift] = useState({ _id: null, name: null });
  const [doctor, setDoctor] = useState(doctors[0]._id);
  const [theirShiftDate, setTheirShiftDate] = useState(new Date());
  const [theirShift, setTheirShift] = useState({ _id: null, name: null });
  const [canExchange, setCanExchange] = useState(false);

  useEffect(() => {
    (async () => {
      const shift = await getShift(user._id, yourShiftDate);
      setCanExchange(!shift._id && !theirShift._id); // Cannot exchange without shifts
      setYourShift(shift);
    })();
  }, [yourShiftDate]);

  useEffect(() => {
    (async () => {
      const shift = await getShift(doctor, theirShiftDate);
      setCanExchange(!shift._id && !yourShift._id); // Cannot exchange without shifts
      setTheirShift(shift);
    })();
  }, [doctor, theirShiftDate]);

  const handleSave = (e) => {
    if (!yourShift._id || !theirShift._id) {
      return;
    }
    const newExchange = {
      shiftDate: yourShiftDate,
      shift: yourShift._id,
      otherDoctor: doctor,
      otherShiftDate: theirShiftDate,
      otherShift: theirShift._id,
    };
    save(newExchange);
    handleClose(e);
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
              onChange={(newDate) => setYourShiftDate(newDate['$d'])}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Typography textAlign="center" id="your-shift">
          {yourShift.name ?? 'NONE'}
        </Typography>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          rowSpacing={5}
          columnSpacing={5}
          sx={{ marginTop: '2px' }}
        >
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="doctor-select-label">Doctor</InputLabel>
              <Select
                labelId="doctor-select-label"
                id="doctor-select"
                value={doctor}
                label="Doctor"
                onChange={(e) => setDoctor(e.target.value)}
              >
                <MenuItem value={''} disabled>
                  Doctor
                </MenuItem>
                {doctors.map((doctor) => (
                  <MenuItem key={doctor._id} value={doctor._id}>
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
                onChange={(newDate) => setTheirShiftDate(newDate['$d'])}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Typography
          textAlign="right"
          id="their-shift"
          sx={{ marginTop: '15px' }}
        >
          {theirShift.name ?? 'NONE'}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={canExchange}>
          Request
        </Button>
      </DialogActions>
    </Dialog>
  );
}
