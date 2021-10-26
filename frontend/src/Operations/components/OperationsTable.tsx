import React, { PureComponent } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { Operation } from "../interfaces/Operations";

interface OperationTableProps {
  operations: Operation[];
}

export default class OperationTable extends PureComponent<
  OperationTableProps,
  {}
> {
  render() {
    const { operations } = this.props;

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {operations.map((operation: Operation) => (
              <TableRow
                key={operation.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {operation.name}
                </TableCell>
                <TableCell align="right">{operation.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
