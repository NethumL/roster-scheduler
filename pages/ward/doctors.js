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

export default function View({ doctors, allDoctors }) {
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
  const [Doctors, setDoctors] = useState(null);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleAdd = (newName) => {
    doctors.push({
      name: newName,
    });
    setOpenAddModal(false);
  };
  const handleDelete = (index) => {
    setOpenDeleteModal(true);
    // doctors.splice(index, 1);

    // setNewDoctors(doctors.map((obj) => ({ ...obj })));
  };
  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };
  useEffect(() => {
    console.log('g');
    console.log(ward);

    // setNewDoctors(doctors.map((obj) => ({ ...obj })));
  }, [doctors]);
  return (
    <Container sx={{ overflowY: 'hidden' }}>
      <Typography
        variant="h4"
        component="div"
        sx={{ position: 'sticky', top: 7, mb: 2, backgrounColor: '#ffffff' }}
      >
        Doctors
        <IconButton
          edge="end"
          aria-label="newWard"
          // onClick={() => setOpenSearch(true)}
          sx={{ left: 200 }}
          size="large"
        >
          <Tooltip title="Search Ward">
            <SearchIcon sx={{ color: '#1976d2' }} />
          </Tooltip>
        </IconButton>
      </Typography>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '10px solid #e9f3fc',
        }}
        component="nav"
      >
        <DoctorsList doctors={doctors} handleDelete={handleDelete} />
      </List>
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
      <AddDoctorModal
        open={openAddModal}
        handleClose={handleCloseAddModal}
        handleAdd={handleAdd}
        allDoctors={allDoctors}
        doctors={doctors}
      />
      <DeleteConfirmModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
      />
    </Container>
  );
}

export async function getStaticProps() {
  const doctors = [
    { name: 'Deepaka Perera' },
    { name: 'Deepika Gimhani' },
    { name: 'Thanuj Jayasinge' },
    { name: 'Deepaka Perera' },
    { name: 'Deepika Gimhani' },
    { name: 'Thanuj Jayasinge' },
    { name: 'Deepaka Perera' },
    { name: 'Deepika Gimhani' },
    { name: 'Thanuj Jayasinge' },
    { name: 'Deepaka Perera' },
    { name: 'Deepika Gimhani' },
    { name: 'Thanuj Jayasinge' },
    { name: 'Deepaka Perera' },
    { name: 'Deepika Gimhani' },
    { name: 'Thanuj Jayasinge' },
  ];
  const allDoctors = [
    { name: 'Deepaka Perera' },
    { name: 'Deepika Gimhani' },
    { name: 'Thanuj Jayasinge' },
    { name: 'Thanuj Jayasinghe' },
  ];

  return {
    props: {
      doctors,
      allDoctors,
    },
  };
}
