import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser, removeUserSession } from './../../Utils/Common';

//Rate of fetching prosumer data
let tickRate = 3000;
let currentProsumer;
let price = 0;
let bufferError = "";
function Dashboard(props) {
  const user = getUser();
  //Hook current prosumer
  const [prosumer, setProsumer] = useState(false);
  //Get current Price
  axios.get('http://localhost:4000/home/price').then(resp => {
    price = resp.data;
  });
  //Set time out as update tickrate
  setTimeout(() => {
    let tempUser = typeof(user)=='string' ? user : user.email;
    //Hook for updating current prosumer
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
    currentProsumer = null;
  }
  //Post call to update capacity when enter
  const changeCapacity = async e => {
    if(e.key === 'Enter'){
      console.log("Updating capacity");
      axios.post('http://localhost:4000/home/capacity', {_id: currentProsumer._id, value: e.target.value}).then(resp => {
        e.target.value = null;
      });
    }
  }
  //Post call to update buffer/production ratio when enter
  const changeRatio = async e => {
    if(e.key === 'Enter'){
      console.log("Updating ratio");
      let value = Math.max(0.0, e.target.value);
      value = Math.min(1.0, e.target.value);
      axios.post('http://localhost:4000/home/ratio', {_id: currentProsumer._id, value: value}).then(resp => {
        if(resp.data === false){
          bufferError = "Buffer is empty, ratio is therefore 0.0";
        }else{
          bufferError = "";
        }
        e.target.value = null;
      });
    }
  }
  if(!currentProsumer){return <div></div>}
  return (
    <div>
      Welcome {}!<br /><br />
      Email: {user.email}<br /><br />
      Production: {currentProsumer.production}<br /><br />
      Consumption: {currentProsumer.consumption}<br /><br />
      Net Production: {currentProsumer.production - currentProsumer.consumption} <br/> <br/>
      Capacity: {currentProsumer.production_capacity} <br /><br />
      Update Capacity: <input type="text" placeholder="New Capacity" onKeyDown={changeCapacity}/> <br /><br />
      Buffer: {currentProsumer.buffer}<br /><br />
      Buffer/Production ratio: {currentProsumer.buffer_prod_ratio}<br /><br />
      Change Buffer/Production ratio: <input type="text" placeholder="Ratio between 0 and 1" onKeyDown={changeRatio} />{bufferError} <br/><br/>
      Wind: {currentProsumer.wind}<br /><br />
      Current electrical price : {price} <br/><br/>
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;