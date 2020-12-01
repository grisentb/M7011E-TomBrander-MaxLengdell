import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser, removeUserSession } from './../../Utils/Common';

//Rate of fetching prosumer data
//let tickRate = 1000;
function Dashboard(props) {
  const user = getUser();
  //Hooks for every displaying value
  const [prosumer, setProsumer] = useState(false);
  const [production, setProduction] = useState(false);
  const [wind, setWind] = useState(false);
  const [capacity, setCapacity] = useState(false);
  const [consumption, setConsumption] = useState(false);
  const [buffer, setBuffer] = useState(false);

  const fetchData = async e => {
    console.log("Trying to fetch");
    axios.get('http://localhost:4000/home', {params: {email: user.email}}).then(resp =>
    {
      setProsumer(resp.data);
      let newProd = prosumer.production;
      let newWind = prosumer.wind;
      let newCapacity = prosumer.production_capacity;
      let newConsumption = prosumer.consumption;
      let newBuffer = prosumer.buffer;
      
      setProduction(newProd);
      setWind(newWind);
      setCapacity(newCapacity);
      setConsumption(newConsumption);
      setBuffer(newBuffer);

    });
  }
  
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }
  const changeCapacity = async e => {
    if(e.key === 'Enter'){
      console.log("Updating capacity");
      axios.post('http://localhost:4000/home/capacity', {_id: prosumer._id, value: e.target.value}).then(resp => {
        e.target.value = null;
        console.log(resp.data);
        setCapacity(resp.data);
      });
    }
  }

  return (
    <div>
      Welcome {}!<br /><br />
      Fetch Data <input type="button" onClick={fetchData} value="Fetch Data" /> <br/> <br/>
      Email: {user.email}<br /><br />
      Production: {production}<br /><br />
      Capacity: {capacity} <br /><br />
      Update Capacity: <input type="text" placeholder="New Capacity" onKeyDown={changeCapacity}/> <br /><br />
      Consumption: {consumption}<br /><br />
      Buffer: {buffer}<br /><br />
      Wind: {wind}<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;