import React, { useState } from 'react';
import axios from 'axios';

import { getUser, removeUserSession } from '../../Utils/Common';
import ImgUploader from './imageUploader';
import ProfileFetcher from './readImage';
const validateNewPasswordInput = require('../../validation/new_password_validation');

function Profile(props) {

    const user = getUser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);

    let tempUser = typeof(user)=='string' ? user : user.email;

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