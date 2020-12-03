import React from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import { getUser } from '../../Utils/Common';

const validateNewPasswordInput = require('../../validation/new_password_validation');

export default class ProfileFetcher extends React.Component {

    constructor(props) {
        super(props);
        this.state = { image: null };
        this.user = getUser();
        this.image = { image: null };

    }
    componentDidMount() {
        this.user = getUser();
        let tempUser = typeof (user) == 'string' ? this.user : this.user.email;
        console.log("tempuser:", tempUser);

        axios.get(`http://localhost:4000/user/profile?user=${tempUser}`, {}).then(data => {
            console.log("fetched from db: ", data);
            //this.image = {image: Buffer.from(response.data, 'binary').toString('base64')};
            var base64Flag = 'data:image/jpeg;base64,';
            var imageStr =
                this.arrayBufferToBase64(data.data.data);

            this.setState({ image: base64Flag + imageStr });
        })
    }
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));

        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);


    }
    // handleNewPassword(e) {
    //     console.log(this.state.oldPassword);
    //     alert(("test:" +  this.state.oldPassword));
    //     console.log(e.oldPassword);

    //     // const { errors, isValid } = validateNewPasswordInput(e.oldPassword, e.newPassword);
    //     // if (!isValid) {
    //     //     // setLoading(false);
    //     //     // setError(errors);
    //     // } else {
    //     //     axios.post('http://localhost:4000/user/newpwd', { email: this.user, oldPassword: e.oldPassword, newPassword: e.newPassword}).then(response => {
    //     //         console.log("Password changed, login with new password");
    //     //         // removeUserSession();
    //     //         // props.history.push('/login');
    //     //     }).catch(error => {
    //     //         // setLoading(false);
    //     //         // setError(error.response.data.error);
    //     //     });

    //     // }
    // }

    render() {
        const { image } = this.state
        return (
            <div>
                <h4>Profile</h4>
                <img src={image} />
            </div>
        );
    }
}


