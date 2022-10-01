import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
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
import { Tooltip } from '@mui/material';

export default function SearchBar({ searchedText, setSearchedText }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const width = useMediaQuery(theme.breakpoints.down('md')) ? '100%' : '100%';
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 75,
    backgroundColor: '#e9f3fc',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '15%',
      width: '70%',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
    },
  }));

  return (
    <div
      sx={{ alignItems: 'center', justifyContent: 'center', float: 'center' }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          autoFocus
          fullWidth
          placeholder="Search…"
          value={searchedText}
          onChange={(e) => setSearchedText(e.target.value.toLowerCase())}
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </div>
  );
}
