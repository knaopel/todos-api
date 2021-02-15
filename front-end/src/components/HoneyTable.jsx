import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField } from '@material-ui/core'
import axios from 'axios';
import React, { Component } from 'react';

const API_URI = 'http://localhost:5000';

export default class HoneyTable extends Component {

  constructor(props) {
    super(props)

    this.authToken = props.authToken
    this.state = {
      addHoneyDialogOpen: false,
      honeyEmail: '',
      uiLoading: false,
      following: []
    }
  }

  componentDidMount() {
    axios.defaults.headers.common = { Authorization: `${this.authToken}` }
    axios
      .get(`${API_URI}/user/following`)
      .then(resp => {
        console.log(resp.data);
        this.setState({ following: resp.data });
      })
  }

  handleClickAddHoneyDialogOpen = () => {
    this.setState({ addHoneyDialogOpen: true });
  }

  handleAddHoneyDialogClose = event => {
    this.setState({ addHoneyDialogOpen: false });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAddHoney = event => {
    const postData = {
      email: this.state.honeyEmail
    };
    axios
      .post(`${API_URI}/user/userexists`, postData)
      .then(resp => {
        if (resp.data.exists) {
          
        }
      })
    // update the following for the user
    // close the dialog
    this.handleAddHoneyDialogClose();
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.following.length > 0 ?
              this.state.following.map(f => (
                <TableRow key={f.id}>
                  <TableCell>{f.email}</TableCell>
                  <TableCell>{f.name}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell rowSpan={2}>No Honeys on record. Add one below.</TableCell>
                </TableRow>
              )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell rowSpan={2}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.handleClickAddHoneyDialogOpen}
                >Add Honey</Button>
                <Dialog open={this.state.addHoneyDialogOpen} onClose={this.handleAddHoneyDialogClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Add Honey</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To Add a honey enter their email below.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="honeyEmail"
                      name="honeyEmail"
                      label="Email Address"
                      type="email"
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleAddHoneyDialogClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleAddHoney} color="primary">
                      Add Honey
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    )
  }
}
