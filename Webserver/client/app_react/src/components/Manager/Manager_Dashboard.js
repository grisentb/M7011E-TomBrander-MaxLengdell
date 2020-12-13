import React from 'react';
import axios from 'axios';
import {getUser, removeUserSession} from './../../Utils/Common';

import ListHousesManager from './HouseListManager';

export default class ManagerDashboard extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {manager: null, users: [], price: 0.0, totalProduction: 0.0, totalConsumption: 0.0, blackouts: 0};
        this.user = getUser();

        this.tickRate = 1000;
    }

    componentDidMount(){
        this.update();
    }
    componentDidUpdate(){
        this.update();
    }
    update(){
        //console.log("Manager: ", this.state.manager);
        let newPrice = 0.0;
        axios.get('http://localhost:4000/home/price').then(resp => {
            newPrice = resp.data;
        });
        let newManager = null;
        axios.get('http://localhost:4000/manager').then(resp => {
            newManager = resp.data;
        });
        let consumption = 0.0;
        axios.get('http://localhost:4000/manager/consumption').then(resp => {
            consumption = resp.data;
        });
        let production = 0.0;
        axios.get('http://localhost:4000/manager/production').then(resp => {
            production = resp.data;
        })
        setTimeout(() => {
            axios.get('http://localhost:4000/manager/users').then(resp => {
                //console.log("RESP: ", resp.data);
                //console.log(this.data);
                this.setState({manager: newManager, users: resp.data, price: newPrice, totalConsumption: consumption, totalProduction: production});
            }).catch(err => {
                console.log(err);
            });
        }, this.tickRate);
    }//                   


    render(){
        const handleLogout = () =>{
            removeUserSession();
            this.props.history.push('/login');
            this.setState({manager: null});
        }
        if(this.state.manager){
            const {manager} = this.state;
            const {users} = this.state;
            const {price} = this.state;
            const {totalConsumption} = this.state;
            const {totalProduction} = this.state;
            return (
                <div>
                    Welcome Manager! <br/><br/>
                    Coal powerplant production {manager.production} <br/><br/>
                    Coal powerplant status: {} <br/><br/>
                    Your buffer: {manager.buffer} <br/><br/>
                    Buffer/production ratio: {manager.buffer_prod_ratio} <br/><br/>
                    Change buffer/production ratio:
                    Total consumption: {totalConsumption}<br/><br/>
                    Total production: {totalProduction}<br/><br/>
                    Total net production: {totalProduction - totalConsumption}<br/><br/>
                    Current Price: {price} <br/><br/>
                    <input type="button" onClick={handleLogout} value="Logout" />
                <div>
                <ListHousesManager data={users}/>sl
                </div>
                </div>
            );
        }else
        {
            return(<div>Loading manager data</div>);
        }
    }
}