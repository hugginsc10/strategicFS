import React, { Component } from 'react'
import CustomButton from '../custom-button/custom-button';


class DataContainer extends Component {
  state = {
    bankInfo: []
  }
  componentDidMount() {
    fetch('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')
      .then(res => res.json())
      .then((data) => {
        this.setState({ bankInfo: data })
        console.log(this.state.bankInfo)
      })
    .catch(console.log)
  }
  render() {
    return (
      <div>
        DataContainer
        <div className='addDebt'>
          <CustomButton/>
        </div>
      </div>
    )
  }
}

export default DataContainer
