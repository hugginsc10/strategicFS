import React from 'react';
import { Button } from '@material-ui/core';
import TableData from '../table/table';


  const DataContainer = () => {
    return (
      <div>
        <div className='addDebt'>
          <TableData />
          <Button variant='contained' color='primary'>
            Add Debt
          </Button>
        </div>
      </div>
    )
  }




export default DataContainer
