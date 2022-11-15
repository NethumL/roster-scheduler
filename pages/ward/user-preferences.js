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
import Alert from '@mui/material/Alert';

export default function View({
  preferences,
  leaveDates,
  u_id,
  hasWard,
  maxLeaves,
}) {
  const [value, setValue] = useState(
    new Date(
      new Date(Date.now()).getFullYear(),
      new Date(Date.now()).getMonth() + 1,
      1
    )
  );
  const [error, setError] = useState(false);
  const [isSavedLeaves, setIsSavedLeaves] = useState(false);
  const [isSavedPrefs, setIsSavedPrefs] = useState(false);
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
  const margn = useMediaQuery(theme.breakpoints.down('md')) ? 'auto' : 7;
  const bordr = useMediaQuery(theme.breakpoints.down('md'))
    ? '10px solid #e9f3fc'
    : '37px solid #e9f3fc';
  const [savedPrefs, setSavedPrefs] = useState(
    preferences.map((obj) => ({ ...obj }))
  );
  const [prefs, setPrefs] = useState(preferences.map((obj) => ({ ...obj })));
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleCancel = () => {
    setIsSavedPrefs(false);
    setPrefs(savedPrefs.map((obj) => ({ ...obj })));
  };
  const handleSave = async () => {
    const body = {
      doctor: u_id,
      preferenceOrder: prefs,
    };
    setSavedPrefs(prefs.map((obj) => ({ ...obj })));
    try {
      await send('PUT', '/api/ward/preferences/setPreference', body);
    } catch (error) {
      console.log(error);
    }
    setIsSavedPrefs(true);
  };

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
    setIsSavedLeaves(true);
  };
  const handleCancelLeaves = () => {
    setIsSavedLeaves(false);
    setLeaves([...savedLeaves]);
  };
  // useEffect(() => {
  //   setLeaves([...leaveDates]);
  // }, [leaveDates]);
  return (
    <Container>
      {hasWard && (
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
          {isSavedLeaves && (
            <Alert
              severity="success"
              sx={{ marginY: '10px' }}
              onClose={() => {
                setIsSavedLeaves(false);
              }}
            >
              Successfully saved.
            </Alert>
          )}
          <Stack
            direction={direction}
            spacing={2}
            width="100%"
            justifyContent="center"
          >
            <Card sx={{ border: bordr }}>
              <Box sx={{ margin: margn }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    // openTo="month"
                    disableHighlightToday={true}
                    value={value}
                    sx={{ margin: 5 }}
                    onChange={(newValue) => {
                      setIsSavedLeaves(false);
                      if (leaves.length != maxLeaves) {
                        if (
                          !leaves
                            .map((obj) => obj.getTime())
                            .includes(newValue['$d'].getTime())
                        ) {
                          setValue(newValue['$d']);
                          setLeaves((leaves) => [...leaves, newValue['$d']]);
                        }
                      } else {
                        setError(true);
                      }
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
            {/* )} */}
            <Card
              sx={{
                padding: 2,
                height: { height },
                border: '10px solid #e9f3fc',
                fontWeight: 'bold',
              }}
            >
              Dates:
              <LeavesList
                dates={[...leaves]}
                setNew={setLeaves}
                setIsSavedLeaves={setIsSavedLeaves}
              />
            </Card>
          </Stack>
          {error && (
            <Alert
              severity="warning"
              sx={{ marginY: '10px' }}
              onClose={() => {
                setError(false);
              }}
            >
              Maximum number of leaves can not be exceeded.
            </Alert>
          )}

          <Box sx={{ paddingTop: 1, paddingBottom: 4, mb: 2 }}>
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

          <Box sx={{ mb: 8 }}>
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
            {isSavedPrefs && (
              <Alert
                severity="success"
                sx={{ mb: 3 }}
                onClose={() => {
                  setIsSavedPrefs(false);
                }}
              >
                Successfully saved.
              </Alert>
            )}
            <Card sx={{ ml: 1, mr: 1, border: '10px solid #e9f3fc' }}>
              <PreferenceTable
                preferences={[...prefs]}
                setNew={setPrefs}
                setSavedPrefs={setIsSavedPrefs}
              />
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
  let preferences = [];
  let leaveDates = [];
  let shifts = [];
  var u_id = '';
  let hasWard = true;
  let maxLeaves = [];
  try {
    const user = await getUser(context.req);
    u_id = user._id;
    // const user = await getUser(context.req);
    await dbConnect();
    if (user.type === 'DOCTOR') {
      maxLeaves = await Ward.find({ doctors: { $in: [user._id] } })
        .select('maxNumberOfLeaves')
        .lean();

      console.log(maxLeaves);
      if (maxLeaves.length != 0) {
        maxLeaves = maxLeaves[0].maxNumberOfLeaves;
        preferences = await Preferences.find({ doctor: user._id })
          .select('preferenceOrder')
          .populate('preferenceOrder')
          .lean();
        console.log('pref', preferences);
        if (
          preferences.length != 0
            ? preferences[0].preferenceOrder.length == 0
            : true
        ) {
          console.log('hee');
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
          preferences.sort(
            (objA, objB) => dayjs(objA.start) - dayjs(objB.start)
          );
        }
        leaveDates = await Preferences.find({ doctor: user._id })
          .select('leaveDates')
          // .populate('leaveDates')
          .lean();
        if (leaveDates.length != 0) {
          leaveDates = JSON.parse(JSON.stringify(leaveDates[0].leaveDates));
        }
      } else {
        hasWard = false;
        console.log('rgoo');
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
  return { props: { preferences, leaveDates, u_id, hasWard, maxLeaves } };
}
