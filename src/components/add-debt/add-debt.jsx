import React, { useState } from 'react';
import {
  Button,
  TableBody,
  Table,
  TableCell,
  TableRow,
  Checkbox,
  TextField,
  Input,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    width: '25ch',
  }
}))
const AddDebt = ({
  onHandleChange,
  isItemSelected,
  isSelected,
  onHandleClick
}) => {
  const classes = useStyles();

  const blankForm = {
    creditorName: '',
    firstName: '',
    lastName: '',
    minPaymentPercentage: '',
    balance: ''
  };

  const [newData, setNewData] = useState([
    { ...blankForm }
  ]);

  const addDebtData = () => {
    setNewData([...newData, {...blankForm}])
  }


  return (
    <div className={classes.root}>
      {newData.map((data, idx) => {
        const labelId = `enhanced-table-checkbox-${idx}`;
        return (
          <TableRow
            hover
            onClick={onHandleClick}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={data.id}
            selected={isItemSelected}
          >
            <TableCell padding="checkbox">
              <Checkbox
                checked={isItemSelected}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
              <TextField
                id="standard-secondary"
                label="Creditor Name"
                className={classes.textField}
                value={blankForm.creditorName}
                onChange={onHandleChange}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                id="standard-secondary"
                label="First Name"
                className={classes.textField}
                value={blankForm.firstName}
                onChange={onHandleChange}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                id="standard-secondary"
                label="Last Name"
                className={classes.textField}
                value={blankForm.lastName}
                onChange={onHandleChange}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                id="standard-secondary"
                label="Min Pmt Percentage"
                className={classes.textField}
                value={blankForm.minPaymentPercentage}
                onChange={onHandleChange}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                id="standard-secondary"
                label="Balance"
                className={classes.textField}
                value={blankForm.balance}
                onChange={onHandleChange}
              />
            </TableCell>
          </TableRow>
        );
        })}
    <Button
      variant='contained'
      color='primary'
      size='small'
      onClick={addDebtData}>
        Add Debt
      </Button>
    </div>
  )
}

export default AddDebt;