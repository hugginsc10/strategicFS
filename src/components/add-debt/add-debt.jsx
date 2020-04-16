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
    flexWrap: 'wrap',
    padding: '0'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    textAlign: 'right'
  },
  addDebtButton: {
    width: "10vw"
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
    <React.Fragment>
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
            disablePadding='true'
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
                label="Min Pmt %"
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
          variant="contained"
          color="primary"
          size="large"
          onClick={addDebtData}
          >
        Add Debt
        </Button>
    </React.Fragment>
     
  );
}

export default AddDebt;