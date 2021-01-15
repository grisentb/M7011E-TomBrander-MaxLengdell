import React from 'react';
import axios from 'axios';
import { getUser, removeUserSession, getRole } from './../../Utils/Common';
import ListConsumerFunction from './ConsumerListFunction';


export default class Dashboard extends React.Component {
  constructor(props) {
    //console.log("CONSTRUCTOR");
    super(props);
    this.state = { prosumer: null, price: 0.0, bufferError: "", blackouts: [], consumers: [] };
    this.user = getUser();
    this.role = getRole();
    this.tickRate = 1000;
    this.bufferError = "";

  }
  componentDidUpdate() {
    //Check if current user is manager or not
    this.update();
    //console.log("Role from prop: ", this.props.location.state.role);

  }
  componentDidMount() {
    console.log("MOUNT");

    this.update();
  }
  update() {

    let newPrice = 0.0;
    let currentBlackouts = [];
    this.user = getUser();
    let consumers = [];
    if (this.state.prosumer) {
      //Get current Price
      axios.get('http://130.240.200.39:4000/home/price').then(resp => {
        newPrice = resp.data;
      });
      var netProd = this.state.prosumer.production - this.state.prosumer.consumption;

      axios.get('http://130.240.200.39:4000/consumer/prosumer', { params: { _id: this.state.prosumer._id } }).then(resp => {
        consumers = resp.data;
        //console.log("RESPONSE: ",resp);
      })
    }
    setTimeout(() => {
      //console.log(this.user);
      let tempUser = typeof (this.user) == 'string' ? this.user : this.user.email;
      axios.get('http://130.240.200.39:4000/home', { params: { email: tempUser } }).then(resp => {
        //Updating this.state
        this.setState({ prosumer: resp.data, price: newPrice, blackouts: currentBlackouts, consumers: consumers });
      })
    }, this.tickRate);
  }
  render() {
    //console.log("Render");
    //Post call to update buffer/production ratio when enter
    const changeRatio = async e => {
      if (e.key === 'Enter') {
        console.log("Updating ratio");
        let value = Math.max(0.0, e.target.value);
        value = Math.min(1.0, e.target.value);
        axios.post('http://130.240.200.39:4000/home/ratio', { _id: this.state.prosumer._id, value: value }).then(resp => {
          if (resp.data === false) {
            this.setState({ bufferError: "Buffer is empty, ratio is therefore 0.0" });
          } else {
            this.setState({ bufferError: "" });
          }
          e.target.value = null;
        });
      }
    }
    //Post call to update capacity when enter
    const changeCapacity = async e => {
      if (e.key === 'Enter') {
        console.log("Updating capacity");
        axios.post('http://130.240.200.39:4000/home/capacity', { _id: this.state.prosumer._id, value: e.target.value }).then(resp => {
          e.target.value = null;
        });
      }
    }
    //Create new household using this prosumers electricity
    const newHouse = async e => {
      await axios.post('http://130.240.200.39:4000/consumer/consumption', { _id: this.state.prosumer._id });
      console.log("CREATED NEW HOUSEHOLD");
    }
    // handle click event of logout button
    const handleLogout = () => {
      removeUserSession();
      this.props.history.push('/login');
      this.setState({ prosumer: null, price: 0.0 });
      axios.post('http://130.240.200.39:4000/logout',{user: this.user}).then(resp => {
        console.log("Log out succesful.");
      })
    }
    if (this.state.prosumer) {
      const { prosumer } = this.state;
      const { price } = this.state;
      const { bufferError } = this.state;
      const { blackouts } = this.state;
      const { consumers } = this.state;
      return (
        <div>
          Welcome {this.user.name}!<br /><br />
          Email: {this.user.email}<br /><br />
          Wind turbine production: {prosumer.production}<br /><br />
          Your consumption: {prosumer.consumption}<br /><br />
          Net Production: {prosumer.production - prosumer.consumption} <br /> <br />
          Capacity: {prosumer.production_capacity} <br /><br />
          Update Capacity: <input type="text" placeholder="New Capacity" onKeyDown={changeCapacity} /> <br /><br />
          Your buffer: {prosumer.buffer}<br /><br />
          Buffer/Production ratio: {prosumer.buffer_prod_ratio}<br /><br />
          Change Buffer/Production ratio: <input type="text" placeholder="Ratio between 0 and 1" onKeyDown={changeRatio} />{bufferError} <br /><br />
          Wind: {prosumer.wind}<br /><br />
          Current electrical price : {price} <br /><br />
          Blackout households: {blackouts}
          <div>
            <ListConsumerFunction data={consumers} />
          </div>
          <br /> <br />
          <input type="submit" onClick={newHouse} value="Create new household" /> <br /><br />
          <input type="button" onClick={handleLogout} value="Logout" />
        </div>
      );
    }
    else {
      return <div>Loading prosumer data!</div>
    }
  }
}