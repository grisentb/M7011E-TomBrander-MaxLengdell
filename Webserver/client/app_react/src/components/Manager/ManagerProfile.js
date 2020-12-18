import React, { useState } from 'react';
import axios from 'axios';

import { getUser, removeUserSession } from '../../Utils/Common';
import ImgUploader from './../Profile/imageUploader';
import ProfileFetcher from './../Profile/readImage';
import ProfileUserLoader from './ManagerUsers';


const validateNewPasswordInput = require('../../validation/new_password_validation');


export default class ManagerProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = { users: null, user: getUser(), loading: false };

        this.tickRate = 2000;
        console.log("Entering profile");
    }
    componentDidMount() {
        this.update();
    }
    componentDidUpdate() {
        this.update();
    }

    update() {
        setTimeout(() => {

            axios.get('http://localhost:4000/manager/profile/getuser').then(response => {
                this.setState({ users: response });
            })

        }, this.tickRate);
    }
    render() {

        if (this.state.users) {
            return (
                <div>
                    <h2>Manager Profile</h2>
                    <ProfileUserLoader data={this.state.users} />
                </div>
            )
        }else{
            return <div>Loading manager profile!</div>
        }
    }
}
