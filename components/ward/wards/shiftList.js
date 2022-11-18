import * as React from 'react';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import GroupIcon from '@mui/icons-material/Group';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useEffect, useState } from 'react';

export default function ShiftsList({
  newNumDutyCycles,
  setNew,
  isEdit,
  newShifts,
  ward,
}) {
  const [shifts, setShifts] = useState([]);
  const setName = (val, i) => {
    var temp = [...shifts];
    temp[i].name = val;
    setShifts(temp);
    setNew(temp.map((obj) => ({ ...obj })));
  };
  const setStart = (val, i) => {
    var temp = [...shifts];
    temp[i].start = val['$d'].toString().split(' ')[4].slice(0, 5);
    setShifts(temp);
    setNew(temp.map((obj) => ({ ...obj })));
  };
  const setEnd = (val, i) => {
    var temp = [...shifts];
    temp[i].end = val['$d'].toString().split(' ')[4].slice(0, 5);
    setShifts(temp);
    setNew(temp.map((obj) => ({ ...obj })));
  };
  useEffect(() => {
    var tmp = [];
    setShifts(newShifts ? newShifts.map((obj) => ({ ...obj })) : []);
  }, [newShifts]);
  var indents = [];
  for (var i = 0; i < newNumDutyCycles; i++) {
    if (!shifts[i]) {
      shifts.push({
        name: '',
        start: '00:00',
        end: '00:00',
      });
    }

    indents.push(
      <TableRow key={i}>
        <TableCell align="right">
          <TextField
            autoFocus
            margin="dense"
            id="edit-shifts"
            label=""
            value={shifts[i]?.name}
            onChange={(e) => setName(e.target.value, i)}
            type="text"
            fullWidth
            disabled={!isEdit}
            variant="standard"
          />
        </TableCell>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TableCell align="right">
            <TimePicker
              label=""
              value={dayjs('2014-08-18T' + shifts[i]?.start + ':00')}
              onChange={(e) => setStart(e, i)}
              disabled={!isEdit}
              renderInput={(params) => <TextField {...params} />}
              InputProps={{ style: { fontSize: 12 } }}
            />
          </TableCell>
          <TableCell align="right">
            <TimePicker
              label=""
              value={dayjs('2014-08-18T' + shifts[i]?.end + ':00')}
              onChange={(e) => setEnd(e, i)}
              disabled={!isEdit}
              renderInput={(params) => <TextField {...params} />}
              InputProps={{ style: { fontSize: 12 } }}
            />
          </TableCell>
        </LocalizationProvider>
      </TableRow>
    );
  }
  return indents;
}
