import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser, removeUserSession } from './../../Utils/Common';

//Rate of fetching prosumer data
let tickRate = 500;
let currentProsumer;
function Dashboard(props) {
  //const [user, setUser] = useState(false);
  const user = getUser();
  console.log(props);
  //console.log("Updated Dashboard");
  //Hooks for every displaying value
  const [prosumer, setProsumer] = useState(false);

  setTimeout(() => {

    let tempUser = typeof(user)=='string' ? user : user.email;

    setProsumer(axios.get('http://localhost:4000/home', {params: {email: tempUser}}));
    if(prosumer !== false)
    {
      prosumer.then(resp => {
        currentProsumer = resp.data;
      });

    }
  }, tickRate);
  
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }
  const changeCapacity = async e => {
    if(e.key === 'Enter'){
      console.log("Updating capacity on ");
      axios.post('http://localhost:4000/home/capacity', {_id: currentProsumer._id, value: e.target.value}).then(resp => {
        e.target.value = null;
        console.log(resp.data);
      });
    }
  }

  if(!currentProsumer){return <div></div>}
  return (
    <div>
      Welcome {}!<br /><br />
      Email: {user.email}<br /><br />
      Production: {currentProsumer.production}<br /><br />
      Capacity: {currentProsumer.production_capacity} <br /><br />
      Update Capacity: <input type="text" placeholder="New Capacity" onKeyDown={changeCapacity}/> <br /><br />
      Consumption: {currentProsumer.consumption}<br /><br />
      Buffer: {currentProsumer.buffer}<br /><br />
      Wind: {currentProsumer.wind}<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;