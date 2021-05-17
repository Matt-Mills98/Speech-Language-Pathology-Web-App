import React from 'react';
import './css/tableStyles.css';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import './css/Appointments.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100ch',
        },
    },
}));

class StartAppointment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            apiResponse: [],
            taskData: [],
            outcomes: [],
            notes: [],
            tid:[],
            Outcome :'',
            Notes:'',
            TID: '',

            AID: this.props.match.params.AID,
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentWillMount() {
        fetch("http://localhost:9000/getSpecAppt/" + this.state.AID, { method: 'GET' })

            .then(res => res.json())
            .then(res => this.setState({ apiResponse: res }));

        fetch("http://localhost:9000/getSpecTask/" + this.state.AID, { method: 'GET' })
            .then(res => res.json())
            .then(res => this.setState({ taskData: res }));

    }
    createUI() {

        return this.state.taskData.map((el, i) =>
            <div className ="FormBackground1" key={i}>
                <div className ="FormBackground2">
                <div className="FormTitle">Task {i+1}</div>
                <TextField
                    id="outlined-multiline-static"
                    label={el.TID}
                    multiline
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                    rows={4}
                    defaultValue={el.Description}
                    variant="outlined"
                />
                <FormControl component="fieldset">
                    <FormLabel component="legend"></FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" onChange={this.handleOutcomesChange.bind(this, i)}>
                        <FormControlLabel value="Success" control={<Radio color="primary" />} label="Success" />
                        <FormControlLabel value="With Cues" control={<Radio color="primary" />} label="With Cues" />
                        <FormControlLabel value="Direct Model" control={<Radio color="primary" />} label="Direct Model" />
                        <FormControlLabel value="Failure" control={<Radio color="primary" />} label="Failure" />
                    </RadioGroup>
                </FormControl>

                <div className='notesDiv'>
                    <TextField fullWidth onChange={this.handleNotesChange.bind(this, i)} className='notes' id="outlined-basic" label="Notes" variant="outlined" multiline rows={4} />
                </div>
            </div></div>

        )
    }

    handleOutcomesChange(i, event) {
        let outcomes = [...this.state.outcomes];
        outcomes[i] = event.target.value;
        this.setState({ outcomes });
    }
    
    handleNotesChange(i, event) {
        let notes = [...this.state.notes];
        notes[i] = event.target.value;
        this.setState({ notes });
    }



    handleSubmit(event) {
       

        alert("Appointment has been recorded");
        for (var i = 0; i < this.state.taskData.length; i++) {
            
            fetch("http://localhost:9000/updateTask/" + this.state.taskData[i].TID, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Outcome: this.state.outcomes[i],
                    Notes: this.state.notes[i]
                })
                
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err));
        }

        
        this.props.history.push('/AppointmentInfo/'+this.state.AID);
    }
    render() {

        return (
            <div className="FormBackground1">
                <div className='FormBackground2'>
                    <form onSubmit={this.handleSubmit}>
                        {this.createUI()}
                        <Button type="Submit" value="Submit" className = "CreateButton">Submit</Button>
                        <Button component ={Link} to={"/AppointmentInfo/"+this.state.AID} className = "CreateButton">Cancel</Button>

                    </form>
                </div>
            </div>
        );
    }
}
export default StartAppointment;