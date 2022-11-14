import { useState } from 'react';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';
import WardsList from '@/components/ward/wards/wardsList';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useTheme } from '@mui/system';
import Divider from '@mui/material/Divider';
import { useMediaQuery, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import DatePicker from 'react-multi-date-picker';
import PreferenceTable from '@/components/ward/user-preferences/preferenceTable';
import LeavesList from '@/components/ward/user-preferences/leavesList';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { getUser } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import { send } from '@/lib/util';
import Preferences from '@/lib/models/Preferences';
import Ward from '@/lib/models/Ward';

export default function View({ preferences, leaveDates, u_id }) {
  const [value, setValue] = useState(
    new Date(
      new Date(Date.now()).getFullYear(),
      new Date(Date.now()).getMonth() + 1,
      1
    )
  );
  const [leaves, setLeaves] = useState(leaveDates.map((str) => new Date(str)));
  const [savedLeaves, setSavedLeaves] = useState(
    leaveDates.map((str) => new Date(str))
  );
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const direction = useMediaQuery(theme.breakpoints.down('md'))
    ? 'column'
    : 'row';
  const height = useMediaQuery(theme.breakpoints.down('md')) ? 'auto' : 530;

  const [savedPrefs, setSavedPrefs] = useState(
    preferences.map((obj) => ({ ...obj }))
  );
  const [prefs, setPrefs] = useState(preferences.map((obj) => ({ ...obj })));
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleCancel = () => {
    // setPrefs(null);
    setPrefs(savedPrefs.map((obj) => ({ ...obj })));
  };
  const handleSave = async () => {
    const body = {
      doctor: u_id,
      preferenceOrder: prefs,
    };
    saved = prefs.map((obj) => ({ ...obj }));
    setSavedPrefs(prefs.map((obj) => ({ ...obj })));
    try {
      await send('PUT', '/api/ward/preferences/setPreference', body);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   setPrefs(preferences.map((obj) => ({ ...obj })));
  // }, [preferences]);
  const handleSaveLeaves = async () => {
    const body = {
      doctor: u_id,
      leaveDates: leaves,
    };
    try {
      await send('PUT', '/api/ward/preferences/setLeaveDates', body);
    } catch (error) {
      console.log(error);
    }
    setSavedLeaves([...leaves]);
  };
  const handleCancelLeaves = () => {
    setLeaves([...savedLeaves]);
  };
  // useEffect(() => {
  //   setLeaves([...leaveDates]);
  // }, [leaveDates]);
  return (
    <Container>
      <Typography
        variant="h5"
        component="div"
        sx={{
          m: 2,
          backgrounColor: '#ffffff',
        }}
      >
        Leave Dates for Next Month
      </Typography>
      <Stack
        direction={direction}
        spacing={2}
        width="100%"
        justifyContent="center"
      >
        {!fullScreen && (
          <Card sx={{ border: '37px solid #e9f3fc' }}>
            <Box sx={{ margin: 7 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  disableHighlightToday={true}
                  value={value}
                  sx={{ margin: 5 }}
                  onChange={(newValue) => {
                    setValue(newValue['$d']);
                    setLeaves((leaves) => [...leaves, newValue['$d']]);
                  }}
                  inputVariant="outlined"
                  minDate={
                    new Date(
                      new Date(Date.now()).getFullYear(),
                      new Date(Date.now()).getMonth() + 1,
                      1
                    )
                  }
                  maxDate={
                    new Date(
                      new Date(Date.now()).getFullYear(),
                      new Date(Date.now()).getMonth() + 2,
                      0
                    )
                  }
                  defaultDate={
                    new Date(
                      new Date(Date.now()).getFullYear(),
                      new Date(Date.now()).getMonth() + 1,
                      1
                    )
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Card>
        )}
        {fullScreen && (
          <Card sx={{ border: '10px solid #e9f3fc' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                disableHighlightToday={true}
                value={value}
                sx={{ margin: 5 }}
                onChange={(newValue) => {
                  setValue(newValue['$d']);
                  setLeaves((leaves) => [...leaves, newValue['$d']]);
                }}
                inputVariant="outlined"
                minDate={
                  new Date(
                    new Date(Date.now()).getFullYear(),
                    new Date(Date.now()).getMonth() + 1,
                    1
                  )
                }
                maxDate={
                  new Date(
                    new Date(Date.now()).getFullYear(),
                    new Date(Date.now()).getMonth() + 2,
                    0
                  )
                }
                defaultDate={
                  new Date(
                    new Date(Date.now()).getFullYear(),
                    new Date(Date.now()).getMonth() + 1,
                    1
                  )
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Card>
        )}
        <Card
          sx={{
            padding: 2,
            height: { height },
            border: '10px solid #e9f3fc',
            fontWeight: 'bold',
          }}
        >
          Dates:
          <LeavesList dates={[...leaves]} setNew={setLeaves} />
        </Card>
      </Stack>
      <Box sx={{ paddingTop: 1, paddingBottom: 4 }}>
        <Button
          variant="contained"
          onClick={handleSaveLeaves}
          style={{ float: 'right' }}
          sx={{ ml: 2, mr: 2 }}
        >
          SAVE
        </Button>
        <Button
          variant="contained"
          onClick={handleCancelLeaves}
          style={{ float: 'right' }}
        >
          CANCEL
        </Button>
      </Box>
      <Box>
        <Typography
          variant="h5"
          component="div"
          sx={{
            position: 'sticky',
            top: 7,
            mb: 2,
            ml: 2,
            mt: 2,
            backgrounColor: '#ffffff',
          }}
        >
          Preference Order for Duty Cycles
        </Typography>
        <Card sx={{ ml: 1, mr: 1, border: '10px solid #e9f3fc' }}>
          <PreferenceTable preferences={[...prefs]} setNew={setPrefs} />
        </Card>

        <Button
          variant="contained"
          onClick={handleSave}
          style={{ float: 'right' }}
          sx={{ margin: 2 }}
        >
          SAVE
        </Button>
        <Button
          variant="contained"
          onClick={handleCancel}
          style={{ float: 'right' }}
          sx={{ mt: 2, mb: 2 }}
        >
          CANCEL
        </Button>
      </Box>
    </Container>
  );
}

/**
 * @param {import('next').NextPageContext} context
 */
export async function getServerSideProps(context) {
  let preferences = [];
  let leaveDates = [];
  let shifts = [];
  var u_id = '';
  try {
    const user = await getUser(context.req);
    u_id = user._id;
    // const user = await getUser(context.req);
    await dbConnect();
    if (user.type === 'DOCTOR') {
      preferences = await Preferences.find({ doctor: user._id })
        .select('preferenceOrder')
        .populate('preferenceOrder')
        .lean();
      if (preferences.length == 0) {
        shifts = await Ward.find({ doctors: { $in: [user._id] } })
          .select('shifts')
          .populate('shifts')
          .lean();
        shifts = JSON.parse(JSON.stringify(shifts[0].shifts));
        shifts.map((pref, index) => {
          pref.rank = 0;
        });
        preferences = [...shifts];
      } else {
        preferences = JSON.parse(
          JSON.stringify(preferences[0].preferenceOrder)
        );
        // prefs = JSON.parse(JSON.stringify(prefs[0]));
        preferences.map((pref, index) => {
          pref.rank = index + 1;
        });
        preferences.sort((objA, objB) => dayjs(objA.start) - dayjs(objB.start));
      }
      leaveDates = await Preferences.find({ doctor: user._id })
        .select('leaveDates')
        // .populate('leaveDates')
        .lean();
      if (leaveDates.length != 0) {
        leaveDates = JSON.parse(JSON.stringify(leaveDates[0].leaveDates));
      }
    } else {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  } catch (err) {
    console.log(err);
  }
  return { props: { preferences, leaveDates, u_id } };
}
