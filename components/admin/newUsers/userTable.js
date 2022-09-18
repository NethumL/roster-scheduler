import { Key, Person } from '@mui/icons-material';
import {
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';

export default function UserTable({ users, handleEdit, handleReset }) {
  return (
    <TableContainer component={Paper} sx={{ mb: 5 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <ButtonGroup variant="contained" size="small">
                  <Tooltip title="Edit User">
                    <Button color="primary" onClick={() => handleEdit(user)}>
                      Edit <Person sx={{ ml: 1 }} />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Reset Password">
                    <Button color="warning" onClick={() => handleReset(user)}>
                      Reset <Key sx={{ ml: 1 }} />
                    </Button>
                  </Tooltip>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
