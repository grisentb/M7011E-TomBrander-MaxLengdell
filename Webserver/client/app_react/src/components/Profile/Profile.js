import React, { useState } from 'react';
import axios from 'axios';

import { getUser, removeUserSession } from '../../Utils/Common';
import ImgUploader from './imageUploader';
import ProfileFetcher from './readImage';
const validateNewPasswordInput = require('../../validation/new_password_validation');

function Profile(props) {
    /**
     * Current profile pic
     * Email
     * 
     * change pwd
     * change pic
     * 
     * 
     */

    const user = getUser();
    const [loading, setLoading] = useState(false);
    const oldPassword = useFormInput('');
    const newPassword = useFormInput('');
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);

    let tempUser = typeof(user)=='string' ? user : user.email;

    //Handle new password input
    const handleNewPassword = () => {
        const { errors, isValid } = validateNewPasswordInput(oldPassword, newPassword);
        if (!isValid) {
            setLoading(false);
            setError(errors);
        } else {
            //axios.post('http://localhost:4000/user/newpwd', { email: user.value, oldPassword: oldPassword.value, newPassword: newPassword.value }).then(response => {
            axios.get('http://localhost:4000/user/profile', {test: "hello"}).then(response => {

                console.log("Password changed, login with new password");
                removeUserSession();
                props.history.push('/login');
            }).catch(error => {
                setLoading(false);
                setError(error.response.data.error);
            });

        }
    }
    return (
        <div>   
            <ProfileFetcher />
            <ImgUploader />

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

export default Profile;