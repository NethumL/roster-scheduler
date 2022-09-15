import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export default function NewUsersFilters({ filter, clear }) {
  return (
    <Stack id="new-users-filters" spacing={1} sx={{ maxWidth: 400, mb: 3 }}>
      <Typography variant="h5" component="div" sx={{ mb: 0 }}>
        Filters
      </Typography>
      <TextField id="filter-name" label="Name" variant="standard" />
      <Autocomplete
        multiple
        id="filter-type"
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
      <span>
        <Button variant="contained" color="primary" onClick={() => {}}>
          Filter
        </Button>
      </span>
    </Stack>
  );
}
