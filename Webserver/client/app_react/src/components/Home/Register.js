import React, { useState } from 'react';
import axios from 'axios';
//import { setUserSession } from './../../Utils/Common';

const validateRegisterInput = require('../../validation/register_validation');
    //validateLoginInput = require('../../validation/login_validation');

function Register(props) {
    const [loading, setLoading] = useState(false);
    const password = useFormInput('');
    const password2 = useFormInput('');
    const email = useFormInput('');
    const name = useFormInput('');
    const [error, setError] = useState(null);

    const handleRegister = () => {
        setError(null);
        setLoading(true);

        const { errors, isValid } = validateRegisterInput(name, email, password, password2);

        if (!isValid) {
            setLoading(false);
            setError(errors);
        }
        else {
            axios.post('http://localhost:4000/register', { name: name.value, email: email.value, password: password.value, password2: password2.value })
                .then(response => {
                    setLoading(false);
                    console.log("register response: ", response.data);
                    props.history.push('/login');
                }).catch(error => {
                    setLoading(false);
                    if (error.response.status === 401) setError(error.response.data.message);
                    else setError("Something went wrong in the registration. Please try again later");
                })
        }
    }

    return (
        <div>
            Register<br /><br />
            <div>
                Name<br />
                <input type="text" {...name} autoComplete="new-password" />
            </div>
            <div>
                Email<br />
                <input type="text" {...email} autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
                Password<br />
                <input type="password" {...password} autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
                confirm password<br />
                <input type="password" {...password2} autoComplete="new-password" />
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Register'} onClick={handleRegister} disabled={loading} /><br />
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

export default Register;