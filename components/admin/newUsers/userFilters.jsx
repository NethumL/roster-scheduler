import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export default function UserFilters({
  filter,
  clear,
  nameRef,
  unameRef,
  type,
  setType,
}) {
  return (
    <Accordion sx={{ mb: 5 }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ my: 0, py: 0 }}
      >
        <Typography variant="h5">Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack id="user-filters" spacing={1} sx={{ p: 2 }}>
          <TextField
            id="filter-name"
            label="Name"
            variant="standard"
            inputRef={nameRef}
            sx={{ maxWidth: '400px' }}
          />
          <TextField
            id="filter-uname"
            label="Username"
            variant="standard"
            inputRef={unameRef}
            sx={{ maxWidth: '400px' }}
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
            sx={{ maxWidth: '400px' }}
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
      </AccordionDetails>
    </Accordion>
  );
}
