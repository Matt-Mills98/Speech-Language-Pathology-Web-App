import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import './css/Appointments.css';
import { StylesProvider } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  
  
}));

const ITEM_HEIGHT = 48;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 ,
      width: 100,
    },
  },
};

export const MultipleSelect = (props) => {
  const [fields, setFields] = useState([{ value: null }]);


  const [AID, setAID] = useState('');
  const [PID, setPID] = useState('');
  const [Title, setTitle] = useState('');
  const [TaskCount, setTaskCount] = useState('');
  const [Date, setDate] = useState('');

  const [TID, setTID] = useState('');
  const [Description, setDescription] = useState('');
  const [Outcome, setOutcome] = useState('');
  const [Notes, setNotes] = useState('');

  const submit = e => {
    e.preventDefault();
    let apptData = {
      AID,
      PID,
      Title,
      Date
    };
    
    postCustomerAppt(apptData);

  };

  const postCustomerAppt = apptData => {
    alert("Apointment ID# "+apptData.AID+" was created");
    axios
      .post("http://localhost:9000/postAppt", apptData)
      .then(d => {
        console.log(d);
        props.history.push("/");
        window.location.reload();
        
      })
      .catch(err => console.log(err));
  };
  
  return (<StylesProvider injectFirst><div>
    <form
      onSubmit={e => {
        e.preventDefault();
        submit(e);
      }}
    >
      <div className ="formatting">
        <TextField
          className="TextField"
          id="standard-full-width"
          fullWidth
          label="Title"
          style={{ margin: 8 }}
          helperText="Enter the Appointment Title"
          margin="normal"
          value={Title}
          onChange={e =>
            setTitle(e.target.value)}
        />
    </div>
    <div className ="formatting">

        <TextField
          id="standard-full-width"
          label="AID"
          fullWidth
          style={{ margin: 8 }}
          helperText="Enter the Appointment ID"
          margin="normal"
          value={AID}
          onChange={(e) =>
            setAID(e.target.value) }
        />
      </div>
      <div className ="formatting">
        <FormControl >
          <InputLabel className = "label" id="name-label" helperText="Choose Patient">Patient Name</InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            fullWidth
            value={PID}
            onChange={(e) =>
              setPID(e.target.value)}
            input={<Input className = "label"/>}
            MenuProps={MenuProps}

          >

            {props.Data && props.Data.map((game, i) => (
              <MenuItem key={game.PID} export={game} value={game.PID} >
                {game.FirstName} {game.LastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
              </div><div className ="formatting">
        <TextField
          id="standard-full-width"
          style={{ margin: 11 }}
          helperText="Enter the Appointment Date"
          margin="normal"
          fullWidth
          className="date"
          type= "date"
          value={Date}
          onChange={e =>
            setDate(e.target.value)}
        />
      </div>
      <div>
        

        <div><Button className='CreateButton' component={Link} to ={"/Appointments"}>Back to Appointments</Button><Button className='CreateButton' type="Submit" >Add Patient </Button></div>
      </div>
    </form>

  </div>
  </StylesProvider>
  );

}
