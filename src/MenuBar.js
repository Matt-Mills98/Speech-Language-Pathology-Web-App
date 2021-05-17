
import React, { useState,useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Appointments from './components/Appointments';
import Patients from './components/Patients';
import Login from './Login';
import Test from './components/Test';
import Profile from './components/Profile';
import CreateAppointment from './components/CreateAppointment';
import CreatePatient from './components/CreatePatient';
import { StylesProvider } from "@material-ui/core/styles";
import './MenuBar.css';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import PatientInfo from './components/PatientInfo';
import ApptInfo from './components/AppointmentInfo';
import StartAppointment from './components/StartAppointment';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';  
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#228df2',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#FFFFFF',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
const StyledToggleButton = withStyles({
  root: {
    fontFamily: 'Arial',
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    '&$selected': {
      backgroundColor: '#FFFFFF',
      color: 'rgb(70, 107, 230)',
      '&:hover': {
        backgroundColor: '#FFFFFF',
        color: 'rgb(26, 88, 159)',
      },
    },
  },
  selected: {},
})(ToggleButton);

function MenuBar() {

  const [authLoading, setAuthLoading] = useState(true);
  const [alignment, setAlignment] = React.useState('left');
  const [formats, setFormats] = React.useState(() => ['phone']);
  const handleFormat = (event, newFormats) => {
    if (newFormats.length) {
      setFormats(newFormats);
    }
  };
  
const handleAlignment = (event, newAlignment) => {
  if (newAlignment !== null) {
    setAlignment(newAlignment);
  }
};

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    
    axios.get(`http://localhost:9000/Auth/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }
  


    return (
      
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
        <Router className='route'>
          <div class='MenuBarBackground'>
            <div id= "inner" class='MenuBackground'>
              <div class='LeftMenu'>
              
                <ToggleButtonGroup className="MenuGroup"
                  size="small"
                  exclusive
                  value={alignment}
                  onChange={handleAlignment}
                  aria-label="text alignment"
                >                   
                <StyledToggleButton className='MenuButton' value = "home" activeClassName="active" component={Link} to={'/'}>Home</StyledToggleButton>
                  <StyledToggleButton className='MenuButton' value = "appt" activeClassName="active" component={Link} to={'/Appointments'}>Appointments</StyledToggleButton>
                  <StyledToggleButton className='MenuButton' value = "patient" activeClassName="active" component={Link} to={'/Patients'}>Patients</StyledToggleButton>
                </ToggleButtonGroup>
                </div>
              
              <div class='RightMenu'>
                <IconButton  component={Link} to={'/Profile'}><AccountCircleIcon color='secondary' fontSize = "large" /></IconButton>
              </div>
            </div>
            <Switch>
            <Route exact path="/" component={Home} />
              <PrivateRoute path='/Profile' component={Profile} />
              <PrivateRoute path='/Appointments/CreateAppointment' component={CreateAppointment} />
              <PrivateRoute path='/Patients/CreatePatient' component={CreatePatient} />
              <PrivateRoute path='/Appointments' component={Appointments} />
              <PrivateRoute path='/Patients' component={Patients} />
              <PublicRoute path='/Login' component={Login} />
              <PrivateRoute path='/Test' component={Test} />
             
              <PrivateRoute path ='/PatientInfo/:PID' component={PatientInfo}/>
              <PrivateRoute path ='/AppointmentInfo/:AID' component={ApptInfo}/>
              <PrivateRoute path ='/Start/:AID' component={StartAppointment}/>


              
            </Switch>
          </div>
        </Router>
        </ThemeProvider>
      </StylesProvider>
    );
  }


export default MenuBar;
