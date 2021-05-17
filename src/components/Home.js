import React, { Component } from 'react';
import './css/Appointments.css';
import { Switch, Route, Link } from 'react-router-dom';
import { StylesProvider } from "@material-ui/core/styles";
import Test from './Test.js';
import Button from '@material-ui/core/Button';

class Home extends Component {
  render() {
    return (
        <div className = 'FormBackground1'>
          <div className = 'FormBackground2'>
            <div className="FormTitle">Hello, Welcome to the Speech Language Pathology Web Application</div>
            <div className = 'FormBackground1'>

            <div className="FormBody">This Web Application was created in 2021 with the goal of making everyone's life easier. 
            Speech language pathologists face the challenge of attempting to entertain their patients during their appointment while recording relevant data.
            Many times, this data recording will lead to a distracted patient. The way to mitigate this issue? A Web App that can automate the process of 
            recording information! Through using this Web App, you'll find appointments will become less stressful and easier. In addition, documentation 
            following the appointment is drastically reduced.  </div>
          </div>
         
        </div>
          </div>
    );
  }
}

export default Home;