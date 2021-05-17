import React, { Component, useState, useEffect } from 'react';
import './css/Appointments.css';
import {MultipleSelect} from './LongMenu';



class CreateAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse:[],
      AID: '',
      PID: '',
      Title: '',
      TaskCount: '',
      Date: ''
    }
  }
  componentWillMount() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res }));
  }

  
  render() {
    

    return (

        
        <div className="FormBackground1">
          <div className = "FormBackground2">
          <div className='FormTitle'>Create Appointment</div>
              <MultipleSelect
                Data = {this.state.apiResponse}
               />
            </div>
            </div>

    )}         
}
export default (CreateAppointment);