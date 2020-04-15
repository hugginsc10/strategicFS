import React, { useState, useEffect } from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";


const API_URL =
  "https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json"

const TableData = (props) => {

  const [bankData, setBankData] = useState([]);
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(bankData => setBankData(bankData))
      }, [] )
    
  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = bankData.map(n => n.id);
      setSelected(newSelecteds);
      return;
      }
      setSelected([]);
    };

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
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const isItemSelected = isSelected(bankData.creditorName);
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
        disablePadding: false,
        label: "Creditor"
      },
      {
        id: "firstName",
        numeric: true,
        disablePadding: false,
        label: "First Name"
      },
      {
        id: "lastName",
        numeric: true,
        disablePadding: false,
        label: "Last Name"
      },
      {
        id: "minPayPercent",
        numeric: true,
        disablePadding: false,
        label: "Min Pay %"
      },
      {
        id: "balance",
        numeric: true,
        disablePadding: false,
        label: "Balance"
      }
    ];
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={handleSelectAllClick}
                inputProps={{ "aria-label": "select all rows" }}
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
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell component="th"
                      id={labelId}
                      scope="row"
                      padding="none">
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
        </TableBody>
      </Table>
    </div>
  );
  }
;
export default TableData;