import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export default function UserFilters({ filter, clear, nameRef, type, setType }) {
  return (
    <Stack id="user-filters" spacing={1} sx={{ maxWidth: 400, mb: 5 }}>
      <Typography variant="h5" component="div" sx={{ mb: 0 }}>
        Filters
      </Typography>
      <TextField
        id="filter-name"
        label="Name"
        variant="standard"
        inputRef={nameRef}
      />
      <Autocomplete
        multiple
        id="filter-type"
        onChange={(event, value) => setType(value)}
        value={type}
        options={['Doctor', 'Consultant']}
        getOptionLabel={(option) => option}
        defaultValue={[]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Type"
            placeholder="Type"
          />
        )}
      />
      <Box>
        <Button variant="contained" color="primary" onClick={filter}>
          Filter
        </Button>
        <Button
          sx={{ ml: 2 }}
          variant="contained"
          color="warning"
          onClick={clear}
        >
          Clear
        </Button>
      </Box>
    </Stack>
  );
}
