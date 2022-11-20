import { useState } from 'react';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import { useEffect } from 'react';
import DoctorsList from '@/components/ward/doctors/doctorsList';
import AddDoctorModal from '@/components/ward/doctors/addDoctorModal';
import DeleteConfirmModal from '@/components/ward/doctors/deleteConfirmModal';
import Typography from '@mui/material/Typography';
import { Tooltip } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
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
import Head from 'next/head';

export default function View({
  doctors,
  allDoctors,
  wID,
  assignedDoctorsFinal,
  wardName,
}) {
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
      setDoctors(doctors.map((obj) => ({ ...obj })));
      setOpenAddModal(false);
    } else {
      setIsEmpty(true);
    }
  };
  const handleDelete = (index) => {
    setDeleteIndex(index);
    setOpenDeleteModal(true);
  };
  const handleDeleteConfirm = async (index) => {
    const deletedItemL = doctors.splice(index, 1);
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
    setOpenDeleteModal(false);
    setDeleteIndex(null);
  };
  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };
  useEffect(() => {
    setDoctors(doctors.map((obj) => ({ ...obj })));
  }, [doctors]);
  useEffect(() => {
    if (Doctors) {
      const filteredData = Doctors.filter((el) => {
        if (searchedText === '') {
          return el;
        } else {
          return el.name.toLowerCase().includes(searchedText);
        }
      });
      setFilteredDoctors(filteredData);
    }
  }, [searchedText, Doctors]);
  return (
    <Container sx={{ overflowY: 'hidden', minWidth: 325 }}>
      <Head>
        <title>{`Doctors | ${process.env.NEXT_PUBLIC_TITLE}`}</title>
      </Head>
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
        {wardName}
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
  let wardName = '';
  try {
    const user = await getUser(context.req);
    await dbConnect();
    allDoctors = await User.find({ type: 'DOCTOR' }).lean();
    doctorsL = await Ward.find({ _id: context.query.w_id })
      .select('doctors')
      .select('name')
      .populate('doctors')
      .lean();
    assignedDoctors = await Ward.find({}).select('doctors').lean();
    let assignedDoctorsFinal = [];
    assignedDoctors.forEach((doc) => {
      assignedDoctorsFinal.push(...JSON.parse(JSON.stringify(doc.doctors)));
    });
    doctors = doctorsL[0].doctors;
    wardName = doctorsL[0].name;
    doctors = JSON.parse(JSON.stringify(doctors));
    allDoctors = JSON.parse(JSON.stringify(allDoctors));
    const wID = context.query.w_id;
    return {
      props: { doctors, allDoctors, wID, assignedDoctorsFinal, wardName },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
}
