import { useState } from 'react';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import { useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GroupIcon from '@mui/icons-material/Group';
import DoctorsList from '@/components/ward/doctors/doctorsList';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AddDoctorModal from '@/components/ward/doctors/addDoctorModal';
import DeleteConfirmModal from '@/components/ward/doctors/deleteConfirmModal';
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
import { getUser } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import { send } from '@/lib/util';
import User from '@/lib/models/User';
import Ward from '@/lib/models/Ward';
export default function View({
  doctors,
  allDoctors,
  wID,
  assignedDoctorsFinal,
}) {
  // const router = useRouter();
  // const data = router.query;
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
  const [assignedDoctors_state, setAssignedDoctors_state] =
    useState(assignedDoctorsFinal);
  const [Doctors, setDoctors] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleCloseAddModal = () => {
    setIsEmpty(false);
    setOpenAddModal(false);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleAdd = async (newDoctor) => {
    if (newDoctor != undefined && newDoctor._id != undefined) {
      setIsEmpty(false);
      const body = {
        _id: wID,
        doctor: newDoctor._id,
      };
      try {
        await send('PUT', '/api/ward/doctors/addDoctor', body);
      } catch (error) {
        console.log(error);
      }
      let arr = [...assignedDoctors_state];

      arr.push(newDoctor._id);
      setAssignedDoctors_state([...arr]);
      doctors.push(newDoctor);
      console.log(doctors);
      setDoctors(doctors.map((obj) => ({ ...obj })));
      setOpenAddModal(false);
    } else {
      setIsEmpty(true);
    }
  };
  const handleDelete = (index) => {
    console.log('handleDelete');
    console.log(index);
    setDeleteIndex(index);
    setOpenDeleteModal(true);
    // doctors.splice(index, 1);
  };
  const handleDeleteConfirm = async (index) => {
    const deletedItemL = doctors.splice(index, 1);
    console.log('deletedItems');
    console.log(deletedItemL);
    const body = {
      _id: wID,
      doctor: deletedItemL[0]._id,
    };
    try {
      await send('PUT', '/api/ward/doctors/deleteDoctor', body);
    } catch (error) {
      console.log(error);
    }
    let arr = [...assignedDoctors_state];
    let indx = assignedDoctors_state.findIndex((id) => {
      return id === deletedItemL[0]._id;
    });

    arr.splice(indx, 1);
    setAssignedDoctors_state([...arr]);
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
      // console.log(filteredDoctors);
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
        assignedDoctors={assignedDoctors_state}
        isEmpty={isEmpty}
        setIsEmpty={setIsEmpty}
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

export async function getServerSideProps(context) {
  let doctorsL = [];
  let doctors = [];
  let allDoctors = [];
  let assignedDoctors = [];
  // const { data } = context.query;
  // console.log(context.query.data);
  try {
    const user = await getUser(context.req);
    await dbConnect();
    allDoctors = await User.find({ type: 'DOCTOR' }).lean();
    doctorsL = await Ward.find({ _id: context.query.w_id })
      .select('doctors')
      .populate('doctors')
      .lean();
    assignedDoctors = await Ward.find({}).select('doctors').lean();
    let assignedDoctorsFinal = [];
    assignedDoctors.forEach((doc) => {
      assignedDoctorsFinal.push(...JSON.parse(JSON.stringify(doc.doctors)));
    });
    console.log('assignedDoctors');
    console.log('assignedDoctors', assignedDoctorsFinal);
    doctors = doctorsL[0].doctors;
    doctors = JSON.parse(JSON.stringify(doctors));
    allDoctors = JSON.parse(JSON.stringify(allDoctors));
    console.log(doctors);
    const wID = context.query.w_id;
    return { props: { doctors, allDoctors, wID, assignedDoctorsFinal } };
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
}
