import React, { useRef } from "react";
import reactDom, { render } from "react-dom";
import axios from 'axios';

import MaterialTable from "material-table";

export default class ListHousesManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.columns = [
            {
                title: "house_ID",
                field: "_id"
            },
            {
                title: "Production",
                field: "production"
            },
            {
                title: "Production capacity",
                field: "production_capacity"
            },
            {
                title: "Consumption",
                field: "consumption"
            },
            {
                title: "Wind",
                field: "wind"
            },
            {
                title: "Buffer",
                field: "buffer"
            },
            {
                title: "Buffer ratio",
                field: "buffer_prod_ratio"
            },
            {
                title: "Creation date",
                field: "created_date"
            },


        ]
        this.tickRate = 1000;
        this.data = [];
        this.arr = [{
            _id: this.int
        }];
        this.count = 0;

        this.update = this.update.bind(this);
    }
    componentDidMount() {
        this.update();
    }
    componentDidUpdate() {
        //this.update();
    }

    update() {
        // let users = null;
        // setTimeout(() => {
        //     //this.data = this.props.data;
        //     const temp = this.state.int + 1;
        //     this.setState({int: temp});
        //     // console.log(this.state.int);
        //     console.log("test");

        // }, this.tickRate);
        // axios.get('http://localhost:4000/manager/users').then(resp => {
        //     console.log("RESP: ", resp.data);
        //     //console.log(this.data);
        //     this.setState({ users: resp.data });

        // }).catch(err => {
        //     console.log(err);
        // });
        this.setState({users: this.props.data});
        this.data = this.props.data;
        this.count += 1;
        //console.log(this.state.users);
        console.log(this);

    }
    render() {
        const { data } = this.state;
        console.log("Render");
        tableRef = useRef();
        return (
            <div>
                <button onClick={this.update}>
                    Click Me To Get API Data
        </button>
                <MaterialTable title="Households" data={query => 
                new Promise((resolve, reject) => {
                    axios.get('http://localhost:4000/manager/users')
//                    .then(response => response.json())
                    .then(result => {
                        resolve({
                            data: result.data
                        })
                    });
                })
                } columns={this.columns} />

            </div>
        );

    }
}


