import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './../../Utils/Common';

const validateLoginInput = require('../../validation/login_validation');

function Login(props) {
  const [loading, setLoading] = useState(false);
  const password = useFormInput('');
  const email = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);

    //Validate login values. 

    const { errors, isValid } = validateLoginInput(email, password);

    if (!isValid) {
      alert("Faulty input");
      setLoading(false);
      //setError(errors);
    }

    else {
      //Hash password: 
      axios.post('http://localhost:4000/login', { email: email.value, password: password.value }).then(response => {
        //setLoading(false);
        console.log("Role: ", response.data.role);
        var role = response.data.role;
        setUserSession(response.data.token, response.data.email, response.data.role);
        setLoading(false)
        console.log(props);
        //Check if manager or not
        if(role){
          console.log("admin logged in");
          props.history.push('/manager_dashboard');
        }else {
          props.history.push('/dashboard');
        }
      }).catch(error => {
        setLoading(false);
        setError(error.response.data.error);
      });
    }
  }

  return (
    <div>
      Login<br /><br />
      <div>
        Email<br />
        <input type="text" {...email} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
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