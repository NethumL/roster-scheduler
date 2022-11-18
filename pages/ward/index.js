import { useState } from 'react';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';
import WardsList from '@/components/ward/wards/wardsList';
import Search_bar from '@/components/ward/common/search_bar';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ViewWardModal from '@/components/ward/wards/viewWardModal';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { getUser } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import { send } from '@/lib/util';
import User from '@/lib/models/User';
import Ward from '@/lib/models/Ward';
export default function View({ wards, consultants, assignedConsultants }) {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [filteredWards, setFilteredWards] = useState(wards);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const mr = useMediaQuery(theme.breakpoints.down('lg')) ? 0 : 5;
  const flx = useMediaQuery(theme.breakpoints.down('sm')) ? '' : 'flex';
  const [assignedConsultants_state, setAssignedConsultants_state] =
    useState(assignedConsultants);
  const handleClickOpenViewModal = (ward, index) => {
    setSelectedWard(ward);

    setSelectedIndex(index);

    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setIsEmpty(false);
    setSelectedWard(null);
    setSelectedIndex(null);
    setOpenViewModal(false);
  };

  const handleSaveEdit = async (
    newName,
    newDescription,
    newPersonInCharge,
    newNumDutyCycles,
    newShifts,
    newMinNumDoctors,
    newMaxNumLeaves,
    newMinNumDoctorsPerShift,
    newStatusAdjacentShifts
  ) => {
    if (
      newName != '' &&
      newDescription != '' &&
      newPersonInCharge != undefined &&
      newNumDutyCycles != ''
    ) {
      var err = false;
      for (var i = 0; i < newNumDutyCycles; i++) {
        if (newShifts[i].name == '') {
          err = true;
          break;
        }
      }
      if (!err) {
        setIsEmpty(false);
        const body = {
          name: newName,
          description: newDescription,
          personInCharge: newPersonInCharge,
          shifts: newShifts,
          minNumberOfDoctors: newMinNumDoctors,
          maxNumberOfLeaves: newMaxNumLeaves,
          minNumberOfDoctorsPerShift: newMinNumDoctorsPerShift,
          allowAdjacentShifts: newStatusAdjacentShifts,
        };
        if (selectedIndex != null) {
          let arr = [...assignedConsultants_state];
          let index = assignedConsultants_state.findIndex((id) => {
            return id === wards[selectedIndex].personInCharge._id;
          });

          arr.splice(index, 1);
          arr.push(newPersonInCharge._id);
          setAssignedConsultants_state([...arr]);
          body._id = wards[selectedIndex]._id;
          try {
            const wrd = await send('PUT', '/api/ward/wards/editWard', body);
            console.log(wrd);
          } catch (error) {
            console.log(error);
          }
          console.log(wards[selectedIndex]);
          wards[selectedIndex].name = newName;
          wards[selectedIndex].description = newDescription;
          wards[selectedIndex].personInCharge = newPersonInCharge;
          wards[selectedIndex].shifts = newShifts;
          wards[selectedIndex].minNumberOfDoctors = newMinNumDoctors;
          wards[selectedIndex].maxNumberOfLeaves = newMaxNumLeaves;
          wards[selectedIndex].minNumberOfDoctorsPerShift =
            newMinNumDoctorsPerShift;
          wards[selectedIndex].allowAdjacentShifts = newStatusAdjacentShifts;

          console.log('body');
          console.log(body);
        } else {
          console.log(wards);

          console.log('body');
          console.log(body);
          var wrd = {};
          try {
            wrd = await send('POST', '/api/ward/wards/newWard', body);
            console.log('wrd');
            console.log(wrd);
            console.log(wrd.ward._id);
          } catch (error) {
            console.log(error);
          }
          // const shiftsNew = await Ward.find({ _id: wrd.ward._id })
          //   .select('shifts')
          //   .populate('shifts')
          //   .lean();
          let arr = [...assignedConsultants_state];
          arr.push(newPersonInCharge._id);
          setAssignedConsultants_state([...arr]);
          wards.push({
            _id: wrd._id,
            name: newName,
            description: newDescription,
            personInCharge: newPersonInCharge,
            shifts: newShifts,
            minNumberOfDoctors: parseInt(newMinNumDoctors),
            maxNumberOfLeaves: parseInt(newMaxNumLeaves),
            minNumberOfDoctorsPerShift: parseInt(newMinNumDoctorsPerShift),
            allowAdjacentShifts: newStatusAdjacentShifts,
          });
        }
        setSelectedWard(null);
        setSelectedIndex(null);
        setOpenViewModal(false);
      } else {
        setIsEmpty(true);
      }
    } else {
      setIsEmpty(true);
    }
  };
  const handleNewWardModal = () => {
    setOpenViewModal(true);
  };
  useEffect(() => {
    const filteredData = wards.filter((el) => {
      if (searchedText === '') {
        return el;
      }
      //return the item which contains the user input
      else {
        return el.name.toLowerCase().includes(searchedText);
      }
    });
    setFilteredWards(filteredData);
  }, [searchedText, wards.length]);
  return (
    <Container
      sx={{
        overflowY: 'hidden',
        overflowX: 'hidden',
        minWidth: 400,
        paddingLeft: 2,
      }}
    >
      <Typography
        variant="h4"
        component="div"
        sx={{
          position: 'sticky',
          top: 7,
          mb: 2,
          mt: 2,
          backgrounColor: '#ffffff',
          display: flx,
        }}
      >
        Wards
        <Search_bar
          searchedText={searchedText}
          setSearchedText={setSearchedText}
        />
        {!fullScreen && (
          <Button
            variant="contained"
            onClick={handleNewWardModal}
            sx={{
              float: 'right',
              marginLeft: '2%',
              marginRight: mr,
              height: 35,
              mt: 1,
            }}
            // sx={{ ml: 2, mr: 2 }}
          >
            New Ward
          </Button>
        )}
      </Typography>

      <WardsList wards={filteredWards} handleView={handleClickOpenViewModal} />
      {fullScreen && (
        <Tooltip title="New Ward">
          <Fab
            color="primary"
            aria-label="newWard"
            onClick={() => handleNewWardModal()}
            sx={{ position: 'fixed', color: 'primary', bottom: 20, right: 30 }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
      <ViewWardModal
        open={openViewModal}
        ward={selectedWard}
        handleClose={handleCloseViewModal}
        handleSave={handleSaveEdit}
        consultants={consultants}
        assignedConsultants={assignedConsultants_state}
        isEmpty={isEmpty}
        setIsEmpty={setIsEmpty}
      />
    </Container>
  );
}

/**
 * @param {import('next').NextPageContext} context
 */
export async function getServerSideProps(context) {
  let wards = [];
  let consultants = [];
  let assignedConsultants = [];
  try {
    const user = await getUser(context.req);
    await dbConnect();
    if (user.type === 'ADMIN') {
      consultants = await User.find({ type: 'CONSULTANT' }).lean();
      assignedConsultants = await Ward.find({})
        .select('personInCharge')
        .populate('personInCharge')
        .lean();
      wards = await Ward.find({})
        .populate('personInCharge')
        .populate('shifts')
        .lean();
    } else if (user.type === 'CONSULTANT' || user.type === 'DOCTOR') {
      return {
        redirect: {
          destination: '/ward/ownWard',
          permanent: false,
        },
      };
    }
    //   wards = await Ward.find({ consultant: user._id })
    //     .populate('consultant')
    //     .lean();
    // } else {
    //   wards = await Ward.find({ doctors: user._id })
    //     .populate('consultant')
    //     .lean();
    // }
    wards = JSON.parse(JSON.stringify(wards));
    consultants = JSON.parse(JSON.stringify(consultants));
    assignedConsultants = JSON.parse(JSON.stringify(assignedConsultants));
    assignedConsultants = assignedConsultants.map(
      (obj) => obj.personInCharge._id
    );
    console.log(wards);
    console.log(consultants);
    return { props: { wards, consultants, assignedConsultants } };
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
}
