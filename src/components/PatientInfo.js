import React from 'react';
import IndividualTable from './IndividualTable'
import './css/tableStyles.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class  PatientInfo extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            apiResponse: [],
            PID : this.props.match.params.PID,
            showComponent: false,
            
        };
        this._onButtonClick = this._onButtonClick.bind(this);
        this._onCancelButtonClick = this._onCancelButtonClick.bind(this);

    }
    componentWillMount() {
        fetch("http://localhost:9000/getSpecUser/" + this.state.PID,{method: 'GET'}) 
        
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res }));
    }
    _onButtonClick() {
      this.setState({
        showComponent: true,
      });
    }
    _onCancelButtonClick() {
      this.setState({
        showComponent: false,
      });
    }
    handleSubmit() {
      // On submit of the form, send a POST request with the data to the  
      //  server.
      
      alert('PID:'+ this.state.PID+' has been updated');
      fetch("http://localhost:9000/updatePatient/"+ this.state.PID, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
          DOB: this.state.DOB
        })
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  
  
render(){
  return (
    <div className = 'FormBackground1'>
    <div className='RightFormSpacing'>
    <Button className ="CreateButton" onClick={this._onButtonClick}>Edit Patient</Button>
    </div>
        <IndividualTable Data = {this.state.apiResponse}/>
        <div>
        {this.state.showComponent ?
              

        <div className="FormBackground2">
           <form onSubmit={() => this.handleSubmit()} >

           <div className='FormTitle'>Edit Patient</div>
           <div>
             
             <TextField
               id="standard-full-width"
               label="First Name"
               style={{ margin: 8 }}
               helperText="Enter the Patient's First Name"
               margin="normal"
               value = {this.state.FirstName}
               onChange={e =>
                 this.setState({ FirstName: e.target.value })}
             />
             
           
           
             <TextField
               id="standard-full-width"
               label="Last Name"
               style={{ margin: 8 }}
               helperText="Enter the Patient's Last Name"
               margin="normal"
               value = {this.state.LastName}
               onChange={e =>
                 this.setState({ LastName: e.target.value })}
             />
          
           
             <TextField
               id="standard-full-width"
               label="Date of Birth"
               style={{ margin: 8 }}
               placeholder="MM/DD/YYYY"
               helperText="Enter the DOB of the Patient"
               margin="normal"
               value = {this.state.DOB}
               onChange={e =>
                 this.setState({ DOB: e.target.value })}
             />

           </div>
           
           <div><Button className='CreateButton' onClick={this._onCancelButtonClick}>Cancel</Button><Button  className='CreateButton' type="Submit" >Submit Edits </Button></div>
         </form>
         </div>
          :
           null
        }
      </div>
        
        </div>
      
  );
}
}
export default PatientInfo;