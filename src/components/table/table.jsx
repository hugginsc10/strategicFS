import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox
}
  from "@material-ui/core/";
import { makeStyles } from '@material-ui/core/';
import AddDebt from '../add-debt/add-debt';
import './table.scss';
const API_URL =
  "https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0'
  },
  checkbox: {
    width: '90px',
    justifyContent: 'left',
  }
}))

const TableData = (props) => {
  const cssClass = useStyles();
  const [bankData, setBankData] = useState({
    creditorName: '',
    firstName: '',
    lastName: '',
    minPaymentPercentage: '',
    balance: ''
  });
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(bankData => setBankData(bankData))
  }, [])
    
  const [selected, setSelected] = React.useState([]);

  const handleChange = (prop) => (e) => {
    setBankData({...bankData, [prop]: e.target.value })
  }
  const isSelected = name => selected.indexOf(name) !== -1;
  const isItemSelected = isSelected(bankData.creditorName);
  
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = bankData.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  

    const columnHeads = [
      {
        id: "Creditor",
        numeric: false,
        disablePadding: true,
        label: "Creditor"
      },
      {
        id: "firstName",
        numeric: true,
        disablePadding: true,
        label: "First Name"
      },
      {
        id: "lastName",
        numeric: true,
        disablePadding: true,
        label: "Last Name"
      },
      {
        id: "minPayPercent",
        numeric: true,
        disablePadding: true,
        label: "Min Pay %"
      },
      {
        id: "balance",
        numeric: true,
        disablePadding: true,
        label: "Balance"
      }
    ];
  return (
    <div className={cssClass.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={handleSelectAllClick}
                inputProps={{ "aria-label": "select all rows" }}
                className={cssClass.checkbox}
              />
            </TableCell>
            {columnHeads.map(head => (
              <TableCell
                key={head.id}
                align={head.numeric ? "right" : "left"}
                padding={head.disablePadding ? "none" : "default"}
                sortDirection={orderBy === head.id ? order : false}
              >
                {head.label}
                {orderBy === head.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bankData.length > 0
            ? bankData.map((data, idx) => {
                const isItemSelected = isSelected(data.id);
                const labelId = `enhanced-table-checkbox-${idx}`;

                return (
                  <TableRow
                    hover
                    onClick={e => handleClick(e, data.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={data.id}
                    selected={isItemSelected}
                    className={cssClass.checkbox}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {data.creditorName}
                    </TableCell>
                    <TableCell align="right">{data.firstName}</TableCell>
                    <TableCell align="right">{data.lastName}</TableCell>
                    <TableCell align="right">
                      {data.minPaymentPercentage.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      ${data.balance.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })
            : []}
          
            <AddDebt
              onHandleClick={e => handleClick(e, bankData.id)}
              onHandleChange={handleChange}
            />
        
        </TableBody>
      </Table>
    </div>
  );
  }
;
export default TableData;