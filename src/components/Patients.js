import React, {Component} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import Button from '@material-ui/core/Button';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import './css/Appointments.css';
import { StylesProvider } from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import ReactVirtualizedTable from './VirtualizedTable';



class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: [] };
    
  }


  componentWillMount() {
    fetch("http://localhost:9000/testAPI",{method: 'GET'})
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res }));
  }

    render(){
  return (
    <div className = 'ApptBackground'>
    <div className='RightSpacing'>
    <Button className ="CreateButton" component={Link} to={'/Patients/CreatePatient'}>Add Patient</Button>

    </div>
    <ReactVirtualizedTable
    Data = {this.state.apiResponse}/>
    </div>
    
  );
}}
export default Patients;