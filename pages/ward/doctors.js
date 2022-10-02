import { useState } from 'react';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import { useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GroupIcon from '@mui/icons-material/Group';
import DoctorsList from '@/components/ward/doctors/DoctorsList';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AddDoctorModal from '@/components/ward/doctors/AddDoctorModal';
import DeleteConfirmModal from '@/components/ward/doctors/DeleteConfirmModal';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import Search_bar from '@/components/ward/common/search_bar';
import Button from '@mui/material/Button';

export default function View({ doctors, allDoctors }) {
  const theme = useTheme();
  const border = useMediaQuery(theme.breakpoints.down('sm'))
    ? ''
    : '10px solid #e9f3fc';
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const flx = useMediaQuery(theme.breakpoints.down('sm')) ? '' : 'flex';
  const router = useRouter();
  const {
    query: { ward },
  } = router;
  const props = { ward };
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [deleteIndex, setDeleteIndex] = useState(null);
  //***
  const [Doctors, setDoctors] = useState(null);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleAdd = (newName) => {
    doctors.push({
      _id: doctors.length,
      name: newName,
    });
    setDoctors(doctors.map((obj) => ({ ...obj })));
    setOpenAddModal(false);
  };
  const handleDelete = (index) => {
    console.log('handleDelete');
    console.log(index);
    setDeleteIndex(index);
    setOpenDeleteModal(true);
    // doctors.splice(index, 1);
  };
  const handleDeleteConfirm = (index) => {
    doctors.splice(index, 1);
    setDoctors(doctors.map((obj) => ({ ...obj })));
    console.log(doctors);
    setOpenDeleteModal(false);
    setDeleteIndex(null);
  };
  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };
  useEffect(() => {
    console.log('g');
    console.log(ward);
    //***
    setDoctors(doctors.map((obj) => ({ ...obj })));
  }, [doctors]);
  useEffect(() => {
    if (Doctors) {
      const filteredData = Doctors.filter((el) => {
        if (searchedText === '') {
          return el;
        }
        //return the item which contains the user input
        else {
          return el.name.toLowerCase().includes(searchedText);
        }
      });
      setFilteredDoctors(filteredData);
      console.log(filteredDoctors);
    }
  }, [searchedText, Doctors]);
  return (
    <Container sx={{ overflowY: 'hidden', minWidth: 325 }}>
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
        Doctors
        <Search_bar
          searchedText={searchedText}
          setSearchedText={setSearchedText}
        />
        {!fullScreen && (
          <Button
            variant="contained"
            onClick={handleOpenAddModal}
            sx={{
              float: 'right',
              marginLeft: '3%',
              // marginRight: mr,
              height: 35,
              mt: 1,
            }}
          >
            Add
          </Button>
        )}
      </Typography>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          height: '80vh',
          overflowY: 'auto',
          border: { border },
        }}
        component="nav"
      >
        <DoctorsList doctors={filteredDoctors} handleDelete={handleDelete} />
      </List>
      {fullScreen && (
        <Tooltip title="Add Doctor">
          <Fab
            color="primary"
            aria-label="addDoctor"
            onClick={() => handleOpenAddModal()}
            sx={{ position: 'fixed', color: 'primary', bottom: 20, right: 30 }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
      <AddDoctorModal
        open={openAddModal}
        handleClose={handleCloseAddModal}
        handleAdd={handleAdd}
        allDoctors={allDoctors}
        doctors={doctors}
      />
      <DeleteConfirmModal
        open={openDeleteModal}
        index={deleteIndex}
        handleClose={handleCloseDeleteModal}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </Container>
  );
}

export async function getStaticProps() {
  const doctors = [
    { _id: '1', name: 'Deepaka Perera' },
    { _id: '2', name: 'Deepika Gimhani' },
    { _id: '3', name: 'Thanuj Jayasinge' },
    { _id: '4', name: 'Deepaka Perera' },
    { _id: '5', name: 'Deepika Gimhani' },
    { _id: '6', name: 'Thanuj Jayasinge' },
    { _id: '7', name: 'Deepaka Perera' },
    { _id: '8', name: 'Deepika Gimhani' },
    { _id: '9', name: 'Thanuj Jayasinge' },
    { _id: '10', name: 'Deepaka Perera' },
  ];
  const allDoctors = [
    { _id: '1', name: 'Deepaka Perera' },
    { _id: '2', name: 'Deepika Gimhani' },
    { _id: '3', name: 'Thanuj Jayasinge' },
    { _id: '4', name: 'Thanuj Jayasinghe' },
  ];

  return {
    props: {
      doctors,
      allDoctors,
    },
  };
}
