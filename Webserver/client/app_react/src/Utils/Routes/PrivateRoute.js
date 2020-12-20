import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ManagerDashboard from '../../components/Manager/Manager_Dashboard';
import ManagerProfile from '../../components/Manager/Profile/ManagerProfile';

import { getToken , getRole} from './../Common';

// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
        render= { (props) => {
        const token = getToken();
        const role = getRole();

        if(token === null){
          console.log("go to login");
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
 
        }else if(role === 'true' && props.location.pathname == "/dashboard"){
          console.log("push to manager dashboard");
          return <ManagerDashboard {...props} />
        }
        else if(role === 'true' && props.location.pathname == "/profile"){
          console.log("push to profile");
          return <ManagerProfile {...props} />
        }
        else{
          console.log("go to your site");
          return (<Component {...props} />)
        }
      }}
      //render={(props) => getToken() ? (<Component {...props} />) : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

export default PrivateRoute;