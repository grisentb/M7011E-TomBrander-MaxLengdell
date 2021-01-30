import React from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import { getUser } from '../../Utils/Common';


export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = { image: ''};
        this.user = getUser();
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    async onSubmit(e){
        
        const formData = new FormData();
        formData.append('image', this.state.image);
        let tempUser = typeof (this.user) == 'string' ? this.user : this.user.email;
        console.log("User to upload: ", tempUser);

        axios.post(`https://130.240.200.39:4000/user/uploadImg?user=${tempUser}`, formData).then(res => {
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


