import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow
} from '@mui/material';
import { AddUserDialog } from '.';


const UserTable = ({
  users,
  user,
  email,
  newUser,
  handleChange,
  checkUser,
  handleAdd,
  handleInvite,
  honeyOrDewer,
  searchUserOpen,
  inviteUserOpen,
  toggleDialog,
}) => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users && users.length > 0 ?
          users.map(f => (
            <TableRow key={f.id}>
              <TableCell>{f.email}</TableCell>
              <TableCell>{f.name}</TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell rowSpan={2}>No {honeyOrDewer}s on record. Add one below.</TableCell>
            </TableRow>
          )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell rowSpan={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={toggleDialog}
            >Add {honeyOrDewer}</Button>
            <AddUserDialog
              honeyOrDewer={honeyOrDewer}
              searchUserOpen={searchUserOpen}
              inviteUserOpen={inviteUserOpen}
              email={email}
              newUser={newUser}
              handleClose={toggleDialog}
              handleChange={handleChange}
              checkUser={checkUser}
              handleAdd={handleAdd}
              handleInvite={handleInvite}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </TableContainer>
);

UserTable.propTypes = {
  users: PropTypes.array,
  user: PropTypes.object,
  email: PropTypes.string.isRequired,
  newUser: PropTypes.string,
  honeyOrDewer: PropTypes.string.isRequired,
  searchUserOpen: PropTypes.bool.isRequired,
  inviteUserOpen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  checkUser: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleInvite: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
};
export { UserTable };