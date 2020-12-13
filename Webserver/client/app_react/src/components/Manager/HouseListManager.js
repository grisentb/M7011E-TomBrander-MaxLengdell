import React from "react";
import { render } from "react-dom";
import axios from 'axios';

import MaterialTable from "material-table";




export default class ListHousesManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
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

    }
    componentDidMount() {
        this.update();
    }
    componentDidUpdate() {
        console.log(this.props.data);
        this.update();
    }
    update() {
        // let users = null;
        // setTimeout(() => {
        //     this.setState({ data: this.props.data });
        // }, this.tickRate);
        console.log(this.props.data);
        this.data = this.props.data;
    }
    render() {
            const { data } = this.state;
            return (
                <div>
                    <MaterialTable title="Employees" data={this.data} columns={this.columns} />
    
                </div>
            );
        
    }
}

//render(<App />, document.getElementById("root"));
