import React from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import { getUser } from './../../Utils/Common';


class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = { image: '', name: '' };
        this.user = getUser();
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onSubmit(e){
        const tempUser = getUser();
        console.log(tempUser);
        const formData = new FormData();
        formData.append('image', this.state.image);
        axios.post(`http://localhost:4000/user/uploadImg?user=${tempUser.email}`, formData).then(res => {
            console.log(res);
        })

    }
    onFileChange(e) {


        this.setState({image: e.target.files[0]})
    }

    render() {
        return (
            <div>
             <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
            </div>
        );
    }
}
export default Profile;



// import React, {useState} from 'react';
// import axios from 'axios';
// import ImageUploader from 'react-images-upload';
// import {getUser, removeUserSession} from './../../Utils/Common';
// //import imgUploader from './imageUploader';

// const validateNewPasswordInput = require('../../validation/new_password_validation');

// class Profile extends React.Component {
//     const [loading, setLoading] = useState(false);
//     const oldPassword = useFormInput('');
//     const newPassword = useFormInput('');
//     const [error, setError] = useState(null);
//     const [picture, setPicture] = useState(false);
//     //Get image

//     let tempUser = typeof(user)=='string' ? user : user.email;
//     constructor(props) {
//         super
//         const user = getUser();

//     }


//     //Handle image upload

//     handleImageUpload ({pictureFile}) {
//         const file = files[0];

//         setPicture(URL.createObjectURL(pictureFile.target.files[0]));
//         console.log(picture);
//         axios.post('http://localhost:4000/user/uploadImg', picture).then(response => {
//             setLoading(false);
//         }).catch(error => {
//             setLoading(false);
//             setError(error.response.data.error);

//         });
//     }



//     //Handle new password input
//     handleNewPassword () {
//         const { errors, isValid } = validateNewPasswordInput(oldPassword, newPassword);
//         if (!isValid) {
//             setLoading(false);
//             setError(errors);
//         } else {
//             axios.post('http://localhost:4000/user/newpwd', { email: user.value, oldPassword: oldPassword.value, newPassword: newPassword.value }).then(response => {

//                 console.log("Password changed, login with new password");
//                 removeUserSession();
//                 props.history.push('/login');
//             }).catch(error => {
//                 setLoading(false);
//                 setError(error.response.data.error);
//             });

//         }
//     }
//     render() {
//         return (
//             <div>
//                 Profile<br /><br />
//                 <div>
//                     Email: {user.email}
//                 </div>
//                 <div>
//                     Old password<br />
//                     <input type="password" {...oldPassword} autoComplete="new-password" />
//                 </div>
//                 <div style={{ marginTop: 10 }}>
//                     New password<br />
//                     <input type="password" {...newPassword} autoComplete="new-password" />
//                 </div>
//                 {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
//                 <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleNewPassword} disabled={loading} /><br />
//             </div>
//         );
//     }
// }
// const useFormInput = initialValue => {
//     const [value, setValue] = useState(initialValue);

//     const handleChange = e => {
//         setValue(e.target.value);
//     }
//     return {
//         value,
//         onChange: handleChange
//     }
// }

// export default Profile;

// /**
//  *             <div> 
//                 <ImageUploader
//                 withIcon={true}
//                 withPreview={true}
//                 buttonText='Choose images'
//                 onChange={handleImageUpload}
//                 imgExtension={['.jpg', '.gif', '.png', '.gif']}
//                 maxFileSize={5242880} />
//             </div>
//  */