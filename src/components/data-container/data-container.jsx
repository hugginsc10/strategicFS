import React from 'react';
import { Button } from '@material-ui/core';
import TableData from '../table/table';
import AddDebt from '../add-debt/add-debt';

  const DataContainer = (props) => {
    return (
      <div>
       <TableData />
        <AddDebt/>
      </div>
    )
  }




export default DataContainer;
