import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './css/StartAppointment.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


class CreatePatient extends Component {

  constructor(props) {
    super(props);
    this.state = {
      PID: '',
      FirstName: '',
      LastName: '',
      DOB: ''
    }
  }

  handleSubmit() {
    // On submit of the form, send a POST request with the data to the  
    //  server.
    
    alert('PID:'+ this.state.PID+' has been added');
    fetch("http://localhost:9000/post", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        PID: this.state.PID,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        DOB: this.state.DOB
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }




  render() {
    return (
      <div className="FormBackground1">
        
        <div className="FormBackground2">
          <form onSubmit={() => this.handleSubmit()} >

            <div className='FormTitle'>Add Patient</div>
            <div className ="formatting">
              <TextField
                id="standard-full-width"
                label="PID"
                fullWidth
                style={{ margin: 8 }}
                helperText="Enter the Patient ID"
                margin="normal"
                onChange={e =>
                  this.setState({ PID: e.target.value })}
              />
            </div>
            <div className ="formatting">
              <TextField
                id="standard-full-width"
                label="First Name"
                fullWidth
                style={{ margin: 8 }}
                helperText="Enter the Patient's First Name"
                margin="normal"
                
                onChange={e =>
                  this.setState({ FirstName: e.target.value })}
              />
              
              </div>            
              <div className ="formatting">

              <TextField
                id="standard-full-width"
                label="Last Name"
                fullWidth
                style={{ margin: 8 }}
                helperText="Enter the Patient's Last Name"
                margin="normal"
               
                onChange={e =>
                  this.setState({ LastName: e.target.value })}
              />
            </div>   <div className ="formatting">
              <TextField
                id="standard-full-width"
                fullWidth
                style={{ margin: 8 }}
                helperText="Enter the Date of Birth of the Patient"
                type="date"
                margin="normal"
                className="date"
                onChange={e =>
                  this.setState({ DOB: e.target.value })}
              />
            
            </div>
            
            <div><Button className='CreateButton' component={Link} to ={"/Patients"}>Back</Button><Button  className='CreateButton' type="Submit" >Add Patient </Button></div>
          </form>
        </div>
      </div>
    );
  }
}
export default CreatePatient;