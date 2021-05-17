/*import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    flexGrow: 1,
  },
});

export default function DotsMobileStepper(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };  
  const handleSubmit=()=> {
    // On submit of the form, send a POST request with the data to the  
    //  server.
    
    alert('PID:'+ this.state.AID+' has been updated');
    fetch("http://localhost:9000/updateTask/"+ this.state.AID, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Outcome: this.state.Outcome,
        Notes: this.state.Notes,
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  
  return (
  <div>
    {props.TaskData.map((e)=>(
    <form>
  <div className="div1">
    
  
  <div className='bgDiv'>
  
   
  <TextField
    id="outlined-multiline-static"
    label={props.AppData.Title}
    multiline
    fullWidth
    InputProps={{
      readOnly: true,
    }}
    rows={4}
    defaultValue={e.Description}
    variant="outlined"
  />

<FormControl component="fieldset">
      <FormLabel component="legend"></FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="Success" control={<Radio color="primary"/>} label="Success" />
        <FormControlLabel value="With Cues" control={<Radio color="primary"/>} label="With Cues" />
        <FormControlLabel value="Direct Model" control={<Radio color="primary"/>} label="Direct Model" />
        <FormControlLabel value="Failure" control={<Radio color="primary"/>} label="Failure" />
      </RadioGroup>
    </FormControl>
    
    
    <div className='notesDiv'>
        <TextField className='notes' id="outlined-basic" label="Notes" variant="outlined" multiline rows={4}/>
        <div><Button className='regButton'>Submit</Button></div>
        
    </div>
    
    </div>
    </div>
    </form>))}
    </div>

  );
}*/