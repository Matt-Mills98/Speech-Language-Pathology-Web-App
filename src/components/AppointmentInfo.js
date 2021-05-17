import React from 'react';
import IndividualTableAppt from './IndividualTableAppt';
import './css/tableStyles.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ReactVirtualizedTable from './VirtualizedTableTask';
import {Link} from 'react-router-dom';
import './css/Appointments.css';
import { StylesProvider } from "@material-ui/core/styles";

const ITEM_HEIGHT = 48;

const MenuProps = {
  PaperProps: {
    style: {
    },
  },
};


class  AppointmentInfo extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            apiResponse: [],
            patientData:[],
            taskData:[],


            AID : this.props.match.params.AID,
            showApptComponent: false,
            showTaskComponent: false,
            
        };
        this._onTaskButtonClick = this._onTaskButtonClick.bind(this);
        this._onApptButtonClick = this._onApptButtonClick.bind(this);
        this._onApptCancelButtonClick = this._onApptCancelButtonClick.bind(this);
        this._onTaskCancelButtonClick = this._onTaskCancelButtonClick.bind(this);


    }
    componentWillMount() {
      fetch("http://localhost:9000/getSpecAppt/" + this.state.AID,{method: 'GET'}) 
        
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res }));

      fetch("http://localhost:9000/testAPI")
      .then(res => res.json())
      .then(res => this.setState({ patientData: res }));

      fetch("http://localhost:9000/getSpecTask/"+ this.state.AID,{method: 'GET'})
      .then(res => res.json())
      .then(res => this.setState({ taskData: res }));
    }
    

    _onApptButtonClick() {
      this.setState({
        showApptComponent: true,
      });}
    _onApptCancelButtonClick() {
        this.setState({
          showApptComponent: false,
        });
      
    }
    _onTaskButtonClick() {
      this.setState({
        showTaskComponent: true,
      });}
    _onTaskCancelButtonClick() {
        this.setState({
          showTaskComponent: false,
        });
      
    }
    handleSubmitAppt() {
      // On submit of the form, send a POST request with the data to the  
      //  server.
      
      alert('PID:'+ this.state.AID+' has been updated');
      fetch("http://localhost:9000/updateAppointment/"+ this.state.AID, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          PID: this.state.PID,
          Title: this.state.Title,
          Date : this.state.Date
        })
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
    handleSubmitTask() {
      // On submit of the form, send a POST request with the data to the  
      //  server.
      
      alert('Task has been added');
      fetch("http://localhost:9000/postTask/"+ this.state.AID, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          TID: this.state.TID,
          AID: this.state.AID,
          Description: this.state.Description,
          Outcome: this.state.Outcome,
          Notes : this.state.Notes
        })
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
    
  
render(){
  return (<StylesProvider injectFirst>
    <div className = 'FormBackground1'>
      <div className='LeftFormSpacing'>
      <Button className ="CreateButton" component={Link} to={'/Start/'+this.state.AID}>Start Appointment</Button>

    
    </div>
    <div className='RightFormSpacing'>
    <Button className ="CreateButton" onClick={this._onApptButtonClick}>Edit Appointment</Button>
    </div>
        <IndividualTableAppt Data = {this.state.apiResponse}/>
        <div>
        {this.state.showApptComponent ?
              <div className="foreground">

        <div className="FormBackground2">
           <form onSubmit={() => this.handleSubmitAppt()} >

           <div className='FormTitle'>Edit Appointment</div>
           <div>
           <div className ="formatting2">

          <InputLabel className = "label2"id="name-label" ></InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"

            value={this.state.PID}
            onChange={(e) =>
              this.setState({ PID: e.target.value})}
            input={<Input className = "label2"/>}
            MenuProps={MenuProps}

          >
                      <InputLabel className = "label2"id="name-label" ></InputLabel>

            {this.state.patientData && this.state.patientData.map((game, i) => (
              <MenuItem key={game.PID} export={game} value={game.PID} >
                {game.FirstName} {game.LastName}
              </MenuItem>
            ))}
          </Select>
          </div>
             <TextField
               id="standard-full-width"
               label="Title"
               style={{ margin: 8 }}
               helperText="Enter the Appointment Title"
               margin="normal"
               value = {this.state.Title}
               onChange={e =>
                 this.setState({ Title: e.target.value })}
             />
             
           
           
             
           
             <TextField
               id="standard-full-width"
               label="Date"
               style={{ margin: 8 }}
               placeholder="MM/DD/YYYY"
               helperText="Enter the Date of the Appointment"
               margin="normal"
               value = {this.state.Date}
               onChange={e =>
                 this.setState({ Date: e.target.value })}
             />

           </div>
           
           <div><Button className='CreateButton' onClick={this._onApptCancelButtonClick}>Cancel</Button><Button  className='CreateButton' type="Submit" >Submit Edits </Button></div>
         </form>
         </div>
         </div> :
           null
        }

        <div className='TaskFormSpacing'>
    <Button className ="CreateButton" onClick={this._onTaskButtonClick}>Add Tasks</Button>
    </div>
      <ReactVirtualizedTable Data= {this.state.taskData}/>
      </div>
      
      <div>
        {this.state.showTaskComponent ?
        <div className="FormBackground2">

        
           <form onSubmit={() => this.handleSubmitTask()} >

           <div className='FormTitle'>Add Tasks</div>
           <div>
           <TextField
               id="standard-full-width"
               label="Enter Task ID"
               style={{ margin: 8 }}
               helperText="Enter the Task ID"
               margin="normal"
               value = {this.state.TID}
               onChange={e =>
                 this.setState({ TID: e.target.value, Notes: "TBD", Outcome: "TBD" })}         
                     />
             <TextField
               id="standard-full-width"
               label="Description"
               style={{ margin: 8 }}
               helperText="Enter Task Description"
               margin="normal"
               value = {this.state.Description}
               onChange={e =>
                 this.setState({ Description: e.target.value })}
             />
             
           
           
             
           </div>
           
           <div><Button className='CreateButton'onClick={this._onTaskCancelButtonClick}>Cancel</Button><Button  className='CreateButton' type="Submit" >Submit Task </Button></div>
         </form>
         
         </div> :
           null
        }
        </div>
      </div>
      </StylesProvider>
  );
}
}
export default AppointmentInfo;