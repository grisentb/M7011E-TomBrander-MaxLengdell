import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Login from './components/Home/Login';
import Dashboard from './components/Home/Dashboard';
import Home from './components/Home/Home';
import Register from './components/Home/Register';
import Profile from './components/Profile/Profile';

import Manager_profile from './components/Manager/Profile/ManagerProfile';
import Manager_dashboard from './components/Manager/Manager_Dashboard';

import PrivateRoute from './Utils/Routes/PrivateRoute';
import PublicRoute from './Utils/Routes/PublicRoute';

import { getToken, removeUserSession, setUserSession } from './Utils/Common';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://130.240.200.39:4000/login/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
            <NavLink activeClassName="active" to="/register">Register</NavLink><small>(Register user and household!</small>
            <NavLink activeClassName="active" to="/profile">Profile</NavLink><small>Profile page</small>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/manager_dashboard" component={Manager_dashboard} />
              <PublicRoute path="/register" component={Register} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/manager_profile" component={Manager_profile} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;