import React from "react";
import { render } from "react-dom";
//import { makeData, Logo, Tips } from "./Utils";

import MaterialTable from "material-table";




export default class ListHousesManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "test",
            expanded: {}
        };
        console.log(props.data);
        this.columns = [
            {
                title: "Name",
                field: "name"
            },
            {
                title: "Email",
                field: "email"
            },

            {
                title: "Production",
                field: "production"
            },
            {
                title: "house_ID",
                field: "_id"
            },
            {
                title: "Consumption",
                field: "consumption"
            }

        ]
        // this.data = [
        //     {
        //         name: "max", email: "max@max.com"
        //     },
        //     {
        //         name: "tom", email: "tom@tom.com"
        //     }
        // ];
        //console.log(props.data);
        this.data2 = props.data
        // this.Table = () => {

        // };

    }

    render() {
        return (
            <MaterialTable title="Employees" data={this.data2} columns={this.columns} />
        );
    }
}

//render(<App />, document.getElementById("root"));
