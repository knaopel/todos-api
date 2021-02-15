import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { Component } from 'react'

export default class HoneyTable extends Component {
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
            <TableRow>
              <TableCell>anna@kurtopel.com</TableCell>
              <TableCell>Anna Opel</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}
