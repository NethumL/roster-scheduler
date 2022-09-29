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
import WardsList from '@/components/ward/wards/WardsList';
import SearchModal from '@/components/ward/SearchModal';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ViewWardModal from '@/components/ward/wards/ViewWardModal';
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

export default function View({ wards, consultants }) {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const handleClickOpenViewModal = (ward, index) => {
    setSelectedWard(ward);

    setSelectedIndex(index);

    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setSelectedWard(null);
    setSelectedIndex(null);
    setOpenViewModal(false);
  };

  const handleSaveEdit = (
    newName,
    newDescription,
    newPersonInCharge,
    newNumDutyCycles,
    newShifts,
    newNumDoctors,
    newMaxNumLeaves,
    newMinNumDoctorsPerShift,
    newStatusAdjacentShifts
  ) => {
    if (selectedIndex) {
      wards[selectedIndex].name = newName;
      wards[selectedIndex].description = newDescription;
      wards[selectedIndex].personInCharge = newPersonInCharge;
      wards[selectedIndex].shifts = newShifts;
      wards[selectedIndex].numDutyCycles = newNumDutyCycles;
      wards[selectedIndex].numDoctors = newNumDoctors;
      wards[selectedIndex].maxNumLeaves = newMaxNumLeaves;
      wards[selectedIndex].minNumDoctorsPerShift = newMinNumDoctorsPerShift;
      wards[selectedIndex].statusAdjacentShifts = newStatusAdjacentShifts;
    } else {
      wards.push({
        name: newName,
        description: newDescription,
        personInCharge: newPersonInCharge,
        shifts: newShifts,
        numDutyCycles: newNumDutyCycles,
        numDoctors: newNumDoctors,
        maxNumLeaves: newMaxNumLeaves,
        minNumDoctorsPerShift: newMinNumDoctorsPerShift,
        statusAdjacentShifts: newStatusAdjacentShifts,
      });
    }
    setSelectedWard(null);
    setSelectedIndex(null);
    setOpenViewModal(false);
  };
  const handleClickViewDoctors = (ward) => {
    console.log('view doctors');
  };
  const handleNewWardModal = () => {
    setOpenViewModal(true);
  };
  return (
    <Container sx={{ overflowY: 'hidden', overflowX: 'hidden' }}>
      <Typography
        variant="h4"
        component="div"
        sx={{ position: 'sticky', top: 7, mb: 2, backgrounColor: '#ffffff' }}
      >
        Wards
        <IconButton
          edge="end"
          aria-label="newWard"
          onClick={() => setOpenSearch(true)}
          sx={{ left: 200 }}
          size="large"
        >
          <Tooltip title="Search Ward">
            <SearchIcon sx={{ color: '#1976d2' }} />
          </Tooltip>
        </IconButton>
      </Typography>

      <WardsList
        wards={wards}
        handleView={handleClickOpenViewModal}
        handleViewDoctors={handleClickViewDoctors}
      />
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
      <ViewWardModal
        open={openViewModal}
        ward={selectedWard}
        handleClose={handleCloseViewModal}
        handleSave={handleSaveEdit}
        consultants={consultants}
      />
      <SearchModal open={openSearch} handleClose={setOpenSearch} />
    </Container>
  );
}

export async function getStaticProps() {
  const consultants = [{ name: 'Mr.Deepaka' }, { name: 'Mrs.Deepika' }];
  const wards = [
    {
      name: 'ICU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',
      numDutyCycles: 3,
      shifts: [
        {
          name: 'Morning',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
        {
          name: 'Evening',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
      ],
      numDoctors: 10,
      maxNumLeaves: 8,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: true,
    },
    {
      name: 'IpU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',
      numDutyCycles: 3,
      shifts: [
        {
          name: 'Morning',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
      ],
      numDoctors: 11,
      maxNumLeaves: 5,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: false,
    },
    {
      name: 'IgU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',
      numDutyCycles: 3,
      shifts: [
        {
          name: 'Morning',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
      ],
      numDoctors: 12,
      maxNumLeaves: 7,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: true,
    },
    {
      name: 'ICU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',
      numDutyCycles: 3,
      shifts: [
        {
          name: 'Morning',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
        {
          name: 'Evening',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
      ],
      numDoctors: 10,
      maxNumLeaves: 8,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: true,
    },
    {
      name: 'IpU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',
      numDutyCycles: 3,
      shifts: [
        {
          name: 'Morning',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
      ],
      numDoctors: 11,
      maxNumLeaves: 5,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: false,
    },
    {
      name: 'IgU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',
      numDutyCycles: 3,
      shifts: [
        {
          name: 'Morning',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
      ],
      numDoctors: 12,
      maxNumLeaves: 7,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: true,
    },
    {
      name: 'ICU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',
      numDutyCycles: 3,
      shifts: [
        {
          name: 'Morning',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
        {
          name: 'Evening',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
      ],
      numDoctors: 10,
      maxNumLeaves: 8,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: true,
    },
    {
      name: 'IpU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',
      numDutyCycles: 3,
      shifts: [
        {
          name: 'Morning',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
      ],
      numDoctors: 11,
      maxNumLeaves: 5,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: false,
    },
    {
      name: 'IgU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',
      numDutyCycles: 3,
      shifts: [
        {
          name: 'Morning',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
      ],
      numDoctors: 12,
      maxNumLeaves: 7,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: true,
    },
    {
      name: 'ICU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',
      numDutyCycles: 3,
      shifts: [
        {
          name: 'Morning',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
        {
          name: 'Evening',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
      ],
      numDoctors: 10,
      maxNumLeaves: 8,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: true,
    },
    {
      name: 'IpU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',
      numDutyCycles: 3,
      shifts: [
        {
          name: 'Morning',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
      ],
      numDoctors: 11,
      maxNumLeaves: 5,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: false,
    },
    {
      name: 'IU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',
      numDutyCycles: 3,
      shifts: [
        {
          name: 'Morning',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
      ],
      numDoctors: 12,
      maxNumLeaves: 7,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: true,
    },
  ];

  return {
    props: {
      wards,
      consultants,
    },
  };
}
