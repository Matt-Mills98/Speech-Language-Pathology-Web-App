import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './components/css/Appointments.css';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  //fetch('http://localhost:9000/Auth/info');

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:9000/Auth/users/signin', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/Patients');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div className="FormBackground1">
      <div className="FormBackground2">
      <div className="FormTitle">
      Login<br /><br /></div>
      <div className="FormBody">
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div className = "FormBody" style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;