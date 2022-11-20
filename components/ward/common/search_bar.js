import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useMediaQuery } from '@mui/material';

export default function Search_bar({ searchedText, setSearchedText }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const width = useMediaQuery(theme.breakpoints.down('md')) ? '100%' : '100%';
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 75,
    backgroundColor: '#e9f3fc',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '5%',
      width: '68%',
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
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
    },
  }));

  return (
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
  );
}
