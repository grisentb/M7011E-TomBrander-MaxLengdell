import React, { useState, useEffect } from "react";
import reactDom, { render } from "react-dom";
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import MaterialTable from "material-table";
import { IconButton, TableBody, TableCell, TableRow } from "@material-ui/core";

export default function ProfileUsers(props) {

    var users = props.data.data;

    var deleteIcon = (<IconButton onClick={() => {console.log("delete")}}>
        <DeleteIcon color="secondary" />
    </IconButton>);
    var editIcon = (
        <IconButton onClick={() => {console.log("edit")}}>
            <EditIcon color="secondary" />
        </IconButton>
    );


    function onClick(){
        console.log("click")
    }
    return(
        <TableBody>
            {users.map(n => {
                return(
                    <TableRow key ={n.id}>
                        <TableCell component="th" scope="row">
                            {deleteIcon}
                            {editIcon}
                        </TableCell>
                        <TableCell>{n.name}</TableCell>
                        <TableCell>{n.email}</TableCell>
                        <TableCell>{n.lastLoggedIn}</TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    )
}
