import React, { useState, useEffect } from "react";
import reactDom, { render } from "react-dom";
import axios from 'axios';

import MaterialTable from "material-table";

export default function TableUser(props) {
    const managerColumns = [
        {
            title: "house_ID",
            field: "_id"
        },
        {
            title: "Consumption",
            field: "consumption"
        },
        {
            title: "Blackout",
            field: "blackout"
        },
        {
            title: "Creation date",
            field: "created_date"
        },


    ]
    const prosumerColumns = [];

    const [data, setData] = useState([]);


    return <MaterialTable 
        title="Households"
        columns={managerColumns}
        data={props.data} />
};

