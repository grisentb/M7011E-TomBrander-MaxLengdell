// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }
  
  // return the token from the session storage
  export const getToken = () => {
    return sessionStorage.getItem('token') || null;
  }
  export const getRole = () => {
    return sessionStorage.getItem('role') || null;
  }
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
  }
  
  // set the token and user from the session storage
  export const setUserSession = (token, user, role) => {
    console.log("Setting user to: ", user);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    if(typeof role !== 'undefined'){

      sessionStorage.setItem('role', JSON.stringify(role));
    }
  }