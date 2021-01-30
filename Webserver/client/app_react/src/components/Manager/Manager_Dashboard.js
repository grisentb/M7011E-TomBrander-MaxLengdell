import React from 'react';
import axios from 'axios';
import { getUser, removeUserSession } from './../../Utils/Common';

import MaterialTable from "material-table";

import ListHouseFunctionManager from './HouseListManagerFunction';

export default class ManagerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { manager: null, users: [], price: 0.0, totalProduction: 0.0, totalConsumption: 0.0, blackouts: 0};
        this.user = getUser();

        this.tickRate = 1000;
    }

    componentDidMount() {
        this.update();
    }
    componentDidUpdate() {
        this.update();
    }
    update() {
        //console.log("Manager: ", this.state.manager);
        let newPrice = 0.0;
        axios.get('https://130.240.200.39:4000/home/price').then(resp => {
            newPrice = resp.data;
        });
        let newManager = null;
        axios.get('https://130.240.200.39:4000/manager').then(resp => {
            newManager = resp.data;
        });
        let consumption = 0.0;
        axios.get('https://130.240.200.39:4000/manager/consumption').then(resp => {
            consumption = resp.data;
        });
        let production = 0.0;
        axios.get('https://130.240.200.39:4000/manager/production').then(resp => {
            production = resp.data;
        })
        setTimeout(() => {
            axios.get('https://130.240.200.39:4000/manager/users').then(resp => {
                //console.log("RESP: ", resp.data);
                //console.log(this.data);
                this.setState({ manager: newManager, users: resp.data, price: newPrice, totalConsumption: consumption, totalProduction: production });
            }).catch(err => {
                console.log(err);
            });
        }, this.tickRate);
    }//         



    render() {
        const handleLogout = () => {
            removeUserSession();
            this.props.history.push('/login');
            this.setState({ manager: null });
        }
        const changeRatio = async e => {
            if(e.key === 'Enter'){
              console.log("Updating ratio");
              let value = Math.max(0.0, e.target.value);
              value = Math.min(1.0, e.target.value);
              axios.post('https://130.240.200.39:4000/manager/buffer', {_id: this.state.manager._id, value: value});
              e.target.value = null;
            }
        }
        const changePrice = async e => {
            if(e.key == 'Enter'){
                console.log("Updating price");
                axios.post('https://130.240.200.39:4000/manager/setPrice', {manager_price: e.target.value});
                e.target.value = null;
            }
        }
        const changeStatus = async e => {
            console.log("CHANGE STATUS!");
            let id = this.state.manager._id;
            axios.post('https://130.240.200.39:4000/manager/production', {_id: id});
        }
        if (this.state.manager) {
            const { manager } = this.state;
            const { users } = this.state;
            const { price } = this.state;
            const { totalConsumption } = this.state;
            const { totalProduction } = this.state;
            var statusButtonValue = manager.status == "stopped" ? "start" : "stop";

            return (
                <div>
                    Welcome Manager! <br /><br />
                    Coal powerplant production {manager.production} <br /><br />
                    Coal powerplant status: {manager.status} <br /><br />
                    <input type="button" onClick={changeStatus} value={statusButtonValue}/><br /><br />
                    Your buffer: {manager.buffer} <br /><br />
                    Buffer/production ratio: {manager.buffer_to_prod} <br /><br />
                    Change buffer/production ratio: <input type="text" placeholder="Ratio between 1 and 0" onKeyDown={changeRatio} /> <br/> <br/>
                    Total consumption: {totalConsumption}<br /><br />
                    Total production: {totalProduction}<br /><br />
                    Total net production: {totalProduction - totalConsumption}<br /><br />
                    Current Price: {price} kr<br /><br />
                    Set Price: <input type="text" placeholder="0 for dynamic pricing" onKeyDown={changePrice} /> <br/><br/>
                    <input type="button" onClick={handleLogout} value="Logout" />
                    <div>
                        <ListHouseFunctionManager data={users} />
                    </div>
                </div>
            );
        } else {
            return (<div>Loading manager data</div>);
        }
    }
}
//reactDom.render(<ListHousesManager />, document.getElementById("root"));
