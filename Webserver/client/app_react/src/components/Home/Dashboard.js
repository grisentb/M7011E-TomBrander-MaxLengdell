import React  from 'react';
import axios from 'axios';
import { getUser, removeUserSession, getRole } from './../../Utils/Common';

export default class Dashboard extends React.Component {
  constructor(props){
    //console.log("CONSTRUCTOR");
    super(props);
    this.state = {prosumer: null, price: 0.0, bufferError: ""};
    this.user = getUser();
    this.role = getRole();
    this.tickRate = 1000;
    this.bufferError = "";
  }
  componentDidUpdate(){
    //console.log("UPDATE");
    //Check if current user is manager or not
    this.update();
  }
  componentDidMount(){
    console.log("MOUNT");
    //const role = getRole();
    this.setState({role: getRole()});
    console.log(this.role);
    if(this.role === '"manager"'){
      console.log("manager identified. Redirecting to manager dashboard");
      this.props.history.push('/manager_dashboard');
    }

    this.update();
  }
  update(){
    let newPrice = 0.0
    //Get current Price
    axios.get('http://localhost:4000/home/price').then(resp => {
      newPrice = resp.data;
    });
    this.user = getUser();
    setTimeout(() => {
      //console.log(this.user);
      let tempUser = typeof(this.user) == 'string' ? this.user : this.user.email;
      
      axios.get('http://localhost:4000/home', {params: {email: tempUser}}).then(resp => {
        //Updating this.state
        this.setState({prosumer: resp.data, price: newPrice});
      })
    }, this.tickRate);
  }
  render() {
    //console.log("Render");
    //Post call to update buffer/production ratio when enter
    const changeRatio = async e => {
      if(e.key === 'Enter'){
        console.log("Updating ratio");
        let value = Math.max(0.0, e.target.value);
        value = Math.min(1.0, e.target.value);
        axios.post('http://localhost:4000/home/ratio', {_id: this.state.prosumer._id, value: value}).then(resp => {
          if(resp.data === false){
            this.setState({bufferError: "Buffer is empty, ratio is therefore 0.0"});
          }else{
            this.setState({bufferError: ""});
          }
          e.target.value = null;
        });
      }
    }
    //Post call to update capacity when enter
    const changeCapacity = async e => {
      if(e.key === 'Enter'){
        console.log("Updating capacity");
        axios.post('http://localhost:4000/home/capacity', {_id: this.state.prosumer._id, value: e.target.value}).then(resp => {
          e.target.value = null;
        });
      }
    }
    // handle click event of logout button
    const handleLogout = () => {
      removeUserSession();
      this.props.history.push('/login');
      this.setState({prosumer: null, price: 0.0});
    }
    if(this.state.prosumer){
      const {prosumer} = this.state;
      const {price} = this.state;
      const {bufferError} = this.state;
      return (
        <div>
          Welcome {this.user.name}!<br /><br />
          Email: {this.user.email}<br /><br />
          Wind turbine production: {prosumer.production}<br /><br />
          Your consumption: {prosumer.consumption}<br /><br />
          Net Production: {prosumer.production - prosumer.consumption} <br/> <br/>
          Capacity: {prosumer.production_capacity} <br /><br />
          Update Capacity: <input type="text" placeholder="New Capacity" onKeyDown={changeCapacity}/> <br /><br />
          Your buffer: {prosumer.buffer}<br /><br />
          Buffer/Production ratio: {prosumer.buffer_prod_ratio}<br /><br />
          Change Buffer/Production ratio: <input type="text" placeholder="Ratio between 0 and 1" onKeyDown={changeRatio} />{bufferError} <br/><br/>
          Wind: {prosumer.wind}<br /><br />
          Current electrical price : {price} <br/><br/>
          <input type="button" onClick={handleLogout} value="Logout" />
        </div>
      );
    }
    else {
      return <div>Loading prosumer data!</div>
    }
  }
}