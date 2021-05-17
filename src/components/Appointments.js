import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './css/Appointments.css';

import { Link } from 'react-router-dom';

import ReactVirtualizedTable from './VirtualizedTableAppt';
//component={Link} to={'/Appointments/CreateAppointment'
class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: [] };
  }

  componentWillMount() {
    fetch("http://localhost:9000/getAppt")
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res }));
  }
  render() {
    return (
      <div className='ApptBackground'>
        <div className='RightSpacing'>
          <Button className="CreateButton" component={Link} to={'/Appointments/CreateAppointment'}>Create Appointment</Button>

        </div>
        <ReactVirtualizedTable
          Data={this.state.apiResponse}
          rowRenderer={<Button value='Edit'>Edit</Button>}
        />

      </div>
    );

  }
}
export default Appointments;







