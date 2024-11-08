
import React, { useState,useEffect} from 'react';

import {useNavigate} from "react-router-dom"

export const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

 const AuthProvider = ({ children }) => {
  //const [checkloggedIn,setloggedIn]=useState(false)

  const navigate=useNavigate()
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);

    navigate('/profile');
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  

    navigate('/auth')
  };


  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  useEffect(()=>{
    if(userIsLoggedIn)
    {
        setTimeout(()=>{ logoutHandler()},5000)
    }
  },[userIsLoggedIn])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider