import React, { useState, useEffect } from "react";
import ReactDom, { render } from "react-dom";
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LockIcon from '@material-ui/icons/Lock';
import Modal from "./Modal";
import "./css/styles.css";
import Popup from './ProfilePwdPopup';

import MaterialTable from "material-table";
import { IconButton, TableBody, TableCell, TableRow, TextField } from "@material-ui/core";



export default function ProfileUsers(props) {
    var users = props.data.data;
    var [input, setInput] = useState("");
    var pwd = useFormInput('');

    function editUser(user, house_id) {
        console.log("input: " + user + " Value " + pwd.value);
        axios.post('http://localhost:4000/user/newpwd', { data: { user: user, newPwd: pwd.value} }).then(response => {
    });

    }
    function deleteUser(user, house_id) {
        
        console.log("delete", user, " : ", house_id);
        axios.delete('http://localhost:4000/manager/profile/delete', { data: { user: user, house_id: house_id } }).then(response => {
            console.log(response);
        })
    }

    return (
        <div>
            <TableBody>
                {users.map(n => {
                    return (
                        <TableRow key={n.id}>
                            <TableCell component="th" scope="row">
                                <IconButton onClick={() => { deleteUser(n.email, n.house_id) }}>
                                    <DeleteIcon color="secondary" />
                                </IconButton>
                                <TextField type="text" {...pwd} label="new password" autoComplete="new-password" />
                                <IconButton onClick={() => { editUser(n.email, n.house_id) }}>
                                    <LockIcon color="secondary" />
                                </IconButton>
                            </TableCell>
                            <TableCell>{n.name}</TableCell>
                            <TableCell>{n.email}</TableCell>
                            <TableCell>Last logged in: {n.logged_in}</TableCell>
                        </TableRow>

                    )
                })}
            </TableBody>
        </div>
    )
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
  
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }
  