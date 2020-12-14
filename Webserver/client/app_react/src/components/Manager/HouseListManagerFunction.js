import React, { useState, useEffect } from "react";
import reactDom, { render } from "react-dom";
import axios from 'axios';

import MaterialTable from "material-table";

export default function TableUser(props) {
    const columns = [
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
    const [data, setData] = useState([]);


    return <MaterialTable 
        title="Households"
        columns={columns}
        data={props.data} />
};

