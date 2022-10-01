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
import SearchBar from '@/components/ward/common/searchBar';
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
import Button from '@mui/material/Button';
import { useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';

export default function View({ wards, consultants }) {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [filteredWards, setFilteredWards] = useState(wards);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const mr = useMediaQuery(theme.breakpoints.down('lg')) ? 0 : 5;

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
    newMinNumDoctors,
    newMaxNumLeaves,
    newMinNumDoctorsPerShift,
    newStatusAdjacentShifts
  ) => {
    if (selectedIndex != null) {
      wards[selectedIndex].name = newName;
      wards[selectedIndex].description = newDescription;
      wards[selectedIndex].personInCharge = newPersonInCharge;
      wards[selectedIndex].shifts = newShifts;
      wards[selectedIndex].minNumDoctors = newMinNumDoctors;
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
        minNumDoctors: newMinNumDoctors,
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
  }, [searchedText]);
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
          backgrounColor: '#ffffff',
        }}
      >
        Wards
        <SearchBar
          searchedText={searchedText}
          setSearchedText={setSearchedText}
        />
        {!fullScreen && (
          <Button
            variant="contained"
            onClick={handleNewWardModal}
            sx={{ float: 'right', marginBottom: 2, marginRight: mr }}
            // sx={{ ml: 2, mr: 2 }}
          >
            New Ward
          </Button>
        )}
      </Typography>

      <WardsList
        wards={filteredWards}
        handleView={handleClickOpenViewModal}
        handleViewDoctors={handleClickViewDoctors}
      />
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
      />
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
      minNumDoctors: 10,
      maxNumLeaves: 8,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: true,
    },
    {
      name: 'IpU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',

      shifts: [
        {
          name: 'Morning',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
      ],
      minNumDoctors: 11,
      maxNumLeaves: 5,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: false,
    },
    {
      name: 'IgU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',

      shifts: [
        {
          name: 'Morning',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
      ],
      minNumDoctors: 12,
      maxNumLeaves: 7,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: true,
    },
    {
      name: 'ICU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',

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
      minNumDoctors: 10,
      maxNumLeaves: 8,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: true,
    },
    {
      name: 'IpU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',

      shifts: [
        {
          name: 'Morning',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
      ],
      minNumDoctors: 11,
      maxNumLeaves: 5,
      minNumDoctorsPerShift: 2,
      statusAdjacentShifts: false,
    },
    {
      name: 'IgU',
      description: 'Intensive Care Unit',
      personInCharge: 'Mr.Deepaka',

      shifts: [
        {
          name: 'Morning',
          start: '2014-08-18T21:11:54',
          end: '2014-08-18T21:11:54',
        },
      ],
      minNumDoctors: 12,
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
