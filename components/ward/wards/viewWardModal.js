import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Select, InputLabel, FormControl } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/system';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import col from '@mui/material/';
import colgroup from '@mui/material/';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
  AppBar,
  IconButton,
  Toolbar,
  useMediaQuery,
  Typography,
  MenuItem,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Close } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import ShiftList from './shiftList';
import { Tooltip } from '@mui/material';

export default function ViewWardModal({
  open,
  ward,
  handleClose,
  handleSave,
  consultants,
  assignedConsultants,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const width = useMediaQuery(theme.breakpoints.down('md')) ? '100%' : '400px';
  const [isEdit, setIsEdit] = useState(false);
  const [topic, setTopic] = useState('VIEW WARD');
  const [close, setClose] = useState('OK');
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPersonInCharge, setNewPersonInCharge] = useState(
    ward?.personInCharge._id
  );
  const [newNumDutyCycles, setNewNumDutyCycles] = useState('');
  const [newShifts, setNewShifts] = useState([]);
  const [newMinNumDoctors, setNewMinNumDoctors] = useState('');
  const [newMaxNumLeaves, setNewMaxNumLeaves] = useState('');
  const [newMinNumDoctorsPerShift, setNewMinNumDoctorsPerShift] = useState('');
  const [newStatusAdjacentShifts, setNewStatusAdjacentShifts] = useState(false);
  // const [assignedConsultants_state, setAssignedConsultants] = usestate([
  //   ...assignedConsultants,
  // ]);
  const save = () => {
    let PIC = consultants.find((x) => x._id === newPersonInCharge);
    handleSave(
      newName,
      newDescription,
      PIC,
      newNumDutyCycles,
      newShifts.slice(0, newNumDutyCycles),
      newMinNumDoctors,
      newMaxNumLeaves,
      newMinNumDoctorsPerShift,
      newStatusAdjacentShifts
    );
  };

  const handleIsEdit = () => {
    setIsEdit(true);
    setTopic('EDIT WARD');
    setClose('CANCEL');
  };

  useEffect(() => {
    setNewName(ward ? ward.name : '');
    setNewDescription(ward ? ward.description : '');
    setNewPersonInCharge(ward ? ward.personInCharge._id : '');
    console.log('pic');
    console.log(ward?.personInCharge);
    setNewNumDutyCycles(ward ? ward.shifts.length : '');
    setNewShifts(ward ? ward.shifts : []);
    setNewMinNumDoctors(ward ? ward.minNumberOfDoctors : '');
    setNewMaxNumLeaves(ward ? ward.maxNumberOfLeaves : '');
    setNewMinNumDoctorsPerShift(ward ? ward.minNumberOfDoctorsPerShift : '');
    setNewStatusAdjacentShifts(ward ? ward.allowAdjacentShifts : false);
    // setAssignedConsultants([...assignedConsultants]);
    // let arr = [...assignedConsultants_state];
    // let index = assignedConsultants_state.findIndex((id) => {
    //   return id === newPersonInCharge;
    // });

    // arr.splice(index, 1);
    // setAssignedConsultants([...arr]);
  }, [ward, open]);

  useEffect(() => {
    setTopic('VIEW WARD');
    setClose('OK');
    setIsEdit(ward ? false : true);
  }, [open]);
  return (
    <div>
      <Dialog
        open={open}
        onClose={(_, reason) => {
          if (reason !== 'backdropClick') {
            handleClose();
          }
        }}
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth="md"
      >
        {fullScreen && (
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {ward ? topic : 'NEW WARD'}
              </Typography>
              {!isEdit && (
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleIsEdit}
                  aria-label="edit"
                >
                  <Tooltip title="Edit">
                    <EditIcon />
                  </Tooltip>
                </IconButton>
              )}
              {isEdit && (
                <Button autoFocus color="inherit" onClick={save}>
                  {ward ? 'Save' : 'create'}
                </Button>
              )}
            </Toolbar>
          </AppBar>
        )}
        {!fullScreen && (
          <DialogTitle sx={{ ml: 2, flex: 1 }}>
            {ward ? topic : 'NEW WARD'}
            {!isEdit && (
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleIsEdit}
                aria-label="edit"
                sx={{ position: 'relative', float: 'right' }}
              >
                <Tooltip title="Edit">
                  <EditIcon />
                </Tooltip>
              </IconButton>
            )}
          </DialogTitle>
        )}
        <DialogContent sx={{ p: 5 }}>
          <TextField
            required
            autoFocus
            margin="dense"
            id="edit-name"
            label="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            type="text"
            fullWidth
            disabled={!isEdit}
            variant="standard"
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="edit-Description"
            label="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            type="text"
            fullWidth
            disabled={!isEdit}
            variant="standard"
            sx={{ mb: 3 }}
          />
          <FormControl fullWidth>
            <InputLabel id="doctor-select-label">Person in charge</InputLabel>
            <Select
              labelId="doctor-select-label"
              id="doctor-select"
              fullWidth
              disabled={!isEdit}
              value={newPersonInCharge}
              label="Person in charge"
              onChange={(e) => setNewPersonInCharge(e.target.value)}
            >
              {consultants.map((consultant, index) => (
                // !assignedConsultants?.includes(consultant._id) &&
                <MenuItem
                  key={index}
                  value={consultant._id}
                  disabled={
                    assignedConsultants?.includes(consultant._id) &&
                    consultant._id != ward?.personInCharge._id
                  }
                >
                  {consultant.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            autoFocus
            margin="dense"
            id="edit-NumDutyCycles"
            label="Number of duty cycles per day"
            value={newNumDutyCycles}
            onChange={(e) => setNewNumDutyCycles(e.target.value)}
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            fullWidth
            disabled={!isEdit}
            variant="standard"
          />
          <Table>
            <colgroup>
              <col width="1%" />
              <col width="35%" />
              <col width="32%" />
              <col width="32%" />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Start Time</TableCell>
                <TableCell align="center">End Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <ShiftList
                newNumDutyCycles={newNumDutyCycles}
                setNew={setNewShifts}
                isEdit={isEdit}
                newShifts={newShifts}
                open={open}
                ward={ward}
              />
            </TableBody>
          </Table>
          <TextField
            autoFocus
            margin="dense"
            id="edit-MinNumDoctors"
            label="Minimum Number of Doctors"
            value={newMinNumDoctors}
            onChange={(e) => setNewMinNumDoctors(e.target.value)}
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            fullWidth
            disabled={!isEdit}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="edit-MaxNumLeaves"
            label="Maximum number of leaves"
            value={newMaxNumLeaves}
            onChange={(e) => setNewMaxNumLeaves(e.target.value)}
            type="number"
            InputProps={{ inputProps: { min: 0, max: 30 } }}
            fullWidth
            disabled={!isEdit}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="edit-MinNumDoctorsPerShift"
            label="Minimum number of doctors per shift"
            value={newMinNumDoctorsPerShift}
            onChange={(e) => setNewMinNumDoctorsPerShift(e.target.value)}
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            fullWidth
            disabled={!isEdit}
            variant="standard"
          />
          <FormControlLabel
            disabled={!isEdit}
            control={
              <Checkbox
                checked={newStatusAdjacentShifts}
                onChange={(e) => setNewStatusAdjacentShifts(e.target.checked)}
              />
            }
            label="Same doctor has not to be given both last shift of the day & first shift of the next day"
          />
        </DialogContent>
        {!fullScreen && (
          <DialogActions>
            <Button onClick={handleClose}>{ward ? close : 'cancel'}</Button>
            {isEdit && (
              <Button onClick={save}>{ward ? 'Save' : 'create'}</Button>
            )}
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
