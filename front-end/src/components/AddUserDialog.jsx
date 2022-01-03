import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';

const AddUserDialog = ({
  searchUserOpen,
  inviteUserOpen,
  email,
  newUser,
  honeyOrDewer,
  handleClose,
  handleChange,
  checkUser,
  handleAdd,
  handleInvite
}) =>
(
  <Dialog open={searchUserOpen || inviteUserOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
    {inviteUserOpen ? <><DialogTitle id="form-dialog-title">Invite {honeyOrDewer}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Invite {email} to be a "{honeyOrDewer}"
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleInvite} color="primary">
            Invite {honeyOrDewer}
          </Button>
        </DialogActions>
      </DialogContent>
    </> : newUser !== null ? <>
      <DialogTitle id="form-dialog-title">Add as {honeyOrDewer}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We found the following user: {newUser}
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleAdd} color='primary'>Add</Button>
        </DialogActions>
      </DialogContent>
    </> : <>
      <DialogTitle id="form-dialog-title">Add {honeyOrDewer}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To Add a {honeyOrDewer.toLowerCase()} enter their email below.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={checkUser} color="primary">
          Add {honeyOrDewer}
        </Button>
      </DialogActions>
    </>}
  </Dialog>
);

AddUserDialog.propTypes = {
  searchUserOpen: PropTypes.bool,
  inviteUserOpen: PropTypes.bool,
  honeyOrDewer: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  newUser: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  checkUser: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleInvite: PropTypes.func.isRequired
};

export { AddUserDialog };