import React from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import { getUser } from '../../Utils/Common';


export default class Profile extends React.Component {

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

