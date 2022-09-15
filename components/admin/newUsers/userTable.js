import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
                  <Button color="primary" onClick={() => handleEdit(user)}>
                    Edit User
                  </Button>
                  <Button color="warning" onClick={() => handleReset(user)}>
                    Reset Password
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
